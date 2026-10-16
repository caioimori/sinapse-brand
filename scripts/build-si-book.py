from pathlib import Path
import json,re,math
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as RLFont
from reportlab.lib.colors import HexColor
from fontTools.svgLib.path import parse_path
from fontTools.pens.basePen import BasePen
import fitz
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[1];out=root/'public'/'si';qa=root/'qa-local';qa.mkdir(exist_ok=True)
data=json.loads((out/'brand-data.json').read_text(encoding='utf8'));masters=json.loads((out/'masters.json').read_text())
for n,f in [('Inter','Inter-Regular.ttf'),('Medium','Inter-Medium.ttf'),('Bold','Inter-Semibold.ttf'),('Mono','JetBrainsMono-Regular.ttf'),('Display','Audiowide-Regular.ttf')]:pdfmetrics.registerFont(RLFont(n,str(out/'fonts'/f)))
W,H=1920,1080;M=112;FG='#F5F5F0';BG='#0A0A0A';MUTED='#A6A6A6';LINE='#333333'
c=canvas.Canvas(str(out/'SINAPSE-SI-Brandbook.pdf'),pagesize=(W,H),pageCompression=1,initialFontName='Inter',initialFontSize=12)
c.setTitle('SINAPSE SI — Brand System 1.0');c.setAuthor('SINAPSE SI');c.setSubject('Proposta de evolução: estratégia, identidade, movimento e aplicações')
page_count=0;bounds=[]
class ReportLabPen(BasePen):
    def __init__(self,glyphSet,path):super().__init__(glyphSet);self.path=path
    def _moveTo(self,p):self.path.moveTo(*p)
    def _lineTo(self,p):self.path.lineTo(*p)
    def _curveToOne(self,p1,p2,p3):self.path.curveTo(*p1,*p2,*p3)
    def _closePath(self):self.path.close()
    def _endPath(self):pass
def color(v):return HexColor(v)
def rect(x,y,w,h,fill,stroke=None,radius=0):
    c.setFillColor(color(fill));c.setStrokeColor(color(stroke or fill))
    if radius:c.roundRect(x,H-y-h,w,h,radius,stroke=bool(stroke),fill=1)
    else:c.rect(x,H-y-h,w,h,stroke=bool(stroke),fill=1)
def line(x1,y1,x2,y2,stroke=None,width=1):
    stroke=stroke or LINE
    c.setStrokeColor(color(stroke));c.setLineWidth(width);c.line(x1,H-y1,x2,H-y2)
def text(s,x,y,size=24,font='Inter',fill=None):
    fill=fill or FG
    c.setFillColor(color(fill));c.setFont(font,size);c.drawString(x,H-y-size*.78,s)
    width=pdfmetrics.stringWidth(s,font,size);bounds.append({'page':page_count+1,'text':s,'x':x,'y':y,'right':x+width,'bottom':y+size,'size':size})
    return width
def wrap(s,max_width,size,font='Inter'):
    words=s.split();lines=[];current=''
    for word in words:
        candidate=(current+' '+word).strip()
        if pdfmetrics.stringWidth(candidate,font,size)>max_width and current:lines.append(current);current=word
        else:current=candidate
    if current:lines.append(current)
    if len(lines)>1 and len(lines[-1].split())==1:
        prev=lines[-2].split()
        if len(prev)>2:lines[-1]=prev.pop()+' '+lines[-1];lines[-2]=' '.join(prev)
    return lines
def para(s,x,y,width,size=27,font='Inter',fill=None,leading=1.5):
    fill=fill or MUTED
    lines=wrap(s,width,size,font)
    for i,t in enumerate(lines):text(t,x,y+i*size*leading,size,font,fill)
    return y+len(lines)*size*leading
def title(s,x=M,y=220,width=1450,size=96,fill=None):return para(s,x,y,width,size,'Medium',fill or FG,1.04)
def kicker(s,x=M,y=105,fill=None):text(s.upper(),x,y,16,'Mono',fill or MUTED)
def paths(svg,x,y,width,view=(0,0,734.86,113.46),fill=None):
    fill=fill or FG
    vx,vy,vw,vh=view;scale=width/vw
    c.saveState();c.translate(x,H-y);c.scale(scale,-scale);c.translate(-vx,-vy);c.setFillColor(color(fill))
    for d in re.findall(r'<path\b[^>]*\bd="([^"]+)"',svg):
        pen=ReportLabPen(None,c.beginPath());parse_path(d,pen);c.drawPath(pen.path,stroke=0,fill=1)
    c.restoreState()
def symbol(x,y,width,fill=None):paths(masters['symbol'],x,y,width,(28,28,104,58),fill or FG)
def mark(x,y,width=290,fill=None,division='SI'):
    fill=fill or FG
    paths(masters['wordmark'],x,y,width,fill=fill);line(x+width+20,y+width*.035,x+width+20,y+width*.12,fill,1)
    text(division,x+width+40,y+width*.026,width*.055,'Inter',fill)
def start(label,light=False):
    global FG,BG,MUTED,LINE
    FG,BG,MUTED,LINE=('#0A0A0A','#F5F5F0','#626262','#CECECB') if light else ('#F5F5F0','#0A0A0A','#A6A6A6','#333333')
    rect(0,0,W,H,BG);kicker(label)
    text('SINAPSE SI / BRAND SYSTEM',1460,105,13,'Mono',MUTED)
def end():
    global page_count
    line(M,1000,W-M,1000);text('PROPOSTA DE EVOLUÇÃO 1.0 / 16 OUT 2026',M,1025,12,'Mono',MUTED)
    text(f'{page_count+1:02}',W-M-25,1022,16,'Mono',MUTED)
    c.showPage();page_count+=1
def columns(items,y=470,size=25,gap=55):
    width=(W-M*2-gap*(len(items)-1))/len(items)
    for i,(heading,body) in enumerate(items):
        x=M+i*(width+gap);line(x,y-30,x+width,y-30);para(heading,x,y,width,35,'Medium',FG,1.15);para(body,x,y+100,width,size,'Inter',MUTED,1.55)
def draw_icon(name,x,y,width=110,fill=None):
    fill=fill or FG
    # Same authored geometry as the web library.
    from fontTools.pens.basePen import BasePen
    icons={
    'school':'M10 32C22 6 38 6 48 32S74 58 86 32M10 32C22 58 38 58 48 32S74 6 86 32',
    'house':'M8 14H33L48 32L33 50H8M88 14H63L48 32L63 50H88M36 32H60',
    'growth':'M10 52H34V36H58V20H86M68 8H86V32',
    'connect':'M8 32C8 16 38 16 38 32S8 48 8 32M58 32C58 16 88 16 88 32S58 48 58 32M38 32H58',
    'context':'M10 14H64V50H10ZM32 14V6H86V42H64',
    'create':'M48 6V58M22 32H74M30 14L66 50M66 14L30 50',
    'agent':'M22 28Q22 12 38 12H58Q74 12 74 28V39Q74 55 58 55H38Q22 55 22 39ZM48 4V12M34 29V33M62 29V33M36 44H60',
    'data':'M14 50V34M37 50V20M60 50V8M83 50V27M8 58H88',
    'code':'M30 14L10 32L30 50M66 14L86 32L66 50M55 7L41 57',
    'play':'M34 10L68 32L34 54Z',
    'flow':'M7 32A9 9 0 1 0 25 32A9 9 0 1 0 7 32M71 32A9 9 0 1 0 89 32A9 9 0 1 0 71 32M25 32H71M48 32V9M48 32V55',
    'orbit':'M11 32A37 21 0 1 0 85 32A37 21 0 1 0 11 32M30 32A18 29 0 1 0 66 32A18 29 0 1 0 30 32'}
    c.saveState();c.translate(x,H-y);c.scale(width/96,-width/96);c.setStrokeColor(color(fill));c.setLineWidth(4);c.setLineCap(1);c.setLineJoin(1);pen=ReportLabPen(None,c.beginPath());parse_path(icons[name],pen);c.drawPath(pen.path,stroke=1,fill=0);c.restoreState()

# Cover
start('THE SINAPSE SI BRAND SYSTEM')
title('Inteligência que nos conecta.',M,250,1220,138)
para('A expressão de uma nova era. Um sistema para tudo o que vem depois.',M,680,620,29)
symbol(1150,445,610,'#D0D0CE');mark(M,862,320)
end()

start('VISÃO GERAL / ÍNDICE',True);title('Tudo parte daqui.',size=110)
for i,ch in enumerate(data['chapters']):
    col=i//7;row=i%7;x=M+col*850;y=435+row*67
    text(ch['n'],x,y,17,'Mono',MUTED);text(ch['title'],x+65,y-4,30,'Inter',FG);line(x,y+43,x+740,y+43)
end()

start('01 / CONTEXTO');title('Uma marca pronta para conectar o ecossistema.',width=1550,size=105)
columns([('O que já existe.','Nome, lettering e símbolo reconhecíveis. Seis páginas públicas, estudos de identidade e vestuário e uma campanha para a T04.'),('O que precisa evoluir.','Uma decisão de tipografia e paleta; sinais por braço; aplicações consistentes; templates, movimento e arquivos de uso.'),('O que muda agora.','SINAPSE SI como assinatura institucional, um sistema monocromático e uma biblioteca que transforma identidade em produção.')],y=595)
end()

start('01 / AUDITORIA DO ACERVO',True);title('Preservar. Consolidar. Expandir.',size=98)
columns([('Preservar.','Desenhos vetoriais originais, relação entre School/House/Growth e clareza das ofertas.'),('Consolidar.','Preto e branco por direção de Caio. Inter para informar, Mono para metadados e tipo expressivo em chamadas curtas.'),('Expandir.','Variantes, ícones, materiais, movimento, templates, avatares, capas e famílias de vestuário.')],y=490)
para('Os seis PDFs são estudos abertos. As cores auxiliares sugeridas nos arquivos e áudios não substituem a direção monocromática atual.',M,890,1500,22)
end()

start('01 / POSICIONAMENTO');title('Inteligência para ampliar o que você consegue fazer.',width=1560,size=110)
para('Um ecossistema de inteligência aplicada que conecta educação, software e crescimento para ampliar a capacidade de pessoas e empresas.',M,690,1180,35)
end()

start('01 / PRINCÍPIOS',True);title('O que orienta cada escolha.',size=102)
for i,p in enumerate(data['principles']):
    x=M+(i%2)*850;y=450+(i//2)*225
    text(f'0{i+1}',x,y,15,'Mono',MUTED);para(p['title'],x+65,y-5,690,35,'Medium',FG,1.1);para(p['text'],x+65,y+59,660,24)
end()

start('01 / PÚBLICO');title('A necessidade vem antes da ferramenta.',width=1600,size=100)
columns([(p['name'],p['audience']) for p in data['pillars']],y=540)
para('Públicos pretendidos a partir das ofertas públicas e do briefing. Não houve entrevistas ou pesquisa quantitativa de percepção neste lote.',M,900,1480,21)
end()

start('02 / ARQUITETURA',True);title('Três caminhos. Uma inteligência.',width=1500,size=100)
mark(600,420,480,FG)
line(940,510,940,590);line(360,590,1510,590)
for i,p in enumerate(data['pillars']):
    x=230+i*570;line(x+130,590,x+130,660);draw_icon(p['key'],x+83,690,110,FG);text(p['name'],x,825,48,'Medium',FG);para(p['descriptor'],x,900,420,24)
end()

for i,p in enumerate(data['pillars']):
    start('02 / SINAPSE '+p['name'].upper(),i==1)
    draw_icon(p['key'],M,220,130,FG);title(p['verb'],M,375,1000,140)
    para(p['promise'],M,600,920,42,'Medium',FG,1.2);para(p['detail'],M,745,970,29)
    kicker('O PERCURSO',1260,360);para(p['rhythm'],1260,415,470,38,'Inter',FG,1.3);para(p['boundary'],1260,660,470,23)
    c.linkURL(p['url'],(1260,H-900,1770,H-850));text('sinapse.si/'+p['key'],1260,875,21,'Mono',MUTED)
    end()

start('02 / NOME E CONTEXTO');title('SINAPSE SI. Super Intelligence.',width=1700,size=104)
columns([('O nome.','SINAPSE é a marca. SI explicita Super Intelligence. Usar SINAPSE SI na primeira menção institucional e SINAPSE nas seguintes.'),('Os braços.','Sinapse School, Sinapse House e Sinapse Growth. Mesmo núcleo, ofertas claras e sinais próprios.'),('O contexto.','A ordem da Casa Branca de 29/09/2026 adota SI nas comunicações do Executivo federal dos EUA. É contexto de terminologia, não prova de capacidade da SINAPSE.')],y=530)
url='https://www.whitehouse.gov/presidential-actions/2026/09/inaugurating-the-era-of-super-intelligence/'
c.linkURL(url,(M,H-953,1200,H-920));text('FONTE PRIMÁRIA / CASA BRANCA / 29 SET 2026',M,925,15,'Mono',MUTED)
end()

start('03 / ASSINATURA PRINCIPAL',True);title('O desenho permanece.',size=105)
mark(210,445,1190,FG)
para('Lettering original preservado. Descritor SI proposto, com arquivos de distribuição em curvas. A identidade anterior continua disponível no acervo.',M,825,1450,26)
end()

start('03 / VARIANTES');title('Um sistema de assinaturas.',size=105)
for i,division in enumerate(['SI','School','House','Growth']):
    x=M+(i%2)*850;y=465+(i//2)*230
    mark(x,y,520,FG,division);kicker('SINAPSE '+division,x,y+115)
end()

start('03 / SÍMBOLO',True);title('Reconhecer em um instante.',size=104)
symbol(260,430,530,FG)
line(230,400,820,400,LINE);line(230,760,820,760,LINE);line(230,400,230,760,LINE);line(820,400,820,760,LINE)
kicker('PROTEÇÃO / ALTURA VISÍVEL DO SINAL',1030,440)
para('Reservar uma altura visível do símbolo ao redor da assinatura. Em avatar, manter o desenho dentro de 55% do círculo.',1030,500,610,34,'Inter',FG,1.4)
para('Mínimos propostos: símbolo 24 px; assinatura principal 160 px; com braço 190 px. Conferir na redução e na técnica de impressão.',1030,760,610,24)
end()

start('03 / USO');title('A força está na consistência.',size=102)
columns([('Preserve as curvas.','Não esticar, redesenhar letras ou digitar uma aproximação do lettering. Usar o arquivo mestre.'),('Contraste suficiente.','Logo claro sobre Vanta; escuro sobre Bone. Uma fotografia pede área livre ou superfície de contraste.'),('Material no contexto.','Óptico e metal para expressão digital. Bordado, impressão e gravação usam o vetor plano com prova física.')],y=535)
end()

start('04 / TIPOGRAFIA',True);title('A voz ganha forma.',size=110)
text('Aa. 0123',M,430,205,'Inter',FG)
kicker('INTER / INFORMAÇÃO',M,735)
para('Títulos, corpo e interface. Escala clara, poucos pesos por composição e leitura antes do efeito.',M,790,890,31)
kicker('JETBRAINS MONO / METADADOS',1160,440)
para('Rótulos, numeração, dados e referências. O detalhe técnico deve orientar sem dominar a mensagem.',1160,495,580,28)
kicker('ACERVO',1160,735)
para('Helvetica Neue e Gotham aparecem no estudo recebido; fontes comerciais ficam fora do kit. Sora permanece no acervo legado.',1160,790,580,24)
end()

start('04 / EXPRESSÃO');kicker('AUDIOWIDE / EXPERIMENTAL',M,220)
text('SUPER',M,330,152,'Display',FG);text('INTELLIGENCE.',M,515,120,'Display',FG)
para('Explorar o território do lettering com palavras curtas, recortes, contorno e repetição. Uma fonte de expressão não substitui o logo em curvas.',M,785,1380,32)
end()

start('04 / HIERARQUIA',True);title('Uma ideia por composição.',size=104)
columns([('Título.','Web: 56–100 px. Peça de 1080 px: 80–112 px. Entrelinha curta, poucas linhas e contraste de escala.'),('Corpo.','Web: 14–18 px. Peça de 1080 px: 27–38 px. Entrelinha confortável e informação necessária.'),('Metadado.','Web: 10–12 px. Peça de 1080 px: 17–22 px. Rótulos, fonte e número da tela.')],y=545)
para('Na web, balance em títulos e pretty na prosa. Nos arquivos exportados, revisar a quebra real e evitar uma palavra isolada na última linha.',M,915,1500,22)
end()

start('05 / PALETA');title('A luz faz a diferença.',size=110)
for i,p in enumerate(data['palette']):
    x=M+i*246;rect(x,475,220,255,p['hex'],LINE,12);text(p['name'],x,770,26,'Medium',FG);text(p['hex'],x,820,16,'Mono',MUTED)
para('Preto e branco, sem accent cromático. Contraste, matéria, escala e espaço constroem a expressão.',M,920,1500,26)
end()

start('05 / MATÉRIA',True);title('Precisão. Profundidade. Presença.',size=95)
for i,(name,fill,ink) in enumerate([('MATTE','#141414','#F5F5F0'),('SILVER','#C9C9C6','#0A0A0A'),('OPTICAL','#E8E8E5','#737373')]):
    x=M+i*575;rect(x,450,535,360,fill,LINE,20);symbol(x+112,540,310,ink);kicker(name,x+28,760,ink)
para('Vidro orienta controles e navegação; conteúdo informativo permanece em superfície sólida. Material óptico é uma interpretação visual, não o componente nativo Apple.',M,875,1500,25)
end()

start('05 / DIREÇÃO DE ARTE');title('O silêncio também comunica.',size=110)
columns([('Composição.','Base de 4 px. Margens consistentes, grade fluida, uma ideia principal e espaço de respiro.'),('Imagem.','Produto, bastidores, pessoas e interfaces reais. Direção em preto e branco ou cor original quando a informação exigir.'),('Fotografia.','Luz lateral ampla, textura sutil e contexto próximo. Conferir origem, produto, anatomia e autorização de uso.')],y=540)
end()

start('06 / ICONOGRAFIA',True);title('Uma família de sinais.',size=110)
for i,name in enumerate(['school','house','growth','connect','context','create','agent','data','code','play','flow','orbit']):
    x=M+(i%6)*290;y=450+(i//6)*240
    draw_icon(name,x+55,y,105,FG);kicker(name,x+35,y+115)
para('Grade 96 × 64, traço 4, terminais arredondados. Ícones dos braços identificam a oferta; ações comuns mantêm controles reconhecíveis.',M,920,1500,23)
end()

start('07 / MOVIMENTO');title('A conexão acontece.',size=115)
for i,m in enumerate(data['motionRules']):
    y=435+i*125;line(M,y-18,W-M,y-18);text(m['name'],M,y+5,33,'Medium',FG);text(m['duration'],560,y+8,27,'Mono',MUTED);para(m['use'],800,y,940,24)
end()

start('07 / COMPORTAMENTO',True);title('A marca se move. A mensagem fica.',width=1600,size=100)
columns([('Entrada.','Aproximação, conexão e luz levam ao estado final. A assinatura chega inteira.'),('Leitura.','Texto essencial permanece estável. Loops ambientais são discretos e têm pausa.'),('Acessibilidade.','Movimento reduzido preserva o estado estático e o uso dos controles. Transições não escondem conteúdo.')],y=555)
para('O kit entrega fontes SVG animadas e tokens. Não declara filmes MP4 ou identidade sonora finalizada.',M,920,1500,23)
end()

start('08 / VOZ');title('Clareza é inteligência.',size=118)
columns([('Precisa.','Começar pelo que a pessoa quer fazer. Traduzir siglas e explicar com exemplos.'),('Próxima.','Verbos concretos, períodos naturais e um próximo passo. O especialista pode ser autoral sem perder precisão.'),('Responsável.','Distinguir visão, hipótese, demonstração e entrega. O entusiasmo não amplia a oferta.')],y=540)
end()

start('08 / MANIFESTO',True);title('O que vem depois começa no que conseguimos conectar.',width=1600,size=98)
para('Uma ideia encontra um método. Uma pessoa encontra um novo repertório. Uma tecnologia encontra um problema que vale resolver.',M,590,1290,34,'Inter',FG,1.5)
para('A SINAPSE existe nesse encontro, ampliando a capacidade de aprender, criar, decidir e executar.',M,790,1290,34,'Inter',MUTED,1.5)
end()

for page in range(2):
    start('08 / LINGUAGEM NA PRÁTICA',page==1);title('O que dizemos muda a experiência.',width=1600,size=92)
    for i,v in enumerate(data['voiceExamples'][page*3:page*3+3]):
        y=440+i*170;line(M,y-22,W-M,y-22);kicker(v['context'],M,y);para(v['before'],400,y,550,26,'Inter',MUTED,1.45);para(v['after'],1040,y,680,29,'Medium',FG,1.35)
    end()

start('09 / EDITORIAL');title('Uma marca. Muitas histórias.',size=108)
for i,f in enumerate(data['editorialFamilies']):
    x=M+(i%2)*850;y=440+(i//2)*235
    kicker(f['label'],x,y);text(f['name'],x,y+42,37,'Medium',FG);para(f['use'],x,y+105,720,25)
end()

def mini_art(x,y,w,h,title_s,eyebrow,light=False,num=None,sym=False):
    bg='#F5F5F0' if light else '#141414';fg='#0A0A0A' if light else '#F5F5F0';muted='#626262' if light else '#A6A6A6'
    rect(x,y,w,h,bg,'#444444',8);pad=w*.085
    para(eyebrow.upper(),x+pad,y+pad,w-pad*2,w*.026,'Mono',muted,1.3)
    if sym:symbol(x+w*.25,y+h*.25,w*.5,fg)
    para(title_s,x+pad,y+h*.57,w-pad*2,w*.093,'Medium',fg,1.08)
    text(f'{num:02}' if num else 'SINAPSE SI',x+pad,y+h-pad,w*.025,'Mono',muted)

start('09 / FEED',True);title('Ritmo com independência.',size=102)
for i,t in enumerate(['Uma conexão muda tudo.','IA aplicada.','Da ideia à operação.','Pense e aplique.','Infinitas possibilidades.','O próximo passo.']):mini_art(220+(i%3)*495,410+(i//3)*265,465,245,t,['Signal','Open Class','Proof of Work'][i%3],i%3==1,sym=i%3==0)
para('Estudo de ritmo. Cada peça precisa funcionar sozinha; não fixa cadência ou proporção de formatos.',M,957,1550,19)
end()

start('09 / STORIES T04');title('Do convite ao próximo passo.',size=103)
for i,s in enumerate(data['sequenceT04']):mini_art(M+i*285,445,260,462,s['title'],s['eyebrow'],s['kind']=='light',i+1,sym=True)
para('Roteiro reutilizável. Condições como 05/11, limite de 20 alunos e bônus foram observadas na campanha recebida; validar a oferta vigente antes de aplicá-las.',M,948,1640,20)
end()

start('09 / CARROSSEL',True);title('O formato acompanha a ideia.',size=110)
columns([('6 telas.','Chamada, contexto, mecanismo, exemplo, aplicação e ação. Uma ideia principal por tela.'),('10 telas.','Mais profundidade de explicação e demonstração. A extensão depende do assunto, sem repetição para preencher volume.'),('Post único.','Uma frase, detalhe ou argumento visual. O desenvolvimento pode continuar na legenda.')],y=515)
para('Stories usam 9:16; carrosséis 4:5; post 1:1. Guias internos reservam 250 px no topo e 270 px na base dos stories; conferir no destino.',M,915,1550,23)
end()

start('10 / TEMPLATE STUDIO');title('Da identidade à próxima peça.',size=108)
mini_art(1085,370,390,488,'O seu próximo passo começa aqui.','OPEN CLASS / T04',True,1,sym=True)
para('Edite formato, família, assinatura, título e apoio. Alterne Vanta e Bone. Cada tela da sequência mantém o conteúdo durante a sessão.',M,495,750,34,'Inter',FG,1.5)
para('Exportação real: PNG no tamanho original, SVG com texto editável e fonte incorporada e JSON da sequência. Tudo é gerado no navegador.',M,755,750,28)
end()

start('11 / COMUNIDADE',True);title('O sinal de pertencer.',size=112)
for i,name in enumerate(['Marca','Turma T04','SINAPSE × Cliente']):
    x=370+i*560;c.setStrokeColor(color(LINE));c.setFillColor(color(BG));c.circle(x,H-610,165,stroke=1,fill=1)
    if i==0:symbol(x-90,550,180,FG)
    elif i==1:text('T04',x-100,545,100,'Inter',FG);draw_icon('school',x-37,675,74,FG)
    else:symbol(x-130,565,105,FG);line(x,535,x,660,LINE);text('AC',x+30,574,59,'Medium',FG)
    text(name,x-140,835,28,'Medium',FG)
para('Coassinatura com pesos ópticos equivalentes e arquivos reais autorizados. AC são iniciais fictícias de exemplo. Conferir avatares em 32, 48 e 96 px.',M,935,1600,23)
end()

start('11 / ÁREA DE MEMBROS');title('Uma biblioteca para explorar.',size=110)
for i,(t,d) in enumerate([('Pensar com inteligência.','Fundamentos e contexto'),('Construir com agentes.','Projetos e aplicação'),('Colocar em movimento.','Criação e automação')]):mini_art(320+i*460,425,410,500,t,d,False,i+1,sym=True)
para('Propostas de nomes e organização visual; não representam currículo publicado. Capas verticais, banners 16:9 e aulas seguem o mesmo sistema.',M,955,1600,19)
end()

start('12 / VESTUÁRIO',True);title('Uniforme do futuro.',size=118)
columns([('Essential.','Símbolo no peito e lettering nas costas. O sinal em sua expressão mais silenciosa.'),('Super Intelligence.','Uma chamada manifesto em escala. Assinatura e detalhe editorial, sem falsa parceria com fornecedores.'),('Connected.','Nós, linhas e progressão transformam a gramática de conexão em estampa.')],y=535)
end()

for label,filenames in [('CAMISETAS',['tshirt-essential.webp','tshirt-white.webp']),('MOLETONS',['hoodie-essential.webp','hoodie-manifesto.webp'])]:
    start('12 / ACERVO RECEBIDO / '+label);title('A origem da evolução.',size=110)
    for i,f in enumerate(filenames):
        p=out/'studies'/f;c.drawImage(str(p),M+i*865,H-850,width=810,height=450,preserveAspectRatio=True,anchor='c',mask='auto')
    para('Mockups conceituais selecionados dos PDFs recebidos. Não confirmam tecido, gramatura, modelagem, estoque, fornecedor ou fabricação.',M,920,1600,24)
    end()

start('12 / PRODUÇÃO',True);title('Do desenho à prova física.',size=110)
columns([('Posicionamento.','Direção inicial: sinal no peito de 28–40 mm; lettering nas costas de 240–280 mm. Ajustar por peça e tamanho.'),('Técnica.','Vetor plano, contraste e traço mínimo compatíveis com bordado, impressão ou gravação. Aprovar com o fornecedor.'),('Prova.','Amostra física para escala, posição, tecido e acabamento. O mockup não substitui a ficha técnica.')],y=545)
end()

for group in range(3):
    subset=data['benchmarks'][group*4:group*4+4]
    if not subset:continue
    start('13 / BENCHMARK',group%2==1);title('Referências com consequência.',size=100)
    for i,b in enumerate(subset):
        x=M+(i%2)*850;y=425+(i//2)*250
        text(b['brand'],x,y,35,'Medium',FG);kicker(b['category'],x,y+52);para(b['decision'],x,y+100,730,24)
        if b['url']:c.linkURL(b['url'],(x,H-y-222,x+690,H-y-197));text('FONTE / '+b['source'][:55],x,y+216,11,'Mono',MUTED)
    end()

start('13 / EVIDÊNCIA',True);title('O que foi realmente consultado.',size=100)
for i,(n,body) in enumerate([('06','Páginas públicas atuais: visão geral, House, School, Growth, Perguntas e Informações.'),('41','Páginas dos seis PDFs enviados, renderizadas para inspeção visual.'),('05','Áudios transcritos localmente; três pertinentes à marca e dois sobre joias.'),('23','Arquivos do Drive decodificados, incluindo vídeos inspecionados por quadros.'),('07','Quadros do destaque T04 da SINAPSE; amostra também encontrada nos perfis dos fundadores.')]):
    y=415+i*102;text(n,M,y,56,'Inter',FG);para(body,M+160,y+7,1390,25)
end()

start('14 / RECURSOS');title('O sistema nas suas mãos.',size=110)
columns([('Mestres e variantes.','Assinaturas em curvas, símbolo preservado, versões claras/escuras e ícones próprios.'),('Templates e fontes.','Artes editáveis, sequências JSON, fontes abertas com licença, tokens e três estudos SVG animados.'),('Produção e manutenção.','Guia de uso, dados canônicos e identificação da versão. Briefings privados ficam fora da distribuição.')],y=545)
end()

start('14 / PRÓXIMO PASSO',True);title('Aprovar. Aplicar. Aprender.',size=110)
columns([('Aprovar o sistema.','Revisar a proposta visual e suas aplicações reais. O nome e a paleta seguem a direção atual; os desdobramentos são propostas.'),('Aplicar com contexto.','Migrar cada ponto de contato em um lote identificado, com arquivos corretos e conferência no destino.'),('Aprender com o uso.','Observar reconhecimento, compreensão e comportamento. Não atribuir conversão à estética sem medição.')],y=545)
para('Este documento não publica o domínio branding.sinapse.si, redes sociais ou fabricação. As rotas históricas e os arquivos originais permanecem recuperáveis.',M,920,1600,23)
end()

start('LESS NOISE. MORE INTELLIGENCE.');symbol(1450,200,300,FG)
title('O futuro tem muitas formas. Esta é a nossa.',M,300,1500,125)
mark(M,865,370)
end();c.save()

pdf=fitz.open(out/'SINAPSE-SI-Brandbook.pdf');tiles=[]
for i,p in enumerate(pdf):
    pix=p.get_pixmap(matrix=fitz.Matrix(.25,.25),alpha=False);im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
    tile=Image.new('RGB',(500,310),'#bcbcbc');tile.paste(im,(10,25));ImageDraw.Draw(tile).text((12,7),f'{i+1:02}',fill='black');tiles.append(tile)
sheet=Image.new('RGB',(2000,310*((len(tiles)+3)//4)),'#aaa')
for i,t in enumerate(tiles):sheet.paste(t,((i%4)*500,(i//4)*310))
sheet.save(qa/'pdf-contact-sheet.jpg',quality=90)
for i in [0,7,12,18,26,len(pdf)-1]:
    if i<len(pdf):pdf[i].get_pixmap(matrix=fitz.Matrix(.65,.65),alpha=False).save(qa/f'pdf-{i+1:02}.png')
bad=[b for b in bounds if b['right']>W-45 or b['bottom']>H-20 or b['x']<0 or b['y']<0]
(qa/'pdf-native-check.json').write_text(json.dumps({'pages':len(pdf),'size':[W,H],'native_text_characters':sum(len(p.get_text()) for p in pdf),'text_overflow':bad,'font_names':sorted(set(f[3] for p in pdf for f in p.get_fonts()))},ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print(json.dumps({'pages':len(pdf),'native_text_characters':sum(len(p.get_text()) for p in pdf),'overflow':len(bad),'file':str(out/'SINAPSE-SI-Brandbook.pdf')},ensure_ascii=False))
