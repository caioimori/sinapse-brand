"""Curated current resources. Rejected artwork stays in Git, outside this kit."""
from pathlib import Path
import hashlib,json,zipfile
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'

def current_files():
    roots=['logos','fonts','materials','icons','tools','templates','applications','book-v6','wear-v6','symbol-origin']
    excluded={'applications/passage.svg','applications/passage.webp'}
    files=[]
    for folder in roots:
        files += [p for p in (O/folder).rglob('*') if p.is_file() and p.suffix!='.zip' and p.relative_to(O).as_posix() not in excluded]
    files += [O/name for name in ['hero.webp','glass.webp','metal.webp','stationery.webp','asset-provenance.json','brand-data.json','geometry.json','manrope-metrics.json','reference-atlas.json','tokens.json','SINAPSE-SI-Brandbook-06.pdf','LEIA-ME-06.md']]
    return sorted(set(files))

def package():
    entries=[(p,p.relative_to(O).as_posix()) for p in current_files()]
    entries += [(R/f'public/brand/logo/bone/{name}.svg',f'masters/{name}.svg') for name in ['snps-lockup','sinapse-wordmark']]
    manifest={'version':'6.0-proposal','publication':'local_only','files':[{'file':name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p,name in entries]}
    m=O/'kit-manifest-06.json';m.write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
    target=O/'SINAPSE-SI-Kit-06.zip'
    with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=5) as z:
        for p,name in entries+[(m,m.name)]:z.write(p,'SINAPSE-SI-06/'+name)
    with zipfile.ZipFile(target) as z:
        assert z.testzip() is None
        for entry in manifest['files']:assert hashlib.sha256(z.read('SINAPSE-SI-06/'+entry['file'])).hexdigest()==entry['sha256']
    report={'files':len(entries)+1,'crc':'passed','sha256_readback':'passed','archive_bytes':target.stat().st_size,'excluded':['Passagem','rejected symbol proposals','old apparel','books 02–05','third-party reference photos']}
    (R/'qa/v6-kit-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
    print(json.dumps(report,ensure_ascii=False))

if __name__=='__main__':package()
