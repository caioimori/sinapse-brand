"""Standalone S uses exactly the negative contour of the user-selected circular symbol."""
from pathlib import Path
import json
from fontTools.svgLib.path import parse_path
from fontTools.pens.boundsPen import BoundsPen
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/symbol-free';O.mkdir(exist_ok=True)
src=json.loads((R/'public/si-v2/symbol-circle/source.json').read_text(encoding='utf8'));hole=src['shape'].split(' Z ',1)[1]
p=BoundsPen(None);parse_path(hole,p);x,y,x2,y2=p.bounds;pad=35;defs=json.loads((R/'data/si/materials.json').read_text(encoding='utf8'))['definitions'];vb=f'{x-pad:.4f} {y-pad:.4f} {x2-x+2*pad:.4f} {y2-y+2*pad:.4f}'
for theme in ['dark','light']:
    for mat in ['solid','glass','silver','frost']:
        fg='#f5f5f5' if theme=='dark' else '#111111';fill=fg if mat=='solid' else f'url(#si-{mat})'
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" width="1000" height="{round(1000*(y2-y+2*pad)/(x2-x+2*pad))}"><title>S fino sem círculo / {mat} / {theme}</title><desc>Mesmo contorno interno da versão circular da página 8 de Idv_SNPS.pdf, aplicado como forma positiva.</desc><defs>{defs[theme]}</defs><path d="{hole}" fill="{fill}"/></svg>'
        (O/f'{mat}-{theme}.svg').write_text(svg,encoding='utf8',newline='\n')
(O/'source.json').write_text(json.dumps({'name':'S fino sem círculo','requested_by_user':'2026-10-19','derived_from':'symbol-circle/source.json','source_pdf_page':8,'shape':hole,'viewBox':vb,'bounds':[x,y,x2,y2],'construction':'Exact negative-space contour reused as a filled positive shape; no redraw.','source_limit':src['source_type']},ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print('8 standalone S variants exported from the exact circle aperture.')
