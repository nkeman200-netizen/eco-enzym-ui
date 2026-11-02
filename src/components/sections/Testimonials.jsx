import React, { useState, useEffect } from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { Star } from 'lucide-react';
import { SHOW_TESTIMONIALS, TESTIMONIALS, IMPACT_STATS } from '../../constants/data';
import { getTestimonialsData } from '../../services/testimonialService';

/**
 * SB7 Social Proof — Testimonials Section (Reactive Astro Island)
 *
 * Mengalirkan data angka dampak lingkungan dan ulasan pelanggan secara dinamis
 * dari endpoint publik `GET /api/v1/testimonials` melalui `testimonialService.js`,
 * dilengkapi Inline Skeleton Loading Shimmer dan Atomic All-or-Fallback Shield.
 */
export default function Testimonials() {
  const [stats, setStats] = useState(IMPACT_STATS);
  const [testimonials, setTestimonials] = useState(TESTIMONIALS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadTestimonials() {
      const result = await getTestimonialsData();
      if (isMounted) {
        setStats(result.statistics);
        setTestimonials(result.testimonials);
        setIsLoading(false);
      }
    }

    if (SHOW_TESTIMONIALS) {
      loadTestimonials();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  // Invariant Visibilitas: Jika flag false, short-circuit return null
  if (!SHOW_TESTIMONIALS || (!isLoading && testimonials.length === 0)) {
    return null;
  }

  return (
    <SectionWrapper id="testimoni" className="bg-white" aria-busy={isLoading}>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Mereka Sudah{' '}
          <span className="text-brand-primary">Merasakannya.</span>
        </h2>
      </div>

      {isLoading ? (
        <>
          {/* Inline Skeleton Shimmer: 3 Kotak Statistik Dampak */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, idx) => (
              <div
                key={`stat-skeleton-${idx}`}
                className="bg-brand-accent/10 rounded-2xl py-8 px-6 border border-brand-accent/20 flex flex-col items-center justify-center gap-3 animate-pulse select-none"
              >
                <div className="h-9 sm:h-10 w-28 bg-brand-accent/20 rounded-lg" />
                <div className="h-4 w-3/4 bg-brand-accent/15 rounded" />
              </div>
            ))}
          </div>

          {/* Inline Skeleton Shimmer: 3 Kartu Testimoni Editorial */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            aria-hidden="true"
          >
            {[...Array(3)].map((_, idx) => (
              <div
                key={`testi-skeleton-${idx}`}
                className="bg-[#FDFBF7] rounded-3xl p-7 border border-brand-accent/15
                           shadow-[0_8px_30px_rgba(124,190,77,0.08)] flex flex-col gap-5 animate-pulse select-none"
              >
                {/* Skeleton 5 Bintang */}
                <div className="flex gap-1.5">
                  {[...Array(5)].map((__, starIdx) => (
                    <div
                      key={starIdx}
                      className="w-4 h-4 rounded-sm bg-brand-citrus-warm/30"
                    />
                  ))}
                </div>

                {/* Skeleton Kutipan (3 Baris) */}
                <div className="space-y-2.5 py-1">
                  <div className="h-4 bg-brand-accent/15 rounded w-full" />
                  <div className="h-4 bg-brand-accent/15 rounded w-11/12" />
                  <div className="h-4 bg-brand-accent/15 rounded w-4/5" />
                </div>

                {/* Skeleton Identitas Editorial */}
                <div className="flex items-baseline justify-between gap-2 mt-auto pt-4 border-t border-gray-100">
                  <div className="h-4 w-32 bg-brand-accent/20 rounded" />
                  <div className="h-3 w-20 bg-brand-accent/15 rounded" />
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Impact Stats */}
          {stats.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
              {stats.map((stat) => (
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
            {testimonials.map((item) => (
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
        </>
      )}
    </SectionWrapper>
  );
}
