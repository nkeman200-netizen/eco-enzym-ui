# [ARCH] Issue #27: Optimasi On-Page SEO, JSON-LD Structured Data (API-First + Live Sync), Kata Kunci D2C & Asset Budget (< 150 KB)
- **Target GitHub Issue:** #27
- **Branch Terkait:** `refactor/issue-27-seo-jsonld-and-asset-budget`
- **Dokumen Rencana:** `docs/plan/issue-27-arch-seo-jsonld-and-asset-budget.md`

---

## 1. Ringkasan Eksekutif & Analogi Arsitektur

Bayangkan website **SiDeta (`https://sanitasihijau.com`)** adalah sebuah Toko Fisik di Desa Jeruklegi yang bangunannya sudah kokoh (berkat arsitektur Astro Islands di Epik 2), tetapi belum memasang **Papan Izin Masuk (`robots.txt`)**, **Peta Denah (`sitemap.xml`)**, dan **Katalog Resmi Berstempel (`JSON-LD Structured Data`)** untuk petugas sensus Google (**Googlebot**) serta kurir pratinjau WhatsApp (**Meta ExternalHit**).

Rencana implementasi **Bottom-Up** ini melengkapi seluruh fondasi SEO teknis, kurasi kata kunci organik D2C, pelurusan hierarki heading `H1–H3`, perakitan *Programmatic Alt Text* untuk produk dinamis (tanpa mengubah payload Backend API), serta kompresi 1 aset gambar yang masih melebihi batas `< 150 KB`.

---

## 2. Validasi Pramodifikasi via LSP (`agent-lsp`)

Berdasarkan inspeksi simbol AST (`mcp__agent_lsp__list_symbols`):
1. **`src/services/productService.js` (`getProducts` baris 73, `normalizeProduct` baris 21):**
   - Mengembalikan array objek produk terstandarisasi `{ id, name, price, detail, description, benefit, order, images, specs }`.
2. **`src/services/contactService.js` (`getContactData` baris 173, `normalizeContactPayload` baris 58):**
   - Mengembalikan `{ isActive, contactItems, whatsappNumber, isFallback }`.
3. **`src/components/ui/ProductCard.jsx` (`ProductCard` baris 15–132):**
   - Mendestrukturisasi `{ name, price, images, specs }` dari prop `product`. Akan ditambahkan `benefit` untuk merakit *Programmatic Alt Text* via `buildProductImageAlt(product, index)`.
4. **`src/components/ui/ProductDetailModal.jsx` (`ProductDetailModal` baris 49, `SLIDE_CAPTIONS` baris 31):**
   - Memiliki konstanta `SLIDE_CAPTIONS` (`['Wujud Produk & Kemasan', 'Tekstur & Busa Alami', 'Label & Panduan Praktis']`) yang siap diekspor/digunakan bersama `buildProductImageAlt`.
5. **`src/components/sections/Products.jsx` (`Products` baris 46, `loadProducts` baris 66):**
   - Di dalam `useEffect`, setelah `Promise.all([getProducts(), getContactData()])` selesai, akan memanggil `syncSeoJsonLdInDom({ products: data, contactData: contactResult })` agar perubahan harga/produk di CMS langsung memperbarui `<script id="seo-json-ld">` di DOM browser tanpa perlu rebuild manual di cPanel.
6. **`src/components/sections/About.jsx` (baris 51) & `src/components/sections/Faq.jsx` (baris 49 & 67):**
   - Meluruskan tag `<h4>` menjadi `<h3>` dengan mempertahankan class utilitas Tailwind yang 100% identik (Zero Visual Regression).

---

## 3. Hierarki Eksekusi Bottom-Up (5 Fase)

### Fase 1: Data Layer, Generator SEO Murni & Aset Statis (`src/utils/seoSchema.js`, `public/`, `astro.config.mjs`)
1. **Konfigurasi Domain Kanonis (`astro.config.mjs`):**
   - Menambahkan properti `site: 'https://sanitasihijau.com'` pada `defineConfig`.
2. **Pintu Masuk Crawler (`public/robots.txt` & `public/sitemap.xml`):**
   - Membuat `public/robots.txt` yang mengizinkan seluruh crawler (`User-agent: *`, `Allow: /`) dan menunjuk ke `Sitemap: https://sanitasihijau.com/sitemap.xml`.
   - Membuat `public/sitemap.xml` standar XML `urlset` untuk URL kanonis `https://sanitasihijau.com/`.
3. **Modul Utilitas SEO & JSON-LD (`src/utils/seoSchema.js`):**
   - `SITE_URL = 'https://sanitasihijau.com'` & `DEFAULT_SEO_META`: Menyimpan konfigurasi title, description, dan keywords D2C yang membidik 3 klaster kata kunci (*keamanan keluarga/bayi merangkak/non-SLS*, *produk fungsional eco-enzyme*, dan *identitas lokal SiDeta Jeruklegi Cilacap*).
   - `toAbsoluteUrl(pathOrUrl, siteUrl = SITE_URL)`: Mengubah path relatif (`/images/...`, `/og-banner.webp`) menjadi URL absolut `https://sanitasihijau.com/...`, namun membiarkan URL absolut (`https://admin.sanitasihijau.com/...`) dari API Backend tetap utuh.
   - `extractNumericPrice(rawPrice)`: Mengekstrak digit numerik murni dari string harga (`"Rp 15.000"` ➔ `"15000"`), dengan fallback defensif `"0"` jika input kosong/invalid agar tidak pernah menghasilkan `NaN`.
   - `resolveSchemaAvailability(stockText)`: Memetakan `specs.stock` menjadi `"https://schema.org/OutOfStock"` jika mengandung kata `"habis"` / `"kosong"`, dan default ke `"https://schema.org/InStock"`.
   - `buildProductImageAlt(product, imageIndex = 0, customCaption = '')`: Merakit atribut `alt` kaya kata kunci secara otomatis dari `{ name, benefit, specs.netto }` dan sudut foto (`SLIDE_CAPTIONS`).
   - `buildSeoJsonLd({ products, contactData, faqItems, siteUrl })`: Menghasilkan objek Schema.org `@graph` yang memuat:
     - `LocalBusiness` (`name`, `description`, `url`, `logo`, `image`, `telephone`, `email`, `address` Desa Jeruklegi Cilacap, `priceRange: "Rp10.000 - Rp20.000"`).
     - `ItemList` (daftar `ListItem` untuk setiap produk di katalog, masing-masing berisi `@type: "Product"`, `name`, `description`, `image` absolut, `brand`, dan `offers` bertipe `Offer` dengan `priceCurrency: "IDR"`, `price`, `availability`, dan `url`).
     - `FAQPage` (daftar `Question` & `acceptedAnswer` dari `FAQ_ITEMS`).
   - `syncSeoJsonLdInDom({ products, contactData, faqItems })`: Memperbarui `textContent` dari elemen `<script type="application/ld+json" id="seo-json-ld">` di browser secara aman saat `Products.jsx` selesai fetch API.
4. **Kompresi Aset Visual (`public/images/products/sabun-batang-3.webp`):**
   - Mengompresi ulang `sabun-batang-3.webp` dari `164.7 KB` menjadi `< 120 KB` agar seluruh 26 aset `.webp` mematuhi anggaran `< 150 KB`.

### Fase 2: Reusable Design System Atoms (`src/components/ui/ProductCard.jsx` & `src/components/ui/ProductDetailModal.jsx`)
1. **`src/components/ui/ProductCard.jsx`:**
   - Mengimpor `buildProductImageAlt` dari `../../utils/seoSchema`.
   - Mengganti `alt={name}` pada foto utama menjadi `alt={buildProductImageAlt(product, 0)}` dan pada foto kedua hover menjadi `alt={buildProductImageAlt(product, 1)}`.
2. **`src/components/ui/ProductDetailModal.jsx`:**
   - Mengimpor `buildProductImageAlt` dari `../../utils/seoSchema`.
   - Mengganti `alt` pada slide galeri utama dan thumbnail dari `${name} - foto ${idx + 1}` menjadi `buildProductImageAlt(product, idx, SLIDE_CAPTIONS[idx])`.

### Fase 3: Layout Sections (`src/components/sections/Products.jsx`, `About.jsx`, `Faq.jsx`)
1. **`src/components/sections/Products.jsx`:**
   - Mengimpor `syncSeoJsonLdInDom` dari `../../utils/seoSchema`.
   - Di dalam `loadProducts()`, memanggil `syncSeoJsonLdInDom({ products: data, contactData: contactResult })` setelah data produk dan kontak diterima dari service API.
2. **`src/components/sections/About.jsx` (baris 51):**
   - Mengubah tag `<h4 className="text-sm font-bold text-text-main">` menjadi `<h3 className="text-sm font-bold text-text-main">`.
3. **`src/components/sections/Faq.jsx` (baris 49 & 67):**
   - Mengubah `<span className="text-base sm:text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors">` pada pertanyaan `<summary>` menjadi `<h3 className="text-base sm:text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors m-0">`.
   - Mengubah `<h4 className="text-base font-bold text-text-main">` pada callout bantuan WhatsApp menjadi `<h3 className="text-base font-bold text-text-main">`.

### Fase 4: Page Assembly & Shell (`src/layouts/BaseLayout.astro`)
1. **`src/layouts/BaseLayout.astro`:**
   - Di frontmatter Astro (`---`), memanggil `await Promise.all([getProducts(), getContactData()])` dan merakit `jsonLdObject = buildSeoJsonLd({ products, contactData, faqItems: FAQ_ITEMS })`.
   - Menyempurnakan default `title`, `description`, dan `keywords` menggunakan `DEFAULT_SEO_META`.
   - Menambahkan `<link rel="canonical" href={canonicalUrl} />`, `<meta property="og:url" content={canonicalUrl} />`, `<meta property="og:locale" content="id_ID" />`, `<meta property="og:site_name" content="SiDeta - Sanitasi Hijau Jeruklegi" />`, `<meta name="twitter:card" content="summary_large_image" />`, dan mengubah `og:image` menjadi URL absolut `toAbsoluteUrl('/og-banner.webp')`.
   - Menyuntikkan `<script type="application/ld+json" id="seo-json-ld" set:html={JSON.stringify(jsonLdObject)} />` di dalam `<head>`.

### Fase 5: Quality Gate & Verification (`tests/test-seo-and-assets.mjs`, `npm run lint`, `npm run build`)
1. Membuat suite pengujian otomatis `tests/test-seo-and-assets.mjs` yang menguji:
   - Ketahanan `toAbsoluteUrl`, `extractNumericPrice` (termasuk input malformed/null), `resolveSchemaAvailability`, dan `buildProductImageAlt`.
   - Struktur `@graph` JSON-LD (`LocalBusiness`, `ItemList` 8 produk, `FAQPage` 4 item) serta fungsi `syncSeoJsonLdInDom`.
   - Keberadaan dan isi `public/robots.txt`, `public/sitemap.xml`, `astro.config.mjs`, dan tag kanonis/OG/JSON-LD pada `BaseLayout.astro`.
   - Kepatuhan hierarki heading `H1–H3` di `About.jsx` dan `Faq.jsx`.
   - Anggaran ukuran aset `< 150 KB` untuk seluruh file `.webp` di `public/images/`.
2. Menjalankan `npm run lint` (`oxlint`) dan `npm run build` untuk memastikan `dist/index.html`, `dist/robots.txt`, dan `dist/sitemap.xml` tercetak sempurna dengan 0 error.

---

## 4. Sisi Gelap & Biaya Laten (Trade-Offs)
- **Zero New NPM Dependency:** Tidak ada penambahan paket di `package.json` (`0 KB` bloat library pihak ketiga).
- **Biaya Sinkronisasi DOM Ringan (~1 KB):** Fungsi `syncSeoJsonLdInDom` berjalan satu kali setelah `Products.jsx` menyelesaikan `fetch` API (`O(N)` terhadap jumlah produk, < 1 milidetik di browser).
