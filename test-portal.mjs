import { chromium } from '../02-slide-bikinkilat/node_modules/playwright/index.mjs';

async function testPortal() {
  console.log('--- Launching Browser for 01-portal-bikinkilat ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  // 1. Visit Portal
  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'C:/Users/user/.gemini/antigravity/brain/caca9e8f-2972-4c5e-a839-fea6da627712/portal_01_home.png', fullPage: false });
  console.log('Screenshot saved: portal_01_home.png');

  // 2. Open Cashier Modal
  console.log('Opening Cashier Modal...');
  await page.click('button:has-text("Top-Up QRIS")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/user/.gemini/antigravity/brain/caca9e8f-2972-4c5e-a839-fea6da627712/portal_02_cashier_modal.png', fullPage: false });
  console.log('Screenshot saved: portal_02_cashier_modal.png');

  // 3. Click Simulate Payment
  console.log('Clicking Simulate Payment button...');
  await page.click('button:has-text("Simulasi Bayar")');
  await page.waitForSelector('text=Pembayaran Berhasil!', { timeout: 10000 });
  await page.screenshot({ path: 'C:/Users/user/.gemini/antigravity/brain/caca9e8f-2972-4c5e-a839-fea6da627712/portal_03_payment_success.png', fullPage: false });
  console.log('Screenshot saved: portal_03_payment_success.png');

  // 4. Close Modal
  await page.click('button:has-text("Selesai & Gunakan Layanan")');
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'C:/Users/user/.gemini/antigravity/brain/caca9e8f-2972-4c5e-a839-fea6da627712/portal_04_updated_balance.png', fullPage: false });
  console.log('Screenshot saved: portal_04_updated_balance.png');

  await browser.close();
  console.log('--- Test Completed Successfully! ---');
}

testPortal().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
