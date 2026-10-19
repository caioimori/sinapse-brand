import fs from 'node:fs';
import sharp from 'sharp';
const dir='public/si-v2/applications';
for(const name of fs.readdirSync(dir).filter(n=>n.endsWith('.svg'))){
 const input=fs.readFileSync(`${dir}/${name}`);
 await sharp(input).webp({quality:94}).toFile(`${dir}/${name.replace('.svg','.webp')}`);
 if(name==='ooh-triptych.svg')await sharp(input).png().toFile('qa-local/v4/ooh-triptych.png');
}
console.log('SVG gradients and tool colors rendered with librsvg.');
