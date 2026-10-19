import fs from 'node:fs';import sharp from 'sharp';
const dir='public/si-v2/social-v9';
const files=fs.readdirSync(dir).filter(x=>x.endsWith('.svg'));
for(const name of files){const input=fs.readFileSync(`${dir}/${name}`);await sharp(input).png().toFile(`${dir}/${name.replace('.svg','.png')}`);await sharp(input).resize({width:name.endsWith('sheet.svg')?1440:810}).webp({quality:91}).toFile(`${dir}/${name.replace('.svg','.webp')}`);}
console.log(`${files.length} social assets rendered to PNG and WebP.`);
