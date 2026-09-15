import React from 'react';
import { Home, ShieldCheck, Globe } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { SUCCESS_POINTS } from '../../constants/data';

/**
 * SB7 Element 7 — Success Vision Section
 * Gambarkan kehidupan pelanggan setelah menggunakan produk — konkret, bisa dirasakan.
 * Tujuan: akhiri dengan harapan dan gambaran positif yang memotivasi.
 */

const iconComponents = {
  Home,
  ShieldCheck,
  Globe,
};

export default function SuccessVision() {
  return (
    <SectionWrapper id="visi-bersama" className="bg-[#FDFBF7]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Bayangkan Rumahmu{' '}
          <span className="text-brand-primary">Setelah Ini.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Bersih dari noda — bukan dari bahan kimia.
        </p>
      </div>

      {/* 3 Poin Transformasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {SUCCESS_POINTS.map((point) => {
          const IconComponent = iconComponents[point.iconName] || Home;

          return (
            <div
              key={point.id}
              className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col gap-4
                         border border-brand-accent/15
                         shadow-[0_8px_30px_rgba(124,190,77,0.08)]
                         hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(22,109,59,0.12)]
                         transition-all duration-300"
            >
              {/* Centang + Ikon */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/15 flex items-center justify-center text-brand-primary flex-shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <span className="text-brand-primary font-extrabold text-xl">✓</span>
              </div>

              {/* Teks */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-text-main tracking-tight">
                  {point.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
