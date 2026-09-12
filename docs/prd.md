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