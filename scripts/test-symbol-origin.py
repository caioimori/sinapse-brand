"""Check fidelity to the actual approved source, rather than a new drawing's own data."""
from pathlib import Path
from io import BytesIO
from collections import deque
import json, hashlib, subprocess, xml.etree.ElementTree as ET
import fitz
from PIL import Image, ImageFilter
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/symbol-origin';data=json.loads((R/'data/si/symbol-origin.json').read_text(encoding='utf8'));NS={'s':'http://www.w3.org/2000/svg'};checks=[]
source=ET.parse(R/data['sources'][0]['file']).getroot().find('.//s:path',NS).get('d')
assert source==data['path'];assert hashlib.sha256(source.encode()).hexdigest()==data['path_sha256']
for item in data['sources']:
 p=R/item['file'];assert p.read_bytes()==subprocess.check_output(['git','show','HEAD:'+item['file']],cwd=R)
 assert ET.parse(p).getroot().find('.//s:path',NS).get('d')==source
 checks.append({'check':'master byte identity and exact source S','file':item['file'],'passed':True})
for path in O.glob('*.svg'):
 root=ET.parse(path).getroot();_,_,w,h=map(float,root.get('viewBox').split());assert abs(float(root.get('width'))/float(root.get('height'))-w/h)<1e-5
 assert not root.findall('.//s:image',NS)
 if path.name.startswith('s-original-'):
  paths=root.findall('.//s:path',NS);assert paths[0].get('d')==source
  if not any(s in path.name for s in ['tight','construction']):assert all(p.get('d')==source for p in paths)
 checks.append({'check':'source path and undeformed viewport','file':path.name,'passed':True})
# Use the project's SVG artwork renderer for clip-path and material validation.
subprocess.run(['node','-e',"const sharp=require('sharp');const fs=require('fs');(async()=>{fs.mkdirSync('qa-local/symbol-origin/raster',{recursive:true});for(const theme of ['dark','light'])for(const material of ['solid','silver','glass','frost']){const name='s-original-'+material+'-'+theme;await sharp('public/si-v2/symbol-origin/'+name+'.svg').resize(512,512).png().toFile('qa-local/symbol-origin/raster/'+name+'.png');}})().catch(e=>{console.error(e);process.exitCode=1})"],cwd=R,check=True)
def alpha(path,size):
 doc=fitz.open(stream=path.read_bytes(),filetype='svg');scale=size/doc[0].rect.width;pix=doc[0].get_pixmap(matrix=fitz.Matrix(scale,scale),alpha=True)
 return Image.open(BytesIO(pix.tobytes('png'))).getchannel('A')
for theme in ['dark','light']:
 for size in [24,32,64,150,512]:
  im=alpha(O/f's-original-solid-{theme}.svg',size);ink={(x,y) for y in range(size) for x in range(size) if im.getpixel((x,y))>127};parts=0
  while ink:
   q=deque([ink.pop()]);parts+=1
   while q:
    x,y=q.popleft()
    for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
     n=(x+dx,y+dy)
     if n in ink:ink.remove(n);q.append(n)
  assert parts==1,(theme,size,parts)
  checks.append({'check':'one positive connected component','theme':theme,'size':size,'passed':True})
 # One-pixel antialias tolerance, not an expansion of the source contour.
 mask=Image.open(R/f'qa-local/symbol-origin/raster/s-original-solid-{theme}.png').getchannel('A').point(lambda p:255 if p>0 else 0).filter(ImageFilter.MaxFilter(3))
 for material in ['silver','glass','frost']:
  im=Image.open(R/f'qa-local/symbol-origin/raster/s-original-{material}-{theme}.png').getchannel('A')
  leaks=sum(1 for a,b in zip(im.tobytes(),mask.tobytes()) if a>8 and b==0);assert leaks==0,(theme,material,leaks)
  checks.append({'check':'illumination clipped inside source silhouette','theme':theme,'material':material,'outside_pixels':leaks,'passed':True})
report={'checks':checks,'passed':len(checks),'source_path_sha256':data['path_sha256'],'scope':'Geometry and file integrity; not independent-icon approval or responsive browser QA.'}
(R/'qa/symbol-origin-geometry.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf8');print(json.dumps({'passed':len(checks),'masters':'unchanged','source_path':'verbatim','material_leaks':0}))
