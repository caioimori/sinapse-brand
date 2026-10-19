"""Synchronize only the current revision; keep historical evidence recoverable."""
from pathlib import Path
import json,hashlib,runpy
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def read(n):return json.loads((R/n).read_text(encoding='utf8'))
def save(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()

system=read('brand-system.json');system['version']='6.0-proposal'
system['identity']['signature_rule']='One horizontal line and shared cap line/baseline. Original prefix curves retained; descriptor gap 46.90 source units, equal to one cap height (previously 33.28).'
system['identity']['signature_spacing']=read('data/si/signatures.json')
system['creative_direction']['iteration']='Remove rejected graphic from current book and applications; open descriptor spacing by 41%; Collection 03 with editorial, handwritten, condensed and expressive serif prints.'
system['creative_direction']['apparel']={'collection':'03','pieces':12,'tees':8,'hoodies':4,'data':'data/si/wear-v6.json','fonts':'public/si-v2/wear-v6/fonts/sources.json','reference_urls':['https://nude-project.com/collections/t-shirts','https://nude-project.com/collections/hoodies','https://coinbaseshop.com/'],'exact_artwork':'SVG outlines; generated photographs are concept visualizations'}
system['transition']['changed']=['descriptor spacing 46.90 source units','rejected graphic removed from current book and applications','12 new apparel prints and six photographic concepts','current 60-page book and curated kit 06']
system['transition']['rollout']=['revisar edição 06','validar protótipos físicos','aplicar por canal autorizado'];system['transition']['recovery']='05ddeea preserves the previous revision; original logo masters unchanged.';save('brand-system.json',system)
brief=read('brief.json');brief['objective']='Retirar o grafismo entre ideia e ação, ampliar o espaço nas assinaturas horizontais e redesenhar camisetas e moletons com frases de IA, tipografia artística e referência em Nude Project e Coinbase Shop.';save('brief.json',brief)
digital=read('digital-product.json');digital['implementation_status']='implemented_local_preview_v6';save('digital-product.json',digital)
book=read('roteiro-brandbook.json');book.update({'file':'public/si-v2/SINAPSE-SI-Brandbook-06.pdf','source':'scripts/build-si-v6-book.py','chapters':read('data/si/book-v6.json')});save('roteiro-brandbook.json',book)
decisions=read('decisions.json');decisions['decisions']=[d for d in decisions['decisions'] if d['id']!='SI-V6']+[{'id':'SI-V6','status':'awaiting_review','decision':'Caio rejected the graphic between idea and action again. Removed from current PDF, reader and House poster. Horizontal descriptors now have one-cap-height gap. Collection 03 replaces 02 with 8 tees and 4 hoodies, varied typography and six realistic generated photographic concepts. No new symbol adopted.'}];save('decisions.json',decisions)
tokens=read('public/si-v2/tokens.json');tokens['version']=6;tokens['graphic_grammar']=['layered original lettering for editorial flow','square terminals','no new standalone symbol selected'];tokens['descriptor_gap_source_units']=46.9;save('public/si-v2/tokens.json',tokens)
provenance=read('public/si-v2/asset-provenance.json');provenance['version']='6.0-proposal';provenance['revision_06']={'apparel':'wear-v6/provenance.json','font_licenses':'wear-v6/fonts/sources.json','vector_generator':'scripts/build-si-v6-wear.py','signatures':'scripts/build-si-v6-signatures.py','descriptor_spacing':'46.90 source units; original logo paths unchanged','removed_from_current':'Passagem, old OOH with rejected graphic, Collection 02 and old PDFs','reference_urls':system['creative_direction']['apparel']['reference_urls']};save('public/si-v2/asset-provenance.json',provenance)
files=runpy.run_path(str(R/'scripts/package-si-v6.py'))['current_files']();assets=[]
for p in files:
    if p.suffix not in ['.svg','.webp','.png','.pdf']:continue
    role='brandbook-pdf' if p.suffix=='.pdf' else 'social-slide' if p.parent.name=='templates' else 'identity-variant' if p.parent.name=='logos' else 'brand-expression'
    assets.append({'id':'v6-'+p.relative_to(O).as_posix().replace('/','-'),'file':p.relative_to(R).as_posix(),'kind':'pdf' if p.suffix=='.pdf' else 'image','role':role,'sha256':sha(p),'status':'proposed'})
for name in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{name}.svg';assets.append({'id':name+'-master','file':p.relative_to(R).as_posix(),'kind':'image','role':'identity-master','sha256':sha(p),'status':'preserved'})
assets.append({'id':'brandbook-site','file':'app/page.tsx','kind':'source','role':'brandbook-site','sha256':sha(R/'app/page.tsx'),'status':'implemented_local'})
manifest=read('asset-manifest.json');manifest['assets']=assets
for sequence in manifest['sequences']:
    sequence['id']=sequence['id'].replace('v5','v6');sequence['asset_ids']=[i.replace('v5-','v6-') for i in sequence['asset_ids']]
manifest['visual_review']={'status':'recorded','evidence':['qa/v6-browser-check.json','qa/v6-pdf-native-check.json','qa/v6-contact-sheet.jpg','docs/SINAPSE-SI-V6-QA.md'],'asset_hashes':{a['id']:a['sha256'] for a in assets if a['kind'] in ['image','pdf']},'scope':'Changed descriptor signatures and wear collection reviewed at 320, 390, 768 and 1440px plus affected breakpoints; dark/light, filters, SVG inspection dialog, current book pages and generated photos reviewed. Unchanged assets retain prior QA. No physical production or publication approval.'};save('asset-manifest.json',manifest)
print('Current revision 06 manifests synchronized.')
