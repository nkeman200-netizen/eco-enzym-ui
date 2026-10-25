import React, { useState, useRef, useEffect } from 'react';
import { Droplets, Wind, Sparkles, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import ProductCard from '../ui/ProductCard';
import ProductDetailModal from '../ui/ProductDetailModal';
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 280;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' });
    }
  };

  const handleScrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 280;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper id="produk" className="bg-white">
      {/* Header Seksi dengan Navigasi Desktop Terintegrasi */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
            Pilih yang Paling{' '}
            <span className="text-brand-primary">Kamu Butuhkan.</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Setiap produk dibuat dengan satu tujuan: membuat rumahmu bersih
            tanpa kamu harus khawatir.
          </p>
        </div>

        {/* Tombol Panah Navigasi Desktop (Hanya muncul jika item melebihi tampilan layar) */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={handleScrollPrev}
            disabled={!canScrollLeft}
            aria-label="Geser ke produk sebelumnya"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer hover:border-brand-primary/40 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleScrollNext}
            disabled={!canScrollRight}
            aria-label="Geser ke produk berikutnya"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer hover:border-brand-primary/40 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Carousel Track Horizontal: Mobile Peek Effect & Native CSS Scroll-Snap */}
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 sm:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 py-3 scroll-smooth"
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="w-[78vw] sm:w-[280px] lg:w-[calc(25%-18px)] flex-shrink-0 snap-start"
          >
            <ProductCard
              product={product}
              fallbackIcon={productIcons[product.id] || Droplets}
              onSelect={(prod) => setSelectedProduct(prod)}
            />
          </div>
        ))}
      </div>

      {/* Product Detail Modal Dialog */}
      {selectedProduct && (
        <ProductDetailModal
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </SectionWrapper>
  );
}
