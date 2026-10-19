"""Regenerate descriptor spacing without changing either original logo."""
from pathlib import Path
import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';cfg=json.loads((R/'data/si/signatures.json').read_text());defs=json.loads((R/'data/si/materials.json').read_text())['definitions'];masters=json.loads((O/'geometry.json').read_text());font=TTFont(O/'fonts/SNPSDisplay-Regular.otf');gs=font.getGlyphSet();cm=font.getBestCmap()
def outline(value):
 p=SVGPathPen(gs);x=0
 for ch in value:
  glyph=gs[cm[ord(ch)]];glyph.draw(TransformPen(p,(.1,0,0,-.1,x,70)));x+=glyph.width*.1
 return p.getCommands(),x-16.64*700/46.9*.1
def surface(body,material,theme):
 fg='#f5f5f5' if theme=='dark' else '#111111'
 if material=='solid':return f'<g fill="{fg}">{body}</g>'
 return f'<g transform="translate(0 1.2)" fill="{fg}" opacity=".22">{body}</g><g fill="url(#si-{material})" stroke="url(#si-edge)" stroke-width=".75" stroke-linejoin="round" paint-order="stroke fill">{body}</g><g fill="none" stroke="url(#si-edge)" stroke-width=".22" opacity=".9">{body}</g>'
for prefix in ['sinapse','snps']:
 width=(668.3 if prefix=='sinapse' else 422.64)*70/46.9;master=masters['wordmark' if prefix=='sinapse' else 'snps'];gap=cfg['descriptorGap']*70/cfg['sourceCapHeight']
 for descriptor in ['si','school','house','growth']:
  second,sw=outline(descriptor.upper());body=f'<g transform="translate(30 30)"><g transform="scale({70/46.9}) translate(-33.28 -33.28)">{master}</g><path d="{second}" transform="translate({width+gap} 0)"/></g>';w=width+gap+sw+60
  for theme in ['dark','light']:
   for material in ['solid','silver','glass','frost']:
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.3f}" height="130" viewBox="0 0 {w:.3f} 130"><title>{prefix.upper()} {descriptor.upper()} / {material}</title><defs>{defs[theme]}</defs>{surface(body,material,theme)}</svg>'
    (O/'logos'/f'{prefix}-{descriptor}-{material}-{theme}.svg').write_text(svg,encoding='utf8',newline='\n')
print('64 descriptor signatures: 46.90 source-unit gap; original prefix curves preserved.')
