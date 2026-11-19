import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('================================================================');
console.log('🧪 TDD SUITE: SHOPEE-STYLE PRODUCT MODAL & API CONTRACT (ISSUE #30)');
console.log('================================================================\n');

async function runTestSuite() {
  // ─────────────────────────────────────────────────────────────
  // 1. DATA CONTRACT ALIGNMENT IN src/constants/data.js
  // ─────────────────────────────────────────────────────────────
  console.log('🔍 [SKENARIO 1]: Memeriksa keselarasan kontrak data lokal PRODUCTS di src/constants/data.js...');
  const { PRODUCTS } = await import('../src/constants/data.js');

  assert.ok(Array.isArray(PRODUCTS) && PRODUCTS.length > 0, '❌ PRODUCTS harus berupa array tidak kosong');

  for (const product of PRODUCTS) {
    assert.equal(
      typeof product.detail,
      'string',
      `❌ [GAGAL]: Produk "${product.name}" wajib memiliki field "detail" bertipe string!`
    );
    assert.ok(
      product.detail.trim().length > 20,
      `❌ [GAGAL]: Deskripsi produk "${product.name}" terlalu pendek/kosong!`
    );
    assert.equal(
      product.specs,
      undefined,
      `❌ [GAGAL]: Objek "specs" pada produk "${product.name}" harus sudah diamputasi dari data.js!`
    );
  }
  console.log('   ✓ Seluruh data lokal PRODUCTS telah selaras dengan payload API (detail terisi & bebas objek specs).\n');

  // ─────────────────────────────────────────────────────────────
  // 2. NORMALIZER HARDENING IN src/services/productService.js
  // ─────────────────────────────────────────────────────────────
  console.log('🔍 [SKENARIO 2]: Menguji normalisasi defensif & pembersihan specs di productService.js...');
  const { normalizeProduct } = await import('../src/services/productService.js');

  // 2.1 Amputasi properti specs dari output normalizer
  const sampleApiRaw = {
    id: 1,
    name: 'Sabun Batang Alami',
    detail: 'Formula busa lembut fermentasi buah jeruk.',
    price: 'Rp 15.000',
    order: 1,
    images: ['https://admin.sanitasihijau.com/storage/sample.webp'],
  };
  const normalized = normalizeProduct(sampleApiRaw);

  assert.equal(
    normalized.specs,
    undefined,
    '❌ [GAGAL]: normalizeProduct() tidak boleh lagi mengembalikan properti "specs"!'
  );

  // 2.2 Null-safety fallback untuk string detail
  const nullDetailRaw = { id: 2, name: 'Produk Tanpa Detail', detail: null, price: 'Rp 10.000' };
  const normalizedNull = normalizeProduct(nullDetailRaw);
  assert.equal(typeof normalizedNull.detail, 'string', '❌ detail harus selalu bertipe string');
  assert.ok(
    normalizedNull.detail.length > 0,
    '❌ [GAGAL]: normalizeProduct() wajib memberikan teks cadangan komunitas jika detail null/kosong!'
  );

  // 2.3 Sanitasi enter ganda & normalisasi newline (\r\n -> \n)
  const messyDetailRaw = {
    id: 3,
    name: 'Produk Format Acak',
    detail: 'Baris 1\r\n\r\n\r\n\r\n\r\nBaris 2\r\nBaris 3',
    price: 'Rp 20.000',
  };
  const normalizedMessy = normalizeProduct(messyDetailRaw);
  assert.ok(
    !normalizedMessy.detail.includes('\r\n'),
    '❌ [GAGAL]: Karakter CRLF (\\r\\n) harus dinormalisasi menjadi LF (\\n)!'
  );
  assert.ok(
    !normalizedMessy.detail.includes('\n\n\n'),
    '❌ [GAGAL]: Enter berturut-turut lebih dari 2 kali harus dipangkas menjadi maksimal 2 enter (\\n\\n)!'
  );
  console.log('   ✓ Normalizer productService.js terbukti null-safe, bebas specs, dan membersihkan line-break liar.\n');

  // ─────────────────────────────────────────────────────────────
  // 3. WHATSAPP CHECKOUT MESSAGE REFINEMENT IN src/utils/whatsapp.js
  // ─────────────────────────────────────────────────────────────
  console.log('🔍 [SKENARIO 3]: Menguji generator URL checkout WhatsApp tanpa kata canggung (Standar)...');
  const { buildProductCheckoutUrl } = await import('../src/utils/whatsapp.js');

  const productWithoutNetto = { name: 'Sabun Batang Eco-Enzyme', price: 'Rp 15.000' };
  const waUrl = buildProductCheckoutUrl(productWithoutNetto);

  assert.ok(
    !waUrl.includes('(Standar)'),
    '❌ [GAGAL]: Jika produk tidak memiliki info netto, pesan WhatsApp dilarang memunculkan kata "(Standar)"!'
  );
  assert.ok(
    waUrl.includes('Sabun%20Batang%20Eco-Enzyme'),
    '❌ [GAGAL]: Pesan WhatsApp wajib memuat nama produk yang valid!'
  );
  console.log('   ✓ Pesan WhatsApp checkout bersih dan elegan tanpa sisipan default "(Standar)".\n');

  // ─────────────────────────────────────────────────────────────
  // 4. STATIC COMPONENT CONTRACT IN src/components/ui/ProductDetailModal.jsx
  // ─────────────────────────────────────────────────────────────
  console.log('🔍 [SKENARIO 4]: Menguji kepatuhan antarmuka statis & AST pada ProductDetailModal.jsx...');
  const modalFilePath = path.join(rootDir, 'src/components/ui/ProductDetailModal.jsx');
  assert.ok(fs.existsSync(modalFilePath), '❌ src/components/ui/ProductDetailModal.jsx wajib ada');
  const modalSource = fs.readFileSync(modalFilePath, 'utf8');

  // 4.1 Header tunggal "Deskripsi"
  assert.ok(
    modalSource.includes('Deskripsi') && !modalSource.includes('Deskripsi & Khasiat'),
    '❌ [GAGAL]: Modal harus menyederhanakan judul menjadi "Deskripsi" murni!'
  );

  // 4.2 Utility styling native
  assert.ok(
    modalSource.includes('whitespace-pre-line'),
    '❌ [GAGAL]: Modal wajib menggunakan class "whitespace-pre-line" untuk menghormati baris baru!'
  );
  assert.ok(
    modalSource.includes('line-clamp-4'),
    '❌ [GAGAL]: Modal wajib menerapkan class "line-clamp-4" saat teks dalam keadaan menciut!'
  );

  // 4.3 State dan threshold guard toggle
  assert.ok(
    modalSource.includes('isDescriptionExpanded') || modalSource.includes('isExpanded'),
    '❌ [GAGAL]: Modal wajib memiliki state toggle ekspansi deskripsi!'
  );
  assert.ok(
    modalSource.includes('160') || modalSource.includes('isLongText'),
    '❌ [GAGAL]: Modal wajib menyertakan threshold guard (panjang > 160) agar tidak memunculkan tombol toggle pada teks pendek!'
  );

  // 4.4 Aksesibilitas WCAG AA
  assert.ok(
    modalSource.includes('aria-expanded'),
    '❌ [GAGAL]: Tombol toggle wajib menyertakan atribut aksesibilitas "aria-expanded"!'
  );

  // 4.5 Ketiadaan kode usang accordion & badge kategori
  assert.ok(
    !modalSource.includes('expandedSections') && !modalSource.includes('toggleSection'),
    '❌ [GAGAL]: Sisa kode 3 accordion lama (expandedSections / toggleSection) harus sudah dibersihkan total!'
  );
  assert.ok(
    !modalSource.includes('{category}'),
    '❌ [GAGAL]: Lencana kategori statis ({category}) harus sudah dihilangkan dari modal!'
  );
  assert.ok(
    !modalSource.includes('Ekstrak Sitrus Alami'),
    '❌ [GAGAL]: Badge hardcoded fiktif "Ekstrak Sitrus Alami" harus sudah dihilangkan dari modal!'
  );

  console.log('   ✓ Komponen ProductDetailModal.jsx lulus seluruh kontrak spesifikasi Shopee-Style.\n');
  console.log('🎉 SELURUH SKENARIO TDD LULUS!');
}

runTestSuite().catch((err) => {
  console.error('\n💥 [TEST FAILED]:');
  console.error(err.message);
  process.exit(1);
});
