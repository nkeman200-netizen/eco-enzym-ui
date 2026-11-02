import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Star } from 'lucide-react';
import { SHOW_TESTIMONIALS, TESTIMONIALS, IMPACT_STATS } from '../../constants/data';

/**
 * SB7 Social Proof — Testimonials Section
 *
 * ⚠️  PLACEHOLDER — dikontrol oleh flag SHOW_TESTIMONIALS di constants/data.js
 *
 * Cara mengaktifkan:
 *   1. Ubah SHOW_TESTIMONIALS = true di data.js
 *   2. Isi array TESTIMONIALS dengan data nyata
 *   3. Isi array IMPACT_STATS dengan angka terverifikasi
 *
 * Syarat sebelum diaktifkan:
 *   - Min. 3 testimoni nyata (nama + kalimat + foto opsional)
 *   - Min. 1 angka dampak yang bisa diverifikasi dari komunitas Jeruklegi
 */
export default function Testimonials() {
  // Jika flag false atau data belum tersedia → tidak render apapun ke DOM
  if (!SHOW_TESTIMONIALS || TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <SectionWrapper id="testimoni" className="bg-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Mereka Sudah{' '}
          <span className="text-brand-primary">Merasakannya.</span>
        </h2>
      </div>

      {/* Impact Stats */}
      {IMPACT_STATS.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
          {IMPACT_STATS.map((stat) => (
            <div
              key={stat.id}
              className="text-center bg-brand-accent/10 rounded-2xl py-8 px-6 border border-brand-accent/20"
            >
              <span className="block text-3xl sm:text-4xl font-extrabold text-brand-primary mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Kartu Testimoni (Editorial Clean Typography) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.id}
            className="bg-[#FDFBF7] rounded-3xl p-7 border border-brand-accent/15
                       shadow-[0_8px_30px_rgba(124,190,77,0.08)] flex flex-col gap-5"
          >
            {/* 5 Golden Citrus Stars */}
            <div className="flex gap-1 text-brand-citrus-warm" aria-label="Rating 5 bintang">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-brand-citrus-warm text-brand-citrus-warm" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
              "{item.quote}"
            </blockquote>

            {/* Identitas Editorial */}
            <figcaption className="flex items-baseline justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
              <span className="block text-sm sm:text-base font-bold text-text-main tracking-tight">
                {item.name}
              </span>
              <span className="block text-xs text-gray-500 font-medium flex-shrink-0">
                {item.location}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  );
}
