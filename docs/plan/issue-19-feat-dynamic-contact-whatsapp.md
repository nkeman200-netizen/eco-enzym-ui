<!-- RequestFeedback: false -->
# [FEAT] Issue #19: Integrasi Dinamis Kontak Operasional & Sentralisasi WhatsApp Checkout (`GET /api/v1/contact`)
- **Target GitHub Issue:** #19
- **Branch Terkait:** `feature/issue-19-dynamic-contact-whatsapp`
- **Dokumen Rencana:** `docs/plan/issue-19-feat-dynamic-contact-whatsapp.md`

---

## 🧭 Ringkasan Eksekutif & Intuisi Arsitektur

> 💡 **Analogi Sentral Telepon Balai Desa & Papan Petunjuk Otomatis:**
> Bayangkan balai desa Jeruklegi memiliki **5 pintu pelayanan** (Modal Detail Produk, Footer Kontak, Seksi 3 Langkah Pesan, Seksi Urgensi, dan Seksi Penutup CTA).
> 1. **Masalah Lama (*Split-Brain*):** Sebelumnya, nomor telepon kasir ditulis tangan pakai spidol permanen di masing-masing pintu (`https://wa.me/6288802457102`). Kalau pengurus komunitas SiDeta mengganti nomor HP kasir di aplikasi admin (CMS Backend), kelima pintu di website tetap mengarahkan pembeli ke nomor lama yang sudah tidak aktif.
> 2. **Solusi Baru (*Single Switchboard + Static Sign Updater*):**
>    - Kita membangun **Sentral Telepon (`src/utils/whatsapp.js`)** yang bertugas membersihkan format ketikan admin (entah diketik `+62 888-0245-7102` atau `0888 0245 7102`) menjadi kode negara standar internasional `6288802457102` untuk tautan `https://wa.me/`, sementara tulisan di layar Footer tetap rapi dan enak dibaca manusia.
>    - Kita membangun **Penarik Data Satu Pintu (`src/services/contactService.js`)** dengan *In-Memory Promise Cache*. Meskipun Katalog Produk dan Footer sama-sama meminta nomor telepon terbaru, browser hanya mengetuk pintu server Backend **1 kali saja** (`GET /api/v1/contact`).
>    - Begitu nomor terbaru diterima, kurir otomatis (`syncStaticWhatsAppLinks`) langsung memperbarui tautan pada tombol-tombol di seksi statis (`Plan`, `Stakes`, `FinalCTA`) melalui penanda `data-wa-cta` **tanpa perlu mengubah seksi statis tersebut menjadi komponen React yang berat (tetap 0 KB JS Hydration)**.
>    - Jika admin menonaktifkan seksi kontak di CMS (`is_active: false` atau `data: null`), hanya baris kontak di Footer yang disembunyikan, sedangkan **Logo Resmi SiDeta & Copyright** tetap berdiri kokoh sebagai penutup halaman, dan tombol pemesanan produk otomatis memakai nomor cadangan resmi agar transaksi tidak pernah putus.

---

## 🔍 Hasil Validasi Pra-Modifikasi AST (via `agent-lsp` & Codebase Inspection)

1. **`src/constants/data.js` (LSP Symbol Verified):**
   - Mengekspor `CONTACT_INFO` (baris 406–428) berisi 3 objek dengan properti `{ type, label, value, href, iconName }` (`MapPin`, `Mail`, `Phone`).
   - Akan ditambahkan ekspor konstanta `DEFAULT_WHATSAPP_NUMBER = '6288802457102'` dan `SHOW_CONTACT = true` sebagai *Single Source of Truth* fallback saat offline.
2. **`src/components/ui/ProductDetailModal.jsx` (LSP Symbol Verified):**
   - Komponen `ProductDetailModal({ product, onClose })` (baris 48) saat ini merakit `orderUrl` secara hardcode di baris 149–151:
     `const orderUrl = \`https://wa.me/6288802457102?text=\${encodeURIComponent(\`Halo, saya tertarik pesan \${name} (\${netto}) seharga \${price} Eco-Enzyme Jeruklegi.\`)}\`;`
   - Akan direfaktor agar menerima prop opsional `whatsappNumber` dan memanggil `buildProductCheckoutUrl({ name, netto, price }, whatsappNumber)` dari `src/utils/whatsapp.js`.
3. **`src/components/sections/Products.jsx` (LSP Symbol Verified):**
   - Komponen Island `Products()` (baris 44) saat ini memanggil `getProducts()` di dalam `useEffect` (baris 60–76) dan merender `<ProductDetailModal product={selectedProduct} onClose={...} />` (baris 168–172).
   - Akan diperbarui agar turut mengambil nomor WhatsApp aktif dari `getContactData()` (yang ter-deduplikasi di memori), menyimpannya di state `whatsappNumber`, meneruskannya ke `<ProductDetailModal whatsappNumber={whatsappNumber} />`, serta memicu `syncStaticWhatsAppLinks(whatsappNumber)` untuk memperbarui anchor `[data-wa-cta]` di halaman.
4. **`src/components/sections/Footer.jsx` (LSP Symbol Verified):**
   - Komponen `Footer()` (baris 18) memiliki peta ikon `contactIcons = { MapPin, Mail, Phone }` (baris 9–13), merender header kontak (baris 23–31), daftar `CONTACT_INFO.map(...)` (baris 34–74), serta blok bawah **Logo Resmi SiDeta & Copyright** (baris 77–92).
   - Akan direfaktor menjadi *Reactive Island* (`client:visible`) dengan state `contactItems`, `isActive`, dan `isLoading`. Saat `isLoading === true`, menampilkan *Inline Skeleton Shimmer* 3 slot kontak. Saat `isActive === false`, menyembunyikan hanya blok header sapaan & daftar kontak, sementara blok **Logo Resmi SiDeta & Copyright** tetap ter-render utuh.
5. **`src/components/sections/Plan.jsx`, `Stakes.jsx`, & `FinalCTA.jsx` (LSP Symbol Verified):**
   - `Plan.jsx` (baris 19 & 79), `Stakes.jsx` (baris 12 & 46), dan `FinalCTA.jsx` (baris 12 & 39) masing-masing mendefinisikan konstanta `WHATSAPP_MAIN` dengan nomor hardcode `6288802457102` dan membungkus `<Button>` di dalam tag `<a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer">`.
   - Ketiganya akan direfaktor menggunakan `buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, message)` dari `src/utils/whatsapp.js` dan menyematkan atribut `data-wa-cta` pada tag `<a>` agar nomor tujuannya otomatis diperbarui di DOM saat payload API diterima, tanpa mengubah ketiga seksi tersebut menjadi React Island.
6. **Kontrak Aktual Backend `eco-enzyme-be` (`ContactController.php` & `ContactSectionResource.php`):**
   - `GET /api/v1/contact` mengembalikan `{ data: { id, title, description, is_active, location, email, whatsapp, items, contacts } }` saat seksi aktif, atau `{ data: null }` saat seksi dinonaktifkan melalui toggle CMS.

---

## 🌑 Sisi Gelap & Biaya Dependensi (Trade-Offs Analysis)

- **Keterbukaan Biaya Dependensi:**
  - **0 library eksternal baru.** Seluruh proses sanitasi nomor telepon, deduplikasi promise, dan sinkronisasi atribut DOM `[data-wa-cta]` ditulis menggunakan JavaScript standar (Vanilla ES Modules) dan React 19 hooks bawaan.
- **Sisi Gelap / Harga Teknis (Trade-Off):**
  - *Tambahan Hidrasi Ringan di Footer:* Mengaktifkan `<Footer client:visible />` menambah pulau interaktif kecil di bagian paling bawah halaman, namun karena menggunakan direktif `client:visible`, kode JS Footer tidak dieksekusi saat pemuatan awal (*Initial Page Load / LCP*) dan baru aktif ketika pengunjung menggulir sampai ke kaki halaman.
  - *3-Slot Fixed Schema (`location`, `email`, `whatsapp`):* Sesuai keputusan desain UMKM saat ini, normalizer di `contactService.js` mengunci 3 slot kontak utama dengan ikon vektor tetap (`MapPin`, `Mail`, `Phone`). Jika di masa depan admin menambahkan item ke-4 (misal akun Instagram) di repeater CMS, item ke-4 tersebut belum ditampilkan sebelum kontrak UI diperluas.

---

## 🏗️ Hierarki Eksekusi Absolut (Bottom-Up Implementation)

### 🧱 Fase 1: Data Layer, Utilitas WhatsApp, & Service Layer (`src/constants/data.js`, `src/utils/whatsapp.js`, `src/services/contactService.js`)
* **Tujuan:** Membangun fondasi *Single Source of Truth*, fungsi sanitasi nomor telepon E.164 & generator URL WhatsApp, serta service pengambil data `GET /api/v1/contact` dengan *In-Memory Promise Deduplication*.
* **Langkah Konkret:**
  1. **`src/constants/data.js`:**
     - Menambahkan ekspor konstanta `DEFAULT_WHATSAPP_NUMBER = '6288802457102'` dan `SHOW_CONTACT = true` tepat di atas `CONTACT_INFO`.
  2. **`src/utils/whatsapp.js` *(Berkas Baru)*:**
     - `sanitizeWhatsAppNumber(rawNumber, fallback = DEFAULT_WHATSAPP_NUMBER)`:
       - Mengambil digit angka murni via `String(rawNumber ?? '').replace(/\D/g, '')`.
       - Jika diawali `'08'`, mengubah awalan `'0'` menjadi `'62'`.
       - Jika diawali `'8'` (tanpa `0` atau `62`), menambahkan awalan `'62'`.
       - Memvalidasi dengan pola E.164 Indonesia `/^62\d{8,13}$/`. Jika tidak valid atau kosong, mengembalikan `fallback` (`6288802457102`).
     - `buildWhatsAppUrl(rawNumber, message = '')`:
       - Menyanitasi `rawNumber` dengan `sanitizeWhatsAppNumber(rawNumber)`.
       - Jika `message` diisi, mengembalikan `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`; jika kosong, mengembalikan `https://wa.me/${cleanNumber}`.
     - `buildProductCheckoutUrl(product, rawNumber)`:
       - Mengekstrak `name = product?.name || 'Produk Eco-Enzyme'`, `netto = product?.specs?.netto || product?.netto || 'Standar'`, dan `price = product?.price || 'Rp 0'`.
       - Merakit pesan kontekstual: `Halo, saya tertarik pesan ${name} (${netto}) seharga ${price} Eco-Enzyme Jeruklegi.` dan memanggil `buildWhatsAppUrl(rawNumber, text)`.
     - `syncStaticWhatsAppLinks(rawNumber)`:
       - Aman dipanggil di lingkungan SSR/Node (`if (typeof document === 'undefined') return;`).
       - Menyanitasi nomor via `sanitizeWhatsAppNumber(rawNumber)`.
       - Mencari seluruh elemen `document.querySelectorAll('a[data-wa-cta]')`, mempertahankan query string `?text=...` yang sudah ada pada masing-masing elemen, dan memperbarui domain/path menjadi `https://wa.me/${cleanNumber}${queryPart}`.
  3. **`src/services/contactService.js` *(Berkas Baru)*:**
     - `normalizeContactPayload(rawPayload)`:
       - Jika `rawPayload === null` (sinyal eksplisit `{"data": null}` saat seksi dinonaktifkan di CMS) atau `rawPayload?.is_active === false`, mengembalikan `{ isActive: false, contactItems: [], whatsappNumber: DEFAULT_WHATSAPP_NUMBER }`.
       - Jika bukan objek valid, mengembalikan `null` (memicu offline fallback).
       - Mengekstrak nilai `location`, `email`, dan `whatsapp` dari properti tingkat atas (`rawPayload.location`, `rawPayload.email`, `rawPayload.whatsapp`) atau dari koleksi `rawPayload.items` / `rawPayload.contacts` jika tersedia.
       - Jika ketiga nilai kosong sekaligus, mengembalikan `null` agar jatuh ke fallback `CONTACT_INFO`.
       - Menyanitasi nomor WhatsApp melalui `sanitizeWhatsAppNumber(whatsappValue)` dan membentuk array 3 slot `contactItems` (`Lokasi` dengan `iconName: 'MapPin'`, `Email` dengan `iconName: 'Mail'` & `href: mailto:...`, serta `WhatsApp` dengan `iconName: 'Phone'` & `href: buildWhatsAppUrl(cleanWa)`).
     - `getContactData({ forceRefresh = false } = {})`:
       - Menerapkan *In-Memory Singleton Promise Cache* (`cachedContactPromise`) sehingga pemanggilan serentak dari `Products.jsx` dan `Footer.jsx` hanya memicu **1x HTTP request** `apiGet('/contact')`.
       - Menyediakan helper `resetContactCache()` untuk isolasi pengujian unit.
       - Saat berhasil atau fallback, memanggil `syncStaticWhatsAppLinks(result.whatsappNumber)` jika berjalan di browser, lalu mengembalikan `{ isActive, contactItems, whatsappNumber, isFallback }`.

---

### 🎨 Fase 2: Reusable Design System Atoms (`src/components/ui/ProductDetailModal.jsx`)
* **Tujuan:** Menghapus hardcode nomor WhatsApp di dalam modal detail produk dan menghubungkannya ke generator terpusat `src/utils/whatsapp.js`.
* **Langkah Konkret:**
  - Memperbarui `src/components/ui/ProductDetailModal.jsx`:
    - Mengimpor `buildProductCheckoutUrl` dari `../../utils/whatsapp`.
    - Menambahkan prop `whatsappNumber` pada signature `export default function ProductDetailModal({ product, onClose, whatsappNumber })`.
    - Mengganti perakitan `orderUrl` manual (baris 149–151) menjadi:
      `const orderUrl = buildProductCheckoutUrl({ name, netto, price }, whatsappNumber);`

---

### 🏛️ Fase 3: Layout Sections (`Footer.jsx`, `Products.jsx`, `Plan.jsx`, `Stakes.jsx`, `FinalCTA.jsx`)
* **Tujuan:** Mengintegrasikan data kontak dinamis & *Inline Skeleton Shimmer* di `Footer.jsx`, serta menyinkronkan nomor WhatsApp aktif ke seluruh titik transaksi dan CTA.
* **Langkah Konkret:**
  1. **`src/components/sections/Footer.jsx`:**
     - Mengubah menjadi komponen reaktif (`useState`, `useEffect`) yang memanggil `getContactData()` dari `../../services/contactService`.
     - Menyimpan state `contactItems` (default `CONTACT_INFO`), `isActive` (default `true`), dan `isLoading` (default `true`).
     - Jika `isActive === true`:
       - Merender header sapaan (`"Ada Pertanyaan? Kami Siap Membantu."`).
       - Saat `isLoading === true`, merender **Inline Skeleton Shimmer 3 Slot Kontak** (`aria-hidden="true"`, `animate-pulse`) di atas latar hijau `bg-brand-primary` dengan ukuran kapsul yang presisi agar tidak terjadi *Layout Shift*.
       - Saat `isLoading === false`, merender daftar `contactItems`.
     - Jika `isActive === false`:
       - Menyembunyikan blok header sapaan & daftar kontak, serta menyesuaikan margin atas garis pembatas (`mt-0 pt-2`) agar blok bawah **Logo Resmi SiDeta & Copyright** tetap tampil rapi dan proporsional.
  2. **`src/components/sections/Products.jsx`:**
     - Mengimpor `getContactData` dari `../../services/contactService` dan `DEFAULT_WHATSAPP_NUMBER` dari `../../constants/data`.
     - Menambahkan state `const [whatsappNumber, setWhatsappNumber] = useState(DEFAULT_WHATSAPP_NUMBER);`.
     - Di dalam `useEffect`, memuat data kontak secara non-blocking (`getContactData().then(...)`) untuk memperbarui `whatsappNumber` dan meneruskannya ke `<ProductDetailModal product={selectedProduct} whatsappNumber={whatsappNumber} onClose={...} />`.
  3. **`src/components/sections/Plan.jsx`, `Stakes.jsx`, & `FinalCTA.jsx`:**
     - Mengganti string literal `'https://wa.me/6288802457102?text=...'` dengan `buildWhatsAppUrl(DEFAULT_WHATSAPP_NUMBER, '...')` dari `../../utils/whatsapp`.
     - Menambahkan atribut `data-wa-cta` pada elemen `<a href={WHATSAPP_MAIN} data-wa-cta target="_blank" rel="noopener noreferrer">`.

---

### 🌐 Fase 4: Page Assembly & Shell (`src/pages/index.astro` & `docs/RFC_DATA_CONTRACT_BACKEND.md`)
* **Tujuan:** Mengaktifkan hidrasi malas (*Lazy Viewport Hydration*) pada `Footer.jsx` dan menyelaraskan dokumentasi kontrak RFC dengan payload aktual Backend.
* **Langkah Konkret:**
  1. **`src/pages/index.astro`:**
     - Memperbarui baris 29 dari `<Footer />` menjadi `<Footer client:visible />`.
  2. **`docs/RFC_DATA_CONTRACT_BACKEND.md`:**
     - Memperbarui Seksi 2.4 (`GET /api/v1/contact`) agar mencerminkan kontrak aktual `ContactSectionResource.php` (`id`, `title`, `description`, `is_active`, `location`, `email`, `whatsapp`, `items`) beserta penjelasan sanitasi E.164 di `src/utils/whatsapp.js` dan perilaku visibilitas parsial saat `is_active: false` / `data: null`.

---

### 🧪 Fase 5: Quality Gate & Verification (`tests/test-api-services.mjs` & `tests/test-contact-ui.mjs`)
* **Tujuan:** Memverifikasi seluruh Invariant bisnis dan kualitas kode melalui unit test service dan Playwright E2E UI test.
* **Langkah Konkret:**
  1. **`tests/test-api-services.mjs`:**
     - Menambahkan rangkaian uji untuk `src/utils/whatsapp.js` (`sanitizeWhatsAppNumber` dengan input `0888-0245-7102`, `+62 888 0245 7102`, string invalid/kosong; `buildWhatsAppUrl`; `buildProductCheckoutUrl`).
     - Menambahkan rangkaian uji untuk `src/services/contactService.js` (`normalizeContactPayload` untuk 3 slot kontak, penanganan `is_active: false` dan `data: null`, deduplikasi promise `getContactData()`, serta offline fallback ke `CONTACT_INFO`).
  2. **`tests/test-contact-ui.mjs` *(Berkas Baru)*:**
     - Memverifikasi ketiadaan string hardcode `wa.me/6288802457102` di dalam `src/components/**`.
     - Memverifikasi keberadaan atribut `data-wa-cta` pada seksi statis (`Plan`, `Stakes`, `FinalCTA`) dan fungsionalitas `Footer.jsx` serta tombol checkout di `ProductDetailModal.jsx` menggunakan Playwright.
  3. **Eksekusi Gerbang Kualitas:**
     ```bash
     npm run lint
     node tests/test-api-services.mjs
     npm run build
     node tests/test-contact-ui.mjs
     ```

---

*Rencana arsitektur di atas telah dipetakan berdasarkan fakta repositori dan hasil validasi simbol LSP. Silakan ditelaah terlebih dahulu. Jika ada langkah yang ingin disederhanakan, kabari ya! Jika sudah mantap, silakan picu `/tdd` atau `/execute` kapan pun Anda siap.*
