---
name: project-epic-persistence
description: >-
  Protokol Manajemen Keterbatasan Konteks AI (Epic Persistence & Context Hydration).
  Gunakan skill ini jika fitur berskala besar/epik memiliki lebih dari 1 fase kerja.
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# PROTOKOL MANAJEMEN KETERBATASAN KONTEKS AI (THE EPIC PERSISTENCE)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

> 🚨 **HUKUM PRESERVASI INGATAN MULTI-SESI**
> Karena model AI memiliki keterbatasan jendela konteks (*Context Window Limit*) dan mengalami pemadatan konteks (*Context Compaction*) seiring panjangnya riwayat percakapan, setiap inisiatif fitur berskala epik (memuat lebih dari 1 fase/tiket) WAJIB mematuhi protokol preservasi fisik ini.

---

## 1. Penciptaan Prasasti Epik (`.agents/epics/<nama-epic>.md`)
Saat ideasi di `/edeate` menghasilkan dekomposisi fitur yang memuat lebih dari 1 fase pengerjaan (Epik Multi-Fase):
1. AI **WAJIB** memastikan direktori `.agents/epics/` tersedia di repositori.
2. AI **WAJIB** membuat satu berkas fisik Markdown bernama `.agents/epics/<nama-epic-kebab-case>.md`.
3. Dokumen Prasasti Epik wajib memiliki struktur standar berikut:
   ```markdown
   ---
   epic_name: "[Nama Epik]"
   created_at: "YYYY-MM-DD"
   status: "IN_PROGRESS"
   milestone: "Epik [X]: [Nama Epik di DEVELOPMENT_ROADMAP.md]"
   ---

   # EPIK: [Judul Epik Lengkap]

   ## 1. Latar Belakang & Nilai Bisnis
   [Uraian masalah nyata yang diselesaikan dan aktor yang terdampak]

   ## 2. Konsensus Arsitektur & Invariant Inti
   [Pola arsitektur, pemisahan layer, kontrak data, dan batas toleransi kegagalan]

   ## 3. Master Checklist Pelaksanaan
   - [ ] **Fase 1:** [Nama Sub-Fitur / Tiket 1] (Target Modul: `path/...`) — Status: [Belum / In Progress / Selesai (Issue #X)]
   - [ ] **Fase 2:** [Nama Sub-Fitur / Tiket 2] (Target Modul: `path/...`) — Status: [Pending]
   - [ ] **Fase 3:** [Nama Sub-Fitur / Tiket 3] (Target Modul: `path/...`) — Status: [Pending]

   ## 4. Log Perjalanan & Keputusan Penting
   - [Tanggal]: [Keputusan arsitektural atau perubahan scope yang disepakati]
   ```

---

## 2. Protokol Restorasi Ingatan Otomatis (Autonomous Context Hydration)
Ketika pengguna memulai sesi baru atau berpindah sesi dan memberikan instruksi kelanjutan seperti:
- *"Lanjutkan tiket kemarin"*
- *"Sekarang kita kerjakan Fase 2"*
- *"Lanjut epik [nama epik]"*

AI **DILARANG KERAS**:
- Meminta pengguna menceritakan ulang apa yang sudah dibahas di sesi sebelumnya.
- Berasumsi, menebak-nebak, atau mengarang struktur fase dari ingatan samar.

AI **WAJIB MUTLAK**:
1. Mengidentifikasi berkas epik terkait di direktori `.agents/epics/`.
2. Secara fisik memanggil tool eksplorasi (`view_file` atau `read_file`) pada berkas `.agents/epics/<nama-epic>.md` tersebut sebelum menyusun balasan.
3. Mengonfirmasi status fase kerja terakhir kepada pengguna berdasarkan data fisik berkas epik:
   > *"Berdasarkan prasasti epik di `.agents/epics/<nama-epic>.md`, Fase 1 telah tuntas (Issue #X) dan sekarang kita siap melanjutkan ke **Fase 2: [Nama Fase]**. Mari kita mulai!"*
