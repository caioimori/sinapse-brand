import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Plus } from 'lucide-react';
import { chapters, pillars } from '@/data/si/brand';
import { Shell, Section } from './shell';
import { Sculpture, DivisionMark, Symbol } from './marks';

export function BrandHome(){return <Shell>
  <section className="si-hero">
    <div className="si-hero-top"><span className="si-kicker"><i className="si-live-dot"/> THE SINAPSE SI BRAND SYSTEM</span><span className="si-kicker si-hero-edition">A NEW CONNECTION / 001</span></div>
    <div className="si-hero-copy"><h1>Inteligência<br className="si-desktop-break"/> que nos <em>conecta.</em></h1><p>A expressão de uma nova era.<br/>Um sistema para tudo o que vem depois.</p><Link href="/studio/strategy" className="si-button si-button-primary">Explore a marca <ArrowUpRight size={17}/></Link></div>
    <div className="si-hero-object"><Sculpture/><div className="si-object-caption"><span>FIG. 001 — THE CONNECTION</span><span>FORM. LIGHT. INTELLIGENCE.</span></div></div>
    <div className="si-hero-bottom"><span>ESTRATÉGIA. IDENTIDADE. EXPRESSÃO.</span><a href="#universo">UM UNIVERSO PARA EXPLORAR <ArrowDown size={13}/></a></div>
  </section>
  <section className="si-manifesto" id="universo"><span className="si-kicker">01 / UMA NOVA CONEXÃO</span><div><h2>Uma inteligência.<br/><span>Infinitas possibilidades.</span></h2><p>A SINAPSE conecta tecnologia, educação e crescimento para ampliar a capacidade de criar, decidir e executar. Este é o sistema que dá forma a essa visão.</p><Link className="si-text-link" href="/studio/strategy">Conheça a essência <ArrowUpRight size={14}/></Link></div><Symbol className="si-manifesto-symbol"/></section>
  <Section label="02 / TRÊS CAMINHOS. UMA MARCA." title="Aprender. Construir. Crescer.">
    <div className="si-division-grid">{pillars.map(p=><Link href="/studio/architecture" className={`si-division-card si-division-${p.key}`} key={p.key}><span className="si-kicker">SINAPSE {p.name.toUpperCase()}</span><DivisionMark division={p.key}/><div><h3>{p.verb}</h3><p>{p.descriptor}</p></div><ArrowUpRight className="si-card-arrow" size={17}/></Link>)}</div>
  </Section>
  <section className="si-home-feature"><div className="si-feature-preview"><span className="si-kicker">OPEN CLASS / T04</span><span className="si-feature-t04">T04<span>↗</span></span><span className="si-feature-preview-title">O seu próximo<br/>passo começa aqui.</span><span className="si-mini-pill">SINAPSE SCHOOL <Plus size={12}/></span></div><div className="si-feature-copy"><span className="si-kicker">03 / CRIADO PARA SER USADO</span><h2>Da identidade<br/>à próxima peça.</h2><p>Carrosséis, stories, posts, avatares e capas. Um studio para editar, experimentar e exportar a marca com consistência.</p><Link href="/studio/studio" className="si-button si-button-primary">Abrir Template Studio <ArrowUpRight size={17}/></Link><span className="si-feature-caption">EDITÁVEL · MONOCROMÁTICO · CONECTADO</span></div></section>
  <Section label="04 / O SISTEMA COMPLETO" title="Tudo parte daqui."><div className="si-chapter-list">{chapters.map(c=><Link href={`/studio/${c.slug}`} key={c.slug}><span>{c.n}</span><h3>{c.title}</h3><p>{c.sub}</p><ArrowUpRight size={18}/></Link>)}</div></Section>
  <section className="si-closing"><Symbol/><span className="si-kicker">LESS NOISE. MORE INTELLIGENCE.</span><h2>O futuro tem<br/>muitas formas.<br/><span>Esta é a nossa.</span></h2><Link href="/studio/downloads" className="si-button si-button-primary">Leve a marca com você <ArrowDown size={16}/></Link></section>
</Shell>}
