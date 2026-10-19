import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import vm from 'node:vm';

const root=process.cwd();
for(const d of ['public/si/logos','public/si/fonts','public/si/studies','public/si/templates','public/si/icons','qa-local','lib/si']) fs.mkdirSync(path.join(root,d),{recursive:true});
const read=n=>fs.readFileSync(path.join(root,n),'utf8');
const paths=n=>[...read(`public/brand/logo/bone/${n}.svg`).matchAll(/<path\b[^>]*\bd="([^"]+)"[^>]*\/?\s*>/g)].map(m=>`<path d="${m[1]}"/>`).join('');
const wordmark=paths('sinapse-wordmark'), symbol=paths('sinapse-symbol'), snps=paths('snps-lockup');
fs.writeFileSync('lib/si/master.ts',`// Derived from the preserved vector masters; do not redraw.\nexport const WORDMARK_PATHS = ${JSON.stringify(wordmark)};\n`);
fs.writeFileSync('public/si/masters.json',JSON.stringify({wordmark,symbol,snps},null,2));
for(const [edition,color] of [['bone','#F5F5F0'],['vanta','#0A0A0A']]){
  for(const [name,label] of [['sinapse-si','SI'],['school','School'],['house','House'],['growth','Growth']]){
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="150" viewBox="0 0 1000 150"><title>SINAPSE ${label} — proposed signature</title><desc>Original wordmark paths preserved. Descriptor uses Inter; see license in the kit.</desc><g fill="${color}" transform="translate(0 18)">${wordmark}</g><path d="M774 39v73" stroke="${color}" stroke-width="2"/><text x="803" y="91" font-family="Inter,Arial,sans-serif" font-size="${label==='SI'?43:35}" letter-spacing="-2" fill="${color}">${label}</text></svg>`;
    fs.writeFileSync(`public/si/logos/${name}-${edition}.svg`,svg);
  }
  fs.writeFileSync(`public/si/logos/symbol-${edition}.svg`,`<svg xmlns="http://www.w3.org/2000/svg" viewBox="28 28 104 58" fill="${color}"><title>SINAPSE original symbol</title>${symbol}</svg>`);
  fs.copyFileSync(`public/brand/logo/${edition}/snps-lockup.svg`,`public/si/logos/snps-${edition}.svg`);
}
const source=read('data/si/brand.ts');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const sandbox={exports:{}};vm.createContext(sandbox);vm.runInContext(compiled,sandbox,{timeout:3000});
fs.writeFileSync('public/si/brand-data.json',JSON.stringify(sandbox.exports,null,2));
const fonts=[['inter','Inter[opsz,wght].ttf'],['sora','Sora[wght].ttf'],['jetbrainsmono','JetBrainsMono[wght].ttf'],['audiowide','Audiowide-Regular.ttf']];
for(const [family,file] of fonts){
  const target=`public/si/fonts/${file}`;
  if(!fs.existsSync(target)){const res=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/${encodeURIComponent(file)}`);if(!res.ok)throw new Error(`Font ${family}: ${res.status}`);fs.writeFileSync(target,Buffer.from(await res.arrayBuffer()));}
  const lic=`public/si/fonts/${family}-OFL.txt`;
  if(!fs.existsSync(lic)){const res=await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`);if(!res.ok)throw new Error(`License ${family}: ${res.status}`);fs.writeFileSync(lic,await res.text());}
}
console.log('Preserved masters, proposed signatures, brand data and open-font sources prepared.');
