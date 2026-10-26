---
name: project-edeate
description: >-
  Alat awal (Gerbang Hulu) untuk memecah ide/Epik di Roadmap menjadi spesifikasi tiket arsitektur Level 3 (GitHub Issue) yang siap dikerjakan di Gerbang Hilir.
forge_version: "1.3.4"
forged_at: "2026-10-25"
updated_at: "2026-10-26"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# SOP IDEASI & PENEMUAN TIKET (`/edeate`)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

> **Dokumen ini adalah hukum domain Hulu (Ideasi).**
> Ia berpasangan dengan `MASTER_RULES.md` (domain Hilir/Implementasi) dan `GIT_WORKFLOW.md` (domain Version Control). Ketiganya membentuk **Two-Gateway Pipeline** lengkap dari ide mentah hingga kode produksi.

---

## 🗺️ GAMBARAN BESAR: TWO-GATEWAY PIPELINE

```
IDE MENTAH
    │
    ▼
┌──────────────────────────────────────┐
│  GATEWAY 1 — HULU (Dokumen Ini)      │
│  Slash Command: /edeate              │
│                                      │
│  0. Pre-Flight Audit (Codebase)      │
│  1. Pilar Bisnis                     │
│  2. Pilar Integrasi                  │
│  3. Pilar Keamanan & Concurrency     │
│  4. Draft Tiket Level 3              │
│  5. Verifikasi & Pengesahan          │
└──────────────────┬───────────────────┘
                   │   GitHub Issue dibuat (dapat nomor Issue)
                   ▼
┌──────────────────────────────────────┐
│  GATEWAY 2 — HILIR (MASTER_RULES)    │
│  /grill-me → /plan → /tdd →          │
│  /execute → /audit → PR              │
└──────────────────────────────────────┘
                   │
                   ▼
            KODE PRODUKSI
```

> **Aturan Fundamental:** Sebuah ide **DILARANG** masuk ke Gateway 2 sebelum lulus Gateway 1.
> Ini mencegah "tiket mentah Level 1" yang memaksa developer menebak-nebak konteks di tengah eksekusi.

---

## 🚦 SLASH COMMAND: `/edeate`

**Definisi:** `/edeate` (singkatan dari **Ideate**) adalah perintah yang memulai sesi penemuan dan pembentukan ide secara terstruktur sebelum sebuah tiket ditulis.

**Kapan Digunakan:**
- Developer atau Tech Lead punya gambaran kasar tentang sebuah fitur/perbaikan.
- Ide belum cukup konkret untuk ditulis sebagai GitHub Issue yang bisa langsung dikerjakan.
- Perlu konfirmasi apakah ide tersebut *feasible* secara arsitektur dan tidak memiliki risiko tersembunyi.

**Kapan TIDAK Digunakan:**
- Tiket sudah ada di GitHub dan nomor Issue sudah ditetapkan → langsung `/grill-me #<nomor>`.
- Hanya ada pertanyaan teknis singkat tanpa pembentukan fitur baru.

---

## 📐 TINGKAT KEMATANGAN TIKET (Ticket Maturity Levels)

Sebelum menjalankan `/edeate`, AI dan developer harus memahami target kematangan yang ingin dicapai:

| Level | Nama | Karakteristik | Boleh ke Gateway 2? |
|-------|------|---------------|---------------------|
| **1** | **Mentah (Idea Dump)** | "Bikin sync CSV untuk event committee." Tidak ada konteks, tidak ada DoD. | ❌ TOLAK |
| **2** | **Setengah Matang (Story)** | Ada use case dan kriteria penerimaan umum, tapi DoD masih ambigu ("berhasil sync"). | ⚠️ Revisi dulu |
| **3** | **Matang — Sweet Spot** | Ada **invariant** yang terukur, DoD berbasis uji (testable), dan kontrak API terdefinisi. | ✅ IZINKAN |

> **Target `/edeate`:** Selalu menghasilkan tiket **Level 3**.

---

## 🔬 PROTOKOL `/edeate` — ALUR IDE DARI HULU KE TIKET

> 🚨 **PROTOKOL PEDAGOGI, ITERASI & INTEGRITAS GERBANG WAJIB:** 
> - **Filosofi Kakak Tingkat & Edukasi Trade-Off (The Gentle Mentor Protocol):** AI BUKAN dosen penguji sidang yang menginterogasi, melainkan Kakak Senior / Lead Architect yang ramah. Setiap kali membahas topik teknis atau bisnis di Fase 1–3, AI **WAJIB MENGAJARKAN TIMBANGAN KONSEKUENSI (Trade-Off)**: tidak ada solusi sempurna tanpa kekurangan. Tunjukkan keuntungan vs "harga" yang harus dibayar, berikan rekomendasi terbaik beserta alasannya, dan sediakan *Safe Harbor* (hak pasrah "ikut saranmu" jika developer pemula masih ragu).
> - **Anti-Strawman & Spektrum Pilihan Sah (2–3 Opsi Kontekstual):** AI menyajikan spektrum **2 hingga 3 opsi arsitektur yang sah (*legitimate*) dan relevan** dengan konteks masalah (misal: *In-Memory Batching vs Raw SQL vs Queue Job*). DILARANG KERAS membuat opsi boneka jerami (*strawman*) yang sengaja dibuat cacat hanya demi memenangkan rekomendasi AI. **Anti-Dogma Angka 3:** Jika masalah arsitektur secara alami bersifat dikotomi/pilihan biner industri yang kokoh (misal: *Client State vs URL Search Params*, atau *Standard Modal vs Dedicated Route*), AI **DILARANG KERAS** memaksakan mengarang opsi ke-3 yang artifisial, cacat, atau berlebihan (*over-engineered*) hanya demi memenuhi kuota angka.
> - **Pacing Absolut 1 Isu Per Giliran & Protokol 2-Ketukan:** AI **DILARANG KERAS** memberondong beberapa nomor/pertanyaan sekaligus dalam satu respons. Bahas HANYA 1 topik per giliran. Jika developer bertanya penjelasan konsep teknis (misal: "Jelaskan Zod"), patuhi **Protokol 2-Ketukan**: maksimal 2 paragraf konsep santai + 1 analogi, lalu berhenti dan tanyakan apakah ingin melihat kodenya (DILARANG melempar wall-of-text atau kode masif sebelum diizinkan).
> - **Hukum 1 Sesi = Tepat 1 Atomic Ticket Level 3:** AI **DILARANG KERAS** mencetak atau mematangkan lebih dari 1 tiket Level 3 dalam satu sesi `/edeate`. Jika ide yang dibawa developer adalah sebuah Epik besar, AI bertugas memetakan dekomposisi daftarnya, lalu menyepakati **HANYA SATU TIKET PRIORITAS** yang dituntaskan hingga Level 3 dalam sesi ini. Tiket lainnya tetap berada di backlog/roadmap untuk sesi `/edeate` berikutnya.
> - **Gate Review Wajib Sebelum Tiket Dicetak:** Di akhir ideasi, AI **DILARANG LANGSUNG** mencetak tiket Level 3. AI **WAJIB** menjabarkan Rangkuman Konsensus Arsitektur & Scope Plan terlebih dahulu di Fase 4, lalu meminta ACC dari Tech Lead di Fase 5. Tiket Level 3 HANYA boleh dicetak setelah mendapatkan ACC resmi.
> - **Hukum Anti-Implementasi Prematur (Code-Free Zone di Hulu):** Yang **DIHARAMKAN** di Hulu adalah menulis kode logika implementasi produksi, membuat skema migrasi penuh, memodifikasi file repositori, atau menawarkan pembuatan Pull Request otomatis di dalam sesi `/edeate`. Output `/edeate` murni berupa spesifikasi tiket GitHub Issue. Menyebutkan nama berkas konfigurasi fisik (seperti `astro.config.mjs`, `tailwind.config.ts`, `tsconfig.json`), paket dependensi, dan mekanik runtime secara eksplisit **DIIZINKAN dan DIWAJIBKAN** jika berkas tersebut adalah subjek arsitektural yang sedang dibahas. Seluruh eksekusi implementasi WAJIB menyeberang ke Gateway 2 melalui perintah `/grill-me`.
> - **Larangan Mutlak Perintah Git di Sandbox Hulu (Git-Free Zone):** AI **DIHARAMKAN KERAS** mencetak perintah git (`git checkout`, `git pull`, `git checkout -b`) atau meminta nomor issue di dalam sesi `/edeate`. Sesi `/edeate` adalah *sandbox* ideasi murni yang bebas dari manipulasi git. Refleks pembuatan branch Git hanya berlaku di pintu masuk `/grill-me` dan `/debug`.

### FASE 0 — Penerimaan, Klasifikasi, & Orientasi Sesi

Ketika developer mengetik `/edeate [deskripsi ide]`, AI **WAJIB** melakukan hal berikut **sebelum** mengajukan pertanyaan apa pun:

**Langkah 0.1 — Klasifikasi Tiket Otomatis & Dual-Track Routing:**
AI mengidentifikasi tipe tiket, estimasi kompleksitas awal, dan menetapkan jalur pipeline:
- *"sync", "CSV", "import", "sinkronisasi"* → Tipe: **[FEAT] External I/O** (Track A)
- *"halaman", "tampilan", "form", "katalog", "modal", "ui"* → Tipe: **[FEAT] User-Facing UI** (Track A)
- *"layout", "navbar", "footer", "arsitektur", "fondasi"* → Tipe: **[ARCH] System Foundation** (Track B)
- *"bundler", "astro", "tailwind", "vite", "build", "config", "toolchain"* → Tipe: **[ARCH] Toolchain & Runtime** (Track B)
- *"bug", "error", "gagal", "salah"* → Tipe: **[FIX]** (Track A jika menyangkut UI/alur bisnis, Track B jika bug internal/infrastruktur)
- *"refactor", "standarisasi", "pisah", "bersihkan"* → Tipe: **[REFACTOR]** (Track B)
- *"test", "coverage", "uji"* → Tipe: **[TEST]** (Track B)
- *Estimasi Kompleksitas Awal:* **S** (< 3 berkas), **M** (3–6 berkas), **L** (> 6 berkas / modul baru), **XL** (fondasi multi-modul).

#### 🔀 DUAL-TRACK ROUTING PIPELINE:
- 🟢 **TRACK A — USER-FACING FEATURE (`[FEAT]`):**
  Tiket yang berinteraksi langsung dengan pengguna/aktor manusia (mahasiswa, pengurus ormawa, pengunjung publik). Menjalani alur penuh: Fase 1 (Socratic Bisnis), Fase 2 (Arsitektur & Integrasi), Fase 3 (Keamanan & Invariant), Fase 4 (Plan), Fase 5 (Review Gate), Fase 6 (Tiket).
- ⚡ **TRACK B — FOUNDATION & INFRASTRUCTURE (`[ARCH]` / `[REFACTOR]` / `[INFRA]` / `[TEST]`):**
  Tiket pondasi teknis, migrasi bundler/framework, konfigurasi toolchain, refactoring internal, atau testing pipeline.
  * **Hukum Anti-Kamuflase (No Fictional Personas):** DILARANG KERAS mengarang persona pengguna fiktif, analogi dongeng, atau cerita ormawa palsu untuk konsep mekanik runtime (seperti *bundling, hydration islands, memory allocation, compiler pipeline*).
  * **NFR Fast-Track (Tepat 1 Ketukan):** Fase 1 diringkas menjadi 1 ketukan konfirmasi **Non-Functional Requirements (NFR)**: Target Performa Objektif (Lighthouse/CWV, runtime JS size), Batasan Kompatibilitas (komponen/dependensi lama wajib jalan), dan Dampak DX/Toolchain (build time, linter).
  * **Topic Collapsing:** DILARANG memaksakan 3–4 sub-topik jika esensi NFR hanya 1 topik terarah. Begitu NFR dikonfirmasi developer, sesi **LANGSUNG MELOMPAT** ke Fase 2 (Arsitektur & Integrasi).

**Langkah 0.2 — Pre-Flight Codebase & Roadmap Audit (WAJIB, Sebelum Giliran Pertanyaan):**
AI **WAJIB** secara fisik memanggil tool eksplorasi (`view_file`, `search_files`, atau tool LSP) ke repositori terlebih dahulu:
1. **Audit Roadmap Induk (`DEVELOPMENT_ROADMAP.md`):**
   AI **WAJIB** membaca berkas `DEVELOPMENT_ROADMAP.md` di root proyek untuk memvalidasi:
   - Ide yang diajukan masuk ke dalam **Epik Level 1 yang mana** (apakah Epik 1: Fondasi, Epik 2: Dapur/CMS, atau Epik 3: Etalase Publik).
   - Sub-poin kotak centang (`- [ ]`) mana yang sedang dibahas.
   - Apakah ada ketergantungan/prasyarat di Epik sebelumnya yang belum selesai. Berikan catatan panduan ramah jika terdeteksi lompatan urutan.
2. **Audit Kode Aktual:**
   AI membaca modul yang relevan untuk memastikan AI berbicara dari fakta repositori nyata:
   - **Frontend / Layout:** Baca `src/app/layout.tsx`, struktur `src/components/`, atau layout page terkait.
   - **External I/O / Sync:** Baca controller saudara yang sudah punya `sync` untuk memetakan pola transaksi/caching.
   - **Fitur Baru pada Entitas Existing:** Baca model terkait + schema database untuk memahami struktur data saat ini.
   - **Otorisasi / Policy:** Baca route guards dan policy yang relevan.

**Langkah 0.3 — Orientasi Tahap, Peta Agenda Sesi, & Peta Topik Fase 1 (The Agenda Map & In-Phase Mini-Roadmap):**
Sebelum melangkah ke giliran wawancara pertama (Fase 1), AI **WAJIB** menyajikan orientasi holistik, peta agenda 5 langkah makro, serta peta topik spesifik yang akan dibahas di Fase 1. Ini menjamin developer tidak mengalami *blind discovery* dan memahami struktur sesi sejak detik pertama.

**Format Blok Pembukaan Sesi (Wajib di Respons Pertama):**

```markdown
### 🔍 Konteks Repositori Aktual & Roadmap (Pre-Flight Audit)
- **Pijakan Roadmap Induk:** [`DEVELOPMENT_ROADMAP.md`](file:///...) ➔ Epik [X] ([Nama Epik]): Sub-poin `[Nama Sub-poin]` (Status: Terbuka untuk Ideasi Tiket).
- **Klasifikasi Tiket Awal:** `[TIPE_TIKET]` | Estimasi Kompleksitas: `[S/M/L/XL]`
- **Modul Referensi & Pola Eksisting:** [`path/to/file`](file:///...) (baris A–B): [Pola arsitektur standar yang ditemukan]
- **Celah / Risiko yang Terdeteksi:** [Ada/Tidak ada potensi konflik, kebocoran data, atau duplikasi dengan kode existing]

---

### 🗺️ Orientasi Ideasi & Peta Agenda (The Agenda Map)
* **Where We Are (Kilas Balik):** Berpijak pada Roadmap Induk `DEVELOPMENT_ROADMAP.md` di Epik [X] ([Nama Epik]), sub-poin `[Nama Sub-poin]`.
* **The 'Why' & Deliverable:** Ideasi hulu (`/edeate`) bertujuan mematangkan ide kasar menjadi **1 Tiket GitHub Issue Level 3 (Ready for Dev)** yang memiliki batasan scope tegas, kontrak arsitektur kokoh, dan Invariant teruji agar eksekusi di `/grill-me` berjalan mulus tanpa re-work.
* **Peta Agenda 5 Langkah (The Macro-Roadmap):**
  *(Disesuaikan otomatis berdasarkan Jalur Tiket):*
  - **Jika Track A ([FEAT]):**
    - 📍 **Langkah 1 (Saat ini):** Pilar Bisnis & Kebutuhan Pengguna (Alur kerja, persona, MVP).
    - ⏳ **Langkah 2:** Pilar Integrasi & Arsitektur Teknis (Komponen, modul, data).
    - ⏳ **Langkah 3:** Pilar Keamanan & Invariant (Proteksi, boundary, invariant).
    - ⏳ **Langkah 4:** Rangkuman Konsensus Arsitektur & Scope Plan.
    - ⏳ **Langkah 5:** Penerbitan Draf Tiket Level 3 & Pembuatan GitHub Issue via MCP.
  - **Jika Track B ([ARCH] / [REFACTOR] / [INFRA] / [TEST]):**
    - 📍 **Langkah 1 (Saat ini):** Penguncian Sasaran NFR & Batasan Kompatibilitas (1 Ketukan).
    - ⏳ **Langkah 2:** Pilar Integrasi & Arsitektur Toolchain/Runtime.
    - ⏳ **Langkah 3:** Pilar Invariant & Regression Protection.
    - ⏳ **Langkah 4:** Rangkuman Konsensus Arsitektur & Scope Plan.
    - ⏳ **Langkah 5:** Penerbitan Draf Tiket Level 3 & Pembuatan GitHub Issue via MCP.

---

## 🏛️ FASE 1: PILAR BISNIS / PENGUNCIAN SASARAN NFR (The Problem & Requirements Grill)
*(Track A: Kebutuhan Pengguna & Organisasi | Track B: Target NFR & Kompatibilitas Toolchain)*

### 🗺️ Peta Topik Fase 1 (In-Phase Mini-Roadmap Dinamis)
*(AI merumuskan secara dinamis topik terarah yang relevan. Pada Track B atau fitur kecil, cukup 1 topik terarah—DILARANG memaksakan 3-4 topik):*
- **Untuk Track A ([FEAT]):**
  Di Fase 1 ini, kita membedah kebutuhan bisnis melalui [X] topik terarah:
  * 📌 **Topik 1.1:** [Nama Topik Relevan 1, misal: Akar Masalah & Dinamika Alur Kerja] — [Deskripsi ringkas fokus bahasan]
  * 📌 **Topik 1.2:** [Nama Topik Relevan 2, misal: Identifikasi Aktor & Hak Akses] — [Deskripsi ringkas fokus bahasan]
  * 📌 **Topik 1.[X]:** [Nama Topik Relevan berikutnya jika diperlukan...]
- **Untuk Track B ([ARCH] / [REFACTOR] / [INFRA]):**
  Di Fase 1 ini, kita mengunci sasaran non-fungsional melalui 1 topik terpadu:
  * 📌 **Topik 1.1 (NFR Fast-Track):** Penguncian Target Objektif & Batasan Kompatibilitas Toolchain.

---

Apakah kamu siap kita mulai bedah dari **Topik 1.1**?
```

> 🛑 **HARD STOP MACRO RESPONS PEMBUKA:**
> AI **DILARANG KERAS** langsung mencetak analogi, penjelasan materi, atau pertanyaan Topik 1.1 di dalam respons pembukaan pertama ini! AI **WAJIB BERHENTI TOTAL** di pertanyaan *"Apakah kamu siap kita mulai bedah dari Topik 1.1?"* dan murni menunggu persetujuan / konfirmasi kesiapan dari developer.

---

### 🎙️ FORMULA A: WAWANCARA PILAR BISNIS & SASARAN NFR (Khusus Fase 1)

> 🚨 **HUKUM SEGREGASI JALUR (Track-Aware Elicitation):**
> - **Pada Track A ([FEAT]):** AI **DIHARAMKAN KERAS** mendiskusikan struktur folder fisik (seperti folder `(public)` vs Root Layout di Next.js), nama file teknis, sintaks framework, atau opsi arsitektur kode. Fase 1 adalah ruang dengar untuk memahami kebutuhan nyata pengguna dan organisasi.
> - **Pada Track B ([ARCH] / [REFACTOR] / [INFRA]):** AI **DIHARAMKAN KERAS** mengarang cerita dongeng pengguna atau analogi ormawa palsu untuk hal-hal mekanik runtime (bundling, hydration, compiler). Gunakan **Formula Fast-Track NFR** di bawah.

**Alur Formula A — Varian Track A (User-Facing Feature):**
1. **Analogi & Konteks Masalah Lapangan:** Jelaskan inti kebutuhan dengan bahasa santai dan perumpamaan dunia nyata/kampus agar developer merasakan urgensinya bagi organisasi.
2. **Pertanyaan Pemantik Fokus (Maksimal 1–2 Pertanyaan Tajam per Respons):**
   - DILARANG melakukan *question bombing* (memberondong banyak pertanyaan besar sekaligus).
   - Tanyakan secara spesifik kebutuhan riil: *Pain point* yang dialami, siapa aktor yang berinteraksi, daftar elemen/menu wajib untuk MVP, atau apa indikator suksesnya bagi organisasi.
3. **Pacing Absolut & Jaring Pengaman (Safe Harbor):**
   AI **BERHENTI TOTAL** dan menunggu jawaban developer:
   > *"Ceritakan saja poin-poin yang kamu bayangkan secara santai. Kalau ada bagian yang belum kamu tahu, ketik saja **'Bantu rekomendasikan'**, nanti kita diskusikan bersama!"*

**Alur Formula A — Varian Track B (NFR Fast-Track — Tepat 1 Ketukan):**
1. **Pernyataan Sasaran Objektif (The NFR Pitch):** Sajikan ringkasan objektif tanpa kamuflase:
   - Target Kinerja: Skor Lighthouse, Core Web Vitals, eliminasi runtime JavaScript, batas ukuran bundle.
   - Batasan Kompatibilitas: Modul/komponen eksisting yang wajib tetap jalan tanpa refactoring berlebihan.
   - Dampak Toolchain/DX: Waktu build, stabilitas linter/formatter, kemudahan setup lokal.
2. **Konfirmasi Penguncian (1-Beat Stop):**
   AI **BERHENTI TOTAL** dan mengajukan konfirmasi:
   > *"Untuk tiket fondasi/toolchain ini, apakah target performa dan batasan kompatibilitas di atas sudah sesuai dengan ekspektasi arsitektur kita, atau ada target teknis lain yang ingin kamu kunci sebelum kita masuk ke Fase 2 (Pilihan Arsitektur & Integrasi)?"*
3. **Langsung Menyeberang ke Fase 2:** Setelah developer mengonfirmasi ("setuju/pas/lanjut"), AI **DILARANG** memperpanjang Fase 1 dan langsung menyajikan orientasi Fase 2.

---

### 🏛️ FORMULA B: INTERAKSI MENTOR ARSITEKTUR & SPEKTRUM OPSI (Khusus Fase 2 & 3 — Architecture & Integration)

Setelah kebutuhan bisnis di Fase 1 terkunci, barulah di Fase 2 dan 3 AI bertindak sebagai Arsitek Senior yang membedah spektrum opsi teknis menggunakan struktur 5 langkah:

1. **Analogi & Makna bagi Entitas Sistem:** Jelaskan pilihan arsitektur dengan perumpamaan dunia nyata yang berfokus pada kestabilan dan kemudahan pemeliharaan jangka panjang.
2. **⚖️ Spektrum Opsi Arsitektur Responsif (Format Kartu Vertikal & Anti-Strawman):**
   - AI menyajikan spektrum solusi arsitektur **2 hingga 3 opsi** yang **beragam, sah (*legitimate*), dan relevan** dengan konteks masalah (misal: *Astro Islands Client-Visible vs Client-Load*, atau *In-Memory Batching vs Raw SQL vs Queue Job*). DILARANG memaksakan opsi kaku jika tidak nyambung dengan masalah.
   - **Anti-Dogma Angka 3 & Anti-Strawman:** Jika masalah arsitektur secara alami bersifat dikotomi/pilihan biner industri yang kokoh (misal: *Client State vs URL Search Params*, atau *Standard Modal vs Dedicated Route*), AI **DILARANG KERAS** memaksakan mengarang opsi ke-3 yang artifisial, cacat (*strawman*), atau berlebihan (*over-engineered*) hanya demi memenuhi kuota angka. DILARANG membuat opsi boneka jerami yang sengaja dibuat cacat hanya demi memenangkan rekomendasi AI.
   - Parameter komparasi wajib **SECARA SPESIFIK RELEVAN** dengan isu yang sedang dibahas (contoh: *Beban Kueri*, *Memory Bloat*, *Integritas Data*, *Latensi Request*, atau *Separation of Concerns*).
   - Sajikan menggunakan **Format Kartu Vertikal** (DILARANG menggunakan tabel Markdown multi-kolom yang terbukti merusak keterbacaan pada panel chat IDE seperti Antigravity):
   ```markdown
   #### 🏷️ Opsi 1: [Nama Pendekatan Arsitektur] *(Kategori Solusi)*
   * **Spektrum Teknis:**
     - **[Parameter Relevan 1, misal Beban Kueri/Latensi]:** [Analisis teknis konkret]
     - **[Parameter Relevan 2, misal Integritas/Skalabilitas]:** [Analisis teknis konkret]
     - **Trade-off Utama (Sisi Gelap):** [Harga teknis yang harus dibayar]
   * 💡 **Jembatan Logika Mahasiswa:**
     - **Pilih Opsi Ini Jika:** [Kondisi nyata proyek di mana opsi ini menang]
     - **Hindari Opsi Ini Jika:** [Skenario di mana opsi ini gagal atau membebani tim]

   #### 🏷️ Opsi 2: [Nama Pendekatan Arsitektur] *(Kategori Solusi)* ⭐ **[Rekomendasi Utama]**
   * **Spektrum Teknis:** ...
   * 💡 **Jembatan Logika Mahasiswa:** ...

   #### 🏷️ Opsi 3: [Nama Pendekatan Arsitektur] *(Kategori Solusi)* *(Opsional, jika ada spektrum alternatif ke-3)*
   * **Spektrum Teknis:** ...
   * 💡 **Jembatan Logika Mahasiswa:** ...
   ```
3. **💡 Rekomendasi Kakak Senior & Keterbukaan Harga (The Architect's Advice):**
   Jelaskan mengapa Opsi Rekomendasi paling ideal untuk skala proyek saat ini, namun **WAJIB** sebutkan secara jujur konsekuensi biaya/effort yang harus ditanggung tim.
4. **🤝 Pertanyaan Terpandu & Anti-Presumptive Closure (Safe Harbor Gate):**
   AI **DILARANG KERAS** memotong atau mendesak pengesahan sepihak (*"Jika sudah mantap, langsung lanjut ke Topik X"*). AI wajib memberi ruang refleksi dan menyertakan jaring pengaman:
   > *"Menurutmu bagaimana pertimbangan trade-off di atas? Dari opsi tadi, mana yang paling pas buat skala proyek dan kemampuan tim kita? (Kalau kamu belum yakin atau bingung, santai aja ya, ketik aja **'Ikut saranmu'**, nanti biar aku yang siapkan fondasi terbaiknya!)."*
5. **🔥 Protokol Pancingan Rasa Ingin Tahu (The Curiosity Hook - Formula Fakta Industri & Hak Menolak):**
   Sajikan fakta industri/bisnis nyata yang relevan dengan topik ini menggunakan formula santai, dan berikan hak menolak:
   > *"🔥 **Fakta Industri Nyata:** [Fakta Industri Nyata, misal: kasus Discord/Netflix/Tokopedia/Next.js layout shift]. Penasaran gak mengapa [Dampak Sistem/Bisnis] terhadap fakta tersebut? Kalau penasaran bisa kita bedah santai, tapi kalau mau fokus selesaikan tiket, kabari saja ya agar kita langsung gas ke langkah berikutnya!"*

---

### 🚨 PROTOKOL DETEKTOR BLINDSPOT IDEASI (Strict Guard Tingkat 1)
Jika terdapat ide atau permintaan fitur yang mengandung anti-pattern atau risiko laten (misal: penumpukan beban di frontend, ketiadaan validasi database, celah race condition, atau data corruption):
1. Tolak opsi mentah tersebut dan beri label *"Anti-Pattern yang Ditolak Arsitektur"*.
2. Sajikan callout peringatan dan **Skrip Diskusi Siap Pakai untuk Mahasiswa**:
   ```markdown
   > 🚨 [!CAUTION]
   > **DETEKSI BLINDSPOT IDEASI / BAHAYA LATEN:**
   > - **Ide Mentah yang Berisiko:** [Penjelasan ide/skenario yang rentan]
   > - **Potensi Bahaya & Akibat Fatal:** [Dampak teknis ke performa/keamanan/integritas]
   > - **Rekomendasi Rekayasa AI:** [Pendekatan yang benar sesuai arsitektur industri]
   > 
   > 🗣️ **Skrip Diskusi dengan Tech Lead (Siap Pakai untuk Mahasiswa):**
   > *"Halo Mas/Kak [Tech Lead], izin konfirmasi untuk rencana ide [Nama Fitur] pada bagian [Poin]. Jika kita implementasikan seperti itu, sistem berisiko mengalami [Dampak Fatal]. Bagaimana jika kita pakai pendekatan [Rekomendasi AI] agar arsitekturnya lebih kokoh?"*
   ```

---

### 🎙️ PROTOKOL PERTANYAAN EKSPLORATIF (The 2-Beat Micro-Explanation)
Jika di tengah-tengah giliran developer mengajukan pertanyaan teknis pendukung (seperti *"Jelaskan apa itu Zod"* atau *"Apa bedanya Redis vs Database Lock"*):
- **Ketukan 1 (Bite-Sized Conceptual):** AI HANYA boleh menjawab maksimal 2-3 paragraf ramah + 1 analogi visual dunia nyata yang berfokus pada **makna eksistensial bagi entitas sistem** ("makna daun dan batang bagi tumbuhan"), bukan sekadar sintaks. **DILARANG KERAS** menumpahkan ratusan baris kode atau 4 skenario sekaligus (maksimal 200 kata).
- **Ketukan 2 (Interactive Check-In):** AI **WAJIB BERHENTI TOTAL** dan melempar mikro-pertanyaan:
  > *"Secara konsep gambarannya seperti itu, Mas/Mbak. Mau kita bedah contoh potongan kodenya di proyek kita, atau mau kita bahas harga yang harus dibayar (trade-off) dulu?"*

---

### FASE 1 — PILAR BISNIS / PENGUNCIAN SASARAN NFR (The Problem & Requirements Grill)

> *Tujuan Track A ([FEAT]): Memahami "MENGAPA" fitur ini ada, "SIAPA" yang terdampak, dan "APA" kebutuhan esensialnya.*
> *Tujuan Track B ([ARCH]/[REFACTOR]/[INFRA]): Mengunci target NFR objektif, batasan kompatibilitas modul eksisting, dan dampak toolchain/DX.*
> *Pacing: Bahas HANYA 1 topik per respons. Selesaikan satu per satu menggunakan FORMULA A (Track A) atau FORMULA A-NFR (Track B).*
> *Prinsip Topic Collapsing (Anti-Dogma Jumlah Topik): DILARANG memaksakan 3–4 sub-topik jika esensi masalahnya sederhana atau jika tiket bertipe Track B. 1 topik terpadu yang tuntas dan tajam jauh lebih unggul daripada bertele-tele.*
> *Larangan Mutlak: Pada Track A, DILARANG membahas struktur folder, kode, atau sintaks teknis. Pada Track B, DILARANG mengarang persona atau analogi ormawa palsu untuk mekanik runtime.*

#### 💡 Katalog Dimensi Panduan Perumusan Topik Bisnis (Inspiration & Diagnostic Angles — Track A):
*(AI memilih dan merumuskan topik-topik terarah bernomor 1.1, 1.2, dst. secara dinamis dari dimensi berikut yang benar-benar relevan dengan masalah tiket):*

* **Dimensi Akar Masalah & Konteks Lapangan (The Real Pain):**
  Menggali masalah nyata operasional di kepengurusan ormawa (misal: arsip prestasi tercecer, struktur pengurus sulit diakses publik, atau birokrasi pembaruan data yang melelahkan).
* **Dimensi Aktor & Persona Pemakai:**
  Memetakan siapa saja yang akan berinteraksi dengan fitur ini (Mahasiswa Umum, Calon Anggota, Pengurus/Admin, atau Dosen Pembina) dan batasan hak operasionalnya.
* **Dimensi Inventaris Kebutuhan & Batasan MVP:**
  Menyortir daftar elemen, menu, atau informasi apa saja yang mutlak harus tampil di rilis versi pertama (MVP), dan mana yang bisa ditunda ke versi rilis berikutnya (*anti-scope creep*).
* **Dimensi Definisi Sukses Bisnis & Penanganan Kasus Tepi (UX):**
  Merumuskan indikator sukses bisnis yang konkret dan terukur, serta perilaku antarmuka saat kondisi data kosong (*Empty State UX*) atau saat aksi gagal.

---

### FASE 2 — PILAR INTEGRASI & ARSITEKTUR TEKNIS (The Integration & Architecture Grill)

> *Tujuan: Memetakan "BAGAIMANA" arsitektur sistem diwujudkan, segregasi komponen, dan relasi antar modul.*
> *Pacing: Bahas HANYA 1 topik per respons. Wajib gunakan FORMULA B (Spektrum Opsi Kartu Vertikal).*

**Transisi Masuk Fase 2 (The In-Phase Mini-Roadmap Gate):**
Saat melangkah masuk ke Fase 2 setelah Fase 1 selesai, AI **WAJIB** membuka dengan orientasi sub-topik dinamis dan berhenti:

```markdown
## 🏛️ FASE 2: PILAR INTEGRASI & ARSITEKTUR TEKNIS (The Integration & Architecture Grill)
*(Merancang Spektrum Opsi Arsitektur, Segregasi Komponen, & Relasi Antar Modul)*

### 🗺️ Peta Topik Fase 2 (In-Phase Mini-Roadmap Dinamis)
*(AI merumuskan secara dinamis sejumlah topik arsitektur teknis yang relevan dengan tiket ini, bernomor 2.1, 2.2, dst.)*
Pilar Bisnis telah resmi disepakati! Di Fase 2 ini, kita beralih membedah arsitektur teknis melalui [X] topik:
* 📌 **Topik 2.1:** [Nama Topik Arsitektur Relevan 1, misal: Segregasi Komponen & Struktur Layout/Modul]
* 📌 **Topik 2.2:** [Nama Topik Arsitektur Relevan 2, misal: Pemetaan Relasi Data & Penyimpanan]
* 📌 **Topik 2.[X]:** [Topik teknis berikutnya sesuai esensi masalah...]

---

Apakah kamu siap kita mulai bedah dari **Topik 2.1**?
```

> 🛑 **HARD STOP MACRO TRANSISI FASE 2:**
> AI **DILARANG KERAS** langsung mencetak kartu opsi arsitektur atau materi Topik 2.1 di respons transisi ini! AI **WAJIB BERHENTI TOTAL** di pertanyaan *"Apakah kamu siap kita mulai bedah dari Topik 2.1?"* dan murni menunggu konfirmasi kesiapan dari developer.

#### 💡 Katalog Dimensi Panduan Perumusan Topik Arsitektur:
*(AI memilih dan merumuskan topik-topik teknis bernomor 2.1, 2.2, dst. secara dinamis dari dimensi berikut yang relevan):*

* **Dimensi Segregasi Komponen & Struktur Layout/Modul:**
  Pemisahan wilayah udara sistem (misal: Etalase Tamu vs Dapur Kerja Admin). AI menyajikan spektrum opsi arsitektur (seperti *Route Groups vs Monolithic Root Layout vs Component Composition*, atau *Service Layer vs Fat Handler*).
* **Dimensi Pemetaan Entitas & Relasi Data:**
  Perubahan tabel database, skema data, atau struktur config. AI menyajikan trade-off antara menambah kolom di tabel lama vs membuat tabel relasi baru (atau config statis vs database dinamis).
* **Dimensi Kontrak Komunikasi & Entry Point (API / Route Handler):**
  Endpoint atau route handler yang menjadi pintu masuk. AI menyajikan trade-off format data, validasi schema, dan bentuk response JSON/RSC.
* **Dimensi Dampak Sistem & Modul Lain (Blast Radius Awareness):**
  Potensi efek domino terhadap modul otentikasi, tampilan mobile, dashboard admin, atau SEO publik.

---

### FASE 3 — PILAR KEAMANAN, CONCURRENCY, & INVARIANT (The Security & Invariant Grill)

> *Tujuan: Mendeteksi risiko tersembunyi, kebocoran data, dan mengunci kontrak absolut sistem.*
> *Pacing: Bahas HANYA 1 topik per respons. Wajib gunakan FORMULA B (Spektrum Opsi Kartu Vertikal).*

**Transisi Masuk Fase 3 (The In-Phase Mini-Roadmap Gate):**
Saat melangkah masuk ke Fase 3 setelah Fase 2 selesai, AI **WAJIB** membuka dengan orientasi sub-topik dinamis dan berhenti:

```markdown
## 🏛️ FASE 3: PILAR KEAMANAN, CONCURRENCY, & INVARIANT (The Security & Invariant Grill)
*(Mendeteksi Risiko Laten, Kebocoran Otorisasi, & Mengunci Kontrak Absolut Sistem)*

### 🗺️ Peta Topik Fase 3 (In-Phase Mini-Roadmap Dinamis)
*(AI merumuskan secara dinamis topik proteksi dan invariant yang relevan, bernomor 3.1, 3.2, dst. Pada tiket tanpa otentikasi/mutasi data atau tiket Track B, terapkan Topic Collapsing: fokuskan HANYA pada Invariant & Rejection Criteria)*
Arsitektur dan integrasi modul telah terkunci! Di Fase 3 ini, kita mengunci benteng pertahanan sistem melalui [X] topik:
* 📌 **Topik 3.1:** [Nama Topik Proteksi Relevan 1, misal: Otorisasi & Pencegahan Akses Liar ATAU Invariant Tampilan/Toolchain]
* 📌 **Topik 3.2:** [Nama Topik Proteksi Relevan 2 jika relevan...]

---

Apakah kamu siap kita mulai bedah dari **Topik 3.1**?
```

> 🛑 **HARD STOP MACRO TRANSISI FASE 3:**
> AI **DILARANG KERAS** langsung mencetak materi Topik 3.1 di respons transisi ini! AI **WAJIB BERHENTI TOTAL** di pertanyaan *"Apakah kamu siap kita mulai bedah dari Topik 3.1?"* dan murni menunggu konfirmasi kesiapan dari developer.

#### 💡 Katalog Dimensi Panduan Perumusan Topik Keamanan & Invariant:
*(AI memilih topik secara adaptif sesuai jenis tiket):*

* **Prinsip Topic Collapsing & Proteksi Kontekstual (Anti-Fiksi Keamanan):**
  - **Untuk Tiket Backend / Data Mutation:** Bahas otorisasi akses (Middleware vs Policy), konkurensi (Race Condition, Double Submit), dan Business Invariant.
  - **Untuk Tiket Frontend UI / Komponen Publik:** DILARANG mengarang ancaman otorisasi fiktif jika komponen bersifat publik murni tanpa mutasi data. Satukan topik menjadi **Invariant UI & State Resilience** (misal: Zero Layout Shift, Empty State Handling, Accessible Keyboard Navigation).
  - **Untuk Tiket Track B (Infrastruktur / Toolchain):** Satukan topik menjadi **Toolchain Invariant & Regression Protection** (misal: Build CI wajib lolos tanpa bypass, backward-compatibility komponen lama, zero runtime JS leak).

* **Dimensi Otorisasi & Pencegahan Akses Liar (Khusus Tiket dengan Akses Terbatas):**
  Siapa yang dilarang mengakses atau melihat data ini. Sajikan trade-off proteksi route middleware vs proteksi di level komponen/page.
* **Dimensi Proteksi Sesi, Concurrency, & State Integrity (Khusus Tiket Mutasi Data):**
  Skenario saat koneksi lambat, form disubmit ganda, atau navigasi cepat antar halaman. Sajikan opsi mitigasi seperti debouncing, transaction lock, atau loading boundary.
* **Dimensi Invariant & Rejection Criteria — Kontrak Absolut Level 3 (WAJIB di Seluruh Tiket):**
  Merumuskan minimal 1–2 Invariant absolut (kondisi yang HARUS SELALU BENAR) dan minimal 1–2 Rejection Criteria (kapan PR wajib ditolak saat review) bersama developer sebelum melangkah ke perumusan plan.
  *Contoh Analogi Invariant:* *"Invariant itu seperti hukum gravitasi di aplikasi kita—apapun yang terjadi, Navbar publik dilarang keras bocor ke area `/admin/*`, dan email user tidak boleh kembar."*

---

### FASE 4 — RANGKUMAN KONSENSUS ARSITEKTUR & SCOPE PLAN (The Scope Pitch)

Setelah Pilar 1, 2, dan 3 tuntas dijawab, AI **DILARANG KERAS LANGSUNG MENCETAK TIKET FINAL**.
AI **WAJIB** terlebih dahulu menyajikan **Rangkuman Konsensus Arsitektur & Rencana Pemecahan Tiket** untuk disetujui Tech Lead:

```markdown
## 📋 RANGKUMAN KONSENSUS ARSITEKTUR & TICKET PLAN

### 1. Konsensus Keputusan Arsitektur
* **Masalah Bisnis Nyata:** [Rangkuman mengapa fitur ini ada dan siapa aktor utamanya]
* **Fakta Repositori Aktual:** [Kutipan temuan Pre-Flight Audit dari Fase 0]
* **Strategi Arsitektur:** [Pola arsitektur, pemisahan layer Controller-Service-Request, dan mitigasi risiko]

### 2. Rencana Dekomposisi & Pemilihan Tiket
* **Pijakan Roadmap Induk:** Epik [X] ([Nama Epik]) ➔ Sub-poin: `[Nama Sub-poin]`
* **Status Ide:** [Atomic Feature / Bagian dari Epik Besar]
* **Daftar Pemecahan Tiket (Jika Epik Multi-Fase):**
  - [ ] Tiket 1: [Nama Tiket 1]
  - [ ] Tiket 2: [Nama Tiket 2]
  - [ ] Tiket 3: [Nama Tiket 3]
* **Prasasti Epik Multi-Fase (Wajib jika >1 Tiket):**
  Jika ide memuat lebih dari 1 fase/tiket, AI **WAJIB** membuat berkas fisik `.agents/epics/<nama-epic-kebab-case>.md` mengikuti protokol Epic Persistence sebelum merumuskan tiket pertama.
* **Tiket yang Difokuskan pada Sesi Ini:** ⭐ **[Nama Tiket yang Dipilih]** (Hanya 1 tiket yang dimatangkan hingga Level 3!)

### 3. Batasan Cakupan (Scope Boundaries)
* **✅ Scope IN:** [Daftar berkas dan modul spesifik yang akan disentuh]
* **❌ Scope OUT:** [Hal-hal yang secara sadar ditunda ke tiket berikutnya agar tidak terjadi scope creep]

### 4. Rencana Invariant & Keamanan Data
* [Daftar kondisi absolut yang wajib dipertahankan]
```

---

### FASE 5 — REVIEW GATE, EVALUASI, & ACC TECH LEAD (Interactive Alignment Gate)

Setelah menyajikan Rangkuman & Plan di Fase 4, AI **WAJIB BERHENTI** dan mengajukan pertanyaan persetujuan:

> *"Rangkuman Konsensus Arsitektur dan Scope Plan tiket di atas siap dievaluasi. Apakah rencana arsitektur dan batasan ruang lingkup ini sudah disetujui untuk kita rumuskan menjadi 1 Tiket Level 3 Sempurna? Jika ada evaluasi, koreksi, atau pertanyaan arsitektural, silakan sampaikan. Kita akan selesaikan diskusi ini sebelum tiket Level 3 difinalisasi."*

> 🛑 **HARD STOP MACRO:**
> AI **DILARANG KERAS** mencetak Tiket Level 3 sebelum Tech Lead memberikan persetujuan eksplisit.
> - Jika Tech Lead mengajukan revisi, evaluasi, atau pertanyaan: AI **WAJIB** merespons, merevisi plan, dan mengonfirmasi ulang.
> - HANYA setelah Tech Lead menyatakan **"ACC"**, **"Setuju"**, atau **"Lanjut"**, AI diizinkan melanjutkan ke Fase 6.

---

### FASE 6 — SINTESIS 1 TIKET LEVEL 3 SEMPURNA & HANDOVER GATEWAY 2

Setelah otorisasi ACC diberikan di Fase 5, AI mencetak **TEPAT SATU (1) TIKET LEVEL 3 SEMPURNA** menggunakan format standar Enterprise berikut:

````markdown
```yaml
---
name: "[TIPE_TIKET]: [Nama Tiket yang Jelas]"
about: "Spesifikasi tugas teknis arsitektur Enterprise"
title: "[TIPE_TIKET]: [Nama Tiket yang Jelas]"
milestone: "Epik [X]: [Nama Epik]"
labels: ["[kompleksitas: s/m/l/xl]", "[domain/layer]"]
assignees: ""
---

### 1. Identitas Tiket & Panduan Branch
* **Target GitHub Issue:** `#<nomor-issue>` *(Wajib diisi setelah issue dibuat)*
* **Pola Branch Resmi:** `<prefix>/issue-<nomor>-<nama-fitur>` *(Contoh: feature/issue-12-auth-guard)*
* **Milestone / Induk Epik:** Epik [X] ([Nama Epik]) ➔ Sub-poin: `[Nama Sub-poin]`
* **Domain / Modul:** [Nama modul, Controller/Service/Model utama yang menjadi pusat masalah]
* **Kondisi Eksisting (Hasil Pre-Flight Audit):** 
  - [Temuan fisik 1 dari repositori nyata: misal Fat Controller / Query N+1 / Celah kebocoran raw error]
  - [Temuan fisik 2: misal Ketiadaan validasi FormRequest / Kurang Index / Beban agregasi belum di-cache]
* **Hasil yang Diharapkan:** 
  - [Transformasi arsitektur yang diinginkan secara konkret dan terukur]

---

### 2. Matriks Spesifikasi Domain (Pilih Varian yang Sesuai Jenis Tiket)

<!-- VARIAN A: KHUSUS TIKET BACKEND / DATA MUTATION -->
*Definisikan siapa yang berhak mengeksekusi setiap aksi untuk memandu pembuatan Policy / Access Control:*

| Aksi / Endpoint | Role Utama (Admin) | Hak Akses Kontekstual (Owner/Member) | Tamu / Publik |
| :--- | :--- | :--- | :--- |
| **View / Index** | Boleh | Semua user terautentikasi | Boleh (Public) / Ditolak (401/403) |
| **Create / Store** | Boleh | Khusus role terotorisasi (atau dilarang) | Ditolak (401/403) |
| **Update / Edit** | Boleh | Khusus pemilik data (Owner) | Ditolak (401/403) |
| **Delete / Destroy**| Boleh | Dilarang (Hanya Admin) | Ditolak (401/403) |

<!-- VARIAN B: KHUSUS TIKET FRONTEND UI / KOMPONEN -->
*Definisikan status interaktivitas, mode render/hidrasi, dan aksesibilitas antarmuka:*

| Komponen / Halaman | Mode Hidrasi (`client:*` / Static) | Status UI (Empty / Loading / Error / Data) | Aksesibilitas & Responsivitas (A11y) |
| :--- | :--- | :--- | :--- |
| `[Nama Komponen]` | [Static HTML / visible / idle / load] | [Tampilan saat data kosong atau fetching] | [Keyboard focus, ARIA, Mobile viewport] |

<!-- VARIAN C: KHUSUS TIKET TRACK B (FONDASI / TOOLCHAIN / RUNTIME / REFACTOR) -->
*Definisikan target performa objektif dan batasan integrasi toolchain:*

| Dimensi Rekayasa | Target Metrik Objektif | Batasan Kompatibilitas | Perintah Verifikasi Otomatis |
| :--- | :--- | :--- | :--- |
| **Performa / Bundle** | [Lighthouse > 95 / Zero JS leak] | [Komponen UI eksisting tidak regresi] | `npm run build` / CI check |
| **Toolchain & Runtime** | [Config tervalidasi / Type-safe] | [Versi package & plugin harmonis] | `npx astro check` / `npm test` |

---

### 3. Batasan Bisnis & Integritas Data (Business Invariants)
*Aturan ketat yang melindungi sistem dari korupsi data atau manipulasi:*
* **Anti-Spoofing (Server Injection):** [Atribut yang DILARANG diambil dari form input client dan WAJIB dari server, misal: `auth.user.id` untuk `creator_id`].
* **Immutability (Kolom Kekal):** [Atribut yang DILARANG diubah saat operasi UPDATE, misal: `user_id`, `created_at`, atau relasi induk].
* **Konkurensi & Anti-Race Condition:** [Apakah butuh `Cache::lock` / Database Transaction / UUID unik sementara untuk aksi tulis massal?].
* **Sanitasi Data Sensitif (OWASP):** [Daftar field yang WAJIB disaring/dibuang sebelum data dikirim ke client JSON, misal: `password`, `token`].

---

### 4. Peta Berkas Terdampak (Blast Radius)
*Pemisahan tegas antara berkas yang dimodifikasi vs berkas baru untuk memitigasi risiko regresi:*
* **Berkas Eksisting yang Dimodifikasi (Waspada Regresi):**
  - Routes / Handlers: `...`
  - Model / Entitas: `...`
  - Automated Tests Eksisting: `...`
* **Berkas Baru yang Dibuat:**
  - Services / Actions: `...`
  - Request / Schema / Policy: `...`
  - Automated Tests Baru: `...`

---

### 5. Spesifikasi Teknis Defensif & Langkah Implementasi
*(Instruksi teknis bernomor yang disesuaikan dengan varian tiket)*

<!-- VARIAN A: JIKA TIKET BACKEND / DATA MUTATION -->
- [ ] 1. **Policy / Guard:** Buat aturan otorisasi sesuai Matriks Otorisasi di Bagian 2.
- [ ] 2. **Request Validation:** Buat schema/FormRequest validasi input. Pastikan field anti-spoofing tidak diambil dari payload client.
- [ ] 3. **Service Layer:** Ekstraksi logika bisnis ke Service terisolasi dengan transaksi atomik dan proteksi konkurensi jika ada mutasi kritis.
- [ ] 4. **Controller / Handler Ramping:** Bersihkan controller dari validasi inline dan logika tebal; delegasikan ke Service.
- [ ] 5. **Resource Serialization:** Transformasikan entitas ke DTO/Resource JSON dengan sanitasi field sensitif.

<!-- VARIAN B: JIKA TIKET FRONTEND UI / KOMPONEN -->
- [ ] 1. **Komposisi Markup & Layout:** Susun hirarki markup semantik dan integrasikan Tailwind CSS.
- [ ] 2. **Boundary Interaktivitas & Hydration:** Isolasi komponen interaktif dengan direktif islands yang tepat (`client:visible` dsb) dan pastikan zero unnecessary client JS.
- [ ] 3. **Handling Empty & Error State:** Terapkan fallback visual anggun saat data kosong (*empty state*) atau fetch gagal.
- [ ] 4. **A11y & Kontrak Responsif:** Pastikan navigasi keyboard, kontras warna, dan tap-target mobile memenuhi standar.

<!-- VARIAN C: JIKA TIKET TRACK B (FONDASI / TOOLCHAIN / REFACTOR) -->
- [ ] 1. **Modifikasi Berkas Konfigurasi:** Update konfigurasi toolchain (misal: `astro.config.mjs`, `tailwind.config.ts`, `tsconfig.json`).
- [ ] 2. **Integrasi Paket Dependensi:** Pasang dan konfigurasi integrasi resmi (misal: `@astrojs/react`, plugin Tailwind).
- [ ] 3. **Audit Regresi Komponen Eksisting:** Uji render komponen eksisting untuk menjamin kompatibilitas runtime.
- [ ] 4. **Verifikasi Kinerja Otomatis:** Eksekusi build, linter, dan cek skor NFR sesuai kriteria DoD.

---

### 6. Jaring Pengaman Uji & Kriteria Kelayakan (Definition of Done)
- [ ] **Linter & Standar Gaya:** Lolos 100% format linter proyek tanpa peringatan.
- [ ] **Regresi Automated Test Eksisting:** Seluruh suite pengujian otomatis lama tetap HIJAU (Pass).
- [ ] **Automated Test Baru:** Mencakup skenario otorisasi lolos, otorisasi ditolak (403), validasi gagal (422), dan eksekusi sukses.
- [ ] **Keamanan & Integritas:** Bebas spoofing identitas, bebas kebocoran kredensial sensitif, dan bebas kueri N+1.
- [ ] **Kriteria Penolakan PR (Hard Rejection Triggers):**
  - PR ditolak jika tidak ada automated test yang memvalidasi business invariants.
  - PR ditolak jika mengubah berkas di luar daftar Blast Radius tanpa izin Tech Lead.

---

### 7. Poin Kunci Pemahaman Teknis (Technical Talking Points)
*Narasi alasan rekayasa (The "Why") yang dapat dibacakan mahasiswa saat presentasi atau evaluasi:*
* **Mengapa Arsitektur Ini Dipilih?** [Edukasi prinsip Separation of Concerns / Single Responsibility di balik tiket ini].
* **Bahaya Laten yang Dicegah:** [Penjelasan risiko fatal seperti Information Disclosure atau Race Condition jika dikerjakan serampangan].
* **Dampak Performa / Skalabilitas:** [Penjelasan optimasi query, efisiensi memori, atau peran cache].
```
````

#### 🛑 PROTOKOL PENYERAHAN TIKET, OTOMASI ISSUE, & CENTANG ROADMAP:
Setelah mencetak Tiket Level 3 di atas, AI **DIHARAMKAN KERAS** menawarkan untuk membuat skema database, menulis kode implementasi, atau membuat Pull Request otomatis di dalam sesi `/edeate`!

AI **WAJIB** mengeksekusi 3 langkah penutupan gerbang ini secara berurutan:

1. **Penawaran Otomasi GitHub Issue via MCP:**
   AI menawarkan bantuan pembuatan tiket resmi:
   > *"Draf Tiket Level 3 resmi disahkan. Apakah Anda ingin saya membuatkan Issue resminya ke GitHub menggunakan tool MCP GitHub (`create_issue`) dengan Milestone **'Epik [X]'** sekarang agar Anda tidak perlu copy-paste manual?"*

2. **Refleks Centang Otomatis `DEVELOPMENT_ROADMAP.md` (Physical Roadmap Sync):**
   Begitu nomor Issue GitHub resmi didapatkan (baik dibuatkan langsung via MCP GitHub maupun disalin manual oleh developer dengan nomor misal `#12`), AI **WAJIB SECARA FISIK MEMPERBARUI `DEVELOPMENT_ROADMAP.md` di root proyek**:
   - Cari sub-poin yang bersesuaian di dalam Epik [X].
   - Ubah tanda kotak centang dari:
     `- [ ] [Nama Sub-Poin Fitur]`
     menjadi:
     `- [x] [Nama Sub-Poin Fitur] (Issue #[Nomor])`
   - Ini menandakan secara resmi bahwa sub-poin makro tersebut telah berhasil dimatangkan di Hulu menjadi tiket terukur.

3. **Mandat Pemindahan Gerbang (Handover to Gateway 2):**
   AI menutup sesi dengan arahan tegas untuk berpindah ke gerbang hilir:
   > *"Tiket GitHub Issue #[Nomor] resmi terbit dan `DEVELOPMENT_ROADMAP.md` telah diperbarui dengan tanda centang `[x]`. Pengerjaan kode implementasi DILARANG dilakukan di sesi `/edeate` ini. Silakan buka branch baru dan panggil Gateway 2: `/grill-me #[Nomor]` untuk memulai perancangan arsitektur eksekusi!"*

---

## ⚠️ PENJAGA KUALITAS (Anti-Pattern yang Harus Ditolak AI)

| Anti-Pattern | Dampak | Tindakan Wajib AI |
|---|---|---|
| **Question Bombing / Dosen Sidang Mode** | Mahasiswa junior terintimidasi, overload kognitif, takut salah | AI WAJIB 1 topik per respons, pakai analogi ramah, dan sajikan Mini Trade-off Box |
| **Blind Choice without Trade-off** | Developer memilih tanpa paham konsekuensi, tidak bertumbuh | AI WAJIB membeberkan untung vs harga yang dibayar sebelum mencatat keputusan |
| **Multi-Ticket Dumping** (Mencetak lebih dari 1 tiket Level 3 dalam 1 sesi) | Fokus buyar, *blast radius* membengkak, pengujian bias dan campur aduk | AI WAJIB membatasi hanya 1 tiket Level 3 yang difinalisasi per sesi. Sisanya dicatat di roadmap backlog. |
| **Premature Ticket Synthesis** (Langsung mencetak tiket tanpa ACC plan) | Resiko rework besar jika asumsi dasar arsitektur atau boundary salah | AI WAJIB menyajikan rangkuman & scope plan di Fase 4 dan menunggu ACC Tech Lead di Fase 5. |
| **Hulu Code Execution / Auto-PR Offer** (Menawarkan eksekusi kode/PR di `/edeate`) | Melanggar batas gerbang, membypass TDD, Plan, dan Code Audit Hilir | AI DIHARAMKAN menulis kode atau menawarkan PR di Hulu. AI WAJIB menyerahkan tiket ke Gateway 2 via `/grill-me`. |
| **Tiket Terlalu Luas** ("Bikin fitur manajemen event lengkap") | Scope tak terbatas, sprint berantakan | AI WAJIB meminta developer memecah menjadi tiket-tiket kecil yang independen |
| **DoD Ambigu** ("Berhasil dijalankan") | Developer dan reviewer punya definisi sukses yang berbeda | AI WAJIB mendesak definisi yang terukur (angka, waktu, kondisi boolean, perintah test) |
| **Triad Dogma / Strawman Bloat** (Memaksakan 3 opsi arsitektur saat problemnya secara alami biner) | Melahirkan opsi ke-3 yang konyol, membingungkan pemula, dan memicu *over-engineering* | AI WAJIB menyajikan spektrum 2–3 opsi sah dan DILARANG mengarang Opsi 3 jika pilihannya biner |
| **Camouflage Trap** (Menyamarkan mekanik runtime/toolchain menjadi dongeng ormawa fiktif) | Diskusi terasa konyol, manipulatif, dan mengaburkan esensi teknis | AI WAJIB menggunakan Track B (NFR Fast-Track 1 ketukan) untuk tiket pondasi/toolchain |
| **Backend-Only Ticket Template Bias** (Memaksakan Policy Matrix & Controller/Service pada tiket Frontend/Toolchain) | Struktur tiket tidak relevan, kolom diisi kosong atau fiktif | AI WAJIB mengadopsi format matriks dan langkah implementasi modular (Varian A, B, atau C) |
| **Tiket Tanpa Blast Radius** | Developer/AI mengedit file liar di luar cakupan tugas | AI WAJIB memetakan daftar berkas entry point, service, schema, dan test |
| **Tiket Tanpa Invariant** | Tidak ada kontrak yang bisa diuji → Feature Test menjadi formalitas dangkal | AI WAJIB menggali minimal 1-2 invariant absolut sebelum draft disahkan |
| **Asumsi Tanpa Audit Kode** | AI berbicara dari imajinasi, bukan realita repositori | AI WAJIB menjalankan Pre-Flight Audit (Fase 0) sebelum sesi dimulai |
| **Langsung Lompat ke Solusi** | Masalah bisnis inti tidak dipahami | AI WAJIB menyelesaikan Pilar Bisnis (Track A) atau Sasaran NFR (Track B) terlebih dahulu |


