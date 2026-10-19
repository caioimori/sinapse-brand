"""Front/back artboards: source circle on front, existing phrases and SNPS SI on back."""
from pathlib import Path
import json,shutil,xml.etree.ElementTree as ET,subprocess
R=Path(__file__).resolve().parents[1];O=R/'public/si-v2/wear-v8';Q=R/'qa-local/v8';O.mkdir(parents=True,exist_ok=True);Q.mkdir(parents=True,exist_ok=True)
shutil.copytree(R/'public/si-v2/wear-v7/fonts',O/'fonts',dirs_exist_ok=True)
items=json.loads((R/'data/si/wear-v7.json').read_text(encoding='utf8'))
def body(path):
    node=ET.parse(path).getroot();return node,' '.join(ET.tostring(e,encoding='unicode') for e in node if e.tag.split('}')[-1] not in ['title','desc'])
for item in items:
    n=item['id'];shutil.copyfile(R/'public'/item['print'].lstrip('/'),O/f'print-{n}.svg')
    item.update({'side':'costas','print':f'/si-v2/wear-v8/print-{n}.svg','frontPrint':f'/si-v2/symbol-circle/solid-{item["theme"]}.svg','front':'S circular fino, pequeno no peito','back':'frase + SNPS SI','photo':f'/si-v2/wear-v8/sheet-{item["group"]}.webp','photoRow':(int(n)-1)%2,'status':'front_back_concept_for_review'})
for group in range(1,7):
    parts=[]
    for row,item in enumerate(i for i in items if i['group']==group):
        bg='#0a0a0a' if item['theme']=='dark' else '#f5f5f5';fg='#aaa' if item['theme']=='dark' else '#555'
        for col,side in enumerate(['FRENTE / SOMENTE SIMBOLO','COSTAS / ESTAMPA']):
            parts.append(f'<rect x="{col*1200}" y="{row*1000}" width="1200" height="1000" fill="{bg}"/>')
            parts.append(f'<text x="{col*1200+40}" y="{row*1000+55}" font-family="Arial" font-size="23" fill="{fg}">{item["piece"]} / {side}</text>')
            if col==0:
                node,art=body(R/'public'/item['frontPrint'].lstrip('/'));parts.append(f'<g transform="translate(490 {row*1000+340}) scale(.22)">{art}</g>')
            else:
                node,art=body(R/'public'/item['print'].lstrip('/'));vx,vy,vw,vh=map(float,node.get('viewBox').split());scale=min(1010/vw,790/vh);x=1200+(1200-vw*scale)/2;y=row*1000+130+(790-vh*scale)/2
                parts.append(f'<g transform="translate({x} {y}) scale({scale}) translate({-vx} {-vy})">{art}</g>')
    (Q/f'front-back-{group}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="2000" viewBox="0 0 2400 2000">'+''.join(parts)+'</svg>',encoding='utf8',newline='\n')
(O/'collection.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n');(R/'data/si/wear-v8.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
subprocess.run(['node','-e',"const sharp=require('sharp');(async()=>{for(let n=1;n<=6;n++)await sharp('qa-local/v8/front-back-'+n+'.svg').png().toFile('qa-local/v8/front-back-'+n+'.png');await sharp('public/si-v2/symbol-circle/solid-dark.svg').resize(1000).flatten({background:'#0a0a0a'}).png().toFile('qa-local/v8/circle-reference.png')})().catch(e=>{console.error(e);process.exitCode=1})"],cwd=R,check=True)
print('12 garments; 24 sides specified. Front circle only, every phrase on back.')
