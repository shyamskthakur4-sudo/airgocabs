import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { updateMetaTags } from '../lib/seo';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'About AIRGOCABS — Automotive Mobility in Indore',
      description: 'Learn about AIRGOCABS, Indore’s premium mobility service. Committed to vehicle integrity, transparent pricing, and punctual airport transfers.',
    });
  }, []);

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        
        {/* Editorial Header */}
        <div className="max-w-2xl space-y-4">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            About AIRGOCABS
          </span>
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.08]">
            Redefining Mobility in Indore.
          </h1>
          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            AIRGOCABS was established with a singular objective: providing travelers in Indore with meticulously maintained, reliably scheduled, and transparently priced car rental experiences.
          </p>
        </div>

        {/* Narrative & Photography Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="relative h-[380px] sm:h-[480px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#EFEFEA]">
              <img
                src="https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1200&q=80"
                alt="AIRGOCABS Fleet Standards"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 text-xs sm:text-sm text-[#555555] leading-relaxed">
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Automotive Integrity & Hospitality
            </h2>
            <p>
              Whether entertaining corporate delegates at Brilliant Convention Centre, arriving on a midnight flight at Devi Ahilya Bai Holkar Airport, or traveling to the Mahakaleshwar temple in Ujjain, mobility should be dignified, punctual, and predictable.
            </p>
            <p>
              Every vehicle undergoes a 40-point safety and cleanliness audit before dispatch. Tyres, brakes, fluid levels, air conditioning, and Fastag electronic toll balances are verified prior to key release.
            </p>
            <p>
              Our pricing model is rooted in transparency: 250 KM included on 24H packages and 150 KM on 12H packages (extra ₹6/km Self-Drive, ₹8/km With Driver), simple like-for-like fuel protocols, and security deposits returned within 24 to 48 hours without friction.
            </p>

            <div className="pt-2">
              <Link to="/fleet" className="btn-primary text-xs">
                <span>View Our Fleet</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Principle 01</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Vehicle Cleanliness</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Every car is vacuumed, sanitized, and inspected between bookings. No deferred maintenance.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Principle 02</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Fair Pricing</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Zero surge fees during airport peak rush or adverse weather. The price quoted is the price honored.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Principle 03</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Indore Courtesy</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Punctual dispatch, polite communication, and attentive local knowledge of Indore and Malwa highways.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
