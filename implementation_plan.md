<!-- RequestFeedback: false -->
# [ARCH] Issue #7: Pembangunan Service API Client Layer & Graceful Offline Fallback Shield (0% White-Screen)
- **Target GitHub Issue:** #7
- **Branch Terkait:** `feature/issue-7-api-client-service-layer`
- **Arsip Permanen:** `.docs/plan/issue-07-arch-api-client-service-layer.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Saklar Genset Otomatis (*Automatic Transfer Switch*):**
> Komponen UI etalase katalog (`Products.jsx`) dan modal detail (`ProductDetailModal.jsx`) adalah perangkat medis di ruang operasi yang membutuhkan aliran listrik tanpa kedip (0% White-Screen).
> 
> Lapisan **Service Layer** yang kita bangun bertindak sebagai **Saklar Transfer Cerdas**:
> 1. Saluran utama terhubung ke tiang listrik kota (API Backend Laravel `https://sanitasihijau.com/api/v1/products`).
> 2. Di saklar tersebut dipasang sensor batas waktu (*Timeout 3000 ms*). Jika dalam 3 detik listrik tidak mengalir, atau kabel putus (*network error / server 500*), saklar secara otomatis dan senyap mengalihkan daya ke genset lokal (`src/constants/data.js`).
> 3. Alur data menggunakan pola **Safe Result Tuple (`{ data, error }`)** tanpa lemparan exception (`throw`), sehingga komponen UI menerima data yang aman dan deterministik tanpa perlu takut crash.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp)
1. **`src/constants/data.js` (LSP Symbol Verified):**
   - Berisi konstanta `PRODUCTS` yang saat ini menjadi *Single Source of Truth* data lokal dengan 4 item produk lengkap (`id`, `name`, `price`, `detail`, `images`, `specs`).
   - Tidak ada error diagnostik (`0 diagnostics received`).
2. **`src/components/sections/Products.jsx` (LSP Symbol Verified):**
   - Mengimpor `PRODUCTS` secara langsung di baris ke-6.
   - State lokal `selectedProduct` mengonsumsi objek produk untuk dioper ke `ProductDetailModal`.
3. **Ketiadaan Lapisan Jaringan:**
   - Belum ada folder `src/services/` di repositori frontend.
   - Pembangunan lapisan ini murni modular baru (*Zero Blast Radius* ke komponen UI saat ini).

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)
- **Keterbukaan Biaya Dependensi:**
  - Kita **menolak** penggunaan library HTTP berat seperti `axios` (~15 KB) demi mempertahankan bobot JavaScript super-ringan dan skor Google Lighthouse 100/100.
  - Kita menggunakan **Native Web Fetch API** standar isomorphic (WinterCG) yang built-in di Node.js 22/24 dan browser modern.
  - *Sisi Gelap / Harga Teknis:* Kita harus menulis sendiri wrapper `apiClient.js` (~35 baris) untuk menangani *timeout abort* dan ekstraksi JSON secara defensif.
- **Batasan Ruang Lingkup (Scope Isolation):**
  - Tiket ini fokus membangun fondasi service dan jaring pengaman fallback.
  - Penyambungan reaktif ke komponen UI (`Products.jsx`) diisolasi ke tiket berikutnya di Roadmap agar pengujian ketahanan jaringan dapat divalidasi secara terpisah.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Fondasi Transport Jaringan (`src/services/apiClient.js`)
* **Tujuan:** Menyediakan fungsi transportasi HTTP generik yang kebal *uncaught exceptions*.
* **Spesifikasi Teknis:**
  - Fungsi `apiGet(endpoint, options = {})` berbasis `fetch` native.
  - Penggunaan `AbortController` dengan batas waktu ketat `timeout = 3000` ms.
  - Pengembalian format **Safe Result Tuple**: `{ data: T | null, error: Error | null }`.
  - Resolusi URL dinamis: `import.meta.env.PUBLIC_API_URL` dengan fallback ke `https://sanitasihijau.com/api/v1`, dilengkapi sanitasi *trailing slash*.
  - Parsing JSON defensif: jika response body bukan JSON valid, kembalikan objek error ramah tanpa *crash*.

---

### 🧱 Fase 2: Layanan Domain Produk & Graceful Fallback (`src/services/productService.js`)
* **Tujuan:** Menyediakan abstraksi data produk dengan perlindungan *Defense in Depth* dan *Silent Fallback*.
* **Spesifikasi Teknis:**
  - Mengimpor `apiGet` dari `./apiClient` dan `PRODUCTS` dari `../constants/data`.
  - Fungsi `normalizeProduct(raw)`:
    * Memastikan `images` selalu berupa `string[]` (minimal array kosong `[]`).
    * Memastikan `specs` selalu berupa `object` (minimal objek kosong `{}`).
    * Mempertahankan properti teks inti (`id`, `name`, `price`, `detail`, `order`).
  - Fungsi `getProducts()`:
    * Memanggil `apiGet('/products')`.
    * Jika `error` ada atau data bukan array, catat peringatan di `console.warn` dan **kembalikan `PRODUCTS` lokal**.
    * Jika sukses, petakan data melalui `normalizeProduct` dan kembalikan array produk bersih.

---

### 🧱 Fase 3: Konfigurasi Environment & Dokumentasi (`.env.example`)
* **Tujuan:** Menyediakan template variabel lingkungan resmi proyek.
* **Spesifikasi Teknis:**
  - Membuat berkas `.env.example` di root proyek:
    ```bash
    # URL Base API Backend Laravel (Astro Client & SSR)
    # Gunakan http://localhost:8000/api/v1 untuk development dengan backend lokal
    PUBLIC_API_URL=https://sanitasihijau.com/api/v1
    ```

---

### 🧱 Fase 4: Pengujian Ketahanan Offline & Skenario Gangguan
* **Tujuan:** Memvalidasi secara mekanis bahwa service layer tidak pernah crash dan selalu mengembalikan data fallback saat backend bermasalah.
* **Skenario Uji (Automated Verification Script):**
  1. **Uji Kasus Normal (Local Fallback Trigger):** Jalankan skrip node dengan URL palsu / server mati ➔ Pastikan `getProducts()` mengembalikan 4 item produk `PRODUCTS` tanpa error.
  2. **Uji Kasus Timeout:** Simulasikan delay > 3000 ms ➔ Pastikan request ter-abort rapi dan fallback aktif.
  3. **Uji Normalizer Defensif:** Masukkan payload rusak (`specs: null`, `images: null`) ➔ Pastikan data dinormalisasi menjadi `{ specs: {}, images: [] }`.

---

### 🧱 Fase 5: Quality Gate & Verifikasi Bundle
* **Tujuan:** Memastikan kepatuhan linting dan ketiadaan regresi build.
* **Langkah:**
  1. Jalankan `npm run lint` (`oxlint`) ➔ Wajib 0 error / 0 warning.
  2. Jalankan `npm run build` (`astro build`) ➔ Kompilasi statis wajib sukses 100%.

---

## 🛡️ Jaring Pengaman Uji & Kriteria Kelayakan (Definition of Done)
- [ ] Berkas `src/services/apiClient.js` terimplementasi dengan Safe Result Tuple dan timeout 3000 ms.
- [ ] Berkas `src/services/productService.js` terimplementasi dengan fungsi `getProducts()` dan normalizer defensif.
- [ ] Berkas `.env.example` terdokumentasi dengan rapi.
- [ ] Pengujian offline fallback terbukti mengembalikan `PRODUCTS` lokal saat simulasi API gagal.
- [ ] `npm run lint` lulus 100% tanpa error/warning.
- [ ] `npm run build` lulus 100% tanpa warning.
- [ ] Kriteria Penolakan PR: Ditolak jika ada dependensi eksternal baru di `package.json` atau jika fungsi service melempar *unhandled exception*.
