import sharp from 'sharp';
const real = await sharp('real-header.png').resize(1900).toBuffer();
const mine = await sharp('mine-full.png').resize(1900).toBuffer();
const rM = await sharp(real).metadata();
const mM = await sharp(mine).metadata();
const label = (t) => sharp({create:{width:1900,height:26,channels:4,background:'#000'}})
  .composite([{input:Buffer.from(`<svg width="1900" height="26"><text x="8" y="19" fill="#0f0" font-size="16" font-family="monospace">${t}</text></svg>`)}]).png().toBuffer();
const l1 = await label('REAL SBI');
const l2 = await label('MINE');
const totalH = 26 + rM.height + 26 + mM.height;
await sharp({create:{width:1900,height:totalH,channels:4,background:'#fff'}})
  .composite([
    {input:l1,top:0,left:0},
    {input:real,top:26,left:0},
    {input:l2,top:26+rM.height,left:0},
    {input:mine,top:26+rM.height+26,left:0},
  ]).png().toFile('compare-stack.png');
console.log('stacked', totalH);
