import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

console.log('================================================================');
console.log('🧪 MENJALANKAN TEST SUITE: REAKTIVITAS KATALOG & SKELETON (TDD)');
console.log('================================================================\n');

async function runTestSuite() {
  const rootDir = process.cwd();
  const productCardPath = path.join(rootDir, 'src/components/ui/ProductCard.jsx');
  const productsSectionPath = path.join(rootDir, 'src/components/sections/Products.jsx');

  console.log('🔍 [TEST 1]: Memeriksa implementasi prop isLoading & blok Skeleton di ProductCard.jsx...');
  const productCardSource = fs.readFileSync(productCardPath, 'utf8');

  // Invariant 1: ProductCard wajib menerima prop isLoading
  assert.ok(
    productCardSource.includes('isLoading = false') || productCardSource.includes('isLoading'),
    'ProductCard.jsx wajib menerima prop isLoading'
  );

  // Invariant 2: Wajib memiliki early return skeleton berkelas animate-pulse, aria-hidden="true", dan aspect-square
  assert.ok(
    productCardSource.includes('animate-pulse'),
    'ProductCard saat loading wajib memuat kelas Tailwind animate-pulse'
  );
  assert.ok(
    productCardSource.includes('aria-hidden="true"'),
    'ProductCard skeleton wajib menyertakan atribut aria-hidden="true" demi standar aksesibilitas WCAG'
  );
  assert.ok(
    productCardSource.includes('aspect-square'),
    'ProductCard skeleton wajib mengunci rasio gambar aspect-square demi CLS 0.00'
  );
  console.log('✅ [TEST 1 PASS]: Dukungan Skeleton di ProductCard tervalidasi.\n');

  console.log('🔍 [TEST 2]: Memeriksa integrasi asinkron getProducts() di Products.jsx...');
  const productsSource = fs.readFileSync(productsSectionPath, 'utf8');

  // Invariant 3: Products.jsx dilarang mengimpor PRODUCTS secara sinkron dan wajib mengimpor getProducts
  assert.ok(
    productsSource.includes("import { getProducts } from '../../services/productService'") ||
    productsSource.includes('import { getProducts } from "../../services/productService"'),
    'Products.jsx wajib mengimpor fungsi getProducts dari productService'
  );
  assert.ok(
    !productsSource.includes("import { PRODUCTS } from '../../constants/data'"),
    'Products.jsx DILARANG mengimpor langsung data statis PRODUCTS secara sinkron'
  );
  console.log('✅ [TEST 2 PASS]: Integrasi getProducts() terverifikasi.\n');

  console.log('🔍 [TEST 3]: Memeriksa State Reaktif & Sinkronisasi Sensor Carousel...');
  assert.ok(
    productsSource.includes('isLoading') && productsSource.includes('setIsLoading'),
    'Products.jsx wajib mengelola state isLoading'
  );
  assert.ok(
    productsSource.includes('[products, isLoading]'),
    'Products.jsx wajib memasang useEffect dengan dependensi [products, isLoading] untuk rekalkulasi checkScroll()'
  );
  console.log('✅ [TEST 3 PASS]: Sinkronisasi reaktif carousel terverifikasi.\n');

  console.log('🎉 SELURUH SKENARIO UJI BERHASIL HIJAU (GREEN)!');
}

runTestSuite().catch((err) => {
  console.error('\n💥 [RED PHASE DETECTED]: Tes gagal sesuai ekspektasi TDD!');
  console.error('Pesan Kegagalan:', err.message);
  process.exit(1);
});
