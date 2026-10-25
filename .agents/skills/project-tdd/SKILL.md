---
name: project-tdd
description: >-
  SOP Test-Driven Development (/tdd). Fase spesifikasi pengujian berlapis sebelum kode produksi.
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# SOP TEST-DRIVEN DEVELOPMENT (`/tdd`)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

## 🧪 PROTOKOL TEST-DRIVEN DEVELOPMENT (`/tdd`)
Saat pengguna menjalankan perintah `/tdd`:

Ini adalah **"Fase Spesifikasi"**, BUKAN fase implementasi. AI dan developer HANYA fokus menyusun skenario pengujian berdasarkan *Plan* hingga tes tersebut dipastikan gagal (*Red*).

### 1. 🛑 LARANGAN MUTLAK KODE PRODUKSI (STRICT RED PHASE)
- Di dalam sesi `/tdd`, AI **DILARANG KERAS** menyajikan atau menulis kode produksi:
- Komponen React UI (`src/components/ui/*.jsx` dan `src/components/sections/*.jsx`).
- Halaman orkestrasi (`src/App.jsx` atau `src/pages/*.astro`).
- Logika API Client Service atau data fetching asynchronous.
- Jika pengguna meminta kode produksi untuk memperbaiki tes yang gagal, AI **WAJIB MENOLAK** dan mengarahkan mereka secara tegas: *"Tes kita sudah berhasil gagal (Red) sesuai ekspektasi. Silakan panggil perintah `/execute` untuk mulai menulis kode produksi agar tes ini menjadi hijau (Green)."*

### 2. 🎯 RUANG LINGKUP WAJIB (MANDATORY TEST SCOPE)
AI **WAJIB** membuat jenis tes yang relevan untuk setiap fitur/tiket:
1. **Verifikasi Statis & Kebersihan Sintaks (`oxlint`):** Memastikan seluruh berkas bebas dari kesalahan tipe, sintaksis yang tidak valid, import bocor, atau variabel yang tidak digunakan (0 error, 0 warning).
2. **Verifikasi Kompilasi Bundle Produksi (`npm run build`):** Memastikan seluruh rantai impor modul, konfigurasi Tailwind v4, dan font lokal terkompilasi secara utuh menjadi bundel statis tanpa warning.
3. **Verifikasi Interaktivitas & DOM Cleanup:** Menguji skenario pembukaan/penutupan modal (Escape key, klik backdrop), scroll-lock pada `document.body`, dan transisi carousel mobile-peek.

### 3. 🏭 MANDAT DATA DUMMY (DATA FIXTURE YANG SEHAT)
- AI **DILARANG** menggunakan data statis/manual untuk *setup* data tes.
- AI **WAJIB** menggunakan mekanisme *data fixture* standar tech stack ini:
Menggunakan data fixture terstandarisasi yang diisolasi di `src/constants/data.js`:
- Objek produk wajib memuat struktur lengkap: `id`, `name`, `price`, `images` (array), `specs` (objek), dan `detail`.
- Pengujian kondisi batas (*edge cases*): fixture produk tanpa atribut opsional `shape` untuk memastikan defensive parsing bekerja tanpa melempar runtime error.
- Pengujian feature flag: simulasi nilai `SHOW_TESTIMONIALS: false` untuk menguji isolasi DOM testimoni.

### 4. 🚑 PENANGANAN ERROR (DIRECT SOLUTION)
- Jika tes yang sudah ditulis dijalankan oleh pengguna dan mengalami *error* konfigurasi/teknis, AI **WAJIB langsung menyodorkan kode perbaikan/jawaban yang benar**.
- Dilarang memberikan jawaban berteka-teki (*Socratic Method/Hint*). AI harus langsung menjadi asisten *pair-programming* yang memberikan solusi presisi agar developer bisa kembali fokus pada *flow*.

### 5. SIKLUS PENUTUPAN `/tdd`
Setelah skenario tes ditulis dan dikonfirmasi gagal (*Red*) karena belum ada implementasinya:
1. AI merayakan status merah tersebut.
2. AI **WAJIB BERHENTI** bekerja dan memberikan pancingan *Action Hook*: *"Semua spesifikasi tes telah dirancang dan sukses menghasilkan pesan Error (Red). Ketik `/execute` untuk beralih ke fase implementasi agar kita bisa menghijaukannya (Green)!"*
