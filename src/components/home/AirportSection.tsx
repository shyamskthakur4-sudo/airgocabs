import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const AirportSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-b border-[#E7E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#777777] font-medium">
                Indore Gateway
              </span>
              <span className="text-[#CCCCCC] text-[10px]">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#777777] font-medium">
                Devi Ahilya Bai Holkar Airport (IDR)
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-[-0.03em] text-[#111318] leading-[1.12]">
              Your Journey Starts at the Airport.
            </h2>

            <p className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed">
              Arriving in Indore? Skip the taxi lines and surge pricing. AIRGOCABS provides direct terminal coordination at Devi Ahilya Bai Holkar Airport. Choose between effortless self-drive key handover at Parking Bay 4 or an executive chauffeur greeting you at Terminal 1 with a name placard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E7E7E5] text-xs">
              <div className="space-y-1.5">
                <span className="font-display font-bold text-[#111318] block text-sm">
                  Live Runway Tracking
                </span>
                <p className="text-[#666666] leading-relaxed">
                  We monitor your arrival flight in real time. Delays are accommodated automatically at zero additional fee.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-display font-bold text-[#111318] block text-sm">
                  Parking Bay 4 Handover
                </span>
                <p className="text-[#666666] leading-relaxed">
                  5-minute smartphone vehicle check and physical key release right at the terminal parking area.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-display font-bold text-[#111318] block text-sm">
                  Self-Drive & Chauffeur
                </span>
                <p className="text-[#666666] leading-relaxed">
                  Drive yourself into Indore or sit back as an executive driver navigates city traffic to your hotel.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-display font-bold text-[#111318] block text-sm">
                  Point-to-Point City Drop
                </span>
                <p className="text-[#666666] leading-relaxed">
                  Pick up at Indore Airport and drop off at Vijay Nagar, Palasia, or our Super Corridor office.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/airport-transfer"
                className="btn-primary"
              >
                <span>Book Airport Transportation</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Airport Photography */}
          <div className="lg:col-span-6">
            <div className="relative h-[420px] sm:h-[500px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#F7F7F5]">
              <img
                src="https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80"
                alt="Devi Ahilya Bai Holkar Airport Indore Car Rental"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FFFFFF]/90 backdrop-blur-sm border border-[#E7E7E5] rounded-[4px] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#111318] block">Indore Airport Terminal Hub</span>
                  <span className="text-[#777777] text-[11px]">Arrival Gate 2 • Dedicated Bay 4</span>
                </div>
                <span className="font-mono text-[11px] font-semibold text-[#111318]">IDR / VAID</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
