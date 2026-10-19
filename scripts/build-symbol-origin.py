"""Source-letter study. Copy approved curves verbatim; never redraw the master."""
from pathlib import Path
from io import BytesIO
import json, hashlib, zipfile, xml.etree.ElementTree as ET
import fitz
from PIL import Image
from fontTools.pens.boundsPen import BoundsPen
from fontTools.svgLib.path import parse_path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor

R=Path(__file__).resolve().parents[1]; O=R/'public/si-v2/symbol-origin'; O.mkdir(exist_ok=True)
Q=R/'qa-local/symbol-origin'; Q.mkdir(parents=True,exist_ok=True)
NS={'s':'http://www.w3.org/2000/svg'}
sources={}
for name in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{name}.svg'; root=ET.parse(p).getroot()
    sources[name]={'file':p.relative_to(R).as_posix(),'sha256':hashlib.sha256(p.read_bytes()).hexdigest(),'viewBox':root.get('viewBox'),'paths':[n.get('d') for n in root.findall('.//s:path',NS)]}
d=sources['snps-lockup']['paths'][0]
assert d==sources['sinapse-wordmark']['paths'][0], 'The source initial must be identical in both approved logos.'
pen=BoundsPen(None); parse_path(d,pen); x0,y0,x1,y1=pen.bounds; w=x1-x0; h=y1-y0
tx=64-(x0+x1)/2; ty=64-(y0+y1)/2
transform=f'translate({tx:.8f} {ty:.8f})'
shape=f'<path d="{d}" transform="{transform}"/>'
materials=json.loads((R/'data/si/materials.json').read_text(encoding='utf8'))
data={'status':'source_letter_study_for_review','selected':None,'recommended':None,'approach':'Exact source S, isolated for comparison; not an approved new icon.','path':d,'path_sha256':hashlib.sha256(d.encode()).hexdigest(),'transform':transform,'bounds':[x0,y0,x1,y1],'metrics':{'width':round(w,2),'height':round(h,2),'aspect':round(w/h,6),'stroke':9.38,'return_radius':4.69,'terminal_radius':0,'stroke_height_ratio':0.2},'sources':[{k:v for k,v in s.items() if k!='paths'} for s in sources.values()],'rejected':['nexo','sintese','pulso'],'limits':['Use as an isolated mark remains a design proposal.','No invented three-element symbolism.','Preserve the horizontal source proportions, including in a square or circular frame.','Material stays clipped inside the original contour.']}
(R/'data/si/symbol-origin.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(O/'origin.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
def svg(body,view='0 0 128 128',size=512,title='S original / estudo de uso isolado'):
    _,_,vw,vh=map(float,view.split());height=size*vh/vw
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" width="{size}" height="{height:.8f}"><title>{title}</title>{body}</svg>'
for theme in ['dark','light']:
    fg='#f5f5f5' if theme=='dark' else '#111111'; muted='#555555' if theme=='dark' else '#bbbbbb'
    for material in ['solid','silver','glass','frost']:
        if material=='solid': body=f'<g fill="{fg}">{shape}</g>'
        else:
            # All illumination is clipped to the source silhouette, including edge paint.
            defs=materials['definitions'][theme]+f'<clipPath id="source-outline">{shape}</clipPath>'
            body=f'<defs>{defs}</defs><g clip-path="url(#source-outline)"><g fill="url(#si-{material})" stroke="url(#si-edge)" stroke-width=".75">{shape}</g><g fill="none" stroke="url(#si-edge)" stroke-width=".22">{shape}</g></g>'
        (O/f's-original-{material}-{theme}.svg').write_text(svg(body),encoding='utf8')
    (O/f's-original-tight-{theme}.svg').write_text(svg(f'<path d="{d}" fill="{fg}"/>',f'{x0-9.38} {y0-9.38} {w+18.76} {h+18.76}'),encoding='utf8')
    guides=f'<g fill="none" stroke="{muted}" stroke-width=".35"><rect x="{64-w/2}" y="{64-h/2}" width="{w}" height="{h}"/><path d="M17.41 31.17H110.59M17.41 28.17V34.17M110.59 28.17V34.17M7.8 40.55V87.45M4.8 40.55H10.8M4.8 87.45H10.8"/><path d="M17.41 49.93H110.59M17.41 59.31H110.59M17.41 68.69H110.59M17.41 78.07H110.59" stroke-dasharray="1.4 1.4"/></g>'
    (O/f's-original-construction-{theme}.svg').write_text(svg(f'<g fill="{fg}">{shape}</g>'+guides),encoding='utf8')
    for name,source in sources.items():
        paths=''.join(f'<path d="{v}" fill="{fg if i==0 else muted}"/>' for i,v in enumerate(source['paths']))
        (O/f'source-{name}-{theme}.svg').write_text(svg(paths,source['viewBox'],1024,'Mestre original / S destacado para análise'),encoding='utf8')

# Native PDF: exact vector shapes are stamped after native typography.
for alias,file in [('Read','Manrope-Regular.ttf'),('Bold','Manrope-Semibold.ttf'),('Mono','JetBrainsMono-Regular.ttf')]:
    pdfmetrics.registerFont(TTFont(alias,str(R/'public/si-v2/fonts'/file)))
W,H=1920,1080; c=canvas.Canvas(str(O/'SINAPSE-Origem-do-Traco.pdf'),pagesize=(W,H)); c.setTitle('SINAPSE — origem do traço'); c.setAuthor('SINAPSE / estudo para revisão')
stamps=[]; errors=[]; pages=[]; fg='#f5f5f5'; muted='#aaaaaa'
def text(v,x,y,size=28,font='Read',color=None):
    c.setFillColor(HexColor(color or fg));c.setFont(font,size);c.drawString(x,y,v)
    if x<0 or x+pdfmetrics.stringWidth(v,font,size)>W+1 or y<0 or y+size>H+1: errors.append(v)
def para(v,x,y,width,size=30,color=None):
    line=''
    for word in v.split():
        if line and pdfmetrics.stringWidth(line+' '+word,'Read',size)>width:text(line,x,y,size,color=color);y-=size*1.5;line=word
        else:line=(line+' '+word).strip()
    if line:text(line,x,y,size,color=color)
def page(name,light=False):
    global fg,muted
    if pages:c.showPage()
    pages.append(name);fg='#111111' if light else '#f5f5f5';muted='#666666' if light else '#aaaaaa'
    c.setFillColor(HexColor('#f5f5f5' if light else '#0a0a0a'));c.rect(0,0,W,H,fill=1,stroke=0)
    text('SINAPSE / ORIGEM DO TRAÇO',90,1010,18,'Mono',muted);text(str(len(pages)).zfill(2),1790,1010,18,'Mono',muted);text('ESTUDO DE USO ISOLADO / MESTRES PRESERVADOS / OUT 2026',90,65,16,'Mono',muted)
def vector(file,x,y,width,height):
    raw=(O/file).read_bytes();node=ET.fromstring(raw);_,_,vw,vh=map(float,node.get('viewBox').split());scale=min(width/vw,height/vh);sw,sh=vw*scale,vh*scale;sy=y+(height-sh)/2
    stamps.append((len(pages)-1,raw,fitz.Rect(x,H-sy-sh,x+sw,H-sy)))
def headline(lines,size=110):
    for i,line in enumerate(lines):text(line,90,815-i*size*1.1,size,'Bold')
page('Origem');headline(['A forma','vem daqui.']);vector('s-original-tight-dark.svg',1030,300,800,530)
para('O S dos logos SNPS e SINAPSE, extraído diretamente do vetor original.',95,405,760,40)
para('Um estudo de uso isolado que preserva proporção, espessura, terminais e curvas. A decisão sobre o novo ícone continua aberta.',95,220,780,28,muted)
page('Fonte');headline(['O mesmo contorno.','Nos dois mestres.'],90)
vector('source-snps-lockup-dark.svg',90,415,1160,230);vector('source-sinapse-wordmark-dark.svg',90,185,1160,230)
para('O primeiro S tem exatamente os mesmos comandos de curva nos dois arquivos. A extração conserva o atributo d inteiro; só muda a posição no enquadramento.',1360,550,450,30,muted)
page('Construção',True);headline(['Horizontal.','Contínuo. Preciso.'],90);vector('s-original-construction-light.svg',70,130,1000,620)
for i,(value,title,copy) in enumerate([('1,987 : 1','Proporção','93,18 de largura / 46,90 de altura.'),('9,38','Traço','20% da altura do desenho.'),('4,69','Retorno','Metade da espessura, nas curvas do S.'),('0','Terminal','Corte reto na abertura; sem arredondamento novo.')]):
    y=640-i*130;text(value,1180,y,40,'Bold');text(title,1430,y,26,'Bold');para(copy,1180,y-43,610,24,muted)
page('Uso');headline(['O enquadramento muda.','O desenho permanece.'],85)
for i,size in enumerate([100,180,280]):
    x=110+i*370;y=280;c.setStrokeColor(HexColor('#555555'));c.setLineWidth(1);c.circle(x+size/2,y+size/2,size/2,stroke=1,fill=0);vector('s-original-solid-dark.svg',x,y,size,size)
    text(str(size)+' / TAMANHO DE APRESENTAÇÃO',x,220,17,'Mono',muted)
para('O S mantém sua largura original dentro do círculo. O espaço em volta pertence ao enquadramento; não comprimir a letra para preencher um quadrado.',1270,620,540,32)
para('Confira 24, 32, 64 e 150 pixels reais no laboratório web. A leitura do S sozinho ainda precisa ser avaliada em contexto.',1270,340,540,26,muted)
page('Limites',True);headline(['Congruência primeiro.','A escolha continua aberta.'],85);vector('s-original-tight-light.svg',1130,295,680,440)
para('Este é o S existente em uso isolado, com geometria verificável. Não há nova letra, monograma redesenhado ou significado triplo atribuído ao contorno.',95,530,890,35)
para('Para o símbolo definitivo, a construção horizontal e os retornos seletivos dos mestres passam a ser restrições de desenho. Não repetir as massas compactadas das opções rejeitadas.',95,280,890,29,muted)
c.save();doc=fitz.open(O/'SINAPSE-Origem-do-Traco.pdf')
for pid,raw,rect in stamps:
    source=fitz.open(stream=raw,filetype='svg');pdf=fitz.open(stream=source.convert_to_pdf(),filetype='pdf');doc[pid].show_pdf_page(rect,pdf,0)
temp=O/'native.pdf';doc.save(temp,garbage=4,deflate=True);doc.close();temp.replace(O/'SINAPSE-Origem-do-Traco.pdf');doc=fitz.open(O/'SINAPSE-Origem-do-Traco.pdf')
sheet=Image.new('RGB',(1440,270*2),'#222222')
for i,p in enumerate(doc):
    pix=p.get_pixmap(matrix=fitz.Matrix(.25,.25));sheet.paste(Image.open(BytesIO(pix.tobytes('png'))).convert('RGB'),((i%3)*480,(i//3)*270))
sheet.save(Q/'pdf-contact.jpg',quality=95)
report={'pages':len(doc),'dimensions':[W,H],'native_characters':sum(len(p.get_text()) for p in doc),'text_bounds_errors':errors,'embedded_fonts':sorted({f[3] for p in doc for f in p.get_fonts()}),'source_path_identical':True,'source_masters':[s['sha256'] for s in data['sources']]}
assert not errors,errors
(R/'qa/symbol-origin-pdf.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8')
files=sorted(O.glob('*.svg'))+[O/'origin.json',O/'SINAPSE-Origem-do-Traco.pdf']
manifest={'status':data['status'],'source_path_sha256':data['path_sha256'],'files':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]}
(O/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf8')
with zipfile.ZipFile(O/'SINAPSE-Origem-do-Traco.zip','w',zipfile.ZIP_DEFLATED) as z:
    for p in files+[O/'manifest.json']:z.write(p,'SINAPSE-Origem-do-Traco/'+p.name)
with zipfile.ZipFile(O/'SINAPSE-Origem-do-Traco.zip') as z:assert z.testzip() is None
print(json.dumps(report))
