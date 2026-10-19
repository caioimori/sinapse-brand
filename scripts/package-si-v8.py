"""Curated edition 07; historical books, rejected symbols and old collections stay in Git."""
from pathlib import Path
import hashlib,json,zipfile
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def current_files():
    roots=['logos','fonts','materials','icons','tools','templates','applications','book-v8','wear-v8','symbol-circle','visual-v8']
    excluded={'applications/passage.svg','applications/passage.webp'}
    files=[p for folder in roots for p in (O/folder).rglob('*') if p.is_file() and p.suffix!='.zip' and p.relative_to(O).as_posix() not in excluded]
    files += [O/n for n in ['hero.webp','glass.webp','metal.webp','stationery.webp','asset-provenance.json','brand-data.json','geometry.json','manrope-metrics.json','reference-atlas.json','tokens.json','SINAPSE-SI-Brandbook-07.pdf','LEIA-ME-07.md']]
    return sorted(set(files))
def package():
    entries=[(p,p.relative_to(O).as_posix()) for p in current_files()]
    entries += [(R/f'public/brand/logo/bone/{n}.svg',f'masters/{n}.svg') for n in ['snps-lockup','sinapse-wordmark']]
    manifest={'version':'7.0-proposal','publication':'local_only','browser_review':'pending_connection','files':[{'file':n,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p,n in entries]}
    m=O/'kit-manifest-07.json';m.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');target=O/'SINAPSE-SI-Kit-07.zip'
    with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
        for p,n in entries+[(m,m.name)]:z.write(p,'SINAPSE-SI-07/'+n)
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
        for e in manifest['files']:assert hashlib.sha256(z.read('SINAPSE-SI-07/'+e['file'])).hexdigest()==e['sha256']
    report={'files':len(entries)+1,'crc':'passed','sha256_readback':'passed','archive_bytes':target.stat().st_size,'excluded':['rejected symbol proposals','old collections','books 02–06','standalone third-party reference photos'],'reference_art':'PDF includes three small credited reference examples for analysis.'}
    (R/'qa/v8-kit-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(json.dumps(report,ensure_ascii=False))
if __name__=='__main__':package()
