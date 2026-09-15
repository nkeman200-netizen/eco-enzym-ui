import React from 'react';
import { MessageCircle, Droplets, Wind, Sparkles, FlaskConical } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { PRODUCTS } from '../../constants/data';

/**
 * SB7 Element 5 — Products Catalog Section
 * Fokus pada benefit bagi pelanggan, bukan sekadar fitur produk.
 * Setiap kartu menampilkan: nama, deskripsi, benefit statement, dan CTA WhatsApp.
 */

/**
 * Ikon placeholder unik per produk
 *
 * 📸 CATATAN PLACEHOLDER:
 * Ikon di bawah ini adalah pengganti sementara sebelum foto produk asli tersedia.
 * Setiap kartu produk memiliki saran foto spesifik — lihat komentar di dalam masing-masing kartu.
 * Setelah foto tersedia, simpan di folder /public/images/ dengan format .webp.
 */
const productIcons = {
  'sabun-batang': Droplets,
  'pembersih-lantai': Wind,
  'pembersih-kaca': Sparkles,
  'pembersih-kamar-mandi': FlaskConical,
};

export default function Products() {
  const handleOrderClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="produk" className="bg-white">
      {/* Header Seksi */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Pilih yang Paling{' '}
          <span className="text-brand-primary">Kamu Butuhkan.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Setiap produk dibuat dengan satu tujuan: membuat rumahmu bersih
          tanpa kamu harus khawatir.
        </p>
      </div>

      {/* Grid Katalog Produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => {
          const IconComponent = productIcons[product.id] || Droplets;

          return (
            <div
              key={product.id}
              className="bg-[#FDFBF7] rounded-3xl border border-brand-accent/20 p-5 sm:p-6 flex flex-col justify-between group
                         shadow-[0_4px_20px_-4px_rgba(124,190,77,0.15)]
                         hover:shadow-[0_8px_32px_-4px_rgba(124,190,77,0.28)]
                         hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                {/* Placeholder Gambar Produk */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden relative flex flex-col items-center justify-center p-4
                                bg-gradient-to-br from-brand-accent/10 to-[#F5F0E8]
                                border border-brand-accent/15
                                group-hover:from-brand-accent/15 group-hover:to-[#EDE8DC] transition-all duration-300">

                  {/* Badge Produk */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-brand-primary border border-brand-accent/20 shadow-xs flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-accent" />
                      <span>{product.badge}</span>
                    </div>
                  )}

                  {/*
                   * 📸 PLACEHOLDER FOTO — ganti <div> ikon di bawah ini dengan <img> saat foto tersedia.
                   *
                   * Saran foto per produk (semua: rasio 1:1, background putih/krem, min. 600×600px):
                   *   sabun-batang        → 2–3 batang sabun di handuk linen, tampak busa tipis di tepi
                   *   pembersih-lantai    → botol berdiri di lantai kayu/keramik mengkilap, latar tanaman hias
                   *   pembersih-kaca      → botol spray dekat jendela, pantulan cahaya matahari pagi
                   *   pembersih-kamar-mandi → botol di rak kamar mandi minimalis + spons/sikat kayu
                   *
                   * Contoh implementasi (ganti <div> ikon + <div> di bawah ini):
                   *   <img src={`/images/${product.id}.webp`} alt={product.name} className="w-full h-full object-cover" />
                   */}

                  {/* Ikon Unik per Produk — hapus div ini saat foto sudah ada */}
                  <div className="w-20 h-20 rounded-2xl bg-white/80 border border-brand-accent/20 flex items-center justify-center text-brand-primary shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-brand-primary" />
                  </div>
                </div>

                {/* Detail Produk */}
                <h3 className="text-lg sm:text-xl font-bold text-text-main mt-4 tracking-tight">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                  {product.description}
                </p>

                {/* Benefit Statement — fokus pada dampak ke pelanggan */}
                {product.benefit && (
                  <p className="text-xs text-brand-primary font-semibold mt-2 flex items-start gap-1">
                    <span className="mt-0.5">✓</span>
                    <span>{product.benefit}</span>
                  </p>
                )}

                {/* Indikator Harga Terjangkau Komunitas */}
                {product.price && (
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-500 font-medium">Harga Komunitas</span>
                    <span className="text-sm sm:text-base font-extrabold text-brand-primary">
                      {product.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Contextual WhatsApp Checkout Button */}
              <div className="pt-5">
                <Button
                  variant="outline"
                  onClick={() => handleOrderClick(product.whatsappUrl)}
                  className="w-full text-sm font-semibold py-3 gap-2 border-brand-primary/60 hover:border-brand-primary"
                  aria-label={`Pesan ${product.name} via WhatsApp`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Pesan via WhatsApp</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
