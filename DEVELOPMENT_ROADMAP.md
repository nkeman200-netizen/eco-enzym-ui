# 🧭 DEVELOPMENT ROADMAP: ECO-ENZYME JERUKLEGI LANDING PAGE
*North Star Dokumen Pengembangan — Repositori Frontend (Client-Side & Islands Architecture)*

---

## 🏗️ EPIK 1: FONDASI & WALKING SKELETON (STORYBRAND 7 CORE)
*Fokus: Membangun fondasi SPA statis performa tinggi, 10 seksi narasi SB7, dan katalog interaktif D2C.*

- [x] Inisialisasi React 19 + Vite 8 + Tailwind CSS v4 (`@theme`) + Font Lokal *Plus Jakarta Sans*.
- [x] Isolasi Single Source of Truth (`src/constants/data.js`) & Komponen Reusable Atomik (`Button`, `SectionWrapper`).
- [x] Implementasi Linear 10 Seksi SB7 (Hero, Problem 3-Lapis, Guide/About, Products, Plan, Stakes, Success Vision, Testimonials, Final CTA, Footer).
- [x] Transisi Katalog Minimalis D2C: Pembersihan badge, harga bersih, dan efek hover *cross-fade* foto sekunder (`ProductCard`).
- [x] Horizontal Carousel *Mobile Peek Effect* (`w-[78vw]`) & navigasi panah pintar desktop (`Products`).
- [x] Modal Detail Berjenjang (*Progressive Disclosure*) dengan 3 Accordion: Spesifikasi, Komposisi, & Cara Pakai (`ProductDetailModal`).
- [x] Varian Bentuk Sabun Mandi Dinamis/Opsional (`shape`) untuk mengakomodasi keragaman cetakan pengrajin.
- [x] *Frictionless WhatsApp Direct Checkout* dengan template pesan kontekstual otomatis.

---

## 🚀 EPIK 2: ARSITEKTUR ASTRO (0 KB JS SEO) & KONTRAK DATA BACKEND (`eco-enzyme-be`)
*Fokus: Migrasi ke Astro Islands Architecture demi performa SEO kelas dunia, dan integrasi API klien dengan graceful offline fallback.*

- [x] Migrasi Bundler & Shell ke Astro: Konfigurasi `@astrojs/react` dan Tailwind CSS v4 pada `astro.config.mjs`.
- [x] Refaktor Shell `index.html` dan `App.jsx` ke `src/pages/index.astro` dengan pemisahan 8 seksi statis (0 KB JS murni) dan 2 seksi reaktif (`Navbar` & `Products` sebagai React Islands).
- [x] Pengujian skor Google Lighthouse pasca-migrasi Astro (Target: Performance 98–100, LCP < 1.2 detik).
- [ ] Penyusunan Dokumen Spesifikasi Kontrak Data (RFC / Payload Proposal) untuk diajukan ke tim backend: pengajuan skema JSON `specs` dan relasi array `images`.
- [ ] Pembangunan Service / API Client Layer di Frontend (penanganan fetch asynchronous, normalisasi data, dan penanganan error jaringan).
- [ ] Arsitektur Ketahanan Data (*Graceful Offline Fallback*): Komponen otomatis beralih ke data lokal `src/constants/data.js` jika API backend tidak merespons, offline, atau gagal diakses.
- [ ] Refaktor Komponen Katalog & Modal agar reaktif mengonsumsi data dinamis hasil response API tanpa regresi tata letak.
- [ ] Integrasi dinamis data Testimoni dan Angka Dampak Lingkungan dari endpoint API publik backend.

---

## 🏛️ EPIK 3: VALIDASI DATA LAPANGAN, REGULASI & GO-LIVE PRODUKSI
*Fokus: Finalisasi penyematan data legalitas terverifikasi, optimasi aset visual, dan deployment rilis.*

- [ ] Integrasi Nomor Sertifikat Uji Lab Perguruan Tinggi (Uji pH, Antibakteri, Bebas Logam Berat) pada komponen `About` dan `Footer`.
- [ ] Penyematan Izin Edar Kemenkes RI PKRT (Kelas 1: Risiko Rendah) untuk varian pembersih lantai, kaca, dan kloset.
- [ ] Penyematan Lisensi Halal BPJPH & Notifikasi BPOM untuk varian kosmetika sabun mandi.
- [ ] Penggantian data dummy prototipe dengan min. 3 testimoni konsumen riil dan metrik timbangan limbah nyata Jeruklegi.
- [ ] Optimasi aset final (WebP kompresi squoosh < 150KB per foto) dan deployment produksi ke Cloudflare Pages.
