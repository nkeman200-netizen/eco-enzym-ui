# ADR — Migrasi Framework: AIDA → StoryBrand 7 (SB7)
**Architecture Decision Record**  
**Proyek:** Eco-Enzyme Jeruklegi Landing Page  
**Tanggal:** September 2026  
**Status:** Menunggu Persetujuan

---

## 1. Konteks & Latar Belakang

Landing page saat ini dibangun di atas framework **AIDA** (Attention → Interest → Desire → Action), yang merupakan model pemasaran klasik tahun 1898. Struktur yang ada:

```
Navbar → Hero → About (4 langkah) → Products → Footer/Kontak
```

Setelah evaluasi, ditemukan bahwa halaman ini memiliki **gap kritis**: tidak ada elemen yang:
- Menyuarakan **masalah spesifik pelanggan** (empati)
- Menunjukkan **konsekuensi jika tidak bertindak** (stakes)
- Memperlihatkan **visi keberhasilan** setelah menggunakan produk
- Memposisikan **brand sebagai pemandu**, bukan sebagai pusat cerita

Keputusan: beralih ke **StoryBrand 7 (SB7)**, framework yang terbukti lebih efektif untuk brand berbasis komunitas, UMKM, dan social enterprise dengan audiens yang emosi-driven.

---

## 2. Profil Audiens Target

Pemahaman audiens adalah fondasi seluruh keputusan arsitektur konten ini.

| Atribut | Detail |
|---|---|
| **Demografi** | Ibu rumah tangga, usia 25–45 tahun |
| **Perangkat** | Mayoritas mobile (smartphone) |
| **Motivasi utama** | Kebersihan rumah + kepedulian lingkungan |
| **Hambatan beli** | Belum kenal brand, ragu kualitas produk alami |
| **Trigger emosi** | Rasa bersalah (limbah), rasa bangga (pilihan bijak), rasa aman (alami) |
| **Konversi** | WhatsApp — familiar, tidak perlu akun, langsung manusiawi |

> **Implikasi arsitektur:** Copy harus berbicara kepada **rasa bersalah yang lembut** ("limbah dapur selama ini menjadi masalah") dan mengubahnya menjadi **rasa bangga** ("kamu bisa jadi bagian dari solusi"). Bahasa harus hangat, tidak teknis, tidak formal.

---

## 3. Perbandingan Framework: AIDA vs SB7

### Perbedaan Mental Model

```
AIDA (brand-centric):
  "Perhatikan kami → ini produk kami → kamu mau ini → beli sekarang"

SB7 (customer-centric):
  "Kamu punya masalah → kami mengerti → kami adalah pemandumu →
   ini rencananya → ambil langkah ini → hindari kegagalan ini →
   bayangkan hidupmu setelah ini"
```

### Tabel Perbandingan

| Kriteria | AIDA | SB7 |
|---|---|---|
| Siapa hero-nya | Brand | Pelanggan |
| Titik awal | Produk | Masalah pelanggan |
| Emosi yang diaktifkan | Ketertarikan | Empati + harapan |
| Elemen trust | Tidak ada | Otoritas + rencana jelas |
| Stakes/konsekuensi | Tidak ada | Ada (elemen 6) |
| Visi keberhasilan | Tidak ada | Ada (elemen 7) |
| Cocok untuk | Brand yang sudah dikenal | Brand baru / UMKM / social enterprise |
| Kompleksitas implementasi | Rendah | Sedang–Tinggi |

### Mengapa SB7 Lebih Tepat untuk Kasus Ini

1. **Brand baru** — Eco-Enzyme Jeruklegi belum dikenal publik. Audiens butuh trust-building sebelum beli.
2. **Social enterprise** — ada misi sosial dan lingkungan yang kuat; SB7 unggul dalam menyampaikan misi sebagai alat koneksi emosional.
3. **Audiens ibu rumah tangga** — keputusan beli mereka sangat dipengaruhi oleh identitas ("saya ibu yang peduli lingkungan"), bukan sekadar fitur produk. SB7 berbicara ke identitas.
4. **Kompetisi produk pembersih** — pasar sudah penuh brand besar. Diferensiasi hanya bisa lewat narasi, bukan spesifikasi.

---

## 4. Peta 7 Elemen SB7 ke Struktur Halaman

### Elemen 1 — A Character (Ada Hero yang Bisa Diidentifikasi)
- **Siapa hero-nya:** Ibu rumah tangga yang peduli lingkungan tapi belum tahu harus mulai dari mana
- **Implementasi:** Headline Hero section wajib berbicara langsung ke identitas mereka
- **Copy arah:** Bukan "Kami membuat sabun eco-enzyme" → tapi "Kamu sudah peduli lingkungan. Sekarang ada cara nyata untuk bertindak."

### Elemen 2 — Has a Problem (Ada Masalah 3 Lapis)

SB7 mendefinisikan masalah dalam 3 lapisan:

| Lapis | Deskripsi | Untuk Eco-Enzyme |
|---|---|---|
| **External** | Masalah fisik yang nyata | Limbah organik dapur menumpuk; produk kimia berbahaya di kulit anak |
| **Internal** | Perasaan yang muncul akibat masalah itu | Rasa bersalah membuang sisa makanan; khawatir dengan bahan kimia |
| **Philosophical** | Mengapa ini tidak adil / tidak seharusnya begini | "Seharusnya ada pilihan yang baik untuk keluarga DAN lingkungan" |

- **Implementasi:** Perlu section atau copy di Hero yang menyentuh minimal 2 dari 3 lapis ini secara eksplisit
- **Gap saat ini:** Hero hanya menyentuh External ("dari sisa dapur") tapi tidak Internal atau Philosophical

### Elemen 3 — Meets a Guide (Brand Sebagai Pemandu, Bukan Hero)

Brand membuktikan diri sebagai pemandu dengan dua hal: **Empati + Otoritas**

| Komponen | Implementasi |
|---|---|
| **Empati** | "Kami mengerti betapa sulitnya memilih produk yang aman sekaligus ramah lingkungan" |
| **Otoritas** | Data nyata: proses fermentasi terbukti, komunitas lokal berpengalaman, produk sudah dipakai warga |

- **Gap saat ini:** Tidak ada elemen yang secara eksplisit memosisikan brand sebagai pemandu yang *memahami* pelanggan

### Elemen 4 — Who Gives Them a Plan (Ada Rencana yang Jelas)

SB7 mensyaratkan rencana 3 langkah yang sederhana dan tidak menakutkan.

Rencana usulan untuk Eco-Enzyme:
```
1. Pilih produk yang kamu butuhkan
2. Hubungi kami via WhatsApp
3. Terima produk segar langsung dari dapur komunitas
```

- **Gap saat ini:** Section About ada 4 langkah, tapi itu menjelaskan *proses produksi*, bukan *langkah pembelian untuk pelanggan*
- **Keputusan arsitektur:** Perlu pisahkan antara "Plan for Buyer" (baru) dan "Process Explanation" (About yang ada)

### Elemen 5 — And Calls Them to Action (CTA yang Jelas dan Berulang)

SB7 mewajibkan **dua jenis CTA**:

| Tipe CTA | Karakter | Implementasi |
|---|---|---|
| **Direct CTA** | Berani, jelas, satu tindakan spesifik | "Pesan Sekarang via WhatsApp" |
| **Transitional CTA** | Untuk yang belum siap beli — tawarkan nilai tanpa risiko | "Lihat Cara Pembuatannya" / "Pelajari Manfaatnya" |

- **Gap saat ini:** Hanya ada Direct CTA. Tidak ada Transitional CTA untuk pengunjung yang belum yakin
- **Keputusan:** Tambahkan Transitional CTA di Hero section

### Elemen 6 — That Helps Them Avoid Failure (Stakes)

Ini elemen yang **paling sering dilewatkan** tapi paling kuat secara psikologis. Tanpa stakes, tidak ada urgensi.

- **Implementasi:** Section pendek yang menggambarkan apa yang terus terjadi jika tidak bertindak
- **Nada:** Bukan menakut-nakuti — tapi jujur dan penuh empati
- **Contoh copy arah:** "Setiap hari tanpa pilihan, limbah dapur kita terus jadi masalah di TPA. Produk kimia terus masuk ke tanah dan air."
- **Gap saat ini:** Tidak ada section ini sama sekali

### Elemen 7 — And Ends in Success (Success Vision)

Gambarkan kehidupan pelanggan **setelah** menggunakan produk — konkret, bisa dirasakan.

- **Implementasi:** Section yang menggambarkan transformasi: rumah bersih, kulit aman, bumi lebih sehat, dan pelanggan merasa jadi bagian dari gerakan yang berarti
- **Gap saat ini:** Tidak ada section ini

---

## 5. Struktur Section yang Diusulkan (SB7 Penuh)

```
[Navbar]
    │
[Hero] ← Ubah total: karakter + masalah + transitional & direct CTA
    │
[Problem/Empathy] ← BARU: 3 lapis masalah, posisikan brand sebagai empati
    │
[About / Process] ← Pertahankan, tapi reframe sebagai "otoritas" pemandu
    │
[Plan] ← BARU: 3 langkah beli yang sederhana
    │
[Products] ← Pertahankan, perkuat dengan benefit ke pelanggan (bukan fitur)
    │
[Success Vision] ← BARU: gambaran transformasi setelah pakai produk
    │
[Social Proof] ← BARU (PLACEHOLDER): testimoni + data nyata (belum tersedia)
    │
[Stakes / Failure Avoided] ← BARU: konsekuensi jika tidak bertindak
    │
[Final CTA] ← BARU: ajakan terakhir yang kuat sebelum footer
    │
[Footer/Kontak] ← Pertahankan
```

---

## 6. Trade-off & Pertimbangan

### Trade-off 1 — Panjang Halaman vs Perhatian Mobile

| | Pro | Kontra |
|---|---|---|
| **SB7 penuh (8–9 section)** | Narasi lengkap, conversion rate tinggi | Halaman panjang, mobile harus scroll jauh |
| **SB7 ringkas (5–6 section)** | Ringan di mobile | Elemen trust berkurang |

**Keputusan:** Implementasi penuh tapi setiap section harus **sangat ringkas** (max 3–4 kalimat copy). Mobile-first berarti tiap section harus selesai dalam 1 layar HP.

---

### Trade-off 2 — Social Proof Tanpa Data Nyata

> [!CAUTION]
> **Ini risiko terbesar dalam keseluruhan migrasi.**
>
> SB7 tanpa Social Proof bekerja setengah. Social Proof adalah elemen yang paling membangun kepercayaan untuk brand baru.
> Jika section ini diluncurkan kosong atau dengan data palsu, akan merusak kredibilitas seluruh halaman.

**Keputusan:** Buat section dengan struktur siap pakai tapi **ditandai eksplisit sebagai placeholder** di kode. Section ini **TIDAK ditampilkan di halaman live** sampai data nyata tersedia. Ini berarti perlu mekanisme feature flag atau kondisi render.

**Catatan tegas untuk komunitas Jeruklegi:**
Untuk memaksimalkan efektivitas halaman ini, komunitas perlu mengumpulkan:
- Minimal 3 testimoni pembeli nyata (nama, foto opsional, kalimat singkat)
- Satu angka dampak yang bisa diverifikasi (misal: berapa kg limbah sudah diolah, atau berapa warga terlibat)

Tanpa ini, halaman beroperasi di bawah potensi optimalnya.

---

### Trade-off 3 — Rewrite Copy vs Structural Change

| Pendekatan | Effort | Dampak |
|---|---|---|
| Hanya ubah teks (copy rewrite) | Rendah | Sedang — peningkatan empati, tapi tidak ada elemen baru |
| Tambah section baru saja | Sedang | Tinggi — SB7 lengkap |
| Keduanya (copy + section baru) | Tinggi | Maksimal |

**Keputusan:** Lakukan keduanya. Copy lama yang ada tidak cukup kuat untuk SB7 — harus ditulis ulang dari sudut pandang pelanggan.

---

### Trade-off 4 — Kompleksitas Komponen React

Menambah 4–5 section baru berarti:
- 4–5 file komponen baru di `sections/`
- Data baru di `constants/data.js`
- Kemungkinan pola baru (misal: feature flag untuk Social Proof)

**Keputusan:** Pertahankan pola arsitektur yang ada (komponen section terpisah + data di constants). Tidak perlu perubahan arsitektur teknis — hanya penambahan.

---

## 7. Dokumen & Keputusan yang Harus Disiapkan Sebelum Implementasi

Berikut checklist yang **harus selesai sebelum satu baris kode pun ditulis**:

### Dokumen Konten (Copy)
- [ ] **Hero copy baru** — headline, subheadline, direct CTA, transitional CTA
- [ ] **Problem/Empathy copy** — 3 lapis masalah dalam bahasa ibu rumah tangga
- [ ] **Plan copy** — 3 langkah beli yang ringkas dan meyakinkan
- [ ] **Success Vision copy** — gambaran transformasi setelah pakai (min. 3 poin konkret)
- [ ] **Stakes copy** — konsekuensi jika tidak bertindak (nada empati, bukan menakut-nakuti)
- [ ] **Final CTA copy** — kalimat penutup yang kuat

### Keputusan Arsitektur yang Belum Final
- [ ] **Urutan Stakes vs Success Vision** — SB7 asli menaruh Success di akhir, tapi beberapa praktisi menaruh Stakes sebelum Final CTA. Perlu diputuskan.
- [ ] **Mekanisme Social Proof placeholder** — apakah disembunyikan via CSS `hidden`, dihapus dari JSX sampai siap, atau pakai environment variable flag?
- [ ] **Apakah section Problem dan Guide digabung atau dipisah** — jika digabung, lebih ringkas tapi kurang dalam. Jika dipisah, lebih dalam tapi lebih panjang.

### Data dari Komunitas (Dibutuhkan Sebelum Go-Live Penuh)
- [ ] Testimoni nyata (min. 3)
- [ ] Satu angka dampak yang bisa diverifikasi
- [ ] Foto produk asli (semua 4 produk)
- [ ] Foto proses produksi (untuk section About/Guide — memperkuat otoritas)

---

## 8. Risiko & Mitigasi

| Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|
| Social Proof kosong saat launch | Tinggi | Tinggi | Feature flag — section disembunyikan sampai siap |
| Copy terlalu panjang di mobile | Sedang | Sedang | Batasan ketat: max 3 kalimat per section |
| Kehilangan karakter "organik & hangat" saat rewrite copy | Sedang | Tinggi | Buat panduan tone of voice sebelum tulis copy |
| Terlalu banyak section membuat halaman terasa berat | Sedang | Sedang | Animasi masuk ringan + lazy loading per section |

---

| # | Keputusan | Pilihan |
|---|---|---|
| 1 | Framework | **SB7 penuh** |
| 2 | Section baru | **+4 section** (Problem/Empathy, Plan, Success Vision, Stakes+Final CTA) |
| 3 | Section lama | **Dipertahankan + di-reframe copy-nya** (Hero, About, Products, Footer) |
| 4 | Social Proof | **Placeholder terstruktur dengan feature flag** (`SHOW_TESTIMONIALS`) & data dummy prototipe terverifikasi |
| 5 | CTA mechanism | **WhatsApp contextual checkout** (tetap tanpa cart) |
| 6 | Arsitektur teknis | **Pola komponen yang ada dipertahankan** (React 19 + Tailwind v4 + Single Source of Truth `data.js`) |
| 7 | Copy direction | **Mobile-first, hangat, emosi-driven, bahasa ibu rumah tangga** |
| 8 | Urutan Seksi Kritis | **Products diletakkan sebelum Plan** (Pengunjung melihat wujud solusi & harga sebelum diajak memahami 3 langkah pesan; mengeliminasi efek *Beige Wall*) |
| 9 | Otoritas Pemandu & Harga | **Menyematkan Authority Banner (pendampingan kampus & uji higienitas) di About serta label 'Harga Komunitas' di kartu produk** |

---

## 10. Catatan Penyelarasan Terkini (Post-Audit 2026)
Seluruh implementasi keputusan di atas telah diverifikasi melalui pengujian kompilasi (`vite build`), pemindaian lint (`oxlint`), dan didokumentasikan secara mendalam pada:
- [WHITE_PAPER_SB7.md](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/docs/WHITE_PAPER_SB7.md) — Dokumen konseptual akademik dan regulasi untuk dosen.
- [TECHNICAL_RUNBOOK.md](file:///c:/Users/sofya/Documents/JS/eco-enzyme-landing/docs/TECHNICAL_RUNBOOK.md) — SOP dan panduan operasional teknis pemelihara masa depan.
