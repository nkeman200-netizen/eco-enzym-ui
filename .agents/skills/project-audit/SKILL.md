---
name: project-audit
description: >-
  SOP Audit Kode (/audit). Evaluasi kepatuhan arsitektur dan penyerahan handoff PR dengan filosofi kakak tingkat.
forge_version: "1.3.6"
forged_at: "2026-10-25"
updated_at: "2026-10-29"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# SOP AUDIT KODE (`/audit`)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

## 🔎 PROTOKOL AUDIT KODE (`/audit`)
Saat perintah `/audit` dikirim:
1. **Default Behavior & Klasifikasi Domain Otomatis (Smart Blast-Radius Tri-Track Routing):**
   AI **WAJIB** terlebih dahulu memeriksa jenis berkas yang disentuh pada sesi eksekusi terakhir (`git diff --name-only`) dan mengklasifikasikan domain secara cerdas ke dalam 3 Jalur:
   - **Jalur 1: Pure Backend / Headless (Zero UI Footprint):**
     * *Kriteria:* Hanya menyentuh berkas Controller, Service, Repository, Model, Migration, FormRequest, Policy, Seeder, Route API, atau skrip backend.
     * *Kebijakan Pengujian:* AI **DILARANG KERAS** memanggil Playwright atau menuntut visual testing pada tiket ini. Fokus murni pada pencegahan N+1 Query, transaksi atomik database, sanitasi OWASP, otorisasi Policy, dan Feature Test HTTP.
     * *Pelaporan di Bagian 2:* Status Tier 4 ditulis: `Tier 4 (Visual Smoke): [BYPASS - Pure Backend / Non-Visual]`.
   - **Jalur 2: Frontend Refactor / Logic-Only (Zero Visual Delta):**
     * *Kriteria:* Menyentuh berkas di layer frontend (utility function, custom hook, types/interfaces, state store, konfigurasi build, konstanta data, atau refactor logika kalkulasi), TETAPI hasil inspeksi AST/diff membuktikan **tidak ada perubahan tag JSX/HTML, kelas CSS/Tailwind, atau geometri antarmuka pengguna**.
     * *Kebijakan Pengujian:* AI **TIDAK PERLU** memaksakan tangkapan layar Playwright karena tidak terdapat delta visual (pixel identik 100%).
     * *Pelaporan di Bagian 2:* Status Tier 4 ditulis: `Tier 4 (Visual Smoke): [STATIC VERIFIED - Zero Visual Delta]`.
     * *Mandat Panduan Uji Manual Manusia (Human-in-the-Loop Smoke Checklist):* AI **WAJIB** menyajikan checklist langkah verifikasi fungsional konkret agar pengembang/reviewer manusia dapat melakukan uji asap (smoke check) manual di browser:
       ```markdown
       #### 📋 Panduan Verifikasi Manual Pengembang (Logic-Only Smoke Checklist):
       * [ ] Buka rute/halaman target di browser lokal.
       * [ ] Lakukan interaksi uji fungsional (misal: klik aksi, pengiriman data, manipulasi filter).
       * [ ] Periksa DevTools Console ➔ pastikan tidak ada warning re-render liar atau error runtime.
       ```
   - **Jalur 3: Active Visual & Interactive UI (Active Visual Delta):**
     * *Kriteria:* Menyentuh komponen antarmuka pengguna, layout halaman (Astro/React/Vue/Blade), styling Tailwind/CSS, responsive breakpoints (`sm:`, `md:`, `lg:`), modal/drawer, form interaktif, atau animasi visual.
     * *Kebijakan Pengujian:* AI **WAJIB** mengeksekusi standar **Four-Tier Quality Gate** secara lengkap (termasuk Tier 4: Visual Smoke & Runtime Actionability Gate).
     * *Mandat Penjabaran Bukti Visual Fisik (In-Chat Visual Evidence):* DILARANG KERAS hanya melaporkan status teks "Pass 0 errors". AI **WAJIB MENAMPILKAN DAN MENJABARKAN BUKTI TANGKAPAN LAYAR RIIL** di dalam Bagian 2 laporan audit:
       1. **Tautan / Render Gambar Lokal:** Menyertakan format tautan media yang dapat dirender/diakses langsung di jendela chat (`[Image: nama-tangkapan-layar.png](#media:<path-lengkap>)` atau sintaks media viewer).
       2. **Multi-Viewport Real-World Coverage (Viewport-First, Bukan Element-Isolated):** Minimal menyajikan bukti `page.screenshot({ fullPage: false })` pada:
          - **Desktop Real Inner-Viewport (`1280 × 680` atau `1366 × 680`):** Merepresentasikan tinggi ruang baca bersih laptop nyata setelah dipotong Chrome Tab/Address/Bookmarks Bar (~110px) dan Taskbar, pada State Normal & State Alternatif.
          - **Mobile Real Viewport (`375 × 667`):** Memvalidasi aliran responsif 1-kolom dan ketiadaan horizontal overflow.
          - **Light Mode dan Dark Mode** (jika aplikasi mendukung dual-theme).
       3. **Observasi Geometri & Aksi:** Penjelasan eksplisit 1–2 kalimat mengenai apa yang dibuktikan oleh tangkapan layar tersebut (misal: tombol CTA utuh di dalam fold `680px`, tidak ada tabrakan dengan sticky navbar, rasio grid 12 proporsional, dan ketiadaan phantom overlay).
   - **Jalur Campuran / Fullstack:** Mengombinasikan Jalur 1 untuk layer backend, serta Jalur 2 atau Jalur 3 untuk layer frontend sesuai dengan ada atau tidaknya delta visual.
2. **Aksi Pre-Audit via LSP:** Sebelum melakukan evaluasi, AI **WAJIB** memanggil alat `agent-lsp` (khususnya `get_diagnostics` dan `find_references`) untuk memastikan: (a) Tidak ada method abstrak dari Interface yang terlewat diimplementasikan, (b) Tidak ada *unused imports/variables*, dan (c) Alur parameter antar layer benar-benar valid secara AST.
3. **Standar Four-Tier Quality Gate (Khusus Tiket dengan Komponen UI):**
   - **Tier 1 (Linting & Static AST):** Linter proyek (Oxlint / ESLint / Biome) 0 error dan 0 warning.
   - **Tier 2 (Logic & Unit Tests):** Pengujian unit & integrasi logika (Vitest / Jest) lolos 100%.
   - **Tier 3 (Production Bundler Sanity):** Build produksi (`npm run build` / `vite build` / `astro check`) tuntas dengan Exit Code 0 tanpa broken imports.
   - **Tier 4 (Visual Smoke & Runtime Actionability Gate via Playwright MCP):**
     * **Pilar 1 — Hukum Viewport-First Screenshot (Haram `element.screenshot()` sebagai Bukti Utama):**
       AI **DILARANG KERAS** mengisolasi tangkapan layar hanya pada node DOM tunggal (`await section.screenshot()`) untuk membuktikan kelayakan tata letak, karena membutakan pengujian terhadap terpotongnya elemen oleh tepi bawah layar atau bocornya seksi bawah ke atas. Bukti utama **WAJIB** menggunakan `await page.screenshot({ fullPage: false })` (potret satu jendela browser utuh). `element.screenshot()` hanya boleh dipakai sebagai lampiran sekunder untuk mikro-komponen (ikon/badge).
     * **Pilar 2 — Standar Real-World Laptop Inner-Viewport (`1280 × 680`) & Above-the-Fold Math:**
       Pengujian desktop wajib menggunakan ukuran ruang baca bersih laptop nyata (`width: 1280, height: 680` atau `1366 × 680`, BUKAN `800px/900px` yang mengabaikan tinggi Address/Bookmarks Bar browser). Untuk seksi pembuka (*Hero*), skrip tes wajib memvalidasi secara matematis bahwa elemen aksi utama (*CTA Button*) tidak terpotong tepi bawah layar (`ctaBox.bottom <= window.innerHeight`) dan proporsi seksi mengisi *first fold* secara harmonis.
     * **Pilar 3 — Zero Test-Tampering Law (Haram Manipulasi CSS/DOM di Dalam Skrip Tes):**
       AI **DILARANG KERAS** menyuntikkan manipulasi DOM/CSS produksi di dalam skrip pengujian (seperti `header.style.position = 'static'`, `display = 'none'`, atau mengubah `padding/overflow` via `page.evaluate()`) demi mempercantik tangkapan layar. Tes wajib memotret kondisi 100% murni sebagaimana dilihat manusia di browser.
     * **Pilar 4 — Real Anchor-Click & Sticky Header Collision Gate:**
       Jika halaman memiliki *Sticky/Fixed Navbar*, skrip tes **WAJIB** menyimulasikan klik nyata pada tautan navigasi (`await page.click('header a[href^="#"]')`) dan memverifikasi secara matematis bahwa judul/konten atas seksi target tidak tertelan di balik *Sticky Navbar* (`sectionBox.top >= headerBox.bottom` atau memiliki *scroll-margin / padding* yang presisi).
     * **Deteksi Intercept, Rasio Aspek & Dual-Theme Bleed:** Uji interaksi klik riil pada tombol/input (memastikan tidak terhalang *phantom backdrop* `fixed inset-0`), validasi kontainer gambar adaptif *Hug-Content*, serta verifikasi Light Mode dan Dark Mode.
     * **🛡️ Protokol Graceful Degradation (Laptop Fresh Clone / Low-End Safe):**
       Jika lingkungan lokal belum menginstal Playwright MCP atau belum mengunduh browser Chromium (misal developer junior baru melakukan clone di laptop baru):
       - AI **DILARANG KERAS** membatalkan audit atau menandai status `FAIL`.
       - AI otomatis mengalihkan Tier 4 ke **Static Code Inspection (Fallback Audit)**:
         (a) Memvalidasi bahwa komponen overlay/modal menerapkan pola *Conditional Unmount* (`if (!isOpen) return null;` atau `pointer-events-none` saat state tertutup).
         (b) Memvalidasi bahwa kontainer gambar menggunakan pola adaptif *Hug-Content*.
       - AI **WAJIB MENYEBUTKAN PERINTAH LENGKAP & VALID** (bukan perintah tunggal yang memicu warning dependency):
         `npm install -D @playwright/test && npx playwright install chromium`
         *(Jelaskan alasannya: pasang driver ke devDependencies proyek terlebih dahulu agar npx tidak melempar peringatan dependensi hilang, lalu unduh biner peramban Chromium).*
4. **Poin Evaluasi Kritis:**
   1. **Dimensi 1: Sistem & Separasi Tanggung Jawab (FE vs BE):** Memastikan repositori ini murni menyajikan antarmuka pengguna tanpa penyelundupan logika bisnis server, sistem keranjang, atau database lokal.
   2. **Dimensi 2: Kebersihan Struktur & Larangan Pustaka (.agentrules):** Memastikan ketiadaan library terlarang (`react-router-dom`, `framer-motion`), isolasi data mentah di `src/constants/data.js`, ketiadaan magic strings, dan zero dead-code / unused imports.
   3. **Dimensi 3: Keamanan & Integritas Klien:** Memastikan zero-client secret di bundle produksi, URL WhatsApp tersanitasi aman, dan link eksternal dilengkapi `rel="noopener noreferrer"`.
   4. **Dimensi 4: Performa Runtime & Core Web Vitals:** Memastikan `npm run lint` (`oxlint`) 0 error/0 warning, `npm run build` berhasil tanpa warning, rasio aspek gambar terkunci (CLS 0.00), font lokal self-hosted, dan resiliensi pembersihan event listener modal/carousel.
   5. **Dimensi 5: UX & Aksesibilitas (WCAG AA):** Memastikan tata letak responsif *Mobile Peek Effect* (`w-[78vw]`), target sentuh minimal 48px, rasio kontras teks lolos WCAG AA, dan dukungan tombol navigasi keyboard (Escape/Tab).
5. **FORMAT OUTPUT WAJIB (`/audit`) - 3 BAGIAN MUTLAK:**
   DILARANG menutup respons audit dengan salam santai atau kalimat umum seperti "silakan buat PR dan kabari tech lead". AI WAJIB menyajikan 3 bagian terstruktur berikut:
   - **Bagian 1: 📋 Tabel Audit Berkas:** Tabel komparasi seluruh berkas yang disentuh, status evaluasi (PASS/WARN/FAIL), dan catatan teknis spesifik.
   - **Bagian 2: 🛡️ Evaluasi Dimensi Arsitektur & Four-Tier Gate Status:**
     Ringkasan status kelayakan setiap poin kritis di atas, diikuti status Four-Tier Quality Gate yang disesuaikan dengan Tri-Track Routing:
     * *Tier 1 (Linting):* PASS/FAIL (Laporan 0 error/0 warning).
     * *Tier 2 (Logic Tests):* PASS/FAIL (Hasil unit/feature test).
     * *Tier 3 (Production Bundler):* PASS/FAIL (Exit code build produksi).
     * *Tier 4 (Visual Smoke & Actionability):*
       - Jika **Jalur 1 (Pure Backend):** `[BYPASS - Pure Backend / Non-Visual]` *(Catatan: Tiket murni layer data/API tanpa antarmuka).*
       - Jika **Jalur 2 (Frontend Logic-Only):** `[STATIC VERIFIED - Zero Visual Delta]` disertai **📋 Panduan Verifikasi Manual Pengembang (Human-in-the-Loop Smoke Checklist)**.
       - Jika **Jalur 3 (Active Visual UI):** `[PASS]` disertai **🖼️ Galeri Bukti Visual & Observasi Runtime (Visual Smoke Evidence)** yang memuat tautan gambar lokal, tangkapan layar multi-viewport (Desktop, Mobile, Light/Dark mode), serta analisis ketiadaan layout shift / phantom overlay.
       - Jika **Fallback Terjadi:** `[FALLBACK - Static Inspection]` dengan ringkasan inspeksi conditional unmount dan adaptive bounds.
   - **Bagian 3: 📬 Action Hook & Paket Penyerahan Tiket (Handoff Package):**
     * *Sinkronisasi Dokumen Roadmap (Roadmap Alignment Gate):* AI **WAJIB** secara otomatis memperbarui file `DEVELOPMENT_ROADMAP.md` di root proyek dengan mencentang item checklist (`- [x]`) yang berhasil diselesaikan oleh tiket ini. Dokumen roadmap adalah *North Star* proyek yang wajib selalu mencerminkan progres nyata di lapangan sebelum penyerahan PR.
     * *Langkah Git & Push:* Perintah terminal siap salin yang mencakup keseluruhan alur Git (`git add .`, `git commit -m "..."` sesuai standar Conventional Commits, lalu `git push -u origin <branch>`).
     * *Draf Pull Request Siap Salin:* Judul PR & Deskripsi PR lengkap (mengintegrasikan ringkasan fitur, trade-off, dan checklist DoD). AI **WAJIB** mengekstrak nomor issue dari nama branch aktif (`issue-<nomor>`) atau artefak plan dan mencantumkan `Closes #<nomor-issue>` di baris paling atas deskripsi PR untuk menjamin penutupan otomatis tiket di GitHub dan menggerakkan kartu Kanban dari `In Progress` ke `Done` saat PR di-merge. Sertakan juga penetapan label PR resmi: `needs-review` dan label domain/modul terkait. Draf PR ini WAJIB disajikan sepenuhnya di dalam blok kode markdown (` ```markdown `) agar mudah disalin utuh oleh pengguna.
     * *Pelayanan Proaktif & Penawaran MCP GitHub PR:* DILARANG melakukan `git merge` lokal ke `main`. Di akhir sesi, AI **WAJIB** mengambil alih beban kognitif pengguna dengan menawarkan secara elegan:
       > *"Audit telah lulus dengan predikat Enterprise. Apakah Anda ingin saya langsung membuatkan Pull Request resminya menggunakan MCP GitHub (`create_pull_request`) ke branch `main` sekarang (lengkap dengan `Closes #<id>` dan label `needs-review`) agar papan Kanban kampus otomatis bergerak dan Anda bisa langsung bersantai?"*
       Jika developer menyetujui, AI memanggil tool MCP GitHub untuk menerbitkan PR secara nyata dan menyematkan label `needs-review`.
     * *Peringatan & Penawaran Interaktif Visual Smoke Test (Khusus Fallback):* Jika Tier 4 dialihkan ke fallback statis karena browser Playwright belum terpasang, AI **WAJIB MENEKANKANNYA SECARA JELAS DI AKHIR LAPORAN (BAGIAN 3)** dalam blok callout khusus, dan secara eksplisit menawarkan:
       > 💡 **Peringatan Pengujian Visual:** Pengujian Tier 4 Visual Smoke dialihkan ke audit statis karena browser Playwright belum terpasang di perangkat ini.  
       > Untuk mengaktifkannya secara resmi dan bebas error/warning, jalankan:  
       > ```bash
       > npm install -D @playwright/test && npx playwright install chromium
       > ```  
       > **👉 Apakah kamu sudah install Playwright dan mau test visual sekarang?**  
       > *(Jika sudah, balas 'ya jalankan test visual' dan saya akan langsung menguji interaktivitas serta mengambil tangkapan layar Light & Dark mode).*
     * *Template Notifikasi Tim:* Jika pengerjaan melibatkan perubahan API/kontrak data, teks pesan WAJIB memuat peringatan kepada tim lain yang terdampak. (Sajikan dalam blok ` ```text `).
       Halo rekan tim Backend (@backend-dev),
Izin menginfokan pembaruan kontrak data dari sisi Frontend untuk fitur [Nama Fitur]:
1. Payload Tambahan: Sub-objek JSON `specs` (netto, packaging, shape, suitability, stock, certification, ingredients, usage) dan array `images`.
2. Endpoint Terkait: `GET /api/v1/products` pada `eco-enzyme-be`.
3. Penyesuaian Disarankan: Mohon sediakan kolom JSON `specs` pada tabel `products` dan dukung upload multi-foto `product_detail_images`.
Catatan: Frontend saat ini telah dilengkapi arsitektur *Graceful Offline Fallback* ke `src/constants/data.js` sehingga UI tetap stabil dan tidak mengalami runtime crash selama penyesuaian backend berlangsung.
Terima kasih!
     * *Action Hook (Pertanyaan Pancingan Aksi Selanjutnya):* AI wajib memancing aksi berikutnya dengan menanyakan apakah developer ingin lanjut mengambil tiket berikutnya atau ada bagian teknis yang ingin didalami.

## 🎓 PEDAGOGI & BIMBINGAN MENTOR ARSITEK (`/audit`)
- **Filosofi Kakak Tingkat (Anti-Dosen Penguji):** AI **DILARANG KERAS** menggunakan nada menyalahkan, menghakimi, atau mengintimidasi seperti dosen penguji sidang saat menemukan temuan audit (`WARN` atau `FAIL`). AI bertindak sebagai Lead Architect yang membimbing:
  1. Apresiasi keberhasilan fungsional yang sudah dicapai developer.
  2. Jelaskan risiko temuan dengan analogi santai (misal: kebocoran memori diibaratkan keran air yang tidak tertutup rapat).
  3. Berikan opsi solusi perbaikan konkret dengan jaring pengaman: *"Temuan ini wajar banget muncul di fase awal. Mau aku bantu rapikan bagian ini, atau mau kamu coba perbaiki sendiri dulu?"*
