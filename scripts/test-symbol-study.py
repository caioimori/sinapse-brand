from pathlib import Path
from collections import deque
from io import BytesIO
import json,subprocess,hashlib,xml.etree.ElementTree as ET
import fitz
from PIL import Image
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/symbol-study';s=json.loads((O/'study.json').read_text(encoding='utf8'));rows=[]
def components(image):
 ink={(x,y) for y in range(image.height) for x in range(image.width) if image.getpixel((x,y))>127};sizes=[]
 while ink:
  p=ink.pop();q=deque([p]);count=0
  while q:
   x,y=q.popleft();count+=1
   for dx,dy in [(1,0),(-1,0),(0,1),(0,-1)]:
    n=(x+dx,y+dy)
    if n in ink:ink.remove(n);q.append(n)
  sizes.append(count)
 return sorted(sizes,reverse=True)
for item in s['symbols']:
 for theme in ['dark','light']:
  path=O/f'{item["id"]}-{theme}.svg';root=ET.parse(path).getroot();assert not any(n.tag.endswith('image') for n in root.iter());assert len([n for n in root if n.tag.endswith('path')])==1
  for size in [24,32,64,150,512]:
   doc=fitz.open(stream=path.read_bytes(),filetype='svg');pix=doc[0].get_pixmap(matrix=fitz.Matrix(size/128,size/128),alpha=True);im=Image.open(BytesIO(pix.tobytes('png'))).getchannel('A');parts=components(im);assert len(parts)==1,(item['id'],size,parts);b=im.getbbox();assert b and min(b[:2])>0 and b[2]<size and b[3]<size,(item['id'],size,b);rows.append({'symbol':item['id'],'theme':theme,'pixels':size,'positive_components':len(parts),'bounds':b})
# Readback compares original master blobs, not the font extension.
for name in ['snps-lockup','sinapse-wordmark']:
 p=f'public/brand/logo/bone/{name}.svg';assert (R/p).read_bytes()==subprocess.check_output(['git','show','HEAD:'+p],cwd=R)
(R/'qa/symbol-study-geometry.json').write_text(json.dumps({'samples':rows,'masters':'byte-identical to HEAD','scope':'Native path-only SVGs, one filled positive component and margins at five sizes; not audience recognition.'},indent=2),encoding='utf8');print(f'{len(rows)} size/theme samples: one positive component, safe margins, native vectors; original masters unchanged.')
