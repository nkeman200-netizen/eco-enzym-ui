import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import SectionWrapper from '../ui/SectionWrapper';
import {
  BRAND_IDENTITY,
  CONTACT_INFO,
  NAV_LINKS,
  FOOTER_INFO_LINKS,
  FOOTER_CONTENT,
} from '../../constants/data';
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
 * Institutional Multi-Column D2C Footer (Reactive Astro Island)
 *
 * Mengadopsi arsitektur tata letak 4 kolom asimetris responsif (Sensatia Botanicals & Footstep Footwear):
 * - Kolom 1 (Brand & Misi SiDeta): Logo resmi WebP, narasi program pengabdian, dan tag komitmen alami.
 * - Kolom 2 (Navigasi Cepat / Jelajahi): Daftar anchor navigasi dari `NAV_LINKS` (Single Source of Truth).
 * - Kolom 3 (Informasi & Bantuan): Edukasi konsumen dari `FOOTER_INFO_LINKS` dengan progressive section anchoring.
 * - Kolom 4 (Hubungi Kami API): Kontak dinamis dari endpoint `GET /api/v1/contact` dengan isolated skeleton shimmer.
 * - Adaptive Grid Collapse: Saat `isActive === false`, Kolom 4 unmounted dan Kolom 1–3 meregang proporsional (5:3:4).
 * - Sub-Footer Bar: Garis pembatas tipis, teks copyright resmi, dan navigasi 'Kembali ke Atas'.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Grid Utama Multi-Kolom Asimetris */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
          {/* Kolom 1: Brand Identity & Narasi Misi SiDeta */}
          <div
            className={`${
              isActive ? 'lg:col-span-4' : 'lg:col-span-5'
            } space-y-4`}
          >
            <div className="bg-white/95 rounded-2xl px-4 py-2 shadow-xs inline-flex items-center justify-center">
              <img
                src={BRAND_IDENTITY.logoFull}
                alt="Logo Resmi SiDeta - Sanitasi Hijau Jeruklegi"
                width="200"
                height="57"
                className="h-10 sm:h-12 w-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              {FOOTER_CONTENT.missionDescription}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-brand-accent tracking-wide">
              <span>{FOOTER_CONTENT.commitmentBadge}</span>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat (Quick Links) */}
          <div className={isActive ? 'lg:col-span-2' : 'lg:col-span-3'}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
              {FOOTER_CONTENT.quickLinksTitle}
            </h3>
            <nav aria-label="Navigasi Cepat Footer">
              <ul data-footer-nav className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-white/75 hover:text-brand-accent transition-colors duration-150 py-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Kolom 3: Informasi & Bantuan Konsumen */}
          <div className={isActive ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90 mb-4">
              {FOOTER_CONTENT.infoLinksTitle}
            </h3>
            <ul data-footer-info className="space-y-3">
              {FOOTER_INFO_LINKS.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="group block py-0.5"
                  >
                    <span className="block text-xs sm:text-sm font-medium text-white/85 group-hover:text-brand-accent transition-colors duration-150">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="block text-[11px] text-white/60 leading-snug">
                        {item.description}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: Hubungi Kami Dinamis API (Unmounted saat isActive: false) */}
          {isActive && (
            <div
              data-footer-contact
              className="lg:col-span-3 min-h-[160px] space-y-4"
            >
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
                  {FOOTER_CONTENT.contactTitle}
                </h3>
                <p className="text-xs text-white/75 leading-relaxed mt-1">
                  {FOOTER_CONTENT.contactSubtitle}
                </p>
              </div>

              {isLoading ? (
                /* Inline Skeleton Shimmer: 3 Slot Kontak Terisolasi (Zero CLS) */
                <div className="space-y-3 py-1" aria-hidden="true">
                  {[...Array(3)].map((_, idx) => (
                    <div
                      key={`contact-skeleton-${idx}`}
                      className="flex items-center gap-3 animate-pulse select-none"
                    >
                      <div className="w-9 h-9 rounded-full bg-white/15 border border-white/20 shrink-0" />
                      <div className="text-left space-y-1.5 flex-1">
                        <div className="h-2.5 w-14 bg-white/20 rounded" />
                        <div className="h-3.5 w-36 bg-white/25 rounded" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Daftar Kontak Aktual dari API Service */
                <div className="space-y-3 py-1">
                  {contactItems.map((item) => {
                    const IconComponent = contactIcons[item.iconName] || Phone;

                    const content = (
                      <div className="flex items-center gap-3 group transition-transform duration-150 hover:-translate-y-0.5">
                        <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-brand-primary transition-all duration-200 shadow-xs shrink-0">
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="text-left min-w-0">
                          <span className="block text-[10px] font-semibold uppercase tracking-wider text-brand-accent/90">
                            {item.label}
                          </span>
                          <span className="block text-xs sm:text-sm font-medium text-white group-hover:text-brand-accent transition-colors truncate">
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
                          className="block focus:outline-hidden"
                        >
                          {content}
                        </a>
                      );
                    }

                    return <div key={item.label}>{content}</div>;
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sub-Footer Bar: Garis Pembatas, Copyright & Back to Top */}
        <div
          data-sub-footer
          className="border-t border-white/15 pt-8 mt-12 w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70"
        >
          <p className="tracking-wide text-center sm:text-left leading-relaxed max-w-2xl">
            &copy; 2026 SiDeta &mdash; {FOOTER_CONTENT.copyrightText}
          </p>
          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 text-white/80 hover:text-brand-accent transition-colors duration-150 py-1 shrink-0"
            aria-label="Kembali ke bagian atas halaman"
          >
            <span>Kembali ke Atas</span>
            <span aria-hidden="true">&uarr;</span>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
