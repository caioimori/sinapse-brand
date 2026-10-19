"""Synchronize the current edition without treating historical QA as live evidence."""
from pathlib import Path
import json,hashlib,runpy
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2'
def read(n):return json.loads((R/n).read_text(encoding='utf8'))
def save(n,v):(R/n).write_text(json.dumps(v,ensure_ascii=False,indent=2),encoding='utf8',newline='\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
system=read('brand-system.json');system['version']='8.0-proposal'
system['identity']['symbol'].update({'variants':['circle','free'],'standalone_contour':'public/si-v2/symbol-free/source.json','standalone_rule':'Exact inner S contour from selected circle symbol, positive fill; no redraw.'})
for font in system['identity']['fonts']:
    if 'sha256' in font:font['sha256']=sha(R/font['file'])
system['identity']['display_font_revision']={'version':'1.300','changed':'R/r and accented R only; diagonal starts at upper edge of bowl beam, square connected root. Original master letters and advances unchanged.'}
system['creative_direction']['iteration']='Visual edition 08; connected R; circle and standalone S; profile, feed, highlights and individual post sequences.'
system['creative_direction']['apparel'].update({'data':'data/si/wear-v9.json','front':'Small existing S, circle or standalone','photos':'six circle sheets plus six standalone sheets / 48 garment views; generated concepts','provenance':['public/si-v2/wear-v8/provenance.json','public/si-v2/wear-v9/provenance.json']})
system['creative_direction']['social']={'data':'data/si/social-v9.json','posts':9,'carousels':3,'carousel_frames':5,'highlights':5,'highlight_frames':4,'avatars':2,'status':'editorial proposal, not applied to Instagram'}
system['transition'].update({'changed':['R continuity / SNPS Display 1.300','Exact standalone S from selected circle mark','Two front-mark variants for all 12 garments','Profile, 9 posts, 5 highlights, 2 avatars','53-page visual book / responsive layout and interactive sequences'],'rollout':['review new editorial and applications','authorize production publication separately','validate physical garment samples'],'recovery':'bbc6e6c preserves edition 07; original SNPS/SINAPSE masters unchanged.'});save('brand-system.json',system)
brief=read('brief.json');brief['objective']='Corrigir a perna do R, criar o mesmo S sem círculo e aprimorar a formatação do brandbook com apresentação visual de perfil, feed, destaques e posts. Preservar preto/branco, mestres e decisões de roupa; preparar arquivos para revisão e futura publicação.';save('brief.json',brief)
digital=read('digital-product.json');digital['implementation_status']='implemented_local_preview_v8';digital['handoff']=['fontes e vetores','kit e PDF 08','sistema social 08','PR #11 e prévia local'];save('digital-product.json',digital)
book=read('roteiro-brandbook.json');book.update({'file':'public/si-v2/SINAPSE-SI-Brandbook-08.pdf','source':'scripts/build-si-v9-book.py','chapters':read('data/si/book-v9.json')});save('roteiro-brandbook.json',book)
decisions=read('decisions.json');decisions['decisions']=[d for d in decisions['decisions'] if d['id']!='SI-V9']+[{'id':'SI-V9','status':'user_direction_implemented_pending_review','decision':'R originates in upper edge of bowl beam; other glyphs preserved. Existing S circular remains and exact inner contour is also available standalone. All 12 garments have both versions, front/back, with back SVGs preserved. Edition 08: 53 visual pages; 9 posts with 3 five-frame carousels; 5 four-frame highlights and 2 avatars. Proposed editorial, no Instagram or production publication. Current browser evidence in docs/SINAPSE-SI-V9-QA.md supersedes the prior connection limitation.'}];save('decisions.json',decisions)
tokens=read('public/si-v2/tokens.json');tokens.update({'version':8,'symbol_sources':['symbol-circle/source.json','symbol-free/source.json'],'display_font_version':'1.300'});save('public/si-v2/tokens.json',tokens)
provenance=read('public/si-v2/asset-provenance.json');provenance['version']='8.0-proposal';provenance['revision_08']={'circle':'symbol-circle/source.json','standalone':'symbol-free/source.json','apparel_circle':'wear-v8/provenance.json','apparel_standalone':'wear-v9/provenance.json','social':'social-v9/social-system.json','font':'fonts/SNPSDisplay-spec.json','book':'SINAPSE-SI-Brandbook-08.pdf','original_wordmarks':'byte-preserved','browser_review':'docs/SINAPSE-SI-V9-QA.md'};save('public/si-v2/asset-provenance.json',provenance)
files=runpy.run_path(str(R/'scripts/package-si-v9.py'))['current_files']();assets=[]
for p in files:
    if p.suffix not in ['.svg','.webp','.png','.pdf']:continue
    rel=p.relative_to(O).as_posix();role='brandbook-pdf' if p.name=='SINAPSE-SI-Brandbook-08.pdf' else 'social-slide' if p.parent.name in ['templates','social-v9'] else 'identity-variant' if p.parent.name in ['logos','symbol-circle','symbol-free'] else 'brand-expression'
    assets.append({'id':'v9-'+rel.replace('/','-'),'file':p.relative_to(R).as_posix(),'kind':'pdf' if p.suffix=='.pdf' else 'image','role':role,'sha256':sha(p),'status':'proposed'})
for n in ['snps-lockup','sinapse-wordmark']:
    p=R/f'public/brand/logo/bone/{n}.svg';assets.append({'id':n+'-master','file':p.relative_to(R).as_posix(),'kind':'image','role':'identity-master','sha256':sha(p),'status':'preserved'})
assets.append({'id':'brandbook-site','file':'app/book/page.tsx','kind':'source','role':'brandbook-site','sha256':sha(R/'app/book/page.tsx'),'status':'implemented_local'})
manifest=read('asset-manifest.json');manifest['assets']=assets
for s in manifest['sequences']:s['id']=s['id'].replace('v8','v9');s['asset_ids']=[i.replace('v8-','v9-') for i in s['asset_ids']]
manifest['sequences']=[s for s in manifest['sequences'] if not s['id'].startswith('social-v9-')]
social=read('data/si/social-v9.json')
for deck in social['posts'][:3]+social['highlights']:
    manifest['sequences'].append({'id':'social-v9-'+deck['id'],'kind':'story' if deck in social['highlights'] else 'carousel','minimum_frames':len(deck['frames']),'asset_ids':['v9-'+f['svg'].replace('/si-v2/','').replace('/','-') for f in deck['frames']],'product_ids':[],'character_ids':[],'comparison':False})
manifest['visual_review']={'status':'recorded','evidence':['qa/v9-fidelity-check.json','qa/v9-pdf-native-check.json','qa/v9-contact-sheet.jpg','qa/v9-browser-check.json','docs/SINAPSE-SI-V9-QA.md'],'asset_hashes':{a['id']:a['sha256'] for a in assets if a['kind'] in ['image','pdf']},'scope':'Current PDF and generated assets inspected. Responsive web, theme, navigation and export checks recorded in current QA; historical QA is not inherited as current evidence.','browser_status':'reviewed_current_local_preview'};save('asset-manifest.json',manifest)
print('Edition 08 manifests synchronized.')
