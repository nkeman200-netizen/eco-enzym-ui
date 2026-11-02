/**
 * Service Domain Testimoni & Angka Dampak Lingkungan
 *
 * Mengimplementasikan prinsip Defense-in-Depth & Atomic All-or-Fallback Shield:
 * - Menangani normalisasi payload gabungan dari endpoint Laravel `GET /api/v1/testimonials`.
 * - Memetakan properti `description` dari backend ke `label` di frontend.
 * - Membaca flag visibilitas seksi (`is_active` / `data: null`) langsung dari payload backend.
 * - Menerapkan Atomic All-or-Fallback Shield: jika API offline, error, atau salah satu dari
 *   koleksi `statistics` maupun `testimonials` bernilai kosong, sistem otomatis mengembalikan
 *   paket data lokal terverifikasi (`SHOW_TESTIMONIALS`, `IMPACT_STATS` & `TESTIMONIALS`) agar
 *   seksi Social Proof tidak pernah tampil timpang atau kosong.
 */

import { apiGet } from './apiClient.js';
import { SHOW_TESTIMONIALS, IMPACT_STATS, TESTIMONIALS } from '../constants/data.js';

/**
 * Normalizer defensif untuk entri angka dampak lingkungan (statistik).
 * Memetakan properti `description` (backend) menjadi `label` (frontend).
 *
 * @param {object} raw - Objek statistik mentah dari API backend
 * @returns {{ id: string | number, value: string, label: string } | null}
 */
export function normalizeStatistic(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const value = String(raw.value ?? '').trim();
  const label = String(raw.description ?? raw.label ?? '').trim();

  if (!value || !label) {
    return null;
  }

  return {
    id: raw.id ?? `stat-${value}`,
    value,
    label,
  };
}

/**
 * Normalizer defensif untuk entri ulasan pelanggan (Clean Editorial Typography).
 * Menjamin ketiadaan properti usang `avatarInitial`.
 *
 * @param {object} raw - Objek testimoni mentah dari API backend
 * @returns {{ id: string | number, name: string, location: string, quote: string } | null}
 */
export function normalizeTestimonial(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  const name = String(raw.name ?? '').trim();
  const location = String(raw.location ?? '').trim();
  const quote = String(raw.quote ?? '').trim();

  if (!name || !quote) {
    return null;
  }

  return {
    id: raw.id ?? `testimoni-${name}`,
    name,
    location: location || 'Indonesia',
    quote,
  };
}

/**
 * Memvalidasi dan menormalisasi keseluruhan payload testimoni secara atomik.
 * - Jika backend secara eksplisit menonaktifkan seksi (`rawPayload === null` atau `is_active === false`),
 *   kembalikan `{ isActive: false, statistics: [], testimonials: [] }`.
 * - Menerapkan kebijakan Atomic All-or-Fallback: jika seksi aktif namun salah satu array kosong,
 *   kembalikan `null` agar pemanggil beralih ke fallback lokal utuh.
 *
 * @param {object | null} rawPayload - Objek data dari `apiGet('/testimonials')`
 * @returns {{ isActive: boolean, statistics: Array<object>, testimonials: Array<object> } | null}
 */
export function normalizeTestimonialsPayload(rawPayload) {
  if (rawPayload === null) {
    return {
      isActive: false,
      statistics: [],
      testimonials: [],
    };
  }

  if (typeof rawPayload !== 'object' || Array.isArray(rawPayload)) {
    return null;
  }

  if (rawPayload.is_active === false) {
    return {
      isActive: false,
      statistics: [],
      testimonials: [],
    };
  }

  const rawStats = Array.isArray(rawPayload.statistics) ? rawPayload.statistics : [];
  const rawTestis = Array.isArray(rawPayload.testimonials) ? rawPayload.testimonials : [];

  const statistics = rawStats.map(normalizeStatistic).filter(Boolean);
  const testimonials = rawTestis.map(normalizeTestimonial).filter(Boolean);

  // Kebijakan Atomic All-or-Fallback Shield: tolak paket yang timpang/kosong
  if (statistics.length === 0 || testimonials.length === 0) {
    return null;
  }

  return {
    isActive: Boolean(rawPayload.is_active ?? true),
    statistics,
    testimonials,
  };
}

/**
 * Mengambil data statistik dampak dan ulasan pelanggan dengan proteksi kegagalan mutlak.
 *
 * @returns {Promise<{ isActive: boolean, statistics: Array<object>, testimonials: Array<object>, isFallback: boolean }>}
 */
export async function getTestimonialsData() {
  const { data, error } = await apiGet('/testimonials');

  if (error) {
    console.warn(
      `[testimonialService] API backend tidak merespons (${error.message}). Mengaktifkan Atomic Fallback ke data lokal static.`
    );
    return {
      isActive: Boolean(SHOW_TESTIMONIALS),
      statistics: IMPACT_STATS,
      testimonials: TESTIMONIALS,
      isFallback: true,
    };
  }

  const normalized = normalizeTestimonialsPayload(data);

  if (!normalized) {
    console.warn(
      '[testimonialService] Payload API backend belum lengkap (statistik/testimoni kosong). Mengaktifkan Atomic Fallback ke data lokal static.'
    );
    return {
      isActive: Boolean(SHOW_TESTIMONIALS),
      statistics: IMPACT_STATS,
      testimonials: TESTIMONIALS,
      isFallback: true,
    };
  }

  return {
    isActive: normalized.isActive,
    statistics: normalized.statistics,
    testimonials: normalized.testimonials,
    isFallback: false,
  };
}
