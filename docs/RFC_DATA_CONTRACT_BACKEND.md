# 📄 RFC-2026-001: SPESIFIKASI KONTRAK DATA BACKEND (HEADLESS CMS INTEGRATION)
**Status:** Draf Resmi / Proposal Konsensus (Request for Comments)  
**Target GitHub Issue:** [Issue #5](https://github.com/nkeman200-netizen/eco-enzym-ui/issues/5)  
**Penulis:** Tim Frontend Engineering (`eco-enzyme-landing`)  
**Audiens:** Tim Backend Engineering (`eco-enzyme-be`), Tech Lead, Tim Stakeholder UMKM  
**Lingkungan Target:** Laravel 11/12 (PHP 8.2+, MySQL 8) ➔ Astro v5 (React 19 Islands)  
**Domain Produksi Referensi:** `https://sanitasihijau.com/`

---

## 🧭 BAB 1: RINGKASAN EKSEKUTIF & RASIONAL ARSITEKTUR

### 1.1 Latar Belakang & Profil Operasional Komunitas Jeruklegi
Website **Eco-Enzyme Jeruklegi** dibangun dengan misi ganda:
1. **D2C High-Conversion Sales Platform:** Menjadi corong penjualan langsung produk ramah lingkungan berbasis formulasi narasi StoryBrand 7 (SB7) kelas dunia.
2. **Community-Empowered Platform:** Memberdayakan warga dan kelompok wanita tani (KWT) di Desa Jeruklegi, Jawa Tengah, agar di masa depan dapat mengelola ketersediaan produk, harga, dan nomor kontak secara mandiri melalui dashboard CMS.

Namun, observasi lapangan menunjukkan bahwa pengurus operasional UMKM Jeruklegi didominasi oleh kalangan lansia/orang tua non-IT. Menyerahkan seluruh elemen visual website ke sistem CMS bebas-edit berisiko merusak hierarki tipografi, susunan tata letak, dan corong psikologi penjualan yang telah dirancang presisi.

---

### 1.2 Paradigma Arsitektur: *Content Governance vs Content Operations*

Untuk menyelesaikan perdebatan antara kebutuhan fleksibilitas pengelola desa dan perlindungan integritas antarmuka publik, arsitektur sistem menetapkan batasan tegas: **Pragmatic Hybrid Headless CMS**.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                      TATA KELOLA KONTEN SISTEM                         │
├──────────────────────────────────┬─────────────────────────────────────┤
│   CONTENT OPERATIONS (DINAMIS)   │    CONTENT GOVERNANCE (TERKUNCI)    │
│    Dikelola via CMS Backend      │      Dikelola di Frontend Astro     │
├──────────────────────────────────┼─────────────────────────────────────┤
│ • Fluktuasi Tinggi (Harian/Minggu)│ • Fluktuasi Nol / Jangka Panjang   │
│ • Harga, Stok, & Netto Produk    │ • Narasi Hero, Problem, & Guide     │
│ • Foto Galeri & Varian Sabun     │ • Biaya Kegagalan (Stakes) & Visi   │
│ • Angka Timbangan Limbah Nyata   │ • Rangka Tata Letak 10 Seksi SB7   │
│ • Ulasan Baru Pelanggan (Review) │ • Standar Tipografi & Desain Sistem │
│ • No. WhatsApp & Alamat Kontak   │ • Performa 0 KB JS (Skor LH 100)    │
└──────────────────────────────────┴─────────────────────────────────────┘
```

#### Mengapa 7 Seksi StoryBrand 7 Dikunci Statis (Astro 0 KB JS)?
1. **Perlindungan Psikologi Penjualan:** Copywriting pada seksi Hero, Problem 3-Lapis, Guide/About, Stakes, dan Success Vision disusun mengacu pada formula StoryBrand 7 karya Donald Miller. Kesalahan ketik atau pemenggalan kalimat acak oleh admin non-teknis akan langsung menghancurkan tingkat konversi.
2. **Kedaulatan Performa Web (Core Web Vitals):** Website saat ini menyajikan skor performa Google Lighthouse **100/100** dengan Total Blocking Time (TBT) hanya **10 ms** di domain produksi `https://sanitasihijau.com/`. Mengunci seksi narasi sebagai komponen statis server memastikan pengunjung menerima HTML murni berbobot 0 KB JavaScript.
3. **Mengeliminasi Beban CRUD Backend yang Sia-sia:** Tim backend tidak perlu menghabiskan ratusan jam membangun formulir edit dinamis untuk teks filosofis yang faktanya tidak pernah diubah dalam rentang 1-2 tahun.

---

### 1.3 Matriks Penyelarasan Sistem: 10 Seksi SB7 vs 3 Domain Dinamis

| # | Seksi Frontend (SB7) | Komponen UI | Status Integrasi | Konsumsi Endpoint API |
|---|---|---|---|---|
| 1 | **Hero** | `Hero.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 2 | **Problem 3-Lapis** | `Problem.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 3 | **About / Guide** | `About.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 4 | **Products** | `Products.jsx` + Modal | 🟢 **Dinamis (Domain 1)** | `GET /api/v1/products` |
| 5 | **Plan (3 Langkah)** | `Plan.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 6 | **Stakes** | `Stakes.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 7 | **Success Vision** | `SuccessVision.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 8 | **Testimonials** | `Testimonials.jsx` | 🟢 **Dinamis (Domain 2)** | `GET /api/v1/testimonials` |
| 9 | **Final CTA** | `FinalCTA.jsx` | 🔒 **Statis (0 KB JS)** | *(None — Dikelola Frontend)* |
| 10| **Footer & Kontak** | `Footer.jsx` | 🟢 **Dinamis (Domain 3)** | `GET /api/v1/contact` |

---

### 1.4 Bab "Non-Goals" (Ketetapan yang Sengaja Ditiadakan)

Untuk menjamin efisiensi kerja tim pengembang, batasan berikut sengaja **TIDAK DIKERJAKAN** dalam kontrak integrasi ini:

1. **Non-Goal 1: Tidak Mengonsumsi Endpoint `/api/v1/home` dan `/api/v1/about` Eksisting Backend.**  
   *Rasional:* Data seeder di backend saat ini berorientasi pada profil proposal akademis kampus (*"Pengabdian Masyarakat Tri Dharma"*), bertolak belakang dengan *tone of voice* D2C StoryBrand 7. Endpoint ini dicatat sebagai *legacy/dormant*.
2. **Non-Goal 2: Tidak Mengonsumsi Endpoint `/api/v1/how-to-orders` (Plan 3 Langkah).**  
   *Rasional (Layout-Coupled Content):* Komponen `Plan.jsx` menggunakan visualisasi alur panah 3 langkah (*Pilih ➔ WhatsApp ➔ Terima*). Jika di masa depan UMKM memutuskan membuka pesanan via Marketplace (Shopee/Tokopedia), antarmuka tidak lagi menggunakan susunan berurutan melainkan kumpulan badge toko. Perubahan data ini menuntut mutasi pemrograman layout & styling di frontend, sehingga mengelolanya lewat CMS murni merupakan ilusi fleksibilitas.
3. **Non-Goal 3: Tidak Ada Keranjang Belanja (*Shopping Cart*) atau Autentikasi Pengunjung.**  
   *Rasional:* Seluruh transaksi dilakukan secara langsung tanpa hambatan (*frictionless direct checkout*) via WhatsApp ke admin komunitas.

---

### 1.5 Penjelasan Arsitektur Backend Eksisting (`eco-enzyme-be`) & Matriks Diferensial (Dipertahankan vs Diubah)

Bagi rekan tim backend yang membaca dokumen ini, kabar baik utamanya adalah: **fondasi arsitektur Laravel yang telah Anda bangun di `eco-enzyme-be` sudah sangat solid dan 85% tetap dipertahankan tanpa perubahan!**

#### A. Gambaran Kondisi Proyek Backend Saat Ini
Repositori `eco-enzyme-be` saat ini dibangun menggunakan:
* **Framework & Versi:** Laravel 11/12 berbasis PHP 8.2+ dan database MySQL 8.
* **Standar API:** RESTful API v1 dengan dokumentasi OpenAPI/Swagger (`OpenApi\Attributes` PHP 8 attribute).
* **Rute Publik Eksisting (`routes/api.php`):**
  - `GET /api/v1/home` (`HomeSectionController`)
  - `GET /api/v1/about` (`AboutSectionController`)
  - `GET /api/v1/products` (`ProductSectionController`)
  - `GET /api/v1/how-to-orders` (`HowToOrderController`)
  - `GET /api/v1/testimonials` (`TestimonialController`)
  - `GET /api/v1/contact` (`ContactController`)
* **Struktur Database Eksisting:**
  - `products`: memiliki kolom `name`, `description`, `benefit`, `detail`, `price`, `order`, `image`.
  - `product_detail_images`: berelasi `hasMany` dari `Product` untuk foto sekunder (`image`, `order`).
  - `testimonial_sections`, `testimonial_statistics`, `testimonial_items`: relasi seksi testimoni dan statistik.
  - `contact_sections`, `contact_items`: relasi seksi kontak dan nomor WhatsApp.

---

#### B. Matriks Rekapitulasi: Mana yang Dipertahankan vs Mana yang Diubah

| Entitas / Modul Backend | Status di Backend Eksisting | Tindakan Integrasi | Rincian Apa yang DIPERTAHANKAN (Zero-Change) | Rincian Apa yang DIUBAH / DITAMBAHKAN |
|---|---|---|---|---|
| **Rute API (`routes/api.php`)** | Sudah ada endpoint v1 lengkap | 🟢 **Dipertahankan 100%** | Tidak ada URL baru yang perlu dibuat. Rute `/products`, `/testimonials`, `/contact` tetap sama persis. | **Nol perubahan.** Tidak perlu menambah route baru. |
| **Endpoint `/home`, `/about`, `/how-to-orders`** | Controller & Seeder sudah ada | ⚪ **Diistirahatkan (Dormant)** | **JANGAN DIHAPUS.** Biarkan kode controller dan tabelnya tetap ada di backend. | Backend tidak perlu merombak seeder atau menambah fitur baru di seksi-seksi ini. |
| **Tabel `products`** | Berisi 7 kolom inti produk | 🟡 **Sedikit Penyesuaian** | Seluruh kolom lama (`name`, `description`, `benefit`, `detail`, `price`, `order`, `image`) tetap utuh 100%. | Tambahkan **1 kolom baru** tipe JSON biner: `$table->json('specs')->nullable();`. |
| **Tabel `product_detail_images`** | Relasi `hasMany` foto sekunder | 🟢 **Dipertahankan 100%** | **JANGAN DIHAPUS.** Tabel ini tetap menjadi tempat penyimpanan foto galeri tambahan dari dashboard admin. | **Nol perubahan.** Skema tabel tetap seperti sedia kala. |
| **Model `Product.php`** | Eloquent Model | 🟡 **Sedikit Penyesuaian** | Relasi `detailImages()` tetap utuh seperti sedia kala. | Tambahkan 1 baris di method `casts()`: `'specs' => 'array'`. |
| **Resource `ProductResource.php`** | Output `image_url` & `detail_images` terpisah | 🟡 **Penyesuaian Output DTO** | Semua atribut teks (`name`, `description`, dll.) tetap dikembalikan. | Satukan foto cover dan detail menjadi array flat `images: string[]`, dan sertakan objek `'specs' => $this->specs ?? (object)[]`. |
| **Modul Testimoni (`Testimonial*`)** | 3 Tabel (`sections`, `statistics`, `items`) | 🟢 **Dipertahankan 100%** | Seluruh kolom (`value`, `description`, `name`, `location`, `quote`) tetap utuh. Tidak butuh avatar atau relasi baru! | **Nol perubahan.** Frontend yang menyesuaikan membaca kolom `description` sebagai label metrik. |
| **Modul Kontak (`Contact*`)** | 2 Tabel (`sections`, `items`) | 🟢 **Dipertahankan 100%** | Seluruh kolom (`location`, `email`, `whatsapp`, `whatsapp_number`) tetap utuh. | **Nol perubahan.** Frontend cukup mengonsumsi string `whatsapp_number`. |

---

#### C. Ringkasan Eksekusi bagi Developer Backend (The 3-Step Checklist)
Rekan backend **TIDAK PERLU merombak ulang sistem**. Pekerjaan backend secara riil hanya mencakup **3 langkah sederhana**:
1. Jalankan 1 file migration: `php artisan make:migration add_specs_to_products_table --table=products` (isi: `$table->json('specs')->nullable()`).
2. Buka `app/Models/Product.php`, tambahkan `'specs' => 'array'` pada method `casts()`.
3. Buka `app/Http/Resources/ProductResource.php`, sesuaikan perakitan array `images` dan kembalikan `specs` (kode siap salin tersedia di Bab 3).

---

## 📦 BAB 2: SPESIFIKASI KONTRAK 3 DOMAIN OPERASIONAL

### 2.1 Konvensi Global API
* **Base URL:** `https://sanitasihijau.com/api/v1` (atau `http://localhost:8000/api/v1` pada lokal)
* **Headers:** `Accept: application/json`
* **Format Pembungkus Standar:** Laravel Standard Data Envelope (`{"data": ...}`)
* **Format Tanggal:** ISO 8601 UTC string (`YYYY-MM-DDTHH:mm:ssZ`)

---

### 2.2 Domain 1: Katalog Produk & Spesifikasi
Endpoint utama untuk merender kartu etalase katalog (`ProductCard.jsx`) dan modal interaktif detail berjenjang (`ProductDetailModal.jsx`).

* **Metode & Rute:** `GET /api/v1/products`
* **Autentikasi:** Publik (Tanpa Token)
* **Query Parameters:**
  - `is_active` *(opsional, boolean, default: true)*: Hanya memuat produk yang aktif dijual.

#### Skema Kontrak JSON Response
```json
{
  "data": [
    {
      "id": 1,
      "name": "Sabun Batang",
      "description": "Lembut di kulit, wangi alami dari enzim buah.",
      "benefit": "Aman untuk kulit sensitif anak-anak.",
      "detail": "Sabun batang alami berbahan dasar eco-enzyme fermentasi buah. Bebas SLS, paraben, dan bahan kimia sintetis keras. Menjaga kelembapan kulit alami dan ramah bagi lingkungan.",
      "price": "Rp 15.000",
      "order": 1,
      "images": [
        "https://sanitasihijau.com/storage/products/sabun-batang-1.webp",
        "https://sanitasihijau.com/storage/product-detail-images/sabun-batang-2.webp",
        "https://sanitasihijau.com/storage/product-detail-images/sabun-batang-3.webp"
      ],
      "specs": {
        "netto": "100 gr",
        "packaging": "Kertas Kraft Daur Ulang",
        "shape": "Batang Padat (Bunga, Hexagonal)",
        "suitability": "Semua Jenis Kulit & Balita",
        "stock": "Tersedia (Ready Stock)",
        "certification": "100% Organik & Biodegradable",
        "ingredients": "Minyak kelapa murni, fermentasi eco-enzyme buah, NaOH terhidrolisis sempurna, air suling, ekstrak minyak atsiri sereh alami.",
        "usage": "Busakan dengan air, usapkan lembut ke seluruh tubuh. Bilas hingga bersih. Simpan di tempat kering berventilasi baik agar sabun awet padat."
      }
    }
  ]
}
```

#### Kamus Atribut Payload Produk
* **`id`** `(integer|string, required)`: Identitas unik produk.
* **`name`** `(string, required)`: Nama produk (misal: "Sabun Batang", "Pembersih Lantai").
* **`description`** `(string, required)`: Kalimat pikat singkat di kartu katalog etalase.
* **`benefit`** `(string, required)`: Poin manfaat utama yang disorot di kartu etalase.
* **`detail`** `(string, required)`: Deskripsi narasi lengkap di modal detail.
* **`price`** `(string, required)`: Format harga ramah baca pembeli (misal: "Rp 15.000").
* **`order`** `(integer, required)`: Urutan penataan produk dari kiri ke kanan.
* **`images`** `(array of string, required)`:
  - **Index 0 (Cover Image):** Otomatis menjadi foto utama kartu produk.
  - **Index 1 (Hover Image):** Otomatis menjadi foto transisi saat kursor melintas (*cross-fade*).
  - **Index 2+ (Gallery Images):** Menjadi foto tambahan pada galeri *scroll-snap* modal detail.
* **`specs`** `(object, required)`: Sub-objek fleksibel spesifikasi teknis:
  - `netto` `(string, default: "-")`: Berat bersih / volume isi.
  - `packaging` `(string, default: "-")`: Jenis kemasan ramah lingkungan.
  - `shape` `(string|null, optional)`: Khusus varian cetakan sabun mandi. Jika bernilai `null` (seperti pada varian cairan), UI otomatis menyembunyikan baris bentuk.
  - `suitability` `(string, default: "-")`: Kesesuaian pengguna / jenis permukaan.
  - `stock` `(string, default: "-")`: Keterangan ketersediaan stok produk.
  - `certification` `(string, default: "-")`: Status uji lab atau sertifikasi mutu.
  - `ingredients` `(string, default: "-")`: Daftar komposisi bahan baku alami.
  - `usage` `(string, default: "-")`: Petunjuk anjuran cara pemakaian.

---

### 2.3 Domain 2: Social Proof & Statistik Dampak Lingkungan
Endpoint untuk menyajikan bukti sosial (*Social Proof*) berupa metrik timbangan limbah nyata dan testimoni pelanggan di komponen `Testimonials.jsx`.

* **Metode & Rute:** `GET /api/v1/testimonials`
* **Autentikasi:** Publik (Tanpa Token)

#### Skema Kontrak JSON Response
```json
{
  "data": {
    "statistics": [
      {
        "id": 1,
        "value": "350+ kg",
        "description": "Limbah kulit buah dapur berhasil diolah kembali"
      },
      {
        "id": 2,
        "value": "85+",
        "description": "Keluarga beralih ke solusi pembersih ramah lingkungan"
      },
      {
        "id": 3,
        "value": "24",
        "description": "Ibu rumah tangga berdaya dalam komunitas Jeruklegi"
      }
    ],
    "testimonials": [
      {
        "id": 1,
        "name": "Ibu Endang Rahayu",
        "location": "Cilacap",
        "quote": "Aroma lantainya segar alami tanpa bikin pusing. Yang paling penting, anak balita saya aman merangkak di lantai tanpa khawatir residu zat kimia keras."
      },
      {
        "id": 2,
        "name": "Pak Bambang Sutrisno",
        "location": "Purwokerto",
        "quote": "Pupuk cair organiknya sangat membantu menyuburkan aglaonema dan cabai di pekarangan. Tanaman jauh lebih hijau segar dan tanahnya tetap gembur."
      }
    ]
  }
}
```

#### Penegasan Desain: Penghapusan Avatar Inisial (Clean Editorial Typography)
Sesuai hasil wawancara arsitektur, **avatar inisial lingkaran berwarna resmi dihapus dari kontrak data**:
* **Standar Industri Kelas Dunia:** Mengadopsi estetika brand ramah lingkungan kredibel (seperti Aesop dan Patagonia). Menampilkan tipografi ulasan yang bersih, nama pelanggan tebal (*bold*), dan lokasi (*muted*) memberikan kesan jujur, tenang, dan dewasa.
* **Backend Simplicity:** Backend Laravel `TestimonialSectionResource` tidak dibebani fungsi pemotongan huruf inisial string. Backend murni mengalirkan `{ name, location, quote }`.

---

### 2.4 Domain 3: Kontak Operasional & WhatsApp Checkout
Endpoint untuk mengalirkan data kontak footer (`Footer.jsx`) dan sumber nomor telepon kasir aktif untuk transaksi produk.

* **Metode & Rute:** `GET /api/v1/contact`
* **Autentikasi:** Publik (Tanpa Token)

#### Skema Kontrak JSON Response
```json
{
  "data": {
    "location": "Desa Jeruklegi, Jawa Tengah",
    "email": "halo@ecoenzyme-jeruklegi.id",
    "whatsapp": "+62 888 0245 7102",
    "whatsapp_number": "6288802457102"
  }
}
```

#### Sentralisasi Generator WhatsApp di Sisi Frontend
Frontend mengelola generator perakitan tautan pesan instan terpusat (`src/utils/whatsapp.js`):
* Backend cukup menyediakan string nomor aktif (`whatsapp_number`).
* Frontend merakit URL checkout secara kontekstual:
  ```javascript
  // Template: https://wa.me/{cleanNumber}?text={encodedText}
  const url = buildWhatsAppCheckout(product.name, contact.whatsapp_number);
  ```
* **Keuntungan:** Tim pemasaran dapat memperbarui kata-kata sapaan WhatsApp secara lincah tanpa perlu menyentuh database backend.

---

## 🛠️ BAB 3: PANDUAN IMPLEMENTASI BACKEND (LARAVEL 11/12 RECIPE)

Bagian ini dirancang khusus agar tim backend Laravel (`eco-enzyme-be`) dapat mengeksekusi integrasi dengan cepat tanpa kendala.

### 3.1 Migration Skema Database (`eco-enzyme-be`)
Buat migration baru untuk menambahkan kolom biner JSON `specs`:
```bash
php artisan make:migration add_specs_to_products_table --table=products
```

Isi berkas migration:
```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Kolom JSON fleksibel untuk menampung spesifikasi produk
            $table->json('specs')->nullable()->after('detail');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('specs');
        });
    }
};
```

---

### 3.2 Pembaruan Model Eloquent (`app/Models/Product.php`)
Tambahkan casting array agar Laravel otomatis mengubah JSON biner menjadi array PHP native:
```php
protected function casts(): array
{
    return [
        'specs' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];
}
```

---

### 3.3 Pembaruan DTO Resource (`app/Http/Resources/ProductResource.php`)
Gabungkan foto sampul utama dan detail gambar menjadi array flat `images: string[]`, serta sertakan objek `specs`:
```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        // 1. Ambil foto sampul utama (Index 0)
        $cover = $this->image_url ? [$this->image_url] : [];

        // 2. Ambil seluruh foto detail urut order (Index 1+)
        $details = $this->relationLoaded('detailImages')
            ? $this->detailImages->sortBy('order')->pluck('image_url')->filter()->values()->toArray()
            : [];

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'benefit' => $this->benefit,
            'detail' => $this->detail,
            'price' => $this->price,
            'order' => $this->order,
            'images' => array_merge($cover, $details),
            'specs' => $this->specs ?? (object)[],
        ];
    }
}
```

---

### 3.4 Optimasi Kueri Anti N+1 (`app/Http/Controllers/Api/V1/ProductSectionController.php`)
Pastikan kueri Eloquent selalu melakukan eager loading pada relasi `detailImages`:
```php
$products = Product::with(['detailImages'])
    ->where('is_active', true)
    ->orderBy('order', 'asc')
    ->get();
```

---

## 🛡️ BAB 4: INVARIANTS & STRATEGI KETAHANAN SISTEM

### 4.1 Invariants Backend (Garansi Non-Null)
1. **Garansi Atribut `specs`:** Backend wajib mengembalikan minimal objek kosong `{}` jika kolom di database bernilai `null`. Backend dilarang mengirim `"specs": null`.
2. **Garansi Atribut `images`:** Backend wajib mengembalikan minimal array kosong `[]` (atau array berisi 1 placeholder URL jika ada). Backend dilarang mengirim `"images": null`.

### 4.2 Invariants Frontend (Defensive Fallback & Sanitasi)
1. **Penerapan Nilai Cadangan `"-"`:** Jika salah satu kunci di dalam `specs` tidak diisi oleh admin CMS desa, antarmuka modal otomatis merender tanda hubung **`"-"`** (misal: *Netto: -*).
2. **Kondisi Khusus Varian Bentuk (`shape`):** Jika `shape` bernilai `null` atau `"-"`, komponen modal **otomatis menyembunyikan** baris bentuk secara elegan tanpa meninggalkan baris kosong.
3. **Graceful Static Seed Fallback (Stale-While-Revalidate):**  
   Jika server backend mengalami *downtime*, maintenance, atau timeout jaringan (> 3000 ms), service layer frontend secara senyap (*gracefully*) mengembalikan data lokal dari `src/constants/data.js`. Antarmuka publik dijamin **0% White Screen of Death**.

---

## 📋 BAB 5: ROADMAP TAHAPAN INTEGRASI

```text
┌─────────────────────────────────────────────────────────────┐
│ 1. Penyusunan Dokumen RFC (Tiket Issue #5) ➔ SELESAI        │
├─────────────────────────────────────────────────────────────┤
│ 2. Eksekusi Migrasi & Resource di Backend (eco-enzyme-be)   │
├─────────────────────────────────────────────────────────────┤
│ 3. Pembuatan Service API Client Layer (Frontend Epik 2)     │
├─────────────────────────────────────────────────────────────┤
│ 4. Penerapan Graceful Offline Fallback di Frontend          │
├─────────────────────────────────────────────────────────────┤
│ 5. Redesain Testimoni (Editorial Typography) & Integrasi API│
└─────────────────────────────────────────────────────────────┘
```

Dokumen ini menjadi acuan tunggal (*single source of truth*) yang sah dan disetujui bersama untuk menyongsong integrasi data dinamis yang tangguh dan profesional.
