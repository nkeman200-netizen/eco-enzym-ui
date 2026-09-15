import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { Leaf, Droplets } from 'lucide-react';

/**
 * SB7 Element 1 — Hero Section
 * Perkenalkan hero (pelanggan), singgung masalah, tawarkan jalan keluar.
 * Tujuan: tangkap perhatian dalam 3 detik & berikan dua jalur: siap beli vs ingin tahu dulu.
 */

export default function Hero() {
  return (
    // bg-[#FDFBF7] memberikan kesan hangat (off-white), bukan putih steril klinik
    <SectionWrapper id="hero" className="bg-[#FDFBF7] overflow-hidden relative">

      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-pulse pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">

        {/* KOLOM KIRI: Tipografi & Teks */}
        <div className="flex flex-col items-start space-y-6">

          {/* Badge Organik */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20">
            <Leaf className="w-4 h-4 text-brand-primary" />
            <span className="text-sm font-semibold text-brand-primary">
              100% Organik · Dibuat Langsung oleh Komunitas Lokal
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
              <Button variant="primary" className="text-base px-8 py-4 shadow-xl shadow-brand-primary/20">
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
          <div className="absolute -inset-4 bg-gradient-to-r from-brand-accent/30 to-brand-primary/20 rounded-[3rem] blur-2xl opacity-60" />

          {/*
           * 📸 PLACEHOLDER FOTO — HERO (Visual Utama Halaman)
           *
           * Saran foto:
           *   Foto flat-lay atau still-life produk unggulan (misal sabun batang + pembersih lantai)
           *   diletakkan di atas permukaan kayu/kain linen berwarna krem/natural.
           *   Tambahkan elemen pendukung: daun segar, irisan jeruk/lemon, atau bunga kecil
           *   untuk memperkuat kesan "organik dari alam".
           *
           * Teknis foto:
           *   - Rasio: 1:1 (square) agar pas mengisi card
           *   - Pencahayaan: natural light (jendela) dari samping, hindari flash langsung
           *   - Background: putih bersih atau krem agar tidak bersaing dengan card glassmorphism
           *   - Resolusi minimal: 800×800px
           *
           * Cara implementasi:
           *   Ganti seluruh konten card ini dengan:
           *   <img src="/images/hero-product.webp" alt="Produk Eco-Enzyme" className="w-full h-full object-cover rounded-[2.5rem]" />
           */}

          {/* Card Utama (Glassmorphism & Micro-interactions) */}
          <div className="relative aspect-square bg-white/70 backdrop-blur-xl border-2 border-white rounded-[2.5rem] shadow-2xl p-8 flex flex-col items-center justify-center transform hover:scale-[1.02] transition-all duration-500">
            <div className="w-24 h-24 bg-brand-accent/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/50">
              <Droplets className="w-12 h-12 text-brand-primary" />
            </div>
            <div className="bg-white px-6 py-2 rounded-full shadow-sm mb-4 border border-gray-100">
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
                Sabun & Pembersih Alami
              </span>
            </div>
            <h3 className="text-2xl font-extrabold text-text-main text-center tracking-tight">
              Fermentasi Alami Berkualitas
            </h3>
            <p className="text-sm text-gray-500 text-center mt-3 max-w-xs leading-relaxed">
              Formula higienis ramah bumi hasil pengolahan limbah organik warga Jeruklegi
            </p>
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}