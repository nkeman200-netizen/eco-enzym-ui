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
    safeImages = raw.images.filter(Boolean);
  } else if (typeof raw.image === 'string' && raw.image.trim() !== '') {
    safeImages = [raw.image];
  }

  // Jaminan invariant specs: selalu berupa objek non-null
  const safeSpecs = raw.specs && typeof raw.specs === 'object' && !Array.isArray(raw.specs)
    ? raw.specs
    : {};

  return {
    id: raw.id ?? 0,
    name: raw.name || 'Produk Eco-Enzyme',
    price: typeof raw.price === 'number' ? raw.price : Number(raw.price) || 0,
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

  // Jika koneksi gagal, timeout, atau format data bukan array
  if (error || !Array.isArray(data)) {
    if (error) {
      console.warn(
        `[productService] API backend tidak merespons (${error.message}). Mengaktifkan fallback ke data lokal static.`
      );
    } else {
      console.warn(
        '[productService] Payload API backend tidak sesuai format array. Mengaktifkan fallback ke data lokal static.'
      );
    }

    // Kembalikan Single Source of Truth lokal yang selalu valid
    return PRODUCTS;
  }

  // Jika remote mengembalikan array kosong, amankan dengan fallback lokal
  if (data.length === 0) {
    console.warn('[productService] Remote API mengembalikan katalog kosong. Menggunakan data lokal static.');
    return PRODUCTS;
  }

  // Normalisasi seluruh item produk yang diterima
  const normalizedProducts = data.map(normalizeProduct).filter(Boolean);

  return normalizedProducts.length > 0 ? normalizedProducts : PRODUCTS;
}
