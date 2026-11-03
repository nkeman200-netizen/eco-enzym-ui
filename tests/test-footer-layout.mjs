import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';

console.log('================================================================');
console.log('🧪 TDD SUITE: MULTI-COLUMN D2C FOOTER LAYOUT (ISSUE #21)');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// 0. STATIC SOURCE CODE & CONTRACT AUDIT (DEFENSE-IN-DEPTH)
// ─────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 0]: Memeriksa kepatuhan kontrak data & Single Source of Truth...');

// 0A. Periksa ekspor di src/constants/data.js
const dataFilePath = path.join(process.cwd(), 'src/constants/data.js');
const dataSource = fs.readFileSync(dataFilePath, 'utf8');

assert.ok(
  dataSource.includes('export const NAV_LINKS ='),
  '❌ [GAGAL]: src/constants/data.js wajib mengekspor konstanta terpusat `NAV_LINKS`!'
);

assert.ok(
  dataSource.includes('export const FOOTER_INFO_LINKS ='),
  '❌ [GAGAL]: src/constants/data.js wajib mengekspor konstanta terpusat `FOOTER_INFO_LINKS`!'
);

assert.ok(
  dataSource.includes('export const FOOTER_CONTENT ='),
  '❌ [GAGAL]: src/constants/data.js wajib mengekspor objek terpusat `FOOTER_CONTENT`!'
);

// 0B. Periksa integrasi di src/components/sections/Navbar.jsx
const navbarFilePath = path.join(process.cwd(), 'src/components/sections/Navbar.jsx');
const navbarSource = fs.readFileSync(navbarFilePath, 'utf8');

assert.ok(
  navbarSource.includes('NAV_LINKS'),
  '❌ [GAGAL]: Navbar.jsx wajib mengimpor dan mengonsumsi `NAV_LINKS` dari data.js (DRY)!'
);
assert.equal(
  navbarSource.includes("const navLinks = ["),
  false,
  '❌ [GAGAL]: Navbar.jsx dilarang mendeklarasikan array lokal `navLinks` secara hardcoded!'
);

// 0C. Periksa arsitektur grid & pembagian kolom di src/components/sections/Footer.jsx
const footerFilePath = path.join(process.cwd(), 'src/components/sections/Footer.jsx');
const footerSource = fs.readFileSync(footerFilePath, 'utf8');

assert.ok(
  footerSource.includes('lg:grid-cols-12'),
  '❌ [GAGAL]: Footer.jsx wajib mengadopsi sistem 12-kolom desktop (`lg:grid-cols-12`)!'
);

assert.ok(
  footerSource.includes('NAV_LINKS') && footerSource.includes('FOOTER_INFO_LINKS'),
  '❌ [GAGAL]: Footer.jsx wajib mengimpor dan merender NAV_LINKS dan FOOTER_INFO_LINKS!'
);

assert.ok(
  footerSource.includes('FOOTER_CONTENT'),
  '❌ [GAGAL]: Footer.jsx wajib mengimpor dan merender teks narasi dari FOOTER_CONTENT!'
);

console.log('   ✓ Seluruh kontrak data statis, Navbar, dan struktur Footer lulus audit statis.\n');

// ─────────────────────────────────────────────────────────────
// 1. PLAYWRIGHT E2E LAYOUT & RESPONSIVE SUITE
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
    // ── Skenario 1A: 4-Kolom Asimetris Desktop & Zero Dead Links ──
    console.log('🌐 [SKENARIO 1A]: Menguji 4-Kolom Desktop, Validitas Tautan, & Sub-Footer...');
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const footer = page.locator('footer#kontak');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const el = document.querySelector('footer#kontak');
      return el && el.getAttribute('aria-busy') === 'false';
    });

    // Validasi Kolom 1 (Brand): Logo resmi & deskripsi misi
    const brandLogo = footer.locator('img[alt*="Logo Resmi SiDeta"]');
    assert.equal(await brandLogo.isVisible(), true, 'Logo Resmi SiDeta di Kolom 1 wajib terlihat');

    // Validasi Kolom 2 (Quick Links): Minimal 5 tautan navigasi
    const navAnchors = footer.locator('ul[data-footer-nav] a');
    const navCount = await navAnchors.count();
    assert.ok(navCount >= 5, `Kolom 2 (Navigasi Cepat) wajib memiliki minimal 5 tautan (ditemukan: ${navCount})`);

    // Validasi Kolom 3 (Informasi & Bantuan): Minimal 4 tautan panduan konsumen
    const infoAnchors = footer.locator('ul[data-footer-info] a');
    const infoCount = await infoAnchors.count();
    assert.ok(infoCount >= 4, `Kolom 3 (Informasi & Bantuan) wajib memiliki minimal 4 tautan (ditemukan: ${infoCount})`);

    // Validasi Zero Dead Links: Tidak boleh ada href="#" atau string kosong
    const allFooterLinks = await footer.locator('a').evaluateAll((anchors) =>
      anchors.map((a) => ({ text: a.innerText.trim(), href: a.getAttribute('href') }))
    );

    for (const link of allFooterLinks) {
      assert.ok(
        link.href && link.href !== '#' && link.href !== '',
        `Tautan footer "${link.text}" dilarang berupa dead link / href="#" (ditemukan: href="${link.href}")`
      );
    }

    // Validasi Sub-Footer: Copyright text & Back to Top link
    const subFooter = footer.locator('[data-sub-footer]');
    assert.equal(await subFooter.isVisible(), true, 'Sub-Footer bar di bawah garis pembatas wajib terlihat');
    const backToTop = subFooter.locator('a[href="#hero"]');
    assert.equal(await backToTop.isVisible(), true, 'Tautan Kembali ke Atas (href="#hero") wajib terlihat');

    // ── Skenario 1B: Adaptive Grid Collapse Saat Kontak Dinonaktifkan (data: null) ──
    console.log('🌐 [SKENARIO 1B]: Menguji Adaptive Grid Collapse saat Kontak Nonaktif...');
    const pageInactive = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await pageInactive.route('**/api/v1/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: null }),
      });
    });

    await pageInactive.goto(baseUrl, { waitUntil: 'networkidle' });
    const inactFooter = pageInactive.locator('footer#kontak');
    await inactFooter.scrollIntoViewIfNeeded();
    await pageInactive.waitForFunction(() => {
      const el = document.querySelector('footer#kontak');
      return el && el.getAttribute('aria-busy') === 'false';
    });

    // Kolom 4 (Kontak) harus unmounted/tidak ada di DOM
    const contactBlock = inactFooter.locator('[data-footer-contact]');
    assert.equal(
      await contactBlock.count(),
      0,
      'Kolom 4 (Hubungi Kami) wajib disembunyikan/unmounted saat data kontak null'
    );

    // Kolom 1, 2, dan 3 tetap tampil dan meregang
    assert.equal(await inactFooter.locator('img[alt*="Logo Resmi SiDeta"]').isVisible(), true);
    assert.ok((await inactFooter.locator('ul[data-footer-nav] a').count()) >= 5);
    assert.ok((await inactFooter.locator('ul[data-footer-info] a').count()) >= 4);

    // ── Skenario 1C: Responsive Mobile (375px) & Tablet (768px) ──
    console.log('📱 [SKENARIO 1C]: Menguji Stabilitas Tata Letak di Resolusi Mobile (375px) & Tablet (768px)...');
    const pageMobile = await browser.newPage({ viewport: { width: 375, height: 667 } });
    await pageMobile.goto(baseUrl, { waitUntil: 'networkidle' });
    const mobFooter = pageMobile.locator('footer#kontak');
    await mobFooter.scrollIntoViewIfNeeded();
    assert.equal(await mobFooter.locator('img[alt*="Logo Resmi SiDeta"]').isVisible(), true);

    const pageTablet = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await pageTablet.goto(baseUrl, { waitUntil: 'networkidle' });
    const tabFooter = pageTablet.locator('footer#kontak');
    await tabFooter.scrollIntoViewIfNeeded();
    assert.equal(await tabFooter.locator('img[alt*="Logo Resmi SiDeta"]').isVisible(), true);

    console.log('   ✓ Seluruh pengujian E2E Desktop 4-Kolom, Adaptive Collapse, dan Mobile/Tablet LULUS!\n');
    console.log('🎉 SUITE PENGUJIAN FOOTER LAYOUT (ISSUE #21) RESMI DIVERIFIKASI!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTestSuite().catch((err) => {
  console.error('\n💥 [TEST FAILED]:', err.message);
  process.exit(1);
});
