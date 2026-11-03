import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { CONTACT_INFO } from '../src/constants/data.js';

console.log('================================================================');
console.log('🧪 TDD SUITE: DYNAMIC CONTACT & WHATSAPP CHECKOUT (ISSUE #19)');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// 0. STATIC SOURCE AUDIT: ZERO HARDCODED WA URLS & REACTIVE FOOTER
// ─────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 0]: Memeriksa ketiadaan hardcode wa.me di komponen UI & reaktivitas Footer.jsx...');

const uiFilesToCheck = [
  'src/components/ui/ProductDetailModal.jsx',
  'src/components/sections/Footer.jsx',
  'src/components/sections/Plan.jsx',
  'src/components/sections/Stakes.jsx',
  'src/components/sections/FinalCTA.jsx',
];

for (const relPath of uiFilesToCheck) {
  const fullPath = path.join(process.cwd(), relPath);
  const src = fs.readFileSync(fullPath, 'utf8');
  assert.equal(
    src.includes('https://wa.me/6288802457102'),
    false,
    `❌ [GAGAL]: Berkas ${relPath} masih menyimpan hardcode literal 'https://wa.me/6288802457102'!`
  );
}

const footerSource = fs.readFileSync(
  path.join(process.cwd(), 'src/components/sections/Footer.jsx'),
  'utf8'
);
assert.ok(
  footerSource.includes('getContactData'),
  '❌ [GAGAL]: Footer.jsx wajib memanggil getContactData dari contactService!'
);
assert.ok(
  footerSource.includes('isLoading') && footerSource.includes('animate-pulse'),
  '❌ [GAGAL]: Footer.jsx wajib mengelola state isLoading dan menampilkan Inline Skeleton Shimmer!'
);
assert.ok(
  footerSource.includes('isActive'),
  '❌ [GAGAL]: Footer.jsx wajib mengelola state isActive untuk visibilitas parsial kontak!'
);

console.log('   ✓ Seluruh 5 komponen bebas hardcode wa.me dan Footer.jsx telah reaktif.\n');

// ─────────────────────────────────────────────────────────────
// 1. PLAYWRIGHT E2E & DOM SYNC VERIFICATION
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
    // ── Skenario 1A: Offline Fallback & Static CTA Sync ──
    console.log('🌐 [SKENARIO 1A]: Menguji Offline Fallback Footer & Sinkronisasi [data-wa-cta]...');
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    // Pastikan 3 anchor statis [data-wa-cta] ada di halaman (Plan, Stakes, FinalCTA)
    const staticCtaCount = await page.locator('a[data-wa-cta]').count();
    assert.equal(
      staticCtaCount,
      3,
      'Halaman wajib memiliki 3 elemen <a data-wa-cta> pada seksi Plan, Stakes, dan FinalCTA'
    );

    // Gulir ke Footer untuk memicu hidrasi client:visible
    const footer = page.locator('footer#kontak');
    await footer.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => {
      const el = document.querySelector('footer#kontak');
      return el && el.getAttribute('aria-busy') === 'false';
    });

    const footerText = await footer.innerText();
    for (const item of CONTACT_INFO) {
      assert.ok(
        footerText.includes(item.value),
        `Footer wajib menampilkan nilai kontak fallback: ${item.value}`
      );
    }

    // ── Skenario 1B: Mock API Contact Baru & Propagasi ke Seluruh 5 Titik WA ──
    console.log('🌐 [SKENARIO 1B]: Menguji Propagasi Nomor WhatsApp Dinamis dari API ke 5 Titik CTA...');
    const pageDynamic = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await pageDynamic.route('**/api/v1/contact', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            id: 1,
            title: 'Hubungi Kami',
            is_active: true,
            location: 'Desa Jeruklegi Kulon, Cilacap',
            email: 'kasir@sideta-jeruklegi.id',
            whatsapp: '0813-9988-7766',
          },
        }),
      });
    });

    await pageDynamic.goto(baseUrl, { waitUntil: 'networkidle' });
    const dynFooter = pageDynamic.locator('footer#kontak');
    await dynFooter.scrollIntoViewIfNeeded();
    await pageDynamic.waitForFunction(() => {
      const el = document.querySelector('footer#kontak');
      return el && el.getAttribute('aria-busy') === 'false';
    });

    // Verifikasi teks tampilan di Footer sesuai string API, namun href E.164 (6281399887766)
    const dynFooterText = await dynFooter.innerText();
    assert.ok(dynFooterText.includes('0813-9988-7766'), 'Teks tampilan WA di Footer harus sesuai string API');
    const footerWaHref = await dynFooter.locator('a[href^="https://wa.me/"]').getAttribute('href');
    assert.equal(footerWaHref, 'https://wa.me/6281399887766', 'Tautan WA di Footer wajib ter-sanitasi ke E.164');

    // Verifikasi seluruh 3 tombol statis [data-wa-cta] ikut berubah ke nomor baru 6281399887766
    const updatedStaticHrefs = await pageDynamic
      .locator('a[data-wa-cta]')
      .evaluateAll((els) => els.map((el) => el.getAttribute('href')));
    for (const href of updatedStaticHrefs) {
      assert.ok(
        href.startsWith('https://wa.me/6281399887766?text='),
        `Anchor statis [data-wa-cta] wajib ter-update ke nomor API terbaru (ditemukan: ${href})`
      );
    }

    // ── Skenario 1C: Visibilitas Parsial Saat Kontak Dinonaktifkan (data: null) ──
    console.log('🌐 [SKENARIO 1C]: Menguji Visibilitas Parsial Footer saat Seksi Kontak Dinonaktifkan (data: null)...');
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

    const inactFooterText = await inactFooter.innerText();
    assert.equal(
      inactFooterText.includes('Ada Pertanyaan? Kami Siap Membantu.'),
      false,
      'Blok kontak di Footer wajib disembunyikan saat API mengembalikan data: null'
    );
    const logoVisible = await inactFooter.locator('img[alt*="Logo Resmi SiDeta"]').isVisible();
    assert.equal(
      logoVisible,
      true,
      'Logo Resmi SiDeta & Copyright di Footer WAJIB tetap tampil meskipun kontak dinonaktifkan'
    );

    console.log('   ✓ Seluruh skenario Playwright E2E (Fallback, Dynamic Propagation, & Partial Visibility) LULUS!\n');
    console.log('🎉 SELURUH PENGUJIAN CONTACT & WHATSAPP CHECKOUT BERHASIL HIJAU (100% GREEN)!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTestSuite().catch((err) => {
  console.error('\n💥 [TEST FAILED]:', err.message);
  process.exit(1);
});
