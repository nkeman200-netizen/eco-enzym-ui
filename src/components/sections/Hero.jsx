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
      className="bg-surface-light scroll-mt-20 overflow-hidden relative"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-citrus-warm/15 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* KOLOM KIRI: Tipografi & Teks */}
        <div className="flex flex-col items-start space-y-6">
          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-citrus/10 border border-brand-citrus/25 shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-citrus shrink-0" />
            <span className="text-sm font-semibold text-brand-primary">
              100% Organik & Fermentasi Sitrus Alami · Komunitas Jeruklegi
            </span>
          </div>

          {/* Headline — berbicara ke hero (pelanggan), bukan ke brand */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main leading-[1.15] sm:leading-[1.1] tracking-tight">
            Sisa Dapur Kamu <br />
            <span className="text-brand-primary">Bisa Jadi Lebih</span> <br />
            dari Sekadar Sampah.
          </h1>

          {/* Subheadline — empati langsung ke audiens ibu rumah tangga */}
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Eco-Enzyme dari Jeruklegi hadir untuk ibu-ibu yang ingin rumah bersih,
            keluarga sehat, dan tidak merasa bersalah tiap kali membuang sisa sayur
            ke tempat sampah.
          </p>

          {/* CTA: Direct + Transitional */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            {/* Direct CTA — untuk yang sudah siap */}
            <a href="#produk">
              <Button
                variant="primary"
                className="text-base px-8 py-4 border-2 border-transparent shadow-xl shadow-brand-primary/20"
              >
                Pesan via WhatsApp →
              </Button>
            </a>

            {/* Transitional CTA — untuk yang ingin tahu dulu */}
            <a href="#masalah">
              <Button variant="outline" className="text-base px-8 py-4">
                Lihat Cara Kerjanya
              </Button>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: Visual Centerpiece (Glassmorphism) */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto mt-10 lg:mt-0">
          {/* Blob Shadow — ilusi kedalaman */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/30 to-brand-primary/20 rounded-[3rem] blur-2xl opacity-60 pointer-events-none" />

          {/*
           * 📸 CATATAN DIVISI MEDIA:
           * Saat aset foto studio "Styled Still-Life" sudah siap (lihat SOP di
           * docs/plan/media-division-product-photography-guide.md), kartu emblem ini
           * dapat diganti dengan foto produk berlabel resmi SiDeta rasio 1:1.
           */}
          <div
            data-hero-showcase
            className="relative aspect-square bg-white/70 backdrop-blur-xl border-2 border-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center text-center transform hover:scale-[1.02] transition-all duration-500"
          >
            {/* Emblem Ikon Tetesan Enzim */}
            <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/50">
              <Droplets className="w-12 h-12 text-brand-primary" />
            </div>

            {/* Pill Kategori Produk */}
            <div className="bg-white px-6 py-2 rounded-full shadow-sm mb-4 border border-brand-citrus/30 bg-gradient-to-r from-white to-brand-citrus/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-citrus inline-block shrink-0" />
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                {HERO_SHOWCASE.badgeText}
              </span>
            </div>

            {/* Judul & Narasi Ringkas */}
            <h3 className="text-2xl font-extrabold text-text-main text-center tracking-tight">
              {HERO_SHOWCASE.title}
            </h3>
            <p className="text-sm text-gray-500 text-center mt-3 max-w-xs leading-relaxed">
              {HERO_SHOWCASE.subtitle}
            </p>

            {/* Baris Floating Pill SB7 Grunt Test (Keamanan & Harga Terjangkau) */}
            <div className="mt-6 pt-5 border-t border-brand-accent/15 w-full flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-accent/10 text-brand-primary text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                {HERO_SHOWCASE.highlightBenefit}
              </span>
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold shadow-xs">
                {HERO_SHOWCASE.priceTag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
