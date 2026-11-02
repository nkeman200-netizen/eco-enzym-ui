<!-- RequestFeedback: false -->
# [FEAT] Issue #14: Redesain Kartu Testimoni Gaya Clean Editorial Typography & Harmonisasi Kontrak Data
- **Target GitHub Issue:** #14
- **Branch Terkait:** `feature/issue-14-editorial-testimonials`
- **Arsip Permanen:** `docs/plan/issue-14-feat-editorial-testimonials.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Galeri Seni & Majalah Gaya Hidup Alami:**
> Bayangkan kamu sedang membaca majalah kurasi gaya hidup alami (*lifestyle journal*) seperti *Kinfolk* atau katalog produk *Aesop* dan *Sensatia Botanicals*.
> 1. Pada kartu ulasan pelanggan saat ini, perhatian mata pembeli langsung ditarik ke bulatan hijau berisi inisial nama besar (`ER`, `BS`, `SN`). Pola ini lazim ditemukan pada aplikasi manajemen tugas SaaS (seperti Jira/Slack) atau data tiruan (*mock data*) programmer, yang secara psikologis menurunkan rasa percaya pembeli terhadap produk ramah lingkungan buatan tangan warga desa.
> 2. Melalui pendekatan **Clean Editorial Typography**, kita menyingkirkan elemen avatar lingkaran tersebut secara permanen. Kekuatan bukti sosial (*Social Proof*) dialihkan murni ke **kejujuran kata-kata pengalaman nyata pelanggan** yang dibungkus dengan tipografi semantik `<figure>` dan `<blockquote>` yang bernapas lega (*relaxed leading*).
> 3. Tanda tangan pelanggan di bagian bawah disusun secara anggun: nama pelanggan dicetak tebal (`text-text-main font-bold`) berdampingan dengan domisili kota yang lembut (`text-gray-500 text-xs`), di atas garis aksen pembatas halus (`border-t border-gray-100`).
> 4. Lima bintang sitrus emas (`brand-citrus-warm`) di bagian atas tetap dipertahankan sebagai sinyal kepuasan pelanggan bintang lima di atas kanvas kartu gading hangat (`#FDFBF7`).
> 5. Seluruh data lokal di `src/constants/data.js` dibersihkan dari properti usang `avatarInitial` sehingga 100% harmonis dengan skema kontrak backend Laravel `GET /api/v1/testimonials` (`id`, `name`, `location`, `quote`).

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp & codebase inspection)

1. **`src/components/sections/Testimonials.jsx` (LSP Symbol Verified):**
   - Simbol komponen utama: `Testimonials` pada baris 20.
   - Peta render: `IMPACT_STATS.map()` pada baris 39 dan `TESTIMONIALS.map()` pada baris 55.
   - Pada baris 74–77, terdapat elemen avatar inisial:
     ```jsx
     <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
       {item.avatarInitial}
     </div>
     ```
     Elemen ini akan dihapus dan digantikan oleh struktur tipografi semantik.
2. **`src/constants/data.js` (Codebase Verified):**
   - Menampung saklar visibilitas: `export const SHOW_TESTIMONIALS = true;` (baris 348).
   - Array `TESTIMONIALS` (baris 350–383) memiliki 3 entri dummy: `'Ibu Endang Rahayu'`, `'Pak Bambang Sutrisno'`, dan `'Siti Nurjanah'`.
   - Masing-masing entri masih memuat properti `avatarInitial: 'ER' | 'BS' | 'SN'`.
   - Blok template komentar pada baris 351–358 masih memuat petunjuk format usang `avatarInitial: '[Inisial Nama]'`.
3. **`docs/RFC_DATA_CONTRACT_BACKEND.md` (Spesifikasi Kontrak Verified):**
   - Baris 226–246 menegaskan bahwa payload respons `GET /api/v1/testimonials` hanya mengirim objek ulasan berisi: `{ id, name, location, quote }`.
   - Bab 3.2 menegaskan keputusan arsitektur penghapusan avatar inisial demi estetika editorial produk alami.
4. **`src/pages/index.astro` (Codebase Verified):**
   - Komponen `<Testimonials />` dipanggil di baris 26 sebagai komponen server murni (0 KB JavaScript). Pada Issue #14 ini, status statis server tetap dipertahankan 100%.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - Kita **menolak 100%** penambahan library CSS atau ikon eksternal baru, sesuai Konstitusi `.agentrules`. Seluruh penataan visual diselesaikan murni menggunakan Tailwind CSS v4 semantik.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Absennya Elemen Grafis Wajah:* Menghapus avatar lingkaran berarti kartu tidak memiliki elemen visual wajah atau foto pembeli. Kartu bergantung 100% pada kekuatan tipografi, pernapasan spasi vertikal (*whitespace*), dan keaslian kalimat ulasan (*copywriting*).
  - *Disiplin Kontras Aksesibilitas:* Teks ulasan yang diletakkan di atas kanvas gading hangat (`#FDFBF7`) wajib dijaga pada kelas warna `text-gray-700` atau `text-text-main` guna memastikan rasio kontras tidak turun di bawah standar WCAG AA ($4.5:1$).

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer & Single Source of Truth (`src/constants/data.js`)
* **Tujuan:** Menghapus properti usang `avatarInitial` dari data lokal dan memperbarui dokumentasi template ulasan.
* **Langkah Konkret:**
  - Menghapus field `avatarInitial` dari ketiga objek di dalam array `TESTIMONIALS`.
  - Memperbarui blok komentar template di baris 351–358 agar mencerminkan format bersih:
    ```javascript
    // Template format jika nanti diganti data nyata:
    // {
    //   id: 'testimoni-1',
    //   name: '[Nama Pelanggan]',
    //   location: '[Kota / Kelurahan]',
    //   quote: '[Kalimat singkat pengalaman nyata. Maks 2 kalimat.]',
    // },
    ```
  - Memastikan *copywriting* ulasan tetap membumi dan merefleksikan empati keluarga/komunitas Jeruklegi.

---

### 🎨 Fase 2: Reusable Design System Atoms
* **Tujuan:** Mengonfirmasi isolasi komponen ulasan.
* **Langkah Konkret:**
  - Sesuai konsensus arsitektur (Opsi 1: *Inline Refactoring*), kartu testimoni direkayasa langsung di dalam `Testimonials.jsx` tanpa membuat berkas komponen atomik baru di `src/components/ui/` demi mencegah *over-abstraction* prematur.

---

### 🏛️ Fase 3: Layout Sections (`src/components/sections/Testimonials.jsx`)
* **Tujuan:** Merombak susunan markup kartu ulasan menjadi gaya *Clean Editorial Typography*.
* **Langkah Konkret:**
  - Mengubah container kartu ulasan menjadi tag semantik `<figure>` dengan latar gading hangat (`bg-[#FDFBF7]`), border halus sitrus-botanikal (`border border-brand-accent/15`), dan sudut membulat elegan (`rounded-3xl p-7`).
  - Menempatkan 5 bintang sitrus emas (`brand-citrus-warm`) di bagian teratas kartu.
  - Membungkus teks kutipan dengan tag semantik `<blockquote>` menggunakan styling `text-sm sm:text-base text-gray-700 leading-relaxed italic`.
  - Menghapus container flexbox avatar lingkaran `w-10 h-10 rounded-full bg-brand-primary` secara tuntas.
  - Membangun baris atribusi pengulas menggunakan tag semantik `<figcaption>`:
    ```jsx
    <figcaption className="flex items-baseline justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
      <span className="block text-sm sm:text-base font-bold text-text-main tracking-tight">
        {item.name}
      </span>
      <span className="block text-xs text-gray-500 font-medium flex-shrink-0">
        {item.location}
      </span>
    </figcaption>
    ```
  - Mempertahankan guard visibilitas `if (!SHOW_TESTIMONIALS || TESTIMONIALS.length === 0) return null;` di baris teratas komponen.

---

### 🌐 Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
* **Tujuan:** Memastikan perakitan seksi di halaman utama tetap mematuhi kedaulatan performa 0 KB JavaScript.
* **Langkah Konkret:**
  - Memvalidasi bahwa `<Testimonials />` di `src/pages/index.astro` tetap dirender sebagai komponen statis server tanpa direktif hidrasi klien (`client:load` atau `client:visible`).

---

### 🧪 Fase 5: Quality Gate & Verification (Automated Test Suite)
* **Tujuan:** Menguji secara empiris ketiadaan elemen inisial lingkaran dan memvalidasi aksesibilitas WCAG AA.
* **Langkah Konkret:**
  - Membuat skrip uji otomatis Playwright: `tests/test-testimonials-ui.mjs`:
    1. Membuka landing page di Chromium headless pada resolusi desktop (1280x800) dan mobile (375x667).
    2. Memverifikasi bahwa selektor avatar inisial (`.rounded-full.bg-brand-primary` atau penampung teks inisial) bernilai mutlak **0 elemen** di DOM.
    3. Memverifikasi keberadaan tag semantik `<figure>`, `<blockquote>`, dan `<figcaption>`.
    4. Mengukur rasio kontras warna teks kutipan (`rgb(55, 65, 81)` / `rgb(17, 24, 39)`) terhadap warna kartu (`#FDFBF7` / `rgb(253, 251, 247)`), memastikan nilai rasio $\ge 4.5:1$ (WCAG AA).
    5. Mengambil tangkapan layar bukti visual ke `tests/screenshots/testimonials-editorial-desktop.png` dan `tests/screenshots/testimonials-editorial-mobile.png`.
  - Menjalankan rantai verifikasi kualitas:
    ```bash
    npm run lint
    node tests/test-testimonials-ui.mjs
    npm run build
    node tests/test-visual-smoke.mjs
    node tests/test-visual-hover.mjs
    ```

---

## 🔒 Invariant & Kriteria Penolakan PR (Hard Rejection Triggers)

- ❌ **PR DITOLAK** jika masih merender elemen avatar inisial lingkaran (`avatarInitial`).
- ❌ **PR DITOLAK** jika memasang direktif hidrasi klien (`client:*`) pada `<Testimonials />` di `index.astro`.
- ❌ **PR DITOLAK** jika rasio kontras teks ulasan berada di bawah standar WCAG 2.1 AA ($< 4.5:1$).
- ❌ **PR DITOLAK** jika berkas di luar daftar Blast Radius dimodifikasi tanpa izin Tech Lead.
