import React, { useState } from 'react';
import { MessageSquare, X, ArrowUpRight } from 'lucide-react';
import { BUSINESS_SETTINGS } from '../../data/settings';
import { buildGeneralWhatsAppUrl } from '../../lib/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const prompts = [
    'Car availability at Indore Airport today',
    'Self-Drive SUV rental for 3 days',
    'Chauffeur car for Ujjain Mahakal trip',
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] sm:w-80 max-w-sm bg-[#FFFFFF] border border-[#E7E7E5] shadow-lift rounded-[6px] overflow-hidden animate-slide-up text-left">
          <div className="bg-[#111318] text-[#FFFFFF] p-4 flex items-center justify-between">
            <div>
              <div className="text-xs font-display font-bold tracking-tight text-white">
                AIRGOCABS Concierge
              </div>
              <div className="text-[10px] text-[#A3A3A3]">
                Indore Operations Desk • Replies in ~2 mins
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#999999] hover:text-white p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3 bg-[#F7F7F5] text-xs">
            <p className="text-[#666666] leading-relaxed">
              How can we assist your journey across Indore or Madhya Pradesh today?
            </p>

            <div className="space-y-1.5">
              {prompts.map((p, idx) => (
                <a
                  key={idx}
                  href={buildGeneralWhatsAppUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 rounded-[4px] bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#111318] text-[#171717] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{p}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#777777] shrink-0 ml-1" />
                  </div>
                </a>
              ))}
            </div>

            <a
              href={buildGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#111318] hover:bg-[#262626] text-white py-2.5 px-4 rounded-[4px] font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#286BFF]" />
              <span>Start WhatsApp Conversation</span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-[#111318] hover:bg-[#262626] text-[#FFFFFF] px-4 py-3 rounded-[4px] border border-[#262626] shadow-subtle transition-all duration-200"
        aria-label="Contact Concierge"
      >
        <span className="w-2 h-2 rounded-full bg-[#286BFF]" />
        <MessageSquare className="w-4 h-4 text-white" />
        <span className="hidden sm:inline text-xs font-medium tracking-wide">
          {isOpen ? 'Close' : 'Concierge Desk'}
        </span>
      </button>
    </div>
  );
};
