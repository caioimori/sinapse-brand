'use client';
import { useRef, useState } from 'react';
import pages from '@/data/si/book-v5.json';
export function BookReader(){
 const [page,setPage]=useState(0);const dialog=useRef<HTMLDialogElement>(null);
 const go=(n:number)=>setPage(Math.max(0,Math.min(pages.length-1,n)));
 return <section className="v3-reader" aria-label="Leitor do brandbook" onKeyDown={e=>{if(e.target instanceof HTMLInputElement||e.target instanceof HTMLSelectElement)return;if(e.key==='ArrowRight'){e.preventDefault();go(page+1);}if(e.key==='ArrowLeft'){e.preventDefault();go(page-1);}}} tabIndex={0}>
 <div className="v3-reader-toolbar"><label htmlFor="book-page"><span>Consultar página</span><select aria-label="Consultar página" id="book-page" value={page} onChange={e=>go(Number(e.target.value))}>{pages.map((p,i)=><option value={i} key={p.file}>{String(i+1).padStart(2,'0')} · {p.title}</option>)}</select></label><div><button aria-label="Página anterior" disabled={page===0} onClick={()=>go(page-1)}>←</button><span aria-live="polite">{String(page+1).padStart(2,'0')} / {pages.length}</span><button aria-label="Próxima página" disabled={page===pages.length-1} onClick={()=>go(page+1)}>→</button></div><button onClick={()=>dialog.current?.showModal()} className="v2-text-link">Ampliar ↗</button></div>
 <div className="v3-reader-grid"><nav className="v3-reader-index" aria-label="Páginas do documento">{pages.map((p,i)=><button key={p.file} onClick={()=>go(i)} aria-current={page===i?'page':undefined}><img src={p.file} alt="" loading="lazy"/><span><small>{String(i+1).padStart(2,'0')}</small>{p.title}</span></button>)}</nav><div className="v3-reader-page"><img src={pages[page].file} width="1920" height="1080" alt={`Página ${page+1}: ${pages[page].title}`}/><p>{pages[page].title}</p></div></div>
 <div className="v3-reader-footer"><p>Documento 1920 × 1080 · Use ← e → para folhear.</p><a href="/si-v2/SINAPSE-SI-Brandbook-05.pdf" download className="v2-text-link">Baixar PDF completo ↓</a></div>
 <dialog ref={dialog} className="v3-reader-dialog" aria-label="Página ampliada"><div><strong>{String(page+1).padStart(2,'0')} · {pages[page].title}</strong><button onClick={()=>dialog.current?.close()} aria-label="Fechar ampliação">Fechar ×</button></div><section><img src={pages[page].file} alt={`Página ampliada: ${pages[page].title}`}/></section></dialog>
 </section>;
}
