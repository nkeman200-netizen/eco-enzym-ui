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
            Terhubung Bersama Kami
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
            Tertarik berkolaborasi, belajar membuat Eco-Enzyme, atau ingin melihat langsung riset ekonomi sirkular ini? Jangan ragu untuk menghubungi panitia pengabdian.
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

        {/* Garis Pembatas & Copyright */}
        <div className="border-t border-white/20 pt-8 mt-12 w-full">
          <p className="text-xs sm:text-sm text-white/80 tracking-wide">
            &copy; 2026 Program Pengabdian Masyarakat Eco-Enzyme. All rights reserved.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
