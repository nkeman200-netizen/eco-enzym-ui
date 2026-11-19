import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Wind,
  FlaskConical,
  Sparkles,
} from 'lucide-react';
import Button from './Button';
import { buildProductCheckoutUrl } from '../../utils/whatsapp';
import { buildProductImageAlt } from '../../utils/seoSchema';

/**
 * Ikon default fallback per produk (sesuai katalog Products.jsx)
 */
const productIcons = {
  'sabun-batang': Droplets,
  'pembersih-lantai': Wind,
  'pembersih-kaca': Sparkles,
  'pembersih-kamar-mandi': FlaskConical,
};

/**
 * Label sudut pandang foto galeri
 */
const SLIDE_CAPTIONS = [
  'Wujud Produk & Kemasan',
  'Tekstur & Busa Alami',
  'Label & Panduan Praktis',
];

/**
 * ProductDetailModal Component
 *
 * Modal pop-up detail produk interaktif dengan:
 * - React Portal mounting ke document.body (bebas z-index / overflow clipping)
 * - Defensive lifecycle (body scroll-lock & Escape key handler)
 * - Multi-image gallery dengan Native CSS Scroll-Snap (0 KB library JS)
 * - Sinkronisasi dua arah indikator thumbnail preview
 * - Fallback ikon anggun jika berkas foto belum tersedia
 * - Spesifikasi fisik lengkap (Netto, Kemasan, Komposisi Alami, Cara Pakai)
 * - Direct Contextual WhatsApp CTA
 */
export default function ProductDetailModal({ product, onClose, whatsappNumber }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [failedImages, setFailedImages] = useState({});
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const galleryRef = useRef(null);

  // Defensive destructuring data produk
  const {
    id = '',
    name = 'Produk Eco-Enzyme',
    detail = '',
    price = '',
    images = [],
  } = product || {};

  const isLongText = typeof detail === 'string' && detail.length > 160;
  const IconComponent = productIcons[id] || Droplets;
  const slideList = images.length > 0 ? images : ['placeholder-1'];

  // Lock body scroll saat modal aktif & dengarkan tombol Escape
  useEffect(() => {
    if (!product) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [product, onClose]);


  // Deteksi indeks aktif dari native scroll-snap event
  const handleScroll = (e) => {
    const { scrollLeft, clientWidth } = e.currentTarget;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex !== activeImageIndex && newIndex >= 0 && newIndex < slideList.length) {
        setActiveImageIndex(newIndex);
      }
    }
  };

  // Navigasi ke slide tertentu
  const scrollToSlide = (index) => {
    if (galleryRef.current) {
      const width = galleryRef.current.clientWidth;
      galleryRef.current.scrollTo({
        left: index * width,
        behavior: 'smooth',
      });
      setActiveImageIndex(index);
    }
  };

  const handlePrevSlide = () => {
    const prev = Math.max(0, activeImageIndex - 1);
    scrollToSlide(prev);
  };

  const handleNextSlide = () => {
    const next = Math.min(slideList.length - 1, activeImageIndex + 1);
    scrollToSlide(next);
  };

  const handleImageError = (imgUrl) => {
    setFailedImages((prev) => ({ ...prev, [imgUrl]: true }));
  };

  // Buat pesan WhatsApp kontekstual spesifik
  const orderUrl = buildProductCheckoutUrl(product, whatsappNumber);

  const handleOrder = () => {
    window.open(orderUrl, '_blank', 'noopener,noreferrer');
  };

  if (!product || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-brand-accent/20 overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup Silang (✕) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail produk"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-text-main shadow-md flex items-center justify-center border border-gray-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Konten Scrollable Modal */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* ────────────────────────────────────────────────────────── */}
          {/* GALERI FOTO CSS SCROLL-SNAP & THUMBNAIL PREVIEW            */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="space-y-3">
            <div className="relative w-full max-w-[420px] aspect-square mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-brand-accent/10 to-[#F5F0E8] border border-brand-accent/15 group">
              {/* Slider Kontainer Native CSS Scroll-Snap */}
              <div
                ref={galleryRef}
                onScroll={handleScroll}
                className="w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
              >
                {slideList.map((imgUrl, idx) => {
                  const hasFailed = failedImages[imgUrl] || images.length === 0;

                  return (
                    <div
                      key={idx}
                      className="w-full h-full flex-shrink-0 snap-center flex flex-col items-center justify-center relative select-none"
                    >
                      {!hasFailed ? (
                        <img
                          src={imgUrl}
                          alt={buildProductImageAlt(product, idx, SLIDE_CAPTIONS[idx])}
                          onError={() => handleImageError(imgUrl)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        /* Graceful Fallback Card dengan Ikon Bawaan */
                        <div className="flex flex-col items-center justify-center p-6 text-center space-y-3">
                          <div className="w-20 h-20 rounded-2xl bg-white/90 border border-brand-accent/25 flex items-center justify-center text-brand-primary shadow-sm">
                            <IconComponent className="w-10 h-10 text-brand-primary" />
                          </div>
                          <div className="space-y-1">
                            <span className="inline-block px-2.5 py-0.5 rounded-md bg-brand-primary/10 text-[11px] font-semibold text-brand-primary">
                              {SLIDE_CAPTIONS[idx] || `Foto Sudut #${idx + 1}`}
                            </span>
                            <p className="text-xs text-gray-500">
                              Foto produk asli ramah lingkungan Jeruklegi
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tombol Navigasi Desktop Panah Kiri / Kanan */}
              {slideList.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevSlide}
                    disabled={activeImageIndex === 0}
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-md flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    disabled={activeImageIndex === slideList.length - 1}
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-md flex items-center justify-center transition-all cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Indikator Thumbnail Preview Mini */}
            {slideList.length > 1 && (
              <div className="flex items-center justify-center gap-2.5 pt-1">
                {slideList.map((imgUrl, idx) => {
                  const isActive = activeImageIndex === idx;
                  const hasFailed = failedImages[imgUrl] || images.length === 0;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToSlide(idx)}
                      aria-label={`Lihat ${SLIDE_CAPTIONS[idx] || `foto ${idx + 1}`}`}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer flex items-center justify-center p-1 bg-[#FDFBF7] ${
                        isActive
                          ? 'border-brand-citrus ring-2 ring-brand-citrus/40 scale-105 shadow-sm'
                          : 'border-brand-accent/20 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {!hasFailed ? (
                        <img
                          src={imgUrl}
                          alt=""
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <IconComponent className="w-5 h-5 text-brand-primary" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* HEADER INFORMASI PRODUK & HARGA                            */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="border-b border-gray-100 pb-4 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3
                id="product-modal-title"
                className="text-2xl sm:text-3xl font-extrabold text-text-main tracking-tight"
              >
                {name}
              </h3>
              <span className="text-xl sm:text-2xl font-black text-brand-primary">
                {price}
              </span>
            </div>
          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* KONTEN DESKRIPSI TUNGGAL (SHOPEE-STYLE PROGRESSIVE DISCLOSURE) */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="pt-2 space-y-2">
            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400">
              Deskripsi
            </h4>

            <div className="relative">
              <p
                id="product-detail-description"
                className={`text-sm text-gray-700 leading-relaxed whitespace-pre-line ${
                  !isDescriptionExpanded && isLongText ? 'line-clamp-4 overflow-hidden' : ''
                }`}
              >
                {detail}
              </p>

              {/* Gradient Fade Overlay saat teks terpotong */}
              {!isDescriptionExpanded && isLongText && (
                <div
                  className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </div>

            {/* Tombol Toggle Baca Selengkapnya / Tutup Sebagian */}
            {isLongText && (
              <button
                type="button"
                onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-citrus py-1.5 transition-colors cursor-pointer group"
                aria-expanded={isDescriptionExpanded}
                aria-controls="product-detail-description"
              >
                <span>{isDescriptionExpanded ? 'Tutup Sebagian' : 'Lihat Selengkapnya'}</span>
                {isDescriptionExpanded ? (
                  <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                ) : (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* FOOTER AKSI DIRECT WHATSAPP CHECKOUT                       */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="p-4 sm:p-5 bg-surface-light border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
          <Button
            variant="primary"
            onClick={handleOrder}
            className="w-full sm:flex-1 py-3.5 text-base font-bold shadow-md hover:shadow-lg gap-2"
            aria-label={`Pesan ${name} sekarang via WhatsApp`}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Pesan Sekarang ({price})</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full sm:w-auto py-3 px-6 text-sm"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}
