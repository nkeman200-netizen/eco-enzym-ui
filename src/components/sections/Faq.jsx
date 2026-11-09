import React from 'react';
import SectionWrapper from '../ui/SectionWrapper';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQ_ITEMS, DEFAULT_WHATSAPP_NUMBER } from '../../constants/data';
import { buildWhatsAppUrl } from '../../utils/whatsapp';

/**
 * SB7 FAQ Section (Pusat Bantuan & Edukasi Warga)
 * Berfungsi sebagai objection handler pamungkas sebelum Final CTA.
 * Memanfaatkan native <details> & <summary> untuk 0 KB client-side JS overhead.
 */
export default function Faq() {
  const waHelpUrl = buildWhatsAppUrl(
    DEFAULT_WHATSAPP_NUMBER,
    'Halo Tim SiDeta Jeruklegi, saya ingin bertanya lebih lanjut seputar pemakaian dan pemesanan produk.'
  );

  return (
    <SectionWrapper id="faq" className="bg-[#FDFBF7]">
      {/* Header Seksi */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5 text-brand-primary" />
          Pusat Bantuan & Edukasi Warga
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-text-main tracking-tight">
          Pertanyaan yang Sering Ditanyakan{' '}
          <span className="text-brand-primary">Warga & Keluarga</span>
        </h2>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Jawaban jujur dari dapur fermentasi Desa Jeruklegi untuk memastikan kenyamanan, takaran tepat, dan keamanan rumahmu.
        </p>
      </div>

      {/* Accordion List Native 0 KB JS */}
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQ_ITEMS.map((item) => (
          <details
            key={item.id}
            className="group bg-white border border-brand-accent/20 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 open:shadow-md open:border-brand-primary/30"
          >
            <summary className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none gap-4">
              <div className="flex flex-col gap-1 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-citrus">
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors m-0">
                  {item.question}
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-brand-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary/10 transition-colors">
                <ChevronDown className="w-4 h-4 text-brand-primary transition-transform duration-300 group-open:rotate-180" />
              </div>
            </summary>
            <div className="mt-4 pt-4 border-t border-brand-accent/15 text-sm sm:text-base text-gray-600 leading-relaxed text-left">
              {item.answer}
            </div>
          </details>
        ))}
      </div>

      {/* Fast Help WhatsApp Callout */}
      <div className="mt-10 sm:mt-14 max-w-3xl mx-auto p-6 sm:p-7 rounded-2xl bg-white border border-brand-accent/25 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-text-main">
            Masih punya pertanyaan takaran atau pesanan khusus?
          </h3>
          <p className="text-xs sm:text-sm text-gray-500">
            Pengurus komunitas Jeruklegi siap menjawab dan memandu dengan hangat.
          </p>
        </div>
        <a
          href={waHelpUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs sm:text-sm font-semibold hover:bg-brand-primary/90 transition-all shadow-md shadow-brand-primary/20 flex-shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          Tanya Pengrajin di WA
        </a>
      </div>
    </SectionWrapper>
  );
}
