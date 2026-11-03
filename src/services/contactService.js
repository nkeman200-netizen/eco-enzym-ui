/**
 * Service Domain Kontak Operasional & Sinkronisasi Nomor WhatsApp
 *
 * Mengimplementasikan prinsip Defense-in-Depth & Single-Flight Deduplication:
 * - Menarik data kontak dari endpoint publik `GET /api/v1/contact`.
 * - Menggunakan In-Memory Singleton Promise Cache agar pemanggilan dari beberapa
 *   komponen (`Products.jsx` & `Footer.jsx`) hanya memicu maksimal 1x HTTP request.
 * - Menghormati flag visibilitas `is_active: false` atau `data: null` dari CMS Backend.
 * - Menjamin kontinuitas nomor kasir WhatsApp via `sanitizeWhatsAppNumber` dan
 *   menyinkronkan tombol-tombol statis (`[data-wa-cta]`) di halaman.
 */

import { apiGet } from './apiClient.js';
import {
  CONTACT_INFO,
  DEFAULT_WHATSAPP_NUMBER,
  SHOW_CONTACT,
} from '../constants/data.js';
import {
  buildWhatsAppUrl,
  sanitizeWhatsAppNumber,
  syncStaticWhatsAppLinks,
} from '../utils/whatsapp.js';

let cachedContactPromise = null;

/**
 * Mengekstrak nilai string berdasarkan tipe item dari koleksi `items` / `contacts`
 * apabila properti ringkas tingkat atas tidak tersedia.
 *
 * @param {Array} items - Array item kontak dari payload backend
 * @param {string} targetType - Tipe item ('location' | 'email' | 'whatsapp')
 * @returns {string} Nilai string yang bersih atau string kosong
 */
function extractFromItems(items, targetType) {
  if (!Array.isArray(items)) return '';
  const found = items.find(
    (item) =>
      item &&
      typeof item === 'object' &&
      String(item.type || '').toLowerCase() === targetType
  );
  return found && found.value ? String(found.value).trim() : '';
}

/**
 * Menormalisasi payload `data` dari endpoint `GET /api/v1/contact`.
 *
 * Kontrak Visibilitas Backend (`eco-enzyme-be`):
 * - Ketika seksi kontak dinonaktifkan di CMS, controller mengembalikan HTTP 200 dengan
 *   `{"data": null}` (atau `is_active: false`).
 * - Kondisi tersebut dikenali sebagai sinyal sah `{ isActive: false }` tanpa memicu fallback error,
 *   sedangkan `whatsappNumber` tetap diamankan ke `DEFAULT_WHATSAPP_NUMBER` agar transaksi tidak putus.
 *
 * @param {object|null} rawPayload - Objek `data` hasil unwrapping `apiGet('/contact')`
 * @returns {{ isActive: boolean, contactItems: Array<object>, whatsappNumber: string } | null}
 */
export function normalizeContactPayload(rawPayload) {
  // Sinyal eksplisit dari backend saat seksi kontak dinonaktifkan (data: null)
  if (rawPayload === null) {
    return {
      isActive: false,
      contactItems: [],
      whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
    };
  }

  if (!rawPayload || typeof rawPayload !== 'object' || Array.isArray(rawPayload)) {
    return null;
  }

  // Jika flag is_active dikirim bernilai false secara eksplisit oleh backend
  if (rawPayload.is_active === false) {
    const rawWa =
      rawPayload.whatsapp ||
      rawPayload.whatsapp_number ||
      extractFromItems(rawPayload.items || rawPayload.contacts, 'whatsapp');

    return {
      isActive: false,
      contactItems: [],
      whatsappNumber: sanitizeWhatsAppNumber(rawWa, DEFAULT_WHATSAPP_NUMBER),
    };
  }

  const itemsList = Array.isArray(rawPayload.items)
    ? rawPayload.items
    : Array.isArray(rawPayload.contacts)
      ? rawPayload.contacts
      : [];

  const locationValue = String(
    rawPayload.location ?? extractFromItems(itemsList, 'location') ?? ''
  ).trim();
  const emailValue = String(
    rawPayload.email ?? extractFromItems(itemsList, 'email') ?? ''
  ).trim();
  const whatsappDisplay = String(
    rawPayload.whatsapp ?? extractFromItems(itemsList, 'whatsapp') ?? ''
  ).trim();

  // Jika seluruh 3 slot utama kosong, tolak payload agar beralih ke fallback utuh
  if (!locationValue && !emailValue && !whatsappDisplay) {
    return null;
  }

  const fallbackLocation =
    CONTACT_INFO.find((c) => c.type === 'location')?.value ||
    'Desa Jeruklegi, Jawa Tengah';
  const fallbackEmail =
    CONTACT_INFO.find((c) => c.type === 'email')?.value ||
    'halo@ecoenzyme-jeruklegi.id';
  const fallbackWaDisplay =
    CONTACT_INFO.find((c) => c.type === 'whatsapp')?.value ||
    '+62 888 0245 7102';

  const finalLocation = locationValue || fallbackLocation;
  const finalEmail = emailValue || fallbackEmail;
  const finalWaDisplay = whatsappDisplay || fallbackWaDisplay;

  const cleanWhatsappNumber = sanitizeWhatsAppNumber(
    rawPayload.whatsapp_number || finalWaDisplay,
    DEFAULT_WHATSAPP_NUMBER
  );

  const contactItems = [
    {
      type: 'location',
      label: 'Lokasi',
      value: finalLocation,
      href: null,
      iconName: 'MapPin',
    },
    {
      type: 'email',
      label: 'Email',
      value: finalEmail,
      href: `mailto:${finalEmail}`,
      iconName: 'Mail',
    },
    {
      type: 'whatsapp',
      label: 'WhatsApp',
      value: finalWaDisplay,
      href: buildWhatsAppUrl(cleanWhatsappNumber),
      iconName: 'Phone',
    },
  ];

  return {
    isActive: true,
    contactItems,
    whatsappNumber: cleanWhatsappNumber,
  };
}

/**
 * Mereset cache promise in-memory (khusus untuk isolasi skenario pengujian).
 */
export function resetContactCache() {
  cachedContactPromise = null;
}

/**
 * Mengambil data kontak operasional dan nomor WhatsApp kasir aktif
 * dengan deduplikasi request (In-Memory Singleton Promise Cache) dan
 * Graceful Offline Fallback ke `CONTACT_INFO` lokal.
 *
 * @param {object} [options={}]
 * @param {boolean} [options.forceRefresh=false] - Paksa request ulang tanpa cache
 * @returns {Promise<{ isActive: boolean, contactItems: Array<object>, whatsappNumber: string, isFallback: boolean }>}
 */
export async function getContactData({ forceRefresh = false } = {}) {
  if (!forceRefresh && cachedContactPromise) {
    return cachedContactPromise;
  }

  cachedContactPromise = (async () => {
    const { data, error } = await apiGet('/contact');

    if (error) {
      console.warn(
        `[contactService] API backend tidak merespons (${error.message}). Mengaktifkan fallback ke CONTACT_INFO lokal.`
      );
      const fallbackResult = {
        isActive: SHOW_CONTACT,
        contactItems: CONTACT_INFO,
        whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
        isFallback: true,
      };
      syncStaticWhatsAppLinks(fallbackResult.whatsappNumber);
      return fallbackResult;
    }

    const normalized = normalizeContactPayload(data);

    if (!normalized) {
      console.warn(
        '[contactService] Payload kontak tidak valid atau kosong. Mengaktifkan fallback ke CONTACT_INFO lokal.'
      );
      const fallbackResult = {
        isActive: SHOW_CONTACT,
        contactItems: CONTACT_INFO,
        whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
        isFallback: true,
      };
      syncStaticWhatsAppLinks(fallbackResult.whatsappNumber);
      return fallbackResult;
    }

    const activeResult = {
      isActive: normalized.isActive,
      contactItems: normalized.contactItems,
      whatsappNumber: normalized.whatsappNumber,
      isFallback: false,
    };

    syncStaticWhatsAppLinks(activeResult.whatsappNumber);
    return activeResult;
  })();

  return cachedContactPromise;
}
