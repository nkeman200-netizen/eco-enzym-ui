/**
 * Service Domain Produk & Graceful Offline Fallback Shield
 *
 * Mengimplementasikan prinsip Defense-in-Depth & Zero-Crash UX:
 * - Menangani normalisasi payload dari backend Laravel ke skema UI Astro.
 * - Mengamankan invariant properti rentan (specs: object, images: array).
 * - Mengaktifkan saklar otomatis (Automatic Fallback) ke data lokal `PRODUCTS`
 *   apabila backend offline, response non-200, atau mengalami network timeout.
 */

import { apiGet } from './apiClient.js';
import { PRODUCTS } from '../constants/data.js';

/**
 * Normalizer defensif untuk membersihkan anomali data produk.
 * Mencegah error runtime "Cannot read properties of undefined".
 *
 * @param {object} raw - Objek produk mentah dari API backend
 * @returns {object} Objek produk terstandarisasi siap konsumsi UI
 */
export function normalizeProduct(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  // Jaminan invariant images: selalu berupa array
  let safeImages = [];
  if (Array.isArray(raw.images)) {
    safeImages = raw.images.map((img) => (typeof img === 'string' ? img : img?.image_url || '')).filter(Boolean);
  } else {
    if (raw.image_url) safeImages.push(raw.image_url);
    if (Array.isArray(raw.detail_images)) {
      raw.detail_images.forEach((di) => {
        const url = typeof di === 'string' ? di : di?.image_url;
        if (url) safeImages.push(url);
      });
    }
  }

  // Jaminan invariant specs: selalu berupa objek non-null
  const safeSpecs = raw.specs && typeof raw.specs === 'object' && !Array.isArray(raw.specs)
    ? raw.specs
    : {};

  // Format harga yang aman (string atau number)
  let safePrice = raw.price;
  if (typeof safePrice === 'number') {
    safePrice = `Rp ${safePrice.toLocaleString('id-ID')}`;
  } else if (typeof safePrice === 'string' && safePrice.trim() !== '') {
    safePrice = safePrice.trim();
  } else {
    safePrice = 'Rp 0';
  }

  return {
    id: raw.id ?? 0,
    name: raw.name || 'Produk Eco-Enzyme',
    price: safePrice,
    detail: raw.detail || raw.description || '',
    description: raw.description || '',
    benefit: raw.benefit || '',
    order: raw.order ?? 0,
    images: safeImages,
    specs: safeSpecs,
  };
}

/**
 * Mengambil daftar produk katalog dengan proteksi kegagalan mutlak (0% White-Screen).
 *
 * @returns {Promise<Array<object>>} Daftar produk (dari remote API atau fallback lokal)
 */
export async function getProducts() {
  const { data, error } = await apiGet('/products');

  // Jika koneksi gagal, timeout, atau format data tidak valid
  if (error || !data) {
    if (error) {
      console.warn(
        `[productService] API backend tidak merespons (${error.message}). Mengaktifkan fallback ke data lokal static.`
      );
    }
    return PRODUCTS;
  }

  // Tangani fleksibilitas payload: koleksi seksi Laravel [{ id, products: [...] }] atau flat array produk
  let productList = [];
  if (Array.isArray(data)) {
    if (data.length > 0 && Array.isArray(data[0]?.products)) {
      // Format koleksi ProductSection Laravel eksisting (eco-enzyme-be)
      productList = data.flatMap((sec) => sec.products || []);
    } else {
      // Format flat array produk murni
      productList = data;
    }
  } else {
    console.warn(
      '[productService] Payload API backend tidak sesuai format array. Mengaktifkan fallback ke data lokal static.'
    );
    return PRODUCTS;
  }

  // Jika remote mengembalikan katalog kosong, amankan dengan fallback lokal
  if (productList.length === 0) {
    console.warn('[productService] Remote API mengembalikan katalog kosong. Menggunakan data lokal static.');
    return PRODUCTS;
  }

  // Normalisasi seluruh item produk yang diterima
  const normalizedProducts = productList.map(normalizeProduct).filter(Boolean);

  return normalizedProducts.length > 0 ? normalizedProducts : PRODUCTS;
}
