from pathlib import Path
import json, re, base64, requests, hashlib, shutil, xml.etree.ElementTree as ET
from PIL import Image
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

root=Path(__file__).resolve().parents[1]; out=root/'public/si-v2'; out.mkdir(exist_ok=True)
for sub in ['logos','icons','templates','fonts','tools']: (out/sub).mkdir(exist_ok=True)
for name in ['wear','metal','glass','hero','tee','hoodie']:
    p=out/(name+'.png')
    if p.exists():
        Image.open(p).convert('RGB').save(out/(name+'.webp'),'WEBP',quality=91,method=6)
fontfile=out/'fonts/Manrope.ttf'
if not fontfile.exists():
    for remote,local in [('Manrope[wght].ttf','Manrope.ttf'),('OFL.txt','OFL.txt')]:
        r=requests.get('https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/'+remote,timeout=30);r.raise_for_status();(out/'fonts'/local).write_bytes(r.content)
lic=out/'fonts/OFL.txt';lic.write_text('\n'.join(line.rstrip() for line in lic.read_text(encoding='utf8').splitlines()).rstrip()+'\n',encoding='utf8',newline='\n')
font=TTFont(fontfile); medium=instantiateVariableFont(font,{'wght':600},inplace=False); medium.save(out/'fonts/Manrope-Semibold.ttf')
regular=instantiateVariableFont(font,{'wght':400},inplace=False);regular.save(out/'fonts/Manrope-Regular.ttf')
metrics={chr(code):medium['hmtx'].metrics[name][0]/medium['head'].unitsPerEm for code,name in medium.getBestCmap().items()}
(out/'manrope-metrics.json').write_text(json.dumps(metrics,ensure_ascii=False),encoding='utf8')
(root/'lib/si/v2-metrics.ts').write_text('export const MANROPE_METRICS:Record<string,number> = '+json.dumps(metrics,ensure_ascii=False)+';\n',encoding='utf8',newline='\n')
glyphs=medium.getGlyphSet(); cmap=medium.getBestCmap(); units=medium['head'].unitsPerEm
def outline(text,size):
    x=0; paths=[]
    for char in text:
        glyph=glyphs[cmap.get(ord(char),'space')];pen=SVGPathPen(glyphs);glyph.draw(TransformPen(pen,(size/units,0,0,-size/units,x,0)));paths.append(pen.getCommands());x+=(glyph.width/units-.035)*size
    return ''.join(paths),x
masters=json.loads((root/'public/si/masters.json').read_text()); snps=masters['snps']; word=masters['wordmark']
def svg(body,w=900,h=320):return f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">{body}</svg>'
materials={'solid':'currentColor','silver':'url(#silver)','glass':'url(#glass)','frost':'url(#frost)'}
defs='<defs><linearGradient id="silver" x2=".2" y2="1"><stop stop-color="#fafafa"/><stop offset=".2" stop-color="#5d5d5d"/><stop offset=".46" stop-color="#f7f7f7"/><stop offset=".52" stop-color="#777"/><stop offset=".82" stop-color="#eee"/><stop offset="1" stop-color="#b6b6b6"/></linearGradient><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".8"/><stop offset=".25" stop-color="#a6a6a6" stop-opacity=".12"/><stop offset=".49" stop-color="#fff" stop-opacity=".7"/><stop offset=".55" stop-color="#999" stop-opacity=".16"/><stop offset="1" stop-color="#fff" stop-opacity=".85"/></linearGradient><linearGradient id="frost" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".95"/><stop offset="1" stop-color="#999" stop-opacity=".6"/></linearGradient></defs>'
light_defs=re.sub(r'<linearGradient id="glass".*?</linearGradient>','<linearGradient id="glass" x2="1" y2="1"><stop stop-color="#55555d" stop-opacity=".9"/><stop offset=".24" stop-color="#dddddd" stop-opacity=".3"/><stop offset=".46" stop-color="#6a6a70" stop-opacity=".85"/><stop offset=".56" stop-color="#eeeeee" stop-opacity=".2"/><stop offset="1" stop-color="#686870" stop-opacity=".85"/></linearGradient>',defs)
for name in ['si','school','house','growth']:
    desc='SI' if name=='si' else name
    path,width=outline(desc,126)
    # The preserved SINAPSE master is aligned to a new, substantial second line.
    geometry=f'<g transform="translate(40 16) scale(1.16)">{word}</g><path transform="translate(79 278)" d="{path}"/>'
    for theme,color in [('dark','#f5f5f5'),('light','#111111')]:
        for material,fill in materials.items():
            stroke=' stroke="#dddddd" stroke-width=".45"' if material=='glass' else ''
            local_defs=defs
            if theme=='light' and material in ['glass','frost']:
                local_defs=light_defs
                stroke=' stroke="#77777f" stroke-width=".9"'
            data=svg(local_defs+f'<g color="{color}" fill="{fill}"{stroke}>{geometry}</g>')
            (out/'logos'/f'sinapse-{name}-{material}-{theme}.svg').write_text(data,encoding='utf8',newline='\n')
for theme,color in [('dark','#f5f5f5'),('light','#111111')]:
    for material,fill in materials.items():
        ldefs=light_defs if theme=='light' and material in ['glass','frost'] else defs
        stroke=' stroke="#77777f" stroke-width=".9"' if theme=='light' and material in ['glass','frost'] else ''
        (out/'logos'/f'snps-{material}-{theme}.svg').write_text(svg(ldefs+f'<g color="{color}" fill="{fill}"{stroke}>{snps}</g>',489.2,113.46),encoding='utf8',newline='\n')
(out/'geometry.json').write_text(json.dumps({'snps':snps,'wordmark':word},ensure_ascii=False),encoding='utf8')
(root/'lib/si/v2-master.ts').write_text('export const SNPS_PATHS = '+json.dumps(snps)+';\n',encoding='utf8',newline='\n')
css=''.join('@font-face{font-family:Manrope;src:url(data:font/ttf;base64,'+base64.b64encode((out/'fonts'/file).read_bytes()).decode()+');font-weight:'+str(weight)+';}' for file,weight in [('Manrope-Regular.ttf',400),('Manrope-Semibold.ttf',600)])
(out/'fonts/export.css').write_text(css,encoding='utf8',newline='\n')
for file in ['JetBrainsMono-Regular.ttf','jetbrainsmono-OFL.txt']:shutil.copy2(root/'public/si/fonts'/file,out/'fonts'/file)
assets=[('supabase','3ECF8E'),('figma','F24E1E'),('obsidian','7C3AED'),('n8n','EA4B71'),('vercel','777777'),('github','808080'),('warp','01A4FF'),('hostinger','673DE6'),('docker','2496ED')]
for name,color in assets:
    target=out/'tools'/f'{name}.svg'
    if not target.exists():
        r=requests.get(f'https://cdn.simpleicons.org/{name}/{color}',timeout=15)
        if r.ok and '<svg' in r.text:target.write_text(r.text,encoding='utf8')
r=requests.get('https://static.figma.com/app/icon/1/favicon.svg',timeout=15)
if r.ok and '<svg' in r.text:
    node=ET.fromstring(r.text);node.set('viewBox','0 0 16 16');(out/'tools/figma.svg').write_bytes(ET.tostring(node))
    paths={el.get('id'):el.get('d') for el in node.iter() if el.tag.endswith('path') and el.get('id')};parts=[]
    for el in node.iter():
        if el.tag.endswith('use'):
            ref=el.get('{http://www.w3.org/1999/xlink}href','')[1:];parts.append(f'<path d="{paths[ref]}" transform="{el.get("transform")}" fill="{el.get("fill")}"/>')
    graphic='<g transform="translate(64 122)">'+''.join(parts)+'</g>'
    (out/'tools/figma.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">'+graphic+'</svg>',encoding='utf8',newline='\n')
    (root/'lib/si/figma-graphic.ts').write_text('export const FIGMA_GRAPHIC = '+json.dumps(graphic)+';\n',encoding='utf8',newline='\n')
tool_paths={p.stem:' '.join(re.findall(r'<path[^>]*d="([^"]+)"',p.read_text(encoding='utf8'))) for p in (out/'tools').glob('*.svg')}
(root/'lib/si/tool-assets.ts').write_text('export const TOOL_PATHS:Record<string,string> = '+json.dumps(tool_paths)+';\n',encoding='utf8',newline='\n')
manifest={'version':'2.0-proposal','basis':'Caio 16/10/2026: dark first, light mode, SNPS and monochrome preserved, realistic Coinbase-inspired apparel, native tool colors.','generator':'OpenAI image generation, six referenced image studies','images':[{'file':f'{n}.webp','role':'generated conceptual visualization','sha256':hashlib.sha256((out/(n+'.webp')).read_bytes()).hexdigest()} for n in ['wear','metal','glass','hero','tee','hoodie']],'logos':'Native SVG masters in curves. Generated material photographs are expressive studies, not geometry masters.','tool_assets':'Simple Icons CDN, respective brands; use of a tool does not mean partnership.','fonts':'Manrope SIL OFL; Google Fonts official source.'}
manifest['reference']={'file':'public/brand/logo/vanta/snps-lockup.svg','sha256':hashlib.sha256((root/'public/brand/logo/vanta/snps-lockup.svg').read_bytes()).hexdigest()}
manifest['tool_sources']={'Figma':'https://static.figma.com/app/icon/1/favicon.svg','Others':'https://cdn.simpleicons.org/'}
(out/'asset-provenance.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print('V2 assets prepared: 40 vector signatures; 6 photographic studies; fonts and tool assets.')
