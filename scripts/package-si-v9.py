"""Curated edition 08 and its standalone social export; archives remain recoverable in Git."""
from pathlib import Path
import hashlib,json,zipfile
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def current_files():
    roots=['logos','fonts','materials','icons','tools','templates','applications','book-v9','wear-v8','wear-v9','symbol-circle','symbol-free','visual-v8','social-v9']
    excluded={'applications/passage.svg','applications/passage.webp'}
    files=[p for folder in roots for p in (O/folder).rglob('*') if p.is_file() and p.suffix!='.zip' and p.relative_to(O).as_posix() not in excluded]
    files += [O/n for n in ['hero.webp','glass.webp','metal.webp','stationery.webp','asset-provenance.json','brand-data.json','geometry.json','manrope-metrics.json','reference-atlas.json','tokens.json','SINAPSE-SI-Brandbook-08.pdf','LEIA-ME-08.md']]
    return sorted(set(files))
def archive(name,entries):
    manifest={'version':'8.0-proposal','publication':'local_preview_only','browser_review':'docs/SINAPSE-SI-V9-QA.md','files':[{'file':n,'bytes':p.stat().st_size,'sha256':sha(p)} for p,n in entries]}
    target=O/f'SINAPSE-SI-{name}-08.zip';root=f'SINAPSE-SI-{name}-08/'
    m=O/f'{name.lower()}-manifest-08.json';m.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
    with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
        for p,n in entries+[(m,m.name)]:z.write(p,root+n)
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
        for entry in manifest['files']:assert hashlib.sha256(z.read(root+entry['file'])).hexdigest()==entry['sha256']
    assert target.stat().st_size<100_000_000
    return {'file':target.name,'files':len(entries)+1,'crc':'passed','sha256_readback':'passed','archive_bytes':target.stat().st_size,'sha256':sha(target)}
def package():
    entries=[(p,p.relative_to(O).as_posix()) for p in current_files()]
    entries += [(R/f'public/brand/logo/bone/{n}.svg',f'masters/{n}.svg') for n in ['snps-lockup','sinapse-wordmark']]
    full=archive('Kit',entries)
    social=archive('Social',[(p,p.relative_to(O/'social-v9').as_posix()) for p in sorted((O/'social-v9').rglob('*')) if p.is_file()]+[(O/'LEIA-ME-08.md','LEIA-ME-08.md')])
    report={'archives':[full,social],'excluded':['rejected symbol proposals','historical books and collections','standalone third-party reference photography'],'reference_art':'The PDF contains three small credited examples for analysis; third-party reference assets are not brand assets.'}
    (R/'qa/v9-kit-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(json.dumps(report,ensure_ascii=False))
if __name__=='__main__':package()
