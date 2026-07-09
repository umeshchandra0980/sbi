import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1900, height: 700 } });
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.screenshot({ path: 'shot-header.png', clip: { x: 0, y: 0, width: 1900, height: 130 } });
await browser.close();
console.log('done');
