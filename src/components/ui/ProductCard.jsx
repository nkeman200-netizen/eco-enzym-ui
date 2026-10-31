import React, { useState } from 'react';
import { Droplets } from 'lucide-react';

/**
 * ProductCard component
 *
 * Mengikuti standar brand D2C & e-commerce modern (seperti Footstep Footwear & Sensatia):
 * - Visual kartu luar bersih, elegan, dan fokus pada keindahan produk
 * - Foto utama (images[0]) memiliki animasi cross-fade / fade-in mulus ke foto kedua (images[1]) saat hover
 * - Menghilangkan deskripsi panjang, benefit, badge, dan tombol CTA dari kartu luar
 * - Menampilkan nama produk, ukuran netto, dan harga tanpa embel-embel teks "Harga Komunitas"
 * - Seluruh kartu intuitif diklik untuk membuka modal detail & spesifikasi lengkap
 * - Fallback elegan ke ikon produk bawaan jika foto belum tersedia
 */
export default function ProductCard({
  product,
  onSelect,
  fallbackIcon: IconComponent = Droplets,
  isLoading = false,
}) {
  const [primaryFailed, setPrimaryFailed] = useState(false);
  const [secondaryFailed, setSecondaryFailed] = useState(false);

  // Early Return Skeleton Loader: Menjamin dimensi 1:1 dan Zero Layout Shift (CLS 0.00)
  if (isLoading) {
    return (
      <div
        className="bg-[#FDFBF7] rounded-3xl border border-brand-accent/20 p-4 sm:p-5 flex flex-col justify-between h-full animate-pulse select-none"
        aria-hidden="true"
      >
        <div>
          {/* Wadah Skeleton Gambar: identik 1:1 dengan kontainer foto kartu asli */}
          <div className="w-full aspect-square rounded-2xl bg-brand-accent/10 border border-brand-accent/15" />

          {/* Balok Skeleton Teks & Metadata */}
          <div className="mt-4 flex flex-col gap-2">
            {/* Skeleton Netto */}
            <div className="h-3 bg-brand-accent/10 rounded w-1/4" />
            {/* Skeleton Nama Produk */}
            <div className="h-5 bg-brand-accent/15 rounded-md w-3/4" />
            {/* Skeleton Harga */}
            <div className="h-6 bg-brand-accent/15 rounded-lg w-1/2 mt-2" />
          </div>
        </div>
      </div>
    );
  }

  const {
    name = '',
    price = '',
    images = [],
    specs = {},
  } = product || {};

  const { netto = '' } = specs || {};

  const hasPrimaryImage = images.length > 0 && !primaryFailed;
  const hasSecondaryImage = images.length > 1 && !secondaryFailed;

  return (
    <div
      onClick={() => onSelect?.(product)}
      className="bg-[#FDFBF7] rounded-3xl border border-brand-accent/20 p-4 sm:p-5 flex flex-col justify-between group
                 shadow-[0_4px_20px_-4px_rgba(124,190,77,0.12)]
                 hover:shadow-[0_12px_32px_-4px_rgba(124,190,77,0.24)]
                 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none h-full"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect?.(product);
        }
      }}
      aria-label={`Lihat detail ${name}`}
    >
      <div>
        {/* Kontainer Gambar Produk dengan Animasi Fade-In Hover */}
        <div
          className="w-full aspect-square rounded-2xl overflow-hidden relative flex items-center justify-center
                     bg-gradient-to-br from-brand-accent/10 to-[#F5F0E8]
                     border border-brand-accent/15 select-none"
        >
          {hasPrimaryImage ? (
            <div className="w-full h-full relative overflow-hidden">
              {/* Foto Utama */}
              <img
                src={images[0]}
                alt={name}
                onError={() => setPrimaryFailed(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Foto Kedua: Fade-in mulus saat hover (seperti marketplace Footstep) */}
              {hasSecondaryImage && (
                <img
                  src={images[1]}
                  alt={`${name} - tampilan kedua`}
                  onError={() => setSecondaryFailed(true)}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out group-hover:scale-105"
                />
              )}
            </div>
          ) : (
            /* Fallback Ikon Anggun */
            <div className="w-20 h-20 rounded-2xl bg-white/80 border border-brand-accent/20 flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="w-10 h-10 text-brand-primary" />
            </div>
          )}
        </div>

        {/* Informasi Produk Bersih & Minimalis */}
        <div className="mt-4 flex flex-col gap-1">
          {netto && (
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-400">
              {netto}
            </span>
          )}
          <h3 className="text-base sm:text-lg font-bold text-text-main tracking-tight group-hover:text-brand-primary transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="pt-0.5">
            <span className="text-base sm:text-lg font-extrabold text-brand-primary">
              {price}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
