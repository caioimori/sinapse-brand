from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools import subset
from fontTools.pens.svgPathPen import SVGPathPen
import json, base64, fitz, hashlib, re
from PIL import Image

root=Path(__file__).resolve().parents[1]
public=root/'public'/'si';fonts=public/'fonts'
def static_font(source,weight,name):
    f=TTFont(fonts/source)
    if 'fvar' in f:
        axes={a.axisTag:(weight if a.axisTag=='wght' else 32 if a.axisTag=='opsz' else a.defaultValue) for a in f['fvar'].axes}
        f=instantiateVariableFont(f,axes,inplace=True)
    family='JetBrains Mono' if name.startswith('JetBrains') else 'Inter'
    style='Semibold' if weight==600 else 'Medium' if weight==500 else 'Regular'
    for rec in f['name'].names:
        if rec.nameID in (1,2,4,6,16,17):
            value={1:family,2:style,4:family+' '+style,6:family.replace(' ','')+'-'+style,16:family,17:style}[rec.nameID]
            rec.string=value.encode(rec.getEncoding(),errors='replace')
    f.save(fonts/name)
    return f
regular=static_font('Inter[opsz,wght].ttf',400,'Inter-Regular.ttf')
medium=static_font('Inter[opsz,wght].ttf',500,'Inter-Medium.ttf')
bold=static_font('Inter[opsz,wght].ttf',600,'Inter-Semibold.ttf')
mono=static_font('JetBrainsMono[wght].ttf',400,'JetBrainsMono-Regular.ttf')
metrics={chr(code):round(medium['hmtx'][glyph][0]/medium['head'].unitsPerEm,6) for code,glyph in medium.getBestCmap().items() if code<1024}
(root/'lib'/'si'/'metrics.ts').write_text('export const INTER_METRICS:Record<string,number> = '+json.dumps(metrics,ensure_ascii=True)+';\n',encoding='utf8',newline='\n')
(public/'inter-metrics.json').write_text(json.dumps(metrics,ensure_ascii=True),encoding='utf8',newline='\n')
css=[]
for name,family,weight in [('Inter-Regular.ttf','Inter',400),('Inter-Medium.ttf','Inter',500),('Inter-Semibold.ttf','Inter',600),('JetBrainsMono-Regular.ttf','JetBrains Mono',400)]:
    f=TTFont(fonts/name)
    options=subset.Options();options.flavor='woff2';sub=subset.Subsetter(options=options);sub.populate(unicodes=range(32,592));sub.subset(f);f.flavor='woff2'
    p=fonts/(Path(name).stem+'.woff2');f.save(p)
    css.append('@font-face{font-family:'+repr(family)+';font-style:normal;font-weight:'+str(weight)+';src:url(data:font/woff2;base64,'+base64.b64encode(p.read_bytes()).decode()+') format("woff2");}')
(fonts/'inter-export.css').write_text(''.join(css),encoding='utf-8',newline='\n')

masters=json.loads((public/'masters.json').read_text())
def outlined(text,x,y,size,color):
    gs=medium.getGlyphSet();cmap=medium.getBestCmap();upem=medium['head'].unitsPerEm;scale=size/upem;cursor=0;parts=[]
    for char in text:
        glyph=cmap.get(ord(char))
        if not glyph:continue
        pen=SVGPathPen(gs);gs[glyph].draw(pen)
        parts.append(f'<path d="{pen.getCommands()}" transform="translate({x+cursor*scale:.4f} {y}) scale({scale:.6f} {-scale:.6f})" fill="{color}"/>')
        cursor+=medium['hmtx'][glyph][0]-(upem*.035)
    return ''.join(parts)
for edition,color in [('bone','#F5F5F0'),('vanta','#0A0A0A')]:
    for name,label in [('sinapse-si','SI'),('school','School'),('house','House'),('growth','Growth')]:
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="150" viewBox="0 0 1000 150"><title>SINAPSE {label} / proposed signature</title><desc>Original wordmark preserved. Descriptor outlined from Inter Medium, SIL OFL.</desc><g fill="{color}" transform="translate(0 18)">{masters["wordmark"]}</g><path d="M774 39v73" stroke="{color}" stroke-width="2"/>'+outlined(label,803,91,43 if label=='SI' else 35,color)+'</svg>'
        (public/'logos'/f'{name}-{edition}.svg').write_text(svg,encoding='utf-8',newline='\n')

selections=[('CamisetasSNPSV2.pdf',0,'tshirt-essential'),('CamisetasSNPSV2.pdf',1,'tshirt-white'),('MoletonsSNPS.pdf',0,'hoodie-essential'),('MoletonsSNPS.pdf',3,'hoodie-manifesto')]
for filename,page,name in selections:
    doc=fitz.open(Path.home()/'Downloads'/filename);p=doc[page];pix=p.get_pixmap(matrix=fitz.Matrix(.8,.8),alpha=False)
    Image.frombytes('RGB',[pix.width,pix.height],pix.samples).save(public/'studies'/f'{name}.webp',quality=90)

tokens={'version':'1.0-proposal','brand':'SINAPSE SI','status':'proposed_evolution','color':{'vanta':'#0A0A0A','carbon':'#141414','graphite':'#262626','silver':'#A6A6A6','mist':'#E8E8E5','bone':'#F5F5F0','white':'#FFFFFF'},'typography':{'information':'Inter','metadata':'JetBrains Mono','expression':'Audiowide','legacy-display':'Sora','logo':'preserved vector master'},'radius':{'control':6,'panel':12,'glass':24,'pill':9999},'spacing':{'base':4,'scale':[4,8,12,16,24,32,48,64,96,128]},'motion':{'response':'160ms','connection':'420ms','reveal':'720ms','ambient':'12s','ease':'cubic-bezier(.22,1,.36,1)','reduced_motion':'static'},'contrast':{'dark':{'background':'#0A0A0A','foreground':'#F5F5F0','secondary':'#A6A6A6'},'light':{'background':'#F5F5F0','foreground':'#0A0A0A','secondary':'#626262'}},'sources':{'masters':'public/brand/logo','brief':'Caio, 16/10/2026'},'publication':'not_published'}
(public/'tokens.json').write_text(json.dumps(tokens,ensure_ascii=False,indent=2),encoding='utf-8',newline='\n')
(public/'fontes-e-licencas.md').write_text('''# SINAPSE SI — fontes e licenças

Inter: informação e títulos. JetBrains Mono: metadados. Audiowide: exploração expressiva. Sora: compatibilidade com o acervo.

Fontes obtidas do repositório oficial google/fonts. As licenças SIL Open Font License acompanham cada família em fonts/. Os arquivos estáticos foram instanciados a partir das fontes variáveis e incluem as fontes para o PDF.

O logo usa seus desenhos vetoriais originais. Descritores das variantes propostas estão convertidos em curvas de Inter Medium.

Helvetica Neue e Gotham aparecem no estudo recebido; não são redistribuídas neste pacote. Audiowide não substitui o lettering do logo.

Fontes: https://github.com/google/fonts/tree/main/ofl/inter ; https://github.com/google/fonts/tree/main/ofl/jetbrainsmono ; https://github.com/google/fonts/tree/main/ofl/audiowide ; https://github.com/google/fonts/tree/main/ofl/sora
''',encoding='utf-8',newline='\n')
print('Outlined signatures, 4 study images, fonts, embedded SVG font CSS and tokens prepared.')
