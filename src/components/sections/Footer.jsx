import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import { CONTACT_INFO } from '../../constants/data';
import { getContactData } from '../../services/contactService';

/**
 * Icon lookup table for contact items
 */
const contactIcons = {
  MapPin,
  Mail,
  Phone,
};

/**
 * Footer / Contact Section (Reactive Astro Island)
 *
 * Mengalirkan data kontak operasional (`location`, `email`, `whatsapp`) secara dinamis
 * dari endpoint publik `GET /api/v1/contact` melalui `contactService.js`,
 * dilengkapi Inline Skeleton Shimmer 3 slot dan visibilitas parsial (`isActive`).
 * Jika seksi kontak dinonaktifkan di CMS (`is_active: false` / `data: null`),
 * hanya blok kontak yang disembunyikan, sedangkan Logo Resmi SiDeta & Copyright tetap tampil.
 */
export default function Footer() {
  const [contactItems, setContactItems] = useState(CONTACT_INFO);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadContact() {
      const result = await getContactData();
      if (isMounted) {
        setIsActive(result.isActive);
        setContactItems(result.contactItems);
        setIsLoading(false);
      }
    }

    loadContact();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SectionWrapper
      id="kontak"
      as="footer"
      className="bg-brand-primary text-white"
      aria-busy={isLoading}
    >
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
        {isActive && (
          <>
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

            {isLoading ? (
              /* Inline Skeleton Shimmer: 3 Slot Kontak (Lokasi, Email, WhatsApp) */
              <div
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full py-4"
                aria-hidden="true"
              >
                {[...Array(3)].map((_, idx) => (
                  <div
                    key={`contact-skeleton-${idx}`}
                    className="flex items-center gap-3 animate-pulse select-none"
                  >
                    <div className="w-11 h-11 rounded-full bg-white/15 border border-white/20" />
                    <div className="text-left space-y-2">
                      <div className="h-3 w-16 bg-white/20 rounded" />
                      <div className="h-4 w-40 bg-white/25 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Informasi Kontak (Flexbox: Col di mobile, Row di desktop) */
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 w-full py-4">
                {contactItems.map((item) => {
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

                  return <div key={item.label}>{content}</div>;
                })}
              </div>
            )}
          </>
        )}

        {/* Garis Pembatas & Brand Identity (Tetap tampil meski kontak dinonaktifkan) */}
        <div
          className={`${
            isActive ? 'border-t border-white/20 pt-8 mt-12' : 'pt-2 mt-0'
          } w-full flex flex-col items-center gap-4`}
        >
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
