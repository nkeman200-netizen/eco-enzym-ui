<!-- RequestFeedback: false -->
# [FEAT] Issue #9: Refaktor Reaktivitas Komponen Katalog & Modal Produk dengan Skeleton Loading Defensif
- **Target GitHub Issue:** #9
- **Branch Terkait:** `feature/issue-9-reactive-products-catalog`
- **Arsip Permanen:** `docs/plan/issue-09-arch-reactive-products-catalog.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Kotak Display Etalase yang Presisi:**
> Komponen `Products.jsx` kita adalah rak kaca toko produk alami Jeruklegi.
> 1. Saat pertama kali pintu toko dibuka (fase loading), pelayan toko meletakkan 4 balok kayu pajangan abu-abu berdenyut (*Semantic Skeleton Loader*) di rak.
> 2. Balok pajangan ini dirancang memiliki dimensi dan lekukan yang **identik 1:1** dengan kartu aslinya (`aspect-square`, `rounded-3xl`, dan lebar `w-[78vw]` pada layar ponsel). Hal ini menjamin pembeli tidak merasakan guncangan atau pergeseran tata letak (*Cumulative Layout Shift* = 0.00).
> 3. Begitu data produk selesai diambil dari gudang pusat via `getProducts()` (atau saklar genset lokal `PRODUCTS` jika server offline), kartu produk asli diletakkan di rak secara seketika memanfaatkan fitur *Automatic Batching* React 19.
> 4. Sensor navigasi panah kiri/kanan (`checkScroll()`) secara otomatis dikalibrasi ulang lewat `useEffect` reaktif agar pembeli bisa langsung menggeser katalog dengan mulus.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp & codebase inspection)
1. **`src/services/productService.js` (Verified):**
   - Menyediakan fungsi `getProducts()` yang mengembalikan `Promise<Array<object>>`.
   - Mengimplementasikan *Graceful Offline Fallback* otomatis ke `PRODUCTS` lokal jika terjadi galat jaringan atau timeout 3000 ms.
2. **`src/components/ui/ProductCard.jsx` (LSP Symbol Verified):**
   - Saat ini menerima props `{ product, onSelect, fallbackIcon }`.
   - Akan ditambahkan prop `isLoading = false` dengan blok *Early Return* berkelas `animate-pulse` dan atribut `aria-hidden="true"`.
3. **`src/components/sections/Products.jsx` (LSP Symbol Verified):**
   - Mengelola state modal `selectedProduct`, referensi DOM `scrollRef`, dan status panah `canScrollLeft` / `canScrollRight`.
   - Mengimpor `PRODUCTS` statis di baris 6 yang akan digantikan oleh state reaktif `[products, setProducts]` dan `[isLoading, setIsLoading]`.
4. **`src/components/ui/ProductDetailModal.jsx` (LSP Symbol Verified):**
   - Sudah menerapkan *defensive destructuring* berlapis dan penguncian scroll `document.body` yang bersih.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)
- **Keterbukaan Biaya Dependensi:**
  - Kita **menolak 100%** library eksternal seperti `react-loading-skeleton`, `swr`, atau `framer-motion` demi mematuhi Konstitusi `.agentrules` dan mempertahankan 0 KB JS overhead di luar React bawaan.
  - Kita menggunakan utilitas bawaan Tailwind CSS v4 (`animate-pulse`) yang sepenuhnya diproses oleh GPU browser (*Hardware Accelerated*).
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Developer Overhead:* Kita harus menyusun blok JSX skeleton 1:1 secara teliti di dalam `ProductCard.jsx` (~20 baris kode) agar dimensinya tidak melenceng dari kartu riil.
  - *Perceived Loading:* Pengunjung dengan koneksi lambat akan melihat kartu skeleton berdenyut selama beberapa ratus milidetik sebelum kartu riil muncul (namun ini memberikan kejelasan visual bahwa data sedang dimuat).

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer & Integrasi Asinkron
* **Tujuan:** Memvalidasi ketersediaan `getProducts()` dari `src/services/productService.js` dan menjamin kontrak data yang stabil.
* **Langkah:**
  - Menghubungkan pemanggilan data di tingkat seksi tanpa mengubah struktur data `src/constants/data.js`.

---

### 🧱 Fase 2: Reusable Design System Atoms (`src/components/ui/ProductCard.jsx`)
* **Tujuan:** Membekali kartu produk dengan kemampuan visual loading yang presisi dan aksesibel.
* **Spesifikasi Teknis:**
  - Menambahkan prop `isLoading = false` pada parameter `ProductCard`.
  - Memasang blok **Early Return Skeleton**:
    * Pembungkus utama: `bg-[#FDFBF7] rounded-3xl border border-brand-accent/20 p-4 sm:p-5 flex flex-col justify-between h-full animate-pulse select-none`.
    * Wadah gambar: `w-full aspect-square rounded-2xl bg-brand-accent/10 border border-brand-accent/15`.
    * Balok nama produk: `h-5 bg-brand-accent/15 rounded-md w-3/4 mt-4`.
    * Balok netto: `h-3.5 bg-brand-accent/10 rounded w-1/4 mt-2`.
    * Balok harga: `h-6 bg-brand-accent/15 rounded-lg w-1/2 mt-4`.
    * Sematkan atribut `aria-hidden="true"` pada kontainer skeleton.

---

### 🧱 Fase 3: Layout Sections & State Orchestration (`src/components/sections/Products.jsx`)
* **Tujuan:** Mengorkestrasi pemuatan data asinkron, transisi state, dan rekalkulasi navigasi carousel.
* **Spesifikasi Teknis:**
  - Mengimpor `getProducts` dari `../../services/productService`.
  - Inisialisasi state reaktif:
    * `const [products, setProducts] = useState([]);`
    * `const [isLoading, setIsLoading] = useState(true);`
  - Lifecycle Data Fetching (`useEffect`):
    * Menggunakan flag `let isMounted = true;` untuk mencegah memory leak.
    * Memanggil `await getProducts()`.
    * Memperbarui state secara atomik (*Automatic Batching*): `setProducts(data); setIsLoading(false);`.
    * Cleanup function: `return () => { isMounted = false; };`.
  - Sensor Navigasi Carousel Reaktif (`useEffect`):
    * Memantau dependensi `[products, isLoading]`.
    * Memicu `checkScroll()` pasca-render DOM secara deterministik.
  - Perenderan List Produk / Skeleton:
    * Jika `isLoading === true`: Render 4 kartu dummy skeleton `Array.from({ length: 4 }).map((_, idx) => <ProductCard key={idx} isLoading={true} />)`.
    * Jika `isLoading === false`: Render `products.map(product => <ProductCard key={product.id} product={product} onSelect={setSelectedProduct} />)`.

---

### 🧱 Fase 4: Audit Komponen Modal (`src/components/ui/ProductDetailModal.jsx`)
* **Tujuan:** Memastikan modal detail tetap aman dan tidak mengalami anomali saat menerima snapshot produk dinamis.
* **Spesifikasi Teknis:**
  - Verifikasi bahwa modal hanya me-mount ke DOM jika `selectedProduct !== null`.
  - Verifikasi null-safety pada tombol checkout WhatsApp di dalam modal.

---

### 🧱 Fase 5: Quality Gate & Verifikasi Otomatis
* **Tujuan:** Memvalidasi ketiadaan regresi sintaks dan keberhasilan build produksi.
* **Langkah:**
  1. Jalankan `npm run lint` (`oxlint`) ➔ Wajib 0 error / 0 warning.
  2. Jalankan `node tests/test-api-services.mjs` ➔ Memastikan service layer tetap hijau.
  3. Jalankan `npm run build` (`astro build`) ➔ Kompilasi statis wajib sukses 100%.

---

## 🛡️ Jaring Pengaman Uji & Kriteria Kelayakan (Definition of Done)
- [ ] Prop `isLoading` dan *Early Return Skeleton* terimplementasi di `ProductCard.jsx`.
- [ ] State reaktif `products` dan `isLoading` terhubung ke `getProducts()` di `Products.jsx`.
- [ ] Hook pemantau `[products, isLoading]` terpasang untuk mengalibrasi sensor carousel.
- [ ] Dimensi kartu skeleton terbukti identik 1:1 dengan kartu produk riil (CLS 0.00).
- [ ] Linter `oxlint` lulus 100% tanpa error/warning.
- [ ] Kompilasi `astro build` sukses tanpa warning.
- [ ] Kriteria Penolakan PR: Ditolak jika menambah dependensi pihak ketiga di `package.json` atau memicu layout shift visual.
