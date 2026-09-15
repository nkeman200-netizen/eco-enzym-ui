import React from 'react';
import { ShoppingBag, MessageCircle, PackageCheck } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { PLAN_STEPS } from '../../constants/data';

/**
 * SB7 Element 4 — Plan Section
 * 3 langkah beli yang jelas dan sederhana.
 * Tujuan: hilangkan rasa takut dan kebingungan — tidak ada alasan untuk tidak mulai.
 */

const iconComponents = {
  ShoppingBag,
  MessageCircle,
  PackageCheck,
};

const WHATSAPP_MAIN = 'https://wa.me/6288802457102?text=Halo,%20saya%20ingin%20tahu%20lebih%20lanjut%20tentang%20produk%20Eco-Enzyme.';

export default function Plan() {
  return (
    <SectionWrapper id="cara-pesan" className="bg-[#FDFBF7]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Mulai Hanya dengan{' '}
          <span className="text-brand-primary">3 Langkah Mudah.</span>
        </h2>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Tidak perlu buat akun. Tidak perlu daftar dulu. Cukup pilih, pesan, dan tunggu.
        </p>
      </div>

      {/* 3 Langkah */}
      <div className="relative">
        {/* Garis Penghubung (hanya desktop) */}
        <div
          className="hidden lg:block absolute top-10 left-[calc(16.666%+2rem)] right-[calc(16.666%+2rem)] h-0.5 bg-brand-accent/20"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 relative">
          {PLAN_STEPS.map((item) => {
            const IconComponent = iconComponents[item.iconName] || ShoppingBag;

            return (
              <div
                key={item.step}
                className="flex flex-col items-center text-center gap-4"
              >
                {/* Nomor + Ikon */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/25">
                    <IconComponent className="w-9 h-9 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-brand-accent text-white text-xs font-extrabold flex items-center justify-center shadow">
                    {item.step}
                  </span>
                </div>

                {/* Teks */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-text-main tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-[220px] mx-auto">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12">
        <a href={WHATSAPP_MAIN} target="_blank" rel="noopener noreferrer">
          <Button variant="primary" className="text-base px-10 py-4 shadow-lg shadow-brand-primary/20">
            Mulai Sekarang →
          </Button>
        </a>
      </div>
    </SectionWrapper>
  );
}
