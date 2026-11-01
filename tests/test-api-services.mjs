import assert from 'node:assert/strict';
import { PRODUCTS } from '../src/constants/data.js';

// Skenario Uji TDD: Spesifikasi Kontrak Lapisan Service API Client (Issue #7)
console.log('================================================================');
console.log('🧪 MENJALANKAN TEST SUITE: API CLIENT & PRODUCT SERVICE (TDD)');
console.log('================================================================\n');

async function runTestSuite() {
  console.log('🔍 [TEST 1]: Memeriksa ketersediaan modul service...');
  
  // Impor dinamis untuk menguji keberadaan file modul produksi
  const { apiGet } = await import('../src/services/apiClient.js');
  const { getProducts } = await import('../src/services/productService.js');

  console.log('✅ [TEST 1 PASS]: Modul berhasil diimpor.\n');

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

  console.log('🎉 SELURUH SKENARIO UJI BERHASIL HIJAU (GREEN)!');
}

runTestSuite().catch((err) => {
  console.error('\n💥 [RED PHASE DETECTED]: Tes gagal sesuai ekspektasi TDD!');
  console.error('Pesan Kegagalan:', err.message);
  process.exit(1);
});
