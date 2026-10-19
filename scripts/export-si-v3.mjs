import fs from 'node:fs';import {loadArtwork,loadBrand} from './si-artwork-runtime.mjs';
const {makeArtwork,iconSvg,ICON_NAMES}=loadArtwork();const root='public/si-v2';const font=fs.readFileSync(root+'/fonts/export.css','utf8');const brand=loadBrand();fs.writeFileSync(root+'/brand-data.json',JSON.stringify(brand,null,2));
const base={format:'carousel',theme:'dark',family:'class',division:'School',title:'A próxima versão é sua.',body:'Aprenda, experimente e construa com inteligência artificial.',eyebrow:'SINAPSE SCHOOL / T04',footer:'sinapse.si/school',page:1,total:6,tool:'supabase'};
const write=(path,data)=>fs.writeFileSync(root+'/'+path,data);
for(const format of ['carousel','story','post','avatar','cover','banner'])for(const theme of ['dark','light'])write(`templates/${format}-${theme}.svg`,makeArtwork({...base,format,theme,...(format==='avatar'?{title:'T04',body:'',tool:undefined,total:1}:format==='cover'?{title:'Contexto muda tudo.',body:'Fundamentos e prática.',page:1,total:1}:{} )},'',font));
for(const format of ['story','carousel'])brand.sequenceT04.forEach((f,i)=>write(`templates/t04-${format}-${i+1}.svg`,makeArtwork({...base,...f,format,page:i+1,tool:['supabase','obsidian','figma','n8n','warp',''][i],theme:i===2?'light':'dark'},'',font)));
const fields=[['Comece pelo problema.','O contexto orienta a ferramenta.'],['Defina uma entrega.','Escolha algo que você consegue conferir.'],['Reúna as fontes.','O que muda a decisão precisa estar no contexto.'],['Desenhe o percurso.','Uma primeira versão pequena permite aprender.'],['Escolha a ferramenta.','A escolha segue a tarefa.'],['Construa uma versão.','Faça a ideia encontrar o uso.'],['Confira o resultado.','Teste o que uma pessoa vai fazer.'],['Revise o que importa.','Corrija a causa e preserve o que funciona.'],['Registre o aprendizado.','O repertório fica para a próxima criação.'],['Qual é o próximo projeto?','Conheça a SINAPSE School.']];
fields.forEach(([title,body],i)=>write(`templates/caderno-${i+1}.svg`,makeArtwork({...base,family:'notes',title,body,eyebrow:'CADERNO / REPERTÓRIO',page:i+1,total:10,tool:i%2?'obsidian':'',theme:i%3===1?'light':'dark'},'',font)));
write('templates/sequencia-t04.json',JSON.stringify({version:3,frames:brand.sequenceT04},null,2));write('templates/caderno-10.json',JSON.stringify({version:3,frames:fields.map(([title,body])=>({title,body}))},null,2));
for(const n of ICON_NAMES)write(`icons/${n}.svg`,iconSvg(n));


for(const theme of ['dark','light'])write(`templates/display-${theme}.svg`,makeArtwork({...base,title:'NOVA DIMENSÃO',body:'Inteligência para aprender, construir e crescer.',titleFont:'display',material:'glass',theme},'',font));
for(const format of ['carousel','story','post','avatar','banner'])write(`templates/crystal-${format}.svg`,makeArtwork({...base,format,material:'crystal',...(format==='avatar'?{title:'T04',body:'',tool:undefined,total:1}:{})},'',font));

for(const format of ['carousel','story','post','banner'])for(const theme of ['dark','light'])write(`templates/flow-${format}-${theme}.svg`,makeArtwork({...base,format,theme,family:'flow',title:'O futuro tem autoria.',body:'O mesmo sinal. Outras possibilidades.',tool:undefined},'',font));
console.log('Shared export: 49 templates, 2 editable sequences, 12 Signals 04 icons.');
