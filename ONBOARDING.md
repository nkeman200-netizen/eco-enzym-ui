# 🚀 PANDUAN ONBOARDING DEVELOPER
## Eco-Enzyme Jeruklegi Landing Page (StoryBrand 7 Architecture)

Selamat datang di tim pengembang antarmuka **Eco-Enzyme Jeruklegi**!  
Dokumen ini disusun sebagai panduan langkah-demi-langkah bagi rekan tim, pengembang baru, atau adik tingkat yang baru melakukan kloning (*clone*) repositori ini agar dapat langsung berkontribusi dengan standar rekayasa *Enterprise*.

---

## 🛠️ 1. Prasyarat Lingkungan (System Prerequisites)

Sebelum memulai, pastikan perangkat lokal Anda telah terpasang:
* **Node.js**: Versi `18.x` atau lebih tinggi (disarankan Node LTS).
* **NPM**: Bawaan Node.js (`v9+` atau `v10+`).
* **Git**: Terpasang dan terkonfigurasi (`git config user.name` dan `user.email`).
* **Editor/IDE**: Disarankan VS Code / Google Antigravity dengan ekstensi Tailwind CSS dan ESLint/Oxlint.

---

## 📦 2. Langkah Instalasi Cepat (Quick Start)

Buka terminal favorit Anda dan jalankan perintah berikut:

```bash
# 1. Kloning repositori ke mesin lokal
git clone https://github.com/Protic-PNC/eco-enzyme-landing.git
cd eco-enzyme-landing

# 2. Pasang seluruh dependensi proyek
npm install

# 3. Jalankan server pengembangan lokal (Hot Module Replacement)
npm run dev
```

Buka peramban Anda di `http://localhost:5173`. Anda akan melihat antarmuka landing page 10 seksi StoryBrand 7.

---

## 🔍 3. Verifikasi Mutu & Build Lokal

Sebelum melakukan perubahan kode apa pun, pastikan lingkungan Anda dalam kondisi bersih (*green*):

```bash
# Pindai kesalahan sintaksis & standar kode (Wajib 0 error, 0 warning)
npm run lint

# Uji kompilasi bundle produksi Vite
npm run build

# Pratinjau hasil build produksi secara lokal
npm run preview
```

---

## 🤖 4. Konfigurasi Panca Indera AI (LSP & MCP Setup)

Repositori ini telah dibekali dengan konstitusi cerdas untuk berkolaborasi dengan AI coding assistant (Hermes / Antigravity).

### A. Pengaturan File Lingkungan Lokal (`.env`)
Salin atau buat file `.env` di *root* proyek (file ini otomatis diabaikan oleh git demi keamanan):

```bash
# .env (Local-Only - Jangan pernah di-commit ke Git)
GITHUB_PERSONAL_ACCESS_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

> **Cara membuat GitHub PAT:**  
> Buka GitHub ➔ *Settings* ➔ *Developer Settings* ➔ *Personal Access Tokens (Tokens classic)* ➔ Buat token baru dengan scope `repo` (Full control of private repositories). Tempelkan token tersebut di `.env` lokal Anda.

### B. Konfigurasi MCP Lokal (`.agents/mcp_config.json`)
Konfigurasi MCP telah terpasang secara otomatis di `.agents/mcp_config.json`. AI yang beroperasi di repositori ini secara otomatis dapat:
* Menavigasi simbol kode dan tipe data via `agent-lsp`.
* Membaca issue dan membantu menyusun draf PR via `@modelcontextprotocol/server-github`.
* Menguji interaksi UI dan screenshot tema via Playwright MCP.

### C. Pengujian Visual Smoke & Interaktivitas UI (Playwright Setup)
Untuk mengaktifkan pengujian interaktif browser nyata dan pencegahan layar terkunci (*Tier 4 Visual Smoke Gate* pada `/audit`), jalankan perintah:

```bash
# Pasang paket pengujian ke devDependencies dan unduh biner peramban Chromium
npm install -D @playwright/test && npx playwright install chromium
```

> 💡 **Catatan Ramah Laptop Fresh Clone:** Jika Anda belum menjalankan perintah ini di perangkat lokal, sesi `/audit` tetap berjalan aman dengan mengalihkan pengujian ke analisis kode statis (*Graceful Fallback*) sehingga tidak akan menghambat pengerjaan tugas maupun penerbitan PR Anda.

---

## 🏛️ 5. Peta Arsitektur & Aturan Main Utama

1. **Single Source of Truth (`src/constants/data.js`):**
   Seluruh teks narasi, data produk, daftar spesifikasi fisik, dan testimoni **TIDAK BOLEH** di-*hardcode* di dalam tag JSX komponen, melainkan wajib diimpor dari file konstanta ini.
2. **Pemisahan Komponen Atomik vs Seksi:**
   * `src/components/ui/`: Komponen kecil yang dapat digunakan kembali (`Button`, `ProductCard`, `ProductDetailModal`, `SectionWrapper`).
   * `src/components/sections/`: Blok tata letak 10 seksi narasi SB7 (`Hero`, `Problem`, `About`, `Products`, dll).
3. **Batasan Mutlak Repositori (Strictly Prohibited):**
   * ❌ DILARANG memasang pustaka routing eksternal (`react-router-dom`). Halaman ini murni SPA statis.
   * ❌ DILARANG memasang pustaka animasi berat pihak ketiga (`framer-motion`). Gunakan transisi CSS native dan Tailwind.
   * ❌ DILARANG mengubah status transaksi menjadi checkout keranjang belanja rumit. Semua pesanan diarahkan langsung ke WhatsApp (*frictionless direct checkout*).

---

## ⚔️ 6. Siklus Pengerjaan Fitur (Two-Gateway Pipeline)

Setiap pengerjaan fitur baru atau perbaikan wajib melalui gerbang terstruktur:

```
HULU (Ideasi & Tiket)                  HILIR (Implementasi & Kode)
/edeate ────────► Issue GitHub ──────► /grill-me ──► /plan ──► /execute ──► /audit ──► Pull Request
(Tanpa Git)       (Nomor Tiket)        (Branch Baru)
```

1. **Ideasi Fitur (`/edeate`):** Berdiskusi dengan AI untuk mematangkan kebutuhan hingga menjadi tiket resmi Level 3.
2. **Buka Branch Isolasi:** `git checkout -b feature/issue-<nomor>-<nama>`
3. **Wawancara Arsitektur (`/grill-me #<nomor>`):** AI akan mewawancarai kesiapan arsitektur dan trade-off sebelum koding.
4. **Perencanaan Langkah (`/plan`):** Merumuskan urutan modifikasi berkas.
5. **Eksekusi Bertahap (`/execute`):** Mengimplementasikan kode per langkah aman.
6. **Gerbang Kualitas (`/audit`):** Memvalidasi 5 dimensi mutu sebelum PR diajukan.

---

## 📚 7. Dokumentasi Rujukan Lanjutan

* `DEVELOPMENT_ROADMAP.md`: Peta jalan 3 Epik pengembangan sistem.
* `docs/TECHNICAL_RUNBOOK.md`: SOP lengkap pembaruan foto produk, izin PKRT, dan sertifikat lab.
* `docs/WHITE_PAPER_SB7.md`: Laporan akademik & landasan teori narasi StoryBrand 7.
* `docs/design-system.md`: Spesifikasi token warna Tailwind `@theme` dan tipografi lokal *Plus Jakarta Sans*.
* `.agents/rules/MASTER_RULES.md`: Konstitusi tertinggi sistem pengembangan AI.
