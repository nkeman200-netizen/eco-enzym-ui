<!-- RequestFeedback: false -->
# [FEAT] Issue #25: Showcase Visual Produk Fisik Nyata pada Hero Section (SB7 Grunt Test 0 KB JS)
- **Target GitHub Issue:** #25
- **Branch Terkait:** `feature/issue-25-hero-product-showcase`
- **Dokumen Rencana:** `docs/plan/issue-25-feat-hero-product-showcase.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Etalase Kaca Toko Depan (The SB7 Grunt Test):**
> Bayangkan seorang ibu rumah tangga lewat di depan toko SiDeta selama 3 detik:
> 1. **Kondisi Sebelum Tiket Ini:** Kolom kanan Hero menampilkan kartu kaca (*glassmorphism*) dengan ikon tetesan air abstrak (`<Droplets />`). Meskipun rapi secara estetika, pengunjung harus membaca paragraf teks untuk memahami bahwa yang dijual adalah produk fisik pembersih rumah tangga dan sabun alami siap pakai.
> 2. **Solusi Baru (*Pure Static Physical Product Showcase — Opsi 1*):**
>    - **Visual Produk Nyata:** Mengganti ikon abstrak di dalam bingkai *glassmorphism* Hero dengan foto produk fisik unggulan beresolusi tajam (`/images/products/pembersih-lantai-1.webp`) lengkap dengan informasi varian dan harga terjangkau (`Mulai Rp 15.000`).
>    - **0 KB Client-Side JavaScript Overhead:** Dirender 100% statis oleh Astro pada waktu build tanpa directive `client:*`, dilengkapi atribut `loading="eager"` dan `fetchpriority="high"` untuk menjamin skor Largest Contentful Paint (LCP < 0.8s) dan Google Lighthouse 100/100.
>    - **Zero Layout Shift (CLS 0.00):** Kontainer gambar dikunci ketat pada rasio `aspect-square` dengan overlay *floating badge* informatif yang responsif di layar Mobile (375px) maupun Desktop (1280px).
>    - **Single Source of Truth (`src/constants/data.js`):** Menyimpan metadata showcase Hero pada konstanta `HERO_SHOWCASE` di `src/constants/data.js` sesuai aturan *Separation of Concerns* `.agentrules`.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via `agent-lsp`)

1. **`src/constants/data.js` (`mcp__agent_lsp__list_symbols`):**
   - Mengekspor konstanta terpusat (`BRAND_IDENTITY`, `PRODUCTS`, dll.).
   - Akan ditambahkan ekspor konstanta `HERO_SHOWCASE` yang memuat:
     - `badgeText`: `'Sabun & Pembersih Alami'`
     - `title`: `'Pembersih Lantai & Sabun Eco-Enzyme'`
     - `subtitle`: `'Formula higienis ramah bumi hasil fermentasi 90 hari limbah buah segar warga Desa Jeruklegi'`
     - `priceTag`: `'Mulai Rp 15.000'`
     - `highlightBenefit`: `'Aman untuk Balita & Kulit Sensitif'`
     - `image`: `'/images/products/pembersih-lantai-1.webp'`
     - `imageAlt`: `'Produk Fisik Pembersih Lantai dan Sabun Alami Eco-Enzyme SiDeta Desa Jeruklegi'`
2. **`src/components/sections/Hero.jsx` (`mcp__agent_lsp__list_symbols` -> `Hero [Function] :12`):**
   - Baris 66–110 saat ini merender kolom kanan berupa kartu *glassmorphism* `aspect-square` dengan ikon `<Droplets />`.
   - Akan direfaktor untuk mengimpor `HERO_SHOWCASE` dari `../../constants/data` dan merender foto produk fisik utama dengan `loading="eager"`, `fetchpriority="high"`, serta *floating value card* berlapis *backdrop-blur* di bagian bawah kartu.
3. **`src/pages/index.astro`:**
   - Memanggil `<Hero />` secara statis di urutan pertama dalam `<main>`. Tidak memerlukan perubahan karena `<Hero />` tetap murni 0 KB JS.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Memanfaatkan 100% aset gambar `.webp` yang sudah tersedia di `public/images/products/pembersih-lantai-1.webp` (13.3 KB) dan ikon `Sparkles`, `ShieldCheck` dari `lucide-react`.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Curated Static Asset:* Foto yang tampil di panggung Hero dikurasi secara statis dari `src/constants/data.js` (tidak berubah otomatis saat admin mengedit produk ke-8 di backend). Hal ini adalah keputusan arsitektur yang disengaja demi mempertahankan **0 ms network blocking time** dan mencegah *flash of skeleton loader* pada area terpenting halaman (*above-the-fold*).

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
1. Menambahkan dan mengekspor objek konstanta `HERO_SHOWCASE` tepat di bawah `BRAND_IDENTITY`:
   - Berisi path gambar WebP (`/images/products/pembersih-lantai-1.webp`), teks alternatif SEO (`imageAlt`), label lencana (`badgeText`), judul produk unggulan (`title`), deskripsi ringkas (`subtitle`), lencana harga (`priceTag`), dan klaim keamanan utama (`highlightBenefit`).

---

### Fase 2: Reusable Design System Atoms
1. Memanfaatkan atom `<SectionWrapper>` dan `<Button>` yang sudah ada di `src/components/ui/` tanpa perlu membuat atom baru yang menambah kompleksitas.
2. Memastikan seluruh kelas warna menggunakan variabel semantik Tailwind CSS v4 (`text-brand-primary`, `bg-brand-accent/15`, `border-brand-citrus/30`, `text-text-main`).

---

### Fase 3: Layout Sections (`src/components/sections/Hero.jsx`)
1. Mengimpor `HERO_SHOWCASE` dari `../../constants/data` dan ikon `ShieldCheck` dari `lucide-react`.
2. Memperbarui Kolom Kanan (Visual Centerpiece):
   - Mempertahankan kontainer luar `relative aspect-square bg-white/70 backdrop-blur-xl border-2 border-white rounded-[2.5rem] shadow-2xl overflow-hidden group`.
   - Merender `<img src={HERO_SHOWCASE.image} alt={HERO_SHOWCASE.imageAlt} loading="eager" fetchpriority="high" width="600" height="600" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />`.
   - Menambahkan Top-Left Floating Pill Badge (`HERO_SHOWCASE.badgeText`) dan Top-Right Price Tag (`HERO_SHOWCASE.priceTag`).
   - Menambahkan Bottom Glassmorphism Overlay Bar yang menampilkan `HERO_SHOWCASE.title`, `HERO_SHOWCASE.subtitle`, dan indikator keamanan `HERO_SHOWCASE.highlightBenefit`.

---

### Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
1. Memastikan `<Hero />` tetap terpasang statis tanpa directive `client:*` di `src/pages/index.astro`.

---

### Fase 5: Quality Gate & Verification
1. **Static Analysis:** Menjalankan `npm run lint` (`oxlint`) — wajib 0 error dan 0 warning.
2. **Production Build:** Menjalankan `npm run build` (`astro build`) — memastikan build statis lulus tanpa error.
3. **Automated E2E & Visual Smoke (`tests/test-hero-showcase.mjs`):**
   - Memverifikasi elemen `<img>` produk fisik di `#hero` memiliki atribut `src` valid, `naturalWidth > 0`, `loading="eager"`, dan `fetchpriority="high"`.
   - Memverifikasi lencana harga dan klaim keamanan tampil di DOM serta bebas *horizontal overflow* pada viewport Desktop (`1280x800`) dan Mobile (`375x812`).
   - Mengambil bukti screenshot visual untuk inspeksi multimodal.
