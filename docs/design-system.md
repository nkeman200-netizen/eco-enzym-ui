# Design System & UI Guidelines

## 1. Typography (Strict Rule)
- **Primary Font:** `Plus Jakarta Sans`
- **Implementation:** WAJIB didownload dan diatur sebagai Local Assets di Vite (self-hosted). Dilarang menggunakan Google Fonts CDN (`<link>` tag di HTML) untuk mencegah Flash of Unstyled Text (FOUT) dan memastikan LCP optimal.
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700), ExtraBold (800).

## 2. Color Palette (Semantic Configuration)
Konfigurasi menggunakan `@theme` di `src/index.css` (Tailwind CSS v4) dengan semantic variables berikut:

- `brand-primary`: `#166D3B` (Deep Forest Green - tombol utama, header dark, teks aksen kuat)
- `brand-accent`: `#7CBE4D` (Vibrant Green - badge, ikon, border aksen)
- `surface-light`: `#F5F5F5` (Light Neutral - latar tombol dan input sekunder)
- `text-main`: `#222222` (Dark Charcoal - teks utama dan judul dengan kontras tinggi)
- `bg-base`: `#FFFFFF` (Pure White - latar belakang seksi genap: Problem, Products, Testimonials)
- `bg-warm`: `#FDFBF7` (Warm Organic Off-White - latar belakang seksi ganjil: Hero, About, Plan, SuccessVision untuk memberikan nuansa hangat alami dan menghilangkan kesan klinik dingin)

### Aturan Aksesibilitas Kontras (WCAG AA):
- Gunakan `brand-primary` (`#166D3B`) untuk teks di atas background terang (rasio kontras 5.9:1, lolos WCAG AA).
- Hindari penggunaan `brand-accent` (`#7CBE4D`) untuk teks kecil berukuran < 18px di atas background putih karena rasio kontrasnya hanya 2.1:1. Gunakan warna ini khusus untuk ikon, background badge, atau border dekoratif.

## 3. UI Components & Shapes (Atomic Design)
Sebelum membangun halaman, buat komponen reusable dasar ini di folder `src/components/ui/`:

- **Buttons:** 
  - Wajib menggunakan `rounded-full` (pill-shaped).
  - Wajib memiliki efek interaktif (contoh: `hover:bg-opacity-90 transition-all duration-200`).
- **Cards (Product & Info):**
  - Wajib menggunakan sudut membulat `rounded-2xl` atau `rounded-3xl`.
  - Gunakan shadow lembut bawaan tailwind (`shadow-sm` atau `shadow-md`) dan border tipis `border-gray-200`.
- **Icons:**
  - Hanya gunakan pustaka `lucide-react`. Atur ukuran dan stroke-width yang konsisten.

## 4. Layout & Grid System
- **Mobile-First:** Selalu mulai dengan styling untuk layar kecil.
- **Container:** Untuk layar desktop, bungkus konten utama dalam kontainer terpusat dengan maksimal lebar 1280px (Gunakan class `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`).
- **Spacing:** Gunakan skala spacing bawaan Tailwind secara konsisten (menggunakan kelipatan 4, misal `gap-4`, `p-6`, `mb-8`).