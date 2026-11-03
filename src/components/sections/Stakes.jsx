import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { DEFAULT_WHATSAPP_NUMBER } from '../../constants/data';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

/**
 * SB7 Element 6 — Stakes Section (Avoid Failure)
 * Gambarkan konsekuensi jika tidak mengambil tindakan.
 * Tujuan: menciptakan urgensi yang tulus — bukan menakut-nakuti, tapi jujur.
 * Diletakkan sebelum Success Vision agar halaman berakhir pada nada positif.
 */

const WHATSAPP_MAIN = buildWhatsAppUrl(
  DEFAULT_WHATSAPP_NUMBER,
  'Halo, saya ingin tahu lebih lanjut tentang produk Eco-Enzyme.'
);

export default function Stakes() {
  return (
    <SectionWrapper id="mengapa-sekarang" className="bg-brand-primary">
      <div className="max-w-3xl mx-auto text-center space-y-8">
        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Tanpa Pilihan, Kebiasaan Lama Terus Berjalan.
          </h2>
        </div>

        {/* Body */}
        <div className="space-y-4 text-white/85 text-base sm:text-lg leading-relaxed">
          <p>
            Setiap hari, limbah dapur kita berakhir di TPA yang sudah kelebihan beban.
            Setiap hari, produk kimia yang kita pakai meninggalkan residu di lantai,
            di air, di tubuh kita.
          </p>
          <p>
            Bukan karena kita tidak peduli. Tapi karena selama ini kita tidak punya
            pilihan yang mudah.
          </p>
        </div>

        {/* Pivot positif */}
        <p className="text-xl sm:text-2xl font-bold text-brand-accent">
          Sekarang, kamu punya.
        </p>

        {/* CTA */}
        <div>
          <a href={WHATSAPP_MAIN} data-wa-cta target="_blank" rel="noopener noreferrer">
            <Button
              variant="inverted"
              className="text-base px-10 py-4 shadow-lg"
            >
              Ambil Langkah Pertamamu →
            </Button>
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
