from pathlib import Path
import zipfile,json,hashlib,xml.etree.ElementTree as ET
import fitz
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from fontTools.svgLib.path import parse_path
from fontTools.pens.basePen import BasePen
root=Path(__file__).resolve().parents[1];public=root/'public'/'si'
class PdfPen(BasePen):
    def __init__(self,path):super().__init__(None);self.path=path
    def _moveTo(self,p):self.path.moveTo(*p)
    def _lineTo(self,p):self.path.lineTo(*p)
    def _curveToOne(self,a,b,d):self.path.curveTo(*a,*b,*d)
    def _closePath(self):self.path.close()
    def _endPath(self):pass
symbol_path=__import__('re').search(r'<path d="([^"]+)"',json.loads((public/'masters.json').read_text())['symbol']).group(1)
for edition in ['dark','light']:
    p=public/'templates'/f'brand-avatar-{edition}.svg';buffer=BytesIO();c=canvas.Canvas(buffer,pagesize=(1080,1080));c.setFillColor(HexColor('#0A0A0A' if edition=='dark' else '#F5F5F0'));c.rect(0,0,1080,1080,stroke=0,fill=1)
    c.translate(240,1080-373);c.scale(600/104,-600/104);c.translate(-28,-28);c.setFillColor(HexColor('#F5F5F0' if edition=='dark' else '#0A0A0A'));pen=PdfPen(c.beginPath());parse_path(symbol_path,pen);c.drawPath(pen.path,fill=1,stroke=0);c.save()
    doc=fitz.open(stream=buffer.getvalue(),filetype='pdf');doc[0].get_pixmap(matrix=fitz.Matrix(1,1),alpha=False).save(p.with_suffix('.png'))
target=public/'SINAPSE-SI-Kit.zip'
files=[p for p in public.rglob('*') if p.is_file() and p!=target and p.name!='kit-manifest.json']
manifest={'brand':'SINAPSE SI','version':'1.0-proposal','publication':'not_published','files':[{'file':str(p.relative_to(public)).replace('\\','/'),'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(files)]}
(public/'kit-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
with zipfile.ZipFile(target,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=7) as z:
    for p in files+[public/'kit-manifest.json']:z.write(p,arcname='SINAPSE-SI/'+str(p.relative_to(public)).replace('\\','/'))
with zipfile.ZipFile(target) as z:
    assert z.testzip() is None
    names=z.namelist();assert not any('private-research' in n or 'drive-downloads' in n or 'WhatsApp' in n for n in names)
print(json.dumps({'files':len(files)+1,'zip_bytes':target.stat().st_size,'crc':'passed','private_files':'excluded'},ensure_ascii=False))
