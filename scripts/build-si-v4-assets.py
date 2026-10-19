"""Author original SINAPSE compositions. No reference-project media is published."""
from pathlib import Path
import json,base64,html,subprocess,xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image
import fitz
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/si-v2';A=OUT/'applications';A.mkdir(exist_ok=True)
fonts={k:TTFont(OUT/'fonts'/v) for k,v in {'display':'SNPSDisplay-Regular.otf','sans':'Manrope-Regular.ttf','bold':'Manrope-Semibold.ttf','mono':'JetBrainsMono-Regular.ttf'}.items()}
geo=json.loads((ROOT/'scripts/snps-font-geometry.json').read_text(encoding='utf8'));S=geo['master']['S'];N=geo['master']['N'];P=geo['master']['P']
(ROOT/'data/si/corner-grammar.json').write_text(json.dumps({k:geo['master'][k] for k in ['S','P','N']},indent=2),encoding='utf8')

def txt(value,x,y,size=30,fill='#f5f5f5',face='sans',maxw=None):
    f=fonts[face];gs=f.getGlyphSet();cm=f.getBestCmap();u=f['head'].unitsPerEm
    width=sum(gs[cm.get(ord(ch),'space')].width*size/u for ch in value)
    if maxw and width>maxw:size*=maxw/width;width=maxw
    p=SVGPathPen(gs);advance=x
    for ch in value:
        g=gs[cm.get(ord(ch),'space')];g.draw(TransformPen(p,(size/u,0,0,-size/u,advance,y)));advance+=g.width*size/u
    return f'<path aria-label="{html.escape(value)}" fill="{fill}" d="{p.getCommands()}"/>'

DEFS='''<linearGradient id="metal" x1="0%" y1="0%" x2="15%" y2="100%"><stop offset="0%" stop-color="#f5f5f5"/><stop offset="24%" stop-color="#5a5a5a"/><stop offset="49%" stop-color="#f5f5f5"/><stop offset="54%" stop-color="#8a8a8a"/><stop offset="83%" stop-color="#e1e1e1"/><stop offset="100%" stop-color="#666"/></linearGradient><radialGradient id="light"><stop offset="0%" stop-color="#555"/><stop offset="100%" stop-color="#0a0a0a"/></radialGradient><linearGradient id="fade"><stop offset="0%" stop-color="#f5f5f5" stop-opacity="0"/><stop offset="50%" stop-color="#f5f5f5" stop-opacity=".8"/><stop offset="100%" stop-color="#f5f5f5" stop-opacity=".08"/></linearGradient>'''
def svg(name,body,w=1080,h=1350,bg='#0a0a0a'):
    value=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}"><title>{name.replace("-"," ")}</title><defs>{DEFS}</defs><rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>'
    (A/(name+'.svg')).write_text(value,encoding='utf8',newline='\n')
    return value
def logo(name='sinapse-house',x=70,y=70,w=400,theme='dark'):
    return inline(OUT/'logos'/f'{name}-solid-{theme}.svg',x,y,w,w*113.46/489.2 if name=='snps' else 110)
def center(value,y,size=30,fill='#f5f5f5',face='sans',width=1080):
    f=fonts[face];gs=f.getGlyphSet();cm=f.getBestCmap();u=f['head'].unitsPerEm
    length=sum(gs[cm.get(ord(ch),'space')].width*size/u for ch in value)
    return txt(value,(width-length)/2,y,size,fill,face)
def inline(path,x,y,w,h):
    node=ET.fromstring(path.read_text(encoding='utf8'));vx,vy,vw,vh=map(float,node.get('viewBox').split());s=min(w/vw,h/vh)
    body=''.join(ET.tostring(el,encoding='unicode') for el in node if el.tag.split('}')[-1]!='title')
    fill=node.get('fill','inherit')
    return f'<g fill="{fill}" transform="translate({x} {y}) scale({s}) translate({-vx} {-vy})">{body}</g>'
def signal(x,y,scale=10,fill='url(#metal)',opacity=1):return f'<path d="{S}" transform="translate({x} {y}) scale({scale})" fill="{fill}" opacity="{opacity}"/>'
def footer(label,light=False):return txt(label,70,1275,19,'#666' if light else '#aaa','mono')
def image(name,x,y,w,h):
    path=OUT/(name+'.webp');im=Image.open(path).convert('RGB');buf=BytesIO();im.save(buf,'PNG')
    return f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,{base64.b64encode(buf.getvalue()).decode()}"/>'

def bridge(x,y,w=900,fill='url(#metal)'):
    # A passage, with two quiet rails and square terminals. Graphic, not a logo.
    return f'<g transform="translate({x} {y}) scale({w/900})" fill="none" stroke="{fill}" stroke-width="36" stroke-linecap="butt" stroke-linejoin="round"><path d="M0 170H310L500 0H900"/><path d="M0 270H350L540 100H900"/></g>'
svg('passage',bridge(90,250),1080,800)
svg('poster-house',logo('snps-house')+txt('Entre ideia',70,360,95,face='bold')+txt('e ação.',70,470,95,face='bold')+footer('HOUSE / INTELIGÊNCIA QUE GANHA FORMA'))
svg('poster-school',logo('sinapse-school')+txt('A próxima',70,350,100,face='bold')+txt('versão',70,465,100,face='bold')+txt('é sua.',70,580,100,face='bold')+txt('T04',60,1030,205,'url(#metal)','display',950)+txt('Aprender. Experimentar. Construir.',70,1130,30)+footer('SCHOOL / LISTA DE INTERESSE'))
body=logo('sinapse-growth',theme='light')+txt('Crescer é',70,355,100,'#171717','bold')+txt('construir',70,470,100,'#171717','bold')+txt('continuidade.',70,585,100,'#171717','bold',940)
for i in range(9):body+=signal(70+i*52,760+i*24,6,'#171717',.08+i*.07)
svg('poster-growth',body+footer('GROWTH / ESTRATÉGIA EM OPERAÇÃO',True),bg='#f5f5f5')
body=logo('sinapse-si')+txt('O repertório',70,360,90,face='bold')+txt('encontra',70,465,90,face='bold')+txt('a prática.',70,570,90,face='bold')
for i,k in enumerate(['figma','supabase','obsidian']):
    body+=inline(OUT/'tools'/f'{k}.svg',90+i*315,810,140,140)+txt(k.title(),90+i*315,1020,25,'#aaa')
svg('poster-repertoire',body+footer('REPERTÓRIO / FERRAMENTAS EM CONTEXTO'))
sculpture=Path('C:/Users/Caio Imori/.codex/generated_images/01a146da-3df5-7531-97bf-7dda4c126f3a/exec-70b80d5d-cb89-47cf-8fe1-6f0916008e3b.png')
if sculpture.exists():Image.open(sculpture).save(OUT/'signal-sculpture.webp','WEBP',quality=94)
svg('poster-manifesto',image('hero',0,450,1080,720)+logo('sinapse-si')+txt('O futuro tem',70,350,90,face='bold')+txt('autoria.',70,450,90,face='bold')+footer('SI / SUPER INTELLIGENCE'))
svg('story-invite',logo('sinapse-school',y=130)+txt('Aprender',70,480,100,face='bold')+txt('muda o que',70,600,100,face='bold')+txt('você cria.',70,720,100,face='bold')+signal(280,1000,8.5)+txt('T04',70,1540,145,'url(#metal)','display')+txt('Conheça a próxima turma.',70,1690,38)+txt('SINAPSE SCHOOL / LISTA DE INTERESSE',70,1800,21,'#aaa','mono'),h=1920)
svg('cover-foundations',txt('SINAPSE SCHOOL / MEMBER',70,110,22,'#aaa','mono')+txt('Fundamentos',70,325,85,face='bold')+txt('para criar.',70,430,85,face='bold')+txt('01',1150,850,420,'url(#metal)','display',700)+signal(700,100,13,'url(#fade)',.2)+txt('CONTEXTO · REPERTÓRIO · PRÁTICA',70,980,25,'#aaa','mono'),1920,1080)
svg('cover-build',txt('SINAPSE SCHOOL / MEMBER',70,110,22,'#666','mono')+txt('Da ideia à',70,325,85,'#171717','bold')+txt('primeira versão.',70,430,85,'#171717','bold')+txt('02',1150,850,420,'#171717','display',700)+signal(700,100,13,'#171717',.05)+txt('CONSTRUÇÃO · TESTE · APRENDIZADO',70,980,25,'#666','mono'),1920,1080,'#f5f5f5')
svg('card-member',txt('SNPS',90,220,105,'url(#metal)','display')+txt('MEMBER',90,535,24,'#aaa','mono')+txt('T04 / SCHOOL',780,535,24,'#aaa','mono'),1200,650)
svg('avatar-si',logo('snps',220,430,640)+center('SUPER INTELLIGENCE',745,28,'#aaa','mono'),1080,1080)
svg('avatar-t04',center('T04',650,170,'url(#metal)','display')+center('SINAPSE SCHOOL',800,30,'#aaa','mono'),1080,1080)
svg('avatar-client',logo('snps',220,260,640)+center('×',580,60,'#888')+center('CLIENTE',720,95)+center('PROJETO / COASSINATURA',850,24,'#aaa','mono'),1080,1080)

svg('type-review',txt('K · J · F · W · Z',70,115,58,face='bold')+txt('Silhueta, proporção e terminais revistos.',70,180,27,'#aaa')+txt('K J F W Z',70,430,155,face='display',maxw=1600)+txt('WORK FLOW',70,680,125,face='display',maxw=1600)+txt('JAZZ',70,900,125,face='display',maxw=1600)+txt('H preservado. Mestres S I N A P E intactos.',70,1190,30,'#aaa'),1740,1350)

# Exact source anatomy, including square terminals and distinct corner regimes.
body=txt('O desenho tem regras.',70,115,64,face='bold')+txt('S / P / N — curvas originais ampliadas, sem redesenho',70,175,25,'#aaa')
for d,x,y in [(S,70,340),(P,850,340),(N,70,780)]:body+=f'<path d="{d}" fill="#f5f5f5" transform="translate({x} {y}) scale(7)"/>'
for x,y,n in [(70+93.18*7,340,'01'),(70,340+4.69*7,'02'),(850+9.38*7,340+9.38*7,'03'),(70+9.38*7,780,'04'),(70+12*7,780+10*7,'05')]:
    body+=f'<circle cx="{x}" cy="{y}" r="19" fill="#0a0a0a" stroke="#aaa" stroke-width="1.5"/>'+txt(n,x-12,y+5,15,'#f5f5f5','mono')
body+=txt('01  Terminal aberto / corte reto',880,830,26)+txt('02  Retorno circular / r = 4,69',880,880,26)+txt('03  Bojo de P / esquerda reta',880,930,26)+txt('04  Ombro externo de N / r = 9,38',880,980,26)+txt('05  Retorno interno de N / r = 2,54',880,1030,26)+txt('Traço 9,38 · altura 46,90 · intervalo 16,64',70,1220,28,'#aaa','mono')
svg('type-anatomy',body,1740,1350)
body=txt('A mesma família. Outras palavras.',70,100,52,face='bold')
for i,s in enumerate(['SINAPSE','SCHOOL','HOUSE','GROWTH','ABCDEFGHIJKLMNOPQRSTUVWXYZ','AÇÃO · INTELIGÊNCIA']):body+=txt(s,70,280+i*155,120 if i<4 else 54,'#f5f5f5','display',1580)
svg('type-proof',body,1740,1350)
body=txt('O alfabeto ampliado.',70,100,52,face='bold')
for i,ch in enumerate('ABCDEFGHIJKLMNOPQRSTUVWXYZ'):
    x=70+(i%6)*278;y=200+(i//6)*210
    body+=f'<rect x="{x}" y="{y}" width="258" height="185" fill="none" stroke="#333"/>'+txt(ch,x+20,y+110,100,'#f5f5f5' if ch in 'SINAPE' else '#aaa','display',218)+txt('MESTRE' if ch in 'SINAPE' else 'EXTENSÃO',x+20,y+160,14,'#aaa','mono')
svg('type-alphabet',body,1800,1350)

# OOH layout is the actual printable artwork, also supplied to generated mockups.
svg('ooh-triptych',''.join(inline(A/(n+'.svg'),i*1080,0,1080,1350) for i,n in enumerate(['poster-school','poster-house','poster-growth'])),3240,1350)
subprocess.run(['node',str(ROOT/'scripts/render-si-applications.mjs')],cwd=ROOT,check=True)
print('18 original application/anatomy SVGs + WebP previews. Foreign references stay private.')
