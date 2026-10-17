from pathlib import Path
import json, re, string, xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image, ImageChops
import fitz
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';F=O/'fonts';checks=[]
def check(value,name):
    assert value,name
    checks.append(name)
fonts=[TTFont(F/f'SNPSDisplay-Regular.{ext}') for ext in ['otf','ttf','woff2']]
for f in fonts:
    cmap=f.getBestCmap();check(all(ord(ch) in cmap for ch in string.printable[:95]),'Complete printable ASCII coverage')
    check(all(ord(ch) in cmap for ch in 'AÇÃO INTELIGÊNCIA ÁÀÂÃÉÊÍÓÔÕÚÜÇáàâãéêíóôõúüç'),'Portuguese accents')
    check(f['OS/2'].fsType==0,'Embedding permission')
    check(f['OS/2'].sCapHeight==700,'Cap height')
spec=json.loads((F/'SNPSDisplay-spec.json').read_text(encoding='utf8'));geo=json.loads((R/'scripts/snps-font-geometry.json').read_text(encoding='utf8'))
font=fonts[0];gs=font.getGlyphSet();cmap=font.getBestCmap();scale=700/46.9
def render(d):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -25 125 100"><path d="{d}" fill="#fff"/></svg>'
    doc=fitz.open(stream=svg.encode(),filetype='svg');p=doc[0].get_pixmap(matrix=fitz.Matrix(4,4),alpha=True);return Image.frombytes('RGBA',[p.width,p.height],p.samples).getchannel('A')
curve_errors={}
for ch,d in geo['master'].items():
    p=SVGPathPen(gs);gs[cmap[ord(ch)]].draw(TransformPen(p,(1/scale,0,0,-1/scale,0,46.9)))
    a,b=render(d),render(p.getCommands());hist=ImageChops.difference(a,b).histogram();mean=sum(i*v for i,v in enumerate(hist))/(a.width*a.height*255)
    check(mean<.001,f'Master {ch} outline raster difference <0.1 percent');curve_errors[ch]=mean
    advance=font['hmtx'][cmap[ord(ch)]][0]/scale;check(abs(advance-geo['widths'][ch]-16.64)<.04,f'Master {ch} spacing <0.04 source unit error')
for name in ['snps','sinapse','sinapse-si','sinapse-school','sinapse-house','sinapse-growth','snps-si','snps-school','snps-house','snps-growth']:
    for material in ['solid','glass','silver','frost']:
        for theme in ['dark','light']:
            p=O/'logos'/f'{name}-{material}-{theme}.svg';root=ET.fromstring(p.read_text(encoding='utf8'));check(root.find('{http://www.w3.org/2000/svg}title').text.startswith(name.upper().replace('-',' ')),f'{name}/{material}/{theme}')
    check(all(ord(ch) in cmap for ch in name.upper().replace('-',' ')),f'{name} complete font coverage')
check('143.1 33.28h9.38v46.9' in json.loads((O/'geometry.json').read_text())['wordmark'],'Recovered original rectangular I')
im=Image.open(O/'materials/snps-glass-transparent.png');check(im.mode=='RGBA' and im.getextrema()[3][0]==0,'Portable alpha PNG');check(im.getpixel((0,0))[3]==0,'Transparent exterior')
report={'passed':len(checks),'glyphs':len(font.getGlyphOrder()),'master_pixel_difference':curve_errors,'checks':checks}
(R/'qa/v5-font-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print(f'{len(checks)} font, master, spacing, signature and transparency checks passed; {len(font.getGlyphOrder())} glyphs.')
