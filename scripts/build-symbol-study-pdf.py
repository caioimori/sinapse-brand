from pathlib import Path
from io import BytesIO
import json,zipfile,hashlib,xml.etree.ElementTree as ET
import fitz
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/symbol-study';Q=R/'qa-local/symbol-study';Q.mkdir(exist_ok=True,parents=True)
study=json.loads((O/'study.json').read_text(encoding='utf8'));W,H=1920,1080;stamps=[];errors=[];titles=[]
for alias,file in [('Read','Manrope-Regular.ttf'),('Bold','Manrope-Semibold.ttf'),('Mono','JetBrainsMono-Regular.ttf')]:pdfmetrics.registerFont(TTFont(alias,str(R/'public/si-v2/fonts'/file)))
c=canvas.Canvas(str(O/'SINAPSE-Estudo-de-Simbolo.pdf'),pagesize=(W,H));c.setTitle('SINAPSE — estudo de símbolo');c.setAuthor('SINAPSE / proposta para revisão');fg='#f5f5f5';muted='#aaaaaa'
def text(value,x,y,size=28,font='Read',color=None):
 c.setFillColor(HexColor(color or fg));c.setFont(font,size);c.drawString(x,y,value);width=pdfmetrics.stringWidth(value,font,size)
 if x<0 or x+width>W+1 or y<0 or y+size>H+1:errors.append(value)
def para(value,x,y,width,size=29,color=None,font='Read'):
 line=''
 for word in value.split():
  if line and pdfmetrics.stringWidth(line+' '+word,font,size)>width:text(line,x,y,size,font,color);y-=size*1.45;line=word
  else:line=(line+' '+word).strip()
 if line:text(line,x,y,size,font,color)
 return y-size*1.45
def page(name,light=False):
 global fg,muted
 if titles:c.showPage()
 titles.append(name);fg='#141414' if light else '#f5f5f5';muted='#666666' if light else '#aaaaaa';c.setFillColor(HexColor('#f5f5f5' if light else '#0a0a0a'));c.rect(0,0,W,H,fill=1,stroke=0)
 text('SINAPSE / ESTUDO DE SÍMBOLO',90,1010,18,'Mono',muted);text(str(len(titles)).zfill(2),1790,1010,18,'Mono',muted);text('PROPOSTAS PARA REVISÃO / OUT 2026',90,65,16,'Mono',muted)
def vector(path,x,y,w,h):
 data=Path(path).read_bytes();node=ET.fromstring(data);_,_,vw,vh=map(float,node.get('viewBox').split());scale=min(w/vw,h/vh);sw,sh=vw*scale,vh*scale;sy=y+(h-sh)/2
 stamps.append((len(titles)-1,data,fitz.Rect(x,H-sy-sh,x+sw,H-sy)))
def symbol(item,x,y,w,light=False):vector(O/f'{item["id"]}-{"light" if light else "dark"}.svg',x,y,w,w)
def headline(lines,x=90,y=800,size=125):
 for i,line in enumerate(lines):text(line,x,y-i*size*1.08,size,'Bold')
page('Uma ideia. Um corpo.');headline(['Uma ideia.','Um corpo.']);symbol(study['symbols'][1],1100,230,660);para('Conectar o que sabemos ao que conseguimos criar.',95,400,780,45);para('Três caminhos preenchidos e conectados, a partir da essência da Sinapse e do lettering SNPS.',95,230,780,28,muted)
page('Essência');headline(['A inteligência acontece','na conexão.'],size=90)
for i,(t,p) in enumerate([('Repertório humano','A School desenvolve contexto e autonomia. A intenção humana define direção.'),('Capacidade computacional','IA, ferramentas e software ampliam o que se consegue construir e executar.'),('Aplicação e aprendizado','A House constrói; a Growth acompanha a operação. O uso real permite revisar e aprender.')]):
 x=90+i*585;text('0'+str(i+1),x,530,22,'Mono',muted);para(t,x,455,520,41,font='Bold');para(p,x,300,500,28,muted)
text('Síntese de design proposta; não é uma alegação de superinteligência técnica.',95,125,25,color=muted)
page('Referências',True);headline(['Três ideias podem','virar uma só forma.'],size=90)
for i,(name,concept,source) in enumerate([('Cirdia','Labirinto + impressão digital + C. Integração de significados numa forma própria.','behance.net/gallery/223404055 / p. 21'),('Buff','Duplo f do próprio nome. O ícone preserva parentesco com o wordmark.','behance.net/gallery/194285855 / p. 15'),('OXA AI','Núcleo e pontos distribuídos. Relação entre capacidades, com outra estrutura gráfica.','behance.net/gallery/252031039')]):
 x=90+i*585;text(name,x,520,50,'Bold');para(concept,x,410,500,30,muted);para(source,x,185,500,20,muted)
page('DNA');headline(['O desenho já tem','uma origem.'],size=90)
for i,name in enumerate(['snps','sinapse']):vector(R/f'public/si-v2/logos/{name}-solid-dark.svg',95,440-i*170,1020,145)
para('Cortes retos. Retornos seletivos. Ombros na diagonal. Uma massa com presença.',1270,620,540,39,font='Bold');para('9,38 traço / 46,90 altura / 4,69 retorno / 9,38 ombro / 2,54 interior: unidades do lettering original.',1270,350,540,28,muted);para('Os símbolos são desenhos novos; os mestres SNPS e SINAPSE permanecem intactos.',1270,180,540,26,muted)
for item in study['symbols']:
 page(item['name'],light=item['id']=='sintese');light=item['id']=='sintese';symbol(item,95,215,680,light);text(item['letter']+' / '+item['name'],950,825,65,'Bold');para(item['thesis'],950,720,800,39)
 y=600
 for i,el in enumerate(item['elements']):
  row=y-i*170;text('0'+str(i+1),950,row,20,'Mono',muted);text(el['name'],1010,row,29,'Bold');para(el['meaning'],1010,row-43,750,24,muted)
 para('Ponto de decisão: '+item['tradeoff'],950,120,820,20,muted)
page('Redução');headline(['A silhueta precisa','funcionar pequena.'],size=90)
for row,item in enumerate(study['symbols']):
 y=510-row*155;text(item['letter']+' / '+item['name'],90,y+45,28,'Bold')
 for size,x in [(24,700),(32,890),(64,1080),(150,1400)]:symbol(item,x,y,size);text(str(size)+' px',x,y-40,19,'Mono',muted)
text('Tamanhos em unidades de apresentação; confira os pixels reais no laboratório web.',95,115,24,color=muted)
page('Aplicações',True);headline(['Símbolo e nome.','Uma mesma direção.'],size=90)
for i,d in enumerate(['si','school','house','growth']):
 y=520-i*105;symbol(study['symbols'][1],95,y,78,True);vector(R/f'public/si-v2/logos/snps-{d}-solid-light.svg',220,y,1400,78)
text('Simulação de uso da proposta B. Assinaturas sempre em uma única linha.',95,115,24,color=muted)
page('Decisão');headline(['Recomendo aprofundar','Síntese SN.'],size=90);para('É o caminho com parentesco mais direto com o lettering: S sugerido pelas aberturas opostas, N pela diagonal e uma ligação estrutural em um único corpo.',95,540,850,32);para('O N pode aparecer antes do S. Essa relação é a principal decisão de leitura, a revisar em contexto. Os conceitos não precisam ser decifrados todos de uma vez.',95,310,850,26,muted);symbol(study['symbols'][1],1190,220,570);para('Vetores e laboratório: /studio/symbol. Nenhum símbolo adotado automaticamente. Os materiais e a aplicação global seguem a direção escolhida.',95,125,950,24,muted)
c.save();doc=fitz.open(O/'SINAPSE-Estudo-de-Simbolo.pdf')
for pid,svg,rect in stamps:
 s=fitz.open(stream=svg,filetype='svg');p=fitz.open(stream=s.convert_to_pdf(),filetype='pdf');doc[pid].show_pdf_page(rect,p,0)
temp=O/'study-native.pdf';doc.save(temp,garbage=4,deflate=True);doc.close();temp.replace(O/'SINAPSE-Estudo-de-Simbolo.pdf');doc=fitz.open(O/'SINAPSE-Estudo-de-Simbolo.pdf')
thumbs=[]
for p in doc:
 pix=p.get_pixmap(matrix=fitz.Matrix(.25,.25));thumbs.append(Image.open(BytesIO(pix.tobytes('png'))).convert('RGB'))
sheet=Image.new('RGB',(1920,270*((len(thumbs)+3)//4)),'#333')
for i,im in enumerate(thumbs):sheet.paste(im,((i%4)*480,(i//4)*270))
sheet.save(Q/'pdf-contact.jpg',quality=94)
report={'pages':len(doc),'native_characters':sum(len(p.get_text()) for p in doc),'dimensions':[W,H],'text_bounds_errors':errors,'embedded_fonts':sorted(set(f[3] for p in doc for f in p.get_fonts())),'vector_symbols':True}
(R/'qa/symbol-study-pdf.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8');assert not errors,errors
files=list(O.glob('*.svg'))+[O/'study.json',O/'SINAPSE-Estudo-de-Simbolo.pdf'];manifest={'status':'exploration_for_review','files':[{'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in files]};(O/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf8')
with zipfile.ZipFile(O/'SINAPSE-Simbolos-Estudo.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in files+[O/'manifest.json']:z.write(p,'SINAPSE-Simbolos-Estudo/'+p.name)
with zipfile.ZipFile(O/'SINAPSE-Simbolos-Estudo.zip') as z:assert z.testzip() is None
print(report)
