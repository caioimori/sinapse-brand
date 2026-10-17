import { MANROPE_METRICS as INTER_METRICS } from '@/lib/si/v2-metrics';
import { SNPS_PATHS } from '@/lib/si/v2-master';
import { WORDMARK_PATHS } from '@/lib/si/master';
import { TOOL_PATHS } from '@/lib/si/tool-assets';
import { FIGMA_GRAPHIC } from '@/lib/si/figma-graphic';
import { displayGeometry, displayWidth, materialDefs, materialShape, type BrandMaterial } from '@/lib/si/material';
import { PORTABLE_GLASS } from '@/lib/si/portable-glass';

export type ArtFormat = 'carousel'|'story'|'post'|'avatar'|'cover'|'banner';
export type ArtOptions = { format:ArtFormat; theme:'dark'|'light'; family:'signal'|'notes'|'class'|'proof'|'flow'; division:string; title:string; body:string; eyebrow:string; footer:string; page:number; total:number; safe?:boolean; clientLogo?:string; partnerName?:string; clientScale?:number; tool?:string; material?:BrandMaterial|'crystal'; titleFont?:'reading'|'display'; };
export const FORMAT_SIZES:Record<ArtFormat,[number,number]>={carousel:[1080,1350],story:[1080,1920],post:[1080,1080],avatar:[1080,1080],cover:[1080,1620],banner:[1920,1080]};
export const xml=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]||c));

export function wrapText(value:string,maxChars:number):string[]{
  const words=value.trim().split(/\s+/).flatMap(w=>w.length>maxChars?w.match(new RegExp(`.{1,${maxChars}}`,'g'))||[]:[w]);
  const lines:string[]=[];let current='';
  for(const word of words){if((current+' '+word).trim().length>maxChars&&current){lines.push(current);current=word;}else current=(current+' '+word).trim();}
  if(current)lines.push(current);
  if(lines.length>1&&lines[lines.length-1].split(' ').length===1){const prev=lines[lines.length-2].split(' ');if(prev.length>2){lines[lines.length-1]=prev.pop()+' '+lines[lines.length-1];lines[lines.length-2]=prev.join(' ');}}
  return lines;
}

export function wrapPixels(value:string,width:number,size:number,tracking=-.055):string[]{
 const measure=(s:string)=>Array.from(s).reduce((sum,c)=>sum+(INTER_METRICS[c]||.65)*size,0)+Math.max(0,Array.from(s).length-1)*size*tracking;
 const words=value.trim().split(/\s+/).flatMap(word=>{if(measure(word)<=width)return [word];const chunks:string[]=[];let part='';for(const char of word){if(part&&measure(part+char)>width){chunks.push(part);part=char;}else part+=char;}if(part)chunks.push(part);return chunks;});
 const lines:string[]=[];let line='';for(const word of words){const next=(line+' '+word).trim();if(line&&measure(next)>width){lines.push(line);line=word;}else line=next;}if(line)lines.push(line);
 if(lines.length>1&&lines[lines.length-1].split(' ').length===1){const prev=lines[lines.length-2].split(' ');if(prev.length>2&&measure(prev[prev.length-1]+' '+lines[lines.length-1])<=width){lines[lines.length-1]=prev.pop()+' '+lines[lines.length-1];lines[lines.length-2]=prev.join(' ');}}
 return lines;
}
function fitTitle(value:string,width:number,size:number,budget:number){for(let i=0;i<20;i++){if(wrapPixels(value,width,size).length*size*1.06<=budget||size<=42)break;size=Math.floor(size*.94);}return size;}
function displayLines(value:string,width:number,size:number){const words=value.trim().split(/\s+/).flatMap(word=>{const chunks:string[]=[];let line='';for(const ch of word){if(line&&displayWidth(line+ch,size)>width){chunks.push(line);line=ch;}else line+=ch;}return [...chunks,line].filter(Boolean);});const lines:string[]=[];let line='';for(const word of words){if(line&&displayWidth(line+' '+word,size)>width){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);return lines;}

export function iconPaths(name:string):string {
 const ink='fill="currentColor" stroke="none"';
 const shapes:Record<string,string>={
 school:`<path d="M14 16h24c6 0 10 4 10 10v28c0-6-4-10-10-10H14V16Zm68 0H58c-6 0-10 4-10 10v28c0-6 4-10 10-10h24V16Z" stroke-width="4" stroke-linejoin="miter"/><path d="M24 25h12M60 25h12" stroke-width="4" stroke-linecap="butt"/>`,
 house:`<path d="M14 52V18c0-3 2-5 5-5h58c3 0 5 2 5 5v34H14Z" stroke-width="4"/><path d="M14 32h68M44 32v20M27 22h9" stroke-width="4" stroke-linecap="butt"/>`,
 growth:`<path d="M14 48h15c3 0 5-1 7-3l25-25c2-2 4-3 7-3h14M64 13h18v18" stroke-width="5" stroke-linecap="butt" stroke-linejoin="round"/>`,
 connect:`<path d="M43 18H24c-8 0-12 5-12 14s4 14 12 14h19M53 18h19c8 0 12 5 12 14s-4 14-12 14H53M31 32h34" stroke-width="5" stroke-linecap="butt"/>`,
 context:`<path d="M29 13H14v15m53-15h15v15M14 36v15h15m53-15v15H67M31 25h34M31 39h23" stroke-width="4" stroke-linecap="butt"/>`,
 create:`<path d="M14 46V17c0-3 2-5 5-5h39v34H14ZM38 52V23h39c3 0 5 2 5 5v24H38Z" stroke-width="4"/><path d="M58 12v11M14 46h24" stroke-width="4" stroke-linecap="butt"/>`,
 agent:`<path d="M14 15h48c3 0 5 2 5 5v10H14V15Zm15 19h48c3 0 5 2 5 5v10H29V34Z" stroke-width="4" stroke-linejoin="miter"/><path d="M21 23h18M36 42h18M14 49h7M75 15h7" stroke-width="4" stroke-linecap="butt"/>`,
 data:`<path d="M14 13h62c3 0 6 3 6 6s-3 6-6 6H14V13Zm0 20h62c3 0 6 3 6 6s-3 6-6 6H14V33ZM14 53h52" stroke-width="4" stroke-linecap="butt"/>`,
 code:`<path d="m33 17-17 15 17 15m30-30 17 15-17 15M54 10 42 54" stroke-width="5" stroke-linecap="butt" stroke-linejoin="round"/>`,
 play:`<path d="M14 13h63c3 0 5 2 5 5v28c0 3-2 5-5 5H14V13Z" stroke-width="4" stroke-linejoin="miter"/><path d="m42 23 17 9-17 9V23Z" ${ink}/>` ,
 flow:`<path d="M13 24h17v16H13V24Zm53-13h17v16H66V11Zm0 26h17v16H66V37Z" stroke-width="4" stroke-linejoin="miter"/><path d="M30 32h13c7 0 8-13 23-13M43 32c7 0 8 13 23 13" stroke-width="4"/>`,
 orbit:`<path d="M12 23c0-3 2-5 5-5h51c9 0 16 7 16 14s-7 14-16 14H17c-3 0-5-2-5-5V23Z" stroke-width="4"/><path d="M30 9v46M46 9v46" stroke-width="4" stroke-linecap="butt"/>`
 };return shapes[name]||shapes.context;
}
export const ICON_NAMES=['school','house','growth','connect','context','create','agent','data','code','play','flow','orbit'];
export function iconSvg(name:string,size=96,scale=1){const paths=iconPaths(name).replace(/stroke-width="([\d.]+)"/g,(_m,n)=>`stroke-width="${Number(n)*scale}"`);return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size*2/3)}" viewBox="0 0 96 64" fill="none" color="#111111" stroke="currentColor" stroke-width="${4*scale}" stroke-linecap="butt" stroke-linejoin="round"><title>SINAPSE SI / SIGNALS 04 / ${xml(name)}</title>${paths}</svg>`;}

export function makeArtwork(o:ArtOptions,_wordmarkPaths:string,fontCss=''):string {
 const [w,h]=FORMAT_SIZES[o.format],light=o.theme==='light',bg=light?'#f5f5f5':'#0a0a0a',fg=light?'#111111':'#f5f5f5',muted=light?'#666666':'#aaaaaa',line=light?'#cccccc':'#38383c';
 const m=w===1920?110:76,inner=w-2*m,story=o.format==='story',foot=h-(story?270:78),top=story?250:86;
 const colors:Record<string,string>={supabase:'#3ecf8e',figma:'#f24e1e',obsidian:'#7c3aed',n8n:'#ea4b71',warp:'#01a4ff',hostinger:'#673de6',docker:'#2496ed',vercel:muted,github:muted};
 const tool=o.tool&&(o.tool==='figma'||TOOL_PATHS[o.tool])?o.tool:undefined;
 const toolMark=(x:number,y:number,size:number)=>tool==='figma'?`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 16 16">${FIGMA_GRAPHIC}</svg>`:tool?`<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 24 24"><path d="${TOOL_PATHS[tool]}" fill="${colors[tool]||fg}"/></svg>`:'';
 const snps=(x:number,y:number,width:number,fill=fg)=>`<svg x="${x}" y="${y}" width="${width}" height="${width*.232}" viewBox="0 0 489.2 113.46" fill="${fill}">${SNPS_PATHS}</svg>`;
 const material=o.material||'glass';
 const materialSnps=(x:number,y:number,width:number)=>material==='crystal'?`<image href="${PORTABLE_GLASS}" x="${x}" y="${y}" width="${width}" height="${width*.3341}" preserveAspectRatio="xMidYMid meet"/>`:`<svg x="${x}" y="${y}" width="${width}" height="${width*.232}" viewBox="0 0 489.2 113.46">${materialShape(SNPS_PATHS,material,o.theme)}</svg>`;
 const label=(s:string,x:number,y:number,size=18,color=muted)=>`<text x="${x}" y="${y}" fill="${color}" font-family="Manrope,Inter,Arial,sans-serif" font-size="${size}" letter-spacing="2">${xml(s)}</text>`;
 const title=(value:string,x:number,y:number,size:number,width=inner)=>o.titleFont==='display'?displayLines(value,width,size).map((s,i)=>`<g data-display-line="${xml(s)}">${materialShape(displayGeometry(s,size,x,y-size*.7+i*size*1.4),material==='crystal'?'glass':material,o.theme)}</g>`).join(''):wrapPixels(value,width,size,-.035).map((s,i)=>`<text x="${x}" y="${y+i*size*1.08}" fill="${fg}" font-family="Manrope,Inter,Arial,sans-serif" font-size="${size}" font-weight="600" letter-spacing="${-size*.035}">${xml(s)}</text>`).join('');
 const markScale=34*.7/46.9,markWidth=668.3*markScale,wordSpace=(93.18*.6+2*16.64)*markScale;
 const head=`<g fill="${fg}" transform="translate(${m} ${top-24}) scale(${markScale}) translate(-33.28 -33.28)">${WORDMARK_PATHS}</g><g fill="${fg}">${displayGeometry(o.division.toUpperCase(),34,m+markWidth+wordSpace,top-24)}</g>`;
 const defs=`<linearGradient id="ambient" x2=".8" y2="1"><stop stop-color="${light?'#ffffff':'#343438'}"/><stop offset=".55" stop-color="${bg}"/><stop offset="1" stop-color="${light?'#e0e0e5':'#171719'}"/></linearGradient><linearGradient id="silver" x2=".1" y2="1"><stop stop-color="#fafafa"/><stop offset=".2" stop-color="#6e6e73"/><stop offset=".45" stop-color="#fafafa"/><stop offset=".53" stop-color="#8a8a90"/><stop offset="1" stop-color="#d1d1d6"/></linearGradient><linearGradient id="glass" x2="1" y2="1"><stop stop-color="#ffffff" stop-opacity=".8"/><stop offset=".25" stop-color="#aaa" stop-opacity=".1"/><stop offset=".5" stop-color="#fff" stop-opacity=".7"/><stop offset=".57" stop-color="#aaa" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".7"/></linearGradient>`;
 let content='';
 if(o.format==='avatar'){
  const imageData=o.clientLogo&&/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=\r\n]+$/.test(o.clientLogo)?o.clientLogo:undefined;
  const partner=o.partnerName?.trim()||(imageData?'Cliente':'');const logoSize=240*Math.min(1.4,Math.max(.6,o.clientScale||1));
  content=`<circle cx="540" cy="540" r="500" fill="url(#ambient)" stroke="${line}"/>${materialSnps(partner?145:170,partner?290:275,partner?350:740)}${partner?`<path d="M540 245v350" stroke="${line}" stroke-width="2"/>${imageData?`<defs><clipPath id="client-area"><rect x="575" y="160" width="340" height="340"/></clipPath></defs><image href="${imageData}" x="${745-logoSize/2}" y="${330-logoSize/2}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" clip-path="url(#client-area)"/>`:`<text x="745" y="360" text-anchor="middle" fill="${fg}" font-family="Manrope,Arial,sans-serif" font-size="80" font-weight="600">${xml(partner.slice(0,3).toUpperCase())}</text>`}`:''}<text x="540" y="${partner?715:680}" text-anchor="middle" fill="${fg}" font-family="Manrope,Inter,Arial,sans-serif" font-size="${o.title.length>14?52:96}" font-weight="600" letter-spacing="-4">${xml(o.title.slice(0,22))}</text><text x="540" y="810" text-anchor="middle" fill="${muted}" font-family="Manrope,Arial,sans-serif" font-size="21" letter-spacing="3">SINAPSE ${xml(o.division.toUpperCase())}</text><circle cx="540" cy="540" r="500" stroke="${line}" fill="none"/>`;
 }else{
  const cover=o.format==='cover',banner=o.format==='banner',post=o.format==='post';const titleY=cover?820:story?440:banner?340:320;
  const budget=cover?340:post?270:story?440:banner?310:340;let size=fitTitle(o.title,inner,banner?124:cover?105:110,budget);
  // Reserve extra line-fit space for the reading face. Display uses its own metrics.
  size=Math.floor(size*.92);if(o.titleFont==='display'){size=90;while(size>20&&(o.title.trim().split(/\s+/).some(word=>displayWidth(word,size)>inner)||displayLines(o.title,inner,size).length*size*1.4>budget))size-=2;}const lines=o.titleFont==='display'?displayLines(o.title,inner,size):wrapPixels(o.title,inner,size,-.035);const bodyY=titleY+(lines.length-1)*size*(o.titleFont==='display'?1.4:1.08)+90;
  content=head+label(o.eyebrow.toUpperCase(),m,cover?top+150:titleY-108,18)+title(o.title,m,titleY,size);
  content+=wrapPixels(o.body,inner,30,0).slice(0,4).map((s,i)=>`<text x="${m}" y="${bodyY+i*43}" fill="${muted}" font-family="Manrope,Inter,Arial,sans-serif" font-size="30">${xml(s)}</text>`).join('');
  if(cover){content+=materialShape(displayGeometry(String(o.page).padStart(2,'0'),220,m,330),material==='crystal'?'glass':material,o.theme)+toolMark(w-m-140,440,140);}
  else{const y=Math.max(bodyY+190,h*.59),room=foot-y-35;
   if(room>90){
    if(o.family==='class'){const artWidth=Math.min(inner*.9,Math.max(0,room-150)/(material==='crystal'?.3341:.232));content+=(artWidth>180?materialSnps(m-32,y,artWidth):'')+`<g fill="${fg}">${displayGeometry('T04',Math.min(100,room*.4),m,foot-130)}</g>${toolMark(w-m-100,foot-180,100)}`;}
    else if(o.family==='notes'){const nSize=Math.min(220,room*.55);content+=`<path d="M${m} ${y}h${inner}" stroke="${line}"/>`+materialShape(displayGeometry(String(o.page).padStart(2,'0'),nSize,m,foot-nSize*.7-90),material==='crystal'?'glass':material,o.theme)+toolMark(w-m-125,foot-230,125);}
    else if(o.family==='proof'){content+=`<rect x="${m}" y="${y}" width="${inner}" height="${room}" rx="36" fill="url(#ambient)" stroke="${line}"/>${materialSnps(m+inner*.05,y+room*.14,Math.min(inner*.7,room*.65/(material==='crystal'?.3341:.232)))}${toolMark(w-m-145,y+room*.33,Math.min(100,room*.4))}`;}
    else{
     const signalSize=Math.min(inner*1.45/displayWidth('S',1),(room-20)/.7);
     const signal=displayGeometry('S',signalSize,m+inner*.2,y);
     content+=`<defs><clipPath id="signal-window"><rect x="${m}" y="${y}" width="${inner}" height="${room}"/></clipPath></defs><g clip-path="url(#signal-window)">`;
     if(o.family==='flow')for(let i=0;i<8;i++)content+=`<g transform="translate(${i*22} ${i*15})" opacity="${.08+i*.08}" fill="${fg}">${signal}</g>`;
     else content+=materialShape(signal,material==='crystal'?'glass':material,o.theme);
     content+='</g>'+toolMark(w-m-80,foot-130,80);
    }
   }
  }
  content+=`<path d="M${m} ${foot-24}h${inner}" stroke="${line}"/>${label(o.footer,m,foot+18,17)}<text x="${w-m}" y="${foot+18}" text-anchor="end" fill="${muted}" font-family="Manrope,Arial,sans-serif" font-size="17">${cover?'MÓDULO '+String(o.page).padStart(2,'0'):String(o.page).padStart(2,'0')+' / '+String(o.total).padStart(2,'0')}</text>`;
 }
 const guides=o.safe?`<rect x="${m}" y="${story?250:60}" width="${inner}" height="${h-(story?520:120)}" fill="none" stroke="${muted}" stroke-dasharray="8 8" stroke-opacity=".5"/>`:'';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${xml(o.title)} — SINAPSE SI / 04</title><desc>Proposta editável. Formato ${o.format}; ${w} por ${h}. ${xml(o.body)}</desc><defs><style>${fontCss}</style>${defs}${materialDefs(o.theme)}</defs><rect width="${w}" height="${h}" fill="${bg}"/><rect width="${w}" height="${h}" fill="url(#ambient)" opacity=".32"/>${content}${guides}</svg>`;
}
