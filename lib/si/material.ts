import { MATERIAL_DEFS } from './material-tokens';
import { DISPLAY_METRICS, DISPLAY_PATHS } from './display-font';
export type BrandMaterial='solid'|'silver'|'glass'|'frost';
export function materialDefs(theme:'dark'|'light'){return MATERIAL_DEFS[theme];}
export function materialShape(body:string,material:BrandMaterial,theme:'dark'|'light'){
 const fg=theme==='dark'?'#f5f5f5':'#111111';
 if(material==='solid')return `<g fill="${fg}">${body}</g>`;
 return `<g transform="translate(0 1.2)" fill="${fg}" opacity=".22">${body}</g><g fill="url(#si-${material})" stroke="url(#si-edge)" stroke-width=".75" stroke-linejoin="round" paint-order="stroke fill">${body}</g><g fill="none" stroke="url(#si-edge)" stroke-width=".22" opacity=".9">${body}</g>`;
}
export function displayWidth(value:string,size=100){return Math.max(0,Array.from(value).reduce((s,c)=>s+(DISPLAY_METRICS[c]||DISPLAY_METRICS['?'])*size,0)-(value.length?24.8358*size/100:0));}
export function displayGeometry(value:string,size=100,x=0,y=0){let at=0;return `<g transform="translate(${x} ${y}) scale(${size/100})">`+Array.from(value).map(ch=>{const p=DISPLAY_PATHS[ch]??DISPLAY_PATHS['?'];const shape=p?`<path d="${p}" transform="translate(${at} 0)"/>`:'';at+=(DISPLAY_METRICS[ch]||DISPLAY_METRICS['?'])*100;return shape;}).join('')+'</g>';}
export function displaySvg(value:string,material:BrandMaterial='solid',theme:'dark'|'light'='dark'){
 const clean=value.slice(0,80),lines:string[]=[];let line='';
 for(const word of clean.trim().split(/\s+/)){if(line&&displayWidth(line+' '+word)>1400){lines.push(line);line=word;}else line=(line+' '+word).trim();}if(line)lines.push(line);
 const w=Math.max(...lines.map(l=>displayWidth(l)),100)+40,h=Math.max(0,lines.length-1)*140+150;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><title>SNPS Display / ${clean.replace(/[<>&]/g,'')}</title><defs>${materialDefs(theme)}</defs>${materialShape(lines.map((l,i)=>displayGeometry(l,100,20,35+i*140)).join(''),material,theme)}</svg>`;
}
