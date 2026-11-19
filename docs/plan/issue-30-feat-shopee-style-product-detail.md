# [FEAT] Issue #30: Refactor Product Modal to Shopee-Style Single Description & Synchronize API Data Contract
- **Target GitHub Issue:** [#30](https://github.com/nkeman200-netizen/eco-enzym-ui/issues/30)
- **Branch Terkait:** `feature/issue-30-shopee-style-product-detail`
- **Dokumen Rencana:** `docs/plan/issue-30-feat-shopee-style-product-detail.md`

---

## 🎯 1. Ringkasan Eksekutif & Konteks Bisnis
Berdasarkan hasil rapat dosen pembimbing dan pengurus komunitas, website ini berfungsi sebagai etalase pengenalan D2C di mana transaksi utama tetap berlangsung di luar web melalui komunikasi WhatsApp langsung. Form input produk di CMS admin Laravel telah disederhanakan dari skema banyak kolom spesifikasi menjadi **satu kolom teks bebas (`detail`)** agar tidak membebani kader ibu-ibu Desa Jeruklegi yang akan mengelola sistem di kemudian hari.

Dokumen rencana ini merumuskan langkah refaktorisasi arsitektur frontend untuk menyelaraskan antarmuka modal detail produk (`ProductDetailModal.jsx`) dan lapisan data (`productService.js` & `src/constants/data.js`) dari model 3 accordion kaku menjadi **Model Deskripsi Tunggal Terstruktur (Shopee-Style)** dengan kontrol *Progressive Disclosure* yang ramah ponsel.

---

## 🏛️ 2. Rangkuman Konsensus Arsitektur (Architectural Alignment Brief)
1. **Pilihan Desain UI (Opsi 1):** Menggunakan Tailwind CSS native `line-clamp-4` dengan lapisan gradasi pudar (*gradient fade-out*) dan tombol toggle *"Lihat Selengkapnya ↓"* / *"Tutup Sebagian ↑"*. Header disederhanakan menjadi satu judul bersih: **"Deskripsi"**.
2. **Pembersihan Elemen Fiktif:** Lencana kategori dihapus dari modal karena tidak disediakan oleh endpoint backend `GET /api/v1/products`. Lencana harga terjangkau (`price`) tetap dipertahankan.
3. **Penyelarasan Kontrak Data (Opsi 1):** Amputasi bersih objek `specs` dari seluruh siklus data frontend. Normalizer `productService.js` membersihkan sisa `safeSpecs` dan memperkuat sanitasi string `detail`. Data lokal `PRODUCTS` di `src/constants/data.js` diperkaya narasi `detail`-nya agar identik dengan payload backend.
4. **Pencegahan Tombol Hantu (Threshold Guard):** Tombol toggle ekspansi HANYA dirender jika panjang karakter `detail.length > 160`. Teks pendek tampil utuh tanpa tombol toggle.
5. **Aksesibilitas & Anti-XSS:** Memanfaatkan class native `whitespace-pre-line` (0 KB parser library, 100% imun dari celah XSS) dan melengkapi tombol toggle dengan atribut `aria-expanded` serta `aria-controls`.

---

## 🏗️ 3. Hierarki Implementasi Bottom-Up (5 Fase Eksekusi)

### Fase 1: Data Layer & Single Source of Truth
* **Berkas:** `src/constants/data.js`
  - Hapus seluruh blok objek `specs: { ... }` pada array `PRODUCTS`.
  - Perkaya teks `detail` pada 4 produk lokal (Sabun Batang, Pembersih Lantai, Pembersih Kaca, Pembersih Kamar Mandi) dengan narasi terstruktur yang mencakup khasiat, bahan alami, dan cara pakai singkat.
* **Berkas:** `src/services/productService.js`
  - Hapus variabel `safeSpecs` dan properti `specs` dari objek kembalian `normalizeProduct()`.
  - Normalisasi string `detail`: konversi `\r\n` ke `\n`, pangkas enter kosong ganda liar (`.replace(/\n{3,}/g, '\n\n')`), dan sematkan fallback teks aman komunitas jika nilai `detail` kosong/null.
* **Berkas:** `src/utils/whatsapp.js`
  - Perbarui fungsi `buildProductCheckoutUrl`: jika produk tidak memiliki `netto`, kalimat pesanan tidak memaksakan kata `(Standar)` melainkan langsung menyusun kalimat bersih: `Halo, saya tertarik pesan {name} seharga {price} Eco-Enzyme Jeruklegi.`.
* **Berkas:** `src/utils/seoSchema.js`
  - Verifikasi ketahanan `buildProductImageAlt` dan `resolveSchemaAvailability` agar tetap berjalan anggun (*graceful fallback*) saat `product.specs` tidak ada.

### Fase 2: Reusable Design System Atoms
* **Berkas:** `src/components/ui/ProductDetailModal.jsx`
  - Hapus lencana kategori (`category`) di atas nama produk.
  - Hapus seluruh blok markup 3 accordion (`Spesifikasi`, `Komposisi`, `Cara Pakai`) beserta state `expandedSections`, fungsi `toggleSection`, dan impor icon `Plus`/`Minus`.
  - Tambahkan state boolean baru: `const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)`.
  - Susun blok *"Deskripsi"*:
    - Header label: `<h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-1.5">Deskripsi</h4>`.
    - Kontainer teks: `<p id="product-detail-description" className={...}>` dengan class `whitespace-pre-line text-sm text-gray-700 leading-relaxed`.
    - Pemasangan class `line-clamp-4 relative` dan lapisan semu gradasi `absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none` saat `!isDescriptionExpanded && isLongText`.
    - Pemasangan tombol interaktif *"Lihat Selengkapnya ↓"* / *"Tutup Sebagian ↑"* yang dipagari syarat `isLongText` (`detail.length > 160`), lengkap dengan atribut `aria-expanded={isDescriptionExpanded}` dan `aria-controls="product-detail-description"`.

### Fase 3: Layout Sections Integration
* **Berkas:** `src/components/sections/Products.jsx`
  - Verifikasi penyaluran data produk dari `Products.jsx` ke `<ProductDetailModal>` saat pengguna mengklik kartu produk.
  - Pastikan tidak ada properti `specs` yang bocor atau dipanggil paksa di level katalog luar.

### Fase 4: Page Assembly & Shell
* **Berkas:** `src/pages/index.astro`
  - Verifikasi bahwa halaman utama Astro tetap mempertahankan performa 0 KB client-side JS di luar pulau reaktif `Products.jsx`.

### Fase 5: Quality Gate & Verification
* **Berkas Baru:** `tests/test-shopee-style-modal.mjs`
  - Skenario 1: Uji normalizer `productService.js` (validasi null-safety, ketiadaan properti `specs`, dan pembersihan enter ganda).
  - Skenario 2: Uji kontrak data lokal `src/constants/data.js` (memastikan seluruh item `PRODUCTS` memiliki `detail` valid dan bebas `specs`).
  - Skenario 3: Uji AST komponen `ProductDetailModal.jsx` (memastikan keberadaan `line-clamp-4`, `whitespace-pre-line`, `aria-expanded`, dan nihilnya accordion `Plus`/`Minus`).
* **Verifikasi Mutu Standar:**
  - `npm run lint` (`oxlint`): Wajib 0 error, 0 warning.
  - `npm run build` (`astro build`): Wajib exit code 0.

---

## ⚖️ 4. Keterbukaan Sisi Gelap & Biaya Dependensi
* **Ukuran Bundle:** Penambahan bundle JavaScript: **0 KB** (menggunakan utility murni Tailwind CSS v4 tanpa memasang pustaka parser Markdown atau animasi pihak ketiga).
* **Karakteristik Tampilan:** Transisi ekspansi teks berlangsung instan (*snappy / non-animated height*). Ini adalah kompromi yang disengaja demi menghindari *layout thrashing* dan masalah teks terpotong (*accidental overflow clipping*) pada perangkat ponsel berspesifikasi rendah.
* **Perubahan Kontrak:** Objek `specs` dihapus permanen dari memori frontend. Jika di masa depan dibutuhkan data terpisah seperti nomor registrasi izin edar, data tersebut disarankan dimasukkan sebagai field eksplisit tersendiri di tingkat root payload produk.

---

## 🛡️ 5. Jaring Pengaman Uji (Definition of Done)
- [ ] Objek `specs` 100% teramputasi dari `productService.js` dan `src/constants/data.js`.
- [ ] Seluruh item pada `PRODUCTS` di `src/constants/data.js` memiliki narasi `detail` yang kaya dan selaras dengan API.
- [ ] Modal menampilkan header "Deskripsi" dengan format `whitespace-pre-line`.
- [ ] Tombol "Lihat Selengkapnya" HANYA muncul pada teks > 160 karakter dan memiliki atribut `aria-expanded`.
- [ ] Generator URL WhatsApp tidak memunculkan kata `(Standar)` saat `netto` tidak tersedia.
- [ ] Lulus pengujian otomatis `tests/test-shopee-style-modal.mjs`.
- [ ] Lulus verifikasi linter (`npm run lint` 0 error) dan build produksi (`npm run build` sukses).
