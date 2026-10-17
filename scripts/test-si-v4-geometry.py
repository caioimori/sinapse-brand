"""Regression checks for the corner roles requested in revision 04."""
from pathlib import Path
import json,xml.etree.ElementTree as ET
from io import BytesIO
import fitz
from PIL import Image
from fontTools.ttLib import TTFont
R=Path(__file__).resolve().parents[1];g=json.loads((R/'scripts/snps-font-geometry.json').read_text(encoding='utf8'))['glyphs'];checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
def ink(ch,x,y):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="100" height="60"><rect width="100" height="60" fill="white"/><path d="{g[ch]}" fill="black"/></svg>'
    doc=fitz.open(stream=svg.encode(),filetype='svg');pix=doc[0].get_pixmap(matrix=fitz.Matrix(10,10));im=Image.open(BytesIO(pix.tobytes('png'))).convert('L');return im.getpixel((round(x*10),round(y*10)))<100
for ch in ['M','V','W','X','Y','Z','K']:check(ch+' has curved diagonal transitions','C' in g[ch])
for ch in ['B','D']:check(ch+' retains square left corner',ink(ch,.5,.5))
check('O has rounded closed outer corner',not ink('O',.5,.5))
check('C has square top open terminal',ink('C',92.5,.5))
check('C remains open at right middle',not ink('C',92.5,23.5))
check('H top counter remains open',not ink('H',46,5))
check('H central bridge has material',ink('H',46,23.5))
check('L foot retains square right terminal',ink('L',92.5,46.3))
check('R leg adds material rather than cutting the P bowl',ink('R',75,40))
for name,style in [('Manrope-Regular.ttf','Regular'),('Manrope-Semibold.ttf','Semibold')]:
    f=TTFont(R/'public/si-v2/fonts'/name);check('Distinct PDF name '+style,f['name'].getDebugName(6)=='Manrope-'+style)
masters=json.loads((R/'public/si-v2/geometry.json').read_text(encoding='utf8'))
for name in ['sinapse','sinapse-si','sinapse-school','sinapse-house','sinapse-growth']:
    svg=(R/f'public/si-v2/logos/{name}-solid-dark.svg').read_text(encoding='utf8');check(name+' uses complete wordmark master',masters['wordmark'] in svg)
for name in ['snps-school','snps-house','snps-growth']:
    svg=(R/f'public/si-v2/logos/{name}-solid-dark.svg').read_text(encoding='utf8');check(name+' uses immutable SNPS prefix',masters['snps'] in svg)
for p in (R/'public/si-v2/applications').glob('*.svg'):
    node=ET.parse(p).getroot();check(p.stem+' has viewBox',bool(node.get('viewBox')))
report={'passed':len(checks),'checks':checks,'scope':'Corner roles, diagonal curvature, solid union, immutable wordmark embedding and distinct PDF font weights.'}
(R/'qa/v4-geometry-check.json').write_text(json.dumps(report,indent=2),encoding='utf8')
print(f'{len(checks)} revision 04 geometry and font checks passed.')
