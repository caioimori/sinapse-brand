'use client';
import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, Copy, RotateCcw } from 'lucide-react';
import { sequenceT04 } from '@/data/si/brand';
import { FORMAT_SIZES, makeArtwork, type ArtFormat, type ArtOptions } from '@/lib/si/artwork';
import { WORDMARK_PATHS } from '@/lib/si/master';
import { downloadText } from './widgets';

const formatNames:Record<ArtFormat,string>={carousel:'Carrossel · 4:5',story:'Story · 9:16',post:'Post · 1:1',avatar:'Avatar · 1:1',cover:'Capa Member · 2:3',banner:'Capa horizontal · 16:9'};
const initial:ArtOptions={format:'carousel',theme:'dark',family:'class',division:'School',title:sequenceT04[0].title,body:sequenceT04[0].body,eyebrow:sequenceT04[0].eyebrow,footer:'sinapse.si/school',page:1,total:6,tool:'supabase',material:'glass',titleFont:'reading'};
const extraFrames=[
 {eyebrow:'05 · PROCESSO',title:'Uma ideia por vez. Um projeto para praticar.',body:'Defina um problema, reúna o contexto e comece por uma entrega pequena.'},
 {eyebrow:'06 · CRITÉRIO',title:'Aprender também é saber avaliar.',body:'Confira o que a ferramenta produziu e revise antes de usar.'},
 {eyebrow:'07 · COMUNIDADE',title:'Aprenda junto e compartilhe o caminho.',body:'Encontros em grupo para explorar dúvidas e conectar repertórios.'},
 {eyebrow:'08 · CONTINUIDADE',title:'Volte à aula. Continue o projeto.',body:'Aulas gravadas ficam na área de membros após o ingresso na School.'},
];
const frameDraft=(o:ArtOptions)=>({title:o.title,body:o.body,eyebrow:o.eyebrow,tool:o.tool,family:o.family,theme:o.theme,division:o.division,material:o.material,titleFont:o.titleFont});
export function TemplateEditor({preset='carousel'}:{preset?:ArtFormat}){
 const base={...initial,format:preset,...(preset==='avatar'?{title:'T04',body:'',eyebrow:'COMMUNITY',total:1}:preset==='cover'?{title:'Pensar com inteligência.',body:'Fundamentos e contexto',eyebrow:'FUNDAMENTOS / AULA 01',total:1}: {})};
 const [options,setOptions]=useState<ArtOptions>(base),[drafts,setDrafts]=useState<Record<number,Partial<ArtOptions>>>({}),[status,setStatus]=useState(''),[uploadName,setUploadName]=useState('');
 const [previewFont,setPreviewFont]=useState('');
 useEffect(()=>{let active=true;fetch('/si-v2/fonts/export.css').then(r=>r.ok?r.text():'').then(css=>{if(active)setPreviewFont(css);}).catch(()=>{});return()=>{active=false;};},[]);
 const svg=useMemo(()=>makeArtwork(options,WORDMARK_PATHS,previewFont),[options,previewFont]);
 const preview=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
 const [width,height]=FORMAT_SIZES[options.format];
 function edit(p:Partial<ArtOptions>){setOptions(o=>({...o,...p}));setStatus('');}
 function changeFormat(format:ArtFormat){
  const multiple=format==='carousel'||format==='story';
  edit({format,page:1,total:multiple?6:1,...(format==='avatar'?{title:'T04',body:'',eyebrow:'COMMUNITY'}:format==='cover'?{title:'Pensar com inteligência.',body:'Fundamentos e contexto',eyebrow:'FUNDAMENTOS / AULA 01'}:multiple?{title:sequenceT04[0].title,body:sequenceT04[0].body,eyebrow:sequenceT04[0].eyebrow}:{})});setDrafts({});
 }
 function changeTotal(total:number){
  const saved={...drafts,[options.page]:frameDraft(options)};
  if(options.total===6&&total===10){if(saved[6])saved[10]=saved[6];delete saved[6];}
  if(options.total===10&&total===6){if(saved[10])saved[6]=saved[10];for(let i=7;i<=10;i++)delete saved[i];}
  setDrafts(saved);edit({total,page:1,...sequenceT04[0],...saved[1]});
 }
 function frame(n:number){
  setDrafts(d=>({...d,[options.page]:frameDraft(options)}));
  const seq=options.total===10?[...sequenceT04.slice(0,5),...extraFrames,sequenceT04[5]]:sequenceT04;
  const entry=seq[n-1]||seq[0];edit({page:n,title:entry.title,body:entry.body,eyebrow:entry.eyebrow,...drafts[n]});
 }
 async function fontStyle(){
  // SVG is self contained; open fonts remain text and are embedded for portability.
  const response=await fetch('/si-v2/fonts/export.css');if(!response.ok)throw new Error('Não foi possível carregar a fonte para exportação.');return response.text();
 }
 async function exportSvg(){try{setStatus('Preparando SVG com fonte incorporada…');const font=await fontStyle();const text=makeArtwork({...options,safe:false},WORDMARK_PATHS,font);downloadText(text,`sinapse-si-04-${options.format}-${String(options.page).padStart(2,'0')}.svg`);setStatus('SVG exportado com fontes incorporadas e lettering em curvas.');}catch{setStatus('Não foi possível exportar agora. Tente novamente.');}}
 async function exportPng(){
  try{
   setStatus('Preparando PNG no tamanho original…');const font=await fontStyle();const source=makeArtwork({...options,safe:false},WORDMARK_PATHS,font);const blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const image=new Image();
   try{await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error('decode'));image.src=url;});const canvas=document.createElement('canvas');canvas.width=width;canvas.height=height;const context=canvas.getContext('2d');if(!context)throw new Error('canvas');context.drawImage(image,0,0);const png=await new Promise<Blob>((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error('png')),'image/png'));const output=URL.createObjectURL(png);const a=document.createElement('a');a.href=output;a.download=`sinapse-si-04-${options.format}-${String(options.page).padStart(2,'0')}-${width}x${height}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(output),1000);setStatus(`PNG exportado em ${width} × ${height} px.`);}finally{URL.revokeObjectURL(url);}
  }catch{setStatus('Não foi possível gerar o PNG. O SVG continua disponível.');}
 }
 async function upload(file?:File){
  if(!file)return;if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>3*1024*1024){setStatus('Use PNG, JPEG ou WebP de até 3 MB.');return;}
  const reader=new FileReader();reader.onload=()=>{edit({clientLogo:String(reader.result)});setUploadName(file.name);};reader.onerror=()=>setStatus('Não foi possível ler o arquivo.');reader.readAsDataURL(file);
 }
 function exportBrief(){const seq=options.total===10?[...sequenceT04.slice(0,5),...extraFrames,sequenceT04[5]]:sequenceT04;downloadText(JSON.stringify({brand:'SINAPSE SI',status:'proposta_editavel',format:options.format,size:[width,height],settings:{...options,clientLogo:undefined},frames:seq.slice(0,options.total).map((s,i)=>({page:i+1,...s,...drafts[i+1],...(i+1===options.page?frameDraft(options):{})}))},null,2),'sinapse-si-04-sequencia.json','application/json');setStatus('Sequência exportada em JSON editável.');}
 return <div className="si-editor">
  <div className="si-editor-controls"><div><span className="si-kicker">SINAPSE / STUDIO 04</span><h3>Ideia em forma de post.</h3></div>
   <div className="si-editor-field"><label className="si-field-label" htmlFor="art-format">Formato</label><select id="art-format" value={options.format} onChange={e=>changeFormat(e.target.value as ArtFormat)}>{Object.entries(formatNames).map(([v,l])=><option value={v} key={v}>{l}</option>)}</select></div>
   {options.format==='cover'&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-module">Número do módulo</label><input id="art-module" type="number" min="1" max="99" value={options.page} onChange={e=>edit({page:Math.max(1,Math.min(99,Number(e.target.value)||1))})}/></div>}
   <div className="si-editor-field"><label className="si-field-label" htmlFor="art-division">Assinatura</label><select id="art-division" value={options.division} onChange={e=>edit({division:e.target.value})}>{['SI','School','House','Growth'].map(v=><option key={v}>{v}</option>)}</select></div>
   <div className="si-editor-field"><span className="si-field-label">Edição</span><div className="si-segmented"><button className={options.theme==='dark'?'active':''} aria-pressed={options.theme==='dark'} onClick={()=>edit({theme:'dark'})}>Vanta</button><button className={options.theme==='light'?'active':''} aria-pressed={options.theme==='light'} onClick={()=>edit({theme:'light'})}>Bone</button></div></div>
   {!['avatar','cover'].includes(options.format)&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-family">Família</label><select id="art-family" value={options.family} onChange={e=>edit({family:e.target.value as ArtOptions['family']})}><option value="signal">Manifesto / marca</option><option value="notes">Caderno / repertório</option><option value="class">Convite / T04</option><option value="proof">Em produção / projeto</option><option value="flow">Fluxo / camadas</option></select></div>}
   {options.format!=='avatar'&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-tool">Ferramenta em destaque</label><select id="art-tool" value={options.tool||''} onChange={e=>edit({tool:e.target.value})}><option value="">Sem ferramenta</option>{['supabase','figma','obsidian','n8n','warp','hostinger','docker','vercel','github'].map(v=><option value={v} key={v}>{v}</option>)}</select></div>}
   {options.format!=='avatar'&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-eyebrow">Rótulo</label><input id="art-eyebrow" value={options.eyebrow} maxLength={42} onChange={e=>edit({eyebrow:e.target.value})}/></div>}
   <div className="si-editor-field"><label className="si-field-label" htmlFor="art-material">Material da marca</label><select id="art-material" value={options.material||'glass'} onChange={e=>edit({material:e.target.value as ArtOptions['material']})}><option value="glass">Liquid Glass / vetor</option><option value="crystal">SNPS 3D / transparente</option><option value="frost">Vitrificado</option><option value="silver">Prateado</option><option value="solid">Sólido</option></select></div>
   {options.format!=='avatar'&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-title-font">Fonte do título</label><select id="art-title-font" value={options.titleFont||'reading'} onChange={e=>edit({titleFont:e.target.value as ArtOptions['titleFont']})}><option value="reading">Manrope / leitura</option><option value="display">SNPS Display / marca</option></select></div>}
   <div className="si-editor-field"><label className="si-field-label" htmlFor="art-title">{options.format==='avatar'?'Turma / grupo':'Título'}</label><textarea id="art-title" value={options.title} maxLength={options.format==='avatar'?22:115} onChange={e=>edit({title:e.target.value})} rows={3}/><small>{options.title.length}/{options.format==='avatar'?22:115} caracteres</small></div>
   {options.format!=='avatar'&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-body">Texto de apoio</label><textarea id="art-body" value={options.body} maxLength={220} onChange={e=>edit({body:e.target.value})} rows={3}/></div>}
   {options.format==='avatar'&&<><div className="si-editor-field"><label className="si-field-label" htmlFor="art-partner">Cliente / parceiro (opcional)</label><input id="art-partner" maxLength={36} value={options.partnerName||''} onChange={e=>edit({partnerName:e.target.value})}/><small>Sem arquivo, a prévia usa iniciais identificadas como exemplo.</small></div><div className="si-editor-field"><label className="si-field-label" htmlFor="art-logo">Logo do cliente</label><input id="art-logo" type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>upload(e.target.files?.[0])}/><small>{uploadName||'O arquivo é lido somente neste navegador.'}</small>{options.clientLogo&&<><label className="si-field-label" htmlFor="art-logo-scale" style={{marginTop:17}}>Escala óptica / {Math.round((options.clientScale||1)*100)}%</label><input id="art-logo-scale" type="range" min="0.6" max="1.4" step="0.05" value={options.clientScale||1} onChange={e=>edit({clientScale:Number(e.target.value)})} style={{padding:0,minHeight:24}}/><small>Prefira PNG transparente e ajuste o peso visual dos dois sinais.</small></>}{options.clientLogo&&<button className="si-text-link" onClick={()=>{edit({clientLogo:undefined});setUploadName('');}}>Retirar logo da composição</button>}</div></>}
   {['carousel','story'].includes(options.format)&&<div className="si-editor-field"><label className="si-field-label" htmlFor="art-total">Sequência</label><select id="art-total" value={options.total} onChange={e=>changeTotal(Number(e.target.value))}><option value={6}>6 telas / versão curta</option><option value={10}>10 telas / versão completa</option></select><div className="si-artwork-thumbs">{Array.from({length:options.total},(_,i)=><button key={i} aria-label={`Editar tela ${i+1}`} aria-pressed={options.page===i+1} className={options.page===i+1?'active':''} onClick={()=>frame(i+1)}>{String(i+1).padStart(2,'0')}</button>)}</div></div>}
   <div className="si-editor-field"><label className="si-field-label" htmlFor="art-footer">Destino / rodapé</label><input id="art-footer" maxLength={50} value={options.footer} onChange={e=>edit({footer:e.target.value})}/></div>
   <label className="si-editor-check"><input type="checkbox" checked={!!options.safe} onChange={e=>edit({safe:e.target.checked})}/>Ver área de segurança</label>
   <div className="si-editor-actions"><button className="si-button si-button-primary" onClick={exportPng}>Exportar PNG <ArrowDown size={13}/></button><button className="si-button si-button-ghost" onClick={exportSvg}>SVG editável <ArrowDown size={13}/></button><button className="si-button si-button-ghost" onClick={exportBrief}>Sequência JSON <Copy size={12}/></button><button className="si-button si-button-ghost" onClick={()=>{setOptions(base);setDrafts({});setUploadName('');setStatus('Composição restaurada.');}}>Restaurar exemplo <RotateCcw size={12}/></button></div><p className="si-editor-status" role="status" aria-live="polite">{status}</p>
  </div>
  <div className="si-editor-preview-area"><span className="si-kicker">PRÉVIA AO VIVO / COMPOSIÇÃO EDITÁVEL</span><div className="si-editor-preview" style={{maxWidth:options.format==='story'?290:options.format==='cover'?330:440,borderRadius:options.format==='avatar'?'50%':3}}><img src={preview} width={width} height={height} alt={`Prévia: ${options.title}`}/></div><div className="si-editor-preview-meta"><span>{width} × {height} PX</span><span>{options.theme==='dark'?'VANTA':'BONE'} / {{class:'CONVITE',notes:'CADERNO',signal:'MANIFESTO',proof:'EM PRODUÇÃO',flow:'FLUXO'}[options.family]}</span></div><p className="si-small" style={{maxWidth:440,fontSize:9}}>A guia de segurança aparece somente na prévia. Downloads preservam o formato completo; confira condições comerciais e direitos de imagens antes de publicar.</p></div>
 </div>;
}
