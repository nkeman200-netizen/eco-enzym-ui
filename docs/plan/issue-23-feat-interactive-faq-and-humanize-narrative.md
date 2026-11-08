<!-- RequestFeedback: false -->
# [FEAT] Issue #23: Arsitektur Pusat Bantuan Interaktif (0 KB JS) & Humanize Narasi Produk SiDeta
- **Target GitHub Issue:** #23
- **Branch Terkait:** `feature/issue-23-interactive-faq-and-humanize-narrative`
- **Dokumen Rencana:** `docs/plan/issue-23-feat-interactive-faq-and-humanize-narrative.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Papan Informasi Ramah di Pintu Keluar Galeri:**
> Bayangkan seorang pengunjung telah menjelajahi seluruh lorong galeri produk alami SiDeta:
> 1. **Kondisi Sebelum Tiket Ini:** Pengunjung sudah melihat masalah limbah, proses fermentasi, katalog sabun, cara pesan, dan ulasan pembeli lain. Namun tepat sebelum melangkah ke meja kasir (*Final CTA*), muncul keraguan khas ibu rumah tangga: *"Takaran campur airnya berapa sendok ya? Kalau kena kulit bayi aman nggak? Masa simpannya berapa bulan?"*. Tanpa seksi bantuan, keraguan ini membuat mereka menunda pembelian. Selain itu, tautan *Pusat Bantuan & FAQ* di Kolom 3 Footer masih berlabuh ke anchor darurat.
> 2. **Solusi Baru (*Native Zero-JS FAQ Section & Warm Humanized Copywriting*):**
>    - **Seksi Bantuan Interaktif `#faq`:** Disematkan tepat di antara *Testimonials* dan *Final CTA*. Berfungsi sebagai *objection handler* pamungkas.
>    - **0 KB Client-Side JavaScript Overhead:** Dibangun menggunakan elemen semantik native browser `<details>` dan `<summary>` dengan styling Tailwind CSS v4 modern (`group-open:rotate-180`). Skor Lighthouse dijamin tetap 100/100 tanpa beban hidrasi runtime JS.
>    - **Single Source of Truth (`src/constants/data.js`):** Mengekspor array terpusat `FAQ_ITEMS` berisi 4 butir tanya-jawab terfokus yang memetakan langsung 4 tautan di Kolom 3 Footer (`FOOTER_INFO_LINKS`).
>    - **Humanizing Copywriting (Sentuhan Hangat Komunitas Jeruklegi):** Memoles salinan teks data dummy awal di `data.js` menjadi suara hangat pengrajin lokal yang tulus, empati, dan ramah keluarga tanpa merusak struktur kontrak data (*invariant-safe*).

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via Codebase Inspection)

1. **`src/constants/data.js` (Inspeksi Skema Data & Kontrak):**
   - Saat ini mengekspor data statis SB7: `BRAND_IDENTITY`, `PROBLEM_CARDS`, `EDUCATION_STEPS`, `PLAN_STEPS`, `PRODUCTS`, `TESTIMONIALS`, `NAV_LINKS`, `FOOTER_INFO_LINKS`, `FOOTER_CONTENT`, `CONTACT_INFO`.
   - Akan ditambahkan ekspor konstanta baru:
     - `FAQ_ITEMS`: Array 4 objek tanya-jawab (`id`, `category`, `question`, `answer`).
   - Akan diperbarui:
     - `FOOTER_INFO_LINKS`: Mengarahkan tautan informasi konsumen ke `#faq` secara presisi.
     - `PROBLEM_CARDS`, `EDUCATION_STEPS`, `PLAN_STEPS`, dan `PRODUCTS`: Diksi disempurnakan agar bernuansa hangat, ramah anak, dan bebas dari AI-isms / corporate jargon.
2. **`src/components/ui/SectionWrapper.jsx` (Inspeksi Reusable Atoms):**
   - Pola standar kontainer: `<SectionWrapper id="..." className="..." containerClassName="...">`.
   - Digunakan sebagai pembungkus seksi `#faq` dengan kelas `bg-[#FDFBF7]` dan `scroll-mt-24` agar judul tidak terpotong Sticky Navbar.
3. **`src/components/sections/Faq.jsx` (Komponen Baru):**
   - Menerima data dari `FAQ_ITEMS`.
   - Menggunakan tag native `<details className="group bg-white border border-brand-accent/20 rounded-2xl ...">` dan `<summary className="list-none [&::-webkit-details-marker]:hidden ...">`.
   - Ikon chevron dari `lucide-react` berputar mulus via `group-open:rotate-180`.
4. **`src/pages/index.astro` (Inspeksi Shell Orkestrasi):**
   - Mengimpor `Faq` dan merendernya secara statis `<Faq />` (tanpa directive `client:*`).
   - Menghasilkan markup HTML statis murni yang ramah mesin pencari Google (SEO Schema FAQ ready).

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Menggunakan 100% tag HTML bawaan browser (`<details>`, `<summary>`), utilitas styling Tailwind CSS v4, dan ikon `ChevronDown`, `HelpCircle`, `MessageCircle` dari `lucide-react` yang sudah ada di proyek.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Multi-Open Behavior secara Default:* Pada native `<details>`, pengguna dapat membuka lebih dari satu pertanyaan sekaligus tanpa saling menutup otomatis. Hal ini diterima sebagai trade-off yang sangat sepadan demi meraih **0 KB client-side JS footprint** dan aksesibilitas keyboard native bawaan peramban.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
1. **Definisi `FAQ_ITEMS`:**
   Menyusun 4 tanya-jawab terfokus yang membumi:
   - *FAQ 1 (Dosis & Takaran):* Takaran campur air untuk mengepel lantai (1–2 tutup botol per ember) dan semprot serbaguna.
   - *FAQ 2 (Keamanan Balita & Hewan Peliharaan):* Formula non-kimia sintetis, bebas SLS, ramah kulit sensitif dan aman jika terjilat anabul.
   - *FAQ 3 (Masa Simpan & Penyimpanan):* Tahan 12 bulan di suhu ruang terhindar dari sinar matahari terik langsung.
   - *FAQ 4 (Garansi Pengiriman & Pemesanan WA):* Garansi ganti botol baru jika ada kebocoran/kerusakan saat ekspedisi via konfirmasi foto/video singkat ke admin.
2. **Penyelarasan `FOOTER_INFO_LINKS`:**
   Memperbarui target `href` agar berlabuh ke `#faq` (misal: `#faq` untuk Pusat Bantuan dan Panduan Dosis).
3. **Polesan Diksi Humanis (Humanizing Copywriting):**
   Memoles salinan teks pada `PROBLEM_CARDS`, `EDUCATION_STEPS`, dan `PLAN_STEPS` dengan sudut pandang empati keluarga dan ketulusan warga Jeruklegi.

---

### Fase 2: Reusable Atoms & Styling Accordion
1. Merancang styling kartu `<details>` dan `<summary>` dengan Tailwind CSS v4:
   - Indikator marker disembunyikan: `[&::-webkit-details-marker]:hidden list-none`.
   - Rotasi panah indikator: `group-open:rotate-180 transition-transform duration-300`.
   - Border aktif dan bayangan lembut saat terbuka: `open:border-brand-primary/40 open:shadow-md`.
   - Target sentuh mobile-friendly: `min-h-[48px] py-4 px-6`.

---

### Fase 3: Layout Section (`src/components/sections/Faq.jsx`)
1. Membangun komponen `Faq.jsx`:
   - Header seksi: Badge *"Pusat Bantuan & Edukasi Warga"*, headline *"Pertanyaan yang Sering Ditanyakan"*, subheadline *"Jawaban jujur dari dapur fermentasi Desa Jeruklegi."*.
   - Accordion list: Render 4 kartu `<details>` yang responsif di desktop maupun mobile.
   - Box bantuan cepat WhatsApp: Box penutup ramah berlatar `bg-brand-accent/10` dengan tombol kontak langsung ke admin bagi pengunjung yang memiliki pertanyaan khusus.

---

### Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
1. Mengimpor komponen `Faq` di `src/pages/index.astro`.
2. Menyematkan `<Faq />` di antara `<Testimonials client:visible />` dan `<FinalCTA />`.
3. Memastikan komponen ter-render murni statis tanpa directive `client:*`.

---

### Fase 5: Quality Gate & Test Verification
1. **Tier 1 (Linting):** Menjalankan `npm run lint` (`oxlint`) ➔ 0 errors, 0 warnings.
2. **Tier 2 (Logic Tests):** Menjalankan `node tests/test-api-services.mjs` ➔ 8/8 tests PASS.
3. **Tier 3 (Production Bundler):** Menjalankan `npm run build` (`astro build`) ➔ Sukses 100%.
4. **Tier 4 (Visual Smoke & E2E Gate):**
   - Membuat suite pengujian mandiri `tests/test-faq-and-narrative.mjs`:
     * Menguji keberadaan seksi `#faq`, 4 kartu accordion, tag `<details>` & `<summary>`.
     * Menguji interaksi toggle buka-tutup dan verifikasi atribut `open`.
     * Menguji audit tautan Footer Kolom 3 ke `#faq`.
     * Mengambil bukti visual tangkapan layar desktop & mobile (`tests/screenshots/faq-desktop.png`, `faq-mobile.png`).
   - Menjalankan seluruh suite regresi:
     * `node tests/test-footer-layout.mjs` (PASS).
     * `node tests/test-contact-ui.mjs` (PASS).
     * `node tests/test-testimonials-ui.mjs` (PASS).
     * `node tests/test-visual-smoke.mjs` (PASS).

---

## 🛑 Gerbang Anti-Auto-Proceed (Circuit Breaker)
Dokumen rencana arsitektur ini telah selesai disusun secara komprehensif. Berdasarkan konstitusi pengembang:
- AI **DILARANG** melakukan modifikasi kode produksi sebelum pengguna memberikan instruksi eksplisit.
- Menunggu arahan pengguna untuk melangkah ke tahap **`/tdd`** (Red Test Phase) atau **`/execute`** (Implementasi).
