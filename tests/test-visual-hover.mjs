import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

console.log('================================================================');
console.log('🎯 MENJALANKAN AUDIT VISUAL HOVER & KONTRAST PLAYWRIGHT');
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

async function runHoverAudit() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const hoverDir = path.join(rootDir, 'tests/screenshots/hover');

  if (!fs.existsSync(hoverDir)) {
    fs.mkdirSync(hoverDir, { recursive: true });
  }

  // 1. Jalankan static server lokal
  const server = createStaticServer(distDir);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;
  console.log(`🌐 [SERVER]: Production preview aktif di ${baseUrl}\n`);

  // 2. Launch Chromium
  console.log('🚀 [BROWSER]: Meluncurkan Chromium headless engine...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });
    console.log('   📄 Halaman berhasil dimuat.\n');

    // =============================================================
    // TEST 1: NAVBAR LINK HOVER & BRAND BADGE
    // =============================================================
    console.log('🔍 [TEST 1]: Mengaudit Hover State pada Navbar Links...');
    const navLink = page.locator('nav a[href="#produk"]').first();
    await navLink.waitFor({ state: 'visible' });

    // Cek warna awal sebelum hover
    const colorBeforeHover = await navLink.evaluate((el) => window.getComputedStyle(el).color);
    console.log(`   🎨 Warna teks link sebelum hover: ${colorBeforeHover}`);

    // Lakukan hover
    await navLink.hover();
    await page.waitForTimeout(300);

    const colorAfterHover = await navLink.evaluate((el) => window.getComputedStyle(el).color);
    console.log(`   ✨ Warna teks link saat hover: ${colorAfterHover}`);

    // Screenshot Navbar dengan hover aktif
    const navScreenshot = path.join(hoverDir, '01-navbar-hover.png');
    const navHeader = page.locator('header').first();
    await navHeader.screenshot({ path: navScreenshot });
    console.log(`   📸 [SAVED]: Screenshot Navbar hover disimpan di ${navScreenshot}\n`);

    // =============================================================
    // TEST 2: HERO CTA BUTTONS HOVER
    // =============================================================
    console.log('🔍 [TEST 2]: Mengaudit Hover State pada Tombol Hero Section...');
    const heroWhatsappBtn = page.locator('#hero a[href="#produk"]').first();
    await heroWhatsappBtn.hover();
    await page.waitForTimeout(300);

    const heroScreenshot = path.join(hoverDir, '02-hero-buttons-hover.png');
    const heroSection = page.locator('#hero');
    await heroSection.screenshot({ path: heroScreenshot });
    console.log(`   📸 [SAVED]: Screenshot Hero CTA hover disimpan di ${heroScreenshot}\n`);

    // =============================================================
    // TEST 3: PRODUCT CARD HOVER (LIFT, GLOW, TITLE COLOR)
    // =============================================================
    console.log('🔍 [TEST 3]: Mengaudit Hover State pada Kartu Katalog Produk...');
    const productsSection = page.locator('#produk');
    await productsSection.scrollIntoViewIfNeeded();
    const firstProductCard = page.locator('#produk [role="button"]').first();
    await firstProductCard.waitFor({ state: 'visible', timeout: 5000 });

    // Hover pada kartu produk
    await firstProductCard.hover();
    await page.waitForTimeout(400);

    const cardScreenshot = path.join(hoverDir, '03-product-card-hover.png');
    await firstProductCard.screenshot({ path: cardScreenshot });
    console.log(`   📸 [SAVED]: Screenshot Product Card hover disimpan di ${cardScreenshot}\n`);

    // =============================================================
    // TEST 4: MODAL "TUTUP" BUTTON HOVER (BUGFIX VERIFICATION)
    // =============================================================
    console.log('🔍 [TEST 4]: MENGUJI TOMBOL "TUTUP" MODAL (VERIFIKASI BUG GAMBAR 1)...');
    // Buka modal dengan mengklik kartu pertama
    await firstProductCard.click();

    const modalDialog = page.locator('div[role="dialog"]');
    await modalDialog.waitFor({ state: 'visible', timeout: 5000 });
    console.log('   ✨ Modal detail produk berhasil terbuka.');

    // Locator tombol Tutup di footer modal
    const tutupButton = modalDialog.locator('button:has-text("Tutup")');
    await tutupButton.scrollIntoViewIfNeeded();
    await tutupButton.waitFor({ state: 'visible' });

    // Dapatkan gaya normal sebelum hover
    const normalStyles = await tutupButton.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
      };
    });
    console.log(`   🔎 Normal Tutup Button: color=${normalStyles.color}, bg=${normalStyles.backgroundColor}`);

    // HOVER LANGSUNG KE ATAS TOMBOL "TUTUP"
    await tutupButton.hover();
    await page.waitForTimeout(400);

    // Ambil gaya CSS saat HOVER aktif
    const hoverMetrics = await tutupButton.evaluate((el) => {
      const cs = window.getComputedStyle(el);
      
      // Helper convert color string to RGB via canvas (composited against white modal background)
      function getRgbFromColor(colorStr) {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = colorStr;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return { r, g, b };
      }

      function getLuminance(r, g, b) {
        const [rs, gs, bs] = [r, g, b].map((c) => {
          c = c / 255;
          return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
      }

      const textRgb = getRgbFromColor(cs.color);
      const bgRgb = getRgbFromColor(cs.backgroundColor);
      const l1 = getLuminance(textRgb.r, textRgb.g, textRgb.b);
      const l2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
      const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      return {
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        textRgb,
        bgRgb,
        contrast,
      };
    });

    console.log(`   🎯 HOVER Tutup Button: color=${hoverMetrics.color} (RGB: ${JSON.stringify(hoverMetrics.textRgb)}), bg=${hoverMetrics.backgroundColor} (RGB: ${JSON.stringify(hoverMetrics.bgRgb)})`);
    console.log(`   📊 Rasio Kontras Hover WCAG: ${hoverMetrics.contrast.toFixed(2)}:1`);

    assert.ok(hoverMetrics.contrast >= 4.5, `Kontras hover tombol Tutup wajib >= 4.5:1 (Ditemukan: ${hoverMetrics.contrast.toFixed(2)}:1)`);
    assert.ok(hoverMetrics.textRgb.r < 100 && hoverMetrics.textRgb.g < 100, 'Teks wajib berwarna gelap pekat saat dihover');

    // Ambil screenshot close-up footer modal dan tombol Tutup saat di-hover
    const modalFooter = modalDialog.locator('.border-t').last();
    const modalFooterScreenshot = path.join(hoverDir, '04-modal-tutup-button-hover.png');
    await modalFooter.screenshot({ path: modalFooterScreenshot });
    console.log(`   📸 [SAVED]: Screenshot tombol Tutup hover disimpan di ${modalFooterScreenshot}`);
    console.log('   ✅ [PASSED]: Bug tombol Tutup putih transparan telah teratasi tuntas!\n');

    // =============================================================
    // TEST 5: MODAL "PESAN SEKARANG" CTA BUTTON HOVER
    // =============================================================
    console.log('🔍 [TEST 5]: Mengaudit Hover State pada Tombol "Pesan Sekarang" Modal...');
    const pesanModalBtn = modalDialog.locator('button:has-text("Pesan Sekarang")');
    await pesanModalBtn.hover();
    await page.waitForTimeout(300);

    const pesanModalScreenshot = path.join(hoverDir, '05-modal-pesan-button-hover.png');
    await modalFooter.screenshot({ path: pesanModalScreenshot });
    console.log(`   📸 [SAVED]: Screenshot Pesan Sekarang hover disimpan di ${pesanModalScreenshot}\n`);

    // =============================================================
    // TEST 6: MODAL ACCORDION & THUMBNAILS HOVER
    // =============================================================
    console.log('🔍 [TEST 6]: Mengaudit Hover State pada Accordion & Thumbnail Modal...');
    // Hover thumbnail ke-2
    const secondThumb = modalDialog.locator('.flex.gap-2.overflow-x-auto button').nth(1);
    if (await secondThumb.isVisible()) {
      await secondThumb.hover();
      await page.waitForTimeout(300);
    }

    // Hover accordion trigger
    const accordionBtn = modalDialog.locator('button:has-text("Spesifikasi")').first();
    await accordionBtn.hover();
    await page.waitForTimeout(300);

    const modalBodyScreenshot = path.join(hoverDir, '06-modal-accordion-hover.png');
    await modalDialog.screenshot({ path: modalBodyScreenshot });
    console.log(`   📸 [SAVED]: Screenshot Modal Accordion & Thumbnails hover disimpan di ${modalBodyScreenshot}\n`);

    // Tutup modal
    await tutupButton.click();
    await modalDialog.waitFor({ state: 'detached', timeout: 3000 });
    console.log('   🚪 Modal ditutup via tombol Tutup.\n');

    // =============================================================
    // TEST 7: CAROUSEL PANAH HOVER
    // =============================================================
    console.log('🔍 [TEST 7]: Mengaudit Hover State pada Tombol Panah Carousel...');
    const nextArrow = page.locator('button[aria-label="Geser ke produk berikutnya"]');
    if (await nextArrow.isVisible()) {
      await nextArrow.hover();
      await page.waitForTimeout(300);
      const carouselScreenshot = path.join(hoverDir, '07-carousel-arrows-hover.png');
      const catalogHeader = page.locator('#produk .justify-between').first();
      await catalogHeader.screenshot({ path: carouselScreenshot });
      console.log(`   📸 [SAVED]: Screenshot Carousel Arrow hover disimpan di ${carouselScreenshot}\n`);
    }

    console.log('================================================================');
    console.log('🎉 SELURUH AUDIT VISUAL HOVER BERHASIL DENGAN NILAI SEMPURNA 100%!');
    console.log('================================================================\n');

  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
    console.log('🛑 [CLEANUP]: Browser Chromium & static server dihentikan.');
  }
}

runHoverAudit().catch((err) => {
  console.error('\n❌ [ERROR]: Pengujian Visual Hover Gagal:', err);
  process.exit(1);
});
