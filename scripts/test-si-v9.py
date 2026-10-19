"""Verify the targeted R correction, exact positive S and usable social exports."""
from pathlib import Path
from io import BytesIO
import json,subprocess,hashlib,xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from PIL import Image
import fitz
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
for n in ['snps-lockup','sinapse-wordmark']:
    p=f'public/brand/logo/bone/{n}.svg';check(n+' master byte preserved',subprocess.check_output(['git','show','bbc6e6c:'+p],cwd=R)==(R/p).read_bytes())
old=json.loads(subprocess.check_output(['git','show','bbc6e6c:scripts/snps-font-geometry.json'],cwd=R));new=json.loads((R/'scripts/snps-font-geometry.json').read_text(encoding='utf8'));changed={k for k,v in new['glyphs'].items() if old['glyphs'].get(k)!=v}
check('only R family outlines changed',changed and changed<={'R','r','Ŕ','ŕ','Ŗ','ŗ','Ř','ř'})
check('R advances unchanged',old['widths']==new['widths'])
check('original master outlines preserved',old['master']==new['master'])
check('R square diagonal root starts in upper beam','18.76' in new['glyphs']['R'] and new['glyphs']['R'].split('Z')[-2].count('C')==0)
for ext in ['otf','ttf','woff2']:
    f=TTFont(O/f'fonts/SNPSDisplay-Regular.{ext}');check(ext+' version 1.300',any('1.300' in n.toUnicode() for n in f['name'].names if n.nameID==5));check(ext+' embedding allowed',f['OS/2'].fsType==0)
src=json.loads((O/'symbol-circle/source.json').read_text(encoding='utf8'));hole=src['shape'].split(' Z ',1)[1]
for theme in ['dark','light']:
    for material in ['solid','glass','silver','frost']:
        root=ET.parse(O/f'symbol-free/{material}-{theme}.svg').getroot();paths=[el for el in root if el.tag.split('}')[-1]=='path'];check(material+' '+theme+' exact standalone S',len(paths)==1 and paths[0].get('d')==hole)
pieces=json.loads((R/'data/si/wear-v9.json').read_text(encoding='utf8'));check('all 12 pieces have both front variants',len(pieces)==12 and all(p['frontVariants']==['circle','free'] for p in pieces))
for p in pieces:
    for k in ['photo','freePhoto','frontPrint','freeFrontPrint','print']:check(p['id']+' '+k+' file exists',(R/('public'+p[k])).is_file())
    check(p['id']+' back print bytes unchanged',(R/('public'+p['print'])).read_bytes()==(O/f'wear-v7/print-{p["id"]}.svg').read_bytes())
social=json.loads((R/'data/si/social-v9.json').read_text(encoding='utf8'));check('9 independent posts',len(social['posts'])==9);check('3 complete five-slide carousels',sum(len(p['frames'])==5 for p in social['posts'])==3);check('five complete four-story highlights',len(social['highlights'])==5 and all(len(h['frames'])==4 for h in social['highlights']))
check('no invented social stats',social['profile']['stats'].startswith('Not supplied'))
for type,frames,size in [('feed',[f for p in social['posts'] for f in p['frames']],(1080,1350)),('story',[f for h in social['highlights'] for f in h['frames']],(1080,1920))]:
    for f in frames:
        p=R/('public'+f['png']);im=Image.open(p);check(p.stem+' exact '+type+' dimensions',im.size==size)
        for key in ['preview','svg']:check(p.stem+' '+key+' exists',(R/('public'+f[key])).is_file())
        root=ET.parse(R/('public'+f['svg'])).getroot();check(p.stem+' native lettering',not any(e.tag.split('}')[-1]=='text' for e in root.iter()))
        # Curves may intentionally crop outside the page for large background graphics.
        # Visible content bounds are reviewed separately in the contact sheets/browser.
        check(p.stem+' useful body',f['title'].strip() and f['body'].strip())
for variant,a in social['avatars'].items():check(variant+' avatar export',Image.open(R/('public'+a['png'])).size==(1080,1080))
for name in ['post-autoria-1','post-house-1','post-curiosidade-1']:
    root=ET.parse(O/f'social-v9/{name}.svg').getroot();embedded=[e.get('href','') for e in root.iter() if e.tag.split('}')[-1]=='image'];check(name+' portable PNG photo embedding',embedded and all(x.startswith('data:image/png;base64,') for x in embedded))
book=fitz.open(O/'SINAPSE-SI-Brandbook-08.pdf');check('53 visual PDF pages',len(book)==53);text=' '.join(p.get_text() for p in book);check('social pages included','PERFIL / APRESENTAÇÃO' in text and 'DESTAQUE / SCHOOL' in text);check('standalone S page included','O S SEM CÍRCULO' in text);check('native PDF text and fonts',len(text)>6000 and any(p.get_fonts() for p in book))
report={'passed':len(checks),'changed_glyphs':sorted(changed),'checks':checks,'scope':'Original masters and all non-R glyphs; advances; exact positive S; print-source preservation; full social sequences; native file dimensions and current PDF. Browser review is a separate report.'}
(R/'qa/v9-fidelity-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(json.dumps({'passed':len(checks),'changed_glyphs':sorted(changed)}))
