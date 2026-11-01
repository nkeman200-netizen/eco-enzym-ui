import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

console.log('================================================================');
console.log('🎭 MENJALANKAN TIER 4: PLAYWRIGHT VISUAL SMOKE & ACTIONABILITY GATE');
console.log('================================================================\n');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

function createStaticServer(distDir) {
  return http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0].split('#')[0];
    if (cleanUrl.endsWith('/')) {
      cleanUrl += 'index.html';
    }

    let filePath = path.join(distDir, cleanUrl);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    try {
      const data = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
}

async function runVisualSmoke() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const screenshotDir = path.join(rootDir, 'tests/screenshots');

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  // 1. Jalankan static server lokal untuk dist/
  const server = createStaticServer(distDir);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`🌐 [SERVER]: Static production preview aktif di ${baseUrl}\n`);

  // 2. Launch browser Chromium
  console.log('🚀 [BROWSER]: Meluncurkan Chromium headless engine...');
  const browser = await chromium.launch({ headless: true });

  try {
    // -------------------------------------------------------------
    // SKENARIO 1: DESKTOP AUDIT (1440x900)
    // -------------------------------------------------------------
    console.log('🖥️  [SKENARIO 1]: Mengaudit Desktop Viewport (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const desktopPage = await desktopContext.newPage();

    await desktopPage.goto(`${baseUrl}/#produk`, { waitUntil: 'networkidle' });
    const productsSection = desktopPage.locator('#produk');
    await productsSection.waitFor({ state: 'visible', timeout: 5000 });

    // Tunggu kartu produk stabil
    const productCards = desktopPage.locator('#produk [role="button"]');
    await productCards.first().waitFor({ state: 'visible', timeout: 5000 });
    const cardCount = await productCards.count();
    console.log(`   📦 Terdeteksi ${cardCount} kartu produk pada katalog desktop.`);
    assert.ok(cardCount >= 4, 'Katalog minimal harus menampilkan 4 kartu produk');

    // 1.1 Metrik Geometri & Rasio Aspek (Aspect Ratio 1:1)
    console.log('   📐 Mengukur proporsi geometri wadah gambar (Aspect Ratio 1:1)...');
    const firstImageContainer = desktopPage.locator('#produk [role="button"] .aspect-square').first();
    const imageBox = await firstImageContainer.boundingBox();
    assert.ok(imageBox, 'Wadah gambar produk wajib terdeteksi di DOM');
    const aspectDiff = Math.abs(imageBox.width - imageBox.height);
    console.log(`      Dimensi wadah gambar: ${Math.round(imageBox.width)}px x ${Math.round(imageBox.height)}px (Selisih: ${aspectDiff.toFixed(2)}px)`);
    assert.ok(aspectDiff <= 1.5, 'Rasio aspek wadah gambar wajib bujur sangkar presisi (CLS 0.00)');

    // 1.2 Targeted Crop Screenshot Katalog Desktop
    const desktopScreenshotPath = path.join(screenshotDir, 'products-catalog-desktop.png');
    await productsSection.screenshot({ path: desktopScreenshotPath });
    console.log(`   📸 [SAVED]: Screenshot katalog desktop disimpan di ${desktopScreenshotPath}`);

    // 1.3 Deteksi Intercept & Phantom Overlay (Actionability Test)
    console.log('   🖱️  Menguji interaktivitas klik kartu produk & pembukaan modal...');
    const firstCard = productCards.first();
    await firstCard.click();

    // Verifikasi modal terbuka
    const modalDialog = desktopPage.locator('div[role="dialog"]');
    await modalDialog.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✨ Modal detail produk berhasil terbuka tanpa terhalang phantom overlay.');

    // Screenshot Modal Desktop
    const modalScreenshotPath = path.join(screenshotDir, 'product-modal-desktop.png');
    await modalDialog.screenshot({ path: modalScreenshotPath });
    console.log(`   📸 [SAVED]: Screenshot modal detail produk disimpan di ${modalScreenshotPath}`);

    // 1.4 Tutup Modal dan Verifikasi Unmount Total
    console.log('   🚪 Menguji penutupan modal via tombol silang (✕)...');
    const closeBtn = desktopPage.locator('button[aria-label="Tutup detail produk"]');
    await closeBtn.click();

    // Pastikan modal hilang total dari DOM
    await modalDialog.waitFor({ state: 'detached', timeout: 3000 });
    const modalStillExists = await desktopPage.locator('div[role="dialog"]').count();
    assert.equal(modalStillExists, 0, 'Modal wajib ter-unmount total dari DOM untuk mencegah invisible wall');
    console.log('   🛡️  [UNMOUNT GUARANTEE]: Modal ter-unmount total (0 phantom backdrop/invisible wall).');

    // 1.5 Verifikasi Klik Ulang Pasca-Unmount
    console.log('   🔄 Menguji klik ulang kartu kedua untuk memastikan layar tidak terkunci...');
    const secondCard = productCards.nth(1);
    await secondCard.click();
    await modalDialog.waitFor({ state: 'visible', timeout: 3000 });
    // Tutup dengan tombol Escape
    await desktopPage.keyboard.press('Escape');
    await modalDialog.waitFor({ state: 'detached', timeout: 3000 });
    console.log('   ✅ [ESCAPE KEY]: Modal tertutup sempurna via tombol Escape.');

    // 1.6 Uji Navigasi Carousel Panah
    console.log('   🏹 Menguji tombol navigasi panah carousel kanan & kiri...');
    const nextBtn = desktopPage.locator('button[aria-label="Geser ke produk berikutnya"]');
    const prevBtn = desktopPage.locator('button[aria-label="Geser ke produk sebelumnya"]');
    const carouselTrack = desktopPage.locator('#produk .overflow-x-auto');

    const initialScroll = await carouselTrack.evaluate((el) => el.scrollLeft);
    if (await nextBtn.isEnabled()) {
      await nextBtn.click();
      await desktopPage.waitForTimeout(600);
      const scrolledLeft = await carouselTrack.evaluate((el) => el.scrollLeft);
      console.log(`      Posisi scroll carousel: ${initialScroll}px -> ${scrolledLeft}px`);
      assert.ok(scrolledLeft > initialScroll, 'Scroll carousel kanan harus bertambah');
      // Kembalikan ke kiri
      await prevBtn.click();
      await desktopPage.waitForTimeout(600);
    }
    console.log('   ✅ Navigasi carousel desktop beroperasi dengan mulus.\n');

    await desktopContext.close();

    // -------------------------------------------------------------
    // SKENARIO 2: MOBILE VIEWPORT AUDIT (375x812 - iPhone X)
    // -------------------------------------------------------------
    console.log('📱 [SKENARIO 2]: Mengaudit Mobile Viewport (375x812)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 375, height: 812 },
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(`${baseUrl}/#produk`, { waitUntil: 'networkidle' });

    const mobileProductsSection = mobilePage.locator('#produk');
    await mobileProductsSection.waitFor({ state: 'visible', timeout: 5000 });

    // Verifikasi Mobile Peek Effect (w-[78vw])
    console.log('   📏 Mengukur Mobile Peek Effect pada kartu produk...');
    const mobileFirstCardWrapper = mobilePage.locator('#produk .overflow-x-auto > div').first();
    const mobileBox = await mobileFirstCardWrapper.boundingBox();
    const expectedWidth = 375 * 0.78; // 78vw = 292.5px
    console.log(`      Lebar kartu mobile: ${Math.round(mobileBox.width)}px (Target 78vw: ~${Math.round(expectedWidth)}px)`);
    assert.ok(
      Math.abs(mobileBox.width - expectedWidth) < 20,
      'Lebar kartu mobile harus proporsional w-[78vw] demi efek intip intensional'
    );

    // Screenshot Mobile Section
    const mobileScreenshotPath = path.join(screenshotDir, 'products-catalog-mobile.png');
    await mobileProductsSection.screenshot({ path: mobileScreenshotPath });
    console.log(`   📸 [SAVED]: Screenshot katalog mobile disimpan di ${mobileScreenshotPath}`);

    // Uji klik kartu pada layar sentuh ponsel
    console.log('   👆 Menguji interaksi tap kartu di layar mobile...');
    const mobileCard = mobilePage.locator('#produk [role="button"]').first();
    await mobileCard.click();

    const mobileModal = mobilePage.locator('div[role="dialog"]');
    await mobileModal.waitFor({ state: 'visible', timeout: 3000 });
    const mobileModalPath = path.join(screenshotDir, 'product-modal-mobile.png');
    await mobileModal.screenshot({ path: mobileModalPath });
    console.log(`   📸 [SAVED]: Screenshot modal mobile disimpan di ${mobileModalPath}`);

    // Tutup modal mobile via tombol silang
    const mobileClose = mobilePage.locator('button[aria-label="Tutup detail produk"]');
    await mobileClose.click();
    await mobileModal.waitFor({ state: 'detached', timeout: 3000 });
    console.log('   ✅ Modal mobile tertutup bersih tanpa overlay terkunci.\n');

    await mobileContext.close();

    console.log('================================================================');
    console.log('🎉 TIER 4: SELURUH SKENARIO AUDIT VISUAL SMOKE SUKSES 100%!');
    console.log('================================================================');
  } finally {
    await browser.close();
    server.close();
  }
}

runVisualSmoke().catch((err) => {
  console.error('\n💥 [TIER 4 VISUAL SMOKE ERROR]: Terjadi kegagalan visual!');
  console.error(err);
  process.exit(1);
});
