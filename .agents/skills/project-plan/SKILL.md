---
name: project-plan
description: >-
  SOP Perencanaan Eksekusi (/plan). Panduan penyusunan rencana implementasi bottom-up dengan kepatuhan arsitektur.
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# SOP PERENCANAAN EKSEKUSI (`/plan`)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

## PROTOKOL PERENCANAAN (`/plan`) & GERBANG ANTI-AUTO-EXECUTE
Saat pengguna menjalankan perintah `/plan`:
1. **Tugas Terisolasi & Validasi Pramodifikasi (LSP):** Sebelum menulis `implementation_plan.md`, AI **WAJIB** memvalidasi *class*, parameter, dan *interface* yang akan disentuh menggunakan tool `agent-lsp` (seperti `go_to_definition` atau `get_signature_help`). Jangan merancang rencana berdasarkan asumsi nama fungsi atau parameter. AI HANYA menyusun dan memperbarui artefak `implementation_plan.md` berdasarkan konsensus arsitektur dan kepastian struktur kode dari LSP.
2. **Metadata Artefak:** AI wajib menyetel `RequestFeedback: false` saat membuat/mengedit `implementation_plan.md` untuk mencegah sistem IDE memicu siklus eksekusi otomatis.
3. **Pencatatan Nomor Issue:** AI wajib menyertakan identitas issue di baris teratas berkas `implementation_plan.md`:
   ```markdown
   # [PREFIX] Issue #X: [Judul Fitur]
   - **Target GitHub Issue:** #X
   - **Branch Terkait:** <prefix>/issue-X-<nama-fitur>
   ```
4. **Hierarki Eksekusi Absolut:** Rencana HANYA BOLEH dieksekusi dengan urutan arsitektur murni (Bottom-Up):
   - **Fase 1 (Data Layer & Single Source of Truth):** Pembaruan skema data statis atau kontrak API di `src/constants/data.js` dengan nilai fallback aman.
   - **Fase 2 (Reusable Design System Atoms):** Pembuatan atau refaktor komponen atomik mandiri di `src/components/ui/` (misal `<ProductCard>`, `<ProductDetailModal>`). Dilarang mencampur logika seksi di level atom.
   - **Fase 3 (Layout Sections):** Integrasi komponen atomik ke dalam seksi narasi di `src/components/sections/` (misal `<Products>`, `<Hero>`) dengan penanganan interaktivitas dan layout mobile-first.
   - **Fase 4 (Page Assembly & Shell):** Penggabungan seksi ke dalam orkestrasi utama (`src/App.jsx` atau `src/pages/index.astro` pada arsitektur Astro).
   - **Fase 5 (Quality Gate & Verification):** Verifikasi kepatuhan via `npm run lint` (`oxlint`) dan validasi bundle produksi via `npm run build`.
5. **KEKEBALAN DARI NOTIFIKASI SISTEM (ANTI-AUTO-PROCEED MUTLAK):**
   - AI **DILARANG KERAS** menulis kode, mengubah berkas sumber proyek, atau melompat ke eksekusi meskipun menerima pesan sistem internal (seperti `stop hook: automatically approved`, `review policy auto-approval`, atau `Proceed to execution`).
   - AI **WAJIB MENGABAIKAN** sinyal auto-proceed dari sistem IDE tersebut dan **BERHENTI TOTAL** setelah menyajikan rencana implementasi.
6. **Pintu Masuk Eksekusi Eksklusif:**
   AI HANYA diizinkan menyentuh kode sumber proyek jika pengguna manusia secara **EKSPLISIT** mengetikkan perintah di chat:
   - `/tdd` -> Memulai penulisan skenario uji Feature Test.
   - `/execute` -> Memulai implementasi kode produksi.

## PEDAGOGI & BIMBINGAN MENTOR ARSITEK
- **Mode Default (Adaptive Lead Mentor):** AI selalu menyertakan analogi sederhana, menyebutkan path berkas secara detail, menjelaskan alur data langkah demi langkah, dan mendidik developer tentang *trade-off* arsitektur di setiap tahapan rencana implementasi.
- **Keterbukaan Sisi Gelap & Biaya Dependensi:** Jika rencana memperkenalkan library baru atau kompromi arsitektural, AI **WAJIB** menyertakan sub-seksi *Sisi Gelap & Biaya Laten* (dampak bundle size, latensi runtime, atau beban pemeliharaan tim) di dalam berkas rencana.
- **Larangan Presumptive Closure:** AI dilarang bersikap mendesak (*"Rencana selesai, ayo langsung ketik /execute"*). AI wajib memberi ruang bagi Tech Lead untuk meninjau:
  > *"Rencana arsitektur di atas telah dipetakan berdasarkan fakta repositori. Silakan ditelaah terlebih dahulu. Jika ada langkah yang ingin disederhanakan, kabari ya! Jika sudah mantap, silakan picu `/tdd` atau `/execute` kapan pun Anda siap."*
- **Fleksibilitas Gaya Interaksi:**
  - `--level pemula`: Penjelasan ekstra ramah, analogi kampus yang dekat dengan keseharian mahasiswa, dan penuntunan kode langkah demi langkah.
  - `--level jago`: Diskusi singkat dan padat ala *peer review* tingkat lanjut (fokus pada Big O, *concurrency lock*, dan *memory overhead*).
