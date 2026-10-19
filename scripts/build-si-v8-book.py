"""Visual edition 07: original masters, selected circle, materials and paired apparel."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
# Reuse the stable native-text / vector placement helpers; do not execute edition 06 pages.
helpers=(R/'scripts/build-si-v6-book.py').read_text(encoding='utf8').split("start('Sinal contínuo')")[0].replace('Brandbook-06','Brandbook-07').replace('GUIDELINES 06','GUIDELINES 07').replace('Edição 06','Edição 07')
exec(compile(helpers,'native-book-helpers','exec'))
c.setTitle('SINAPSE SI — Inteligência em forma / Edição 07')

def pair(item,x,y,w,h):
    # Canvas clipping selects a row. The generated image file remains unchanged.
    image=Image.open(R/('public'+item['photo']));rowh=image.height/2;scale=min(w/image.width,h/rowh);dw=image.width*scale;dh=rowh*scale;x+=(w-dw)/2;y+=(h-dh)/2
    c.saveState();clip=c.beginPath();clip.rect(x,y,dw,dh);c.clipPath(clip,stroke=0,fill=0)
    c.drawImage(ImageReader(image),x,y-(dh if item['photoRow']==0 else 0),width=dw,height=dh*2,mask='auto');c.restoreState()

start('Inteligência em forma');photo('visual-v8/circle-glass',500,100,1420,880,True);title_lines(['Inteligência.', 'Em forma.'],90,780,116);vector('logos/snps-si-solid-dark.svg',90,180,510,110)
start('O sinal');vector('symbol-circle/solid-dark.svg',1000,185,720,720);title_lines(['Um sinal', 'nosso.'],90,740,145);text('S CIRCULAR / VERSÃO FINA',95,180,22,muted,'JetBrains')
start('Contraste',light=True);vector('symbol-circle/solid-light.svg',480,150,960,770)
start('Dois originais');vector('logos/snps-solid-dark.svg',140,630,1640,230);vector('logos/sinapse-solid-dark.svg',140,280,1640,230)
start('Uma família',light=True)
for i,n in enumerate(['snps-si','sinapse-si','snps-school','sinapse-school','snps-house','sinapse-house','snps-growth','sinapse-growth']):
    vector('logos/'+n+'-solid-light.svg',90+i%2*900,780-i//2*185,810,105)
text('Uma linha. Mesma altura. Um espaço de uma altura de letra.',90,145,29,muted)
start('Espaço');vector('logos/snps-school-solid-dark.svg',200,460,1520,200);text('SNPS',210,290,28,muted,'JetBrains');text('1×',925,290,28,muted,'JetBrains');text('SCHOOL',1330,290,28,muted,'JetBrains');rule(210,365,1500);text('O conjunto respira. O complemento permanece ao lado.',210,175,30,muted)
start('Ritmo',light=True)
for row in range(3):
    for col in range(7):vector('symbol-circle/solid-light.svg',-60+col*310+(row%2)*155,160+row*270,215,215)
start('Vidro');photo('visual-v8/circle-glass',80,100,1760,850,True)
start('Prata',light=True);photo('visual-v8/circle-silver',80,100,1760,850,True)
start('Papel',light=True);photo('visual-v8/circle-paper',80,100,1760,850,True)
start('Lettering e vidro');photo('glass',90,120,1740,820,True)
start('Lettering e prata',light=True);photo('metal',90,120,1740,820,True)
start('Expressão');native_word('CRIAR',90,435,1740);text('A palavra também é imagem.',90,190,38,muted)
start('Alfabeto');vector('applications/type-alphabet.svg',90,110,1740,830)
start('As palavras');vector('applications/type-proof.svg',90,110,1740,830)
start('Campanha',light=True)
for i,n in enumerate(['poster-manifesto','poster-school','poster-house']):art(n,80+i*590,125,560,800)
start('Feed',light=True)
for i,n in enumerate(['poster-growth','poster-repertoire','poster-house','poster-manifesto','poster-school','story-invite']):art(n,90+(i%3)*580,130+(1-i//3)*405,550,370)
start('Stories')
templates=[out/'templates'/f't04-story-{i}.svg' for i in range(1,7)]
for i,p in enumerate(templates):vector('templates/'+p.name,50+i*312,160,280,700)
text('Abertura / contexto / construção / criação / aplicação / convite',90,125,22,muted)
start('Members',light=True);art('cover-foundations',90,390,1050,590);art('cover-build',790,100,1050,590)
start('Comunidade')
for i,n in enumerate(['avatar-si','avatar-t04','avatar-client']):art(n,90+i*590,230,550,550)
start('Papelaria',light=True);photo('stationery',80,100,1760,850,True)
start('Member 04',light=True);art('card-member',90,210,1740,660)
start('Ferramentas');title_lines(['O assunto', 'ganha cor.'],90,790,125)
for i,k in enumerate(['supabase','figma','obsidian','n8n','warp','hostinger','docker','vercel','github']):
    x=1070+i%3*260;y=700-i//3*245;vector('tools/'+k+'.svg',x,y,100,100);text(k,x,y-45,22,muted)
start('Movimento')
for i,(size,opacity) in enumerate([(220,.25),(340,.6),(470,1)]):
    c.saveState();c.setFillAlpha(opacity);vector('symbol-circle/solid-dark.svg',100+i*590,300,size,size);c.restoreState()
text('Foco',100,205,35);text('Percurso',690,205,35);text('Presença',1280,205,35);text('Pausa disponível na experiência digital.',100,140,24,muted)
wear=json.loads((R/'data/si/wear-v8.json').read_text(encoding='utf8'))
for p in wear:
    start(p['id']+' / '+p['name'],light=True);pair(p,510,105,1320,850)
    para(p['name'],90,805,380,58,font='Manrope-Semibold',leading=1.1);para(p['piece']+(' / regular' if p['fit']=='regular' else ''),95,565,340,26,muted)
    text('FRENTE',840,940,19,muted,'JetBrains');text('COSTAS',1450,940,19,muted,'JetBrains');para('S circular no peito. Frase + SNPS SI nas costas.',95,345,330,25,muted);text('MOCKUP GERADO / CONCEITO',95,150,15,muted,'JetBrains')
start('Olhares',light=True)
refs=json.loads((R/'data/si/reference-atlas.json').read_text(encoding='utf8'))
for i,k in enumerate(['oxa','buff','cirdia']):
    r=next(v for v in refs if v['key']==k);x=90+i*590;photo('reference-covers/'+k,x,370,550,500,True);text(r['name'],x,280,35,font='Manrope-Semibold');para(r['author'],x,220,500,19,muted);c.linkURL(r['url'],(x,200,x+550,880),relative=0)
text('Referências externas. Identidades e trabalhos dos autores indicados.',90,130,23,muted)
start('Preto e branco')
for i,col in enumerate(['#0a0a0a','#191919','#888888','#f5f5f5','#ffffff']):
    x=90+i*350;c.setFillColor(HexColor(col));c.setStrokeColor(HexColor('#666666'));c.rect(x,220,330,650,fill=1,stroke=1);text(col,x,155,23,muted,'JetBrains')
start('Origem e reprodução',light=True);vector('symbol-circle/solid-light.svg',1080,260,640,640);title_lines(['A forma tem', 'uma origem.'],90,810,92);para('S circular fino: Idv_SNPS.pdf, página 8. Contorno recuperado da imagem; o Bézier original não estava incorporado.',95,510,770,29,muted);para('Mestres SNPS e SINAPSE preservados. Mockups e materiais são estudos gerados; o SVG é a referência de desenho.',95,300,770,29,muted)
start('Continue a criar');vector('logos/snps-si-solid-dark.svg',90,660,1250,240);title_lines(['Uma marca viva.'],90,420,110);text('Vetores / fontes / templates / aplicações',95,220,32,muted);text('branding.sinapse.si / domínio pretendido',95,140,22,muted,'JetBrains')
c.save()
doc=fitz.open(out/'SINAPSE-SI-Brandbook-07.pdf')
for page_id,svg,rect in vector_stamps:
    source=fitz.open(stream=svg,filetype='svg');vp=fitz.open(stream=source.convert_to_pdf(),filetype='pdf');doc[page_id].show_pdf_page(rect,vp,0)
temp=out/'brandbook-07-native.pdf';doc.save(temp,garbage=4,deflate=True);doc.close();temp.replace(out/'SINAPSE-SI-Brandbook-07.pdf')
doc=fitz.open(out/'SINAPSE-SI-Brandbook-07.pdf');book=[];thumbs=[];targetdir=out/'book-v8';targetdir.mkdir(exist_ok=True)
for i,p in enumerate(doc):
    target=targetdir/f'page-{i+1:02}.webp';pix=p.get_pixmap(matrix=fitz.Matrix(.7,.7));im=Image.open(BytesIO(pix.tobytes('png'))).convert('RGB');im.save(target,'WEBP',quality=91);book.append({'title':page_names[i],'file':f'/si-v2/book-v8/{target.name}'});im.thumbnail((384,216));thumbs.append(im)
sheet=Image.new('RGB',(1920,216*((len(thumbs)+4)//5)),'#555555')
for i,t in enumerate(thumbs):sheet.paste(t,((i%5)*384,(i//5)*216))
sheet.save(qa/'v8-contact-sheet.jpg',quality=92)
(R/'data/si/book-v8.json').write_text(json.dumps(book,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
old=fitz.open(out/'SINAPSE-SI-Brandbook-06.pdf');report={'pages':len(doc),'dimensions':[W,H],'native_characters':sum(len(p.get_text()) for p in doc),'previous_native_characters':sum(len(p.get_text()) for p in old),'text_bounds_errors':overflow,'embedded_font_names':sorted(set(f[3] for p in doc for f in p.get_fonts())),'chapters':page_names,'reader_pages':len(book),'artwork':'Original masters and art in native curves. Native visible informational text. Generated photos; source-image circle contour. Twelve paired front/back garments.'}
(qa/'v8-pdf-native-check.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
print(json.dumps({'pages':len(doc),'native_characters':report['native_characters'],'previous_characters':report['previous_native_characters'],'bounds_errors':len(overflow)}))
if overflow:raise ValueError('Text outside PDF page')
