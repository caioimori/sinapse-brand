"""Verify the approved handwriting and exact horizontal signature in current print masters."""
from pathlib import Path
import json,hashlib,xml.etree.ElementTree as ET
import fitz
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
def local(el):return el.tag.split('}')[-1]
check('Approved Caveat font is byte-identical',(O/'wear-v7/fonts/Hand.ttf').read_bytes()==(O/'wear-v6/fonts/Hand.ttf').read_bytes())
for n in ['04','11']:
    before=[e for e in ET.parse(O/f'wear-v6/print-{n}.svg').getroot() if local(e)=='g']
    after=[e for e in ET.parse(O/f'wear-v7/print-{n}.svg').getroot() if local(e)=='g']
    check(n+' approved lettering curves preserved',all(ET.tostring(a)==ET.tostring(b) for a,b in zip(before[:2],after[:2])))
pieces=json.loads((O/'wear-v7/collection.json').read_text(encoding='utf8'))
check('12 pieces preserved',len(pieces)==12)
check('8 regular-fit tees',sum(p['fit']=='regular' for p in pieces)==8)
check('Rejected font roles removed',set(p['family'] for p in pieces)=={'Grotesk','Hand','Mono','MonoItalic'})
for p in pieces:
    node=ET.parse(R/'public'/p['print'].lstrip('/')).getroot();groups=[e for e in node if local(e)=='g'];mark=groups[-1]
    master=ET.parse(O/f'logos/snps-si-solid-{p["theme"]}.svg').getroot()
    check(p['id']+' exact SNPS SI curves',[el.get('d') for el in mark.iter() if local(el)=='path']==[el.get('d') for el in master.iter() if local(el)=='path'])
    check(p['id']+' no micro footer after signature',len(groups)==(3 if p['id'] in ['02','04','06','08','09','11','12'] else 4))
    check(p['id']+' native transparent artwork',all(local(el) not in ['text','image','rect'] for el in node.iter()))
    doc=fitz.open(stream=ET.tostring(node),filetype='svg');pdf=fitz.open(stream=doc.convert_to_pdf(),filetype='pdf');page=pdf[0];rects=[d['rect'] for d in page.get_drawings()]
    check(p['id']+' no clipping',all(page.rect.contains(rect) for rect in rects))
    signature=rects[-5:];cap=signature[-1].height
    check(p['id']+' horizontal signature',all(abs(rect.y0-signature[0].y0)<.02 and abs(rect.y1-signature[0].y1)<.02 for rect in signature))
    check(p['id']+' one-cap clear gap before SI',abs(signature[-1].x0-signature[-2].x1-cap)<.02)
report={'passed':len(checks),'checks':checks,'scope':'Approved lettering curves and font bytes, exact SNPS SI geometry, removal of micro tagline, native vector containment. Clothing fit still requires visual inspection.'}
(R/'qa/v7-wear-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(str(len(checks))+' apparel refinement checks passed.')
