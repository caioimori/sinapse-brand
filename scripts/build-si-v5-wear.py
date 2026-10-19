from pathlib import Path
import runpy,json,subprocess,requests
from PIL import Image,ImageDraw
R=Path.cwd();O=R/'public/si-v2';D=O/'wear';D.mkdir(exist_ok=True);Q=R/'qa-local/v5';Q.mkdir(exist_ok=True,parents=True)
h=runpy.run_path(str(R/'scripts/build-si-v4-assets.py'));txt=h['txt'];inline=h['inline'];logo=h['logo']
items=[
('01','Signal Back','Camiseta preta','costas','SNPS grande, centralizado na parte superior das costas.','snps',None),
('02','SI Essential','Camiseta branca','frente','SNPS SI pequeno no lado esquerdo do peito.','snps-si',None),
('03','Super Intelligence','Camiseta preta','costas','Duas palavras em grande escala, duas linhas e muito espaço.',None,'SUPER|INTELLIGENCE'),
('04','Signal White','Camiseta branca','costas','SNPS preto em grande escala, sem texto adicional.','snps',None),
('05','School Uniform','Camiseta preta','frente','SNPS SCHOOL em linha única atravessando o peito.','snps-school',None),
('06','House Uniform','Camiseta branca','frente','SNPS HOUSE em linha única atravessando o peito.','snps-house',None),
('07','Growth Uniform','Camiseta preta','frente','SNPS GROWTH em linha única atravessando o peito.','snps-growth',None),
('08','Create Next','Camiseta branca','costas','Três linhas curtas, alinhamento à esquerda, uma ideia.',None,"CREATE|WHAT’S|NEXT."),
('09','Signal Hoodie','Moletom preto','costas','SNPS grande acima da linha do bolso, costas limpas.','snps',None),
('10','Intelligence Hoodie','Moletom branco','costas','INTELLIGENCE em uma linha larga; SNPS SI pequeno no final.',None,'INTELLIGENCE'),
('11','SI Hoodie','Moletom preto','frente','SNPS SI central no peito, uma única linha.','snps-si',None),
('12','Learn Build Grow','Moletom branco','costas','LEARN. BUILD. GROW. em três linhas curtas.',None,'LEARN.|BUILD.|GROW.')]
result=[]
for n,title,piece,side,note,mark,copy in items:
    theme='dark' if 'preto' in piece or 'preta' in piece else 'light';fg='#f5f5f5' if theme=='dark' else '#111111';body=''
    if mark:body=inline(O/'logos'/f'{mark}-solid-{theme}.svg',50,60,1100,180)
    else:
        for i,line in enumerate(copy.split('|')):body+=txt(line,50,150+i*165,150,fg,'bold',1100)
        if n=='10':body+=inline(O/'logos/snps-si-solid-light.svg',800,300,330,55)
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700" viewBox="0 0 1200 700"><title>{title} / {side}</title>{body}</svg>'
    (D/f'print-{n}.svg').write_text(svg,encoding='utf8')
    result.append({'id':n,'name':title,'piece':piece,'side':side,'note':note,'group':(int(n)-1)//2+1,'print':f'/si-v2/wear/print-{n}.svg','theme':theme,'reference':'https://coinbaseshop.com/products/bitcoin-whitepaper-hoodie-light-mode' if int(n)>8 else 'https://coinbaseshop.com/products/coin-logo-tee'})
(O/'wear/collection.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8');(R/'data/si/wear-v5.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
for group in range(1,7):
    body=''
    for j,item in enumerate([i for i in result if i['group']==group]):
        bg='#0a0a0a' if item['theme']=='dark' else '#f5f5f5';fg='#fff' if item['theme']=='dark' else '#111'
        body+=f'<rect x="{j*1200}" width="1200" height="950" fill="{bg}"/>'+txt(item['piece'].upper()+' / '+item['side'].upper(),j*1200+50,80,30,fg,'mono')+inline(D/f'print-{item["id"]}.svg',j*1200,200,1200,700)
    s=f'<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="950" viewBox="0 0 2400 950">{body}</svg>';(Q/f'wear-{group}.svg').write_text(s,encoding='utf8')
subprocess.run(['node','-e',"const fs=require('fs'),sharp=require('sharp');(async()=>{for(let n=1;n<=6;n++)await sharp('qa-local/v5/wear-'+n+'.svg').png().toFile('qa-local/v5/wear-'+n+'.png');await sharp('public/si-v2/applications/passage.svg').png().toFile('qa-local/v5/passage.png');})()"],check=True)
# QA swatch uses the actual installed font, without modifying photography.
f=O/'fonts/SNPSDisplay-Regular.ttf';from PIL import ImageFont
im=Image.new('RGB',(1800,900),'#0a0a0a');d=ImageDraw.Draw(im)
for i,s in enumerate(['K J F W Z','WORK FLOW','JAZZ','SNPS SCHOOL']):
    size=140;face=ImageFont.truetype(str(f),size)
    while d.textlength(s,font=face)>1680:size-=2;face=ImageFont.truetype(str(f),size)
    d.text((60,45+i*205),s,font=face,fill='white')
im.save(Q/'font-revised.png')
print('12 print masters and 6 reference boards.')
# Export a tight transparent canvas: the whole file is the print, not a poster.
import fitz,xml.etree.ElementTree as ET
for path in D.glob('print-*.svg'):
    doc=fitz.open(stream=path.read_bytes(),filetype='svg');pdf=fitz.open(stream=doc.convert_to_pdf(),filetype='pdf');area=fitz.Rect()
    for drawing in pdf[0].get_drawings():area|=drawing['rect']
    area=area+(-24,-24,24,24);node=ET.fromstring(path.read_text(encoding='utf8'));node.set('viewBox',f'{area.x0} {area.y0} {area.width} {area.height}');node.set('width',str(area.width));node.set('height',str(area.height));path.write_text(ET.tostring(node,encoding='unicode'),encoding='utf8')
