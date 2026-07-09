import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1900, height: 800 } });
await p.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p.waitForTimeout(800);
await p.screenshot({ path: 'mine-full.png', clip: { x: 0, y: 0, width: 1900, height: 150 } });
await b.close(); console.log('done');
