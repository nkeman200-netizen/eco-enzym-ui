<!-- RequestFeedback: false -->
# [FEAT] Issue #21: Redesain Tata Letak Footer Multi-Kolom Institusional D2C (Sensatia Botanicals & Footstep Adaptation)
- **Target GitHub Issue:** #21
- **Branch Terkait:** `feature/issue-21-multi-column-d2c-footer`
- **Dokumen Rencana:** `docs/plan/issue-21-feat-multi-column-d2c-footer.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Lemari Pajangan 4 Sayap di Galeri D2C Kelas Dunia:**
> Bayangkan sebuah galeri produk alami premium (seperti *Sensatia Botanicals* di Bali atau *Footstep Footwear* di Bandung):
> 1. **Kondisi Lama (Pintu Masuk Terlalu Sederhana):** Sebelumnya, dasar toko SiDeta (`Footer.jsx`) hanya berupa satu tiang pajangan vertikal di tengah ruangan: ada logo SiDeta bertumpuk dengan 3 baris kontak telepon. Pengunjung yang telah membaca seluruh seksi dari atas ke bawah tidak memiliki cara cepat untuk melompat kembali ke katalog produk, tidak menemukan panduan dosis pemakaian, dan tidak merasakan wibawa sebuah brand institusional yang mapan.
> 2. **Solusi Baru (*Institutional 4-Column Asymmetric Grid + Sub-Footer Bar*):**
>    - **Sayap 1 — Identitas & Komitmen Brand SiDeta (`lg:col-span-4`):** Menampilkan Logo Resmi SiDeta berlatar bersih, narasi misi program Pengabdian Masyarakat Desa Jeruklegi, dan lencana komitmen (*"100% Fermentasi Alami & Bebas SLS"*).
>    - **Sayap 2 — Navigasi Cepat Halaman (`lg:col-span-2`):** Daftar navigasi cepat (*Quick Links*: `Beranda`, `Tentang Kami`, `Produk Unggulan`, `Cara Pesan`, `Kontak`) yang bersumber dari satu induk data (`NAV_LINKS` di `data.js`), terhubung langsung dengan `Navbar.jsx`.
>    - **Sayap 3 — Informasi & Bantuan Konsumen (`lg:col-span-3`):** Ruang edukasi mandiri bagi calon pembeli kritis (*Pusat Bantuan & FAQ*, *Panduan Pemakaian & Dosis*, *Standar Kualitas Alami*, *Ketentuan Order & Garansi WA*). Sebelum halaman Astro mandirinya dirilis, tautan dipetakan secara cerdas menggunakan *Progressive Anchoring* ke seksi landing page relevan sehingga **100% bebas dari tautan rusak (*zero dead links*)**.
>    - **Sayap 4 — Hubungi Kami Dinamis API (`lg:col-span-3`):** Saluran komunikasi dinamis dari endpoint `GET /api/v1/contact` (`location`, `email`, `whatsapp` aktif).
>    - **Adaptive Grid Collapse:** Jika pengurus menonaktifkan seksi kontak di CMS (`is_active: false` / `data: null`), Sayap 4 disembunyikan dan ketiga sayap lainnya otomatis meregang proporsional (`5 : 3 : 4`) menjadi tata letak 3 kolom yang seimbang tanpa lubang kosong.
>    - **Zero Cumulative Layout Shift (CLS = 0.00):** Tiga sayap pertama langsung ter-render seketika (*instant first paint*), sementara Sayap 4 memiliki *Inline Skeleton Shimmer* berdenyut dengan tinggi minimum terkunci (`min-h-[160px]`). Pergantian dari skeleton ke teks kontak riil tidak akan menggeser koordinat kolom lain sedikit pun.
>    - **Sub-Footer Bar Bawah:** Dipisahkan oleh garis tipis `border-t border-white/15`, memuat teks Copyright resmi SiDeta, atribusi komunitas, dan tautan kembali ke atas (*Back to top*).

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via Codebase Inspection)

1. **`src/constants/data.js` (Inspeksi Struktur Data):**
   - Saat ini telah mengekspor `BRAND_IDENTITY`, `CONTACT_INFO`, `DEFAULT_WHATSAPP_NUMBER`, dan `SHOW_CONTACT`.
   - Akan ditambahkan ekspor konstanta baru:
     - `NAV_LINKS`: Array 5 navigasi utama (`Beranda`, `Tentang Kami`, `Produk`, `Cara Pesan`, `Kontak`).
     - `FOOTER_INFO_LINKS`: Array 4 tautan panduan konsumen (`Pusat Bantuan & FAQ`, `Panduan Pemakaian & Dosis`, `Standar Kualitas Alami`, `Ketentuan Order & Retur WA`) dengan pemetaan anchor sementara (`#kontak`, `#tentang`, `#cara-pesan`).
     - `FOOTER_CONTENT`: Objek metadata footer (teks misi brand, tagline komitmen alami, judul kolom, dan copyright text).
2. **`src/components/sections/Navbar.jsx` (Inspeksi Interface & Penggunaan):**
   - Mendeklarasikan array lokal `navLinks` di baris 10–16.
   - Akan direfaktor agar mengimpor `NAV_LINKS` dari `src/constants/data.js` untuk menjamin kepatuhan *Single Source of Truth* (*DRY*).
3. **`src/components/sections/Footer.jsx` (Inspeksi Layout & State):**
   - Komponen telah menjadi React Island yang mengonsumsi `getContactData()` dari `contactService.js`, memiliki state `contactItems`, `isActive`, dan `isLoading`.
   - Tata letak kontainer saat ini masih menggunakan `flex flex-col items-center text-center max-w-4xl mx-auto`.
   - Akan ditransformasikan menjadi CSS Grid 12 kolom responsif: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left`, dengan pembagian kolom `4 : 2 : 3 : 3` saat `isActive === true` dan `5 : 3 : 4` saat `isActive === false`.
4. **`src/pages/index.astro` (Inspeksi Shell & Hidrasi):**
   - Mengimpor `Footer` dan merendernya dengan `<Footer client:visible />` di baris 29.
   - Batas hidrasi ini dipertahankan 100% utuh tanpa perubahan konfigurasi bundler.
5. **`tests/test-contact-ui.mjs` (Inspeksi Integritas E2E Eksisting):**
   - Memvalidasi ketiadaan hardcode `wa.me`, reaktivitas footer, sinkronisasi CTA dinamis, serta ketiadaan teks sapaan kontak saat `data: null`.
   - Assertion `assert.equal(inactFooterText.includes('Ada Pertanyaan? Kami Siap Membantu.'), false)` akan tetap terpenuhi karena judul/sub-judul kontak di Kolom 4 dikaitkan dengan kondisi `isActive`.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Tidak ada dependensi baru yang diinstal. Seluruh tata letak menggunakan utilitas grid Tailwind CSS v4 bawaan, ikon dari `lucide-react`, dan React 19 hooks.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Ternary CSS Classes di JSX:* Logika adaptive grid mengharuskan penulisan kelas kondisional Tailwind pada kontainer kolom (`isActive ? 'lg:col-span-4' : 'lg:col-span-5'`). Ditukar dengan keuntungan layout yang 100% mulus tanpa celah bolong saat data CMS berubah.
  - *Progressive Anchoring Sementara di Kolom 3:* Sebelum halaman Astro mandiri (`src/pages/*.astro`) dibangun di tiket berikutnya, tautan Kolom 3 diarahkan ke anchor seksi landing page yang paling relevan. Ini adalah kompromi yang disengaja agar pengunjung tidak menghadapi dead link / 404.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
* **Tujuan:** Menyentralisasi seluruh metadata navigasi, tautan bantuan, dan copywriting footer dalam satu berkas konfigurasi.
* **Langkah Konkret:**
  1. Di `src/constants/data.js`, tambahkan ekspor konstanta:
     ```javascript
     export const NAV_LINKS = [
       { name: 'Beranda', href: '#hero' },
       { name: 'Tentang Kami', href: '#tentang' },
       { name: 'Produk', href: '#produk' },
       { name: 'Cara Pesan', href: '#cara-pesan' },
       { name: 'Kontak', href: '#kontak' },
     ];

     export const FOOTER_INFO_LINKS = [
       { name: 'Pusat Bantuan & FAQ', href: '#kontak', description: 'Tanya jawab seputar produk & pesanan' },
       { name: 'Panduan Dosis & Pemakaian', href: '#tentang', description: 'Takaran campur air & aplikasi rumah' },
       { name: 'Standar Kualitas Alami', href: '#tentang', description: 'Proses fermentasi 90 hari & non-kimia' },
       { name: 'Ketentuan Order & Retur WA', href: '#cara-pesan', description: 'Garansi botol aman sampai tujuan' },
     ];

     export const FOOTER_CONTENT = {
       missionDescription:
         'SiDeta adalah wujud nyata hilirisasi riset pengabdian masyarakat Desa Jeruklegi, menghadirkan formula pembersih alami berbasis eco-enzyme yang aman untuk keluarga dan ramah bagi ekosistem air.',
       commitmentBadge: '100% Fermentasi Alami • Bebas SLS & Paraben',
       quickLinksTitle: 'Jelajahi',
       infoLinksTitle: 'Informasi & Bantuan',
       contactTitle: 'Hubungi Kami',
       contactSubtitle: 'Ada Pertanyaan? Kami Siap Membantu.',
       contactDescription:
         'Ingin tahu lebih banyak tentang produk, cara pembuatan, atau peluang kolaborasi? Jangan ragu menghubungi kami.',
       copyrightText:
         'Inovasi Produk Pembersih Ramah Lingkungan Program Pengabdian Masyarakat Sanitasi Hijau Desa Jeruklegi.',
     };
     ```

---

### 🎨 Fase 2: Reusable Design System Atoms
* *Status:* **N/A** (Tiket ini tidak memerlukan atom UI baru. Komponen menggunakan atom `<SectionWrapper>` yang sudah ada di `src/components/ui/SectionWrapper.jsx`).

---

### 🧩 Fase 3: Layout Sections (`Navbar.jsx` & `Footer.jsx`)
* **Tujuan:** Memperbarui konsumsi data navigasi di `Navbar.jsx` dan merombak total tata letak `Footer.jsx` menjadi 4 kolom asimetris responsif.
* **Langkah Konkret:**
  1. **`src/components/sections/Navbar.jsx`:**
     - Hapus deklarasi lokal `navLinks = [...]` (baris 10–16).
     - Impor `NAV_LINKS` dari `../../constants/data.js`.
     - Gunakan `NAV_LINKS` untuk rendering tautan desktop dan menu mobile drawer.
  2. **`src/components/sections/Footer.jsx`:**
     - Impor `NAV_LINKS`, `FOOTER_INFO_LINKS`, `FOOTER_CONTENT`, dan `BRAND_IDENTITY` dari `../../constants/data.js`.
     - Struktur kontainer utama:
       - Bungkus dalam `max-w-7xl mx-auto px-4 sm:px-6 md:px-8`.
       - Grid responsif: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left`.
     - **Kolom 1 (Brand & Misi SiDeta):**
       - Kelas Tailwind: `isActive ? 'lg:col-span-4' : 'lg:col-span-5'`.
       - Render logo resmi SiDeta (`BRAND_IDENTITY.logoFull`) dalam kontainer putih ber-padding rapi (`bg-white/95 rounded-2xl px-4 py-2`).
       - Teks narasi misi dari `FOOTER_CONTENT.missionDescription` dengan warna `text-white/85 text-sm leading-relaxed`.
       - Badge komitmen alami dari `FOOTER_CONTENT.commitmentBadge` dengan aksen `text-xs font-semibold text-brand-accent tracking-wide`.
     - **Kolom 2 (Navigasi Cepat / Jelajahi):**
       - Kelas Tailwind: `isActive ? 'lg:col-span-2' : 'lg:col-span-3'`.
       - Header kolom: `FOOTER_CONTENT.quickLinksTitle` (`text-sm font-bold uppercase tracking-wider text-white/90`).
       - List navigasi: Semantic `<ul className="space-y-3">` memetakan `NAV_LINKS.map(link => ...)` dengan tautan `text-sm text-white/75 hover:text-brand-accent transition-colors duration-150 py-1 inline-block`.
     - **Kolom 3 (Informasi & Bantuan Konsumen):**
       - Kelas Tailwind: `isActive ? 'lg:col-span-3' : 'lg:col-span-4'`.
       - Header kolom: `FOOTER_CONTENT.infoLinksTitle`.
       - List bantuan: Semantic `<ul className="space-y-3">` memetakan `FOOTER_INFO_LINKS.map(item => ...)` dengan judul tautan dan micro-copy deskripsi ringkas.
     - **Kolom 4 (Hubungi Kami API Dinamis):**
       - Ditampilkan hanya jika `isActive === true`.
       - Kelas Tailwind: `lg:col-span-3`.
       - Header kolom: `FOOTER_CONTENT.contactTitle` dan subtitle `FOOTER_CONTENT.contactSubtitle`.
       - Kontainer diberi `min-h-[160px]` untuk menjamin **Zero CLS**.
       - Jika `isLoading === true`, tampilkan *Inline Skeleton Shimmer* 3 baris vertikal (alamat, email, telepon).
       - Jika data siap, render daftar `contactItems` dengan ikon `MapPin`, `Mail`, `Phone`, dan sanitasi tautan `https://wa.me/` yang mempertahankan integrasi Issue #19.
     - **Sub-Footer Bar Bawah:**
       - Berada di bawah grid kolom dengan pemisah `border-t border-white/15 pt-8 mt-12`.
       - Layout flexbox responsif: `flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70`.
       - Di kiri: Teks Copyright resmi `&copy; 2026 SiDeta &mdash; Inovasi Produk Pembersih Ramah Lingkungan...`.
       - Di kanan: Tautan *"Kembali ke Atas ↑"* (`href="#hero"`) yang halus dan ramah aksesibilitas.

---

### 🏛️ Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
* **Tujuan:** Memvalidasi bahwa pemanggilan `<Footer client:visible />` di `src/pages/index.astro` berfungsi harmonis dengan arsitektur Astro v5 tanpa regresi hidrasi.
* **Langkah Konkret:**
  - Pastikan `src/pages/index.astro` tetap mengimpor `Footer` dan merendernya sebagai `<Footer client:visible />`.
  - Jalankan `npm run build` untuk memverifikasi isolasi Astro Island.

---

### 🛡️ Fase 5: Quality Gate, Otomasi Pengujian & Verifikasi
* **Tujuan:** Memastikan tidak ada regresi fungsional, sintaksis, maupun visual smoke.
* **Langkah Konkret:**
  1. **Pembuatan Suite Pengujian Mandiri (`tests/test-footer-layout.mjs`):**
     - Memverifikasi keberadaan 4 kolom saat kontak aktif (`isActive === true`).
     - Memverifikasi keberadaan logo resmi, teks misi, 5 tautan navigasi, dan 4 tautan informasi bantuan.
     - Memverifikasi bahwa seluruh tautan navigasi dan bantuan memiliki target valid (bukan `href="#"` atau string kosong).
     - Memverifikasi *Adaptive Collapse*: saat route API disetel `{ data: null }`, Kolom 4 unmounted, sementara Kolom 1, 2, 3 tetap tampil utuh dengan proporsi CSS yang benar.
     - Memverifikasi kestabilan render di 3 resolusi: Mobile (375x667), Tablet (768x1024), dan Desktop (1280x800).
  2. **Eksekusi 4-Tier Quality Gate Bertahap:**
     - **Tier 1 (Linter):** `npm run lint` (`oxlint`) wajib 0 error dan 0 warning.
     - **Tier 2 (Unit & Service Contract):** `node tests/test-api-services.mjs` (8/8 PASS).
     - **Tier 3 (Build Production):** `npm run build` (`astro build`) sukses mengompilasi bundle statis di `dist/`.
     - **Tier 4 (E2E Regression & Visual Smoke Gate):**
       - `node tests/test-contact-ui.mjs` (Memastikan integrasi kontak & WhatsApp checkout Issue #19 tetap 100% HIJAU).
       - `node tests/test-footer-layout.mjs` (Suite baru untuk arsitektur 4-kolom).
       - `node tests/test-visual-smoke.mjs` (Visual smoke menyeluruh).

---

## 🛡️ Checklist Kriteria Kelayakan (Definition of Done)
- [ ] `src/constants/data.js` mengekspor `NAV_LINKS`, `FOOTER_INFO_LINKS`, dan `FOOTER_CONTENT`.
- [ ] `src/components/sections/Navbar.jsx` mengonsumsi `NAV_LINKS` dari `data.js` tanpa array lokal duplikat.
- [ ] `src/components/sections/Footer.jsx` terbukti mengadopsi 4 kolom asimetris desktop (`4 : 2 : 3 : 3`) dan responsive mobile-first.
- [ ] Perilaku *Adaptive Grid Collapse* terverifikasi: jika kontak dinonaktifkan di CMS, Kolom 4 hilang dan Kolom 1–3 meregang proporsional (`5 : 3 : 4`).
- [ ] Ketiadaan *Dead Links*: Seluruh tautan Kolom 2 dan 3 memiliki href anchor yang valid dan terhubung.
- [ ] *Zero Cumulative Layout Shift (CLS = 0.00)*: Kolom 4 memiliki penahan tinggi minimum skeleton saat fetching data.
- [ ] Seluruh skenario pengujian di `tests/test-contact-ui.mjs` dan `tests/test-footer-layout.mjs` berstatus **PASS** (100% GREEN).
- [ ] `npm run lint` dan `npm run build` berhasil tanpa satu pun error atau warning.

---

> 🛑 **GERBANG ANTI-AUTO-EXECUTE (CIRCUIT BREAKER AKTIF):**
> Sesuai SOP `/plan`, penyusunan rencana berhenti total di sini. AI dilarang menyentuh kode sumber atau mengeksekusi langkah implementasi apa pun sebelum pengguna manusia memberikan perintah eksplisit.
