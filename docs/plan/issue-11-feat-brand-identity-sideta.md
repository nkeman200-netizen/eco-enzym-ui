<!-- RequestFeedback: false -->
# [FEAT] Issue #11: Integrasi Identitas Brand SiDeta & Harmonisasi Desain Sistem Sitrus-Botanikal
- **Target GitHub Issue:** #11
- **Branch Terkait:** `feature/issue-11-brand-identity-sideta`
- **Arsip Permanen:** `docs/plan/issue-11-feat-brand-identity-sideta.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Papan Identitas Klinik & Standar Seragam:**
> Bayangkan sebuah klinik kesehatan mandiri bernama **SiDeta** yang bernaung di bawah program pengabdian masyarakat **Sanitasi Hijau**.
> 1. Pada plang nama pintu masuk (bilah navigasi `Navbar`), kita menyematkan lambang stempel resmi (daun penopang + irisan sitrus segar + droplet konsentrat) yang berdimensi bujur sangkar presisi 1:1 (`40px x 40px`). Di sampingnya tertulis nama komersial **SiDeta** berhuruf tebal, ditemani lencana kapsul halus (*pill-badge*) **Sanitasi Hijau**.
> 2. Pemasangan dimensi intrinsik keras (`width="40" height="40" aspect-square`) menjamin pengunjung tidak mengalami guncangan layar (*Cumulative Layout Shift* = 0.00) saat gambar logo dimuat oleh browser.
> 3. Standar warna pakaian resmi (desain token Tailwind CSS v4 `@theme`) diperkaya secara non-destruktif dengan menyerap spektrum warna hangat sitrus logo: `--color-brand-citrus` (`#F7931E`) dan `--color-brand-citrus-warm` (`#FBB03B`), serta menyelaraskan warna hijau utama `--color-brand-primary` ke `#164E2E` (Forest Green pekat yang memiliki tingkat kontras tinggi WCAG AAA 9.2:1).
> 4. Seluruh elemen berlatar warna sitrus terang diwajibkan berpasangan dengan tipografi gelap (`text-brand-primary` atau `text-neutral-900`) guna menjamin kepatuhan aksesibilitas internasional (WCAG 2.1 AA rasio kontras $\ge 4.5:1$).

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp & codebase inspection)

1. **`src/components/sections/Navbar.jsx` (LSP Symbol Verified):**
   - Mengelola state `isOpen` untuk menu drawer mobile dan navigasi `navLinks`.
   - Pada baris 25–43, tautan `#hero` saat ini masih menggunakan ikon placeholder `<Leaf className="w-5 h-5" />` dan teks mentah `Eco-Enzyme`.
   - Komentar kode telah mendokumentasikan slot transisi untuk tag `<img>` logo resmi.
2. **`src/components/sections/Footer.jsx` (LSP Symbol Verified):**
   - Menampilkan kontak `MapPin`, `Mail`, `Phone`, dan garis pembatas hak cipta pada baris 76–81.
   - Belum memiliki elemen visual brand dan teks deskripsi resmi program pengabdian masyarakat Desa Jeruklegi.
3. **`src/layouts/BaseLayout.astro` (Codebase Verified):**
   - Tag `<link rel="icon">` masih mengarah ke placeholder `/favicon.svg`.
   - Tag Open Graph (`og:title`, `og:description`) belum tersinkronisasi dengan identitas brand SiDeta dan belum memiliki tag `og:image`.
4. **`src/index.css` & `tailwind.config.js` (Codebase Verified):**
   - Direktif Tailwind CSS v4 `@theme` di `src/index.css` baru memuat `--color-brand-primary: #166D3B` dan `--color-brand-accent: #7CBE4D`.
   - Belum terdapat variabel semantik untuk warna hangat sitrus (`#F7931E` dan `#FBB03B`).
5. **Aset Master Logo di `eco-enzyme-be/public/images/logo.png` (Python PIL Verified):**
   - Dimensi resolusi master: `2362 x 1772` piksel, mode RGBA transparan.
   - Rentang piksel Emblem (lingkaran daun + sitrus + droplet): koordinat X `645..1684` (lebar 1039px), Y `62..1344` (tinggi 1282px).
   - Rentang piksel Logotype ("SiDeta"): koordinat X `704..1704` (lebar 1000px), Y `1419..1608` (tinggi 189px).
   - Terdapat celah transparan alami setinggi 75 piksel antara emblem dan teks, memungkinkan ekstraksi matematis yang 100% presisi dan bersih.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - Kita **menolak 100%** penambahan library UI/CSS pihak ketiga atau toolchain tracing yang membebani node_modules, sesuai Konstitusi `.agentrules`.
  - Pemrosesan gambar dilakukan menggunakan utilitas Python PIL bawaan sistem ke format standar web modern (WebP lossless/high-quality).
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Utang Teknis Vektor (Technical Debt):* Format WebP adalah format raster. Meskipun berbobot super ringan (< 20 KB) dan tajam di layar standar, ia tidak sefleksibel format vektor SVG murni pada layar ultra-resolusi. Kita mencatat utang teknis ini untuk digantikan dengan master `.svg` dari tim media di kemudian hari.
  - *Disiplin Ekstra Pengembang (Contrast Guard Overhead):* Developer dilarang memasang `text-white` di atas elemen berwarna `bg-brand-citrus` demi menjaga skor Lighthouse Accessibility tetap 100.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
* **Tujuan:** Menyelaraskan teks identitas brand, deskripsi copyright, dan template pesan WhatsApp agar konsisten dengan entitas SiDeta.
* **Langkah:**
  - Memperbarui teks copyright dan informasi brand pada `src/constants/data.js`.
  - Menyelaraskan teks default WhatsApp agar menyebutkan *"Halo, saya tertarik pesan produk SiDeta Eco-Enzyme Jeruklegi."*

---

### 🧱 Fase 2: Reusable Design System Atoms & Aset Brand
* **Tujuan:** Menyiapkan aset visual teroptimasi dan token warna semantik di lapisan fondasi desain.
* **Spesifikasi Aset (`public/images/brand/`):**
  - Menjalankan skrip ekstraksi Python PIL untuk menghasilkan:
    1. `public/images/brand/logo-emblem.webp` (128x128px bujur sangkar 1:1, terpusat, transparent background, < 5 KB).
    2. `public/images/brand/logo-full.webp` (crop ketat horizontal/vertikal lockup dengan padding proporsional, transparent background, < 15 KB).
    3. `public/favicon.ico` dan `public/favicon.svg` (ikon favicon berbasis emblem SiDeta).
* **Spesifikasi Token Desain (`src/index.css` & `tailwind.config.js`):**
  - Mendaftarkan variabel semantik baru pada direktif `@theme` di `src/index.css`:
    ```css
    --color-brand-primary: #164E2E;       /* Deep Forest Green (WCAG AAA) */
    --color-brand-accent: #438E38;        /* Botanical Leaf Green */
    --color-brand-citrus: #F7931E;        /* Vibrant Citrus Orange */
    --color-brand-citrus-warm: #FBB03B;   /* Warm Citrus Gold */
    ```
  - Menyinkronkan token di atas ke blok `theme.extend.colors` pada `tailwind.config.js`.

---

### 🧱 Fase 3: Layout Sections (`Navbar.jsx` & `Footer.jsx`)
* **Tujuan:** Mengintegrasikan logo resmi dan hierarki nama brand pada header dan footer.
* **Spesifikasi `src/components/sections/Navbar.jsx`:**
  - Mengganti ikon placeholder `<Leaf />` dengan:
    ```jsx
    <img
      src="/images/brand/logo-emblem.webp"
      alt="Logo SiDeta - Sanitasi Hijau Jeruklegi"
      width="40"
      height="40"
      className="h-10 w-10 aspect-square object-contain transition-transform duration-200 group-hover:scale-105"
      loading="eager"
      decoding="async"
    />
    ```
  - Menampilkan nama brand utama dan lencana kapsul:
    ```jsx
    <div className="flex items-center gap-2">
      <span className="font-extrabold text-xl md:text-2xl text-brand-primary tracking-tight">
        SiDeta
      </span>
      <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-citrus/15 text-brand-primary border border-brand-citrus/30">
        Sanitasi Hijau
      </span>
    </div>
    ```
  - Memastikan atribut link memiliki `aria-label="SiDeta Beranda"`.
* **Spesifikasi `src/components/sections/Footer.jsx`:**
  - Menambahkan logo lengkap horizontal (`logo-full.webp`) pada bagian footer dengan dimensi proporsional.
  - Memperbarui teks hak cipta: *"© 2026 SiDeta — Program Pengabdian Masyarakat Sanitasi Hijau Desa Jeruklegi. All rights reserved."*

---

### 🧱 Fase 4: Page Assembly & Shell (`src/layouts/BaseLayout.astro`)
* **Tujuan:** Mengintegrasikan favicon dan metadata media sosial (Open Graph).
* **Spesifikasi Teknis:**
  - Memperbarui tag `<link rel="icon">` agar mengarah ke `/images/brand/logo-emblem.webp`.
  - Menambahkan tag `<meta property="og:image" content="/images/brand/logo-full.webp" />`.
  - Memperbarui meta tag `theme-color` menjadi `#164E2E`.
  - Memperbarui `title` dan `description` default agar mencakup brand SiDeta & Sanitasi Hijau.

---

### 🧱 Fase 5: Quality Gate, Verification, & Visual Smoke Test
* **Tujuan:** Memvalidasi seluruh kepatuhan kode dan memastikan tidak ada regresi visual.
* **Langkah Verifikasi:**
  1. **Tier 1 (Linting):** `npm run lint` (`oxlint`) wajib menghasilkan 0 error dan 0 warning.
  2. **Tier 2 (Logic & Unit Tests):** `node tests/test-products-ui.mjs` dan `node tests/test-api-services.mjs` wajib 100% lolos.
  3. **Tier 3 (Bundler Sanity):** `npm run build` (`astro build`) wajib sukses dengan Exit Code 0.
  4. **Tier 4 (Visual Smoke Gate):** Memperbarui `tests/test-visual-smoke.mjs` dengan skenario audit tambahan:
     - Memverifikasi keberadaan tag `img[src*="logo-emblem.webp"]` di dalam `#hero` / header.
     - Mengukur dimensi fisik bounding box logo pada desktop dan mobile: wajib `40px x 40px` dengan toleransi $\le 0.5\text{px}$ (selisih lebar vs tinggi 0.00px).
     - Memverifikasi teks nama brand "SiDeta" dan lencana "Sanitasi Hijau" ter-render di DOM.

---

## 🛡️ Rencana Pengujian Otomatis & Skenario TDD

Sebelum memodifikasi komponen produksi, kita akan menyusun skenario verifikasi visual di `tests/test-visual-smoke.mjs`:
* **Uji 1 (Logo Detection):** Memastikan selector `header img` mendeteksi file emblem WebP.
* **Uji 2 (Geometry Invariant):** Memastikan rasio aspek logo bujur sangkar presisi (`abs(width - height) < 1.0`).
* **Uji 3 (Layout Stability):** Memastikan header tidak memicu horizontal scrolling pada viewport 375px (`scrollWidth <= clientWidth`).

---

## 📋 Checklist Eksekusi Bertahap (Step-by-Step Execution Plan)

- [ ] **Langkah 1:** Jalankan skrip Python ekstraksi & kompresi master PNG menjadi `public/images/brand/logo-emblem.webp` dan `logo-full.webp`.
- [ ] **Langkah 2:** Daftarkan token semantik sitrus (`--color-brand-citrus`, `--color-brand-citrus-warm`) dan perbarui `--color-brand-primary` di `src/index.css` & `tailwind.config.js`.
- [ ] **Langkah 3:** Perbarui data teks identitas di `src/constants/data.js`.
- [ ] **Langkah 4:** Refaktor markup header di `src/components/sections/Navbar.jsx`.
- [ ] **Langkah 5:** Refaktor markup footer di `src/components/sections/Footer.jsx`.
- [ ] **Langkah 6:** Perbarui metadata shell, favicon, dan Open Graph di `src/layouts/BaseLayout.astro`.
- [ ] **Langkah 7:** Perbarui dan jalankan suite `tests/test-visual-smoke.mjs`.
- [ ] **Langkah 8:** Jalankan `npm run lint` dan `npm run build` untuk pengujian Four-Tier Quality Gate.
