/**
 * Service Domain Kontak Operasional & Sinkronisasi Nomor WhatsApp
 *
 * Mengadopsi prinsip Separation of Concerns (SoC):
 * - Frontend fokus pada presentasi (Display) dan perakitan tautan aksi (Action Links).
 * - Menghormati struktur kontrak backend resmi (array `items`).
 * - Menyediakan Graceful Offline Fallback ke `CONTACT_INFO` lokal saat server down/offline.
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

const ICON_MAP = {
  location: 'MapPin',
  'map-pin': 'MapPin',
  email: 'Mail',
  mail: 'Mail',
  whatsapp: 'Phone',
  phone: 'Phone',
};

function mapIconName(typeOrIcon) {
  const key = String(typeOrIcon || '').toLowerCase();
  return ICON_MAP[key] || 'Phone';
}

function resolveItems(rawPayload) {
  if (Array.isArray(rawPayload.items) && rawPayload.items.length > 0) {
    return rawPayload.items;
  }
  // Dukungan sederhana untuk backward compatibility payload objek datar
  const items = [];
  if (rawPayload.location) items.push({ type: 'location', label: 'Lokasi', value: rawPayload.location });
  if (rawPayload.email) items.push({ type: 'email', label: 'Email', value: rawPayload.email });
  if (rawPayload.whatsapp) items.push({ type: 'whatsapp', label: 'WhatsApp', value: rawPayload.whatsapp });
  return items;
}

/**
 * Menormalisasi payload dari endpoint `GET /api/v1/contact`.
 *
 * @param {object|null} rawPayload - Objek `data` hasil respons backend
 * @returns {{ isActive: boolean, contactItems: Array<object>, whatsappNumber: string } | null}
 */
export function normalizeContactPayload(rawPayload) {
  if (rawPayload === null) {
    return {
      isActive: false,
      contactItems: [],
      whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
    };
  }

  if (!rawPayload || typeof rawPayload !== 'object') {
    return null;
  }

  const items = resolveItems(rawPayload);
  const waItem = items.find((item) => String(item.type || '').toLowerCase() === 'whatsapp');
  const cleanWhatsappNumber = sanitizeWhatsAppNumber(waItem?.value, DEFAULT_WHATSAPP_NUMBER);

  if (rawPayload.is_active === false) {
    return {
      isActive: false,
      contactItems: [],
      whatsappNumber: cleanWhatsappNumber,
    };
  }

  if (items.length === 0) {
    return null;
  }

  const contactItems = items.map((item) => {
    const type = String(item.type || '').toLowerCase();
    let href = null;

    if (type === 'whatsapp') {
      href = buildWhatsAppUrl(cleanWhatsappNumber);
    } else if (type === 'email') {
      href = `mailto:${item.value}`;
    }

    return {
      id: item.id,
      type,
      label: item.label || 'Kontak',
      value: item.value || '',
      href,
      iconName: mapIconName(item.icon_name || type),
    };
  });

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
 * Mengambil data kontak operasional dengan In-Memory Singleton Promise Cache
 * dan Graceful Offline Fallback ke `CONTACT_INFO` lokal.
 *
 * @param {object} [options={}]
 * @param {boolean} [options.forceRefresh=false]
 * @returns {Promise<{ isActive: boolean, contactItems: Array<object>, whatsappNumber: string, isFallback: boolean }>}
 */
export async function getContactData({ forceRefresh = false } = {}) {
  if (!forceRefresh && cachedContactPromise) {
    return cachedContactPromise;
  }

  cachedContactPromise = (async () => {
    const { data, error } = await apiGet('/contact');

    if (error) {
      console.warn(`[contactService] API backend tidak merespons (${error.message}). Mengaktifkan fallback ke CONTACT_INFO lokal.`);
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
      console.warn('[contactService] Payload kontak kosong atau tidak valid. Mengaktifkan fallback ke CONTACT_INFO lokal.');
      const fallbackResult = {
        isActive: SHOW_CONTACT,
        contactItems: CONTACT_INFO,
        whatsappNumber: DEFAULT_WHATSAPP_NUMBER,
        isFallback: true,
      };
      syncStaticWhatsAppLinks(fallbackResult.whatsappNumber);
      return fallbackResult;
    }

    syncStaticWhatsAppLinks(normalized.whatsappNumber);
    return {
      ...normalized,
      isFallback: false,
    };
  })();

  return cachedContactPromise;
}
