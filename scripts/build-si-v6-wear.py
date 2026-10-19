"""Collection 03: original AI phrases in licensed editorial type, native print curves."""
from pathlib import Path
from io import BytesIO
import json,subprocess,xml.etree.ElementTree as ET
import fitz
from PIL import Image,ImageOps,ImageDraw
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/wear-v6';Q=R/'qa-local/v6';Q.mkdir(exist_ok=True,parents=True)
fonts={k:TTFont(O/'fonts'/f'{k}.ttf') for k in ['Editorial','Hand','Condensed','Club']};fonts['Micro']=TTFont(R/'public/si-v2/fonts/Manrope-Semibold.ttf')
# id, name, garment, side, print family, phrase, lines (text, baseline, size, font)
specs=[
 ('01','In Public','Camiseta preta','costas','Editorial',"If you see me in public, it’s AI.", [('If you see me',210,155,'Editorial'),('in public,',405,210,'Editorial'),('it’s AI.',655,255,'Hand')]),
 ('02','Superintelligence','Camiseta branca','frente','Editorial','Superintelligence',[('Super',310,265,'Editorial'),('intelligence',535,205,'Editorial')]),
 ('03','Human by Nature','Camiseta branca','costas','Condensed','HUMAN BY NATURE. AUGMENTED BY AI.', [('HUMAN BY',210,180,'Condensed'),('NATURE.',415,210,'Condensed'),('AUGMENTED BY AI.',590,108,'Condensed')]),
 ('04','Born Curious','Camiseta preta','costas','Hand','Born curious. Built different.', [('Born curious.',305,235,'Hand'),('Built different.',550,220,'Hand')]),
 ('05','Real Imagination','Camiseta branca','costas','Editorial','Artificial intelligence. Real imagination.', [('Artificial',220,195,'Editorial'),('intelligence.',405,180,'Editorial'),('Real imagination.',610,150,'Hand')]),
 ('06','Offline','Camiseta preta','frente','Hand','Off-line. Still thinking.', [('Off-line.',300,280,'Hand'),('Still thinking.',535,210,'Hand')]),
 ('07','Do Not Disturb','Camiseta preta','costas','Condensed','DO NOT DISTURB. I’M PROMPTING.', [('DO NOT',200,210,'Condensed'),('DISTURB.',430,210,'Condensed'),('I’M PROMPTING.',610,125,'Condensed')]),
 ('08','Practice','Camiseta branca','costas','Club','The future is a practice.', [('The future',265,175,'Club'),('is a practice.',490,165,'Club')]),
 ('09','Superintelligence Club','Moletom preto','frente','Club','Superintelligence Social Club', [('Superintelligence',305,125,'Club'),('Social Club',525,180,'Club')]),
 ('10','In Public Hoodie','Moletom branco','costas','Editorial',"If you see me in public, it’s AI.", [('If you see me',220,155,'Editorial'),('in public,',410,200,'Editorial'),('it’s AI.',650,250,'Hand')]),
 ('11','Still Human','Moletom preto','costas','Hand','Still human.', [('Still',290,300,'Hand'),('human.',570,300,'Hand')]),
 ('12','More Capable','Moletom branco','costas','Club','More human. More capable.', [('More human.',290,170,'Club'),('More capable.',520,165,'Club')])
]
def letters(value,y,size,family,fill,maxwidth=1080):
 f=fonts[family];gs=f.getGlyphSet();cm=f.getBestCmap();u=f['head'].unitsPerEm
 total=sum(gs[cm[ord(ch)]].width for ch in value)*size/u;size=min(size,size*maxwidth/max(total,1));advance=sum(gs[cm[ord(ch)]].width for ch in value)*size/u;x=(1200-advance)/2;paths=[]
 for ch in value:
  glyph=gs[cm[ord(ch)]];pen=SVGPathPen(gs);glyph.draw(TransformPen(pen,(size/u,0,0,-size/u,x,y)));x+=glyph.width*size/u
  if pen.getCommands():paths.append(f'<path d="{pen.getCommands()}"/>')
 return f'<g fill="{fill}">'+''.join(paths)+'</g>'
def mark(theme,x,y,width=240):
 root=ET.parse(R/f'public/si-v2/logos/snps-solid-{theme}.svg').getroot();vx,vy,vw,vh=map(float,root.get('viewBox').split());body=''.join(ET.tostring(el,encoding='unicode') for el in root if el.tag.split('}')[-1] not in ['title','defs'])
 return f'<g transform="translate({x} {y}) scale({width/vw}) translate({-vx} {-vy})">{body}</g>'
items=[]
for n,name,piece,side,family,phrase,lines in specs:
 theme='dark' if 'preto' in piece or 'preta' in piece else 'light';fill='#f5f5f5' if theme=='dark' else '#111111'
 body=''.join(letters(v,y,size,font,fill) for v,y,size,font in lines)+mark(theme,480,790)
 body+=letters('SUPER INTELLIGENCE / SINAPSE',910,23,'Micro',fill,700)
 svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1000" viewBox="0 0 1200 1000"><title>{name} / estampa original</title>{body}</svg>'
 # Tight native print boundary. No cloth or rectangular background is baked in.
 doc=fitz.open(stream=svg.encode(),filetype='svg');pdf=fitz.open(stream=doc.convert_to_pdf(),filetype='pdf');bounds=fitz.Rect()
 for path in pdf[0].get_drawings():bounds|=path['rect']
 bounds+=(-28,-28,28,28);node=ET.fromstring(svg);node.set('viewBox',f'{bounds.x0} {bounds.y0} {bounds.width} {bounds.height}');node.set('width',str(bounds.width));node.set('height',str(bounds.height));path=O/f'print-{n}.svg';path.write_text(ET.tostring(node,encoding='unicode')+'\n',encoding='utf8',newline='\n')
 items.append({'id':n,'name':name,'piece':piece,'side':side,'note':phrase,'phrase':phrase,'family':family,'group':(int(n)-1)//2+1,'print':f'/si-v2/wear-v6/print-{n}.svg','theme':theme,'reference':'https://nude-project.com/collections/t-shirts' if int(n)<=8 else 'https://nude-project.com/collections/hoodies','status':'concept_for_review'})
(O/'collection.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf8');(R/'data/si/wear-v6.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
for group in range(1,7):
 body=''
 for i,item in enumerate(p for p in items if p['group']==group):
  bg='#0a0a0a' if item['theme']=='dark' else '#f5f5f5';node=ET.parse(R/'public'/item['print'].lstrip('/')).getroot();vx,vy,vw,vh=map(float,node.get('viewBox').split());scale=min(1000/vw,820/vh);x=i*1200+(1200-vw*scale)/2;y=120+(840-vh*scale)/2
  body+=f'<rect x="{i*1200}" width="1200" height="1080" fill="{bg}"/><g transform="translate({x} {y}) scale({scale}) translate({-vx} {-vy})">'+''.join(ET.tostring(el,encoding='unicode') for el in node if el.tag.split('}')[-1]!='title')+'</g>'
  fg='#aaa' if item['theme']=='dark' else '#555';body+=f'<text x="{i*1200+45}" y="55" fill="{fg}" font-family="Arial" font-size="22">{item["piece"]} / {item["side"]}</text>'
 (Q/f'wear-{group}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1080" viewBox="0 0 2400 1080">{body}</svg>',encoding='utf8')
subprocess.run(['node','-e',"const sharp=require('sharp');(async()=>{for(let n=1;n<=6;n++)await sharp('qa-local/v6/wear-'+n+'.svg').png().toFile('qa-local/v6/wear-'+n+'.png')})().catch(e=>{console.error(e);process.exitCode=1})"],cwd=R,check=True)
sheet=Image.new('RGB',(1500,1014),'#222')
for n in range(1,7):
 image=ImageOps.contain(Image.open(Q/f'wear-{n}.png').convert('RGB'),(750,338));sheet.paste(image,(((n-1)%2)*750,((n-1)//2)*338))
sheet.save(Q/'print-contact.jpg',quality=96)
print('12 new native prints; 4 licensed type families; 6 photo-reference boards.')
