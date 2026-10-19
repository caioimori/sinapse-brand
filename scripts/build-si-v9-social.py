"""Original social system: 9 posts, 3 five-frame carousels, 5 four-story highlights."""
from pathlib import Path
import json,base64,html,re,xml.etree.ElementTree as ET
ET.register_namespace("", "http://www.w3.org/2000/svg")
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2';D=O/'social-v9';D.mkdir(exist_ok=True)
# Native lettering helpers only. No historical application pages are executed.
source=(R/'scripts/build-si-v4-assets.py').read_text(encoding='utf8');exec(compile(source.split('def bridge')[0],'native-social-helpers','exec'))
def width(s,size=30,face='sans'):
    f=fonts[face];gs=f.getGlyphSet();cm=f.getBestCmap();return sum(gs[cm.get(ord(ch),'space')].width*size/f['head'].unitsPerEm for ch in s)
def lines(s,maxwidth,size,face='bold'):
    result=[];line=''
    for w in s.split():
        if line and width(line+' '+w,size,face)>maxwidth:result.append(line);line=w
        else:line=(line+' '+w).strip()
    if line:result.append(line)
    return result
def typeblock(s,x,y,size=92,maxwidth=900,fill='#f5f5f5',face='bold',leading=1.08):
    return ''.join(txt(line,x,y+i*size*leading,size,fill,face) for i,line in enumerate(lines(s,maxwidth,size,face)))
def img(name,x,y,w,h):
    p=O/(name+'.webp');buffer=BytesIO();Image.open(p).save(buffer,'PNG');data=base64.b64encode(buffer.getvalue()).decode();return f'<image x="{x}" y="{y}" width="{w}" height="{h}" preserveAspectRatio="xMidYMid slice" href="data:image/png;base64,{data}"/>'
def mark(kind,x,y,w,theme='dark'):
    p=O/f'symbol-{kind}/solid-{theme}.svg';n=ET.parse(p).getroot();vx,vy,vw,vh=map(float,n.get('viewBox').split());return inline(p,x,y,w,w*vh/vw)
def write(name,body,w=1080,h=1350,bg='#0a0a0a'):
    content=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}"><title>{html.escape(name)}</title><defs>{DEFS}<linearGradient id="silk" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3a3a3a"/><stop offset=".5" stop-color="#111111"/><stop offset="1" stop-color="#262626"/></linearGradient></defs><rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>'
    (D/f'{name}.svg').write_text(content,encoding='utf8',newline='\n');return {'svg':f'/si-v2/social-v9/{name}.svg','png':f'/si-v2/social-v9/{name}.png','preview':f'/si-v2/social-v9/{name}.webp'}
posts=[
 {'id':'autoria','name':'O futuro tem autoria','category':'Marca','layout':'glass','title':'O futuro tem autoria.','caption':'Ferramentas ampliam possibilidades. A direção continua sendo uma escolha humana.\n\nNa SINAPSE, aprender, construir e crescer fazem parte da mesma conversa. Conheça School, House e Growth em sinapse.si.','frames':[('O futuro tem autoria.','Uma inteligência para aprender, construir e crescer.'),('Começa em uma pergunta.','O que você quer conseguir fazer? O problema orienta o caminho.'),('Ganha forma na prática.','Uma aula, um projeto ou uma operação. Cada contexto pede uma construção.'),('Melhora quando é revisado.','Criar também é conferir, escolher e refazer o que importa.'),('Qual é a sua próxima ideia?','Conheça School, House e Growth em sinapse.si.')]},
 {'id':'school','name':'Aprender para criar','category':'School','layout':'paper','title':'Aprender muda o que você cria.','caption':'Repertório, contexto e prática. Aprender IA faz mais sentido quando você consegue aplicar o que estudou.\n\nConheça o percurso da SINAPSE School em sinapse.si/school.','frames':[('Aprender muda o que você cria.','SINAPSE School / IA aplicada'),('Construa repertório.','Entenda as possibilidades e os limites antes de escolher uma ferramenta.'),('Traga um problema seu.','Uma necessidade real dá direção ao que você vai experimentar.'),('Faça uma primeira versão.','Construa, confira o uso e volte ao que precisa melhorar.'),('Continue a aprender.','Conheça a School em sinapse.si/school.')]},
 {'id':'contexto','name':'Contexto antes do prompt','category':'Repertório','layout':'tools','title':'Contexto antes do prompt.','caption':'Uma ferramenta não conhece, por conta própria, tudo o que importa no seu trabalho.\n\nAntes do prompt, organize objetivo, fontes e limites. Depois, confira a resposta no contexto em que ela será usada.','frames':[('Contexto antes do prompt.','O repertório encontra a prática.'),('1. Diga o que precisa entregar.','Descreva o resultado e quem vai usar. Uma tarefa concreta ajuda a orientar a resposta.'),('2. Reúna as fontes certas.','Ofereça os documentos e exemplos que mudam a decisão. Preserve dados que não podem ser compartilhados.'),('3. Defina o que precisa ser conferido.','Formato, origem dos dados, restrições e critérios de qualidade devem estar explícitos.'),('A resposta é um começo.','Revise informação, contexto e uso antes de colocar o resultado para trabalhar.')]},
 {'id':'house','name':'Da ideia à primeira versão','category':'House','layout':'silver','title':'Da ideia à primeira versão.','caption':'Uma ideia ganha valor quando encontra uma experiência que alguém consegue usar.\n\nDescoberta, design, desenvolvimento e validação: conheça a SINAPSE House em sinapse.si/house.','frames':[('Da ideia à primeira versão.','SINAPSE House / software e experiências')]},
 {'id':'curiosidade','name':'Born curious','category':'Marca','layout':'wear','title':'Born curious. Built different.','caption':'Curiosidade também se veste.\n\nEstudo da coleção SINAPSE SI: frente discreta, ideia nas costas. Conceito em desenvolvimento, sem anúncio de venda.','frames':[('Born curious. Built different.','SINAPSE SI / estudo de coleção')]},
 {'id':'growth','name':'Crescer também é aprender','category':'Growth','layout':'growth','title':'Crescer também é aprender.','caption':'Estratégia, criação e dados precisam conversar ao longo da operação.\n\nA SINAPSE Growth conecta conteúdo, mídia, CRM e automação para e-commerce, vendas diretas e geração de leads. Conheça em sinapse.si/growth.','frames':[('Crescer também é aprender.','Estratégia. Criação. Dados. Continuidade.')]},
 {'id':'junto','name':'Inteligência em comum','category':'Marca','layout':'pattern','title':'Inteligência se constrói junto.','caption':'Uma boa pergunta abre caminhos. Uma troca amplia o repertório. Um projeto coloca o aprendizado em movimento.\n\nA SINAPSE conecta pessoas, conhecimento e construção.','frames':[('Inteligência se constrói junto.','Pessoas. Repertório. Construção.')]},
 {'id':'pergunta','name':'A próxima pergunta','category':'Repertório','layout':'type','title':'Uma pergunta melhor muda o caminho.','caption':'Antes de pedir uma resposta, vale voltar à pergunta. O que você sabe? O que precisa descobrir? O que mudaria a sua decisão?\n\nContexto e critério também fazem parte de trabalhar com IA.','frames':[('Uma pergunta melhor muda o caminho.','Contexto / critério / criação')]},
 {'id':'criar','name':'Humano na direção','category':'Marca','layout':'display','title':'CRIAR','caption':'Humano na direção. Inteligência em movimento.\n\nSINAPSE SI / Super Intelligence. Aprender, construir e crescer com intenção.','frames':[('CRIAR','Humano na direção. Inteligência em movimento.')]}
]
for post in posts:
    frames=[]
    for i,(title,body) in enumerate(post['frames']):
        light=post['layout'] in ['paper','growth'] if i==0 else i%2==1;fg='#111111' if light else '#f5f5f5';muted='#666666' if light else '#aaaaaa';theme='light' if light else 'dark';bg='#f5f5f5' if light else '#0a0a0a'
        head=logo('snps-'+('si' if post['category'] in ['Marca','Repertório'] else post['category'].lower()),65,65,400,theme)
        art=head+txt('SINAPSE / '+post['category'].upper(),68,210,20,muted,'mono')
        if i==0:
            layout=post['layout']
            if layout=='glass':art=img('visual-v8/circle-glass',180,570,1000,760)+head+typeblock(title,65,365,105)+txt('SUPER INTELLIGENCE',68,535,20,'#aaaaaa','mono')
            elif layout=='paper':art+=typeblock(title,65,370,100,880,fg)+mark('free',100,850,880,theme)
            elif layout=='tools':
                art+=typeblock(title,65,375,115,850)
                for j,k in enumerate(['supabase','figma','obsidian','n8n','warp','github']):art+=inline(O/f'tools/{k}.svg',85+j%3*330,820+j//3*180,80,80)+txt(k,85+j%3*330,930+j//3*180,20,muted)
            elif layout=='silver':art=img('metal',0,660,1080,620)+head+txt('SINAPSE HOUSE',68,220,20,muted,'mono')+typeblock(title,65,370,103)
            elif layout=='wear':
                # Clip an undistorted complete row; retain realistic front and back.
                art=img('wear-v9/sheet-2',0,-310,1080,1620)+f'<rect width="1080" height="540" fill="#0a0a0a"/>'+head+typeblock('Curiosidade também se veste.',65,290,78,940)+f'<rect y="1240" width="1080" height="110" fill="#0a0a0a"/>'+txt('COLLECTION / ESTUDO CONCEITUAL',65,1300,20,'#aaaaaa','mono')
            elif layout=='growth':
                art+=typeblock(title,65,365,106,900,fg)
                for j,s in enumerate(['Planejar','Construir','Analisar','Aprender']):art+=f'<line x1="70" y1="{800+j*105}" x2="1010" y2="{800+j*105}" stroke="#cccccc"/>'+txt('0'+str(j+1),70,860+j*105,24,muted,'mono')+txt(s,185,860+j*105,48,fg)
            elif layout=='pattern':
                for j in range(8):art+='<g opacity=".15">'+mark('free',-100+(j%2)*650,750+(j//2)*160,610,'dark')+'</g>'
                art+=typeblock(title,65,375,98)
            elif layout=='type':art+=f'<rect x="65" y="320" width="950" height="670" fill="url(#silk)" rx="45"/>'+typeblock(title,110,460,95,850)+txt('REPERTÓRIO / EM PRÁTICA',65,1220,20,muted,'mono')
            elif layout=='display':art+=f'<rect x="0" y="400" width="1080" height="650" fill="url(#light)"/>'+txt('CRIAR',65,760,120,'url(#metal)','display',950)+typeblock(body,65,1040,55,900)
        else:
            art+=txt(f'{i+1:02}',65,370,105,muted,'display')+typeblock(title,65,565,85,920,fg)+typeblock(body,70,895,37,900,muted,'sans',1.4)+mark('free',680,1170,320,theme)
        art+=txt(f'{i+1:02} / {len(post["frames"]):02}',840,120,20,muted,'mono')
        frame={'title':title,'body':body,**write(f'post-{post["id"]}-{i+1}',art,bg=bg)};frames.append(frame)
    post['frames']=frames;post['cover']=frames[0]['preview'];post['status']='proposed_not_published'

highlight_specs=[
 ('comece','Comece','SI','si',[('Uma inteligência para criar.','SINAPSE SI / Super Intelligence'),('Aprender. Construir. Crescer.','School, House e Growth: três caminhos que podem se complementar.'),('O contexto escolhe o caminho.','Uma aula, um produto ou uma operação. Comece pela necessidade real.'),('Qual é a sua próxima ideia?','Conheça o universo SINAPSE em sinapse.si.')]),
 ('school','School','SC','school',[('Aprender para criar.','Educação em inteligência artificial aplicada.'),('Repertório antes da ferramenta.','Entenda possibilidades, limites e contexto.'),('Prática que ganha forma.','Traga um problema, experimente e construa uma primeira versão.'),('Continue a aprender.','Conheça o percurso em sinapse.si/school.')]),
 ('house','House','HS','house',[('Da ideia à experiência.','Software, produtos e automações por projeto.'),('Começa em quem vai usar.','Descoberta e design para entender o problema.'),('Construir. Conferir. Evoluir.','Desenvolvimento e validação fazem parte do mesmo percurso.'),('Vamos construir?','Conheça a House em sinapse.si/house.')]),
 ('growth','Growth','GR','growth',[('Crescimento com continuidade.','Estratégia e operação aprendendo juntas.'),('Criação encontra dados.','Conteúdo, mídia, CRM e automação em contexto.'),('Negócios com caminhos diferentes.','E-commerce, vendas diretas e geração de leads.'),('Conheça a operação.','Explore a Growth em sinapse.si/growth.')]),
 ('repertorio','Repertório','IA','si',[('A ferramenta segue a tarefa.','Contexto, critério e prática.'),('Ideias precisam de desenho.','Figma / prototipação e experiência.'),('Conhecimento precisa de contexto.','Obsidian / organização e conexões.'),('Dados também fazem parte.','Supabase / persistência e aplicações.')])
]
highlights=[]
for key,name,short,division,frames in highlight_specs:
    cover=write('highlight-'+key,center(short,650,175,'url(#metal)','display'),1080,1080)
    deck=[]
    for i,(title,body) in enumerate(frames):
        light=i==2;theme='light' if light else 'dark';fg='#111111' if light else '#f5f5f5';muted='#666666' if light else '#aaaaaa';bg='#f5f5f5' if light else '#0a0a0a'
        art=logo('snps-'+division,70,240,500,theme)+txt(name.upper()+f' / {i+1:02}',75,475,24,muted,'mono')+typeblock(title,70,670,105,920,fg)+typeblock(body,75,1080,40,900,muted,'sans',1.4)+mark('free',580,1390,430,theme)+txt('sinapse.si',75,1660,26,muted,'mono')
        if i==0:
            art=logo('snps-'+division,70,240,500,theme)+txt(name.upper()+' / 01',75,475,24,muted,'mono')+typeblock(title,70,670,105,920,fg)+typeblock(body,75,1040,40,900,muted,'sans',1.4)
            if key in ['comece','school','house']:art+=img({'comece':'visual-v8/circle-glass','school':'glass','house':'metal'}[key],0,1170,1080,580)
            elif key=='growth':
                for j,word in enumerate(['Estratégia','Criação','Dados']):art+=f'<line x1="75" y1="{1230+j*155}" x2="1000" y2="{1230+j*155}" stroke="#444444"/>'+txt(word,75,1330+j*155,70)
            else:
                for j,k in enumerate(['figma','obsidian','supabase']):art+=inline(O/f'tools/{k}.svg',100+j*330,1320,190,190)
        if key=='repertorio' and i>0:art=logo('snps-si',70,240,500,theme)+txt(name.upper()+f' / {i+1:02}',75,475,24,muted,'mono')+typeblock(title,70,670,105,920,fg)+typeblock(body,75,1080,40,900,muted,'sans',1.4)+inline(O/f'tools/{["","figma","obsidian","supabase"][i]}.svg',370,1310,340,340)+txt('sinapse.si',75,1660,26,muted,'mono')
        deck.append({'title':title,'body':body,**write(f'story-{key}-{i+1}',art,h=1920,bg=bg)})
    highlights.append({'id':key,'name':name,'short':short,'cover':cover['preview'],'coverSvg':cover['svg'],'coverPng':cover['png'],'frames':deck})
avatars={}
for kind in ['circle','free']:
    art=mark(kind,200,200,680) if kind=='circle' else mark(kind,160,360,760)
    avatars[kind]=write('avatar-'+kind,art,1080,1080)
profile={'handle':'sinapse.si','name':'Sinapse SI · Super Intelligence','bio':['Educação, tecnologia e crescimento.','Aprenda. Construa. Cresça.','Conheça School, House e Growth.'],'url':'https://sinapse.si/','status':'proposed_not_published','stats':'Not supplied; no followers, likes or social proof fabricated.'}
data={'version':9,'date':'2026-10-19','profile':profile,'avatars':avatars,'posts':posts,'highlights':highlights,'formats':{'posts':[1080,1350],'stories':[1080,1920],'avatar':[1080,1080]},'sources':{'business':'data/si/brand.ts; existing user brief','identity':'original wordmarks; selected page-8 circle and its exact negative S','platform_note':'Design exports; profile is an interactive presentation, not a live Instagram account. Official Meta docs returned HTTP 429 during lookup; no claim of complete current platform-spec verification.'}}
(R/'data/si/social-v9.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8',newline='\n');(D/'social-system.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
(D/'legendas.md').write_text('\n\n'.join('## '+p['name']+'\n\n'+p['caption'] for p in posts),encoding='utf8',newline='\n')
def clip_inline(path,x,y,w,h,unique):
    node=ET.parse(path).getroot();vx,vy,vw,vh=map(float,node.get('viewBox').split());scale=min(w/vw,h/vh);body=''.join(ET.tostring(el,encoding='unicode') for el in node if el.tag.split('}')[-1]!='title')
    # Namespace gradients per embedded artwork; retain default SVG namespace for PDF conversion.
    ids=re.findall(r'id="([^"]+)"',body)
    for identifier in ids:body=body.replace(f'id="{identifier}"',f'id="{unique}-{identifier}"').replace(f'url(#{identifier})',f'url(#{unique}-{identifier})').replace(f'href="#{identifier}"',f'href="#{unique}-{identifier}"')
    return f'<g transform="translate({x} {y}) scale({scale})"><defs><clipPath id="{unique}"><rect width="{vw}" height="{vh}"/></clipPath></defs><g clip-path="url(#{unique})">{body}</g></g>'
profile_art=txt('@sinapse.si',100,160,45)+mark('circle',100,230,160)+txt('Sinapse SI',310,285,58,face='bold')+txt('Super Intelligence.',310,350,30,'#aaaaaa')
profile_art+=txt('Educação, tecnologia e crescimento.',100,485,32)+txt('Aprenda. Construa. Cresça.',100,540,32)+txt('School / House / Growth',100,625,25,'#aaaaaa','mono')+txt('sinapse.si',100,680,26,'#aaaaaa')
for i,h in enumerate(highlights):profile_art+=clip_inline(D/f'highlight-{h["id"]}.svg',90+i*132,790,110,110,'hl-'+h['id'])+txt(h['name'],95+i*132,940,17,'#aaaaaa')
for i,p in enumerate(posts):profile_art+=clip_inline(D/f'post-{p["id"]}-1.svg',850+i%3*330,40+i//3*340,250,312.5,'post-'+p['id'])
write('profile-sheet',profile_art,1920,1080)
single_art=typeblock('Cada post, uma ideia.',90,300,100,620)+txt('PUBLICAÇÕES / PROPOSTA EDITORIAL',95,915,19,'#aaaaaa','mono')
for i,p in enumerate(posts[3:]):single_art+=clip_inline(D/f'post-{p["id"]}-1.svg',780+i%3*370,90+i//3*460,320,400,'single-'+p['id'])
write('posts-sheet',single_art,1920,1080)
print('9 posts / 21 feed frames / 5 covers / 20 Stories / 2 avatars in native SVG.')
