import React from 'react';
import { Apple, FlaskConical, Sparkles, Leaf } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { EDUCATION_STEPS } from '../../constants/data';

/**
 * Icon lookup table to map icon strings from constants to Lucide icon components
 */
const iconComponents = {
  Apple,
  FlaskConical,
  Sparkles,
  Leaf,
};

/**
 * About / Explanation Section — "Organic Warmth" Polish
 * Background krem menyatu dengan Hero & Products, card dengan shadow hijau lembut,
 * ikon menonjol dalam lingkaran accent, hover interaktif yang elegan
 */
export default function About() {
  return (
    <SectionWrapper id="tentang" className="bg-[#FDFBF7]">
      {/* Header Seksi (Text Center) */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Mengubah Masalah Menjadi Solusi
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Limbah organik rumah tangga bukan lagi sekadar sampah. Melalui proses fermentasi alami, alam memberikan cara untuk mendaur ulangnya menjadi pembersih yang tangguh dan aman.
        </p>
      </div>

      {/* 4 Langkah Flow Edukasi (Stacked di mobile, Grid/Horizontal di desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {EDUCATION_STEPS.map((item) => {
          const IconComponent = iconComponents[item.iconName] || Leaf;

          return (
            <div
              key={item.step}
              className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 flex flex-col items-start relative group
                         border border-brand-accent/10
                         shadow-[0_8px_30px_rgba(124,190,77,0.08)]
                         hover:-translate-y-1
                         hover:shadow-[0_8px_40px_rgba(22,109,59,0.12)]
                         transition-all duration-300"
            >
              {/* Header Ikon & Nomor Langkah */}
              <div className="flex items-center justify-between w-full mb-6">
                {/* Area Ikon — Lingkaran accent menonjol */}
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/15 border-2 border-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-accent/25 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-brand-primary" />
                </div>

                {/* Nomor Langkah */}
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#FDFBF7] border border-brand-accent/30 text-brand-primary font-bold text-sm">
                  {item.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-text-main mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
