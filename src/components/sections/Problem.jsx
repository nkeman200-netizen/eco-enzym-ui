import React from 'react';
import { Trash2, Heart, Scale } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { PROBLEM_CARDS } from '../../constants/data';

/**
 * SB7 Element 2 — Problem Section
 * Menyuarakan 3 lapis masalah pelanggan: External, Internal, Philosophical.
 * Tujuan: buat pengunjung merasa "ini tentang aku" — empati sebelum solusi.
 */

const iconComponents = {
  Trash2,
  Heart,
  Scale,
};

export default function Problem() {
  return (
    <SectionWrapper id="masalah" className="bg-white">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Kamu Sudah Berusaha.{' '}
          <span className="text-brand-primary">Tapi Rasanya Tidak Pernah Cukup.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Kamu bukan satu-satunya yang merasakan ini.
        </p>
      </div>

      {/* 3 Kartu Masalah */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
        {PROBLEM_CARDS.map((card, index) => {
          const IconComponent = iconComponents[card.iconName] || Trash2;
          const isMiddle = index === 1;

          return (
            <div
              key={card.id}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col gap-5 border transition-all duration-300
                hover:-translate-y-1
                ${isMiddle
                  ? 'bg-brand-primary text-white border-brand-primary shadow-xl shadow-brand-primary/20'
                  : 'bg-[#FDFBF7] text-text-main border-brand-accent/15 shadow-[0_8px_30px_rgba(124,190,77,0.08)] hover:shadow-[0_8px_40px_rgba(22,109,59,0.12)]'
                }`}
            >
              {/* Ikon */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0
                  ${isMiddle
                    ? 'bg-white/15 text-white'
                    : 'bg-brand-accent/15 text-brand-primary'
                  }`}
              >
                <IconComponent className="w-6 h-6" />
              </div>

              {/* Konten */}
              <div className="space-y-2">
                <h3
                  className={`text-lg font-bold tracking-tight
                    ${isMiddle ? 'text-white' : 'text-text-main'}`}
                >
                  {card.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed
                    ${isMiddle ? 'text-white/85' : 'text-gray-600'}`}
                >
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
