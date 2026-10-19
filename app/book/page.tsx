import { BrandShell, Intro, Block } from '@/components/si-v2/shell';
import { BookReader } from '@/components/si-v2/book-reader';
import Link from 'next/link';
import '@/components/si-v2/symbol-study.css';
export default function Book(){return <BrandShell><div className="v3-book-page"><Intro n="06 / Documento" title="A marca, página por página." description="Princípios, identidade, fonte, materiais e aplicações. Um documento para consultar, revisar e criar a próxima peça."/><Block><div className="s6-book-note"><p><strong>Edição 06.</strong> O grafismo entre ideia e ação foi retirado das páginas e das aplicações atuais. Os dois logos originais permanecem.</p><Link href="/studio/symbol" className="v2-text-link">Examinar a origem do traço ↗</Link></div><BookReader/></Block></div></BrandShell>;}
