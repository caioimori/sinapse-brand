'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronRight, Menu, X } from 'lucide-react';
import { chapters } from '@/data/si/brand';
import { Wordmark, Symbol } from './marks';
import './si.css';

export function Shell({children}:{children:React.ReactNode}) {
  const path=usePathname(); const [open,setOpen]=useState(false);
  useEffect(()=>{if(!open)return;const key=(event:KeyboardEvent)=>{if(event.key==='Escape'){setOpen(false);document.querySelector<HTMLButtonElement>('.si-menu-toggle')?.focus();}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);},[open]);
  const current=chapters.findIndex(c=>path===`/studio/${c.slug}`);
  return <div className="si-root">
    <a className="si-skip" href="#si-main">Ir para o conteúdo</a>
    <header className="si-header">
      <Link href="/" className="si-home-link" aria-label="SINAPSE SI, início" onClick={()=>setOpen(false)}><Wordmark/></Link>
      <span className="si-header-label">BRAND SYSTEM <span>VOL. 01 / 2026</span></span>
      <a className="si-header-download" href="/si/SINAPSE-SI-Brandbook.pdf" download><span>Brand book</span><ArrowDown size={15}/></a>
      <button className="si-menu-toggle" aria-expanded={open} aria-controls="si-navigation" aria-label={open?'Fechar navegação':'Abrir navegação'} onClick={()=>setOpen(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
    </header>
    <aside className={`si-sidebar ${open?'is-open':''}`} id="si-navigation">
      <nav aria-label="Capítulos do brand book">
        <Link className={`si-index-link ${path==='/'?'active':''}`} href="/" onClick={()=>setOpen(false)}>Visão geral <ArrowUpRight size={12}/></Link>
        {['A marca','O sistema','Na prática','Recursos'].map(group=><div className="si-nav-group" key={group}><span className="si-nav-label">{group}</span>{chapters.filter(c=>c.group===group).map(c=><Link key={c.slug} href={`/studio/${c.slug}`} aria-current={path===`/studio/${c.slug}`?'page':undefined} onClick={()=>setOpen(false)}><span>{c.n}</span>{c.title}<ChevronRight size={11}/></Link>)}</div>)}
      </nav>
      <div className="si-sidebar-bottom"><span className="si-live-dot"/> Um sistema em evolução.<small>PROPOSTA 1.0 · 16 OUT 2026</small></div>
    </aside>
    {open&&<button className="si-nav-scrim" aria-label="Fechar navegação" onClick={()=>setOpen(false)}/>}
    <main className="si-main" id="si-main" tabIndex={-1}>{children}
      {current>=0&&<div className="si-next"><div><span className="si-kicker">{current===chapters.length-1?'DE VOLTA AO COMEÇO':'CONTINUE EXPLORANDO'}</span><Link href={current===chapters.length-1?'/':`/studio/${chapters[current+1].slug}`}>{current===chapters.length-1?'Visão geral':chapters[current+1].title}<ArrowUpRight/></Link></div><span className="si-page-no">{chapters[current].n} / 14</span></div>}
      <footer className="si-footer"><Symbol/><p>A nova era da Super Intelligence.</p><span>© SINAPSE SI · 2026</span><a href="https://sinapse.si/" target="_blank" rel="noreferrer">sinapse.si <ArrowUpRight size={11}/></a></footer>
    </main>
  </div>;
}

export function PageIntro({n,kicker,title,description}:{n:string;kicker:string;title:string;description:string}){
  return <header className="si-page-intro"><div className="si-page-intro-meta"><span className="si-kicker">{kicker}</span><span className="si-kicker">CHAPTER {n} / 14</span></div><h1>{title}</h1><p>{description}</p></header>;
}
export function Section({label,title,children,className='',id}:{label?:string;title?:string;children:React.ReactNode;className?:string;id?:string}){
  return <section className={`si-section ${className}`} id={id}>{label&&<span className="si-kicker">{label}</span>}{title&&<h2>{title}</h2>}{children}</section>;
}
