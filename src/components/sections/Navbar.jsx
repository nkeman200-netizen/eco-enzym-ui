import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../../constants/data.js';

/**
 * Sticky Navbar component with brand logo and smooth anchor links
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
          aria-label="SiDeta Beranda"
        >
          <img
            src="/images/brand/logo-emblem.webp"
            alt="Logo SiDeta - Sanitasi Hijau Jeruklegi"
            width="40"
            height="40"
            className="h-10 w-10 aspect-square object-contain transition-transform duration-200 group-hover:scale-105"
            loading="eager"
            decoding="async"
          />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl md:text-2xl text-brand-primary tracking-tight">
              SiDeta
            </span>
            <span className="hidden xs:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-citrus/15 text-brand-primary border border-brand-citrus/30">
              Sanitasi Hijau
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigasi Utama">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-main hover:text-brand-citrus transition-colors duration-150 py-1 relative group"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-text-main hover:text-brand-primary hover:bg-surface-light transition-colors"
            aria-label={isOpen ? 'Tutup navigasi' : 'Buka navigasi'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-lg text-base font-medium text-text-main hover:text-brand-citrus hover:bg-brand-citrus/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
