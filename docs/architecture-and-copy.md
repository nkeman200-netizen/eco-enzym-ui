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