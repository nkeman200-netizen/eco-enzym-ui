import React from 'react';
import { MessageCircle, Droplets, Wind, Sparkles, FlaskConical } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { PRODUCTS } from '../../constants/data';

/**
 * Ikon placeholder unik per produk
 */
const productIcons = {
  'sabun-batang': Droplets,
  'pembersih-lantai': Wind,
  'pembersih-kaca': Sparkles,
  'pembersih-kamar-mandi': FlaskConical,
};

/**
 * Products Catalog Section — Gaya "Organic Warmth"
 * Card bertona krem hangat dengan bayangan berpendar brand-accent yang sangat lembut
 */
export default function Products() {
  const handleOrderClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <SectionWrapper id="produk" className="bg-[#FDFBF7]">
      {/* Header Seksi */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Pilihan Pembersih Alami Anda
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Dukung kemandirian ekonomi lokal dengan menggunakan produk ramah lingkungan untuk kebutuhan sehari-hari.
        </p>
      </div>

      {/* Grid Katalog Produk (1 col mobile, 2 col tablet, 4 col desktop) */}
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

                  {/* Ikon Unik per Produk */}
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
