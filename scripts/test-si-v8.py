"""Source fidelity and exact current apparel/artifact contracts, not browser certification."""
from pathlib import Path
import json,hashlib,subprocess,xml.etree.ElementTree as ET
import cv2,numpy as np,fitz
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
def local(e):return e.tag.split('}')[-1]
for name in ['snps-lockup','sinapse-wordmark']:
    p=f'public/brand/logo/bone/{name}.svg';check(name+' original master bytes preserved',subprocess.check_output(['git','show','HEAD:'+p],cwd=R)==(R/p).read_bytes())
for ext in ['otf','ttf','woff2']:
    p=f'public/si-v2/fonts/SNPSDisplay-Regular.{ext}';check(ext+' corporate typeface preserved',subprocess.check_output(['git','show','HEAD:'+p],cwd=R)==(R/p).read_bytes())
im=cv2.imread(str(R/'qa-local/v8/circle-source-region.png'),0);source=(im>150).astype(np.uint8);ys,xs=np.where(source);source=source[ys.min():ys.max()+1,xs.min():xs.max()+1];source=cv2.resize(source,(1000,1000),interpolation=cv2.INTER_NEAREST).astype(bool)
render=cv2.imread(str(R/'qa-local/v8/circle-mask.png'),0)>150;iou=float(np.logical_and(source,render).sum()/np.logical_or(source,render).sum())
check('source silhouette overlap >99 percent',iou>.99)
yy,xx=np.ogrid[:1000,:1000];inside=(xx-499.5)**2+(yy-499.5)**2<480**2;src_hole=np.logical_and(~source,inside);dst_hole=np.logical_and(~render,inside);hole_iou=float(np.logical_and(src_hole,dst_hole).sum()/np.logical_or(src_hole,dst_hole).sum())
check('S aperture overlap >98 percent',hole_iou>.98)
meta=json.loads((O/'symbol-circle/source.json').read_text(encoding='utf8'));check('raster origin disclosed',meta['source_page']==8 and meta['native_original_vector_recovered'] is False)
for theme in ['dark','light']:
    shapes=[]
    for mat in ['solid','glass','silver','frost']:
        node=ET.parse(O/f'symbol-circle/{mat}-{theme}.svg').getroot();shapes.append(next(e.get('d') for e in node if local(e)=='path'))
    check(theme+' exact same contour across four materials',len(set(shapes))==1 and shapes[0]==meta['shape'])
pieces=json.loads((R/'data/si/wear-v8.json').read_text(encoding='utf8'))
check('12 pieces',len(pieces)==12);check('8 regular tees',sum(p['fit']=='regular' for p in pieces)==8);check('all phrases are on the back',all(p['side']=='costas' for p in pieces))
check('approved handwriting font unchanged',(O/'wear-v8/fonts/Hand.ttf').read_bytes()==(O/'wear-v7/fonts/Hand.ttf').read_bytes())
for p in pieces:
    path=R/('public'+p['print']);check(p['id']+' back art bytes preserved',path.read_bytes()==(O/f'wear-v7/print-{p["id"]}.svg').read_bytes())
    node=ET.parse(path).getroot();check(p['id']+' native transparent curves',all(local(e) not in ['text','image','rect'] for e in node.iter()))
    groups=[e for e in node if local(e)=='g'];mark=groups[-1];master=ET.parse(O/f'logos/snps-si-solid-{p["theme"]}.svg').getroot()
    check(p['id']+' SNPS SI signature exact',[e.get('d') for e in mark.iter() if local(e)=='path']==[e.get('d') for e in master.iter() if local(e)=='path'])
    check(p['id']+' front only circle',p['frontPrint']==f'/si-v2/symbol-circle/solid-{p["theme"]}.svg')
    check(p['id']+' correct pair row',p['photoRow']==(int(p['id'])-1)%2 and p['group']==(int(p['id'])-1)//2+1)
    check(p['id']+' paired photo exists',(R/('public'+p['photo'])).is_file())
    doc=fitz.open(stream=path.read_bytes(),filetype='svg');pdf=fitz.open(stream=doc.convert_to_pdf(),filetype='pdf');page=pdf[0];check(p['id']+' art inside print bounds',all(page.rect.contains(x['rect']) for x in page.get_drawings()))
book=fitz.open(O/'SINAPSE-SI-Brandbook-07.pdf');old=fitz.open(O/'SINAPSE-SI-Brandbook-06.pdf');check('40 current visual pages',len(book)==40);check('text reduced by more than 65 percent',sum(len(p.get_text()) for p in book)<.35*sum(len(p.get_text()) for p in old))
check('all twelve garments in book',all(any(p['name'] in ' '.join(page.get_text().split()) for page in book) for p in pieces));check('native visible PDF text and embedded fonts',sum(len(p.get_text()) for p in book)>3000 and any(p.get_fonts() for p in book))
check('reader current',"@/data/si/book-v8.json" in (R/'components/si-v2/book-reader.tsx').read_text(encoding='utf8'))
for folder in ['wear-v8','visual-v8']:
    provenance=json.loads((O/folder/'provenance.json').read_text(encoding='utf8'))
    for item in provenance['files']:check(item['key']+' photo checksum',hashlib.sha256((R/item['file']).read_bytes()).hexdigest()==item['sha256'])
report={'passed':len(checks),'source_silhouette_iou':iou,'source_negative_S_iou':hole_iou,'source_limit':'Raster outline recovered from supplied PDF, not native Bezier master. Overlap does not establish optical approval.','checks':checks,'browser':'not verified: browser URL policy and user-reported connection refused','scope':'Source-image overlap; byte preservation; exact native artwork; current PDF and metadata. No responsive/interaction certification.'}
(R/'qa/v8-fidelity-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(json.dumps({'passed':len(checks),'silhouette_iou':iou,'S_iou':hole_iou}))
