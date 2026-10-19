'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, Check, Copy, Pause, Play, RotateCcw } from 'lucide-react';
import { Symbol, Wordmark, Sculpture } from './marks';
import { ICON_NAMES, iconPaths, iconSvg } from '@/lib/si/artwork';

export function downloadText(text:string,name:string,type='image/svg+xml'){
  const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const link=document.createElement('a');link.href=url;link.download=name;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
export function CopyButton({value,label='Copiar'}:{value:string;label?:string}){
 const [status,setStatus]=useState('');
 async function copy(){try{await navigator.clipboard.writeText(value);setStatus('Copiado');}catch{setStatus('Selecione o texto para copiar.');}}
 useEffect(()=>{if(!status)return;const t=setTimeout(()=>setStatus(''),2500);return()=>clearTimeout(t);},[status]);
 return <><button className="si-button si-button-ghost" onClick={copy}>{status==='Copiado'?<Check size={13}/>:<Copy size={13}/>} {status||label}</button><span className="sr-only" role="status">{status}</span></>;
}

export function IdentityLab(){
  const [variant,setVariant]=useState('principal');const [light,setLight]=useState(false);
  return <><div className="si-control-row">{['principal','símbolo','SNPS','School','House','Growth'].map(v=><button key={v} className={variant===v?'active':''} aria-pressed={variant===v} onClick={()=>setVariant(v)}>{v==='principal'?'SINAPSE SI':v}</button>)}</div><div className={`si-identity-stage ${light?'light':''}`}>
   {variant==='símbolo'?<Symbol/>:variant==='SNPS'?<img src={`/brand/logo/${light?'vanta':'bone'}/snps-lockup.svg`} alt="Assinatura SNPS preservada" style={{width:290}}/>:<Wordmark light={light} division={variant==='principal'?'SI':variant}/>}
   <div className="si-stage-meta"><span>{variant==='principal'?'ASSINATURA PROPOSTA / MASTER PRESERVADO':variant==='SNPS'?'LEGADO / MASTER PRESERVADO':'VARIANTE DE APLICAÇÃO'}</span><span>{light?'BONE EDITION':'VANTA EDITION'}</span></div>
  </div><div className="si-control-row"><button className={!light?'active':''} onClick={()=>setLight(false)} aria-pressed={!light}>Vanta</button><button className={light?'active':''} onClick={()=>setLight(true)} aria-pressed={light}>Bone</button><a className="si-text-link" href={`/si/logos/${variant==='símbolo'?'symbol':variant==='SNPS'?'snps':variant==='principal'?'sinapse-si':variant.toLowerCase()}-${light?'vanta':'bone'}.svg`} download>Baixar SVG <ArrowDown size={13}/></a></div></>;
}

export function TypographyLab(){
 const [text,setText]=useState('O futuro começa com uma conexão.');const [family,setFamily]=useState('Inter');
 return <><div className="si-type-controls"><div><label htmlFor="type-test">Experimente uma frase</label><input id="type-test" maxLength={100} value={text} onChange={e=>setText(e.target.value)}/></div><div><label htmlFor="type-family">Expressão</label><select id="type-family" value={family} onChange={e=>setFamily(e.target.value)}><option>Inter</option><option>Audiowide</option><option>JetBrains Mono</option><option>Sora</option></select></div></div><div className="si-type-live" style={{fontFamily:family==='Audiowide'?'var(--font-wordmark)':family==='Sora'?'var(--font-display)':family==='JetBrains Mono'?'var(--font-mono)':'var(--font-sans)'}}>{text||'Digite uma frase.'}</div></>;
}

export function IconLab(){
 const [selected,setSelected]=useState('school');
 return <><div className="si-icon-grid">{ICON_NAMES.map(n=><button key={n} aria-pressed={n===selected} aria-label={`Selecionar ícone ${n}`} onClick={()=>setSelected(n)}><svg viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:iconPaths(n)}}/><span>{n.toUpperCase()}</span></button>)}</div><div className="si-icon-preview">{[24,32,48,64].map(size=><div key={size}><svg width={size} height={size} viewBox="0 0 96 64" fill="none" stroke="currentColor" strokeWidth={size<32?5:4} strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{__html:iconPaths(selected)}}/><span className="si-kicker" style={{display:'block',marginTop:12,fontSize:7}}>{size} PX</span></div>)}</div><button className="si-button si-button-ghost" onClick={()=>downloadText(iconSvg(selected),`sinapse-si-icon-${selected}.svg`)}>Baixar {selected} <ArrowDown size={13}/></button></>;
}

export function MotionLab(){
 const [motion,setMotion]=useState('connection'),[paused,setPaused]=useState(false),[run,setRun]=useState(0),[reduced,setReduced]=useState(false);
 useEffect(()=>{const m=window.matchMedia('(prefers-reduced-motion: reduce)');setReduced(m.matches);const fn=()=>setReduced(m.matches);m.addEventListener('change',fn);return()=>m.removeEventListener('change',fn);},[]);
 const labels:Record<string,string>={connection:'Conexão',reveal:'Revelação',response:'Resposta',orbit:'Órbita'};
 return <><div key={`${motion}-${run}`} className={`si-motion-stage si-play-${motion} ${paused?'paused':''}`}><Symbol/><div className="si-stage-meta"><span>{labels[motion].toUpperCase()} / {reduced?'MOVIMENTO REDUZIDO':'LIVE PREVIEW'}</span><span>ONE SIGNAL. MANY EXPRESSIONS.</span></div></div><div className="si-motion-controls"><div className="si-control-row">{Object.entries(labels).map(([v,label])=><button key={v} className={v===motion?'active':''} onClick={()=>{setMotion(v);setPaused(false);}} aria-pressed={v===motion}>{label}</button>)}<button aria-label="Repetir animação" onClick={()=>{setRun(run+1);setPaused(false);}}><RotateCcw size={13}/></button></div><button style={{marginTop:22}} aria-label={paused?'Reproduzir animação':'Pausar animação'} onClick={()=>setPaused(!paused)}>{paused?<Play size={16}/>:<Pause size={16}/>}</button></div><p className="si-small">{reduced?'Seu sistema pediu movimento reduzido. A composição permanece estática.':'A repetição contínua pertence à órbita. As demais demonstrações terminam em um estado estável; use repetir para rever.'}</p></>;
}

export function MaterialLab(){const [material,setMaterial]=useState('glass'),[paused,setPaused]=useState(false);return <><div className={`si-motion-stage ${paused?'paused':''}`}><Sculpture material={material}/><div className="si-stage-meta"><span>EXPLORAÇÃO DE MATERIAL / {material.toUpperCase()}</span><span>VETOR ORIGINAL</span></div></div><div className="si-control-row">{[['glass','Liquid / óptico'],['solid','Bone / sólido'],['carbon','Carbon / fosco']].map(([v,l])=><button key={v} className={material===v?'active':''} aria-pressed={material===v} onClick={()=>setMaterial(v)}>{l}</button>)}<button aria-label={paused?'Retomar movimento do material':'Pausar movimento do material'} onClick={()=>setPaused(!paused)}>{paused?<Play size={12}/>:<Pause size={12}/>}</button></div></>}

export function TokenExport(){
 const css=`:root {\n  --si-vanta: #0A0A0A;\n  --si-carbon: #141414;\n  --si-graphite: #262626;\n  --si-silver: #A6A6A6;\n  --si-mist: #E8E8E5;\n  --si-bone: #F5F5F0;\n  --si-white: #FFFFFF;\n  --si-radius-control: 6px;\n  --si-radius-panel: 12px;\n  --si-radius-glass: 24px;\n  --si-duration-response: 160ms;\n  --si-duration-connect: 420ms;\n  --si-duration-reveal: 720ms;\n  --si-ease: cubic-bezier(.22,1,.36,1);\n}\nh1,h2 { text-wrap: balance; }\np { text-wrap: pretty; }\n@media(prefers-reduced-motion:reduce) {\n  *,*::before,*::after { animation: none!important; transition:none!important; }\n}`;
 return <><pre className="si-copy-code">{css}</pre><div className="si-control-row"><CopyButton value={css} label="Copiar CSS"/><button className="si-button si-button-ghost" onClick={()=>downloadText(css,'sinapse-si-tokens.css','text/css')}>Baixar CSS <ArrowDown size={13}/></button></div></>;
}
