from pathlib import Path
import json,hashlib
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def read(n):return json.loads((R/n).read_text(encoding='utf8'))
def save(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
system=read('brand-system.json');system['version']='5.0-proposal';system['stage']='art_direction_for_review'
system['creative_direction'].update({'name':'Sinal contínuo','iteration':'Horizontal signatures only, including SNPS SI; revised K J F W Z; passage replaces isolated house symbol; 12 new minimal apparel concepts.','preserved':['SNPS original master','complete SINAPSE original master','black and white','accepted opening and dimension gradient','accepted glass/silver/solid studies'],'grammar':['square open terminals','4.69 circular returns','9.38 N outer shoulder','2.54 N inner return'],'references':'data/si/reference-atlas.json'})
system['identity']['variants']=[{'id':p.stem,'file':str(p.relative_to(R)).replace('\\','/'),'status':'proposed'} for p in sorted((O/'logos').glob('*.svg'))]
for font in system['identity']['fonts']:font['sha256']=sha(R/font['file'])
system['identity']['signature_rule']='One horizontal line; descriptor shares cap line and baseline, never below. Complete original prefix retained; word gap 33.28 source units.'
system['identity']['display_font_spec']='public/si-v2/fonts/SNPSDisplay-spec.json';system['identity']['icons']='Signals 04 / 12 SVGs'
system['editorial']['families']=read('public/si-v2/brand-data.json')['editorialFamilies'];system['transition'].update({'changed':['horizontal signatures and SNPS SI','K J F W Z optical revision','passage graphic','12 minimal apparel concepts','60-page book'],'rollout':['revisar edição 05','validar palavras críticas e protótipos','aplicar por canal autorizado'],'recovery':'fd288e8 preserves revision 04; original logo files unchanged.'});save('brand-system.json',system)
brief=read('brief.json');brief['objective']='Ajustar as assinaturas para uma linha, incluir SNPS SI, corrigir K J F W Z, substituir o símbolo entre ideia e ação e ampliar a coleção com estampas minimalistas de maior presença.';brief['constraints']['preserve']=['SNPS original','SINAPSE original completo','preto e branco','Dark First + Light Mode'];save('brief.json',brief)
digital=read('digital-product.json');digital['implementation_status']='implemented_local_preview_v5';save('digital-product.json',digital)
editorial=read('editorial.json');editorial['families']=system['editorial']['families'];editorial['status']='revision_05';save('editorial.json',editorial)
corporate=read('corporate-brand.json');corporate['transition']=system['transition']['rollout'];save('corporate-brand.json',corporate)
book=read('roteiro-brandbook.json');book['format']['slide_count']=60;book['file']='public/si-v2/SINAPSE-SI-Brandbook-05.pdf';book['source']='scripts/build-si-v5-book.py';book['chapters']=read('data/si/book-v5.json');save('roteiro-brandbook.json',book)
decisions=read('decisions.json');decisions['decisions']=[d for d in decisions['decisions'] if d['id']!='SI-V5']+[{'id':'SI-V5','status':'awaiting_review','decision':'User requires a single horizontal line for every descriptor. SNPS SI added. K J F W Z redrawn; H unchanged. Passage replaces house symbol. Collection 02 contains 8 tees and 4 hoodies with exact SVG print masters and generated photographic concepts.'}];save('decisions.json',decisions)
provenance=read('public/si-v2/asset-provenance.json');provenance['version']='5.0-proposal';provenance['font']='SNPS Display 1.200, selective terminal/return/shoulder/inner-return roles. Six recovered letters; extensions proposed for review.'
for entry in provenance.get('revision_05',[]):entry['sha256']=sha(O/entry['asset'])
save('public/si-v2/asset-provenance.json',provenance)
materials=read('data/si/materials.json');materials['revision']=5;save('data/si/materials.json',materials);save('public/si-v2/materials/system.json',materials)
tokens=read('public/si-v2/tokens.json');tokens['version']=5;tokens['graphic_grammar']=['layered S for editorial flow','two parallel passage rails','square terminals'];save('public/si-v2/tokens.json',tokens)
manifest=read('asset-manifest.json');assets=[]
for p in sorted(O.rglob('*')):
    if not p.is_file() or any(part in ['book','book-v4'] for part in p.relative_to(O).parts) or p.name in ['wear.webp','tee.webp','hoodie.webp','ooh.webp','signal-sculpture.webp','SINAPSE-SI-Brandbook-02.pdf','SINAPSE-SI-Brandbook-03.pdf','SINAPSE-SI-Brandbook-04.pdf'] or p.suffix not in ['.svg','.webp','.png','.pdf'] or (p.suffix=='.png' and p.parent.name!='materials'):continue
    role='brandbook-pdf' if p.suffix=='.pdf' else 'social-slide' if p.parent.name=='templates' else 'identity-variant' if p.parent.name=='logos' else 'brand-expression'
    assets.append({'id':'v5-'+str(p.relative_to(O)).replace('\\','-').replace('/','-'),'file':str(p.relative_to(R)).replace('\\','/'),'kind':'pdf' if p.suffix=='.pdf' else 'image','role':role,'sha256':sha(p),'status':'proposed'})
for name in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{name}.svg';assets.append({'id':name+'-master','file':str(p.relative_to(R)).replace('\\','/'),'kind':'image','role':'identity-master','sha256':sha(p),'status':'preserved'})
assets.append({'id':'brandbook-site','file':'app/page.tsx','kind':'source','role':'brandbook-site','sha256':sha(R/'app/page.tsx'),'status':'implemented_local'})
manifest['assets']=assets;manifest['sequences']=[{'id':'T04-v5','kind':'story','minimum_frames':6,'asset_ids':[f'v5-templates-t04-story-{i}.svg' for i in range(1,7)],'product_ids':[],'character_ids':[],'comparison':False},{'id':'Caderno-v5','kind':'carousel','minimum_frames':10,'asset_ids':[f'v5-templates-caderno-{i}.svg' for i in range(1,11)],'product_ids':[],'character_ids':[],'comparison':False}]
manifest['visual_review']={'status':'recorded','evidence':['qa/v5-browser-check.json','qa/v5-pdf-native-check.json','qa/v5-contact-sheet.jpg','docs/SINAPSE-SI-V5-QA.md'],'asset_hashes':{a['id']:a['sha256'] for a in assets if a['kind'] in ['image','pdf']},'scope':'Responsive review of identity, font revision, collection filter and print dialog, book and changed application regions. Native PDF bounds and photographic concepts inspected. No fabrication or publication approval.'};save('asset-manifest.json',manifest)
print('Revision 05 manifests synchronized.')
