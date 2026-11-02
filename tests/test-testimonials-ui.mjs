import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { TESTIMONIALS } from '../src/constants/data.js';

console.log('================================================================');
console.log('🧪 TDD SUITE: CLEAN EDITORIAL TESTIMONIALS & SCHEMA CONTRACT (ISSUE #14)');
console.log('================================================================\n');

// ─────────────────────────────────────────────────────────────
// 1. UNIT & DATA CONTRACT SPECIFICATION (STRICT RFC COMPLIANCE)
// ─────────────────────────────────────────────────────────────
console.log('📋 [SKENARIO 1]: Validasi Skema Data TESTIMONIALS di data.js...');

// Verifikasi ketiadaan properti usang avatarInitial
TESTIMONIALS.forEach((item, idx) => {
  assert.equal(
    'avatarInitial' in item,
    false,
    `❌ [GAGAL]: Entri ke-${idx + 1} (${item.id}) masih memuat properti usang 'avatarInitial'!`
  );
  assert.ok(item.id, `Entri ke-${idx + 1} wajib memiliki 'id'`);
  assert.ok(item.name, `Entri ke-${idx + 1} wajib memiliki 'name'`);
  assert.ok(item.location, `Entri ke-${idx + 1} wajib memiliki 'location'`);
  assert.ok(item.quote, `Entri ke-${idx + 1} wajib memiliki 'quote'`);
});

console.log('   ✓ Seluruh entri TESTIMONIALS selaras dengan skema RFC backend.\n');

// ─────────────────────────────────────────────────────────────
// 2. PLAYWRIGHT E2E & DOM SEMANTICS VERIFICATION
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

function calculateLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(rgb1, rgb2) {
  const lum1 = calculateLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateLuminance(rgb2.r, rgb2.g, rgb2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

function parseRgb(colorStr) {
  const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(match[1], 10),
    g: parseInt(match[2], 10),
    b: parseInt(match[3], 10),
  };
}

async function runTestSuite() {
  const rootDir = process.cwd();
  const distDir = path.join(rootDir, 'dist');
  const screenshotDir = path.join(rootDir, 'tests/screenshots');

  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const server = createStaticServer(distDir);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'networkidle' });

    const testimonialsSection = page.locator('#testimoni');
    await testimonialsSection.scrollIntoViewIfNeeded();

    // ─────────────────────────────────────────────────────────────
    // SKENARIO 2: Semantik Editorial (<figure>, <blockquote>, <figcaption>)
    // ─────────────────────────────────────────────────────────────
    console.log('🏛️  [SKENARIO 2]: Verifikasi Tag Semantik Editorial (<figure>, <blockquote>)...');
    const figures = testimonialsSection.locator('figure');
    const figureCount = await figures.count();
    assert.equal(
      figureCount,
      TESTIMONIALS.length,
      `❌ [GAGAL]: Ditemukan ${figureCount} tag <figure>, diekspektasikan ${TESTIMONIALS.length}!`
    );

    const blockquotes = testimonialsSection.locator('blockquote');
    const blockquoteCount = await blockquotes.count();
    assert.equal(
      blockquoteCount,
      TESTIMONIALS.length,
      `❌ [GAGAL]: Ditemukan ${blockquoteCount} tag <blockquote>, diekspektasikan ${TESTIMONIALS.length}!`
    );

    const figcaptions = testimonialsSection.locator('figcaption');
    const figcaptionCount = await figcaptions.count();
    assert.equal(
      figcaptionCount,
      TESTIMONIALS.length,
      `❌ [GAGAL]: Ditemukan ${figcaptionCount} tag <figcaption>, diekspektasikan ${TESTIMONIALS.length}!`
    );
    console.log('   ✓ Seluruh kartu testimoni menggunakan semantik <figure>, <blockquote>, dan <figcaption>.\n');

    // ─────────────────────────────────────────────────────────────
    // SKENARIO 3: Anti-Pattern Ban (Zero Avatar Inisial Lingkaran)
    // ─────────────────────────────────────────────────────────────
    console.log('🚫 [SKENARIO 3]: Verifikasi Larangan Keras Avatar Inisial Lingkaran...');
    const avatarCircles = testimonialsSection.locator('.rounded-full.bg-brand-primary');
    const avatarCount = await avatarCircles.count();
    assert.equal(
      avatarCount,
      0,
      `❌ [GAGAL]: Ditemukan ${avatarCount} elemen avatar lingkaran (.rounded-full.bg-brand-primary)! Avatar inisial wajib dihapus.`
    );
    console.log('   ✓ Tidak ada elemen avatar lingkaran inisial di dalam seksi testimoni (0 elemen).\n');

    // ─────────────────────────────────────────────────────────────
    // SKENARIO 4: Aksesibilitas WCAG 2.1 AA Kontras Warna (≥ 4.5:1)
    // ─────────────────────────────────────────────────────────────
    console.log('⚖️  [SKENARIO 4]: Pengukuran Rasio Kontras Teks Ulasan vs Background Kartu...');
    const firstQuote = blockquotes.first();
    const computedStyles = await firstQuote.evaluate((el) => {
      const quoteColor = window.getComputedStyle(el).color;
      let card = el.closest('figure') || el.parentElement;
      const cardBg = window.getComputedStyle(card).backgroundColor;
      return { quoteColor, cardBg };
    });

    const textColor = parseRgb(computedStyles.quoteColor);
    const bgColor = parseRgb(computedStyles.cardBg);
    const contrastRatio = getContrastRatio(textColor, bgColor);
    console.log(`   🎨 Teks: ${computedStyles.quoteColor} | Latar: ${computedStyles.cardBg}`);
    console.log(`   📊 Rasio Kontras Terhitung: ${contrastRatio.toFixed(2)}:1`);

    assert.ok(
      contrastRatio >= 4.5,
      `❌ [GAGAL]: Rasio kontras (${contrastRatio.toFixed(2)}:1) di bawah standar WCAG AA (4.5:1)!`
    );
    console.log('   ✓ Kontras teks ulasan memenuhi standar WCAG 2.1 AA (≥ 4.5:1).\n');

    // ─────────────────────────────────────────────────────────────
    // SKENARIO 5: Tangkapan Layar Visual Editorial
    // ─────────────────────────────────────────────────────────────
    console.log('📸 [SKENARIO 5]: Mengambil bukti tangkapan layar kartu editorial...');
    const screenshotPath = path.join(screenshotDir, 'testimonials-editorial-desktop.png');
    await testimonialsSection.screenshot({ path: screenshotPath });
    console.log(`   ✓ Tangkapan layar tersimpan di ${screenshotPath}\n`);

    console.log('🎉 SEMUA SPESIFIKASI PENGUJIAN LOLOS DENGAN SEMPURNA (GREEN)!');
  } finally {
    await browser.close();
    server.close();
  }
}

runTestSuite().catch((err) => {
  console.error('\n🔴 [RED TEST EXECUTION DETECTED]:');
  console.error(err.message);
  process.exit(1);
});
