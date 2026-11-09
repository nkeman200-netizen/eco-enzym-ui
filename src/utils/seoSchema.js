/**
 * Utilitas Generator Schema.org JSON-LD (Dual-Sync: Build-Time + Live DOM)
 * & Perakitan Programmatic Alt Text Katalog Produk D2C
 *
 * Mengadopsi prinsip Zero New NPM Dependency & Zero-Crash Invariant:
 * - Mengubah path gambar relatif (/images/...) menjadi URL absolut (https://sanitasihijau.com/...)
 *   sambil tetap mempertahankan URL penuh dari storage API Backend.
 * - Mengekstrak harga numerik bersih ("Rp 15.000" -> "15000") dengan fallback "0" bebas NaN.
 * - Menyediakan sinkronisasi live DOM (#seo-json-ld) saat Products.jsx selesai fetch API.
 */

import {
  BRAND_IDENTITY,
  PRODUCTS,
  FAQ_ITEMS,
  CONTACT_INFO,
  DEFAULT_WHATSAPP_NUMBER,
} from '../constants/data.js';

export const SITE_URL = 'https://sanitasihijau.com';

export const DEFAULT_SEO_META = {
  title:
    'SiDeta (Sanitasi Hijau) — Sabun & Pembersih Alami Eco-Enzyme Desa Jeruklegi Cilacap',
  description:
    'Rangkaian sabun mandi non-SLS dan cairan pembersih lantai ramah lingkungan dari fermentasi Eco-Enzyme warga Desa Jeruklegi, Cilacap. Lembut di tangan, bebas residu kimia keras, dan aman untuk lantai tempat bayi merangkak.',
  keywords:
    'SiDeta, Sanitasi Hijau, Eco-Enzyme Jeruklegi Cilacap, sabun eco-enzyme alami, pembersih lantai aman untuk bayi merangkak, sabun alami non-SLS kulit sensitif, cairan pel eco-enzyme, pembersih rumah bebas residu kimia keras, UMKM Desa Jeruklegi',
};

const DEFAULT_SLIDE_CAPTIONS = [
  'Wujud Produk & Kemasan',
  'Tekstur & Busa Alami',
  'Label & Panduan Praktis',
];

/**
 * Mengonversi path relatif menjadi URL absolut dengan domain kanonis,
 * namun membiarkan URL absolut (http:// atau https://) dari Backend apa adanya.
 *
 * @param {string} pathOrUrl - Path relatif atau URL penuh
 * @param {string} [siteUrl=SITE_URL] - Domain kanonis utama
 * @returns {string} URL absolut yang valid
 */
export function toAbsoluteUrl(pathOrUrl, siteUrl = SITE_URL) {
  const cleanSite = String(siteUrl || SITE_URL).replace(/\/+$/, '');
  if (!pathOrUrl || typeof pathOrUrl !== 'string') {
    return `${cleanSite}/`;
  }

  const trimmed = pathOrUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const normalizedPath = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return `${cleanSite}${normalizedPath}`;
}

/**
 * Mengekstrak digit numerik murni dari string/number harga produk untuk Schema.org Offer.
 * Menjamin Zero-Crash & bebas NaN meskipun input malformed atau kosong.
 *
 * @param {string|number|null|undefined} rawPrice - Harga mentah (contoh: "Rp 15.000")
 * @returns {string} Digit numerik bersih (contoh: "15000", fallback "0")
 */
export function extractNumericPrice(rawPrice) {
  if (typeof rawPrice === 'number' && Number.isFinite(rawPrice) && rawPrice >= 0) {
    return String(Math.round(rawPrice));
  }

  if (typeof rawPrice !== 'string') {
    return '0';
  }

  // Hapus akhiran desimal khas rupiah seperti ",-" atau ",00" sebelum mengambil digit
  const cleaned = rawPrice.replace(/,[0-]+$/, '');
  const digits = cleaned.replace(/[^\d]/g, '');

  return digits.length > 0 ? digits : '0';
}

/**
 * Memetakan teks status stok menjadi URL Schema.org ItemAvailability yang valid.
 *
 * @param {string} [stockText=''] - Teks ketersediaan dari specs.stock
 * @returns {string} URL Schema.org InStock atau OutOfStock
 */
export function resolveSchemaAvailability(stockText = '') {
  const normalized = String(stockText || '').toLowerCase();
  if (normalized.includes('habis') || normalized.includes('kosong')) {
    return 'https://schema.org/OutOfStock';
  }
  return 'https://schema.org/InStock';
}

/**
 * Merakit atribut alt gambar produk secara otomatis (Programmatic Alt Template)
 * tanpa memerlukan perubahan payload dari API Backend.
 *
 * @param {object} product - Objek produk (name, benefit, specs)
 * @param {number} [imageIndex=0] - Indeks gambar (0 = utama, >=1 = sekunder/galeri)
 * @param {string} [customCaption=''] - Label sudut pandang opsional
 * @returns {string} Kalimat alt yang deskriptif dan kaya kata kunci D2C
 */
export function buildProductImageAlt(product, imageIndex = 0, customCaption = '') {
  const name = product?.name ? String(product.name).trim() : 'Produk Eco-Enzyme';
  const netto = product?.specs?.netto ? String(product.specs.netto).trim() : '';
  const benefit = product?.benefit ? String(product.benefit).trim() : '';

  const baseLabel = `${name} SiDeta Eco-Enzyme${netto ? ` (${netto})` : ''}`;

  if (imageIndex === 0 && !customCaption) {
    return benefit ? `${baseLabel} — ${benefit}` : `${baseLabel} — Produk Alami Desa Jeruklegi`;
  }

  const angleCaption =
    customCaption ||
    DEFAULT_SLIDE_CAPTIONS[imageIndex] ||
    `Tampilan Kemasan & Produk ${imageIndex + 1}`;

  return `${baseLabel} — ${angleCaption}`;
}

/**
 * Membangun objek Schema.org JSON-LD (@graph) terpadu yang mencakup:
 * 1. LocalBusiness (Identitas UMKM SiDeta Jeruklegi Cilacap)
 * 2. ItemList (Katalog Produk lengkap dengan Offer IDR & Availability)
 * 3. FAQPage (Daftar Pertanyaan & Jawaban Edukasi Warga)
 *
 * @param {object} [params={}] - Parameter sumber data
 * @returns {object} Objek JSON-LD siap serialisasi
 */
export function buildSeoJsonLd(params = {}) {
  const {
    products = PRODUCTS,
    contactData = null,
    faqItems = FAQ_ITEMS,
    siteUrl = SITE_URL,
  } = params;

  const safeProducts = Array.isArray(products) && products.length > 0 ? products : PRODUCTS;
  const safeFaqItems = Array.isArray(faqItems) && faqItems.length > 0 ? faqItems : FAQ_ITEMS;
  const contactItems = Array.isArray(contactData?.contactItems)
    ? contactData.contactItems
    : CONTACT_INFO;

  const emailItem = contactItems.find((item) => item?.type === 'email');
  const locationItem = contactItems.find((item) => item?.type === 'location');
  const rawWaNumber = contactData?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  const formattedPhone = String(rawWaNumber).startsWith('+')
    ? String(rawWaNumber)
    : `+${String(rawWaNumber).replace(/[^\d]/g, '')}`;

  const localBusinessNode = {
    '@type': 'LocalBusiness',
    '@id': `${toAbsoluteUrl('/', siteUrl)}#organization`,
    name: `${BRAND_IDENTITY.name} (${BRAND_IDENTITY.tagline}) — ${BRAND_IDENTITY.origin}`,
    description: DEFAULT_SEO_META.description,
    url: toAbsoluteUrl('/', siteUrl),
    logo: toAbsoluteUrl(BRAND_IDENTITY.logoFull, siteUrl),
    image: toAbsoluteUrl('/og-banner.webp', siteUrl),
    telephone: formattedPhone,
    email: emailItem?.value || 'info@sanitasihijau.com',
    priceRange: 'Rp10.000 - Rp20.000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: locationItem?.value || 'Desa Jeruklegi, Kec. Jeruklegi',
      addressLocality: 'Kabupaten Cilacap',
      addressRegion: 'Jawa Tengah',
      addressCountry: 'ID',
    },
  };

  const itemListNode = {
    '@type': 'ItemList',
    '@id': `${toAbsoluteUrl('/', siteUrl)}#katalog-produk`,
    name: 'Katalog Produk Alami Eco-Enzyme SiDeta Jeruklegi',
    itemListElement: safeProducts.map((product, index) => {
      const firstImage =
        Array.isArray(product?.images) && product.images.length > 0
          ? toAbsoluteUrl(product.images[0], siteUrl)
          : toAbsoluteUrl('/og-banner.webp', siteUrl);

      const descriptionText =
        product?.detail ||
        product?.description ||
        product?.benefit ||
        DEFAULT_SEO_META.description;

      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: `${product?.name || 'Produk Eco-Enzyme'} SiDeta`,
          description: descriptionText,
          image: firstImage,
          brand: {
            '@type': 'Brand',
            name: BRAND_IDENTITY.name,
          },
          offers: {
            '@type': 'Offer',
            url: `${toAbsoluteUrl('/', siteUrl)}#produk`,
            priceCurrency: 'IDR',
            price: extractNumericPrice(product?.price),
            availability: resolveSchemaAvailability(product?.specs?.stock),
          },
        },
      };
    }),
  };

  const faqPageNode = {
    '@type': 'FAQPage',
    '@id': `${toAbsoluteUrl('/', siteUrl)}#faq-section`,
    mainEntity: safeFaqItems.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [localBusinessNode, itemListNode, faqPageNode],
  };
}

/**
 * Memperbarui isi tag <script type="application/ld+json" id="seo-json-ld"> di DOM browser
 * begitu Products.jsx selesai mengambil data terbaru dari API Backend.
 *
 * @param {object} [params={}] - Data produk & kontak terbaru dari API
 * @param {Document} [doc] - Referensi document DOM (opsional untuk injeksi unit test)
 * @returns {boolean} true jika elemen ditemukan dan berhasil diperbarui
 */
export function syncSeoJsonLdInDom(params = {}, doc = typeof document !== 'undefined' ? document : null) {
  if (!doc || typeof doc.getElementById !== 'function') {
    return false;
  }

  const scriptEl = doc.getElementById('seo-json-ld');
  if (!scriptEl) {
    return false;
  }

  const updatedJsonLd = buildSeoJsonLd(params);
  scriptEl.textContent = JSON.stringify(updatedJsonLd);
  return true;
}
