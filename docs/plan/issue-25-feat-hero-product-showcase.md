<!-- RequestFeedback: false -->
# [FEAT] Issue #25: Showcase Visual Produk Fisik Nyata pada Hero Section (SB7 Grunt Test 0 KB JS)
- **Target GitHub Issue:** #25
- **Branch Terkait:** `feature/issue-25-hero-product-showcase`
- **Dokumen Rencana:** `docs/plan/issue-25-feat-hero-product-showcase.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Etalase Kaca & Hukum 1 Layar Utuh (Single-Viewport Above-the-Fold Budget):**
> Dalam 3 detik pertama (*The SB7 Grunt Test*), pengunjung harus langsung menangkap nilai produk dan melihat tombol aksi (CTA) tanpa perlu melakukan scroll tambahan:
> 1. **Kondisi Sebelum Tiket Ini:** Kartu kanan Hero menggunakan `aspect-square max-w-lg` dengan padding seksi `py-16 md:py-20` yang memakan tinggi vertikal berlebih sehingga mendorong tombol CTA ke bawah layar, serta belum mencantumkan jangkar harga terjangkau maupun klaim keamanan keluarga.
> 2. **Solusi Baru (*Compact Glassmorphism Emblem + SB7 Grunt Test Callouts — Opsi 3*):**
>    - **Compact Above-the-Fold Budget:** Memangkas padding vertikal kontainer Hero (`containerClassName="py-8! md:py-12!"`), mengkalibrasi skala tipografi H1 (`lg:text-5xl`), dan mengganti kartu `aspect-square` raksasa menjadi kartu *Compact Glassmorphism Emblem* (`max-w-md`) sehingga seluruh Headline, Subheadline, dan kedua tombol CTA terlihat 100% utuh di layar pertama tanpa scroll.
>    - **SB7 Grunt Test Callouts:** Menyematkan dua *floating pill* kontras tinggi di bagian bawah kartu kaca (`Aman untuk Balita & Kulit Sensitif` dan `Mulai Rp 15.000`) yang dikonsumsi dari `HERO_SHOWCASE` di `src/constants/data.js`.
>    - **0 KB Client-Side JavaScript Overhead:** Dirender 100% statis oleh Astro pada waktu build tanpa directive `client:*`.
>    - **SOP Fotografi Divisi Media:** Menyediakan panduan standar fotografi *Styled Still-Life* di `docs/plan/media-division-product-photography-guide.md` sebagai acuan produksi foto produk asli Desa Jeruklegi.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via `agent-lsp`)

1. **`src/constants/data.js` (`mcp__agent_lsp__list_symbols`):**
   - Mengekspor konstanta terpusat (`BRAND_IDENTITY`, `PRODUCTS`, dll.).
   - Akan ditambahkan ekspor konstanta `HERO_SHOWCASE` yang memuat:
     - `badgeText`: `'Sabun & Pembersih Alami'`
     - `title`: `'Fermentasi Alami Berkualitas'`
     - `subtitle`: `'Formula higienis ramah bumi hasil pengolahan limbah organik warga Jeruklegi'`
     - `priceTag`: `'Mulai Rp 15.000'`
     - `highlightBenefit`: `'Aman untuk Balita & Kulit Sensitif'`
2. **`src/components/sections/Hero.jsx` (`mcp__agent_lsp__list_symbols` -> `Hero [Function] :12`):**
   - Direfaktor untuk mengimpor `HERO_SHOWCASE` dari `../../constants/data` dan merender kartu *Compact Glassmorphism Emblem* dengan *floating value pills* serta padding kontainer `py-8! md:py-12!`.
3. **`src/pages/index.astro`:**
   - Memanggil `<Hero />` secara statis di urutan pertama dalam `<main>`. Tidak memerlukan perubahan karena `<Hero />` tetap murni 0 KB JS.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Memanfaatkan 100% ikon `Droplets`, `Sparkles`, `ShieldCheck` dari `lucide-react`.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - Selama fase darurat aset fotografi sebelum Divisi Media menyelesaikan pemotretan *Styled Still-Life* berstiker resmi SiDeta, kartu *Compact Glassmorphism Emblem* menjaga kredibilitas estetika halaman utama dan menghemat ruang vertikal 41% dibandingkan foto *packshot* mentah.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
1. Menambahkan dan mengekspor objek konstanta `HERO_SHOWCASE` tepat di bawah `BRAND_IDENTITY`:
   - Berisi label lencana (`badgeText`), judul unggulan (`title`), deskripsi ringkas (`subtitle`), lencana harga (`priceTag`), dan klaim keamanan utama (`highlightBenefit`).

---

### Fase 2: Reusable Design System Atoms
1. Memanfaatkan atom `<SectionWrapper>` (`containerClassName="py-8! md:py-12!"`) dan `<Button>` yang sudah ada di `src/components/ui/`.
2. Memastikan seluruh kelas warna menggunakan variabel semantik Tailwind CSS v4 (`text-brand-primary`, `bg-brand-accent/10`, `border-brand-citrus/30`, `text-text-main`).

---

### Fase 3: Layout Sections (`src/components/sections/Hero.jsx`)
1. Mengimpor `HERO_SHOWCASE` dari `../../constants/data` dan ikon `Droplets`, `Sparkles`, `ShieldCheck` dari `lucide-react`.
2. Memperbarui Kolom Kanan menjadi kartu *Compact Glassmorphism Emblem* (`max-w-md`) dilengkapi *floating pill* harga & keamanan.

---

### Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
1. Memastikan `<Hero />` tetap terpasang statis tanpa directive `client:*` di `src/pages/index.astro`.

---

### Fase 5: Quality Gate & Verification
1. **Static Analysis:** Menjalankan `npm run lint` (`oxlint`) — wajib 0 error dan 0 warning.
2. **Production Build:** Menjalankan `npm run build` (`astro build`) — memastikan build statis lulus tanpa error.
3. **Automated E2E & Visual Smoke (`tests/test-hero-showcase.mjs`):**
   - Memverifikasi kartu `[data-hero-showcase]` tampil proporsional (`height <= 680px`) dan tombol CTA langsung terlihat tanpa scroll pada viewport Desktop (`1280x800`) dan Mobile (`375x812`).
   - Mengambil bukti screenshot visual untuk inspeksi multimodal.
