'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useState } from 'react';
import { chapters } from '@/data/si/brand';
import './system.css';
import './editorial-system.css';

export function BrandShell({children}:{children:React.ReactNode}){
 const path=usePathname();const [theme,setTheme]=useState<'dark'|'light'>('dark');const [menu,setMenu]=useState(false);const [motion,setMotion]=useState(true);const [ready,setReady]=useState(false);
 useLayoutEffect(()=>{try{const t=localStorage.getItem('snps-v2-theme');if(t==='light')setTheme(t);}catch{}setReady(true);},[]);
 useEffect(()=>{if(!menu)return;const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMenu(false);document.querySelector<HTMLButtonElement>('.v2-menu-button')?.focus();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[menu]);
 function toggleTheme(){const next=theme==='dark'?'light':'dark';setTheme(next);document.documentElement.dataset.siMode=next;try{localStorage.setItem('snps-v2-theme',next);}catch{}}
 return <div className="v2-root" data-theme={theme} data-motion={motion?'on':'off'} data-ready={ready?'true':'false'}>
  <a href="#v2-main" className="v2-skip">Ir para o conteúdo</a>
  <header className="v2-topbar"><Link href="/" onClick={()=>setMenu(false)} aria-label="SINAPSE SI, início" className="v2-header-brand"><img src={`/si-v2/logos/snps-si-solid-${theme}.svg`} alt="SNPS SI"/></Link><nav aria-label="Navegação principal"><Link href="/book">Brandbook</Link><Link href="/studio/identity" aria-current={path==='/studio/identity'?'page':undefined}>Identidade</Link><Link href="/studio/surfaces">Matéria</Link><Link href="/studio/editorial">Expressão</Link><Link href="/studio/wear">Collection</Link></nav><div className="v2-header-actions"><button className="v2-theme" onClick={toggleTheme} aria-label={theme==='dark'?'Ativar modo claro':'Ativar modo escuro'} title={theme==='dark'?'Light Mode':'Dark Mode'}><span aria-hidden="true">{theme==='dark'?'◐':'◑'}</span></button><button className="v2-menu-button" aria-label={menu?'Fechar índice':'Abrir índice'} aria-expanded={menu} aria-controls="v2-index" onClick={()=>setMenu(!menu)}>{menu?'Fechar':'Índice'} <span aria-hidden="true">{menu?'−':'+'}</span></button></div></header>
  {menu&&<div className="v2-menu" id="v2-index"><div className="v2-menu-top"><span>O universo SINAPSE</span><button onClick={()=>setMenu(false)} aria-label="Fechar painel">×</button></div><div className="v2-menu-grid">{chapters.map(c=><Link href={`/studio/${c.slug}`} key={c.slug} onClick={()=>setMenu(false)}><small>{c.n}</small>{c.title}<span>↗</span></Link>)}</div><Link href="/studio/symbol" onClick={()=>setMenu(false)} className="v2-text-link">S circular original ↗</Link><Link href="/" onClick={()=>setMenu(false)} className="v2-text-link">Visão geral ↗</Link></div>}
  <main id="v2-main" className="v2-main" tabIndex={-1}>{children}</main>
  <footer className="v2-footer"><div className="v2-footer-giant"><img src={`/si-v2/logos/snps-solid-${theme}.svg`} alt="SNPS"/></div><div className="v2-footer-row"><span>SINAPSE SI<br/><small>Super Intelligence.</small></span><Link href="/studio/downloads">Arquivos da marca ↗</Link><button onClick={()=>setMotion(!motion)} aria-pressed={!motion}>{motion?'Pausar efeitos':'Ativar efeitos'} {motion?'Ⅱ':'▷'}</button><span>Brand world · Edição 07<br/><small>© 2026 SINAPSE</small></span></div></footer>
 </div>;
}
export function Intro({n,title,description}:{n:string;title:string;description:string}){return <header className="v2-intro v2-container"><span className="v2-eyebrow">Brand world / {n}</span><h1>{title}</h1><p>{description}</p></header>;}
export function Block({label,title,children,className=''}:{label?:string;title?:string;children:React.ReactNode;className?:string}){return <section className={`v2-block v2-container ${className}`}>{label&&<span className="v2-eyebrow">{label}</span>}{title&&<h2>{title}</h2>}{children}</section>;}
export function Signature({division='si',material='solid',theme='dark',className=''}:{division?:string;material?:string;theme?:string;className?:string}){return <img className={`v2-signature ${className}`} src={`/si-v2/logos/snps-${division.toLowerCase()}-${material}-${theme}.svg`} alt={`SNPS ${division==='si'?'SI':division}`}/>;}
