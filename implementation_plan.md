<!-- RequestFeedback: false -->
# [ARCH] Issue #5: Dokumen Spesifikasi Kontrak Data Backend (RFC / Payload Proposal eco-enzyme-be)
- **Target GitHub Issue:** #5
- **Branch Terkait:** `docs/issue-5-backend-data-contract-rfc`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Jembatan Penyeberangan Dua Repositori:**
> Di sisi hulu, tim backend Laravel (`eco-enzyme-be`) bertindak sebagai **Dapur Pengolahan Data**. Di sisi hilir, antarmuka Astro (`eco-enzyme-landing`) bertindak sebagai **Etalase Restoran Bintang Lima**.
> Jika dapur mengirimkan bahan mentah secara acak tanpa buku menu standar, etalase restoran akan kewalahan menata piring saji, bahkan bisa menyajikan piring kosong (*TypeError / White Screen*).
>
> Dokumen **RFC (Request for Comments)** ini adalah **Buku Menu Standar Resmi** yang menyepakati:
> 1. Piring apa saja yang diolah oleh dapur (Katalog Produk, Testimoni, dan Kontak).
> 2. Piring apa saja yang sengaja dibuat di etalase restoran (7 seksi StoryBrand 7 statis demi mengunci konversi dan skor Lighthouse 100).
> 3. Bagaimana bahan masakan disusun rapi dalam wadah biner (`$table->json('specs')` & `images: string[]`) agar dapur mudah memasak dan etalase langsung siap menyajikan ke tamu.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp)
1. **`src/constants/data.js` (LSP Symbol Verified):**
   - Mendefinisikan konstanta data statis `PRODUCTS` (dengan nested object `specs` dan array `images`), `TESTIMONIALS`, `IMPACT_STATS`, dan `CONTACT_INFO`.
   - Mengonfirmasi seluruh penamaan properti di antarmuka frontend saat ini: `netto`, `packaging`, `shape`, `suitability`, `stock`, `certification`, `ingredients`, `usage`.
2. **`src/components/ui/ProductDetailModal.jsx` (LSP Symbol Verified):**
   - Mengonsumsi `images: string[]` secara langsung untuk galeri scroll-snap (Index 0 = cover card, Index 1+ = galeri modal).
   - Mendestrukturisasi `specs` dengan aman dan merender 3 accordion bertingkat (*Spesifikasi*, *Komposisi*, *Cara Pakai*).
3. **Repositori Backend (`eco-enzyme-be`):**
   - Model `Product` memiliki relasi `hasMany` ke `ProductDetailImage`.
   - Rute `routes/api.php` telah memiliki endpoint v1 publik: `/products`, `/testimonials`, `/contact`.
   - Kesenjangan teridentifikasi: belum ada kolom `specs` (akan ditambahkan via JSON column), dan output resource `ProductResource` memisahkan `image_url` dengan `detail_images`.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)
- **Ketergantungan Eksekusi Tim Backend:**
  - Frontend tidak bisa menyajikan data dinamis sebelum rekan tim backend menerapkan migrasi dan pembaruan `ProductResource.php`.
  - *Mitigasi:* Dokumen RFC menyertakan potongan kode implementasi Laravel yang 100% siap salin (*copy-pasteable snippets*) sehingga backend tinggal mengeksekusinya dalam hitungan menit.
- **Disiplin Dokumentasi Ganda:**
  - Dokumen RFC hidup di repositori frontend, namun menjadi pedoman tim backend.
  - *Mitigasi:* Dokumen ditulis dalam format Markdown standar yang dapat dibaca langsung di browser atau diekspor ke Wiki/GitHub Docs.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Penyusunan Dokumen RFC (`docs/RFC_DATA_CONTRACT_BACKEND.md`)
* **Tujuan:** Menulis dokumen spesifikasi resmi terlengkap mengadopsi format *Context-Rich Enterprise RFC*.
* **Bab Dokumen:**
  1. **Bab 1: Executive Summary, Content Governance, & Non-Goals:**
     - Menjelaskan rasional *Content Governance vs Content Operations* untuk UMKM Jeruklegi.
     - Matriks Pemisahan: 7 Seksi Statis (Astro 0 KB JS) vs 3 Domain Dinamis (Laravel CMS).
     - Bab *Non-Goals*: Menegaskan alasan ilmiah mengapa `/home`, `/about`, dan `/how-to-orders` (Plan) berstatus statis di Astro.
  2. **Bab 2: Spesifikasi Kontrak 3 Domain Operasional:**
     - **Domain 1 (Katalog Produk & Spesifikasi):** `GET /api/v1/products`
       - Skema DTO bersih: `images: string[]` dan `specs: object`.
     - **Domain 2 (Social Proof & Statistik Dampak):** `GET /api/v1/testimonials`
       - Skema `statistics` (`value`, `description`) dan `testimonials` (`name`, `location`, `quote`).
       - Penegasan penghapusan avatar inisial berwarna (*anti-pattern*) demi gaya *Clean Editorial Typography*.
     - **Domain 3 (Kontak & WhatsApp Checkout):** `GET /api/v1/contact`
       - Skema `whatsapp_number`, `location`, `email`.
       - Sentralisasi generator link WhatsApp di sisi klien.
  3. **Bab 3: Panduan Implementasi Teknis Laravel (Siap Salin):**
     - Migration: `$table->json('specs')->nullable();`
     - Model: `casts() => ['specs' => 'array']` di `Product.php`
     - Resource: Perakitan array di `ProductResource.php`
  4. **Bab 4: Invariants, Error Handling, & Ketahanan Sistem:**
     - Garansi non-null `{}` dan array `[]` dari backend.
     - Fallback visual `"-"` di antarmuka frontend.
     - Strategi *Graceful Offline Fallback* berbasis `src/constants/data.js`.

---

### ⚛️ Fase 2: Validasi Keselarasan Kontrak Frontend
* **Tujuan:** Menjamin keandalan antarmuka frontend terhadap kontrak RFC.
* **Tindakan:**
  - Audit silang antara skema JSON RFC dengan struktur data di `src/constants/data.js`.
  - Memastikan tidak ada properti yang bertentangan atau menyebabkan *undefined error* pada komponen `ProductCard.jsx`, `ProductDetailModal.jsx`, `Testimonials.jsx`, dan `Footer.jsx`.

---

### 🧩 Fase 3: Validasi Keselarasan Kontrak Backend
* **Tujuan:** Menjamin kemudahan adopsi bagi pengembang backend.
* **Tindakan:**
  - Audit silang dengan model, migrasi, dan rute di `C:/Users/sofya/Documents/JS/eco-enzyme-be`.
  - Memastikan nama kolom, tipe data biner MySQL 8, dan metode Eloquent pada panduan implementasi 100% valid dan *idiomatic* di Laravel 11/12.

---

### 🛡️ Fase 4: Quality Gate & Verification Matrix
* **Kriteria Kelulusan Mutlak (Definition of Done):**
  - [ ] **Linter Pass:** `npm run lint` (`oxlint`) lolos dengan **0 error** dan **0 warning**.
  - [ ] **Astro Build Pass:** `npm run build` sukses mengompilasi dist tanpa kegagalan sintaks.
  - [ ] **Completeness Verification:** Berkas `docs/RFC_DATA_CONTRACT_BACKEND.md` memuat 4 bab utama secara lengkap dan jelas.

---

## 📋 Peta Berkas Terdampak (Blast Radius)

| Status Berkas | Jalur Berkas | Keterangan Perubahan |
| :--- | :--- | :--- |
| 🆕 **Baru** | `docs/RFC_DATA_CONTRACT_BACKEND.md` | Dokumen resmi RFC Spesifikasi Kontrak Data Backend |
| 📝 **Modifikasi** | `DEVELOPMENT_ROADMAP.md` | Penambahan item perbaikan kartu testimoni editorial typography |
| 🔒 **Zero-Touch** | `src/constants/data.js` | Single Source of Truth tetap terjaga (diperbarui di tiket implementasi klien) |
| 🔒 **Zero-Touch** | `src/components/*` | Komponen visual tidak disentuh pada tiket dokumentasi arsitektur ini |

---

## 🛑 Pintu Masuk Eksekusi Eksklusif
Sesuai protokol konstitusi, rencana implementasi ini dirancang dengan aman dan tidak akan mengeksekusi kode secara otomatis.
Pekerjaan implementasi hanya akan dimulai jika pengguna secara eksplisit mengetikkan perintah:
- `/execute` ➔ Memulai penulisan dokumen `docs/RFC_DATA_CONTRACT_BACKEND.md` dan verifikasi sistem.
