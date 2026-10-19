from pathlib import Path
from io import BytesIO
import re,json,hashlib,zipfile,base64
from PIL import Image,ImageOps,ImageDraw
import fitz
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.utils import ImageReader
import xml.etree.ElementTree as ET
from fontTools.ttLib import TTFont as FontTT
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

root=Path(__file__).resolve().parents[1];out=root/'public/si-v2';qa=root/'qa';qa.mkdir(exist_ok=True)
pdfmetrics.registerFont(TTFont('Manrope',str(out/'fonts/Manrope-Regular.ttf')))
pdfmetrics.registerFont(TTFont('Manrope-Semibold',str(out/'fonts/Manrope-Semibold.ttf')))
pdfmetrics.registerFont(TTFont('SNPSDisplay',str(out/'fonts/SNPSDisplay-Regular.ttf')))
pdfmetrics.registerFont(TTFont('JetBrains',str(root/'public/si/fonts/JetBrainsMono-Regular.ttf')))
W,H=1920,1080;c=canvas.Canvas(str(out/'SINAPSE-SI-Brandbook-06.pdf'),pagesize=(W,H));c.setTitle('SINAPSE SI — Sinal contínuo / Edição 06');c.setAuthor('SINAPSE / proposta para revisão')
page=0;overflow=[];page_names=[];fg='#f5f5f5';muted='#aaaaaa';vector_stamps=[]
art_fonts={weight:FontTT(out/f'fonts/Manrope-{name}.ttf') for weight,name in [(400,'Regular'),(600,'Semibold')]}
def text(s,x,y,size=24,color=None,font='Manrope'):
    c.setFillColor(HexColor(color or fg));c.setFont(font,size);c.drawString(x,y,s)
    width=pdfmetrics.stringWidth(s,font,size)
    if x<0 or x+width>W+1 or y<0 or y+size>H+1:overflow.append({'page':page,'text':s,'x':x,'y':y,'size':size,'width':width})
def wrap(s,width,size,font='Manrope'):
    words=s.split();lines=[];current=''
    for word in words:
        if current and pdfmetrics.stringWidth(current+' '+word,font,size)>width:lines.append(current);current=word
        else:current=(current+' '+word).strip()
    if current:lines.append(current)
    if len(lines)>1 and len(lines[-1].split())==1:
        previous=lines[-2].split()
        if len(previous)>2 and pdfmetrics.stringWidth(previous[-1]+' '+lines[-1],font,size)<=width:lines[-1]=previous.pop()+' '+lines[-1];lines[-2]=' '.join(previous)
    return lines
def para(s,x,y,width=730,size=27,color=None,font='Manrope',leading=1.5):
    for line in wrap(s,width,size,font):text(line,x,y,size,color,font);y-=size*leading
    return y
def start(name,title=None,light=False):
    global page,fg,muted
    if page:c.showPage()
    page+=1;page_names.append(name);fg='#141416' if light else '#f5f5f5';muted='#66666b' if light else '#aaaaaa';c.setFillColor(HexColor('#f5f5f7' if light else '#0a0a0a'));c.rect(0,0,W,H,fill=1,stroke=0)
    text('SINAPSE / BRAND GUIDELINES 06',90,1010,17,muted,'JetBrains');text(f'{page:02}',1790,1010,17,muted,'JetBrains');text(name.upper(),90,70,16,muted,'JetBrains');text('PROPOSTA PARA REVISÃO · OUT 2026',1370,70,14,muted,'JetBrains')
    if title:
        for i,line in enumerate(wrap(title,1600,76,'Manrope-Semibold')):text(line,90,865-i*85,76,font='Manrope-Semibold')
def photo(name,x,y,w,h,contain=False):
    image=Image.open(out/(name+'.webp')).convert('RGB')
    if not contain:image=ImageOps.fit(image,(round(w),round(h)),method=Image.Resampling.LANCZOS)
    c.drawImage(ImageReader(image),x,y,width=w,height=h,preserveAspectRatio=contain,anchor='c',mask='auto')
def vector(name,x,y,w,h):
    svg=(out/name).read_text(encoding='utf8').replace('currentColor','#f5f5f5' if fg=='#f5f5f5' else '#111111')
    svg=svg.replace('fill="url(#silver)"',f'fill="{fg}"').replace('fill="url(#glass)"',f'fill="{fg}"')
    svg=re.sub(r'<style>.*?</style>','',svg,flags=re.S)
    # Keep illustration lettering in native curves; document prose remains native text.
    node=ET.fromstring(svg)
    # MuPDF's SVG reader accepts embedded PNG, but not WebP data URIs.
    for el in node.iter():
        href=el.get('href','')
        if href.startswith('data:image/webp;base64,'):
            raster=Image.open(BytesIO(base64.b64decode(href.split(',',1)[1])));buffer=BytesIO();raster.save(buffer,format='PNG');el.set('href','data:image/png;base64,'+base64.b64encode(buffer.getvalue()).decode())
    # MuPDF does not position all nested SVG viewports consistently: flatten them.
    def flatten(parent):
        for el in list(parent):
            if el.tag.split('}')[-1]=='svg':
                vx,vy,vw,vh=map(float,el.get('viewBox','0 0 100 100').split());ew=float(el.get('width',str(vw)));eh=float(el.get('height',str(vh)));scale=min(ew/vw,eh/vh);tx=float(el.get('x','0'))+(ew-vw*scale)/2;ty=float(el.get('y','0'))+(eh-vh*scale)/2
                el.tag='{http://www.w3.org/2000/svg}g';el.set('transform',f'translate({tx} {ty}) scale({scale}) translate({-vx} {-vy})');
                for key in ['x','y','width','height','viewBox','preserveAspectRatio']:el.attrib.pop(key,None)
            flatten(el)
    flatten(node)
    for parent in node.iter():
        for el in list(parent):
            if el.tag.split('}')[-1]!='text':continue
            value=''.join(el.itertext());weight=600 if int(el.get('font-weight','400'))>=500 else 400;font=art_fonts[weight];glyphs=font.getGlyphSet();cmap=font.getBestCmap();units=font['head'].unitsPerEm;size=float(el.get('font-size','24'));tracking=float(el.get('letter-spacing','0'));advance=sum(glyphs[cmap.get(ord(ch),'space')].width*size/units+tracking for ch in value);xpos=float(el.get('x','0'));ypos=float(el.get('y','0'))
            if el.get('text-anchor')=='middle':xpos-=advance/2
            elif el.get('text-anchor')=='end':xpos-=advance
            data=[]
            for ch in value:
                glyph=glyphs[cmap.get(ord(ch),'space')];pen=SVGPathPen(glyphs);glyph.draw(TransformPen(pen,(size/units,0,0,-size/units,xpos,ypos)));data.append(pen.getCommands());xpos+=glyph.width*size/units+tracking
            attrs={k:v for k,v in el.attrib.items() if k in ['fill','stroke','stroke-width','opacity','transform']};attrs['d']=''.join(data);replacement=ET.Element('{http://www.w3.org/2000/svg}path',attrs);idx=list(parent).index(el);parent.remove(el);parent.insert(idx,replacement)
    vector_stamps.append((page-1,ET.tostring(node),fitz.Rect(x,H-y-h,x+w,H-y)))
def columns(items,y=620):
    width=(W-240)/len(items)
    for i,(title,body) in enumerate(items):
        x=90+i*width;text(f'{i+1:02}',x,y,24,muted,'JetBrains');end=para(title,x,y-75,width-60,42,font='Manrope-Semibold',leading=1.18);para(body,x,end-45,width-65,26,muted)

def rule(x,y,w=1740,color=None):
    c.setStrokeColor(HexColor(color or muted));c.setLineWidth(.6);c.line(x,y,x+w,y)
def title_lines(lines,x=90,y=830,size=130,color=None):
    for i,line in enumerate(lines):text(line,x,y-i*size*1.05,size,color,'Manrope-Semibold')
def art(name,x,y,w,h):photo('applications/'+name,x,y,w,h,True)
def native_word(word,x,y,width,color=None):
    size=min(180,width/pdfmetrics.stringWidth(word,'SNPSDisplay',1));text(word,x,y,size,color,'SNPSDisplay')
def section(name,number,lines,light=False):
    start(name,light=light);text(number,90,780,210,muted,'Manrope');title_lines(lines,90,420,110);text('SINAPSE SI / SINAL CONTÍNUO',90,160,20,muted,'JetBrains')

start('Sinal contínuo');photo('hero',760,200,1160,680,True);title_lines(['Sinal','contínuo.'],90,820,128);text('BRAND GUIDELINES / EDIÇÃO 06',95,315,22,'#aaaaaa','JetBrains');vector('logos/sinapse-si-solid-dark.svg',90,105,580,135)
start('Como consultar');title_lines(['Um sinal.', 'Todo um universo.'],90,790,110)
for i,(n,t) in enumerate([('01','Intenção e arquitetura'),('02','Identidade e tipografia'),('03','Matéria e expressão'),('04','Aplicações e comunidade'),('05','Referências e recursos')]):
    y=775-i*125;text(n,1120,y,25,muted,'JetBrains');text(t,1200,y,35);rule(1120,y-38,690)
para('Uma proposta para revisão. Os dois logos originais permanecem; o sistema amplia o que pode ser criado a partir deles.',95,285,790,31,muted)
start('A ideia');title_lines(['O futuro', 'tem autoria.'],90,820,150);para('Uma inteligência que se aprende, se constrói e se coloca em movimento.',1050,395,730,48,font='Manrope-Semibold');para('O sinal que já é nosso abre espaço para tudo que ainda podemos criar.',1050,190,730,27,muted)
start('Estratégia');text('Ferramentas mudam.',90,825,88,font='Manrope-Semibold');text('A capacidade fica.',90,715,88,font='Manrope-Semibold');rule(90,635)
para('A SINAPSE conecta educação, software e operação de crescimento. O ponto de partida é uma necessidade real; o caminho pode ser uma aula, um projeto ou uma operação contínua.',90,545,800,34)
para('Promessa proposta',1110,555,650,19,muted,'JetBrains');para('Ampliar a capacidade de aprender, criar, decidir e executar.',1110,490,650,43,font='Manrope-Semibold');para('Precisão na informação. Presença no desenho. Proximidade na conversa. Continuidade no trabalho.',1110,250,650,26,muted)
start('Arquitetura',light=True);vector('logos/sinapse-si-solid-light.svg',90,710,750,190);para('A marca principal.',1110,830,650,43,font='Manrope-Semibold');para('SI significa Super Intelligence. O nome comunica uma ambição de capacidade; não é alegação de desenvolvimento de superinteligência.',1110,745,650,27,muted)
for i,(d,body) in enumerate([('school','Aprender para criar. Educação em IA aplicada.'),('house','Entre ideia e ação. Software, produtos e experiências.'),('growth','Construir continuidade. Estratégia e operação de crescimento.')]):
    x=90+i*585;rule(x,580,520);vector(f'logos/sinapse-{d}-solid-light.svg',x,335,520,190);para(body,x,280,490,30)
for d,title,copy in [('school','Aprender para criar.','Profissionais e criadores ampliam repertório, contexto e prática. A mentoria e a área de membros compõem uma experiência de aprendizagem; as condições de cada turma são específicas.'),('house','Entre ideia e ação.','Descoberta, experiência, desenvolvimento e validação. Sistemas, aplicativos, automações e integrações com escopo definido por projeto.'),('growth','Construir continuidade.','Estratégia, conteúdo, mídia, dados, CRM e automação. Uma operação para e-commerce, vendas diretas e geração de leads, com acompanhamento e aprendizado.')]:
    start(d.upper(),light=d=='growth');art('poster-'+d,85,105,690,860);para(title,1000,780,770,76,font='Manrope-Semibold');para(copy,1000,510,740,31,muted);text('ARQUITETURA / SINAPSE '+d.upper(),1000,195,20,muted,'JetBrains')
section('Identidade e construção','02',['O desenho','permanece.'])
start('Dois mestres');vector('logos/snps-solid-dark.svg',90,610,1740,260);vector('logos/sinapse-solid-dark.svg',90,310,1740,230);text('SNPS / ORIGINAL',90,580,20,muted,'JetBrains');text('SINAPSE / ORIGINAL COMPLETO',90,270,20,muted,'JetBrains');para('Preservar curvas, sequência de letras e proporções. A extensão tipográfica não substitui os arquivos originais.',90,165,1650,28,muted)
start('Assinaturas',light=True)
for i,name in enumerate(['snps-si','sinapse-si','snps-school','sinapse-school','snps-house','sinapse-house','snps-growth','sinapse-growth']):
    x=90+i%2*900;y=780-i//2*175;vector(f'logos/{name}-solid-light.svg',x,y,810,95);text(name.replace('-',' ').upper(),x,y-18,16,muted,'JetBrains')
para('Uma linha, sempre. SI, School, House e Growth ficam à direita do nome, com a mesma altura e baseline. Reduzir o conjunto inteiro; nunca empilhar o complemento.',90,150,1730,25,muted)
start('Área livre e redução','Espaço também é desenho.');vector('logos/snps-solid-dark.svg',160,440,1500,350)
c.setStrokeColor(HexColor('#888888'));c.setDash(8,8);c.rect(135,420,1550,390,stroke=1,fill=0);c.setDash()
para('1× / área livre',90,300,500,36,font='Manrope-Semibold');para('Reservar uma altura visível do lettering ao redor da assinatura.',90,230,500,26,muted)
para('180 px / ponto de partida',700,300,500,36,font='Manrope-Semibold');para('Assinatura completa. Em redução, preferir SNPS plano e conferir a leitura.',700,230,500,26,muted)
para('45–55% / avatar',1310,300,500,36,font='Manrope-Semibold');para('Ocupação óptica proposta do sinal, com recorte circular conferido.',1310,230,500,26,muted)
start('Integridade','A forma precisa continuar nossa.',True)
for i,(label,name,w,h) in enumerate([('Proporção preservada','snps',650,150),('Evitar compressão vertical','snps',650,55),('Versão plana para redução','sinapse',650,110),('Não omitir o I de SINAPSE','sinapse',650,110)]):
    x=90+(i%2)*900;y=650-(i//2)*330;vector(f'logos/{name}-solid-light.svg',x,y,w,h);text(label,x,y-65,28)
text('Os materiais preservam o contorno. Não inventar novos raios sobre o mestre.',90,150,25,muted)
start('Anatomia');vector('applications/type-anatomy.svg',85,105,1745,870)
start('Cantos e funções','Um radius não resolve tudo.');columns([('Corte / r = 0','Terminais abertos do S, pé do P e extremidades do N permanecem retos.'),('Retorno / r = 4,69','Curvas de S, A, P e E fecham percursos. O P conserva a esquerda reta no bojo.'),('Ombro / r = 9,38','O N usa um raio externo maior. O pequeno retorno interno mede 2,54.')]);para('As medidas vêm do SVG original. Curvas novas interpretam essa gramática por função, não por arredondamento global.',90,210,1670,28,muted)
start('Prova de palavras');vector('applications/type-proof.svg',90,105,1740,860)
start('O alfabeto ampliado');vector('applications/type-alphabet.svg',90,105,1740,860)
start('Cinco letras revistas');art('type-review',90,130,1100,810);para('Ler antes de estilizar.',1290,780,500,60,font='Manrope-Semibold');para('K e Z com largura óptica. J com barra superior e gancho. F com terminal reto. W com quatro diagonais. H preservado.',1290,540,500,30,muted)
start('Tipografia de expressão','A palavra ganha presença.',True);native_word('CRIAÇÃO',90,650,1710);para('SNPS Display 1.200',90,420,700,43,font='Manrope-Semibold');para('Maiúsculas, números, acentos e pontuação. As teclas minúsculas usam os desenhos maiúsculos. OTF, TTF e WOFF2.',90,325,760,30,muted);para('S, I, N, A, P e E foram recuperadas. Os demais glifos são desenhos novos, para revisão óptica e prova no destino.',1110,420,680,30,muted);para('O intervalo medido de 16,64 está no avanço. Não esticar a fonte para preencher uma caixa.',1110,250,680,30,muted)
start('Hierarquia');text('Uma ideia por vez.',90,800,108,font='Manrope-Semibold');para('Manrope / títulos e leitura.',100,600,1200,37);para('A clareza sustenta a expressão. Textos explicam uma decisão por vez, com espaço entre blocos e contraste estável. A fonte de marca aparece onde a palavra precisa ser imagem.',100,490,1040,32,muted);text('FIELD 04 / METADADOS E REGISTRO',100,220,28,muted,'JetBrains');native_word('SNPS',1310,320,490)
section('Matéria e expressão','03',['Luz é','linguagem.'],True)
start('Vidro',light=True);photo('glass',0,110,1920,840);text('Transparência com contorno.',90,900,64,font='Manrope-Semibold');text('ESTUDO DE MATERIAL / SNPS ORIGINAL COMO REFERÊNCIA',90,160,20,'#999999','JetBrains')
start('Prata',light=True);photo('metal',0,110,1920,840);text('A luz revela a forma.',90,900,64,font='Manrope-Semibold')
start('Entre ideia e ação');title_lines(['Entre ideia', 'e ação.'],90,780,145);para('Contexto, construção e uso real. O espaço entre as palavras sustenta a ideia.',1100,360,680,38,muted)
start('O material encontra o uso');art('poster-manifesto',95,120,630,810);art('poster-school',790,120,630,810);para('Presença',1490,780,330,37,font='Manrope-Semibold');para('Um gesto principal por composição. Texto informativo em plano estável.',1490,680,330,27,muted);para('Precisão',1490,450,330,37,font='Manrope-Semibold');para('SVG para contorno exato. O render 3D é uma imagem com iluminação própria.',1490,350,330,27,muted)
start('Preto e branco','A vivacidade vem da luz.');
for i,(name,color) in enumerate([('Carbon','#0a0a0a'),('Ink','#191919'),('Mist','#888888'),('Paper','#f5f5f5'),('White','#ffffff')]):
    x=90+i*350;c.setStrokeColor(HexColor('#666666'));c.setFillColor(HexColor(color));c.rect(x,430,310,270,fill=1,stroke=1);text(name,x,350,30);text(color,x,300,22,muted,'JetBrains')
para('Neutros organizam a identidade. Reflexos e gradientes dão volume. Cores das ferramentas pertencem às ferramentas e entram no conteúdo sobre elas.',90,180,1650,29,muted)
start('Repertório em contexto',light=True);art('poster-repertoire',90,120,650,810);para('O assunto escolhe a ferramenta.',950,790,800,73,font='Manrope-Semibold');para('Manter forma e cor nativas, escala óptica equilibrada, espaço e legenda. Evitar pedestais, órbitas, glow ou um contêiner decorativo por logo.',950,480,800,31,muted);para('A presença de um logo não indica parceria, patrocínio ou integração ativa.',950,240,800,26,muted)
start('Grafismo');art('poster-house',80,120,550,810);art('poster-growth',685,120,550,810);art('poster-manifesto',1290,120,550,810);text('RECORTE',90,950,20,muted,'JetBrains');text('CAMADAS',695,950,20,muted,'JetBrains');text('MATÉRIA',1300,950,20,muted,'JetBrains')
start('Signals 04','Terminais retos. Retornos suaves.');
for i,p in enumerate(sorted((out/'icons').glob('*.svg'))):
    x=100+i%6*295;y=560-i//6*260;vector('icons/'+p.name,x,y,170,114);text(p.stem,x,y-45,19,muted,'JetBrains')
text('Grade 96 × 64 / traço 4 / conferir 24, 48 e 96 px. Rótulos acompanham ações.',100,155,24,muted)
start('Movimento','Foco. Fluxo. Matéria.');columns([('Foco / 900 ms','O sinal passa do difuso ao nítido. A informação de leitura permanece disponível.'),('Reflexo / 8 s','Luz lenta percorre a superfície. Um gesto contínuo, sem competir com o assunto.'),('Revelação / 720 ms','O desenho se apresenta por máscara. O estado final permanece completo.')]);rule(90,300);text('Início',90,245,24,muted);text('Percurso',840,245,24,muted);text('Estado final',1550,245,24,muted);text('Pausa disponível. Movimento reduzido preserva o conteúdo estático.',90,150,25,muted)
start('Voz');title_lines(['Fala de perto.', 'Pensa grande.'],90,820,120);para('Mostre o que dá para fazer. Explique como começa. Deixe a prova aparecer.',95,440,1100,54,font='Manrope-Semibold');para('Verbos concretos, contexto e exemplos reais. O entusiasmo vem do trabalho; condições, resultados e capacidades precisam de evidência.',1290,450,520,29,muted)
section('Aplicações','04',['A marca','entra na vida.'])
start('Campanha em contexto');photo('applications/ooh-triptych',0,180,1920,760,True);text('CAMPANHA / ARTES EM VETOR',90,135,19,'#aaaaaa','JetBrains')
start('Repertório editorial');
for i,name in enumerate(['poster-manifesto','poster-school','poster-house','poster-growth','poster-repertoire']):art(name,65+i*365,180,330,750)
text('Manifesto, convite, House, Growth e repertório. A mesma origem, outros registros.',90,130,27,muted)
start('T04 / Story');art('story-invite',120,105,445,790);para('Aprender muda o que você cria.',810,820,950,70,font='Manrope-Semibold');para('Abertura → contexto → construção → criação → aplicação → lista de interesse. Texto nas zonas de leitura, assinatura discreta e destino claro.',810,500,900,32,muted);para('Datas, vagas, preço e bônus precisam refletir a oferta vigente. Entrar na lista não equivale a matrícula.',810,280,900,27,muted)
start('Sequências utilizáveis','Conteúdo com ritmo.');columns([('Convite / 6 telas','Convidar, apresentar o percurso e explicar o próximo passo.'),('Caderno / 10 telas','Contexto, exemplo, ferramenta, revisão e aplicação.'),('Fluxo / camadas','O retorno do S reaparece em planos sobrepostos. Recortes intencionais preservam a área do texto.')]);text('O studio permite editar texto, formato, material, fundo e ferramenta por quadro.',90,185,28,muted)
start('Comunidade','O sinal de estar junto.');
for i,name in enumerate(['avatar-si','avatar-t04','avatar-client']):
    x=90+i*590;c.saveState();path=c.beginPath();path.circle(x+255,520,250);c.clipPath(path,stroke=0,fill=0);photo('applications/'+name,x,265,510,510,True);c.restoreState()
for i,label in enumerate(['SINAPSE SI','SCHOOL / T04','COASSINATURA / EXEMPLO']):text(label,90+i*590,190,20,muted,'JetBrains')
start('Coassinatura',light=True);art('avatar-client',90,125,800,800);para('Um projeto em conjunto.',1080,760,680,75,font='Manrope-Semibold');para('O logo do cliente entra como ativo próprio, com espaço e escala óptica. O exemplo usa um placeholder; nenhum cliente foi inventado.',1080,480,680,31,muted);para('No studio: upload local, ajuste de proporção, conferência no círculo e exportação.',1080,240,680,28,muted)
start('Members','Cada aula faz parte da série.');art('cover-foundations',90,360,830,470);art('cover-build',1000,190,830,470);text('CONTRASTE, NÚMERO E UMA CHAMADA CURTA',90,155,20,muted,'JetBrains')
start('Papelaria');photo('stationery',0,110,1920,850);text('MEMBER KIT / ESTUDO CONCEITUAL GERADO',90,145,20,'#aaaaaa','JetBrains')
start('Member / 04',light=True);art('card-member',95,355,1730,570);para('A assinatura fica pequena. O material faz o restante.',95,245,1640,45,font='Manrope-Semibold');para('Alumínio, gravação e acabamento são intenções de projeto. Confirmar com amostra física antes de fabricar.',95,150,1640,27,muted)
start('Collection 03');photo('wear-v6/look-1',80,160,1760,700,True);text('Cultura de IA. Fora da tela.',90,925,72,font='Manrope-Semibold');text('OITO CAMISETAS / QUATRO MOLETONS / 12 PROPOSTAS',90,125,23,muted,'JetBrains')
wear=json.loads((out/'wear-v6/collection.json').read_text(encoding='utf8'))
for group in range(1,7):
    pair=[p for p in wear if p['group']==group];start('Collection / '+str(group).zfill(2),light=True);photo('wear-v6/look-'+str(group),90,240,1740,700,True)
    for i,item in enumerate(pair):
        x=95+i*890;text(item['id']+' / '+item['name'],x,210,34,font='Manrope-Semibold');text(item['piece']+' / '+item['side'],x,160,22,muted);para(item['note'],x,120,790,19,muted)
start('Direção de imagem','O acabamento precisa aparecer.');columns([('Fotografia','Textura, costura, peso, luz e sombra plausíveis. Corpos e produtos precisam manter coerência.'),('Material','Reflexos e refração têm direção. Não aplicar o mesmo blur indiscriminadamente sobre texto e imagem.'),('Vetor','A geometria original é a referência de forma. Render gerado é aplicação conceitual, não novo mestre.')]);text('Trabalho e pessoas reais devem substituir estudos conceituais nas provas comerciais.',90,160,28,muted)
section('Referências e recursos','05',['Olhar com','intenção.'],True)
refs=json.loads((root/'data/si/reference-atlas.json').read_text(encoding='utf8'))
for r in refs:
    start('Referência / '+r['name']);text(r['name'],90,835,100,font='Manrope-Semibold');para(r['focus'],90,685,680,44,font='Manrope-Semibold');para(f'{r["pages"]} pranchas examinadas. Autoria creditada: {r["author"]}.',90,475,690,25,muted)
    y=840
    for observation in r['observations'][:4]:y=para(observation,950,y,850,27,muted,leading=1.35)-26
    para('Decisões para a SINAPSE',90,320,700,21,muted,'JetBrains');para(' '.join(r['decisions']),90,260,700,25)
    label='behance.net/gallery/'+r['url'].split('/gallery/')[1].split('/')[0];text(label,950,115,20,muted)
start('Síntese','Referência vira critério.');columns([('Forma própria','O S e o N originam o repertório. Os símbolos, retratos e cores dos cases não são transferidos.'),('Ritmo editorial','Alternar impacto, explicação, construção e aplicação. Uma grade não precisa resolver todos os assuntos.'),('Uso real','Mostrar a marca em aula, perfil, campanha, papel, roupa e interface. Cada ponto pede escala e densidade próprias.')]);text('199 imagens estáticas / 6 projetos. Dois vídeos Buff identificados, sem análise temporal.',90,160,25,muted)
start('Fontes e limites','Uma origem para cada decisão.');para('Referências desta edição: OXA AI, Buff, Mozari, Cirdia, Centrysk e Clarity, nos projetos abertos por Caio no Behance. A análise visual usa as pranchas publicadas; não afirma acesso aos arquivos editáveis ou aos PDFs originais completos.',90,685,1680,32,muted);para('Apple orienta materialidade e interação; Nude Project e Coinbase Shop orientam o vestuário. A interpretação web de vidro não é o material nativo da Apple. Marcas e ativos de terceiros conservam sua autoria.',90,460,1680,32,muted);para('Acervo anterior consultado: seis páginas SINAPSE, 41 páginas em seis PDFs, cinco áudios, 23 arquivos do Drive e sete quadros T04. A amostra não equivale a uma auditoria de todos os canais.',90,255,1680,29,muted)
start('Transição','Da proposta ao próximo uso.');columns([('Preservar','Os dois mestres originais, o preto e branco e as ofertas de School, House e Growth.'),('Revisar','Palavras críticas do alfabeto ampliado, escala no destino e materiais de reprodução física.'),('Aplicar','Usar o kit da edição 06. Validar a oferta antes de postar; adotar os novos recursos por canal autorizado.')]);text('Revisões anteriores permanecem no Git. Publicação, DNS, redes e fabricação exigem seu próprio lote.',90,155,25,muted)
start('Brand resources');vector('logos/sinapse-si-solid-dark.svg',90,680,1400,240);para('Um ponto de partida para o que vem depois.',90,480,1650,70,font='Manrope-Semibold');para('Mestres, dez assinaturas, fonte própria, material portátil, Signals 04, aplicações em curvas, templates editáveis e PDF. Proposta local para revisão.',95,280,1450,32,muted);text('branding.sinapse.si / domínio pretendido',95,145,24,muted,'JetBrains')
c.save()

doc=fitz.open(out/'SINAPSE-SI-Brandbook-06.pdf')
for page_id,svg,rect in vector_stamps:
    source=fitz.open(stream=svg,filetype='svg');vp=fitz.open(stream=source.convert_to_pdf(),filetype='pdf');doc[page_id].show_pdf_page(rect,vp,0)
temp=out/'brandbook-06-native.pdf';doc.save(temp,garbage=4,deflate=True);doc.close();temp.replace(out/'SINAPSE-SI-Brandbook-06.pdf')
doc=fitz.open(out/'SINAPSE-SI-Brandbook-06.pdf');book=[];thumbs=[];targetdir=out/'book-v6';targetdir.mkdir(exist_ok=True)
for i,p in enumerate(doc):
    target=targetdir/f'page-{i+1:02}.webp';pix=p.get_pixmap(matrix=fitz.Matrix(.7,.7));im=Image.open(BytesIO(pix.tobytes('png'))).convert('RGB');im.save(target,'WEBP',quality=91);book.append({'title':page_names[i],'file':f'/si-v2/book-v6/{target.name}'});im.thumbnail((384,216));thumbs.append(im)
sheet=Image.new('RGB',(1920,216*((len(thumbs)+4)//5)),'#555555')
for i,t in enumerate(thumbs):sheet.paste(t,((i%5)*384,(i//5)*216))
sheet.save(qa/'v6-contact-sheet.jpg',quality=92)
(root/'data/si/book-v6.json').write_text(json.dumps(book,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
report={'pages':len(doc),'dimensions':[W,H],'native_characters':sum(len(p.get_text()) for p in doc),'text_bounds_errors':overflow,'embedded_font_names':sorted(set(f[3] for p in doc for f in p.get_fonts())),'chapters':page_names,'reader_pages':len(book),'artwork':'Vector for masters, anatomy and icons. Photography and material artwork are raster illustrations; prose is native text.'}
(qa/'v6-pdf-native-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print(json.dumps({'pages':len(doc),'native_characters':report['native_characters'],'bounds_errors':len(overflow)}))
if overflow:raise ValueError('Text outside PDF page')
