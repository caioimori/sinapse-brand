import Link from 'next/link';
import { BrandShell, Block } from './shell';
import { ToolField, MaterialRoom } from './labs';
import { DirectionStatement, BrandProof, ApplicationGallery, ApplicationContext } from './brand-world';
export function BrandHome(){return <BrandShell>
 <section className="v2-home-hero"><div className="v2-hero-copy"><span className="v2-eyebrow">SINAPSE / SUPER INTELLIGENCE</span><h1>Uma nova<br/><em>dimensão.</em></h1><p>O mesmo sinal. Um universo de possibilidades.</p><Link className="v2-button v2-button-glass" href="/studio/identity">Explore a nova identidade <span>↗</span></Link></div><div className="v2-hero-image"><img src="/si-v2/hero.webp" alt="Estudo do logo SNPS em vidro óptico sobre superfície escura"/><span className="v2-hero-shine"/></div><div className="v2-hero-caption"><span>Forma familiar. Presença inédita.</span><a href="#brand-world">Conheça o sistema ↓</a></div></section>

 <DirectionStatement/>
 <Block label="01 / A marca em uso" title="Uma origem. Muitos registros."><ApplicationGallery compact/></Block>
 <BrandProof/>
 <Block label="02 / Luz como linguagem" title="A forma fica. A matéria responde."><MaterialRoom compact/><Link className="v2-text-link" href="/studio/surfaces">Explore o sistema de materiais ↗</Link></Block>
 <ApplicationContext/>
 <section className="v2-color-story v2-container"><div><span className="v2-eyebrow">03 / Repertório em contexto</span><h2>O palco é nosso.<br/>As cores,<br/><em>de quem cria.</em></h2><p>Preto e branco organizam a marca. As ferramentas aparecem com sua identidade, no assunto certo e com espaço para respirar.</p><Link href="/studio/architecture" className="v2-text-link">Explore o ecossistema ↗</Link></div><ToolField/></section>
 <Block><div className="v4-book-promo"><div><span className="v2-eyebrow">BRAND GUIDELINES / EDIÇÃO 04</span><h2>O desenho.<br/>A intenção.<br/>O próximo uso.</h2><p>Identidade, construção tipográfica, matéria, movimento e aplicações. Um livro para consultar e uma linguagem para continuar criando.</p><Link href="/book" className="v2-button v2-button-glass">Folhear o brandbook <span>↗</span></Link></div><Link href="/book" aria-label="Abrir o brandbook"><img src="/si-v2/book-v4/page-01.webp" alt="Capa do novo brandbook SINAPSE SI"/></Link></div></Block>
 </BrandShell>;}
