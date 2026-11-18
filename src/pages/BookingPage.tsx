import React, { useEffect } from 'react';
import { BookingFlow } from '../components/booking/BookingFlow';
import { updateMetaTags } from '../lib/seo';
import { BUSINESS_SETTINGS } from '../data/settings';

export const BookingPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Online Car Booking | AIRGOCABS Indore',
      description: 'Reserve self-drive and chauffeur-driven cars in Indore. Terminal delivery at Devi Ahilya Bai Holkar Airport, transparent daily prices, and instant confirmation.',
    });
  }, []);

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            Online Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318]">
            Reserve Your Vehicle
          </h1>
          <p className="text-xs text-[#666666]">
            Configure your journey parameters, select your vehicle, and receive an instant verified confirmation reference.
          </p>
        </div>

        <BookingFlow />

        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E7E7E5] text-xs text-[#777777]">
          <div className="p-4 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-1 text-center">
            <span className="font-semibold text-[#111318] block">250 / 150 KM</span>
            <span className="text-[10px]">24H & 12H ranges (₹6/₹8 km)</span>
          </div>
          <div className="p-4 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-1 text-center">
            <span className="font-semibold text-[#111318] block">Airport Bay 4</span>
            <span className="text-[10px]">Punctual handover</span>
          </div>
          <div className="p-4 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-1 text-center">
            <span className="font-semibold text-[#111318] block">Deposit Refund</span>
            <span className="text-[10px]">24–48 hours return</span>
          </div>
          <div className="p-4 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-1 text-center">
            <span className="font-semibold text-[#111318] block">24/7 Desk</span>
            <span className="text-[10px]">{BUSINESS_SETTINGS.primaryPhone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
