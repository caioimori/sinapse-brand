from pathlib import Path
import json,base64,shutil,hashlib
from PIL import Image,ImageDraw,ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';F=O/'fonts';Q=R/'qa-local/v3';Q.mkdir(exist_ok=True,parents=True)
for d in ['materials','book']:(O/d).mkdir(exist_ok=True)
font=TTFont(F/'SNPSDisplay-Regular.otf');gs=font.getGlyphSet();cmap=font.getBestCmap()
def outline(value,size=100):
    p=SVGPathPen(gs);x=0
    for ch in value:
        g=gs[cmap[ord(ch)]];g.draw(TransformPen(p,(size/1000,0,0,-size/1000,x,size*.7)));x+=g.width*size/1000
    return p.getCommands(),x-16.64*700/46.9*size/1000
defs={}
for theme in ['dark','light']:
    a='#ffffff' if theme=='dark' else '#33333a';b='#33333a' if theme=='dark' else '#b8b8c0'
    defs[theme]=f'<linearGradient id="si-silver" x1="0" y1="0" x2=".18" y2="1"><stop stop-color="#fafafa"/><stop offset=".18" stop-color="#77777c"/><stop offset=".41" stop-color="#f8f8fa"/><stop offset=".49" stop-color="#68686e"/><stop offset=".7" stop-color="#dfdfe2"/><stop offset="1" stop-color="#b2b2b8"/></linearGradient><linearGradient id="si-glass" x1="0" y1="0" x2=".24" y2="1"><stop stop-color="{a}" stop-opacity=".92"/><stop offset=".16" stop-color="{b}" stop-opacity=".26"/><stop offset=".4" stop-color="{a}" stop-opacity=".12"/><stop offset=".49" stop-color="{a}" stop-opacity=".82"/><stop offset=".56" stop-color="{b}" stop-opacity=".1"/><stop offset=".82" stop-color="{a}" stop-opacity=".15"/><stop offset="1" stop-color="{a}" stop-opacity=".8"/></linearGradient><linearGradient id="si-frost" x2=".8" y2="1"><stop stop-color="{a}" stop-opacity=".85"/><stop offset="1" stop-color="{b}" stop-opacity=".5"/></linearGradient><linearGradient id="si-edge" x2=".1" y2="1"><stop stop-color="{a}"/><stop offset=".28" stop-color="{b}"/><stop offset=".49" stop-color="{a}"/><stop offset=".63" stop-color="{b}"/><stop offset="1" stop-color="{a}"/></linearGradient>'
materials={'revision':3,'edgeWidth':.75,'depth':1.2,'definitions':defs,'rules':{'content':'Solid text, clear hierarchy.','glass':'One optical plane, directional highlight, dark/light adaptation.','noGlassOnGlass':True,'reference':'https://developer.apple.com/videos/play/wwdc2025/219/'}}
(R/'data/si/materials.json').write_text(json.dumps(materials,ensure_ascii=False,indent=2),encoding='utf8')
(R/'lib/si/material-tokens.ts').write_text('export const MATERIAL_DEFS = '+json.dumps(defs)+';\n',encoding='utf8',newline='\n')
(O/'materials/system.json').write_text(json.dumps(materials,ensure_ascii=False,indent=2),encoding='utf8')
def surface(body,material,theme):
    fg='#f5f5f5' if theme=='dark' else '#111111'
    if material=='solid':return f'<g fill="{fg}">{body}</g>'
    fill=f'url(#si-{material})';edge='url(#si-edge)'
    return f'<g transform="translate(0 1.2)" fill="{fg}" opacity=".22">{body}</g><g fill="{fill}" stroke="{edge}" stroke-width=".75" stroke-linejoin="round" paint-order="stroke fill">{body}</g><g fill="none" stroke="{edge}" stroke-width=".22" opacity=".9">{body}</g>'
names=['snps','sinapse','sinapse-si','sinapse-school','sinapse-house','sinapse-growth','snps-si','snps-school','snps-house','snps-growth']
masters=json.loads((O/'geometry.json').read_text())
for name in names:
    words=name.upper().split('-');parts=[]
    if name=='snps':
        geometry=masters['snps'];w=489.2;h=113.46
    else:
        path,width=outline(words[0],100);height=70
        if words[0]=='SINAPSE':
            # The full wordmark is a separate immutable master, including its
            # second S contour. Never reconstruct that signature from font text.
            width=(701.58-33.28)*70/46.9
            parts.append(f'<g transform="scale({70/46.9}) translate(-33.28 -33.28)">{masters["wordmark"]}</g>')
        elif words[0]=='SNPS':
            width=(455.92-33.28)*70/46.9
            parts.append(f'<g transform="scale({70/46.9}) translate(-33.28 -33.28)">{masters["snps"]}</g>')
        else:parts.append(f'<path d="{path}"/>')
        if len(words)>1:
            # The descriptor shares the master cap line and baseline.
            second,sw=outline(words[1],100);gap=json.loads((R/'data/si/signatures.json').read_text())['descriptorGap']*70/46.9
            parts.append(f'<path d="{second}" transform="translate({width+gap} 0)"/>');width+=gap+sw
        w=width+60;h=height+60;geometry='<g transform="translate(30 30)">'+''.join(parts)+'</g>'
    for theme in ['dark','light']:
        for material in ['solid','silver','glass','frost']:
            data=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w:.3f}" height="{h:.3f}" viewBox="0 0 {w:.3f} {h:.3f}"><title>{name.upper().replace("-"," ")} / {material}</title><defs>{defs[theme]}</defs>{surface(geometry,material,theme)}</svg>'
            (O/'logos'/f'{name}-{material}-{theme}.svg').write_text(data,encoding='utf8',newline='\n')
# Give static instances distinct names, so PDF engines do not merge weights.
for file,style in [('Manrope-Regular.ttf','Regular'),('Manrope-Semibold.ttf','Semibold')]:
    face=TTFont(F/file)
    for record in face['name'].names:
        values={1:'Manrope',2:style,4:'Manrope '+style,6:'Manrope-'+style,16:'Manrope',17:style}
        if record.nameID in values:record.string=values[record.nameID].encode(record.getEncoding())
    face.save(F/file)
css=''.join('@font-face{font-family:'+family+';src:url(data:font/ttf;base64,'+base64.b64encode((F/file).read_bytes()).decode()+');font-weight:'+str(weight)+';}' for family,file,weight in [('Manrope','Manrope-Regular.ttf',400),('Manrope','Manrope-Semibold.ttf',600),('SNPS Display','SNPSDisplay-Regular.ttf',400)])
(F/'export.css').write_text(css,encoding='utf8',newline='\n')
generated=Path('C:/Users/Caio Imori/.codex/generated_images/01a146da-3df5-7531-97bf-7dda4c126f3a')
for name,file in [('tee','exec-2df19ec3-f178-414f-b067-3bcc823443b8.png'),('hoodie','exec-7f24e67c-1ae1-47ce-9678-b277166e3c14.png')]:
    if (generated/file).exists():
        im=Image.open(generated/file);im.save(O/(name+'.png'));im.convert('RGB').save(O/(name+'.webp'),'WEBP',quality=94)
    elif not (O/(name+'.webp')).exists():raise FileNotFoundError(f'Missing approved render: {name}. Restore the existing asset; do not generate a substitute.')
if (generated/'exec-19c3b2a7-1b18-4d9a-9552-b34595be7ffd.png').exists():shutil.copy2(generated/'exec-19c3b2a7-1b18-4d9a-9552-b34595be7ffd.png',O/'materials/snps-glass-transparent.png')
elif not (O/'materials/snps-glass-transparent.png').exists():raise FileNotFoundError('Restore the approved portable glass PNG.')
im=Image.open(O/'materials/snps-glass-transparent.png');assert im.mode=='RGBA' and im.getextrema()[3][0]==0
im.save(O/'materials/snps-glass-transparent.webp','WEBP',quality=96,method=6)
(R/'lib/si/portable-glass.ts').write_text('export const PORTABLE_GLASS = "data:image/webp;base64,'+base64.b64encode((O/'materials/snps-glass-transparent.webp').read_bytes()).decode()+'";\n',encoding='utf8',newline='\n')
# Native typography specimen for visual review (no photo manipulation).
sheet=Image.new('RGB',(1920,1500),'#0a0a0a');d=ImageDraw.Draw(sheet)
for i,line in enumerate(['SINAPSE','SNPS SCHOOL','SNPS HOUSE','SNPS GROWTH','ABCDEFGHIJKLMNOPQRSTUVWXYZ','0123456789','AÇÃO INTELIGÊNCIA']):
    size=110 if i<4 else 65;face=ImageFont.truetype(str(F/'SNPSDisplay-Regular.ttf'),size)
    while d.textlength(line,font=face)>1750:size-=2;face=ImageFont.truetype(str(F/'SNPSDisplay-Regular.ttf'),size)
    d.text((85,70+i*195),line,font=face,fill='white')
sheet.save(Q/'font-specimen.jpg')
provenance=json.loads((O/'asset-provenance.json').read_text(encoding='utf8'));provenance['version']='3.0-proposal';provenance['font']='SNPS Display custom. S I N A P E from original vector; alphabet, digits, accents and punctuation extended. Lowercase keys use uppercase designs.';provenance['I_fix']='Original rect x143.1 y33.28 width9.38 height46.9 recovered; source unchanged.';provenance['apparel_sources']=['https://coinbaseshop.com/products/coin-logo-tee','https://coinbaseshop.com/products/bitcoin-whitepaper-hoodie-light-mode'];provenance['portable_glass']={'file':'materials/snps-glass-transparent.png','kind':'Generated raster with alpha, optical study. Geometry master remains SVG.','sha256':hashlib.sha256((O/'materials/snps-glass-transparent.png').read_bytes()).hexdigest()};provenance['images']=[{'file':n+'.webp','role':'generated conceptual visualization','sha256':hashlib.sha256((O/(n+'.webp')).read_bytes()).hexdigest()} for n in ['hero','glass','metal','tee','hoodie']];(O/'asset-provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print('80 SVG signatures; descriptors on the same cap line and baseline; both masters intact.')
