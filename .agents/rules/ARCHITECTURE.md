---
forge_version: "1.3.3"
forged_at: "2026-10-25"
project_name: "Eco-Enzyme Jeruklegi Landing Page"
---
# ARCHITECTURE BLUEPRINT: Eco-Enzyme Jeruklegi Landing Page

> Dokumen ini memetakan rancangan makro sistem. Seluruh tiket dan fitur yang digarap melalui `/edeate` wajib berkiblat pada fondasi arsitektur di dokumen ini.

## 1. Peta Aktor & Peran (Role-Based Access)
1. **Pengunjung Publik / Calon Pembeli:** Warga lokal & ibu rumah tangga pengguna ponsel cerdas (*mobile-first*). Menjelajahi 10 seksi narasi SB7, memeriksa spesifikasi produk, dan melakukan konversi instan via WhatsApp tanpa perlu pendaftaran akun atau keranjang belanja.
2. **Pengurus Komunitas Desa Jeruklegi:** Produsen produk eco-enzyme lokal, penerima pesan pemesanan WhatsApp, dan pengelola operasional komunitas.
3. **Mitra Perguruan Tinggi / Tim Pengabdian:** Pendamping riset akademis, pengarah standarisasi mutu higienis, uji laboratorium, dan sertifikasi izin edar PKRT/BPOM.

## 2. Desain Sistem & Infrastruktur
- **Pendekatan Arsitektur:** Single-Page Application (SPA) / Content-Driven SSG dengan arsitektur pulau interaktif (Islands Architecture). Memisahkan seksi konten statis murni (0 KB JavaScript) dengan komponen interaktif reaktif (Navbar, Carousel Produk, Modal Detail). Aliran data satu arah berbasis Single Source of Truth (`src/constants/data.js`).
- **Pola Komunikasi (FE/BE):** Pemisahan mutlak 100% sisi Frontend. Repositori ini murni menyajikan UI/UX publik. Manajemen database, otentikasi admin, dan CMS produk diisolasi pada repositori backend Laravel terpisah (`eco-enzyme-be`). Frontend terhubung melalui REST API publik dengan arsitektur ketahanan data (*Graceful Offline Fallback* ke `src/constants/data.js`).

## 3. Lapisan Keamanan & Autentikasi
Zero-Client Secret. Tidak menyimpan token rahasia, kunci privat, atau otentikasi admin di frontend. Transaksi tanpa akun (*Frictionless WhatsApp Checkout*). Seluruh komunikasi eksternal diproteksi protokol HTTPS dan atribut `rel='noopener noreferrer'` pada tautan keluar. Validasi input sanitasi pada parameter query WhatsApp.

## 4. Penanganan Celah Bisnis & Edge Cases
Pemisahan peran katalog luar (fokus visual bersih, hover cross-fade foto kedua, tanpa tombol berisik) dengan modal detail berjenjang (Progressive Disclosure: Deskripsi persuasif terbuka default, Spesifikasi fisik dinamis termasuk varian cetakan sabun, Komposisi alami, dan Aturan Pakai). Penyiapan slot sertifikasi uji lab dan izin PKRT Kemenkes ditampung secara elegan tanpa merusak estetika dan ritme halaman.

## 5. Integrasi Eksternal & Layanan Pihak Ketiga
Hosting statis berkecepatan tinggi pada Cloudflare Pages / Static Edge Hosting (target LCP < 2.5s, CLS 0.00). Integrasi pihak ketiga difokuskan pada WhatsApp API Click-to-Chat (`https://wa.me/...`) dengan pesan kontekstual terformat otomatis.

## 6. Protokol Perubahan Arsitektur (Architecture Decision Records / ADR)
Dokumen ini bukan artefak statis mati. Jika dalam perjalanan pengembangan terjadi perubahan arsitektur fundamental (misal penggantian library/framework, perubahan pola state management, migrasi autentikasi, atau penambahan integrasi infrastruktur baru), tim dan AI **WAJIB** mencatatnya dalam bentuk ADR di bagian bawah dokumen ini.

AI dan Developer **DILARANG KERAS** merombak arsitektur sistem secara diam-diam tanpa mencatat riwayat keputusan ADR!

### Format Entri ADR:
Setiap keputusan arsitektur baru dicatat secara berurutan kronologis menggunakan format baku:

```markdown
### [ADR-YYYY-MM-DD]: <Judul Keputusan Singkat>
- **Status:** [Disahkan / Digantikan]
- **Konteks & Masalah:** <Mengapa perubahan ini diperlukan?>
- **Pilihan yang Dipertimbangkan:** <Daftar opsi yang dievaluasi beserta trade-off-nya>
- **Keputusan:** <Solusi yang dipilih dan disahkan oleh Tech Lead>
- **Konsekuensi & Dampak:** <Dampak positif, harga teknis/trade-off, dan area berkas yang terdampak>
```

<!-- ADR_LOG_START -->
### [ADR-2026-10-25]: Transisi ke Progressive Disclosure Modal & Mobile Peek Carousel
- **Status:** Disahkan
- **Konteks & Masalah:** Kartu katalog lama terlalu padat dengan deskripsi fungsional dan tombol WhatsApp langsung di luar, serta kesulitan menampilkan produk jika bertambah lebih dari 4 item.
- **Pilihan yang Dipertimbangkan:**
  1. Grid kaku 4 kolom + tombol pagination.
  2. Horizontal carousel CSS Scroll-Snap dengan Mobile Peek Effect (`w-[78vw]`).
  3. Swiper.js / library carousel pihak ketiga.
- **Keputusan:** Menggunakan Horizontal Carousel CSS Scroll-Snap murni dengan teknik Mobile Peek Effect (`w-[78vw]`) dan tombol panah desktop, serta merampingkan kartu luar dan memindahkan detail ke modal accordion.
- **Konsekuensi & Dampak:** Menghemat 40 KB bundle (0 library baru), tampilan bersih dan mewah ala Sensatia Botanicals, dengan konsekuensi kalkulasi scroll indikator panah dilakukan via logika DOM native.

### [ADR-2026-10-25]: Rencana Adopsi Astro (Islands Architecture) untuk SEO 0 KB JS
- **Status:** Disahkan (Masuk ke Epik 2 Roadmap)
- **Konteks & Masalah:** Landing page publik berbasis React SPA murni mengirim seluruh bundle JavaScript ke browser, yang dapat memperlambat pengindeksan Googlebot dan link preview WhatsApp.
- **Pilihan yang Dipertimbangkan:**
  1. Tetap React SPA Vite murni.
  2. Migrasi ke Next.js (App Router).
  3. Migrasi ke Astro (Islands Architecture).
- **Keputusan:** Memilih Astro karena mempertahankan 95% komponen React `.jsx` yang ada, menghasilkan 0 KB JS secara default untuk seksi statis, dan membatasi unduhan JS hanya untuk komponen interaktif (`Products` dan `Navbar`).
- **Konsekuensi & Dampak:** Skor Lighthouse optimal tanpa over-engineering server runtime, dengan konsekuensi perlu penyesuaian file konfigurasi `astro.config.mjs` dan shell halaman `index.astro`.
<!-- ADR_LOG_END -->
