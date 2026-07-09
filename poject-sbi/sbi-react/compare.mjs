import { chromium } from 'playwright';

const browser = await chromium.launch();

// Real SBI site
const p1 = await browser.newPage({ viewport: { width: 1900, height: 800 } });
try {
  await p1.goto('https://sbi.bank.in/web/personal-banking/home', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await p1.waitForTimeout(4000);
  await p1.screenshot({ path: 'real-header.png', clip: { x: 0, y: 0, width: 1900, height: 150 } });
  console.log('real captured');
} catch (e) {
  console.log('real failed:', e.message);
}

// My local
const p2 = await browser.newPage({ viewport: { width: 1900, height: 800 } });
await p2.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await p2.waitForTimeout(1000);
await p2.screenshot({ path: 'mine-header.png', clip: { x: 0, y: 0, width: 1900, height: 150 } });
console.log('mine captured');

await browser.close();
