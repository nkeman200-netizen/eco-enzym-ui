# TECHNICAL RUNBOOK & MAINTAINER PLAYBOOK
## Eco-Enzyme Landing Page (StoryBrand 7 Architecture)

*Buku Pegangan Teknis Pemeliharaan, Arsitektur Kode, dan SOP Pengembangan Masa Depan*

---

## 1. Ringkasan Sistem & Tech Stack

Landing page ini dibangun sebagai aplikasi web **Single-Page Application (SPA) Statis Berkinerja Tinggi** tanpa beban server backend (*zero server dependencies*), dioptimalkan untuk kecepatan muat seluler (*mobile-first*), dan memfasilitasi transaksi langsung tanpa hambatan (*frictionless WhatsApp checkout*).

### Spesifikasi Teknologi:
- **Framework Core**: React 19 (`react`, `react-dom`)
- **Build Tool / Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `@theme` modern CSS-first configuration)
- **Ikonografi**: `lucide-react` (vector tree-shakable SVG)
- **Linter**: `oxlint` (Rust-based ultra-fast linter)
- **Deployment Target**: Cloudflare Pages / Static Hosting

---

## 2. Peta Arsitektur Proyek & Aliran Data

Aliran data dalam aplikasi ini mengikuti pola **Single Source of Truth terisolasi**. Komponen antarmuka pengguna (UI) tidak mendefinisikan data mentah di dalam tubuh komponen, melainkan mengonsumsi data dari [src/constants/data.js](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/constants/data.js).

```
src/
├── constants/
│   └── data.js              <-- PUSAT DATA: Semua teks, produk, testimoni, kontak
├── components/
│   ├── ui/                  <-- KOMPONEN ATOMIK DASAR (REUSABLE)
│   │   ├── Button.jsx       <-- Tombol semantic (primary, outline, inverted)
│   │   └── SectionWrapper.jsx <-- Kontainer terpusat (max-w-7xl, auto-padding)
│   └── sections/            <-- 10 SEKSI NARASI STORYBRAND 7 (SB7)
│       ├── Navbar.jsx       <-- Header navigasi sticky dengan link anchor
│       ├── Hero.jsx         <-- Seksi 1: Headline pembuka & Dual CTA
│       ├── Problem.jsx      <-- Seksi 2: 3 kartu masalah pelanggan
│       ├── About.jsx        <-- Seksi 3: Pemandu (Empati + Otoritas Lab/Kampus)
│       ├── Products.jsx     <-- Seksi 4: Katalog produk + Benefit + Harga
│       ├── Plan.jsx         <-- Seksi 5: 3 langkah pemesanan WA
│       ├── Stakes.jsx       <-- Seksi 6: Urgensi kontras (Loss Aversion)
│       ├── SuccessVision.jsx<-- Seksi 7: Visi transformasi pasca-pakai
│       ├── Testimonials.jsx <-- Seksi 8: Bukti sosial & metrik dampak (Conditional)
│       ├── FinalCTA.jsx     <-- Seksi 9: Ajakan komitmen penutup
│       └── Footer.jsx       <-- Seksi 10: Kontak & legalitas pengabdian
├── App.jsx                  <-- Master assembly: Merangkai 10 seksi linear
├── index.css                <-- CSS variables, @theme token, @font-face lokal
└── main.jsx                 <-- Entry point DOM rendering
```

---

## 3. Rationale Urutan Seksi di `App.jsx`

Urutan komponen di dalam `<main>` pada [src/App.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/App.jsx) adalah hasil optimasi psikologi kognitif dan ritme visual:

1. `<Hero />` *(bg-[#FDFBF7])*: Tangkap atensi dalam 3 detik, posisikan masalah sampah sebagai potensi.
2. `<Problem />` *(bg-white)*: Bongkar rasa bersalah membuang sampah dan cemas zat kimia.
3. `<About />` *(bg-[#FDFBF7])*: Kenalkan komunitas Jeruklegi sebagai pemandu ramah yang didampingi riset kampus.
4. `<Products />` *(bg-white)*: **Wajib sebelum Plan**. Tunjukkan ragam solusi nyata dan manfaatnya.
5. `<Plan />` *(bg-[#FDFBF7])*: Hapus keraguan cara membeli melalui 3 langkah WhatsApp yang sangat mudah.
6. `<Stakes />` *(bg-brand-primary)*: Latar gelap kontras. Urgensi realistis jika tidak beralih sekarang.
7. `<SuccessVision />` *(bg-[#FDFBF7])*: Gambaran rumah yang bersih alami dan anak aman merangkak.
8. `<Testimonials />` *(bg-white)*: Validasi sosial (hanya me-render jika flag `SHOW_TESTIMONIALS = true`).
9. `<FinalCTA />` *(bg-brand-accent/10)*: Jaring pengaman untuk pengunjung yang sudah membaca hingga akhir.
10. `<Footer />` *(bg-brand-primary)*: Kontak resmi dan hak cipta pengabdian masyarakat.

*Keunggulan Ritme*: Latar belakang berselang-seling sempurna antara *Warm Off-White (`#FDFBF7`)* dan *White (`#FFFFFF`)*, sehingga mata pengunjung tidak mengalami *Beige Wall Fatigue*.

---

## 4. SOP Pemeliharaan Masa Depan (The "What To Do When..." Playbook)

Gunakan panduan operasional berikut ketika ada aset atau data nyata yang siap dimasukkan ke dalam sistem:

---

### SOP 1: Ketika Sertifikat Resmi / Uji Lab / Izin PKRT Kemenkes Sudah Terbit

Jika dosen atau tim lapangan berhasil memperoleh dokumen hasil uji laboratorium atau izin edar:

#### Langkah 1: Tambahkan Metadata Legalitas ke `src/constants/data.js`
Buka [src/constants/data.js](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/constants/data.js), tambahkan konstanta baru:
```javascript
export const LEGAL_CERTIFICATIONS = [
  {
    id: 'lab-kimia',
    name: 'Hasil Uji Lab Terakreditasi',
    certNumber: 'No. 042/LAB-KIM/2026',
    description: 'Terbukti pH seimbang (3.5 - 4.0) dan efektifitas antibakteri 99.2%',
  },
  {
    id: 'kemenkes-pkrt',
    name: 'Izin Edar Kemenkes RI PKRT',
    certNumber: 'KEMENKES RI PKRT 20301xxxxxx',
    description: 'Kategori Pembersih Rumah Tangga Alami Kelas 1 (Risiko Rendah)',
  },
];
```

#### Langkah 2: Perbarui Teks Otoritas di `src/components/sections/About.jsx`
Cari elemen banner otoritas (baris ~45–55 di [src/components/sections/About.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/components/sections/About.jsx)), ganti atau lengkapi paragraf deskripsi dengan nomor surat resmi:
```jsx
<p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
  Formula fermentasi diproduksi dengan standar mutu higienitas (Uji Lab No: 042/LAB-KIM/2026), 
  bebas dari klorin, SLS, paraben, dan residu kimia berbahaya.
</p>
```

#### Langkah 3: Tambahkan Nomor Izin di Footer
Di [src/components/sections/Footer.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/components/sections/Footer.jsx), sematkan nomor registrasi tepat di atas baris hak cipta (*copyright*).

---

### SOP 2: Ketika Foto Produk Riil Sudah Tersedia

Jangan mengunggah foto mentah langsung dari kamera ponsel! Foto yang terlalu berat akan merusak metrik **LCP (Largest Contentful Paint)**.

#### Aturan Standar Foto:
- **Aspek Rasio**: Wajib `1:1` (kotak/square).
- **Format File**: Wajib `.webp` (konversi menggunakan tools seperti squoosh.app atau cwebp).
- **Dimensi**: Minimal `600×600 px`, maksimal `800×800 px`.
- **Ukuran File**: Maksimal `150 KB` per foto.
- **Penyimpanan**: Letakkan di folder `public/images/`:
  - `public/images/sabun-batang.webp`
  - `public/images/pembersih-lantai.webp`
  - `public/images/pembersih-kaca.webp`
  - `public/images/pembersih-kamar-mandi.webp`
  - `public/images/hero-product.webp` (untuk Hero visual)

#### Implementasi di `src/components/sections/Products.jsx`:
Buka [src/components/sections/Products.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/components/sections/Products.jsx), cari blok komentar `📸 PLACEHOLDER FOTO` (sekitar baris 90), lalu ganti elemen placeholder `<IconComponent />` dengan tag gambar:
```jsx
{/* Ganti elemen div ikon dengan tag img: */}
<img
  src={`/images/${product.id}.webp`}
  alt={product.name}
  loading="lazy"
  decoding="async"
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
/>
```

#### Implementasi di `src/components/sections/Hero.jsx`:
Buka [src/components/sections/Hero.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/components/sections/Hero.jsx), cari blok kartu di kolom kanan (sekitar baris 90), lalu ganti div glassmorphism dengan:
```jsx
<img
  src="/images/hero-product.webp"
  alt="Produk Eco-Enzyme Jeruklegi"
  fetchpriority="high"
  className="w-full h-full object-cover rounded-[2.5rem] shadow-2xl"
/>
```

---

### SOP 3: Ketika Logo Resmi (.svg/.png) Sudah Siap

#### 1. Memperbarui Logo di Header (Navbar):
1. Simpan file logo di `public/logo.svg` (atau `public/logo.png`).
2. Buka [src/components/sections/Navbar.jsx](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/components/sections/Navbar.jsx) baris ~30.
3. Ganti elemen `<div className="..."><Leaf ... /></div>` dengan:
   ```jsx
   <img
     src="/logo.svg"
     alt="Logo Eco-Enzyme Jeruklegi"
     className="h-9 sm:h-10 w-auto object-contain"
   />
   ```

#### 2. Memperbarui Favicon di Tab Browser & Mengatasi Cache:
1. Timpa file [public/favicon.svg](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/public/favicon.svg) dengan logo barumu.
2. **Trik Cache-Busting**: Karena browser menyimpan cache favicon sangat agresif, buka [index.html](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/index.html#L5), tambahkan parameter versi:
   ```html
   <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
   ```
   Browser pengguna akan dipaksa mengambil icon baru secara instan tanpa perlu *clear cache*.

---

### SOP 4: Ketika Testimoni & Angka Dampak Riil Lapangan Sudah Diverifikasi

Jika tim sudah mendapatkan min. 3 nama konsumen riil dan angka riil timbangan limbah:

1. Buka [src/constants/data.js](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/constants/data.js#L170).
2. Ubah data di dalam array `TESTIMONIALS` dan `IMPACT_STATS` sesuai hasil wawancara riil:
   ```javascript
   export const TESTIMONIALS = [
     {
       id: 'testimoni-1',
       name: 'Ibu Siti Rahmawati',
       location: 'Jeruklegi Wetan',
       quote: 'Lantai dapur yang biasanya berminyak jadi kesat dan tidak licin. Aman untuk cucu saya yang merangkak.',
       avatarInitial: 'SR',
     },
     // ... min 3 testimoni
   ];
   ```
3. Pastikan `SHOW_TESTIMONIALS = true;`. Jika data lapangan belum lengkap atau ingin disembunyikan sementara, cukup ubah kembali menjadi `false`.

---

### SOP 5: Mengubah Harga Produk atau Nomor WhatsApp

Seluruh kontak dan harga terpusat di [src/constants/data.js](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/src/constants/data.js):
- **Nomor WhatsApp Utama**: Ubah URL `https://wa.me/6288802457102` di konstanta kontak.
- **Harga per Produk**: Ubah nilai `price: 'Rp XX.000'` di dalam array `PRODUCTS`.
- **Teks Otomatis Pesan WA**: Edit query parameter `?text=...` di field `whatsappUrl`.

---

## 5. Perintah Pengujian & Jaminan Kualitas (Quality Assurance)

Jalankan perintah ini di terminal PowerShell sebelum melakukan presentasi atau rilis produksi:

```bash
# 1. Pindai kesalahan sintaks dan standar linting (Wajib 0 error, 0 warning)
npm run lint

# 2. Uji kompilasi bundle produksi Vite (Wajib exit code 0)
npm run build

# 3. Jalankan server pratinjau hasil build lokal
npm run preview
```

---

## 6. Checklist Aksesibilitas & Performa Web (WCAG AA)

- [x] **Kontras Teks**: Seluruh teks body menggunakan `#222222` atau `text-gray-600` di atas background putih/krem (Rasio > 5:1, lolos WCAG AA).
- [x] **Font Preloading**: `PlusJakartaSans-Regular.ttf` dan `PlusJakartaSans-Bold.ttf` di-preload di `<head>` untuk mencegah layout shift (CLS 0.00).
- [x] **Semantic Heading Hierarchy**: Satu buah `<h1>` pada Hero section, `<h2>` pada setiap judul seksi, `<h3>` pada setiap kartu.
- [x] **Accessibility (a11y)**: Setiap tombol aksi dan link luar dilengkapi `aria-label` serta `rel="noopener noreferrer"`.
- [x] **Target Sentuh Seluler**: Seluruh tombol utama memiliki tinggi minimum 48px untuk kemudahan navigasi layar sentuh jempol.
