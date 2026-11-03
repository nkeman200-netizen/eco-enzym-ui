import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import Button from '../ui/Button';
import { Sparkles } from 'lucide-react';
import { DEFAULT_WHATSAPP_NUMBER } from '../../constants/data';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

/**
 * SB7 Final CTA Section
 * Ajakan terakhir yang kuat sebelum Footer.
 * Tujuan: tangkap pengunjung yang sudah membaca semua tapi belum klik tombol manapun.
 */

const WHATSAPP_MAIN = buildWhatsAppUrl(
  DEFAULT_WHATSAPP_NUMBER,
  'Halo, saya ingin pesan produk Eco-Enzyme.'
);

export default function FinalCTA() {
  return (
    <SectionWrapper id="pesan-sekarang" className="bg-brand-accent/10">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Micro-badge Brand */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-citrus/15 border border-brand-citrus/30 text-brand-primary text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-citrus" />
          SiDeta &mdash; Gerakan Sanitasi Hijau Jeruklegi
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Siap Membuat Perbedaan dari{' '}
          <span className="text-brand-primary">Dapur Kamu?</span>
        </h2>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Bergabunglah dengan keluarga-keluarga yang sudah memilih bersih
          yang lebih bertanggung jawab.
        </p>

        {/* Direct CTA */}
        <div className="pt-2">
          <a href={WHATSAPP_MAIN} data-wa-cta target="_blank" rel="noopener noreferrer">
            <Button
              variant="primary"
              className="text-base sm:text-lg px-10 sm:px-14 py-4 shadow-xl shadow-brand-primary/25"
            >
              Pesan Sekarang via WhatsApp →
            </Button>
          </a>
        </div>

        {/* Reassurance */}
        <p className="text-sm text-gray-500">
          Tidak ada minimum order &nbsp;·&nbsp; Respon cepat &nbsp;·&nbsp;
          Langsung dari tangan komunitas Jeruklegi
        </p>
      </div>
    </SectionWrapper>
  );
}
