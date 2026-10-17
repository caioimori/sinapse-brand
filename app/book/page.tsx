import { BrandShell, Intro, Block } from '@/components/si-v2/shell';
import { BookReader } from '@/components/si-v2/book-reader';
import Link from 'next/link';
import '@/components/si-v2/symbol-study.css';
export default function Book(){return <BrandShell><div className="v3-book-page"><Intro n="05 / Documento" title="A marca, página por página." description="Princípios, identidade, fonte, materiais e aplicações. Um documento para consultar, revisar e criar a próxima peça."/><Block><div className="s6-book-note"><p><strong>Símbolo em estudo.</strong> O grafismo Passagem da edição 05 foi retirado da direção atual. Os novos caminhos têm conceito, construção e provas de redução num documento próprio.</p><Link href="/studio/symbol" className="v2-text-link">Comparar os novos símbolos ↗</Link></div><BookReader/></Block></div></BrandShell>;}
