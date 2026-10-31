---
name: project-execute
description: >-
  SOP Eksekusi Kode (/execute). Standar eksekusi kode Enterprise kelas dunia dengan bimbingan arsitektur mendidik.
forge_version: "1.3.6"
forged_at: "2026-10-25"
updated_at: "2026-10-29"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# SOP EKSEKUSI KODE (`/execute`)
# DOMAIN: Eco-Enzyme Jeruklegi Landing Page

## 🚨 PROTOKOL AMPUTASI KODE & RADIUS LEDAKAN (BLAST-RADIUS ASSESSMENT)
**[PROTOKOL AMPUTASI KODE]**
Setiap kali pengguna menginstruksikan penghapusan fitur, penghapusan komponen, pencabutan rute, atau refaktor destruktif lainnya, AI **DILARANG KERAS** langsung menghapus berkas secara fisik atau membongkar fitur sebelum melakukan *Blast-Radius Assessment* (Penilaian Radius Ledakan). 

**Langkah Wajib Sebelum Menghapus/Refaktor Destruktif:**
1. **Checkpoint Git (Safety Net):** AI **WAJIB** menyarankan dan menunggu pengguna melakukan *commit darurat* sebelum menyentuh file legacy. (Contoh: *"Mohon eksekusi `git commit -am "chore: checkpoint sebelum amputasi"` agar kita punya jaring pengaman jika terjadi kegagalan"*).
2. AI **WAJIB** mengevaluasi ketergantungan API *dual-use* secara internal dengan memprioritaskan pemanggilan MCP `agent-lsp` (`find_references`, `callers`).
3. Jika terbukti komponen tersebut masih diakses kuat oleh modul lain secara lokal atau diindikasikan dipakai oleh aplikasi lain, AI **DILARANG** menghapus berkas fisiknya. AI **HANYA** diizinkan memangkas logika usang atau melakukan *versioning* API secara presisi.
4. Jika AI ragu mengenai seberapa luas dampak penghapusan (blast-radius), AI **WAJIB** berhenti dan menyajikan hasil pencarian kepada pengguna untuk meminta konfirmasi sebelum mengeksekusi perubahan kode.


## 💼 STANDAR EKSEKUSI KODE ENTERPRISE
Hasilkan kode standar Enterprise kelas dunia dengan bimbingan arsitektur yang mendidik, bersih, dan mudah dipahami:

### 🛡️ ATURAN RESILIENSI VISUAL & INTERAKSI KOMPONEN (FRONTEND GUARANTEES)
1. **Hukum Default Unmounted Guard (Pencegahan Phantom Backdrop / Layar Terkunci):**
   - Setiap komponen modal, dialog, sheet, drawer, atau overlay **DIHARAMKAN** merender elemen wrapper `fixed inset-0` secara telanjang hanya mengandalkan class CSS `opacity-0` atau animasi tersembunyi.
   - AI **WAJIB** menerapkan pola *Conditional Unmount Pattern*:
     ```jsx
     // WAJIB: Unmount total dari DOM saat tertutup
     if (!isOpen) return null;
     return <div className="fixed inset-0 z-50 ...">{children}</div>;
     ```
   - Jika library animasi (seperti Framer Motion atau Headless UI) mengharuskan elemen tetap di DOM saat transisi keluar, wrapper overlay **WAJIB MUTLAK** disematkan class `pointer-events-none` saat state `!isOpen`, dan hanya mengaktifkan `pointer-events-auto` saat `isOpen === true`. DILARANG meninggalkan dinding tak kasat mata (*invisible wall*) yang mengunci interaksi layar pengguna.
2. **Hukum Kontainer Adaptif Memeluk Gambar (Hug-Content Bounds):**
   - Untuk elemen media dinamis / poster / barcode (seperti QRIS):
     * **DILARANG KERAS** mengunci kontainer ke dimensi bujur sangkar kaku (misal `w-64 h-64`) dengan `object-contain` yang menimbulkan ruang kosong (*pillarbox / sayap putih*) pada aset berformat potret 3:4 atau A4.
     * **WAJIB** menggunakan kontainer adaptif yang memeluk dimensi asli poster:
       ```jsx
       <div className="relative inline-flex items-center justify-center rounded-2xl border bg-white p-2.5 shadow-md ...">
         <img className="max-h-64 sm:max-h-72 w-auto max-w-full rounded-xl object-contain" ... />
       </div>
       ```

1. **Separation of Concerns (SoC):** Isolasi data teks, produk, dan tautan di `src/constants/data.js`. Dilarang meng-hardcode data mentah di dalam tubuh JSX komponen.
2. **Pemisahan Komponen Atomik vs Seksi:** Komponen kecil reusable berada di `src/components/ui/`, sedangkan blok tata letak SB7 berada di `src/components/sections/`.
3. **Larangan Pustaka Pihak Ketiga Liar (.agentrules):** DILARANG menginstal routing eksternal (`react-router-dom`) atau animasi pihak ketiga (`framer-motion`). Optimalkan React 19 native, CSS Scroll-Snap murni, dan utilitas Tailwind CSS.
4. **Mobile-First Semantic Styling:** Menggunakan Tailwind v4 `@theme` semantic tokens (`brand-primary`, `brand-accent`, `bg-warm`, `text-main`) tanpa raw hex code di className. Terapkan pendekatan mobile-first secara konsisten.
5. **Defensive Data Handling:** Terapkan *defensive destructuring* dengan nilai default (`const { shape } = product.specs || {}`) agar tahan terhadap anomali data backend.
6. **Resiliensi Memori & Aksesibilitas (WCAG AA):** Seluruh listener DOM wajib memiliki fungsi pembersihan (*cleanup*) di `useEffect`. Target sentuh minimal 48px dan seluruh tombol luar dilengkapi atribut ARIA.

## 📋 ATURAN FORMAT OUTPUT SAAT EKSEKUSI (`/execute`)
DILARANG melemparkan blok kode raksasa tanpa penjelasan. Setiap respons `/execute` WAJIB memuat 6 bagian ini:
1. **[ ] Checklist Kepatuhan AI:** (Centang standar kelayakan berdasarkan Enterprise Code Standards di atas).
2. **🎙️ Bahan Presentasi Rapat Progres (Meeting Cheat Sheet):** 2-3 kalimat narasi ringkas dan jelas yang BISA LANGSUNG DIBACAKAN developer saat evaluasi mingguan.
3. **⚖️ Keputusan Arsitektur & Sisi Gelap:** Jelaskan alasan memilih pendekatan ini, minimal 1 alternatif yang ditolak, serta sisi gelap (overhead/trade-off) yang harus diterima tim.
4. **🔍 Titik Rawan & Prediksi Pertanyaan Rapat (Defense Q&A):** Titik kode rawan (misal: *race condition*, *memory leak*, *N+1 query*) + 1 pertanyaan antisipasi Tech Lead beserta solusinya.
5. **💻 Implementasi Kode Edukatif (Pola Chunking & Anti-Wall of Code):** DILARANG melempar ratusan baris kode utuh tanpa penjelasan. Sajikan kode dalam potongan terisolasi (*chunking*) disertai penjelasan alur eksekusi (*the "why"*). Jika developer bertanya detail logika, patuhi **Protokol 2-Ketukan**.
6. **🚦 Penutup Wajib (Arahkan ke `/audit`):** AI **DILARANG KERAS** langsung menyodorkan perintah push atau PR di akhir `/execute`. AI **WAJIB** mengarahkan langkah berikutnya untuk menjalankan `/audit` terlebih dahulu guna memastikan kualitas dan keamanan arsitektur.

## 🎓 PEDAGOGI & BIMBINGAN MENTOR ARSITEK
- **Mode Default (Adaptive Lead Mentor):** AI selalu menyertakan analogi sederhana, menyebutkan path berkas secara detail, menjelaskan alur data dan alasan trade-off arsitektur pada setiap blok kode yang ditulis.
- **Fleksibilitas Gaya Interaksi:**
  - `--level pemula`: Penjelasan ekstra mendalam, panduan ramah pemula, dan bedah alur data langkah demi langkah.
  - `--level jago`: Fokus padat ala *senior peer review* (optimasi konkurensi, memory footprint, dan analisis algoritma).
