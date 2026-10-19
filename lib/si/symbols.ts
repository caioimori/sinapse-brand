import study from '@/data/si/symbol-study.json';
import { materialDefs, materialShape, type BrandMaterial } from './material';
export const SYMBOLS=study.symbols;
export type SymbolId=(typeof SYMBOLS)[number]['id'];
export function symbolSvg(id:string,material:BrandMaterial='solid',theme:'dark'|'light'='dark',construction=false){
 const item=SYMBOLS.find(s=>s.id===id)||SYMBOLS[1];
 const shape=`<path d="${item.path}" fill-rule="evenodd"/>`;
 const guides=construction?`<g fill="none" stroke="${theme==='dark'?'#999':'#777'}" stroke-width=".4" opacity=".6"><path d="M12 0V128M28 0V128M64 0V128M100 0V128M116 0V128M0 18H128M0 42H128M0 63H128M0 84H128M0 108H128"/><path d="M12 18L116 122M12 4L116 108" stroke-dasharray="2 3"/><circle cx="64" cy="64" r="54"/></g>`:'';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="512" height="512"><title>SINAPSE / ${item.name} / estudo</title><defs>${materialDefs(theme)}</defs>${materialShape(shape,material,theme)}${guides}</svg>`;
}
