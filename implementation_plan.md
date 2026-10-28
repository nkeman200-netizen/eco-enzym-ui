<!-- RequestFeedback: false -->
# [ARCH] Issue #3: Migrasi Bundler & Shell ke Astro (Islands Architecture: 0 KB JS Default)
- **Target GitHub Issue:** #3
- **Branch Terkait:** feature/issue-3-astro-bundler-migration

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Kapal Pesiar vs Kepulauan (Islands Architecture):**
> Pada arsitektur Vite SPA sebelumnya, seluruh landing page ibarat **satu kapal pesiar raksasa dari besi (JavaScript ~170KB)**. Meskipun pengunjung hanya ingin membaca teks di dek kapal (seksi statis seperti Hero atau About), browser ponsel harus mengerek dan merakit seluruh mesin kapal terlebih dahulu sebelum teks bisa dibaca.
> 
> Dengan beralih ke **Astro Islands Architecture**, halaman diubah menjadi **pulau daratan alami dari karang (0 KB JavaScript / HTML murni)**. Kita hanya meletakkan dua mesin interaktif kecil di dermaga:
> 1. Pintu gerbang navigasi (`Navbar`) yang langsung aktif seketika (`client:load`).
> 2. Etalase katalog interaktif (`Products`) yang baru dinyalakan mesinnya saat pengunjung berjalan mendekatinya (`client:visible`).
> 
> Hasilnya: 8 seksi StoryBrand 7 lainnya terkirim murni sebagai HTML statis super ringan tanpa overhead komputasi JavaScript.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp)
1. **`src/components/sections/Navbar.jsx` (LSP Symbol Verified):**
   - Komponen fungsional dengan state reaktif `isOpen` (baris 8) dan handler `handleLinkClick` (baris 18).
   - Valid untuk hidrasi: `<Navbar client:load />`.
2. **`src/components/sections/Products.jsx` (LSP Symbol Verified):**
   - Komponen fungsional mengelola state `selectedProduct`, `canScrollLeft`, `canScrollRight`, event scroll `handleScrollNext`/`handleScrollPrev`, serta merender dialog `ProductDetailModal`.
   - Valid untuk hidrasi: `<Products client:visible />`.
3. **8 Seksi Saudara (SB7 Core):**
   - `Hero`, `Problem`, `About`, `Plan`, `Stakes`, `SuccessVision`, `Testimonials`, `FinalCTA`, `Footer` terkonfirmasi bebas dari stateful hook (`useState`/`useEffect`) di tingkat seksi, sehingga 100% aman dirender sebagai 0 KB JS server components oleh Astro.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)
- **Penambahan Dependensi Toolchain:**
  - Menambahkan paket `astro` dan `@astrojs/react` ke dalam proyek.
  - *Mitigasi:* Proyek tetap mempertahankan React 19 dan Tailwind CSS v4 tanpa mengubah satu baris pun kode komponen `.jsx` eksisting (*Zero Component Rewrite*).
- **Dualitas File Ekstensi (`.astro` vs `.jsx`):**
  - Developer akan melihat shell utama berupa file `.astro` (`BaseLayout.astro` dan `index.astro`), sementara atom dan seksi UI tetap berekstensi `.jsx`.
  - *Mitigasi:* Menjaga batasan tegas: file `.astro` hanya bertindak sebagai konduktor layout dan orkestrator routing statis; seluruh desain sistem dan logika presentasi tetap tinggal di `src/components/`.
- **Sensitivitas CSS Pipeline Tailwind v4:**
  - Tailwind v4 tidak lagi menggunakan `tailwind.config.js` klasik melainkan `@theme` directive di CSS.
  - *Mitigasi:* Mengintegrasikan `@tailwindcss/vite` langsung di dalam blok `vite.plugins` pada `astro.config.mjs` demi menjaga keseragaman token desain di seluruh pulau komponen.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer & Single Source of Truth
* **Tujuan:** Memastikan integritas dan immutability data statis.
* **Tindakan:**
  - Audit berkas `src/constants/data.js`: Memastikan skema data `PRODUCTS`, `TESTIMONIALS`, dan konten navigasi tidak disentuh dan tetap kompatibel dengan impor ESModule di Astro.
  - Status: *Zero-Touch (Preserved).*

---

### ⚛️ Fase 2: Reusable Design System Atoms (`src/components/ui/`)
* **Tujuan:** Menjaga atom antarmuka tetap agnostik terhadap runtime Astro.
* **Tindakan:**
  - Memverifikasi komponen atomik: `Button.jsx`, `ProductCard.jsx`, `ProductDetailModal.jsx`, `SectionWrapper.jsx`.
  - Status: *Zero-Touch (Preserved 100% tanpa modifikasi sintaks JSX).*

---

### 🧩 Fase 3: Layout Sections (`src/components/sections/`)
* **Tujuan:** Memvalidasi kesiapan seksi narasi SB7 untuk pemisahan pulau (*Islands Isolation*).
* **Tindakan:**
  - Memastikan seluruh seksi dapat dirender di lingkungan SSR Astro tanpa ketergantungan pada objek browser global (`window` / `document`) di tahap modul evaluasi awal.
  - Status: *Zero-Touch (Seluruh 10 seksi tetap utuh).*

---

### 🚀 Fase 4: Page Assembly, Bundler & Shell Migration
* **Tujuan:** Transformasi runtime Vite SPA menjadi Astro Islands Architecture.
* **Langkah-langkah Bertahap:**
  1. **Instalasi Paket Dependensi:**
     - Pasang `astro` dan `@astrojs/react` pada proyek via `npm install astro @astrojs/react`.
  2. **Konfigurasi Bundler (`astro.config.mjs`):**
     - Buat berkas baru `astro.config.mjs` di root proyek:
       - Integrasikan `react()` dari `@astrojs/react`.
       - Integrasikan `tailwindcss()` dari `@tailwindcss/vite` di dalam konfigurasi `vite.plugins`.
  3. **Pembuatan Base Layout Shell (`src/layouts/BaseLayout.astro`):**
     - Mengimpor `src/index.css` di frontmatter.
     - Menyematkan struktur HTML5 lengkap: `<!doctype html>`, `<html lang="id" class="scroll-smooth">`.
     - Menyematkan meta tag SEO OpenGraph, favicon, dan preload font lokal *Plus Jakarta Sans* dari `index.html`.
     - Menyediakan `<slot />` untuk konten halaman.
  4. **Orkestrasi Halaman Utama (`src/pages/index.astro`):**
     - Buat berkas baru `src/pages/index.astro` yang dibungkus oleh `BaseLayout`.
     - Impor ke-10 seksi StoryBrand 7 dari `src/components/sections/`.
     - Terapkan hidrasi selektif:
       - `<Navbar client:load />`
       - `<Hero />` (Statis 0 KB JS)
       - `<Problem />` (Statis 0 KB JS)
       - `<About />` (Statis 0 KB JS)
       - `<Products client:visible />` (Reaktif saat masuk viewport)
       - `<Plan />` (Statis 0 KB JS)
       - `<Stakes />` (Statis 0 KB JS)
       - `<SuccessVision />` (Statis 0 KB JS)
       - `<Testimonials />` (Statis 0 KB JS)
       - `<FinalCTA />` (Statis 0 KB JS)
       - `<Footer />` (Statis 0 KB JS)
  5. **Penyesuaian Skrip Proyek (`package.json`):**
     - Perbarui perintah scripts:
       - `"dev": "astro dev"`
       - `"build": "astro build"`
       - `"preview": "astro preview"`
       - `"lint": "oxlint"`
  6. **Pembaruan Konfigurasi Git (`.gitignore`):**
     - Tambahkan direktori `.astro/` dan `dist/` ke `.gitignore`.

---

### 🛡️ Fase 5: Quality Gate & Verification Matrix
* **Kriteria Kelulusan Mutlak (Definition of Done):**
  - [ ] **Linter Pass:** `npm run lint` (`oxlint`) lolos dengan **0 error** dan **0 warning**.
  - [ ] **Astro Build Pass:** `npm run build` berhasil mengompilasi seluruh halaman statis ke direktori `dist/` tanpa error modul atau CSS parser.
  - [ ] **Zero-JS Island Audit:** File output HTML di `dist/` membuktikan bahwa seksi Hero, Problem, About, Plan, Stakes, SuccessVision, Testimonials, dan Footer tidak memuat script JS hidrasi.
  - [ ] **Visual & Styling Parity:** Warna semantik tema Tailwind v4 (`bg-brand-primary`, `text-brand-accent`) dan font lokal *Plus Jakarta Sans* tampil identik tanpa regresi tata letak.

---

## 📋 Peta Berkas Terdampak (Blast Radius)

| Status Berkas | Jalur Berkas | Keterangan Perubahan |
| :--- | :--- | :--- |
| 🆕 **Baru** | `astro.config.mjs` | Konfigurasi Astro, React integration, dan plugin Tailwind v4 Vite |
| 🆕 **Baru** | `src/layouts/BaseLayout.astro` | Shell HTML5, SEO OpenGraph, preload font lokal, impor global CSS |
| 🆕 **Baru** | `src/pages/index.astro` | Konduktor 10 seksi SB7 dengan batas hidrasi Islands murni |
| 📝 **Modifikasi** | `package.json` | Penambahan dependensi Astro dan pengalihan skrip dev/build |
| 📝 **Modifikasi** | `.gitignore` | Penambahan `.astro/` dan `dist/` |
| 🔒 **Zero-Touch** | `src/components/sections/*.jsx` | 10 seksi StoryBrand 7 tetap utuh tanpa modifikasi kode |
| 🔒 **Zero-Touch** | `src/components/ui/*.jsx` | Seluruh atom UI tetap utuh tanpa modifikasi kode |
| 🔒 **Zero-Touch** | `src/constants/data.js` | Single Source of Truth tetap utuh |
| 🔒 **Zero-Touch** | `src/index.css` | Token desain `@theme` tetap utuh |
| 📦 **Isolasi** | `index.html` & `src/main.jsx` | Dipensiunkan dari alur build utama SPA Vite |

---

## 🛑 Pintu Masuk Eksekusi Eksklusif
Sesuai protokol konstitusi, rencana implementasi ini dirancang dengan aman dan tidak akan mengeksekusi kode secara otomatis.
Pekerjaan implementasi hanya akan dimulai jika pengguna secara eksplisit mengetikkan perintah:
- `/tdd` ➔ Memulai penulisan skenario uji feature/contract.
- `/execute` ➔ Memulai eksekusi kode produksi secara bertahap.
