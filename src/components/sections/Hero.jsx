import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { Droplets, Sparkles, ShieldCheck } from 'lucide-react';
import { HERO_SHOWCASE } from '../../constants/data';

/**
 * SB7 Element 1 — Hero Section
 * Perkenalkan hero (pelanggan), singgung masalah, tawarkan jalan keluar.
 * Tujuan: tangkap perhatian dalam 3 detik (The Grunt Test) & berikan dua jalur: siap beli vs ingin tahu dulu.
 * Proporsi dikunci kompak (Single-Viewport Above-the-Fold Budget) agar CTA terlihat utuh tanpa scroll.
 */

export default function Hero() {
  return (
    <SectionWrapper
      id="hero"
      className="bg-surface-light overflow-hidden relative"
      containerClassName="py-8! md:py-12!"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute top-12 right-10 w-80 h-80 bg-brand-citrus-warm/15 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center relative z-10">
        {/* KOLOM KIRI: Tipografi, Empati & Dual CTA */}
        <div className="flex flex-col items-start space-y-4 md:space-y-5">
          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-citrus/10 border border-brand-citrus/25 shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-citrus shrink-0" />
            <span className="text-xs sm:text-sm font-semibold text-brand-primary">
              100% Organik & Fermentasi Sitrus Alami · Komunitas Jeruklegi
            </span>
          </div>

          {/* Headline — berbicara ke hero (pelanggan), proporsional agar hemat ruang vertikal */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-text-main leading-[1.15] tracking-tight">
            Sisa Dapur Kamu <br />
            <span className="text-brand-primary">Bisa Jadi Lebih</span> <br />
            dari Sekadar Sampah.
          </h1>

          {/* Subheadline — empati langsung ke audiens ibu rumah tangga */}
          <p className="text-base md:text-lg text-gray-600 max-w-lg leading-relaxed">
            Eco-Enzyme dari Jeruklegi hadir untuk ibu-ibu yang ingin rumah bersih,
            keluarga sehat, dan tidak merasa bersalah tiap kali membuang sisa sayur
            ke tempat sampah.
          </p>

          {/* CTA: Direct + Transitional (Langsung terlihat tanpa scroll) */}
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 pt-1">
            {/* Direct CTA — untuk yang sudah siap */}
            <a href="#produk" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="w-full sm:w-auto justify-center text-sm sm:text-base px-7 py-3.5 border-2 border-transparent shadow-xl shadow-brand-primary/20"
              >
                Pesan via WhatsApp →
              </Button>
            </a>

            {/* Transitional CTA — untuk yang ingin tahu dulu */}
            <a href="#masalah" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="w-full sm:w-auto justify-center text-sm sm:text-base px-7 py-3.5"
              >
                Lihat Cara Kerjanya
              </Button>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: Compact Glassmorphism Emblem + SB7 Grunt Test Callouts */}
        <div className="relative w-full max-w-md mx-auto lg:ml-auto mt-2 lg:mt-0">
          {/* Blob Shadow — ilusi kedalaman lembut */}
          <div className="absolute -inset-3 bg-gradient-to-r from-brand-accent/25 to-brand-primary/15 rounded-[2.5rem] blur-2xl opacity-60 pointer-events-none" />

          {/*
           * 📸 CATATAN DIVISI MEDIA:
           * Saat aset foto studio "Styled Still-Life" sudah siap (lihat SOP di
           * docs/plan/media-division-product-photography-guide.md), kartu emblem ini
           * dapat diganti dengan foto produk berlabel resmi SiDeta rasio 4:3.
           */}
          <div
            data-hero-showcase
            className="relative bg-white/75 backdrop-blur-xl border-2 border-white rounded-[2rem] shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transform hover:scale-[1.01] transition-all duration-500"
          >
            {/* Emblem Ikon Tetesan Enzim */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brand-accent/20 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-inner border border-white/60">
              <Droplets className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary" />
            </div>

            {/* Pill Kategori Produk */}
            <div className="bg-surface-light px-4 py-1.5 rounded-full shadow-xs mb-3 border border-brand-citrus/30 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-citrus inline-block shrink-0" />
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                {HERO_SHOWCASE.badgeText}
              </span>
            </div>

            {/* Judul & Narasi Ringkas */}
            <h3 className="text-xl sm:text-2xl font-extrabold text-text-main tracking-tight">
              {HERO_SHOWCASE.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xs leading-relaxed">
              {HERO_SHOWCASE.subtitle}
            </p>

            {/* Baris Floating Pill SB7 Grunt Test (Keamanan & Harga Terjangkau) */}
            <div className="mt-5 pt-4 border-t border-brand-accent/15 w-full flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent/10 text-brand-primary text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                {HERO_SHOWCASE.highlightBenefit}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-brand-primary text-white text-xs font-bold shadow-xs">
                {HERO_SHOWCASE.priceTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
