import fs from 'node:fs';import assert from 'node:assert/strict';import {loadArtwork} from './si-artwork-runtime.mjs';
const metrics=JSON.parse(fs.readFileSync('public/si-v2/manrope-metrics.json'));const masters=JSON.parse(fs.readFileSync('public/si/masters.json'));
const {makeArtwork,wrapPixels,FORMAT_SIZES}=loadArtwork();
const base={format:'carousel',theme:'dark',family:'class',division:'School',title:'A próxima turma começa com o seu próximo passo.',body:'Texto de apoio em português com acentuação e contexto.',eyebrow:'SINAPSE SCHOOL / T04',footer:'sinapse.si/school',page:1,total:6};
let checks=0;
for(const format of Object.keys(FORMAT_SIZES))for(const theme of ['dark','light'])for(const family of ['class','signal','notes','proof']){
 const svg=makeArtwork({...base,format,theme,family,title:format==='avatar'?'T04':base.title},masters.wordmark);const [w,h]=FORMAT_SIZES[format];
 assert(svg.includes(`width="${w}" height="${h}"`));assert(svg.includes('<title>'));assert(!svg.includes('undefined'));assert(svg.includes('fill="'+(theme==='dark'?'#0a0a0a':'#f5f5f5')+'"'));checks++;
}
const hostile=makeArtwork({...base,title:'<script>alert("x")</script> & teste',body:'<img src=x onerror=alert(1)>'},masters.wordmark);
assert(!hostile.includes('<script>'));assert(!hostile.includes('<img '));assert(hostile.includes('&lt;script&gt;'));checks++;
const widthOf=s=>Array.from(s).reduce((sum,c)=>sum+(metrics[c]||.65)*96,0)+Math.max(0,Array.from(s).length-1)*96*(-.055);
for(const value of ['W'.repeat(115),'Inteligência conectada ao contexto real do seu trabalho.','SUPERCALIFRAGILISTICAMENTE'.repeat(4)]){
 const lines=wrapPixels(value,928,96);assert(lines.length>0);for(const line of lines)assert(widthOf(line)<=928.01,`Overflow: ${line}`);checks++;
}
const safe=makeArtwork({...base,safe:true},masters.wordmark);const clean=makeArtwork({...base,safe:false},masters.wordmark);assert(safe.includes('stroke-dasharray="8 8"'));assert(!clean.includes('stroke-dasharray="8 8"'));checks++;
const upload=makeArtwork({...base,format:'avatar',title:'T04',clientLogo:'data:image/png;base64,ABC'},masters.wordmark);assert(upload.includes('href="data:image/png;base64,ABC"'));checks++;
const tool=makeArtwork({...base,tool:'supabase'},masters.wordmark);assert(tool.includes('fill="#3ecf8e"'));assert(!makeArtwork({...base,tool:'<script>'},masters.wordmark).includes('<script>'));checks++;
assert(!makeArtwork({...base,format:'avatar',clientLogo:'data:image/svg+xml;base64,ABC'},masters.wordmark).includes('href="data:image/svg+xml'));checks++;
for(const clientScale of [.6,1,1.4,2,999]){const s=makeArtwork({...base,format:'avatar',clientLogo:'data:image/png;base64,ABC',clientScale},masters.wordmark);const tag=s.match(/<image [^>]+>/)[0];const n=k=>Number(tag.match(new RegExp(k+'="([\\d.]+)"'))[1]);assert(n('x')>=575&&n('x')+n('width')<=915);assert(n('y')>=160&&n('y')+n('height')<=500);}checks++;
console.log(`Artwork contracts: ${checks} checks passed; dimensions, theme, XML escaping, long text, guides and co-brand insertion.`);

const displaySample=makeArtwork({...base,format:'carousel',title:'NOVA DIMENSÃO',titleFont:'display',material:'crystal'},'');
assert(displaySample.includes('data-display-line="DIMENSÃO"'),'Keep an ordinary display word whole');
assert(!displaySample.includes('data-display-line="O"'),'No orphan final character in display titles');
console.log('Display word integrity: 2 regression checks passed.');
