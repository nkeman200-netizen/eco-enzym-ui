import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { CONTACT_INFO } from '../../constants/data';

/**
 * Icon lookup table for contact items
 */
const contactIcons = {
  MapPin,
  Mail,
  Phone,
};

/**
 * Footer / Contact Section providing community connection details and copyright
 */
export default function Footer() {
  return (
    <SectionWrapper id="kontak" as="footer" className="bg-brand-primary text-white">
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Header Kontak */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Ada Pertanyaan? Kami Siap Membantu.
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
            Ingin tahu lebih banyak tentang produk, cara pembuatan, atau peluang kolaborasi?
            Jangan ragu untuk menghubungi kami.
          </p>
        </div>

        {/* Informasi Kontak (Flexbox: Col di mobile, Row di desktop) */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full py-4">
          {CONTACT_INFO.map((item) => {
            const IconComponent = contactIcons[item.iconName] || Phone;

            const content = (
              <div className="flex items-center gap-3 group transition-transform duration-150 hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-brand-primary transition-all duration-200 shadow-xs">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-brand-accent/90">
                    {item.label}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-brand-accent transition-colors">
                    {item.value}
                  </span>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="focus:outline-hidden"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.label}>
                {content}
              </div>
            );
          })}
        </div>

        {/* Garis Pembatas & Brand Identity */}
        <div className="border-t border-white/20 pt-8 mt-12 w-full flex flex-col items-center gap-4">
          <div className="bg-white/95 rounded-2xl px-4 py-2 shadow-sm inline-flex items-center justify-center">
            <img
              src="/images/brand/logo-full.webp"
              alt="Logo Resmi SiDeta - Sanitasi Hijau Jeruklegi"
              width="200"
              height="57"
              className="h-10 sm:h-12 w-auto object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-xs sm:text-sm text-white/90 tracking-wide max-w-xl leading-relaxed">
            &copy; 2026 SiDeta &mdash; Inovasi Produk Pembersih Ramah Lingkungan Program Pengabdian Masyarakat Sanitasi Hijau Desa Jeruklegi.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
