import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

console.log('================================================================');
console.log('🧪 TDD SUITE: HERO PHYSICAL PRODUCT SHOWCASE (ISSUE #25)');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// 0. STATIC SOURCE CODE & CONTRACT AUDIT (DEFENSE-IN-DEPTH)
// ─────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 0]: Memeriksa kepatuhan kontrak data HERO_SHOWCASE & Single Source of Truth...');

const dataFilePath = path.join(process.cwd(), 'src/constants/data.js');
assert.ok(fs.existsSync(dataFilePath), '❌ src/constants/data.js wajib ada');
const dataSource = fs.readFileSync(dataFilePath, 'utf8');

assert.ok(
  dataSource.includes('export const HERO_SHOWCASE ='),
  '❌ [GAGAL]: src/constants/data.js wajib mengekspor konstanta terpusat `HERO_SHOWCASE`!'
);

const heroComponentPath = path.join(process.cwd(), 'src/components/sections/Hero.jsx');
assert.ok(fs.existsSync(heroComponentPath), '❌ src/components/sections/Hero.jsx wajib ada');
const heroSource = fs.readFileSync(heroComponentPath, 'utf8');

assert.ok(
  heroSource.includes('HERO_SHOWCASE'),
  '❌ [GAGAL]: Hero.jsx wajib mengimpor dan mengonsumsi data terpusat `HERO_SHOWCASE` dari constants!'
);
assert.ok(
  heroSource.includes('data-hero-showcase'),
  '❌ [GAGAL]: Hero.jsx wajib menyematkan atribut `data-hero-showcase` pada kartu utama Hero!'
);
assert.ok(
  heroSource.includes('scroll-mt-20'),
  '❌ [GAGAL]: Hero.jsx wajib menyematkan `scroll-mt-20` agar klik navigasi #hero tidak menelan badge atas di balik sticky navbar!'
);

const astroPagePath = path.join(process.cwd(), 'src/pages/index.astro');
const astroSource = fs.readFileSync(astroPagePath, 'utf8');
assert.ok(
  astroSource.includes('<Hero />'),
  '❌ [GAGAL]: src/pages/index.astro wajib merender `<Hero />` secara statis (0 KB JS, tanpa directive client:*)!'
);

console.log('   ✓ Seluruh kontrak data statis HERO_SHOWCASE dan atribut LCP Hero.jsx lulus audit statis.\n');

// ─────────────────────────────────────────────────────────────
// 1. PLAYWRIGHT E2E HERO SHOWCASE & SB7 GRUNT TEST SUITE
// ─────────────────────────────────────────────────────────────
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
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

async function runTestSuite() {
  const distDir = path.join(process.cwd(), 'dist');
  assert.ok(
    fs.existsSync(distDir),
    '❌ Folder dist/ belum tersedia. Jalankan `npm run build` terlebih dahulu.'
  );

  const server = createStaticServer(distDir);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({ headless: true });

  try {
    // ── Skenario 1: Verifikasi Kartu Compact Glassmorphism & Proporsi Above-the-Fold ──
    console.log('🌐 [SKENARIO 1]: Menguji Kartu Compact Glassmorphism & Visibilitas CTA Tanpa Scroll...');
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const heroSection = page.locator('section#hero');
    assert.equal(await heroSection.isVisible(), true, 'Seksi <section id="hero"> wajib terlihat');

    const showcaseCard = heroSection.locator('[data-hero-showcase]');
    assert.equal(await showcaseCard.count(), 1, 'Wajib terdapat tepat 1 kartu [data-hero-showcase] di Hero');
    assert.equal(await showcaseCard.isVisible(), true, 'Kartu [data-hero-showcase] wajib terlihat');

    const desktopBox = await heroSection.boundingBox();
    assert.ok(
      desktopBox.height <= 760,
      `Tinggi seksi Hero Desktop wajib proporsional (<= 760px, ditemukan: ${desktopBox.height}px)`
    );

    // Uji klik navigasi #hero (Beranda) agar badge atas tidak tertutup sticky navbar
    await page.goto(`${baseUrl}/#hero`, { waitUntil: 'networkidle' });
    const headerBox = await page.locator('header').boundingBox();
    const organicBadgeBox = await heroSection.locator('span:has-text("100% Organik")').boundingBox();
    assert.ok(
      organicBadgeBox.y >= headerBox.height,
      `Badge 100% Organik tidak boleh tertutup sticky navbar saat navigasi ke #hero (badge y: ${organicBadgeBox.y}, header height: ${headerBox.height})`
    );

    const primaryCta = heroSection.locator('a[href="#produk"]');
    const primaryCtaBox = await primaryCta.boundingBox();
    assert.ok(
      primaryCtaBox.y + primaryCtaBox.height <= 800,
      'Tombol CTA Utama wajib terlihat utuh di layar pertama Desktop (1280x800) tanpa scroll!'
    );

    // ── Skenario 2: Verifikasi SB7 Grunt Test Callouts (Harga & Klaim Keamanan) ──
    console.log('🌐 [SKENARIO 2]: Menguji Elemen SB7 Grunt Test (Label Harga & Manfaat Keamanan)...');
    const heroText = await heroSection.innerText();
    assert.ok(
      heroText.includes('Rp 15.000'),
      'Kartu Hero wajib menampilkan informasi harga terjangkau (Mulai Rp 15.000)'
    );
    assert.ok(
      heroText.includes('Aman untuk Balita'),
      'Kartu Hero wajib menampilkan klaim keamanan keluarga (Aman untuk Balita & Kulit Sensitif)'
    );

    // ── Skenario 3: Responsive Viewport, Zero Overflow & Visual Evidence Capture ──
    console.log('📱 [SKENARIO 3]: Menguji Responsivitas, Zero Overflow & Menangkap Bukti Visual...');
    const screenshotsDir = path.join(process.cwd(), 'tests', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    const desktopOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    assert.equal(desktopOverflow, false, 'Tidak boleh ada horizontal overflow pada Desktop (1280px)');

    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'static';
    });
    await heroSection.scrollIntoViewIfNeeded();
    await heroSection.screenshot({ path: path.join(screenshotsDir, 'hero-desktop.png') });

    // Mobile Viewport (375x812)
    const pageMobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
    await pageMobile.goto(baseUrl, { waitUntil: 'networkidle' });
    const mobileOverflow = await pageMobile.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth
    );
    assert.equal(mobileOverflow, false, 'Tidak boleh ada horizontal overflow pada Mobile (375px)');

    await pageMobile.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'static';
    });
    const mobileHero = pageMobile.locator('section#hero');
    await mobileHero.scrollIntoViewIfNeeded();
    assert.equal(await mobileHero.isVisible(), true, 'Seksi #hero wajib terlihat di layar mobile (375px)');
    await mobileHero.screenshot({ path: path.join(screenshotsDir, 'hero-mobile.png') });

    console.log('   ✓ Seluruh pengujian E2E Desktop & Mobile Hero Showcase LULUS!\n');
    console.log('🎉 SUITE PENGUJIAN HERO SHOWCASE (ISSUE #25) RESMI DIVERIFIKASI!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTestSuite().catch((err) => {
  console.error('\n💥 [TEST FAILED]:', err.message);
  process.exit(1);
});
