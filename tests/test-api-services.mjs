import assert from 'node:assert/strict';
import { PRODUCTS, TESTIMONIALS, IMPACT_STATS } from '../src/constants/data.js';

// Skenario Uji TDD: Spesifikasi Kontrak Lapisan Service API Client & Domain Services (Issue #7 & #15)
console.log('================================================================');
console.log('🧪 MENJALANKAN TEST SUITE: API CLIENT, PRODUCT & TESTIMONIAL SERVICE (TDD)');
console.log('================================================================\n');

async function runTestSuite() {
  console.log('🔍 [TEST 1]: Memeriksa ketersediaan modul service...');
  
  // Impor dinamis untuk menguji keberadaan file modul produksi
  const { apiGet } = await import('../src/services/apiClient.js');
  const { getProducts } = await import('../src/services/productService.js');
  const {
    getTestimonialsData,
    normalizeStatistic,
    normalizeTestimonial,
    normalizeTestimonialsPayload,
  } = await import('../src/services/testimonialService.js');

  console.log('✅ [TEST 1 PASS]: Seluruh modul service berhasil diimpor.\n');

  console.log('🔍 [TEST 2]: Menguji Safe Result Tuple ({ data, error }) pada endpoint invalid/offline...');
  // Panggilan ke server yang tidak ada harus mengembalikan tuple { data: null, error: Error }, BUKAN melempar uncaught exception
  const result = await apiGet('/unreachable-test-endpoint', { timeout: 1000 });
  
  assert.equal(typeof result, 'object', 'apiGet harus mengembalikan objek status');
  assert.equal(result.data, null, 'data harus bernilai null saat koneksi gagal');
  assert.ok(result.error instanceof Error, 'error harus berupa instance Error');
  console.log('✅ [TEST 2 PASS]: Safe Result Tuple terbukti kebal uncaught exception.\n');

  console.log('🔍 [TEST 3]: Menguji Graceful Offline Fallback ke PRODUCTS lokal...');
  // getProducts() harus senyap menangkap error dan mengembalikan data lokal PRODUCTS
  const fallbackProducts = await getProducts();
  
  assert.ok(Array.isArray(fallbackProducts), 'getProducts harus selalu mengembalikan array');
  assert.equal(fallbackProducts.length, PRODUCTS.length, 'Jumlah produk fallback harus cocok dengan data lokal');
  assert.equal(fallbackProducts[0].name, PRODUCTS[0].name, 'Nama produk pertama harus cocok dengan data lokal');
  console.log('✅ [TEST 3 PASS]: Graceful Offline Fallback terbukti mengamankan 0% White-Screen.\n');

  console.log('🔍 [TEST 4]: Menguji Invariant Normalizer Defensif (specs: object, images: array)...');
  fallbackProducts.forEach((product, idx) => {
    assert.ok(Array.isArray(product.images), `Produk index ${idx} harus memiliki images berupa array`);
    assert.ok(typeof product.specs === 'object' && product.specs !== null, `Produk index ${idx} harus memiliki specs berupa objek non-null`);
  });
  console.log('✅ [TEST 4 PASS]: Seluruh invariant kontrak data terverifikasi aman.\n');

  console.log('🔍 [TEST 5]: Menguji Normalizer Statistik & Testimoni (Mapping description -> label)...');
  const mappedStat = normalizeStatistic({
    id: 10,
    value: '500+ kg',
    description: 'Limbah kulit jeruk berhasil diolah',
  });
  assert.ok(mappedStat, 'normalizeStatistic harus mengembalikan objek valid');
  assert.equal(mappedStat.label, 'Limbah kulit jeruk berhasil diolah', 'Field description dari backend wajib dipetakan ke label');

  const mappedTesti = normalizeTestimonial({
    id: 20,
    name: 'Ibu Kartini',
    location: 'Cilacap Tengah',
    quote: 'Sabunnya lembut di tangan.',
  });
  assert.ok(mappedTesti, 'normalizeTestimonial harus mengembalikan objek valid');
  assert.equal('avatarInitial' in mappedTesti, false, 'Objek hasil normalisasi dilarang memuat properti avatarInitial');
  console.log('✅ [TEST 5 PASS]: Normalizer memetakan field dengan presisi.\n');

  console.log('🔍 [TEST 6]: Menguji Kebijakan Atomic All-or-Fallback Shield...');
  const partialPayloadA = normalizeTestimonialsPayload({
    statistics: [{ id: 1, value: '100 kg', description: 'Limbah' }],
    testimonials: [],
  });
  assert.equal(partialPayloadA, null, 'Payload parsial (testimoni kosong) wajib ditolak oleh Atomic Shield');

  const partialPayloadB = normalizeTestimonialsPayload({
    statistics: [],
    testimonials: [{ id: 1, name: 'Warga', location: 'Desa', quote: 'Bagus' }],
  });
  assert.equal(partialPayloadB, null, 'Payload parsial (statistik kosong) wajib ditolak oleh Atomic Shield');

  const deactivatedByFlag = normalizeTestimonialsPayload({
    id: 1,
    title: 'Apa Kata Mereka?',
    is_active: false,
    statistics: [],
    testimonials: [],
  });
  assert.ok(deactivatedByFlag, 'Payload dengan is_active: false harus diterima sebagai sinyal nonaktif sah');
  assert.equal(deactivatedByFlag.isActive, false, 'isActive wajib bernilai false saat is_active: false dari backend');

  const deactivatedByNull = normalizeTestimonialsPayload(null);
  assert.ok(deactivatedByNull, 'Payload data: null dari backend harus diterima sebagai sinyal nonaktif sah');
  assert.equal(deactivatedByNull.isActive, false, 'isActive wajib bernilai false saat backend mengembalikan data: null');

  const fallbackTestimonials = await getTestimonialsData();
  assert.equal(typeof fallbackTestimonials.isActive, 'boolean', 'getTestimonialsData wajib mengembalikan boolean isActive');
  assert.equal(fallbackTestimonials.isFallback, true, 'Status isFallback wajib bernilai true saat offline');
  assert.equal(fallbackTestimonials.statistics.length, IMPACT_STATS.length, 'Jumlah statistik fallback wajib identik dengan IMPACT_STATS');
  assert.equal(fallbackTestimonials.testimonials.length, TESTIMONIALS.length, 'Jumlah testimoni fallback wajib identik dengan TESTIMONIALS');
  console.log('✅ [TEST 6 PASS]: Atomic All-or-Fallback Shield terbukti menjaga keutuhan seksi Social Proof.\n');

  console.log('🎉 SELURUH SKENARIO UJI BERHASIL HIJAU (GREEN)!');
}

runTestSuite().catch((err) => {
  console.error('\n💥 [RED PHASE DETECTED]: Tes gagal sesuai ekspektasi TDD!');
  console.error('Pesan Kegagalan:', err.message);
  process.exit(1);
});
