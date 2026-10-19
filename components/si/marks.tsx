import { useId, type CSSProperties } from 'react';

// Path preserved byte-for-byte from the existing symbol master.
export const SYMBOL_PATH = 'M114.74,33.28h-28.28c-6.08,0-11.9,2.83-15.38,7.82-.28.4-.53.8-.74,1.18-1.1,2-1.96,4.28-2.58,6.83-1.08,4.45-5,7.62-9.58,7.62h-13.17c-6.48,0-11.72,5.25-11.72,11.72s5.25,11.73,11.72,11.73h28.27c6.08,0,11.9-2.83,15.38-7.82.29-.4.54-.8.75-1.18,1.09-1.99,1.95-4.27,2.57-6.82,1.09-4.45,5.01-7.63,9.59-7.63h13.17c6.48,0,11.73-5.25,11.73-11.73s-5.25-11.72-11.73-11.72Z';

export function Symbol({className='',label,style}:{className?:string;label?:string;style?:CSSProperties}) {
  return <svg viewBox="28 28 104 58" className={className} style={style} role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true}><path d={SYMBOL_PATH} fill="currentColor"/></svg>;
}

export function DivisionMark({division,className=''}:{division:string;className?:string}) {
  return <svg viewBox="0 0 96 64" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
    {division==='school'?<><path d="M10 32c12-26 28-26 38 0s26 26 38 0M10 32c12 26 28 26 38 0s26-26 38 0"/></>:division==='house'?<><path d="M8 14h25l15 18-15 18H8M88 14H63L48 32l15 18h25"/><path d="M36 32h24"/></>:<><path d="M10 52h24V36h24V20h28M68 8h18v24"/></>}
  </svg>;
}

export function Wordmark({light=false,division,className=''}:{light?:boolean;division?:string;className?:string}) {
  return <span className={`si-wordmark ${className}`}><img src={`/brand/logo/${light?'vanta':'bone'}/sinapse-wordmark.svg`} alt="SINAPSE"/><span className="si-suffix">{division||'SI'}</span></span>;
}

export function Sculpture({material='glass',className=''}:{material?:string;className?:string}) {
  const id=useId().replace(/:/g,'');
  return <div className={`si-sculpture si-material-${material} ${className}`} aria-hidden="true">
    <div className="si-orbit si-orbit-a"/><div className="si-orbit si-orbit-b"/>
    <svg viewBox="0 0 640 410" className="si-sculpture-svg">
      <defs>
        <linearGradient id={`${id}face`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff" stopOpacity=".88"/><stop offset=".17" stopColor="#7c7c7c" stopOpacity=".26"/><stop offset=".39" stopColor="#f5f5f0" stopOpacity=".78"/><stop offset=".47" stopColor="#171717" stopOpacity=".8"/><stop offset=".69" stopColor="#d4d4d4" stopOpacity=".6"/><stop offset=".9" stopColor="#fff" stopOpacity=".9"/><stop offset="1" stopColor="#777" stopOpacity=".5"/></linearGradient>
        <linearGradient id={`${id}edge`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff"/><stop offset=".24" stopColor="#676767"/><stop offset=".5" stopColor="#121212"/><stop offset=".78" stopColor="#c9c9c9"/><stop offset="1" stopColor="#323232"/></linearGradient>
        <filter id={`${id}shadow`} x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dx="8" dy="22" stdDeviation="14" floodColor="#000" floodOpacity=".55"/></filter>
      </defs>
      <g transform="translate(-67 -80) scale(4.85) rotate(-8 80 56)" filter={`url(#${id}shadow)`}>
        {[5,4,3,2,1].map(n=><path key={n} d={SYMBOL_PATH} transform={`translate(0 ${n*.85})`} fill={`url(#${id}edge)`} stroke="#a6a6a6" strokeWidth=".08"/>)}
        <path className="si-sculpture-face" d={SYMBOL_PATH} fill={`url(#${id}face)`} stroke="#f5f5f0" strokeOpacity=".75" strokeWidth=".35"/>
        <path d={SYMBOL_PATH} fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth=".16" transform="translate(.2 -.4)"/>
      </g>
    </svg>
    <span className="si-sculpture-point si-point-a"/><span className="si-sculpture-point si-point-b"/>
  </div>;
}
