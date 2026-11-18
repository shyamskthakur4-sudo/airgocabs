import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_SETTINGS } from '../../data/settings';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-8">
        <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
          Begin Your Journey
        </span>

        <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-[-0.03em] text-[#111318] max-w-2xl mx-auto leading-[1.1]">
          Ready for your next journey in Indore?
        </h2>

        <p className="text-sm text-[#666666] max-w-lg mx-auto leading-relaxed">
          Book online in three minutes. Punctual handover at Devi Ahilya Bai Holkar Airport or doorstep delivery across Indore.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/book"
            className="w-full sm:w-auto btn-primary"
          >
            <span>Book Your Car Online</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>

          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto btn-secondary"
          >
            <span>WhatsApp Operations Desk</span>
          </a>
        </div>

        <div className="pt-6 text-xs text-[#777777]">
          <span>Indore Hotline: </span>
          <a href={`tel:${BUSINESS_SETTINGS.primaryPhone}`} className="text-[#111318] font-medium hover:underline">
            {BUSINESS_SETTINGS.primaryPhone}
          </a>
        </div>
      </div>
    </section>
  );
};
