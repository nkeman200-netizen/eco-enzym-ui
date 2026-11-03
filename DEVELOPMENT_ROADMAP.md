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
- [x] Penyusunan Dokumen Spesifikasi Kontrak Data (RFC / Payload Proposal) untuk diajukan ke tim backend: pengajuan skema JSON `specs` dan relasi array `images`.
- [x] Pembangunan Service / API Client Layer di Frontend (penanganan fetch asynchronous, normalisasi data, dan penanganan error jaringan) (Issue #7).
- [x] Arsitektur Ketahanan Data (*Graceful Offline Fallback*): Komponen otomatis beralih ke data lokal `src/constants/data.js` jika API backend tidak merespons, offline, atau gagal diakses (Issue #7).
- [x] Refaktor Komponen Katalog & Modal agar reaktif mengonsumsi data dinamis hasil response API tanpa regresi tata letak (Issue #9).
- [x] Harmonisasi Brand Identity & Integrasi Logo Resmi Sanitasi Hijau (Issue #11): Mengganti placeholder icon `<Leaf />` dan teks sementara pada `Navbar.jsx` dan `Footer.jsx` dengan aset logo resmi teroptimasi (WebP/SVG), memperbarui Favicon & Open Graph banner (`BaseLayout.astro`), serta merekalibrasi token palet warna Tailwind CSS v4 (`@theme` di `src/index.css` & `tailwind.config.js`) agar kohesif dengan spektrum warna logo resmi (Forest Green `--color-brand-primary`, Citrus Warm Gold/Orange `--color-brand-accent`, dan Botanical Leaf Green).
- [x] Redesain & Refaktor Tampilan Kartu Testimoni (Issue #14): Menghapus avatar inisial berwarna (anti-pattern) dan mengadopsi gaya *Clean Editorial Typography* terinspirasi brand kredibel dunia (Aesop, Patagonia, Sensatia Botanicals) yang elegan dan relevan dengan identitas produk alami Jeruklegi.
- [x] Integrasi dinamis data Testimoni dan Angka Dampak Lingkungan dari endpoint API publik backend (`GET /api/v1/testimonials`) (Issue #15).
- [x] Integrasi Dinamis Kontak Operasional & WhatsApp Checkout (`GET /api/v1/contact`): Mengalirkan data kontak dinamis ke `Footer.jsx` (`location`, `email`, `whatsapp`), serta sentralisasi generator tautan WhatsApp checkout (`src/utils/whatsapp.js`) berbasis `whatsapp_number` aktif dari API untuk transaksi produk (`ProductDetailModal.jsx` & CTA) dengan *graceful offline fallback* ke data lokal `src/constants/data.js` (Issue #19).
- [ ] (Issue #21) Redesain & Refaktor Arsitektur Tata Letak `Footer.jsx` (Institutional Multi-Column D2C Footer): Mengadopsi tata letak asimetris 3–4 kolom terinspirasi brand kredibel (Sensatia Botanicals & Footstep Footwear) yang mencakup Kolom Identitas & Narasi Misi SiDeta, Kolom Navigasi Cepat (*Quick Links*), Kolom Informasi & Bantuan Konsumen, Kolom Hubungi Kami Dinamis, serta Sub-Footer Legalitas & Copyright.
- [ ] Penyempurnaan Data Dummy, Pusat Bantuan (FAQ) & Humanize Tipografi Narasi: Merancang arsitektur konten Pusat Bantuan & FAQ interaktif (panduan takaran dosis pemakaian, campur air, masa simpan, serta panduan order & retur WA) dan memoles narasi otentik di `src/constants/data.js` (spesifikasi bahan, aroma, dan cerita komunitas Jeruklegi) agar membumi, bebas gaya kaku korporat/AI-isms, serta siap ditautkan dari Kolom 3 Footer.

---

## 🏛️ EPIK 3: VALIDASI DATA LAPANGAN, REGULASI & GO-LIVE PRODUKSI
*Fokus: Finalisasi penyematan data legalitas terverifikasi, optimasi aset visual, dan deployment rilis.*

- [ ] Integrasi Nomor Sertifikat Uji Lab Perguruan Tinggi (Uji pH, Antibakteri, Bebas Logam Berat) pada komponen `About` dan `Footer`.
- [ ] Penyematan Izin Edar Kemenkes RI PKRT (Kelas 1: Risiko Rendah) untuk varian pembersih lantai, kaca, dan kloset.
- [ ] Penyematan Lisensi Halal BPJPH & Notifikasi BPOM untuk varian kosmetika sabun mandi.
- [ ] Penggantian data dummy prototipe dengan min. 3 testimoni konsumen riil dan metrik timbangan limbah nyata Jeruklegi.
- [ ] Optimasi aset final (WebP kompresi squoosh < 150KB per foto) dan deployment produksi ke Cloudflare Pages.
- [ ] Audit & Optimasi On-Page SEO / Technical Metadata: Mengimplementasikan semantik SEO menyeluruh pada `BaseLayout.astro` dan komponen SB7 (penyempurnaan title tag, meta description ramah keluarga, Open Graph banner, sitemap.xml, robots.txt, penataan hierarki heading H1–H3, atribut alt text deskriptif pada foto produk, serta integrasi Schema.org JSON-LD Structured Data untuk Local Business & Product catalog).
- [ ] Strategi Pemasaran D2C & Kurasi Kata Kunci Organik (StoryBrand 7 Copywriting): Merumuskan positioning produk bagi pasar rumah tangga (keamanan balita, aroma terapi jeruk alami, non-SLS) serta menyelaraskan copywriting 10 seksi SB7 untuk kata kunci spesifik bernilai konversi tinggi.
