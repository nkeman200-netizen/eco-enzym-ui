import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { PRODUCTS, FAQ_ITEMS, CONTACT_INFO, DEFAULT_WHATSAPP_NUMBER } from '../src/constants/data.js';

console.log('======================================================================');
console.log('🧪 TDD SUITE: ON-PAGE SEO, JSON-LD (DUAL-SYNC) & ASSET BUDGET (#27)');
console.log('======================================================================\n');

// ─────────────────────────────────────────────────────────────────────────────
// SKENARIO 1: KONTRAK KONFIGURASI ASTRO, ROBOTS.TXT & SITEMAP.XML
// ─────────────────────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 1]: Memeriksa konfigurasi domain kanonis, robots.txt, dan sitemap.xml...');

const astroConfigPath = path.join(process.cwd(), 'astro.config.mjs');
const astroConfigContent = fs.readFileSync(astroConfigPath, 'utf8');
assert.ok(
  astroConfigContent.includes('https://sanitasihijau.com'),
  '❌ [RED]: astro.config.mjs wajib mendeklarasikan site: "https://sanitasihijau.com"!'
);

const robotsPath = path.join(process.cwd(), 'public/robots.txt');
assert.ok(
  fs.existsSync(robotsPath),
  '❌ [RED]: Berkas public/robots.txt belum tersedia!'
);
const robotsContent = fs.readFileSync(robotsPath, 'utf8');
assert.ok(
  robotsContent.includes('User-agent: *') &&
    robotsContent.includes('Allow: /') &&
    robotsContent.includes('Sitemap: https://sanitasihijau.com/sitemap.xml'),
  '❌ [RED]: public/robots.txt wajib memuat User-agent: *, Allow: /, dan Sitemap: https://sanitasihijau.com/sitemap.xml!'
);

const sitemapPath = path.join(process.cwd(), 'public/sitemap.xml');
assert.ok(
  fs.existsSync(sitemapPath),
  '❌ [RED]: Berkas public/sitemap.xml belum tersedia!'
);
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert.ok(
  sitemapContent.includes('<urlset') &&
    sitemapContent.includes('<loc>https://sanitasihijau.com/</loc>'),
  '❌ [RED]: public/sitemap.xml wajib memuat <urlset> dan <loc>https://sanitasihijau.com/</loc>!'
);

console.log('   ✓ Konfigurasi site, robots.txt, dan sitemap.xml valid.\n');

// ─────────────────────────────────────────────────────────────────────────────
// SKENARIO 2: MODUL GENERATOR SEO & JSON-LD (src/utils/seoSchema.js)
// ─────────────────────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 2]: Menguji modul src/utils/seoSchema.js & Invariant JSON-LD...');

const seoSchemaPath = path.join(process.cwd(), 'src/utils/seoSchema.js');
assert.ok(
  fs.existsSync(seoSchemaPath),
  '❌ [RED]: Modul src/utils/seoSchema.js belum dibuat!'
);

const seoModule = await import('../src/utils/seoSchema.js');
const {
  SITE_URL,
  DEFAULT_SEO_META,
  toAbsoluteUrl,
  extractNumericPrice,
  resolveSchemaAvailability,
  buildProductImageAlt,
  buildSeoJsonLd,
  syncSeoJsonLdInDom,
} = seoModule;

assert.equal(SITE_URL, 'https://sanitasihijau.com', '❌ [RED]: SITE_URL wajib https://sanitasihijau.com');
assert.ok(
  DEFAULT_SEO_META?.title && DEFAULT_SEO_META?.description && DEFAULT_SEO_META?.keywords,
  '❌ [RED]: DEFAULT_SEO_META wajib memuat title, description, dan keywords D2C!'
);
assert.ok(
  DEFAULT_SEO_META.title.length <= 60,
  `❌ [RED]: DEFAULT_SEO_META.title terlalu panjang (${DEFAULT_SEO_META.title.length} kar), batas aman SERP <= 60 karakter!`
);

// 2A. Uji toAbsoluteUrl (Hibrida: Path Relatif Lokal vs URL Penuh Backend)
assert.equal(
  toAbsoluteUrl('/images/products/sabun-batang-1.webp'),
  'https://sanitasihijau.com/images/products/sabun-batang-1.webp',
  '❌ [RED]: toAbsoluteUrl wajib mengubah path relatif menjadi URL absolut!'
);
assert.equal(
  toAbsoluteUrl('https://admin.sanitasihijau.com/storage/products/sabun.webp'),
  'https://admin.sanitasihijau.com/storage/products/sabun.webp',
  '❌ [RED]: toAbsoluteUrl wajib mempertahankan URL penuh dari storage Backend!'
);

// 2B. Uji extractNumericPrice (Zero-Crash Invariant)
assert.equal(extractNumericPrice('Rp 15.000'), '15000');
assert.equal(extractNumericPrice(18500), '18500');
assert.equal(extractNumericPrice('Rp 12.500,-'), '12500');
assert.equal(extractNumericPrice(null), '0');
assert.equal(extractNumericPrice('Harga Hubungi Admin'), '0');

// 2C. Uji resolveSchemaAvailability
assert.equal(resolveSchemaAvailability('Tersedia'), 'https://schema.org/InStock');
assert.equal(resolveSchemaAvailability('Stok Habis'), 'https://schema.org/OutOfStock');

// 2D. Uji Programmatic Alt Text menggunakan Data Fixture dari src/constants/data.js
const sampleFixtureProduct = PRODUCTS[0];
const primaryAlt = buildProductImageAlt(sampleFixtureProduct, 0);
assert.ok(
  primaryAlt.includes(sampleFixtureProduct.name) &&
    primaryAlt.includes('SiDeta Eco-Enzyme') &&
    primaryAlt.includes(sampleFixtureProduct.specs.netto),
  `❌ [RED]: Programmatic alt utama kurang deskriptif: "${primaryAlt}"`
);

const secondaryAlt = buildProductImageAlt(sampleFixtureProduct, 1, 'Tekstur & Busa Alami');
assert.ok(
  secondaryAlt.includes(sampleFixtureProduct.name) &&
    secondaryAlt.includes('Tekstur & Busa Alami'),
  `❌ [RED]: Programmatic alt sekunder tidak memuat caption sudut pandang: "${secondaryAlt}"`
);

// Edge-case fixture tanpa atribut opsional shape/benefit
const minimalProductFixture = {
  ...PRODUCTS[1],
  benefit: '',
  specs: { netto: '450 ml' },
};
const minimalAlt = buildProductImageAlt(minimalProductFixture, 0);
assert.ok(
  minimalAlt.includes(minimalProductFixture.name) && minimalAlt.includes('450 ml'),
  '❌ [RED]: buildProductImageAlt gagal menangani produk tanpa benefit/shape!'
);

// 2E. Uji Struktur Grafik JSON-LD (@graph: LocalBusiness, ItemList, FAQPage)
const jsonLd = buildSeoJsonLd({
  products: PRODUCTS,
  contactData: {
    isActive: true,
    contactItems: CONTACT_INFO,
    whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
  },
  faqItems: FAQ_ITEMS,
});

const serialized = JSON.stringify(jsonLd);
const parsed = JSON.parse(serialized);
assert.ok(
  !serialized.includes('undefined'),
  '❌ [RED]: Serialisasi JSON-LD tidak boleh mengandung string "undefined"!'
);
assert.equal(parsed['@context'], 'https://schema.org');
assert.ok(Array.isArray(parsed['@graph']), '❌ [RED]: JSON-LD wajib menggunakan struktur @graph array!');

const localBusinessNode = parsed['@graph'].find((n) => n['@type'] === 'LocalBusiness');
const itemListNode = parsed['@graph'].find((n) => n['@type'] === 'ItemList');
const faqPageNode = parsed['@graph'].find((n) => n['@type'] === 'FAQPage');

assert.ok(localBusinessNode, '❌ [RED]: @graph wajib memuat node LocalBusiness!');
assert.ok(
  localBusinessNode.image?.startsWith('https://'),
  '❌ [RED]: LocalBusiness.image wajib berupa URL absolut https://!'
);
const localBusinessImageRel = localBusinessNode.image.replace(SITE_URL, '');
assert.ok(
  fs.existsSync(path.join(process.cwd(), 'public', localBusinessImageRel)),
  `❌ [RED]: Berkas LocalBusiness.image (${localBusinessImageRel}) wajib tersedia di public/!`
);

assert.ok(itemListNode, '❌ [RED]: @graph wajib memuat node ItemList katalog produk!');
assert.equal(
  itemListNode.itemListElement.length,
  PRODUCTS.length,
  '❌ [RED]: Jumlah item di ItemList JSON-LD wajib sama dengan jumlah produk!'
);

const firstProductOffer = itemListNode.itemListElement[0]?.item?.offers;
assert.equal(firstProductOffer?.['@type'], 'Offer');
assert.equal(firstProductOffer?.priceCurrency, 'IDR');
assert.equal(firstProductOffer?.price, '15000');
assert.equal(firstProductOffer?.availability, 'https://schema.org/InStock');

assert.ok(faqPageNode, '❌ [RED]: @graph wajib memuat node FAQPage!');
assert.equal(faqPageNode.mainEntity.length, FAQ_ITEMS.length);

// 2F. Uji Live DOM Sync (syncSeoJsonLdInDom) dengan Simulasi Update Harga CMS Backend
const updatedProductsFixture = PRODUCTS.map((item, idx) =>
  idx === 0 ? { ...item, price: 'Rp 19.500' } : item
);
const mockScriptEl = { textContent: '' };
const mockDoc = {
  getElementById: (id) => (id === 'seo-json-ld' ? mockScriptEl : null),
};
syncSeoJsonLdInDom(
  {
    products: updatedProductsFixture,
    contactData: {
      isActive: true,
      contactItems: CONTACT_INFO,
      whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
    },
    faqItems: FAQ_ITEMS,
  },
  mockDoc
);
const syncedParsed = JSON.parse(mockScriptEl.textContent);
const syncedOfferPrice =
  syncedParsed['@graph'].find((n) => n['@type'] === 'ItemList').itemListElement[0].item.offers.price;
assert.equal(
  syncedOfferPrice,
  '19500',
  '❌ [RED]: syncSeoJsonLdInDom gagal memperbarui harga produk terbaru dari API di DOM!'
);

console.log('   ✓ Modul seoSchema.js, JSON-LD @graph, dan Live DOM Sync lulus uji.\n');

// ─────────────────────────────────────────────────────────────────────────────
// SKENARIO 3: INJEKSI METADATA DI BaseLayout.astro & KOMPONEN UI/SEKSI
// ─────────────────────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 3]: Memeriksa BaseLayout.astro, Heading H1-H3, dan integrasi komponen...');

const baseLayoutPath = path.join(process.cwd(), 'src/layouts/BaseLayout.astro');
const baseLayoutSource = fs.readFileSync(baseLayoutPath, 'utf8');

assert.ok(
  baseLayoutSource.includes('href="/favicon-96x96.png"') &&
    baseLayoutSource.includes('href="/favicon.ico"') &&
    baseLayoutSource.includes('href="/apple-touch-icon.png"'),
  '❌ [RED]: BaseLayout.astro wajib mendaftarkan favicon-96x96.png, favicon.ico, dan apple-touch-icon.png!'
);
assert.ok(
  !baseLayoutSource.includes('rel="icon" type="image/webp"'),
  '❌ [RED]: BaseLayout.astro tidak boleh memakai type="image/webp" untuk favicon karena Google Search tidak mendukung WebP favicon!'
);
for (const iconFile of ['public/favicon-96x96.png', 'public/favicon.ico', 'public/apple-touch-icon.png', 'public/favicon.svg']) {
  assert.ok(
    fs.existsSync(path.join(process.cwd(), iconFile)),
    `❌ [RED]: Aset favicon ${iconFile} wajib tersedia di disk!`
  );
}
assert.ok(
  fs.statSync(path.join(process.cwd(), 'public/favicon-96x96.png')).size > 0,
  '❌ [RED]: public/favicon-96x96.png tidak boleh kosong!'
);
assert.ok(
  baseLayoutSource.includes('rel="canonical"'),
  '❌ [RED]: BaseLayout.astro wajib menyertakan <link rel="canonical" ... />!'
);
assert.ok(
  baseLayoutSource.includes('property="og:url"') &&
    baseLayoutSource.includes('property="og:locale"') &&
    baseLayoutSource.includes('name="twitter:card"'),
  '❌ [RED]: BaseLayout.astro wajib menyertakan og:url, og:locale, dan twitter:card!'
);
assert.ok(
  baseLayoutSource.includes('id="seo-json-ld"') &&
    baseLayoutSource.includes('application/ld+json'),
  '❌ [RED]: BaseLayout.astro wajib menyuntikkan <script type="application/ld+json" id="seo-json-ld">!'
);

// Periksa hierarki heading di About.jsx & Faq.jsx (Tidak boleh ada lompatan H2 -> H4)
const aboutSource = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/About.jsx'), 'utf8');
assert.ok(
  !aboutSource.includes('<h4'),
  '❌ [RED]: About.jsx masih mengandung tag <h4> yang melompati hierarki H2 -> H3!'
);

const faqSource = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/Faq.jsx'), 'utf8');
assert.ok(
  !faqSource.includes('<h4') && faqSource.includes('<h3'),
  '❌ [RED]: Faq.jsx wajib menggunakan <h3> di bawah <h2> dan bebas dari lompatan <h4>!'
);

// Periksa integrasi buildProductImageAlt & syncSeoJsonLdInDom
const productCardSource = fs.readFileSync(path.join(process.cwd(), 'src/components/ui/ProductCard.jsx'), 'utf8');
assert.ok(
  productCardSource.includes('buildProductImageAlt'),
  '❌ [RED]: ProductCard.jsx wajib menggunakan buildProductImageAlt untuk atribut alt gambar!'
);

const modalSource = fs.readFileSync(path.join(process.cwd(), 'src/components/ui/ProductDetailModal.jsx'), 'utf8');
assert.ok(
  modalSource.includes('buildProductImageAlt'),
  '❌ [RED]: ProductDetailModal.jsx wajib menggunakan buildProductImageAlt untuk galeri foto!'
);

const productsSectionSource = fs.readFileSync(path.join(process.cwd(), 'src/components/sections/Products.jsx'), 'utf8');
assert.ok(
  productsSectionSource.includes('syncSeoJsonLdInDom'),
  '❌ [RED]: Products.jsx wajib memanggil syncSeoJsonLdInDom setelah fetch API selesai!'
);

console.log('   ✓ BaseLayout.astro, hierarki H1-H3, dan integrasi komponen valid.\n');

// ─────────────────────────────────────────────────────────────────────────────
// SKENARIO 4: ASSET SIZE BUDGET GUARD (< 150 KB PER BERKAS .WEBP)
// ─────────────────────────────────────────────────────────────────────────────
console.log('🔍 [SKENARIO 4]: Memeriksa anggaran ukuran seluruh aset .webp di public/images/ (< 150 KB)...');

function getAllWebpFiles(dirPath, fileList = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getAllWebpFiles(fullPath, fileList);
    } else if (entry.name.toLowerCase().endsWith('.webp')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const webpFiles = getAllWebpFiles(path.join(process.cwd(), 'public/images'));
const MAX_SIZE_BYTES = 150 * 1024; // 150 KB
const oversizedFiles = [];

for (const file of webpFiles) {
  const sizeBytes = fs.statSync(file).size;
  if (sizeBytes >= MAX_SIZE_BYTES) {
    oversizedFiles.push(`${path.relative(process.cwd(), file)} (${(sizeBytes / 1024).toFixed(1)} KB)`);
  }
}

assert.equal(
  oversizedFiles.length,
  0,
  `❌ [RED]: Ditemukan aset .webp yang melampaui anggaran 150 KB: ${oversizedFiles.join(', ')}`
);

console.log(`   ✓ Seluruh ${webpFiles.length} berkas .webp berada di bawah batas 150 KB.\n`);
console.log('🎉 [GREEN]: SELURUH SKENARIO TDD ISSUE #27 LULUS 100%!');
