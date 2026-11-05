import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

console.log('================================================================');
console.log('🧪 TDD SUITE: INTERACTIVE FAQ & HUMANIZED NARRATIVE (ISSUE #23)');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// 0. STATIC SOURCE CODE & CONTRACT AUDIT (DEFENSE-IN-DEPTH)
// ─────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 0]: Memeriksa kepatuhan kontrak data & Single Source of Truth...');

// 0A. Periksa ekspor di src/constants/data.js
const dataFilePath = path.join(process.cwd(), 'src/constants/data.js');
assert.ok(fs.existsSync(dataFilePath), '❌ src/constants/data.js wajib ada');
const dataSource = fs.readFileSync(dataFilePath, 'utf8');

assert.ok(
  dataSource.includes('export const FAQ_ITEMS ='),
  '❌ [GAGAL]: src/constants/data.js wajib mengekspor konstanta terpusat `FAQ_ITEMS`!'
);

// 0B. Periksa keberadaan komponen Faq.jsx
const faqComponentPath = path.join(process.cwd(), 'src/components/sections/Faq.jsx');
assert.ok(
  fs.existsSync(faqComponentPath),
  '❌ [GAGAL]: Komponen seksi `src/components/sections/Faq.jsx` wajib dibuat!'
);

const faqSource = fs.readFileSync(faqComponentPath, 'utf8');
assert.ok(
  faqSource.includes('FAQ_ITEMS'),
  '❌ [GAGAL]: Faq.jsx wajib mengimpor dan mengonsumsi data terpusat `FAQ_ITEMS` dari constants!'
);
assert.ok(
  faqSource.includes('<details') && faqSource.includes('<summary'),
  '❌ [GAGAL]: Faq.jsx wajib menggunakan elemen semantik native `<details>` dan `<summary>`!'
);
assert.ok(
  faqSource.includes('id="faq"') || faqSource.includes("id='faq'"),
  '❌ [GAGAL]: Faq.jsx wajib memiliki atribut id="faq" untuk navigasi jangkar (anchor scrolling)!'
);

// 0C. Periksa orkestrasi di src/pages/index.astro
const astroPagePath = path.join(process.cwd(), 'src/pages/index.astro');
const astroSource = fs.readFileSync(astroPagePath, 'utf8');

assert.ok(
  astroSource.includes("import Faq from '../components/sections/Faq'"),
  '❌ [GAGAL]: src/pages/index.astro wajib mengimpor komponen Faq!'
);
assert.ok(
  astroSource.includes('<Faq />'),
  '❌ [GAGAL]: src/pages/index.astro wajib merender `<Faq />` secara statis (0 KB JS, tanpa directive client:*)!'
);

console.log('   ✓ Seluruh kontrak data statis, komponen Faq, dan orkestrasi Astro lulus audit statis.\n');

// ─────────────────────────────────────────────────────────────
// 1. PLAYWRIGHT E2E ACCORDION & LAYOUT SUITE
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
    // ── Skenario 1: Verifikasi Seksi #faq & 4 Kartu Accordion ──
    console.log('🌐 [SKENARIO 1]: Menguji Keberadaan Seksi #faq & 4 Kartu Native Accordion...');
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const faqSection = page.locator('section#faq');
    assert.equal(await faqSection.isVisible(), true, 'Seksi <section id="faq"> wajib terlihat di halaman');

    const detailsElements = faqSection.locator('details');
    const detailsCount = await detailsElements.count();
    assert.ok(
      detailsCount >= 4,
      `Seksi FAQ wajib memiliki minimal 4 butir pertanyaan (ditemukan: ${detailsCount})`
    );

    const summaries = faqSection.locator('summary');
    assert.equal(await summaries.count(), detailsCount, 'Setiap details wajib memiliki satu summary');

    // ── Skenario 2: Menguji Interaktivitas Toggle Buka-Tutup Accordion ──
    console.log('🌐 [SKENARIO 2]: Menguji Interaktivitas Toggle Buka-Tutup Accordion (Zero JS Native)...');
    const firstDetails = detailsElements.first();
    const firstSummary = firstDetails.locator('summary');

    // Kondisi awal: Tertutup
    const initialOpen = await firstDetails.getAttribute('open');
    assert.equal(initialOpen, null, 'Secara default kartu FAQ wajib dalam keadaan tertutup (open === null)');

    // Klik untuk membuka
    await firstSummary.click();
    const openedState = await firstDetails.getAttribute('open');
    assert.ok(openedState !== null, 'Setelah diklik summary, elemen <details> wajib memiliki atribut open');

    // Klik ulang untuk menutup
    await firstSummary.click();
    const closedState = await firstDetails.getAttribute('open');
    assert.equal(closedState, null, 'Setelah diklik ulang, elemen <details> wajib kembali tertutup');

    // ── Skenario 3: Verifikasi Sinkronisasi Navigasi Kolom 3 Footer ke #faq ──
    console.log('🌐 [SKENARIO 3]: Menguji Pemetaan Tautan Kolom 3 Footer ke Seksi #faq...');
    const footerInfoLinks = page.locator('footer#kontak ul[data-footer-info] a');
    const infoCount = await footerInfoLinks.count();
    assert.ok(infoCount >= 4, `Footer wajib memiliki minimal 4 tautan informasi (ditemukan: ${infoCount})`);

    const faqTargetLink = page.locator('footer#kontak ul[data-footer-info] a[href*="#faq"]');
    assert.ok(
      (await faqTargetLink.count()) >= 1,
      'Tautan informasi konsumen di Footer wajib mengarah ke seksi #faq'
    );

    // Pastikan tidak ada dead links di footer
    const allFooterLinks = await page.locator('footer#kontak a').evaluateAll((anchors) =>
      anchors.map((a) => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
    );
    for (const link of allFooterLinks) {
      assert.ok(
        link.href && link.href !== '#' && link.href !== '',
        `Tautan footer "${link.text}" dilarang berupa dead link (ditemukan: href="${link.href}")`
      );
    }

    // ── Skenario 4: Responsive Viewport & Visual Evidence Capture ──
    console.log('📱 [SKENARIO 4]: Menguji Tampilan Responsif & Menangkap Bukti Visual (Desktop & Mobile)...');
    const screenshotsDir = path.join(process.cwd(), 'tests', 'screenshots');
    fs.mkdirSync(screenshotsDir, { recursive: true });

    // Desktop Screenshot
    await page.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'static';
    });
    await faqSection.scrollIntoViewIfNeeded();
    await faqSection.screenshot({ path: path.join(screenshotsDir, 'faq-desktop.png') });

    // Mobile Viewport (375x667)
    const pageMobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await pageMobile.goto(baseUrl, { waitUntil: 'networkidle' });
    await pageMobile.evaluate(() => {
      const header = document.querySelector('header');
      if (header) header.style.position = 'static';
    });
    const mobileFaq = pageMobile.locator('section#faq');
    await mobileFaq.scrollIntoViewIfNeeded();
    assert.equal(await mobileFaq.isVisible(), true, 'Seksi #faq wajib terlihat di layar mobile (375px)');
    await mobileFaq.screenshot({ path: path.join(screenshotsDir, 'faq-mobile.png') });

    console.log('   ✓ Seluruh pengujian E2E Desktop & Mobile FAQ LULUS!\n');
    console.log('🎉 SUITE PENGUJIAN FAQ & NARASI (ISSUE #23) RESMI DIVERIFIKASI!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTestSuite().catch((err) => {
  console.error('\n💥 [TEST FAILED]:', err.message);
  process.exit(1);
});
