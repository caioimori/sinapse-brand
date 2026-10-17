from pathlib import Path
import json,hashlib,zipfile
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
files=[p for p in O.rglob('*') if p.is_file() and p.suffix!='.zip' and not any(part in ['book','book-v4'] for part in p.relative_to(O).parts) and (p.suffix!='.png' or p.parent.name=='materials') and p.name not in ['SINAPSE-SI-Brandbook-02.pdf','SINAPSE-SI-Brandbook-03.pdf','SINAPSE-SI-Brandbook-04.pdf','wear.webp','tee.webp','hoodie.webp','tee.png','hoodie.png','ooh.webp','signal-sculpture.webp','LEIA-ME-04.md','kit-manifest.json']]
manifest={'version':'5.0-proposal','publication':'local_only','files':[{'file':str(p.relative_to(O)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(files)]}
(O/'kit-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
with zipfile.ZipFile(O/'SINAPSE-SI-Kit-05.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for p in files+[O/'kit-manifest.json']:z.write(p,'SINAPSE-SI-05/'+str(p.relative_to(O)).replace('\\','/'))
with zipfile.ZipFile(O/'SINAPSE-SI-Kit-05.zip') as z:assert z.testzip() is None
print('Kit 05:',len(files)+1,'files; CRC passed.')
