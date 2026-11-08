import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { Sparkles, ShieldCheck } from 'lucide-react';
import { HERO_SHOWCASE } from '../../constants/data';

/**
 * SB7 Element 1 — Hero Section
 * Perkenalkan hero (pelanggan), singgung masalah, tawarkan jalan keluar.
 * Tujuan: tangkap perhatian dalam 3 detik (The Grunt Test) & berikan dua jalur: siap beli vs ingin tahu dulu.
 */

export default function Hero() {
  return (
    <SectionWrapper id="hero" className="bg-surface-light overflow-hidden relative">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand-citrus-warm/15 rounded-full mix-blend-multiply filter blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* KOLOM KIRI: Tipografi & Teks */}
        <div className="flex flex-col items-start space-y-6">
          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-citrus/10 border border-brand-citrus/25 shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-citrus" />
            <span className="text-sm font-semibold text-brand-primary">
              100% Organik & Fermentasi Sitrus Alami · Komunitas Jeruklegi
            </span>
          </div>

          {/* Headline — berbicara ke hero (pelanggan), bukan ke brand */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main leading-tight tracking-tight">
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
          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3 pt-2">
            {/* Direct CTA — untuk yang sudah siap */}
            <a href="#produk" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full sm:w-auto justify-center text-base px-8 py-4 shadow-xl shadow-brand-primary/20">
                Pesan via WhatsApp →
              </Button>
            </a>

            {/* Transitional CTA — untuk yang ingin tahu dulu */}
            <a href="#masalah" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto justify-center text-base px-8 py-4">
                Lihat Cara Kerjanya
              </Button>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: Visual Centerpiece (SB7 Grunt Test — Produk Fisik Nyata) */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto mt-6 lg:mt-0">
          {/* Blob Shadow — ilusi kedalaman */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/30 to-brand-primary/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

          {/* Card Utama (Glassmorphism & Physical Product Showcase — Flex Structured) */}
          <div className="relative bg-white/90 backdrop-blur-xl border-2 border-white rounded-3xl shadow-2xl p-5 sm:p-6 flex flex-col justify-between gap-4 group">
            {/* Top Bar: Kategori & Harga Terjangkau (Zero Collision dengan Foto) */}
            <div className="flex items-center justify-between gap-2 z-10">
              <div className="bg-surface-light px-3.5 py-1.5 rounded-full border border-brand-citrus/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-citrus inline-block shrink-0" />
                <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                  {HERO_SHOWCASE.badgeText}
                </span>
              </div>

              <div className="bg-brand-primary text-white px-3.5 py-1.5 rounded-full shadow-sm text-xs font-bold tracking-wide shrink-0">
                {HERO_SHOWCASE.priceTag}
              </div>
            </div>

            {/* Area Panggung Foto Produk Fisik Utama (LCP Optimized & CLS 0.00) */}
            <div className="relative w-full aspect-square rounded-2xl bg-white border border-brand-accent/15 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
              <img
                data-hero-product
                src={HERO_SHOWCASE.image}
                alt={HERO_SHOWCASE.imageAlt}
                loading="eager"
                fetchpriority="high"
                width="600"
                height="600"
                className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Bottom Info Card (Value Proposition & Safety Claim) */}
            <div className="bg-surface-light/90 rounded-2xl p-4 border border-brand-accent/20">
              <div className="flex items-center gap-1.5 text-brand-primary text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-brand-accent shrink-0" />
                <span>{HERO_SHOWCASE.highlightBenefit}</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-text-main tracking-tight leading-snug">
                {HERO_SHOWCASE.title}
              </h3>
              <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                {HERO_SHOWCASE.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
