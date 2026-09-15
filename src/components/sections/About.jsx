import React from 'react';
import { Apple, FlaskConical, Sparkles, Leaf, ShieldCheck } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { EDUCATION_STEPS } from '../../constants/data';

/**
 * SB7 Element 3 — Guide Section (reframe dari About)
 * Posisikan brand sebagai pemandu (bukan hero) dengan dua komponen:
 *   1. Empati — "kami mengerti perasaanmu"
 *   2. Otoritas — "dan kami punya bukti nyata bahwa kami bisa membantu"
 */

const iconComponents = {
  Apple,
  FlaskConical,
  Sparkles,
  Leaf,
};

export default function About() {
  return (
    <SectionWrapper id="tentang" className="bg-[#FDFBF7]">

      {/* Empati Statement — brand berbicara sebelum menjelaskan diri */}
      <div className="text-center max-w-2xl mx-auto mb-4 space-y-2">
        <span className="inline-block text-sm font-semibold text-brand-primary uppercase tracking-widest">
          Kami Mengerti Perasaan Itu
        </span>
      </div>

      {/* Header Seksi */}
      <div className="text-center max-w-3xl mx-auto mb-6 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Dari Dapur Warga Jeruklegi,{' '}
          <span className="text-brand-primary">Sebuah Jawaban Tumbuh.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Bukan dari pabrik besar. Bukan dari mesin. Produk Eco-Enzyme kami lahir dari
          tangan ibu-ibu dan bapak-bapak Jeruklegi yang belajar mengolah limbah organik
          menjadi pembersih alami berkualitas — melalui proses fermentasi yang terbukti
          efektif tanpa bahan kimia berbahaya.
        </p>
      </div>

      {/* Otoritas & Verifikasi — Bukti Pendampingan Kampus & Standar Higienis */}
      <div className="max-w-2xl mx-auto mb-10 bg-white/90 border border-brand-accent/30 rounded-2xl p-4 sm:p-5 shadow-sm flex items-center gap-4 text-left">
        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-main">
            Didampingi Program Pengabdian Akademis & Teruji Aman
          </h4>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
            Formula fermentasi diproduksi dengan panduan standar mutu higienitas, bebas dari klorin, SLS, paraben, dan residu kimia sintetis berbahaya.
          </p>
        </div>
      </div>

      {/* 4 Langkah Flow — di-reframe ke sudut pandang pelanggan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-10">
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
              {/* Header Ikon & Nomor */}
              <div className="flex items-center justify-between w-full mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-accent/15 border-2 border-white flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-accent/25 group-hover:scale-110 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-brand-primary" />
                </div>
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
