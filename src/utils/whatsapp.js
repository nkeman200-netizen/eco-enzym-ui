/**
 * Sentralisasi Generator Tautan & Sanitasi Nomor WhatsApp (E.164)
 *
 * Menjamin seluruh titik transaksi (ProductDetailModal, Footer, Plan, Stakes, FinalCTA)
 * selalu mengarah ke format URL `https://wa.me/62...` yang sah dan tersinkronisasi,
 * bebas dari risiko Split-Brain / Dead-Number.
 */

import { DEFAULT_WHATSAPP_NUMBER } from '../constants/data.js';

/**
 * Menyanitasi string nomor telepon (misal "+62 888-0245-7102" atau "0888 0245 7102")
 * menjadi format digit E.164 Indonesia murni ("6288802457102").
 *
 * Jika input kosong, rusak, atau kurang dari 9 digit setelah kode negara,
 * fungsi otomatis kembali ke `fallback` (`DEFAULT_WHATSAPP_NUMBER`).
 *
 * @param {string|number|null|undefined} rawNumber - Nomor telepon mentah dari CMS/API
 * @param {string} [fallback=DEFAULT_WHATSAPP_NUMBER] - Nomor cadangan resmi
 * @returns {string} Nomor E.164 bersih berawalan 62
 */
export function sanitizeWhatsAppNumber(rawNumber, fallback = DEFAULT_WHATSAPP_NUMBER) {
  if (rawNumber === null || rawNumber === undefined) {
    return fallback;
  }

  let digits = String(rawNumber).replace(/\D/g, '');

  if (digits.startsWith('08')) {
    digits = `62${digits.slice(1)}`;
  } else if (digits.startsWith('8')) {
    digits = `62${digits}`;
  }

  // Validasi Invariant E.164 Indonesia: diawali 62 diikuti 8–13 digit
  if (!/^62\d{8,13}$/.test(digits)) {
    return fallback;
  }

  return digits;
}

/**
 * Merakit URL WhatsApp (`https://wa.me/<number>`) dengan teks pesan opsional.
 *
 * @param {string|number|null|undefined} rawNumber - Nomor tujuan WhatsApp
 * @param {string} [message=''] - Teks pesan sapaan otomatis (belum di-encode)
 * @returns {string} URL lengkap `https://wa.me/...`
 */
export function buildWhatsAppUrl(rawNumber, message = '') {
  const cleanNumber = sanitizeWhatsAppNumber(rawNumber);
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!trimmedMessage) {
    return `https://wa.me/${cleanNumber}`;
  }

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(trimmedMessage)}`;
}

/**
 * Merakit URL checkout WhatsApp kontekstual untuk produk tertentu.
 *
 * @param {object} product - Objek produk (`{ name, netto, price, specs }`)
 * @param {string|number|null|undefined} [rawNumber=DEFAULT_WHATSAPP_NUMBER] - Nomor WhatsApp kasir aktif
 * @returns {string} URL checkout WhatsApp produk
 */
export function buildProductCheckoutUrl(product = {}, rawNumber = DEFAULT_WHATSAPP_NUMBER) {
  const name = product?.name || 'Produk Eco-Enzyme';
  const netto = product?.netto || product?.specs?.netto || 'Standar';
  const price = product?.price || 'Rp 0';

  const message = `Halo, saya tertarik pesan ${name} (${netto}) seharga ${price} Eco-Enzyme Jeruklegi.`;
  return buildWhatsAppUrl(rawNumber, message);
}

/**
 * Menyinkronkan seluruh elemen anchor statis (`<a data-wa-cta>`) di DOM
 * ke nomor WhatsApp terbaru dari API tanpa membebani halaman dengan React Hydration.
 *
 * Mempertahankan query parameter `?text=...` spesifik pada masing-masing tombol.
 *
 * @param {string|number|null|undefined} rawNumber - Nomor WhatsApp aktif terbaru
 */
export function syncStaticWhatsAppLinks(rawNumber) {
  if (typeof document === 'undefined') {
    return;
  }

  const cleanNumber = sanitizeWhatsAppNumber(rawNumber);
  const anchors = document.querySelectorAll('a[data-wa-cta]');

  anchors.forEach((anchor) => {
    const currentHref = anchor.getAttribute('href') || '';
    const queryIndex = currentHref.indexOf('?');
    const queryPart = queryIndex !== -1 ? currentHref.slice(queryIndex) : '';
    anchor.setAttribute('href', `https://wa.me/${cleanNumber}${queryPart}`);
  });
}
