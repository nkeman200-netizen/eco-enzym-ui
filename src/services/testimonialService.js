/**
 * Service Domain Testimoni & Angka Dampak Lingkungan
 *
 * Mengimplementasikan prinsip Defense-in-Depth & Atomic All-or-Fallback Shield:
 * - Menangani normalisasi payload gabungan dari endpoint Laravel `GET /api/v1/testimonials`.
 * - Memetakan properti `description` dari backend ke `label` di frontend.
 * - Menerapkan Atomic All-or-Fallback Shield: jika API offline, error, atau salah satu dari
 *   koleksi `statistics` maupun `testimonials` bernilai kosong, sistem otomatis mengembalikan
 *   paket data lokal terverifikasi (`IMPACT_STATS` & `TESTIMONIALS`) agar seksi Social Proof
 *   tidak pernah tampil timpang atau kosong.
 */

import { apiGet } from './apiClient.js';
import { IMPACT_STATS, TESTIMONIALS } from '../constants/data.js';

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
 * Menerapkan kebijakan Atomic All-or-Fallback: jika salah satu array kosong,
 * kembalikan `null` agar pemanggil beralih ke fallback lokal utuh.
 *
 * @param {object} rawPayload - Objek data dari `apiGet('/testimonials')`
 * @returns {{ statistics: Array<object>, testimonials: Array<object> } | null}
 */
export function normalizeTestimonialsPayload(rawPayload) {
  if (!rawPayload || typeof rawPayload !== 'object') {
    return null;
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
    statistics,
    testimonials,
  };
}

/**
 * Mengambil data statistik dampak dan ulasan pelanggan dengan proteksi kegagalan mutlak.
 *
 * @returns {Promise<{ statistics: Array<object>, testimonials: Array<object>, isFallback: boolean }>}
 */
export async function getTestimonialsData() {
  const { data, error } = await apiGet('/testimonials');

  if (error || !data) {
    if (error) {
      console.warn(
        `[testimonialService] API backend tidak merespons (${error.message}). Mengaktifkan Atomic Fallback ke data lokal static.`
      );
    }
    return {
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
      statistics: IMPACT_STATS,
      testimonials: TESTIMONIALS,
      isFallback: true,
    };
  }

  return {
    statistics: normalized.statistics,
    testimonials: normalized.testimonials,
    isFallback: false,
  };
}
