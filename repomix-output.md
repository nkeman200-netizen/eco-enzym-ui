This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
docs/
  architecture-and-copy.md
  design-system.md
  prd.md
public/
  fonts/
    .gitkeep
    PlusJakartaSans-Bold.ttf
    PlusJakartaSans-ExtraBold.ttf
    PlusJakartaSans-Medium.ttf
    PlusJakartaSans-Regular.ttf
    PlusJakartaSans-SemiBold.ttf
  favicon.svg
  icons.svg
src/
  assets/
    hero.png
    react.svg
    vite.svg
  components/
    sections/
      .gitkeep
      About.jsx
      Footer.jsx
      Hero.jsx
      Navbar.jsx
      Products.jsx
    ui/
      .gitkeep
      Button.jsx
      SectionWrapper.jsx
  constants/
    .gitkeep
    data.js
  App.jsx
  index.css
  main.jsx
.agentrules
.gitignore
.oxlintrc.json
index.html
package.json
README.md
tailwind.config.js
vite.config.js
```

# Files

## File: docs/architecture-and-copy.md
```markdown
# Page Architecture & Copywriting

Bangun halaman secara berurutan (dari atas ke bawah) dengan struktur komponen dan teks berikut. DILARANG menggunakan Lorem Ipsum. Gunakan anchor IDs (misal: `id="produk"`) pada setiap section utama untuk memfasilitasi navigasi smooth scroll.

## 1. Navbar (`<Navbar>`)
- **Fungsi:** Sticky navigation di bagian atas layar.
- **Brand:** Logo Icon (Lucide Leaf) + Teks "Eco-Enzyme"
- **Menu Links:** Beranda (`#hero`), Tentang (`#tentang`), Produk (`#produk`), Kontak (`#kontak`).

## 2. Hero Section (`<Hero>` - `id="hero"`)
- **Layout:** Dua kolom pada desktop (Kiri: Teks, Kanan: Placeholder Gambar Sabun dengan efek blur dekoratif). Tumpuk (stack) pada mobile.
- **Badge:** "100% Organik & Ramah Lingkungan"
- **Headline:** "Dari Sisa Dapur, Menjadi Kebaikan untuk Bersama."
- **Deskripsi:** "Bantu kurangi limbah lingkungan sambil merawat kebersihan keluarga. Produk Eco-Enzyme alami, aman di kulit, dan dibuat langsung dari tangan masyarakat lokal Jeruklegi."
- **Primary CTA:** "Lihat Produk Kami" (Arahkan ke `#produk`).

## 3. Explanation / Education Section (`<About>` - `id="tentang"`)
- **Headline:** "Mengubah Masalah Menjadi Solusi"
- **Deskripsi:** "Limbah organik rumah tangga bukan lagi sekadar sampah. Melalui proses fermentasi alami, alam memberikan cara untuk mendaur ulangnya menjadi pembersih yang tangguh dan aman."
- **4 Langkah Flow (Gunakan Ikon Lucide):**
  *(Catatan untuk AI: Wajib flex-col di mobile, flex-row di desktop)*
  1. **Limbah Organik:** "Mengumpulkan sisa sayur dan buah dari dapur warga."
  2. **Inovasi Proses:** "Fermentasi alami tanpa bahan kimia berbahaya."
  3. **Produk Bernilai:** "Diolah menjadi sabun dan pembersih higienis."
  4. **Lingkungan Lestari:** "Mengurangi tumpukan sampah di tempat pembuangan akhir."

## 4. Products Section (`<Products>` - `id="produk"`)
- **Headline:** "Pilihan Pembersih Alami Anda"
- **Deskripsi:** "Dukung kemandirian ekonomi lokal dengan menggunakan produk ramah lingkungan untuk kebutuhan sehari-hari."
- **Daftar Produk (Render dalam format Grid, gunakan placeholder kotak untuk gambar):**
  1. **Sabun Batang:** "Lembut di kulit, wangi alami."
  2. **Pembersih Lantai:** "Efektif hilangkan noda, lantai kesat."
  3. **Pembersih Kaca:** "Kaca bening tanpa residu kimia."
  4. **Pembersih Kamar Mandi:** "Angkat kerak dengan kekuatan enzim alami."
- **Contextual Checkout (Wajib ada di setiap Card Produk):**
  Tambahkan tombol warna `brand-primary` dengan ikon WhatsApp. Teks tombol: "Pesan via WhatsApp".
  - *Link logic:* `https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20[NAMA_PRODUK]%20Eco-Enzyme.`

## 5. Contact & Footer Section (`<Footer>` - `id="kontak"`)
- **Fungsi:** Pusat informasi komunitas (Tanpa form isian teks).
- **Headline:** "Terhubung Bersama Kami"
- **Deskripsi:** "Tertarik berkolaborasi, belajar membuat Eco-Enzyme, atau ingin melihat langsung riset ekonomi sirkular ini? Jangan ragu untuk menghubungi panitia pengabdian."
- **Informasi Kontak (Susun berjejer dengan Ikon Lucide):**
  - **Lokasi:** "Desa Jeruklegi, Jawa Tengah"
  - **Email:** "halo@ecoenzyme-jeruklegi.id" (dummy)
  - **WhatsApp:** "+62 888 0245 7102"
- **Copyright:** "© 2026 Program Pengabdian Masyarakat Eco-Enzyme. All rights reserved."
```

## File: docs/design-system.md
```markdown
# Design System & UI Guidelines

## 1. Typography (Strict Rule)
- **Primary Font:** `Plus Jakarta Sans`
- **Implementation:** WAJIB didownload dan diatur sebagai Local Assets di Vite (self-hosted). Dilarang menggunakan Google Fonts CDN (`<link>` tag di HTML) untuk mencegah Flash of Unstyled Text (FOUT) dan memastikan LCP optimal.
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800).

## 2. Color Palette (Semantic Configuration)
AI Agent wajib mengonfigurasi `tailwind.config.js` dengan struktur semantic variabel berikut, BUKAN menggunakan hex mentah di dalam class HTML:

- `brand-primary`: `#166D3B` (Deep Forest Green - untuk tombol utama, header footer)
- `brand-accent`: `#7CBE4D` (Vibrant Green - untuk badge, elemen dekoratif)
- `surface-light`: `#F5F5F5` (Light Neutral - untuk background card, input area)
- `text-main`: `#222222` (Dark Charcoal - untuk teks utama dan heading)
- `bg-base`: `#FFFFFF` (Pure White - untuk background utama halaman)

## 3. UI Components & Shapes (Atomic Design)
Sebelum membangun halaman, buat komponen reusable dasar ini di folder `src/components/ui/`:

- **Buttons:** 
  - Wajib menggunakan `rounded-full` (pill-shaped).
  - Wajib memiliki efek interaktif (contoh: `hover:bg-opacity-90 transition-all duration-200`).
- **Cards (Product & Info):**
  - Wajib menggunakan sudut membulat `rounded-2xl` atau `rounded-3xl`.
  - Gunakan shadow lembut bawaan tailwind (`shadow-sm` atau `shadow-md`) dan border tipis `border-gray-200`.
- **Icons:**
  - Hanya gunakan pustaka `lucide-react`. Atur ukuran dan stroke-width yang konsisten.

## 4. Layout & Grid System
- **Mobile-First:** Selalu mulai dengan styling untuk layar kecil.
- **Container:** Untuk layar desktop, bungkus konten utama dalam kontainer terpusat dengan maksimal lebar 1280px (Gunakan class `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Spacing:** Gunakan skala spacing bawaan Tailwind secara konsisten (menggunakan kelipatan 4, misal `gap-4`, `p-6`, `mb-8`).
```

## File: docs/prd.md
```markdown
# Product Requirements Document (PRD)

## 1. Project Info
- **Product Name:** Eco-Enzyme Landing Page
- **Platform:** Web (Mobile-First Responsive)
- **Tech Stack Target:** React (Vite) + Tailwind CSS
- **Core Objective:** Mengedukasi masyarakat lokal tentang pengolahan limbah organik dan memfasilitasi pemesanan produk sabun secara langsung (frictionless).

## 2. Target Audience (User Persona)
- Warga lokal desa dan ibu rumah tangga.
- **Karakteristik:** Menginginkan informasi yang praktis, lugas, dan bahasa yang membumi tanpa jargon ilmiah yang rumit. Lebih nyaman berinteraksi dan bertransaksi menggunakan WhatsApp dibandingkan sistem e-commerce kompleks.

## 3. Success Metrics
- **Conversion:** Tingkat klik (Click-Through Rate) yang tinggi pada tombol "Pesan via WhatsApp" di setiap kartu produk.
- **Performance:** Waktu muat halaman (LCP) di bawah 2.5 detik pada koneksi 3G/4G seluler (mewajibkan optimasi font lokal dan ukuran gambar).

## 4. Functional Requirements (User Flow)
- Pengguna mendarat di Hero Section dan melihat visi utama (solusi limbah).
- Pengguna menggulir ke bawah membaca alur edukasi (3 langkah pengolahan).
- Pengguna melihat katalog produk (Sabun Batang, Pembersih Lantai, dll).
- Pengguna menekan tombol "Pesan via WhatsApp" pada produk spesifik.
- Sistem membuka tab/aplikasi WhatsApp dengan pesan yang sudah diformat otomatis (Contextual Checkout).

## 5. Non-Functional Requirements
- **Styling:** Menggunakan Semantic Variables Tailwind yang sudah dikonfigurasi secara kustom (misal: `bg-brand-primary`, bukan `bg-green-700`).
- **Typography:** Mewajibkan penggunaan self-hosted font (Plus Jakarta Sans) untuk menghindari Flash of Unstyled Text (FOUT).

## 6. Out of Scope (BATASAN KERAS UNTUK DEVELOPER)
Hal-hal berikut **TIDAK BOLEH** diimplementasikan pada fase ini:
1. **Tidak ada sistem Cart/Keranjang Belanja.** 
2. **Tidak ada integrasi Backend atau Database (Node.js, PHP, MySQL, dll).**
3. **Tidak ada sistem Checkout mandiri (Payment Gateway).**
4. **Tidak ada Form Kontak fungsional (EmailJS/SMTP).** Semua alur komunikasi difokuskan ke WhatsApp.
5. **Tidak ada React Router.** Halaman ini murni One-Pager statis.
```

## File: public/fonts/.gitkeep
```
# Place Plus Jakarta Sans font files (.woff2) here:
# - PlusJakartaSans-Regular.woff2 (400)
# - PlusJakartaSans-Medium.woff2 (500)
# - PlusJakartaSans-SemiBold.woff2 (600)
# - PlusJakartaSans-Bold.woff2 (700)
# - PlusJakartaSans-ExtraBold.woff2 (800)
```

## File: public/favicon.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
```

## File: public/icons.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
```

## File: src/assets/react.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
```

## File: src/assets/vite.svg
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
```

## File: src/components/sections/.gitkeep
```
# Keep folder structure
```

## File: src/components/sections/About.jsx
```javascript
import React from 'react';
import { Apple, FlaskConical, Sparkles, Leaf } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { EDUCATION_STEPS } from '../../constants/data';

/**
 * Icon lookup table to map icon strings from constants to Lucide icon components
 */
const iconComponents = {
  Apple,
  FlaskConical,
  Sparkles,
  Leaf,
};

/**
 * About / Explanation Section highlighting the 4-step organic waste transformation flow
 */
export default function About() {
  return (
    <SectionWrapper id="tentang" className="bg-surface-light">
      {/* Header Seksi (Text Center) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Mengubah Masalah Menjadi Solusi
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Limbah organik rumah tangga bukan lagi sekadar sampah. Melalui proses fermentasi alami, alam memberikan cara untuk mendaur ulangnya menjadi pembersih yang tangguh dan aman.
        </p>
      </div>

      {/* 4 Langkah Flow Edukasi (Stacked di mobile, Grid/Horizontal di desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {EDUCATION_STEPS.map((item) => {
          const IconComponent = iconComponents[item.iconName] || Leaf;

          return (
            <div
              key={item.step}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-start relative group"
            >
              {/* Step Number Badge */}
              <div className="flex items-center justify-between w-full mb-6">
                <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-accent/15 text-brand-primary font-bold text-sm">
                  {item.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
```

## File: src/components/sections/Footer.jsx
```javascript
import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { CONTACT_INFO } from '../../constants/data';

/**
 * Icon lookup table for contact items
 */
const contactIcons = {
  MapPin,
  Mail,
  Phone,
};

/**
 * Footer / Contact Section providing community connection details and copyright
 */
export default function Footer() {
  return (
    <SectionWrapper id="kontak" as="footer" className="bg-brand-primary text-white">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Header Kontak */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Terhubung Bersama Kami
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
            Tertarik berkolaborasi, belajar membuat Eco-Enzyme, atau ingin melihat langsung riset ekonomi sirkular ini? Jangan ragu untuk menghubungi panitia pengabdian.
          </p>
        </div>

        {/* Informasi Kontak (Flexbox: Col di mobile, Row di desktop) */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full py-4">
          {CONTACT_INFO.map((item) => {
            const IconComponent = contactIcons[item.iconName] || Phone;

            const content = (
              <div className="flex items-center gap-3 group transition-transform duration-150 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-brand-primary transition-all duration-200 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-accent/90">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-brand-accent transition-colors">
                    {item.value}
                  </span>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus:outline-hidden"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.label}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Garis Pembatas & Copyright */}
        <div className="border-t border-white/20 pt-8 mt-12 w-full">
          <p className="text-xs sm:text-sm text-white/80 tracking-wide">
            &copy; 2026 Program Pengabdian Masyarakat Eco-Enzyme. All rights reserved.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

## File: src/components/sections/Hero.jsx
```javascript
import React from 'react';
import { Sparkles, Droplets, Leaf, ArrowRight } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';

/**
 * Hero Section with value proposition, contextual CTA, and decorative visual placeholder
 */
export default function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('produk');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="hero" className="overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Kolom Kiri: Teks & CTA */}
        <div className="flex flex-col items-start text-left space-y-6">
          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-primary text-xs sm:text-sm font-semibold tracking-wide">
            <Leaf className="w-4 h-4 text-brand-primary" />
            <span>100% Organik & Ramah Lingkungan</span>
          </div>

          {/* Headline Utama */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main leading-tight tracking-tight">
            Dari Sisa Dapur, Menjadi Kebaikan untuk Bersama.
          </h1>

          {/* Deskripsi */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
            Bantu kurangi limbah lingkungan sambil merawat kebersihan keluarga. Produk Eco-Enzyme alami, aman di kulit, dan dibuat langsung dari tangan masyarakat lokal Jeruklegi.
          </p>

          {/* Call to Action Button */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              onClick={scrollToProducts}
              className="text-base font-semibold px-8 py-4 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30"
            >
              <span>Lihat Produk Kami</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Kolom Kanan: Area Placeholder Gambar & Dekorasi Blur */}
        <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center">
          {/* Efek Blur Dekoratif di Belakang */}
          <div
            aria-hidden="true"
            className="absolute -top-6 -right-6 w-64 h-64 sm:w-80 sm:h-80 bg-brand-accent/20 rounded-full blur-3xl -z-10 pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -left-6 w-60 h-60 bg-brand-primary/15 rounded-full blur-2xl -z-10 pointer-events-none"
          />

          {/* Box Placeholder Gambar Produk Sabun */}
          <div className="w-full aspect-square bg-surface-light rounded-3xl border border-gray-200 p-8 flex flex-col items-center justify-center text-center shadow-md relative overflow-hidden group">
            {/* Dekorasi Visual Organik */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary mb-6 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <Droplets className="w-12 h-12 sm:w-14 sm:h-14 text-brand-primary" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-brand-primary shadow-xs border border-gray-100">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Sabun & Pembersih Alami</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-main">
                Fermentasi Alami Berkualitas
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xs">
                Formula higienis ramah bumi hasil pengolahan limbah organik warga Jeruklegi
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
```

## File: src/components/sections/Navbar.jsx
```javascript
import React, { useState } from 'react';
import { Leaf, Menu, X } from 'lucide-react';

/**
 * Sticky Navbar component with brand logo and smooth anchor links
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Beranda', href: '#hero' },
    { name: 'Tentang', href: '#tentang' },
    { name: 'Produk', href: '#produk' },
    { name: 'Kontak', href: '#kontak' },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group"
          aria-label="Eco-Enzyme Beranda"
        >
          <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-200">
            <Leaf className="w-5 h-5 transition-transform duration-200 group-hover:rotate-12" />
          </div>
          <span className="font-bold text-xl md:text-2xl text-brand-primary tracking-tight">
            Eco-Enzyme
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-main hover:text-brand-primary transition-colors duration-150 py-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-text-main hover:text-brand-primary hover:bg-surface-light transition-colors"
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-text-main hover:text-brand-primary hover:bg-surface-light transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
```

## File: src/components/sections/Products.jsx
```javascript
import React from 'react';
import { MessageCircle, Sparkles, Package } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { PRODUCTS } from '../../constants/data';

/**
 * Products Catalog Section displaying eco-enzyme cleaning products with contextual WhatsApp checkout
 */
export default function Products() {
  const handleOrderClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="produk" className="bg-bg-base">
      {/* Header Seksi (Text Center) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Pilihan Pembersih Alami Anda
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Dukung kemandirian ekonomi lokal dengan menggunakan produk ramah lingkungan untuk kebutuhan sehari-hari.
        </p>
      </div>

      {/* Grid Katalog Produk (1 col mobile, 2 col tablet, 4 col desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Placeholder Gambar Produk */}
              <div className="w-full aspect-square bg-surface-light rounded-xl overflow-hidden relative flex flex-col items-center justify-center border border-gray-100 p-4 group-hover:scale-[1.02] transition-transform duration-200">
                {/* Badge Produk */}
                {product.badge && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-brand-primary border border-gray-100 shadow-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-primary" />
                    <span>{product.badge}</span>
                  </div>
                )}

                {/* Ilustrasi Icon Placeholder */}
                <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                  <Package className="w-8 h-8" />
                </div>
              </div>

              {/* Detail Produk */}
              <h3 className="text-lg sm:text-xl font-bold text-text-main mt-4 tracking-tight">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Contextual WhatsApp Checkout Button */}
            <div className="pt-4">
              <Button
                variant="primary"
                onClick={() => handleOrderClick(product.whatsappUrl)}
                className="w-full text-sm font-semibold py-3 gap-2"
                aria-label={`Pesan ${product.name} via WhatsApp`}
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pesan via WhatsApp</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

## File: src/components/ui/.gitkeep
```
# Keep folder structure
```

## File: src/components/ui/Button.jsx
```javascript
import React from 'react';

/**
 * Reusable Button component with semantic variants and pill-shaped styling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary' | 'secondary' | 'outline' | 'inverted'} [props.variant='primary']
 * @param {string} [props.className='']
 * @param {function} [props.onClick]
 * @param {'button' | 'submit' | 'reset'} [props.type='button']
 * @param {boolean} [props.disabled=false]
 */
export default function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none px-6 py-3 text-sm md:text-base active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm hover:shadow-md',
    secondary: 'bg-brand-accent text-white hover:bg-brand-accent/90 shadow-sm hover:shadow-md',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white',
    inverted: 'bg-white text-brand-primary hover:bg-surface-light shadow-sm hover:shadow-md',
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
```

## File: src/components/ui/SectionWrapper.jsx
```javascript
import React from 'react';

/**
 * SectionWrapper component for standardized page layout sections
 * Enforces responsive max-width container, horizontal padding, and vertical spacing
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {string} [props.id] - Section anchor id for smooth scrolling (e.g., 'hero', 'tentang', 'produk', 'kontak')
 * @param {string} [props.className=''] - Styles for the full-width outer section (e.g., bg-surface-light)
 * @param {string} [props.containerClassName=''] - Additional styles for the inner constrained container
 * @param {React.ElementType} [props.as='section'] - Semantic HTML tag
 */
export default function SectionWrapper({
  children,
  id,
  className = '',
  containerClassName = '',
  as: Component = 'section',
  ...props
}) {
  return (
    <Component id={id} className={`w-full ${className}`.trim()} {...props}>
      <div className={`w-full max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20 ${containerClassName}`.trim()}>
        {children}
      </div>
    </Component>
  );
}
```

## File: src/constants/.gitkeep
```
# Keep folder structure
```

## File: src/constants/data.js
```javascript
/**
 * Static Data Layer for Eco-Enzyme Landing Page
 * Following clean architecture guidelines from .agentrules and architecture-and-copy.md
 */

export const EDUCATION_STEPS = [
  {
    step: 1,
    title: 'Limbah Organik',
    description: 'Mengumpulkan sisa sayur dan buah dari dapur warga.',
    iconName: 'Apple',
  },
  {
    step: 2,
    title: 'Inovasi Proses',
    description: 'Fermentasi alami tanpa bahan kimia berbahaya.',
    iconName: 'FlaskConical',
  },
  {
    step: 3,
    title: 'Produk Bernilai',
    description: 'Diolah menjadi sabun dan pembersih higienis.',
    iconName: 'Sparkles',
  },
  {
    step: 4,
    title: 'Lingkungan Lestari',
    description: 'Mengurangi tumpukan sampah di tempat pembuangan akhir.',
    iconName: 'Leaf',
  },
];

export const PRODUCTS = [
  {
    id: 'sabun-batang',
    name: 'Sabun Batang',
    description: 'Lembut di kulit, wangi alami.',
    badge: 'Favorit Keluarga',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Sabun%20Batang%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-lantai',
    name: 'Pembersih Lantai',
    description: 'Efektif hilangkan noda, lantai kesat.',
    badge: 'Higienis Alami',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Lantai%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kaca',
    name: 'Pembersih Kaca',
    description: 'Kaca bening tanpa residu kimia.',
    badge: 'Bebas Noda',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kaca%20Eco-Enzyme.',
  },
  {
    id: 'pembersih-kamar-mandi',
    name: 'Pembersih Kamar Mandi',
    description: 'Angkat kerak dengan kekuatan enzim alami.',
    badge: 'Aksi Tangguh',
    whatsappUrl: 'https://wa.me/6288802457102?text=Halo,%20saya%20tertarik%20pesan%20Pembersih%20Kamar%20Mandi%20Eco-Enzyme.',
  },
];

export const CONTACT_INFO = [
  {
    type: 'location',
    label: 'Lokasi',
    value: 'Desa Jeruklegi, Jawa Tengah',
    href: null,
    iconName: 'MapPin',
  },
  {
    type: 'email',
    label: 'Email',
    value: 'halo@ecoenzyme-jeruklegi.id',
    href: 'mailto:halo@ecoenzyme-jeruklegi.id',
    iconName: 'Mail',
  },
  {
    type: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 888 0245 7102',
    href: 'https://wa.me/6288802457102',
    iconName: 'Phone',
  },
];
```

## File: src/App.jsx
```javascript
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Products from './components/sections/Products'
import Footer from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-bg-base font-sans text-text-main font-normal relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
      </main>
      <Footer />
    </div>
  )
}

export default App
```

## File: src/index.css
```css
@import "tailwindcss";
@config "../tailwind.config.js";

@theme {
  --color-brand-primary: #166D3B;
  --color-brand-accent: #7CBE4D;
  --color-surface-light: #F5F5F5;
  --color-text-main: #222222;
  --color-bg-base: #FFFFFF;
  --font-sans: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
}

/* ==========================================================================
   Typography: Self-hosted Plus Jakarta Sans
   Dilarang menggunakan Google Fonts CDN (menggunakan font lokal di /fonts/)
   ========================================================================== */
@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/PlusJakartaSans-Regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/PlusJakartaSans-Medium.ttf') format('truetype');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/PlusJakartaSans-SemiBold.ttf') format('truetype');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/PlusJakartaSans-Bold.ttf') format('truetype');
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/PlusJakartaSans-ExtraBold.ttf') format('truetype');
}

/* ==========================================================================
   Global Smooth Scroll & Base Reset
   ========================================================================== */
html {
  scroll-behavior: smooth;
  font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif;
  background-color: #FFFFFF;
  color: #222222;
}

body {
  margin: 0;
  min-height: 100vh;
  background-color: inherit;
  color: inherit;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## File: src/main.jsx
```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## File: .agentrules
```
# SYSTEM INSTRUCTIONS FOR AI AGENT (ANTIGRAVITY IDE)

You are an Expert Frontend React Developer and Tech Lead. You write clean, scalable, and modular enterprise-grade code.

## 1. CONTEXT AWARENESS (STRICT)
- ALWAYS read the entire `docs/` folder (`prd.md`, `design-system.md`, `architecture-and-copy.md`) before generating ANY code or modifying the project structure.
- Do not deviate from the agreed-upon design system and out-of-scope boundaries.

## 2. CLEAN ARCHITECTURE & MODULARITY
- **Separation of Concerns:** Keep UI components isolated from data logic. Store dummy data (like product lists) in a separate `src/constants/data.js` file, not hardcoded inside the component return statement.
- **Component Splitting:** NEVER dump all code into `App.jsx`. Break the UI down into small, single-responsibility components inside `src/components/`. 
- **Folder Structure:** Maintain a clean hierarchy:
  - `src/components/ui/` (for reusable atoms like `<PrimaryButton>`, `<ProductCard>`)
  - `src/components/sections/` (for layout blocks like `<Hero>`, `<Products>`, `<Footer>`)
  - `src/constants/` (for static data/configuration)

## 3. REUSABLE CODE
- Build generic UI components first. A button should be a `<Button>` component that accepts `variant`, `className`, and `children` props, rather than rewriting Tailwind classes for every button instance.

## 4. CODE COMPLETENESS (ANTI-LAZINESS)
- NEVER use placeholders like `// ... existing code ...` or `// tambahkan kode di sini`. 
- ALWAYS output the complete, fully functional file. Do not truncate code under any circumstances.

## 5. DEPENDENCY LOCKDOWN
- Allowed Stack: React 18 (Vite), Tailwind CSS 3+, `lucide-react`.
- STRICTLY PROHIBITED: Do not install or suggest any other external UI libraries, animation libraries (like framer-motion), or routing libraries (like react-router). 

## 6. STYLING RULES
- Use ONLY the semantic Tailwind variables defined in the design system (e.g., `bg-brand-primary`, `text-surface-light`). Do not use raw hex codes in `className`.
- Enforce Mobile-First CSS. Start with base classes for mobile, then use `md:` and `lg:` prefixes for larger screens.
```

## File: .gitignore
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

## File: .oxlintrc.json
```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

## File: index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>eco-enzyme-landing</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## File: package.json
```json
{
  "name": "eco-enzyme-landing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "lucide-react": "^1.43.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8"
  },
  "devDependencies": {
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.5",
    "oxlint": "^1.79.0",
    "postcss": "^8.5.28",
    "tailwindcss": "^4.3.3",
    "vite": "^8.2.2"
  }
}
```

## File: README.md
```markdown
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
```

## File: tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#166D3B',
        'brand-accent': '#7CBE4D',
        'surface-light': '#F5F5F5',
        'text-main': '#222222',
        'bg-base': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

## File: vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```
