import { SYMBOL_PATH } from '@/components/si/marks';
import { INTER_METRICS } from '@/lib/si/metrics';

export type ArtFormat = 'carousel'|'story'|'post'|'avatar'|'cover'|'banner';
export type ArtOptions = { format:ArtFormat; theme:'dark'|'light'; family:'signal'|'notes'|'class'|'proof'; division:string; title:string; body:string; eyebrow:string; footer:string; page:number; total:number; safe?:boolean; clientLogo?:string; partnerName?:string; clientScale?:number; };
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

export function iconPaths(name:string):string {
  const map:Record<string,string>={
    school:'<path d="M10 32c12-26 28-26 38 0s26 26 38 0M10 32c12 26 28 26 38 0s26-26 38 0"/>',
    house:'<path d="M8 14h25l15 18-15 18H8M88 14H63L48 32l15 18h25M36 32h24"/>',
    growth:'<path d="M10 52h24V36h24V20h28M68 8h18v24"/>',
    connect:'<rect x="8" y="20" width="30" height="24" rx="12"/><rect x="58" y="20" width="30" height="24" rx="12"/><path d="M38 32h20"/>',
    context:'<path d="M10 14h54v36H10zM32 14V6h54v36H64"/>',
    create:'<path d="M48 6v52M22 32h52M30 14l36 36M66 14L30 50"/>',
    agent:'<rect x="22" y="12" width="52" height="43" rx="16"/><path d="M48 4v8M34 29v4M62 29v4M36 44h24"/>',
    data:'<path d="M14 50V34M37 50V20M60 50V8M83 50V27M8 58h80"/>',
    code:'<path d="M30 14L10 32l20 18M66 14l20 18-20 18M55 7L41 57"/>',
    play:'<path d="M34 10l34 22-34 22z"/>',
    flow:'<circle cx="16" cy="32" r="9"/><circle cx="80" cy="32" r="9"/><path d="M25 32h46M48 32V9M48 32v23"/>',
    orbit:'<ellipse cx="48" cy="32" rx="37" ry="21"/><ellipse cx="48" cy="32" rx="18" ry="29"/><circle cx="48" cy="32" r="5"/>',
  };return map[name]||map.connect;
}
export const ICON_NAMES=['school','house','growth','connect','context','create','agent','data','code','play','flow','orbit'];
export function iconSvg(name:string,size=96){return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${Math.round(size*2/3)}" viewBox="0 0 96 64" fill="none" stroke="#0a0a0a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><title>SINAPSE SI / ${xml(name)}</title>${iconPaths(name)}</svg>`;}

export function makeArtwork(o:ArtOptions,wordmarkPaths:string,fontCss=''):string {
  const [w,h]=FORMAT_SIZES[o.format], light=o.theme==='light';
  const bg=light?'#F5F5F0':'#0A0A0A',fg=light?'#0A0A0A':'#F5F5F0',muted=light?'#626262':'#A6A6A6',line=light?'#CECECB':'#333333';
  const m=w===1920?115:76, inner=w-m*2, foot=h-(o.format==='story'?270:78),top=o.format==='story'?250:80;
  const logo=`<svg x="${m}" y="${top-18}" width="${w===1920?270:245}" height="42" viewBox="0 0 734.86 113.46" fill="${fg}">${wordmarkPaths}</svg><text x="${m+(w===1920?294:268)}" y="${top+9}" fill="${fg}" font-family="Inter,Arial,sans-serif" font-size="18">${xml(o.division==='SI'?'SI':o.division)}</text>`;
  const symbol=(x:number,y:number,width:number,opacity=1)=>`<svg x="${x}" y="${y}" width="${width}" height="${width*.56}" viewBox="28 28 104 58" opacity="${opacity}"><path d="${SYMBOL_PATH}" fill="${fg}"/></svg>`;
  const label=(text:string,x:number,y:number,color=muted,size=17)=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-family="JetBrains Mono,monospace" letter-spacing="2">${xml(text)}</text>`;
  const textBlock=(text:string,x:number,y:number,size:number,_maxChars:number,color=fg,weight=500)=>wrapPixels(text,inner,size).map((s,i)=>`<text x="${x}" y="${y+i*size*1.06}" fill="${color}" font-family="Inter,Arial,sans-serif" font-weight="${weight}" font-size="${size}" letter-spacing="${-size*.055}">${xml(s)}</text>`).join('');
  let content='';
  if(o.format==='avatar'){
    const imageData=o.clientLogo&&/^data:image\/(?:png|jpeg|webp);base64,[A-Za-z0-9+/=\r\n]+$/.test(o.clientLogo)?o.clientLogo:undefined;
    const partner=o.partnerName?.trim()||(imageData?'Cliente':'');
    const logoSize=240*Math.min(2,Math.max(.6,o.clientScale||1));
    content=`<circle cx="540" cy="540" r="500" stroke="${line}" fill="none"/>${symbol(partner?205:305,partner?290:255,partner?275:470)}${partner?`<path d="M540 245v350" stroke="${line}" stroke-width="2"/>${imageData?`<defs><clipPath id="client-area"><rect x="575" y="190" width="340" height="380"/></clipPath></defs><image href="${imageData}" x="${730-logoSize/2}" y="${365-logoSize/2}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet" clip-path="url(#client-area)"/>`:`<text x="735" y="437" text-anchor="middle" fill="${fg}" font-family="Inter,Arial,sans-serif" font-weight="500" font-size="84">${xml(partner.slice(0,3).toUpperCase())}</text>`}`:''}<text x="540" y="${partner?740:710}" text-anchor="middle" fill="${fg}" font-family="Inter,Arial,sans-serif" font-size="${o.title.length>14?54:90}" font-weight="450" letter-spacing="-4">${xml(o.title.slice(0,22))}</text><text x="540" y="815" text-anchor="middle" fill="${muted}" font-family="JetBrains Mono,monospace" font-size="20" letter-spacing="4">SINAPSE ${xml(o.division.toUpperCase())}</text><circle cx="540" cy="540" r="500" stroke="${line}" fill="none"/>`;
  }else if(o.format==='cover'){
    const coverSize=fitTitle(o.title,inner,94,330);
    const coverBody=wrapPixels(o.body,inner,23,0).slice(0,3).map((s,i)=>`<text x="${m}" y="${1360+i*30}" fill="${muted}" font-family="Inter,Arial,sans-serif" font-size="23">${xml(s)}</text>`).join('');
    content=`${logo}${label(o.eyebrow.toUpperCase(),m,230)}${symbol(250,410,950,.085)}<text x="${m}" y="520" fill="none" stroke="${fg}" stroke-opacity=".4" stroke-width="1" font-family="Inter,Arial,sans-serif" font-size="230" letter-spacing="-22">${String(o.page).padStart(2,'0')}</text>${textBlock(o.title,m,970,coverSize,18)}${coverBody}<path d="M${m} 1450h${inner}" stroke="${line}"/>${label('SINAPSE SCHOOL / MEMBER',m,1510,muted,17)}`;
  }else{
    const isStory=o.format==='story',isBanner=o.format==='banner',isPost=o.format==='post';
    const titleSize=isBanner?112:isPost?90:96;
    const size=fitTitle(o.title,inner,titleSize,isBanner?275:isPost?310:isStory?450:350);
    const titleY=isStory?420:isBanner?360:300;
    const titleLines=wrapPixels(o.title,inner,size);
    const bodyY=titleY+(titleLines.length-1)*size*1.06+100;
    content=`${logo}${label(o.eyebrow.toUpperCase(),m,titleY-100)}${textBlock(o.title,m,titleY,size,isBanner?27:Math.floor(19*titleSize/size))}`;
    const bodySize=isBanner?30:27;
    content+=wrapPixels(o.body,inner,bodySize,0).slice(0,5).map((s,i)=>`<text x="${m}" y="${bodyY+i*bodySize*1.45}" fill="${muted}" font-family="Inter,Arial,sans-serif" font-size="${bodySize}" font-weight="400">${xml(s)}</text>`).join('');
    const artY=Math.max(bodyY+190,h*.57),artH=foot-artY-50;
    if(artH>60){
      if(o.family==='class'){content+=`<text x="${m-10}" y="${foot-70}" fill="${fg}" font-family="Inter,Arial,sans-serif" font-size="${Math.min(310,artH+25)}" font-weight="400" letter-spacing="-22">T04</text><path d="M${w-m-110} ${foot-240}h110v110M${w-m-110} ${foot-130}l110-110" fill="none" stroke="${fg}" stroke-width="4"/>`;}
      else if(o.family==='notes'){content+=`<path d="M${m} ${artY}h${inner}" stroke="${line}"/><text x="${m}" y="${foot-90}" fill="none" stroke="${fg}" stroke-width="1" opacity=".5" font-family="Inter,Arial,sans-serif" font-size="${Math.min(250,artH)}" letter-spacing="-12">${String(o.page).padStart(2,'0')}</text>${label('PENSE. EXPERIMENTE. APLIQUE.',m+200,foot-110,muted,14)}`;}
      else if(o.family==='proof'){content+=`<rect x="${m}" y="${artY}" width="${inner}" height="${Math.max(80,artH-25)}" rx="10" fill="${light?'#E8E8E5':'#141414'}" stroke="${line}"/><path d="M${m+40} ${artY+48}h${inner-80}" stroke="${line}"/>${label('PROCESSO → ENTREGA → APRENDIZADO',m+40,artY+31,muted,14)}${symbol(m+inner*.32,artY+Math.max(55,(artH-180)/2),inner*.4,.85)}`;}
      else{content+=symbol(w*.27,artY,inner*.72,.88);}
    }
    content+=`<path d="M${m} ${foot-24}h${inner}" stroke="${line}"/>${label(o.footer,m,foot+18,muted,16)}<text x="${w-m}" y="${foot+18}" text-anchor="end" fill="${muted}" font-family="JetBrains Mono,monospace" font-size="16">${String(o.page).padStart(2,'0')} / ${String(o.total).padStart(2,'0')}</text>`;
  }
  const guides=o.safe?`<rect x="${m}" y="${o.format==='story'?250:60}" width="${inner}" height="${h-(o.format==='story'?520:120)}" fill="none" stroke="${muted}" stroke-dasharray="8 8" stroke-opacity=".5"/>`:'';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>${xml(o.title)} — SINAPSE SI</title><desc>Proposta editável. Formato ${o.format}; ${w} por ${h}. ${xml(o.body)}</desc><defs><style>${fontCss}</style></defs><rect width="${w}" height="${h}" fill="${bg}"/>${content}${guides}</svg>`;
}
