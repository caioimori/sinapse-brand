from pathlib import Path
import json,hashlib
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def read(n):return json.loads((R/n).read_text(encoding='utf8'))
def save(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
system=read('brand-system.json');system['version']='4.0-proposal';system['stage']='art_direction_for_review'
system['creative_direction'].update({'name':'Sinal contínuo','iteration':'199 published reference boards; selective corner grammar; editorial book rhythm; original application atlas and photographic concepts.','preserved':['SNPS original master','complete SINAPSE original master','black and white','accepted opening and dimension gradient','accepted glass/silver/solid studies'],'grammar':['square open terminals','4.69 circular returns','9.38 N outer shoulder','2.54 N inner return'],'references':'data/si/reference-atlas.json'})
system['identity']['variants']=[{'id':p.stem,'file':str(p.relative_to(R)).replace('\\','/'),'status':'proposed'} for p in sorted((O/'logos').glob('*.svg'))]
for font in system['identity']['fonts']:font['sha256']=sha(R/font['file'])
system['identity']['display_font_spec']='public/si-v2/fonts/SNPSDisplay-spec.json';system['identity']['icons']='Signals 04 / 12 SVGs'
system['editorial']['families']=read('public/si-v2/brand-data.json')['editorialFamilies'];system['transition'].update({'changed':['editorial direction','font extension corner roles','original master embedding','Signals 04 icons','application atlas','55-page book','photographic application studies'],'rollout':['revisar edição 04','validar palavras críticas e protótipos','aplicar por canal autorizado'],'recovery':'cfe9c41 preserves revision 03; original logos are unchanged.'});save('brand-system.json',system)
brief=read('brief.json');brief['objective']='Reestruturar a expressão e o brandbook a partir dos seis cases abertos por Caio, sobretudo OXA AI e Buff, preservando SNPS e SINAPSE originais. Corrigir a gramática de cantos e ampliar aplicações com direção artística própria.';brief['constraints']['preserve']=['SNPS original','SINAPSE original completo','preto e branco','Dark First + Light Mode'];save('brief.json',brief)
digital=read('digital-product.json');digital['implementation_status']='implemented_local_preview_v4';save('digital-product.json',digital)
editorial=read('editorial.json');editorial['families']=system['editorial']['families'];editorial['status']='revision_04';save('editorial.json',editorial)
corporate=read('corporate-brand.json');corporate['transition']=system['transition']['rollout'];save('corporate-brand.json',corporate)
book=read('roteiro-brandbook.json');book['format']['slide_count']=55;book['file']='public/si-v2/SINAPSE-SI-Brandbook-04.pdf';book['source']='scripts/build-si-v4-book.py';book['chapters']=read('data/si/book-v4.json');save('roteiro-brandbook.json',book)
decisions=read('decisions.json');decisions['decisions']=[d for d in decisions['decisions'] if d['id']!='SI-V4']+[{'id':'SI-V4','status':'awaiting_review','decision':'Sinal contínuo: both original masters preserved, font 1.100 with selective corner grammar, six-case atlas, 55-page book, 16 application/anatomy compositions, 49 templates and 12 Signals 04 icons.'}];save('decisions.json',decisions)
provenance=read('public/si-v2/asset-provenance.json');provenance['version']='4.0-proposal';provenance['font']='SNPS Display 1.100, selective terminal/return/shoulder/inner-return roles. Six recovered letters; extensions proposed for review.'
for entry in provenance.get('revision_04',[]):entry['sha256']=sha(O/entry['asset'])
save('public/si-v2/asset-provenance.json',provenance)
materials=read('data/si/materials.json');materials['revision']=4;save('data/si/materials.json',materials);save('public/si-v2/materials/system.json',materials)
tokens=read('public/si-v2/tokens.json');tokens['version']=4;tokens['graphic_grammar']=['crop of S','layered S','optical ribbon'];save('public/si-v2/tokens.json',tokens)
manifest=read('asset-manifest.json');assets=[]
for p in sorted(O.rglob('*')):
    if not p.is_file() or 'book' in p.relative_to(O).parts or p.name in ['wear.webp','SINAPSE-SI-Brandbook-02.pdf','SINAPSE-SI-Brandbook-03.pdf'] or p.suffix not in ['.svg','.webp','.png','.pdf'] or (p.suffix=='.png' and p.parent.name!='materials'):continue
    role='brandbook-pdf' if p.suffix=='.pdf' else 'social-slide' if p.parent.name=='templates' else 'identity-variant' if p.parent.name=='logos' else 'brand-expression'
    assets.append({'id':'v4-'+str(p.relative_to(O)).replace('\\','-').replace('/','-'),'file':str(p.relative_to(R)).replace('\\','/'),'kind':'pdf' if p.suffix=='.pdf' else 'image','role':role,'sha256':sha(p),'status':'proposed'})
for name in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{name}.svg';assets.append({'id':name+'-master','file':str(p.relative_to(R)).replace('\\','/'),'kind':'image','role':'identity-master','sha256':sha(p),'status':'preserved'})
assets.append({'id':'brandbook-site','file':'app/page.tsx','kind':'source','role':'brandbook-site','sha256':sha(R/'app/page.tsx'),'status':'implemented_local'})
manifest['assets']=assets;manifest['sequences']=[{'id':'T04-v4','kind':'story','minimum_frames':6,'asset_ids':[f'v4-templates-t04-story-{i}.svg' for i in range(1,7)],'product_ids':[],'character_ids':[],'comparison':False},{'id':'Caderno-v4','kind':'carousel','minimum_frames':10,'asset_ids':[f'v4-templates-caderno-{i}.svg' for i in range(1,11)],'product_ids':[],'character_ids':[],'comparison':False}]
manifest['visual_review']={'status':'recorded','evidence':['qa/v4-browser-check.json','qa/v4-pdf-native-check.json','qa/v4-contact-sheet.jpg','docs/SINAPSE-SI-V4-QA.md'],'asset_hashes':{a['id']:a['sha256'] for a in assets if a['kind'] in ['image','pdf']},'scope':'36 responsive browser samples, actual corner/filter/book state, full PDF contact sheet and enlarged selected pages, generated mockup inspection. No fabrication or publication approval.'};save('asset-manifest.json',manifest)
print('Revision 04 manifests synchronized.')
