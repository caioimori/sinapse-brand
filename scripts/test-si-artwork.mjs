import fs from 'node:fs';import ts from 'typescript';import vm from 'node:vm';import assert from 'node:assert/strict';
const compiled=ts.transpileModule(fs.readFileSync('lib/si/artwork.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const symbol=fs.readFileSync('components/si/marks.tsx','utf8').match(/export const SYMBOL_PATH = '([^']+)'/)[1];
const metrics=JSON.parse(fs.readFileSync('public/si/inter-metrics.json'));const masters=JSON.parse(fs.readFileSync('public/si/masters.json'));
const sb={exports:{},require:id=>id.includes('metrics')?{INTER_METRICS:metrics}:{SYMBOL_PATH:symbol}};vm.createContext(sb);vm.runInContext(compiled,sb,{timeout:3000});
const {makeArtwork,wrapPixels,FORMAT_SIZES}=sb.exports;
const base={format:'carousel',theme:'dark',family:'class',division:'School',title:'A próxima turma começa com o seu próximo passo.',body:'Texto de apoio em português com acentuação e contexto.',eyebrow:'SINAPSE SCHOOL / T04',footer:'sinapse.si/school',page:1,total:6};
let checks=0;
for(const format of Object.keys(FORMAT_SIZES))for(const theme of ['dark','light'])for(const family of ['class','signal','notes','proof']){
 const svg=makeArtwork({...base,format,theme,family,title:format==='avatar'?'T04':base.title},masters.wordmark);const [w,h]=FORMAT_SIZES[format];
 assert(svg.includes(`width="${w}" height="${h}"`));assert(svg.includes('<title>'));assert(!svg.includes('undefined'));assert(svg.includes('fill="'+(theme==='dark'?'#0A0A0A':'#F5F5F0')+'"'));checks++;
}
const hostile=makeArtwork({...base,title:'<script>alert("x")</script> & teste',body:'<img src=x onerror=alert(1)>'},masters.wordmark);
assert(!hostile.includes('<script>'));assert(!hostile.includes('<img '));assert(hostile.includes('&lt;script&gt;'));checks++;
const widthOf=s=>Array.from(s).reduce((sum,c)=>sum+(metrics[c]||.65)*96,0)+Math.max(0,Array.from(s).length-1)*96*(-.055);
for(const value of ['W'.repeat(115),'Inteligência conectada ao contexto real do seu trabalho.','SUPERCALIFRAGILISTICAMENTE'.repeat(4)]){
 const lines=wrapPixels(value,928,96);assert(lines.length>0);for(const line of lines)assert(widthOf(line)<=928.01,`Overflow: ${line}`);checks++;
}
const safe=makeArtwork({...base,safe:true},masters.wordmark);const clean=makeArtwork({...base,safe:false},masters.wordmark);assert(safe.includes('stroke-dasharray="8 8"'));assert(!clean.includes('stroke-dasharray="8 8"'));checks++;
const upload=makeArtwork({...base,format:'avatar',title:'T04',clientLogo:'data:image/png;base64,ABC'},masters.wordmark);assert(upload.includes('href="data:image/png;base64,ABC"'));checks++;
console.log(`Artwork contracts: ${checks} checks passed; dimensions, theme, XML escaping, long text, guides and co-brand insertion.`);
