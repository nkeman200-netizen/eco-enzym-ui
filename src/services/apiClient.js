/**
 * Service API Client Layer — Generic Transport Module
 *
 * Mengadopsi standar isomorphic Web Fetch API (WinterCG) tanpa dependensi eksternal:
 * - Safe Result Tuple Pattern: Selalu mengembalikan { data, error }, tanpa uncaught throw.
 * - Batas waktu ketat (strict timeout) via AbortController untuk mencegah thread menggantung.
 * - Resolusi alamat URL cerdas: membaca PUBLIC_API_URL dengan fallback resmi ke domain produksi.
 * - Universal runtime: kompatibel penuh di Node.js 22/24 (Astro SSR/Build) & Browser (React 19 Islands).
 */

const rawEnvUrl =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PUBLIC_API_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.PUBLIC_API_URL) ||
  '';

export const API_BASE_URL = (rawEnvUrl || 'https://sanitasihijau.com/api/v1').replace(/\/+$/, '');

/**
 * Melakukan HTTP GET request secara defensif.
 *
 * @param {string} endpoint - Jalur API relatif (contoh: '/products')
 * @param {object} [options={}] - Konfigurasi tambahan
 * @param {number} [options.timeout=3000] - Batas waktu request dalam milidetik
 * @returns {Promise<{ data: any, error: Error | null }>}
 */
export async function apiGet(endpoint, options = {}) {
  const { timeout = 3000 } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const targetUrl = `${API_BASE_URL}${cleanEndpoint}`;

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      return {
        data: null,
        error: new Error(`HTTP Error ${response.status}: ${response.statusText || 'Request Failed'}`),
      };
    }

    const payload = await response.json();
    
    // Tangani Laravel Standard Data Envelope {"data": ...} jika tersedia
    const responseData =
      payload !== null && typeof payload === 'object' && 'data' in payload
        ? payload.data
        : payload;

    return {
      data: responseData,
      error: null,
    };
  } catch (err) {
    clearTimeout(timer);
    const isTimeout = err?.name === 'AbortError';
    return {
      data: null,
      error: new Error(isTimeout ? `Request Timeout (${timeout}ms exceeded)` : (err?.message || 'Network Request Failed')),
    };
  }
}
