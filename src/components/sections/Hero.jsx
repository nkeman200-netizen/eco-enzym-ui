import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { Leaf, Droplets } from 'lucide-react';

export default function Hero() {
  return (
    // bg-[#FDFBF7] memberikan kesan hangat (off-white), bukan putih steril klinik
    <SectionWrapper id="hero" className="bg-[#FDFBF7] overflow-hidden relative">
      
      {/* Ambient Background Glow - Memberikan nyawa pada latar belakang */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* KOLOM KIRI: Tipografi & Teks */}
        <div className="flex flex-col items-start space-y-6">
          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20">
            <Leaf className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">100% Organik & Ramah Lingkungan</span>
          </div>

          {/* Headline Utama: leading-[1.1] dan tracking-tight merapatkan teks agar elegan */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-main leading-[1.1] tracking-tight">
            Dari Sisa Dapur, <br />
            <span className="text-brand-primary">Menjadi Kebaikan</span> <br />
            untuk Bersama.
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Bantu kurangi limbah lingkungan sambil merawat kebersihan keluarga. Produk Eco-Enzyme alami, aman di kulit, dan dibuat langsung dari tangan masyarakat lokal Jeruklegi.
          </p>

          <div className="pt-4">
            <a href="#produk">
              <Button variant="primary" className="text-lg px-8 py-4 shadow-xl shadow-brand-primary/20">
                Lihat Produk Kami
              </Button>
            </a>
          </div>
        </div>

        {/* KOLOM KANAN: Visual Centerpiece (Glassmorphism) */}
        <div className="relative w-full max-w-lg mx-auto lg:ml-auto mt-10 lg:mt-0">
          
          {/* Blob Shadow di belakang elemen utama - Ilusi kedalaman */}
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/30 to-brand-primary/20 rounded-[3rem] blur-2xl opacity-60"></div>

          {/* Card Utama (Glassmorphism & Micro-interactions) */}
          <div className="relative aspect-square bg-white/70 backdrop-blur-xl border-2 border-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-[1.02] transition-all duration-500">
            
            <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/50">
              <Droplets className="w-12 h-12 text-brand-primary" />
            </div>
            
            <div className="bg-white px-6 py-2 rounded-full shadow-sm mb-4 border border-gray-100">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Sabun & Pembersih Alami</span>
            </div>
            
            <h3 className="text-2xl font-extrabold text-text-main text-center tracking-tight">Fermentasi Alami Berkualitas</h3>
            
            <p className="text-sm text-gray-500 text-center mt-3 max-w-xs leading-relaxed">
              Formula higienis ramah bumi hasil pengolahan limbah organik warga Jeruklegi
            </p>
            
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}