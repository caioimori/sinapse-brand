"""Current visual revision; never import historical approval/QA as current browser proof."""
from pathlib import Path
import json,hashlib,runpy
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def read(n):return json.loads((R/n).read_text(encoding='utf8'))
def save(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
system=read('brand-system.json');system['version']='7.0-proposal';system['identity']['symbol']={'name':'S circular fino','source':'Idv_SNPS.pdf / page 8','contour':'public/si-v2/symbol-circle/source.json','status':'user-selected existing symbol','limit':'Raster contour recovery; original Bezier unavailable'}
system['creative_direction']['iteration']='Visual brandbook; selected thin circle S; front/back apparel pairing; minimal front mark and back phrases.'
apparel=system['creative_direction']['apparel'];apparel.update({'collection':'04','data':'data/si/wear-v8.json','fonts':'public/si-v2/wear-v8/fonts/sources.json','front':'Small thin circle S only','back':'Phrase and SNPS SI','photos':'six photographic sheets / 24 garment views','approved_type':'Caveat'})
system['transition'].update({'changed':['Visual edition 07','Selected page-8 thin circle S','All 12 garments with front/back views','Small front symbol; back phrases','Circle glass/silver/paper material studies'],'rollout':['inspect responsive browser when connection is restored','review visual proposal','validate physical samples'],'recovery':'bb713a2 preserves prior revision; original wordmark masters unchanged.'});save('brand-system.json',system)
brief=read('brief.json');brief['objective']='Transformar o brandbook em apresentação predominantemente visual e artística; mostrar frente e costas de cada peça, com logo simples na frente e frase atrás; adotar o S circular fino existente enviado por Caio, mantendo preto e branco.';save('brief.json',brief)
digital=read('digital-product.json');digital['implementation_status']='implemented_local_preview_v7_browser_review_pending';save('digital-product.json',digital)
book=read('roteiro-brandbook.json');book.update({'file':'public/si-v2/SINAPSE-SI-Brandbook-07.pdf','source':'scripts/build-si-v8-book.py','chapters':read('data/si/book-v8.json')});save('roteiro-brandbook.json',book)
decisions=read('decisions.json')
for d in decisions['decisions']:
    if d['id']=='SI-SOURCE-LETTER-STUDY':d['status']='superseded';d['decision']+=' Superseded by the user-selected thin circle S from the original document.'
decisions['decisions']=[d for d in decisions['decisions'] if d['id']!='SI-V8']+[{'id':'SI-V8','status':'user_direction_implemented_pending_review','decision':'Keep existing thin S in a circle from Idv_SNPS.pdf page 8. Visual edition 07 replaces text-heavy presentation; 40 pages. Every apparel piece shows front and back: front simple circle mark, back phrase and SNPS SI. Regular tees and approved Caveat retained. Source PDF is raster-only; contour recovered, not native Bezier. Browser inspection remains pending due URL policy / user-reported connection refusal.'}];save('decisions.json',decisions)
tokens=read('public/si-v2/tokens.json');tokens['version']=7;tokens['graphic_grammar']=['existing thin circle S from supplied identity','layered original lettering','square terminals and selective curves'];tokens['symbol_source']='symbol-circle/source.json';save('public/si-v2/tokens.json',tokens)
provenance=read('public/si-v2/asset-provenance.json');provenance['version']='7.0-proposal';provenance['revision_07']={'symbol':'symbol-circle/source.json','apparel':'wear-v8/provenance.json','material_photos':'visual-v8/provenance.json','fonts':'wear-v8/fonts/sources.json','book':'SINAPSE-SI-Brandbook-07.pdf','original_wordmarks':'byte-preserved','browser_review':'pending_connection'};save('public/si-v2/asset-provenance.json',provenance)
files=runpy.run_path(str(R/'scripts/package-si-v8.py'))['current_files']();assets=[]
for p in files:
    if p.suffix not in ['.svg','.webp','.png','.pdf']:continue
    role='brandbook-pdf' if p.name=='SINAPSE-SI-Brandbook-07.pdf' else 'social-slide' if p.parent.name=='templates' else 'identity-variant' if p.parent.name in ['logos','symbol-circle'] else 'brand-expression'
    assets.append({'id':'v8-'+p.relative_to(O).as_posix().replace('/','-'),'file':p.relative_to(R).as_posix(),'kind':'pdf' if p.suffix=='.pdf' else 'image','role':role,'sha256':sha(p),'status':'proposed'})
for n in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{n}.svg';assets.append({'id':n+'-master','file':p.relative_to(R).as_posix(),'kind':'image','role':'identity-master','sha256':sha(p),'status':'preserved'})
assets.append({'id':'brandbook-site','file':'app/book/page.tsx','kind':'source','role':'brandbook-site','sha256':sha(R/'app/book/page.tsx'),'status':'implemented_local_browser_pending'})
manifest=read('asset-manifest.json');manifest['assets']=assets
for s in manifest['sequences']:s['id']=s['id'].replace('v6','v8');s['asset_ids']=[i.replace('v6-','v8-') for i in s['asset_ids']]
manifest['visual_review']={'status':'recorded','evidence':['qa/v8-fidelity-check.json','qa/v8-pdf-native-check.json','qa/v8-contact-sheet.jpg','docs/SINAPSE-SI-V8-QA.md'],'asset_hashes':{a['id']:a['sha256'] for a in assets if a['kind'] in ['image','pdf']},'scope':'New symbol, nine generated photographs and visual PDF reviewed as local files. Unchanged assets retain previous review. Responsive web and interactions NOT verified: browser URL policy / user-reported connection refused.','browser_status':'pending_connection'};save('asset-manifest.json',manifest)
print('Edition 07 current manifests synchronized; browser limitation explicitly preserved.')
