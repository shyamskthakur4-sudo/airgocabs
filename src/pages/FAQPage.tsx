import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_DATA } from '../data/faqs';
import { updateMetaTags } from '../lib/seo';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';

export const FAQPage: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  useEffect(() => {
    updateMetaTags({
      title: 'Frequently Asked Questions | AIRGOCABS Indore Car Rental',
      description: 'Find answers to common questions about self-drive rentals, driver eligibility, security deposits, Indore airport pickup, and chauffeur city packages.',
    });
  }, []);

  const categories = ['All', 'Airport', 'Self-Drive', 'Chauffeur', 'Billing'];

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (selectedCat !== 'All' && item.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="pt-32 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#286BFF]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777]">
              Knowledge Base
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-[#171717] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#777777] max-w-xl leading-relaxed">
            Essential operational details regarding vehicle eligibility, airport handovers, security deposit refunds, and chauffeur services in Indore.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#777777] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search questions (e.g. deposit, airport handover, license, Ujjain)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-[#E7E7E5] rounded-[4px] pl-11 pr-4 py-3.5 text-sm text-[#171717] placeholder:text-[#999999] focus:outline-none focus:border-[#111318] transition-colors"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="w-full max-w-full min-w-0 overflow-x-auto pb-1 scrollbar-none border-b border-[#E7E7E5]">
          <div className="flex items-center gap-2 w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  selectedCat === cat
                    ? 'border-[#111318] text-[#111318] font-semibold'
                    : 'border-transparent text-[#777777] hover:text-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border border-[#E7E7E5] rounded-[4px] transition-all"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                  >
                    <div className="space-y-1.5 pr-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#286BFF] font-semibold">
                        {faq.category}
                      </span>
                      <h2 className="text-sm sm:text-base font-medium text-[#171717]">
                        {faq.question}
                      </h2>
                    </div>
                    <div className="w-8 h-8 rounded-[4px] border border-[#E7E7E5] flex items-center justify-center shrink-0 mt-0.5 text-[#171717]">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#171717]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#777777]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0 text-sm text-[#555555] leading-relaxed border-t border-[#F0F0ED]">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center bg-white border border-[#E7E7E5] rounded-[4px] text-sm text-[#777777]">
              No questions matched your query "{searchQuery}".
            </div>
          )}
        </div>

        {/* Still Have Questions Concierge Card */}
        <div className="p-8 sm:p-10 rounded-[4px] bg-[#111318] text-white border border-[#111318] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#B8C0CC]">
                Concierge Desk Active
              </span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-light text-white">
              Need assistance with a specific itinerary?
            </h3>
            <p className="text-xs sm:text-sm text-[#B8C0CC] leading-relaxed">
              Our Indore fleet operations desk is accessible directly via WhatsApp for custom multi-day hires, wedding bookings, or airport transfers.
            </p>
          </div>
          <a
            href={buildGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#286BFF] hover:bg-[#1a55e0] text-white font-medium text-xs tracking-wider uppercase px-6 py-3.5 rounded-[4px] transition-colors shrink-0 w-full sm:w-auto"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat With Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
};
