<!-- RequestFeedback: false -->
# [FEAT] Issue #15: Integrasi Dinamis API Testimoni & Angka Dampak Lingkungan dengan Graceful Offline Fallback Shield
- **Target GitHub Issue:** #15
- **Branch Terkait:** `feature/issue-15-dynamic-testimonials-api`
- **Arsip Permanen:** `docs/plan/issue-15-feat-dynamic-testimonials-api.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Papan Informasi Digital & Generator Cadangan Otomatis (UPS):**
> Bayangkan papan informasi digital di lobi balai desa Jeruklegi yang menampilkan timbangan sampah kulit buah terkini dan ulasan warga:
> 1. Agar papan digital tidak menyedot listrik saat belum ada tamu yang lewat di lorong belakang, kita memasang sensor gerak (**Astro `client:visible`**). Begitu pengunjung berjalan mendekati papan, layar baru menyala dan menarik data terbaru dari komputer pusat (`GET /api/v1/testimonials`).
> 2. Selama sepersekian detik saat data ditarik dari pusat, layar menampilkan siluet kotak berdenyut lembut (**Inline Skeleton Shimmer**) dengan ukuran yang sama persis dengan kotak aslinya, sehingga layar tidak berkedip kasar (*Zero CLS*).
> 3. Apabila jaringan internet desa sedang putus atau admin desa baru mengisi setengah data (misal hanya mengisi angka statistik tapi lupa mengisi ulasan), **Generator Cadangan Otomatis (Atomic All-or-Fallback Shield)** di `src/services/testimonialService.js` langsung bekerja dalam hitungan milidetik: mengalihkan layar ke paket data terverifikasi lokal (`IMPACT_STATS` & `TESTIMONIALS` di `src/constants/data.js`). Tamu tidak akan pernah melihat layar mati atau tabel yang ompong.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via agent-lsp & codebase inspection)

1. **`src/services/apiClient.js` (LSP Symbol Verified):**
   - Mengekspor `API_BASE_URL` (baris 16) dan fungsi `apiGet(endpoint, options)` (baris 26).
   - Menerapkan *Safe Result Tuple Pattern* (`{ data, error }`) dan secara otomatis membuka bungkus amplop standar Laravel (`payload.data`).
2. **`src/services/productService.js` (LSP Symbol Verified):**
   - Menjadi referensi pola standar domain service di repositori ini (`normalizeProduct` & `getProducts`).
3. **`src/components/sections/Testimonials.jsx` (LSP Symbol Verified):**
   - Saat ini berupa fungsi sinkron statis yang merender `IMPACT_STATS` (baris 39) dan `TESTIMONIALS` dengan semantik `<figure>`, `<blockquote>`, dan `<figcaption>` (baris 55–85).
   - Memiliki guard visibilitas di baris 22: `if (!SHOW_TESTIMONIALS || TESTIMONIALS.length === 0) return null;`.
4. **`src/pages/index.astro` (Codebase Verified):**
   - Baris 26 memanggil `<Testimonials />` tanpa direktif hidrasi klien. Akan diperbarui menjadi `<Testimonials client:visible />`.
5. **`docs/RFC_DATA_CONTRACT_BACKEND.md` (Spesifikasi Kontrak Verified):**
   - Endpoint `GET /api/v1/testimonials` mengembalikan objek `{ data: { statistics: [{ id, value, description }], testimonials: [{ id, name, location, quote }] } }`.
   - Perhatikan bahwa di backend Laravel properti keterangan statistik bernama `description`, sedangkan di UI frontend bernama `label`. Normalizer wajib memetakan `raw.description || raw.label` ke properti `label`.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Seluruh komunikasi HTTP menggunakan `apiGet` (Web Fetch API native) dan state menggunakan React 19 hooks bawaan (`useState`, `useEffect`).
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Tambahan Bundle Hydration Kecil:* Mengubah `Testimonials.jsx` dari komponen server murni menjadi `client:visible` menambah sedikit beban JavaScript klien (~2–3 KB gzipped), namun beban ini ditunda sepenuhnya (*lazy-loaded*) hingga pengguna benar-benar menggulir ke bagian bawah halaman.
  - *Ketegasan Atomic Shield:* Karena kita menerapkan *Atomic All-or-Fallback Shield*, jika admin backend hanya mengisi data statistik tetapi membiarkan tabel testimoni kosong (0 baris), maka website akan tetap menampilkan paket data lokal `data.js` secara utuh demi mencegah tampilan seksi yang timpang.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data & Service Layer (`src/services/testimonialService.js`)
* **Tujuan:** Membangun modul service domain mandiri untuk mengambil, menormalisasi, dan melindungi data testimoni & angka dampak.
* **Langkah Konkret:**
  - Membuat berkas `src/services/testimonialService.js`.
  - Mengimplementasikan fungsi `normalizeStatistic(raw)`:
    - Memastikan input berupa objek valid.
    - Memetakan `{ id: raw.id ?? 0, value: String(raw.value || '').trim(), label: String(raw.description || raw.label || '').trim() }`.
    - Mengembalikan `null` jika `value` atau `label` kosong.
  - Mengimplementasikan fungsi `normalizeTestimonial(raw)`:
    - Memastikan input berupa objek valid.
    - Memetakan `{ id: raw.id ?? 0, name: String(raw.name || '').trim(), location: String(raw.location || '').trim(), quote: String(raw.quote || '').trim() }`.
    - Mengembalikan `null` jika `name` atau `quote` kosong.
  - Mengimplementasikan fungsi `normalizeTestimonialsPayload(rawPayload)`:
    - Mengekstrak array `statistics` dan `testimonials` dari objek payload.
    - Menjalankan normalizer pada masing-masing item dan memfilter nilai `null`.
    - **Atomic All-or-Fallback Check:** Jika `statistics.length === 0` ATAU `testimonials.length === 0`, kembalikan `null` sebagai sinyal bahwa paket data tidak utuh.
  - Mengimplementasikan fungsi utama `getTestimonialsData()`:
    - Memanggil `const { data, error } = await apiGet('/testimonials');`.
    - Jika `error` atau `!data`, atau hasil `normalizeTestimonialsPayload(data)` bernilai `null`, cetak `console.warn` yang ramah dan kembalikan `{ statistics: IMPACT_STATS, testimonials: TESTIMONIALS, isFallback: true }`.
    - Jika valid dan utuh, kembalikan `{ statistics, testimonials, isFallback: false }`.

---

### 🎨 Fase 2: Reusable Design System Atoms
* **Tujuan:** Mengonfirmasi isolasi komponen shimmer.
* **Langkah Konkret:**
  - Sesuai konsensus arsitektur Isu 3 (Opsi 1: *Inline Section Skeleton*), markup skeleton shimmer disatukan langsung di dalam `src/components/sections/Testimonials.jsx` tanpa menambah berkas atom baru di `src/components/ui/`.

---

### 🏛️ Fase 3: Layout Sections (`src/components/sections/Testimonials.jsx`)
* **Tujuan:** Mengubah `Testimonials.jsx` menjadi komponen reaktif dengan dukungan *Skeleton Loading Shimmer* dan konsumsi data dinamis dari `testimonialService.js`.
* **Langkah Konkret:**
  - Mengimpor `useState`, `useEffect` dari `react` dan `getTestimonialsData` dari `../../services/testimonialService`.
  - Menambahkan state reaktif:
    - `const [stats, setStats] = useState(IMPACT_STATS);`
    - `const [testimonials, setTestimonials] = useState(TESTIMONIALS);`
    - `const [isLoading, setIsLoading] = useState(true);`
  - Menjalankan `useEffect` saat komponen dihidrasi di browser (dengan pengaman `let isMounted = true`) untuk memanggil `getTestimonialsData()`, memperbarui `stats` dan `testimonials`, lalu mengubah `isLoading` menjadi `false`.
  - Merancang tampilan **Inline Skeleton Shimmer** saat `isLoading === true`:
    - **3 Kotak Statistik Shimmer:** Menggunakan grid `grid-cols-1 sm:grid-cols-3 gap-6 mb-14`, masing-masing kotak memiliki kelas `bg-brand-accent/10 rounded-2xl py-8 px-6 border border-brand-accent/20 animate-pulse` berisi balok tinggi angka dan balok keterangan.
    - **3 Kartu Ulasan Shimmer:** Menggunakan grid `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`, masing-masing kartu memiliki kelas `bg-[#FDFBF7] rounded-3xl p-7 border border-brand-accent/15 flex flex-col gap-5 animate-pulse` berisi balok bintang, 3 baris balok kutipan, dan baris atribusi bawah.
  - Saat `isLoading === false`, merender daftar `stats` dan `testimonials` menggunakan markup semantik `<figure>`, `<blockquote>`, dan `<figcaption>` yang telah disahkan pada Issue #14.

---

### 🌐 Fase 4: Page Assembly & Shell (`src/pages/index.astro`)
* **Tujuan:** Mengaktifkan hidrasi malas (*Lazy Viewport Hydration*) pada seksi testimoni.
* **Langkah Konkret:**
  - Memperbarui baris 26 di `src/pages/index.astro` dari `<Testimonials />` menjadi `<Testimonials client:visible />`.

---

### 🧪 Fase 5: Quality Gate & Verification (Automated Test Suite)
* **Tujuan:** Memastikan seluruh skenario unit service, fallback offline, dan UI Playwright berjalan 100% hijau.
* **Langkah Konkret:**
  - Memperbarui `tests/test-api-services.mjs` dengan menambahkan pengujian khusus untuk `testimonialService.js`:
    1. Validasi ketersediaan fungsi `getTestimonialsData`, `normalizeStatistic`, `normalizeTestimonial`, dan `normalizeTestimonialsPayload`.
    2. Validasi pemetaan field `description` (backend) menjadi `label` (frontend).
    3. Validasi kebijakan *Atomic All-or-Fallback*: memastikan jika `statistics` kosong atau `testimonials` kosong, normalizer menolak paket timpang dan `getTestimonialsData()` mengembalikan fallback utuh (`IMPACT_STATS` & `TESTIMONIALS`).
  - Memastikan `tests/test-testimonials-ui.mjs` menunggu proses hidrasi dan transisi `isLoading` selesai di Playwright sebelum memvalidasi `<figure>`, `<blockquote>`, ketiadaan avatar inisial, dan rasio kontras WCAG AA.
  - Menjalankan verifikasi menyeluruh:
    ```bash
    npm run lint
    node tests/test-api-services.mjs
    npm run build
    node tests/test-testimonials-ui.mjs
    node tests/test-visual-smoke.mjs
    node tests/test-visual-hover.mjs
    ```

---

## 🔒 Invariant & Kriteria Penolakan PR (Hard Rejection Triggers)

- ❌ **PR DITOLAK** jika komponen `Testimonials.jsx` memanggil `fetch` atau `apiGet` secara langsung tanpa melewati `src/services/testimonialService.js`.
- ❌ **PR DITOLAK** jika seksi testimoni mengalami crash atau menampilkan seksi kosong/ompong saat backend dimatikan.
- ❌ **PR DITOLAK** jika tidak menampilkan *Skeleton Loading Shimmer* saat proses pengambilan data berlangsung.
- ❌ **PR DITOLAK** jika merusak struktur semantik `<figure>` dan `<blockquote>` dari Issue #14.
