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
W,H=1920,1080;c=canvas.Canvas(str(out/'SINAPSE-SI-Brandbook-03.pdf'),pagesize=(W,H));c.setTitle('SINAPSE SI — Brand world 03');c.setAuthor('SINAPSE / proposta para revisão')
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
    text('SINAPSE / BRAND WORLD 03',90,1010,17,muted,'JetBrains');text(f'{page:02}',1790,1010,17,muted,'JetBrains');text(name.upper(),90,70,16,muted,'JetBrains');text('PROPOSTA PARA REVISÃO · OUT 2026',1370,70,14,muted,'JetBrains')
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

start('A nova dimensão');photo('hero',0,110,1920,780);text('Uma nova dimensão.',90,890,94,font='Manrope-Semibold');text('SINAPSE SI / Super Intelligence.',95,145,31)
start('Direção criativa','O mesmo sinal. Outra presença.');columns([('Preservar','O SNPS original e o preto e branco. Reconhecimento construído, aplicado com um sistema novo.'),('Transformar','Dark First com Light Mode. Vidro, metal, foco, blur e movimento. Novas assinaturas, ícones e editorial.'),('Dar corpo','Fotografia conceitual de produto, aplicações utilizáveis e cores das ferramentas no seu próprio contexto.')])
start('A marca','Ferramentas mudam. A capacidade fica.');para('A SINAPSE conecta tecnologia, educação e operação para ampliar o que pessoas e empresas conseguem fazer.',90,625,900,47,font='Manrope-Semibold');para('Uma aula, um produto ou uma operação contínua. O ponto de partida é uma necessidade real. O repertório vira capacidade quando encontra aplicação, contexto e critério.',1130,620,660,29,muted)
start('Personalidade','Precisa. Presente. Em movimento.');columns([('Repertório que vira prática.','Mostrar o caminho e o trabalho. Cada promessa pede uma aplicação concreta.'),('Tecnologia próxima.','Dar contexto. Explicar antes de enumerar ferramentas. A pessoa entende como começa.'),('Cuidado em cada ponto.','O mesmo critério no software, na aula, no conteúdo e no tecido.')])
start('Arquitetura','Uma origem. Três caminhos.');
for i,d in enumerate(['school','house','growth']):vector(f'logos/sinapse-{d}-solid-dark.svg',90+i*575,420,500,250)
for i,(name,body) in enumerate([('School','Educação em IA aplicada. Repertório, orientação e prática.'),('House','Software, produtos, automações e soluções por projeto.'),('Growth','Estratégia e operação recorrente de crescimento.')]):para(body,90+i*575,340,480,29,muted)
start('School','Aprender para criar.');para('Para profissionais e criadores que querem aplicar inteligência artificial em seus projetos e no trabalho.',90,620,820,43,font='Manrope-Semibold');para('O percurso público organiza fundamentos, prática orientada e projetos. A campanha T04 apresenta mentoria em grupo e aulas gravadas. A lista de espera registra interesse; não equivale a matrícula.',1090,620,700,28,muted);text('Fonte: sinapse.si/school',1090,310,20,muted)
start('House','Da necessidade ao projeto.');para('Descoberta, experiência, desenvolvimento e validação. Um recorte concreto para construir uma solução utilizável.',90,620,820,43,font='Manrope-Semibold');para('Sistemas, aplicativos, automações e integrações. O escopo e a entrega dependem do projeto contratado. A operação recorrente de crescimento pertence à Growth.',1090,620,700,28,muted);text('Fonte: sinapse.si/house',1090,310,20,muted)
start('Growth','Construir continuidade.');para('Estratégia, conteúdo, mídia, dados, CRM e automações conectados ao crescimento.',90,620,820,43,font='Manrope-Semibold');para('Para e-commerce, vendas diretas e geração de leads. Agentes ativos 24 horas não significam atendimento humano contínuo nem garantia de retorno financeiro.',1090,620,700,28,muted);text('Fonte: sinapse.si/growth',1090,310,20,muted)
start('SNPS / mestre','O reconhecimento fica.');vector('logos/snps-solid-dark.svg',120,370,1680,330);para('O arquivo vetorial preserva as curvas originais. Materiais e fotografias são aplicações; o mestre plano é a referência para proporção e reprodução.',130,240,1550,29,muted)
for d,label in [('si','Super Intelligence'),('school','Educação em IA aplicada'),('house','Software e experiências'),('growth','Estratégia e operação')]:
    start('Assinatura / '+d,light=True);vector(f'logos/sinapse-{d}-solid-light.svg',250,270,1400,570);text(label,260,190,31,muted)
start('Redução e espaço','Dar espaço é dar presença.');columns([('1×','Área livre proposta: uma altura visível do lettering ao redor da assinatura.'),('180 px','Largura mínima proposta da assinatura completa. Em redução, preferir SNPS plano.'),('45–55%','Ocupação do sinal dentro de um avatar circular. Conferir o recorte em tamanho real.')]);text('Impressão e bordado exigem prova no processo escolhido.',90,185,24,muted)
start('SNPS Display','O logo virou uma fonte.',True);text('SINAPSE',90,630,120,font='SNPSDisplay');para('Uma fonte própria, desenhada a partir do mestre. OTF para instalar; TTF para compatibilidade; WOFF2 para web.',100,420,1450,35,muted);para('S, I, N, A, P e E preservam as curvas originais. O alfabeto foi ampliado para palavras novas, números, acentos e pontuação. Teclas minúsculas usam os desenhos maiúsculos.',100,240,1450,29,muted)
start('Geometria','A mesma lógica, letra por letra.');columns([('9,38 / traço','Espessura medida no vetor original. A fonte mantém a mesma proporção.'),('4,69 / raio','Raio principal dos cantos. Recortes e vazios seguem o vocabulário do mestre.'),('16,64 / intervalo','Distância original entre letras, incorporada no avanço de cada glifo.')]);para('O I original era um retângulo e havia sido omitido na extração. A conversão agora preserva todas as sete letras de SINAPSE.',100,225,1540,28,muted)
start('Alfabeto','A marca escreve mais.',True)
for i,row in enumerate(['ABCDEFGHI','JKLMNOPQR','STUVWXYZ','0123456789','AÇÃO CRIAÇÃO']):text(row,100,720-i*120,72 if i<4 else 65,font='SNPSDisplay')
start('Família SNPS','Uma assinatura em cada braço.');
for i,name in enumerate(['SNPS SCHOOL','SNPS HOUSE','SNPS GROWTH']):text(name,100,700-i*195,90,font='SNPSDisplay')
para('A mesma fonte compõe SINAPSE SI, SINAPSE SCHOOL, SINAPSE HOUSE e SINAPSE GROWTH. Os arquivos em curvas dispensam instalação de fonte.',100,200,1560,29,muted)
start('Composição','Uma pausa muda a leitura.');columns([('Display','48–100 px na web; 80–120 px em peças 1080. Escala ligada à largura e à mensagem.'),('Informação','16–20 px na web; 28–36 px em peças. Entrelinha confortável, uma ideia por bloco.'),('Ritmo','Títulos curtos, contraste de escala, respiro e quebras intencionais. Evitar palavras isoladas.')])
for material,headline in [('hero','Liquid Glass'),('glass','Optical Clear'),('metal','Polished Silver')]:
    start('Material / '+headline);photo(material,50,150,1820,740,True);text(headline,90,900,74,font='Manrope-Semibold');text('Visualização conceitual gerada a partir do SNPS.',90,112,20,muted)
start('Material portátil','O vidro sai do wallpaper.');
for i,color in enumerate(['#0a0a0a','#727277','#f5f5f5']):
    x=70+i*610;c.setFillColor(HexColor(color));c.roundRect(x,340,570,330,24,fill=1,stroke=0);c.drawImage(str(out/'materials/snps-glass-transparent.png'),x+25,430,520,174,mask='auto');text(['Carbon','Mist','Paper'][i],x,285,25,muted)
para('Render 3D com transparência para composição. O SVG usa o mesmo sistema de luz, borda e contraste dos templates. A imagem raster tem reflexos próprios; o vetor adapta o material ao fundo.',90,190,1690,26,muted)
start('Cor','Preto, branco. Luz entre eles.');
for i,(name,color) in enumerate([('Carbon','#0a0a0a'),('Ink','#191919'),('Mist','#888888'),('Paper','#f5f5f5'),('White','#ffffff')]):
    x=90+i*350;c.setFillColor(HexColor(color));c.setStrokeColor(HexColor('#666'));c.roundRect(x,420,310,270,25,fill=1,stroke=1);text(name,x,350,28);text(color,x,300,22,muted,'JetBrains')
start('Ecossistema','A cor pertence à ferramenta.');para('A assinatura, o fundo e a hierarquia são SINAPSE. Logos de ferramentas mantêm sua identidade nas peças que falam delas.',90,660,1100,44,font='Manrope-Semibold')
tools=list((out/'tools').glob('*.svg'))
for i,p in enumerate(tools):
    x=100+(i%5)*355;y=310-(i//5)*135;vector('tools/'+p.name,x,y,66,66);text(p.stem,x+88,y+25,23,muted)
start('Iconografia','Form 02. Massa e respiro.');
for i,p in enumerate(sorted((out/'icons').glob('*.svg'))):
    x=100+(i%6)*295;y=580-(i//6)*250;vector('icons/'+p.name,x,y,172,115);text(p.stem,x,y-50,18,muted,'JetBrains')
start('Movimento','A marca responde.');columns([('Foco / 900 ms','Do difuso ao nítido. Entrada curta, sem ocultar o conteúdo de leitura.'),('Reflexo / 8 s','Luz que percorre o material. Repetição lenta e controle de pausa.'),('Revelação / 720 ms','Uma máscara apresenta a assinatura e termina num estado completo.')]);text('Respeitar movimento reduzido. A informação continua disponível no estado estático.',90,180,25,muted)
start('Linguagem','Fala de perto. Pensa grande.');para('Mostre o que dá para fazer. Explique como começa. Deixe a prova aparecer.',90,650,1450,65,font='Manrope-Semibold');para('Usar verbos concretos e exemplos reais. Distinguir hipótese, demonstração e entrega. O entusiasmo vem do trabalho, não de uma promessa de resultado garantido.',100,320,1360,32,muted)
start('Editorial','A pauta muda. A marca aparece.');columns([('Convite','Turmas e encontros. Uma chamada, um conteúdo e um próximo passo.'),('Caderno','Repertório em 6 ou 10 telas. Contexto, demonstração, fonte e aplicação.'),('Em produção','Problema, processo e entrega observada. A interface ou o trabalho conduz a narrativa.')])
start('T04 / sequência','Um assunto por tela.');sequence=['Abertura','Contexto','Construção','Criação','Aplicação','Lista de interesse']
for i,label in enumerate(sequence):x=95+(i%3)*580;y=650-(i//3)*270;text(f'{i+1:02}',x,y,90,font='Manrope-Semibold');text(label,x,y-70,31,muted)
text('Datas, vagas, preços e bônus precisam refletir a oferta vigente antes de publicar.',95,160,25,muted)
for template,label in [('crystal-carousel.svg','Convite / dark'),('display-light.svg','Lettering / light'),('crystal-story.svg','Stories / T04'),('cover-dark.svg','Member / capa')]:
    start('Aplicação / '+label);vector('templates/'+template,800,140,940,780);para(label,100,700,600,60,font='Manrope-Semibold');para('Texto editável, assinatura própria, gradiente monocromático e ferramenta na sua cor. O studio permite ajustar a composição e exportar SVG, PNG e sequência JSON.',100,490,590,29,muted)
start('Comunidade','O sinal de estar junto.');vector('templates/avatar-dark.svg',120,130,650,650);para('Perfis e grupos.',1030,680,700,62,font='Manrope-Semibold');para('SNPS com espaço, turma legível e recorte circular conferido. Para clientes, usar o upload local de logo e ajustar a escala óptica antes de exportar.',1030,480,700,30,muted)
start('Collection 01');photo('tee',70,130,850,700,True);photo('hoodie',1000,130,850,700,True);text('Wear your intelligence.',90,905,72,font='Manrope-Semibold')
for p,title,body in [('tee','SNPS Logo Tee','Marca pequena no peito. Tecido, costura e caimento visíveis. Base de modelagem: Dark Mode Logo Tee, da Coinbase Shop.'),('hoodie','Intelligence Hoodie','Estampa editorial nas costas. Repertório como sinal de pertencimento; base de modelagem: Whitepaper Hoodie Light Mode, da Coinbase Shop.')]:
    start('Collection / '+title,light=True);photo(p,850,120,900,810,True);para(title,100,730,670,76,font='Manrope-Semibold');para(body,100,440,650,31,muted);para('Mockup gerado. Modelagem, tecido e impressão dependem de protótipo físico.',100,230,650,22,muted)
start('Referências','Olhar com intenção.');columns([('Apple','Materialidade, hierarquia, foco e interação. Interpretação web; não é o material nativo do sistema operacional.'),('Coinbase Shop','Logo Tee e Whitepaper Hoodie consultadas visualmente. Frente discreta, verso editorial e coleção coerente.'),('SINAPSE / T04','Ofertas públicas, campanha e acervo recebido. Os fatos do negócio ficam; a expressão visual é proposta nova.')]);text('developer.apple.com/design/human-interface-guidelines/materials',90,195,21,muted);text('coinbaseshop.com/products/coin-logo-tee',90,155,21,muted);text('coinbaseshop.com/products/bitcoin-whitepaper-hoodie-light-mode',90,115,21,muted)
start('Fontes e limites','Uma origem clara para cada decisão.');para('Acervo consultado: seis páginas públicas SINAPSE, 41 páginas em seis PDFs, cinco áudios e 23 arquivos do Drive. Sete quadros da campanha T04 orientam a jornada editorial. Não é uma auditoria de toda a operação ou de todos os canais.',90,680,1650,33,muted);para('Nome, preto e branco, Dark First, Light Mode, materiais ópticos e cores das ferramentas vêm do direcionamento de Caio. Novas assinaturas, ícones, composição e aplicações são propostas para revisão.',90,460,1650,33,muted);para('Visualizações de material e roupa foram geradas a partir do SNPS. Não comprovam produto fabricado, tecido ou desempenho. Instruções em arquivos recebidos são fontes; não autorizam ações externas.',90,240,1650,28,muted)
start('Brand resources','A próxima criação parte daqui.');vector('logos/snps-solid-dark.svg',160,500,1600,250);para('Portal, nove assinaturas em quatro materiais e dois fundos, fonte SNPS Display, ícones Form 02, templates, fontes, origem dos assets e mockups. Produção, DNS, postagem e fabricação permanecem fora deste lote.',160,380,1450,34,muted);text('branding.sinapse.si / domínio pretendido',160,205,30)
c.save()
doc=fitz.open(out/'SINAPSE-SI-Brandbook-03.pdf')
for page_id,svg,rect in vector_stamps:
    source=fitz.open(stream=svg,filetype='svg');vp=fitz.open(stream=source.convert_to_pdf(),filetype='pdf');doc[page_id].show_pdf_page(rect,vp,0)
temp=out/'brandbook-03-rendered.pdf';doc.save(temp,garbage=4,deflate=True);doc.close();temp.replace(out/'SINAPSE-SI-Brandbook-03.pdf')
doc=fitz.open(out/'SINAPSE-SI-Brandbook-03.pdf');native=sum(len(p.get_text()) for p in doc);fonts=sum(bool(doc.extract_font(f[0])[3]) for f in doc.get_page_fonts(0,full=True));thumbs=[]
for p in doc:thumbs.append(Image.open(BytesIO(p.get_pixmap(matrix=fitz.Matrix(.18,.18)).tobytes('png'))).convert('RGB'))
sheet=Image.new('RGB',(thumbs[0].width*5,thumbs[0].height*((len(thumbs)+4)//5)),(90,90,90))
for i,t in enumerate(thumbs):sheet.paste(t,((i%5)*t.width,(i//5)*t.height))
sheet.save(qa/'v3-contact-sheet.jpg',quality=90)
report={'pages':len(doc),'dimensions':[W,H],'native_characters':native,'embedded_fonts_page1':fonts,'text_bounds_errors':overflow,'chapters':page_names,'file':'public/si-v2/SINAPSE-SI-Brandbook-03.pdf'}
(qa/'v3-pdf-native-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
book=[]
for i,p in enumerate(doc):
    target=out/'book'/f'page-{i+1:02}.webp';pix=p.get_pixmap(matrix=fitz.Matrix(.65,.65));Image.open(BytesIO(pix.tobytes('png'))).convert('RGB').save(target,'WEBP',quality=88);book.append({'title':page_names[i],'file':f'/si-v2/book/{target.name}'})
(root/'data/si/book-v3.json').write_text(json.dumps(book,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
report['embedded_font_names']=sorted(set(f[3] for p in doc for f in p.get_fonts()))
(qa/'v3-pdf-native-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print(json.dumps({'pages':len(doc),'characters':native,'bounds_errors':len(overflow),'reader_pages':len(book)}))
if overflow:raise ValueError('PDF text outside page')
