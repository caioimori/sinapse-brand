from pathlib import Path
import json,hashlib,zipfile
root=Path(__file__).resolve().parents[1];out=root/'public/si-v2'
files=[p for p in out.rglob('*') if p.is_file() and p.suffix!='.zip' and (p.suffix!='.png' or p.parent.name=='materials') and p.name not in ['SINAPSE-SI-Brandbook-02.pdf','wear.webp'] and p.name!='kit-manifest.json']
manifest={'version':'3.0-proposal','publication':'local_only','files':[{'file':str(p.relative_to(out)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(files)]}
(out/'kit-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
with zipfile.ZipFile(out/'SINAPSE-SI-Kit-03.zip','w',compression=zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for p in files+[out/'kit-manifest.json']:z.write(p,'SINAPSE-SI-03/'+str(p.relative_to(out)).replace('\\','/'))
with zipfile.ZipFile(out/'SINAPSE-SI-Kit-03.zip') as z:assert z.testzip() is None
print('V3 kit:',len(files)+1,'files; CRC passed.')
