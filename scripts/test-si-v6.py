"""Check actual exported geometry, preserved masters and current publication files."""
from pathlib import Path
import json,hashlib,subprocess,xml.etree.ElementTree as ET
import fitz
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';checks=[]
def check(name,value):
    assert value,name
    checks.append(name)
masters=json.loads((O/'geometry.json').read_text(encoding='utf8'))
for prefix in ['snps','sinapse']:
    for suffix in ['si','school','house','growth']:
        for theme in ['dark','light']:
            p=O/f'logos/{prefix}-{suffix}-solid-{theme}.svg';svg=p.read_text(encoding='utf8')
            check(p.stem+' original prefix intact',masters['snps' if prefix=='snps' else 'wordmark'] in svg)
            d=fitz.open(stream=svg.encode(),filetype='svg');pdf=fitz.open(stream=d.convert_to_pdf(),filetype='pdf');page=pdf[0];rects=[x['rect'] for x in page.get_drawings()]
            check(p.stem+' same cap and baseline',all(abs(x.y0-30)<.02 and abs(x.y1-100)<.02 for x in rects))
            check(p.stem+' actual clear gap equals one cap height',abs(rects[-1].x0-max(x.x1 for x in rects[:-1])-70)<.02)
            check(p.stem+' no clipping',all(page.rect.contains(x) for x in rects))
for name in ['snps-lockup','sinapse-wordmark']:
    path=f'public/brand/logo/bone/{name}.svg';check(name+' bytes unchanged',subprocess.check_output(['git','show','HEAD:'+path],cwd=R)==(R/path).read_bytes())
for extension in ['otf','ttf','woff2']:
    path=f'public/si-v2/fonts/SNPSDisplay-Regular.{extension}';check('corporate font unchanged '+extension,subprocess.check_output(['git','show','HEAD:'+path],cwd=R)==(R/path).read_bytes())
pieces=json.loads((O/'wear-v6/collection.json').read_text(encoding='utf8'));check('12 current garments',len(pieces)==12)
check('requested phrase on tee and hoodie',sum(p['phrase']=="If you see me in public, it’s AI." for p in pieces)==2)
for p in pieces:
    path=R/'public'/p['print'].lstrip('/');node=ET.parse(path).getroot();check(p['id']+' native transparent curves',all(el.tag.split('}')[-1] not in ['text','image','rect'] for el in node.iter()))
    doc=fitz.open(stream=path.read_bytes(),filetype='svg');pdf=fitz.open(stream=doc.convert_to_pdf(),filetype='pdf');page=pdf[0]
    check(p['id']+' artwork contained',all(page.rect.contains(x['rect']) for x in page.get_drawings()))
book=fitz.open(O/'SINAPSE-SI-Brandbook-06.pdf');check('60 current PDF pages',len(book)==60)
check('rejected graphic replaced by phrase on page 24','Entre ideia' in book[23].get_text() and 'e ação.' in book[23].get_text())
check('new collection in PDF','Collection 03'.upper() in book[41].get_text().upper())
check('new requested phrase in PDF','If you see me in public' in book[42].get_text())
source=(R/'scripts/build-si-v6-book.py').read_text(encoding='utf8');check('current book contains no rejected imagery',all(s not in source for s in ["photo('passage-3d'","photo('ooh-v5'","photo('signal-sculpture'"]))
check('current reader uses revision 06',"@/data/si/book-v6.json" in (R/'components/si-v2/book-reader.tsx').read_text(encoding='utf8'))
report={'passed':len(checks),'checks':checks,'scope':'Actual exported clear gaps and cap/baselines, byte preservation of both masters and corporate font, native print bounds, current reader/PDF content.'}
(R/'qa/v6-geometry-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');print(str(len(checks))+' revision 06 checks passed.')
