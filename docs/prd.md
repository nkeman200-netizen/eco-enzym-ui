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

## 4. Functional Requirements (StoryBrand 7 User Flow)
Halaman dirancang linear memandu psikologi pengguna melalui 10 seksi StoryBrand 7:
1. **Hero**: Pengguna menangkap proposisi nilai ("Sisa dapur bisa jadi lebih") dan opsi CTA ganda (Direct WhatsApp & Transitional Masalah).
2. **Problem**: Pengguna tervalidasi secara emosional melalui 3 lapis masalah (External, Internal guilt, Philosophical).
3. **The Guide (About)**: Pengguna mengenal komunitas Jeruklegi sebagai pemandu ramah berbekal empati dan bukti pendampingan akademis/mutu higienis.
4. **Products Catalog**: Pengguna melihat wujud produk solusi konkret lengkap dengan benefit statement dan transparansi *Harga Komunitas*.
5. **The Plan**: Pengguna memahami betapa mudahnya transaksi melalui 3 langkah tanpa registrasi akun.
6. **The Stakes**: Pengguna diingatkan urgensi menghindari kebiasaan lama (penumpukan limbah TPA & bahaya residu kimia).
7. **Success Vision**: Pengguna memvisualisasikan kehidupan rumah tangga yang bersih alami dan aman.
8. **Testimonials**: Pengguna melihat bukti sosial dan metrik dampak lingkungan nyata.
9. **Final CTA**: Pengguna diajak mengambil komitmen akhir via WhatsApp.
10. **Footer**: Pengguna dapat mengakses kontak resmi dan informasi tim pengabdian masyarakat.
- **Contextual Checkout**: Sistem membuka WhatsApp dengan template pesan kontekstual otomatis saat tombol pesanan ditekan.

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