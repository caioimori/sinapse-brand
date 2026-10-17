import { MANROPE_METRICS as INTER_METRICS } from '@/lib/si/v2-metrics';
import { SNPS_PATHS } from '@/lib/si/v2-master';
import { TOOL_PATHS } from '@/lib/si/tool-assets';
import { FIGMA_GRAPHIC } from '@/lib/si/figma-graphic';
import { displayGeometry, displayWidth, materialDefs, materialShape, type BrandMaterial } from '@/lib/si/material';
import { PORTABLE_GLASS } from '@/lib/si/portable-glass';

export type ArtFormat = 'carousel'|'story'|'post'|'avatar'|'cover'|'banner';
export type ArtOptions = { format:ArtFormat; theme:'dark'|'light'; family:'signal'|'notes'|'class'|'proof'; division:string; title:string; body:string; eyebrow:string; footer:string; page:number; total:number; safe?:boolean; clientLogo?:string; partnerName?:string; clientScale?:number; tool?:string; material?:BrandMaterial|'crystal'; titleFont?:'reading'|'display'; };
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
 school:`<path d="M20 18h56M20 32h56M20 46h35" stroke-width="6" stroke-linecap="round"/><rect x="66" y="40" width="16" height="16" rx="5" ${ink}/><circle cx="14" cy="18" r="3" ${ink}/><circle cx="14" cy="32" r="3" ${ink}/><circle cx="14" cy="46" r="3" ${ink}/>`,
 house:`<path d="M20 14h56v38H20z" stroke-width="5" stroke-linejoin="round"/><path d="M37 14v38M37 32h39" stroke-width="5"/><circle cx="28" cy="22" r="3" ${ink}/><rect x="48" y="40" width="19" height="5" rx="2.5" ${ink}/>`,
 growth:`<rect x="17" y="37" width="15" height="19" rx="5" ${ink}/><rect x="40" y="25" width="15" height="31" rx="5" ${ink}/><rect x="63" y="9" width="15" height="47" rx="5" ${ink}/><path d="m18 24 14-9 14 2 10-8" stroke-width="3" stroke-linecap="round"/>`,
 connect:`<rect x="13" y="19" width="44" height="27" rx="13.5" stroke-width="6"/><rect x="39" y="19" width="44" height="27" rx="13.5" stroke-width="6"/><path d="M36 32h24" stroke-width="6" stroke-linecap="round"/>`,
 context:`<path d="M32 13H18v14m46-14h14v14M18 39v14h14m46-14v14H64" stroke-width="5" stroke-linecap="round"/><circle cx="48" cy="33" r="10" ${ink}/>`,
 create:`<path d="m30 15 36 0 13 17-13 18H30L17 32Z" stroke-width="5" stroke-linejoin="round"/><path d="M36 24h24v16H36z" ${ink}/><path d="M10 8h13M73 56h13" stroke-width="3" stroke-linecap="round"/>`,
 agent:`<rect x="18" y="14" width="60" height="38" rx="17" stroke-width="5"/><rect x="30" y="25" width="10" height="15" rx="5" ${ink}/><rect x="56" y="25" width="10" height="15" rx="5" ${ink}/><path d="M44 7h8M44 59h8" stroke-width="4" stroke-linecap="round"/>`,
 data:`<ellipse cx="48" cy="17" rx="28" ry="10" stroke-width="4"/><path d="M20 17v30c0 14 56 14 56 0V17M20 32c0 14 56 14 56 0" stroke-width="4"/><circle cx="67" cy="47" r="3" ${ink}/>`,
 code:`<path d="m31 17-17 15 17 15m34-30 17 15-17 15M55 10 41 54" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`,
 play:`<rect x="17" y="10" width="62" height="44" rx="12" stroke-width="5"/><path d="m41 22 18 10-18 10z" ${ink}/>`,
 flow:`<rect x="9" y="23" width="21" height="20" rx="6" ${ink}/><rect x="66" y="8" width="21" height="20" rx="6" ${ink}/><rect x="66" y="39" width="21" height="20" rx="6" ${ink}/><path d="M30 33h13c9 0 9-15 23-15M43 33c9 0 9 16 23 16" stroke-width="4"/>`,
 orbit:`<circle cx="48" cy="32" r="21" stroke-width="5"/><ellipse cx="48" cy="32" rx="37" ry="11" transform="rotate(-27 48 32)" stroke-width="3"/><circle cx="76" cy="17" r="6" ${ink}/>`
 };return shapes[name]||shapes.context;
}
export const ICON_NAMES=['school','house','growth','connect','context','create','agent','data','code','play','flow','orbit'];
export function iconSvg(name:string,size=96,scale=1){const paths=iconPaths(name).replace(/stroke-width="([\d.]+)"/g,(_m,n)=>`stroke-width="${Number(n)*scale}"`);return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size*2/3)}" viewBox="0 0 96 64" fill="none" color="#111111" stroke="currentColor" stroke-width="${4*scale}" stroke-linecap="round" stroke-linejoin="round"><title>SINAPSE SI / FORM 02 / ${xml(name)}</title>${paths}</svg>`;}

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
 const title=(value:string,x:number,y:number,size:number,width=inner)=>o.titleFont==='display'?displayLines(value,width,size).map((s,i)=>`<g data-display-line="${xml(s)}">${materialShape(displayGeometry(s,size,x,y-size*.7+i*size*.95),material==='crystal'?'glass':material,o.theme)}</g>`).join(''):wrapPixels(value,width,size,-.035).map((s,i)=>`<text x="${x}" y="${y+i*size*1.08}" fill="${fg}" font-family="Manrope,Inter,Arial,sans-serif" font-size="${size}" font-weight="600" letter-spacing="${-size*.035}">${xml(s)}</text>`).join('');
 const head=`<g fill="${fg}">${displayGeometry(`SINAPSE ${o.division.toUpperCase()}`,34,m,top-24)}</g>`;
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
  size=Math.floor(size*.92);if(o.titleFont==='display'){size=90;while(size>20&&(o.title.trim().split(/\s+/).some(word=>displayWidth(word,size)>inner)||displayLines(o.title,inner,size).length*size*.95>budget))size-=2;}const lines=o.titleFont==='display'?displayLines(o.title,inner,size):wrapPixels(o.title,inner,size,-.035);const bodyY=titleY+(lines.length-1)*size*(o.titleFont==='display'?.95:1.08)+90;
  content=head+label(o.eyebrow.toUpperCase(),m,cover?top+150:titleY-108,18)+title(o.title,m,titleY,size);
  content+=wrapPixels(o.body,inner,30,0).slice(0,4).map((s,i)=>`<text x="${m}" y="${bodyY+i*43}" fill="${muted}" font-family="Manrope,Inter,Arial,sans-serif" font-size="30">${xml(s)}</text>`).join('');
  if(cover){content+=materialShape(displayGeometry(String(o.page).padStart(2,'0'),220,m,330),material==='crystal'?'glass':material,o.theme)+toolMark(w-m-140,440,140);}
  else{const y=Math.max(bodyY+190,h*.59),room=foot-y-35;
   if(room>90){
    if(o.family==='class'){const artWidth=Math.min(inner*.9,Math.max(0,room-150)/(material==='crystal'?.3341:.232));content+=(artWidth>180?materialSnps(m-32,y,artWidth):'')+`<g fill="${fg}">${displayGeometry('T04',Math.min(100,room*.4),m,foot-130)}</g>${toolMark(w-m-100,foot-180,100)}`;}
    else if(o.family==='notes'){const nSize=Math.min(220,room*.55);content+=`<path d="M${m} ${y}h${inner}" stroke="${line}"/>`+materialShape(displayGeometry(String(o.page).padStart(2,'0'),nSize,m,foot-nSize*.7-90),material==='crystal'?'glass':material,o.theme)+toolMark(w-m-125,foot-230,125);}
    else if(o.family==='proof'){content+=`<rect x="${m}" y="${y}" width="${inner}" height="${room}" rx="36" fill="url(#ambient)" stroke="${line}"/>${materialSnps(m+inner*.05,y+room*.14,Math.min(inner*.7,room*.65/(material==='crystal'?.3341:.232)))}${toolMark(w-m-145,y+room*.33,Math.min(100,room*.4))}`;}
    else{content+=materialSnps(m-20,y,Math.min(inner+40,(room-30)/(material==='crystal'?.3341:.232)))+toolMark(w-m-80,foot-130,80);}
   }
  }
  content+=`<path d="M${m} ${foot-24}h${inner}" stroke="${line}"/>${label(o.footer,m,foot+18,17)}<text x="${w-m}" y="${foot+18}" text-anchor="end" fill="${muted}" font-family="Manrope,Arial,sans-serif" font-size="17">${cover?'MÓDULO '+String(o.page).padStart(2,'0'):String(o.page).padStart(2,'0')+' / '+String(o.total).padStart(2,'0')}</text>`;
 }
 const guides=o.safe?`<rect x="${m}" y="${story?250:60}" width="${inner}" height="${h-(story?520:120)}" fill="none" stroke="${muted}" stroke-dasharray="8 8" stroke-opacity=".5"/>`:'';
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${xml(o.title)} — SINAPSE SI / 03</title><desc>Proposta editável. Formato ${o.format}; ${w} por ${h}. ${xml(o.body)}</desc><defs><style>${fontCss}</style>${defs}${materialDefs(o.theme)}</defs><rect width="${w}" height="${h}" fill="${bg}"/><rect width="${w}" height="${h}" fill="url(#ambient)" opacity=".32"/>${content}${guides}</svg>`;
}
