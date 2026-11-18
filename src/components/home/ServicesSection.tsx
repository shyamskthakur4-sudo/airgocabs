import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FFFFFF] border-y border-[#E7E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-20 sm:space-y-32">
        
        {/* EDITORIAL BLOCK 1: SELF DRIVE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Large Editorial Photograph */}
          <div className="lg:col-span-7">
            <div className="relative h-[380px] sm:h-[480px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#F7F7F5]">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80"
                alt="Self Drive Car Rental Indore"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-sm px-3 py-1 rounded-[2px] border border-[#E7E7E5] text-[10px] font-mono uppercase tracking-wider text-[#111318]">
                01 / Self-Drive
              </div>
            </div>
          </div>

          {/* Typography & Editorial Content */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Autonomous Travel
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318] leading-[1.15]">
              Freedom Behind the Wheel.
            </h2>

            <p className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed">
              Choose your car and explore Indore on your own schedule. From airport arrival at Terminal 1 to day trips across Ujjain and Omkareshwar, command your journey in complete privacy.
            </p>

            <div className="space-y-2.5 pt-2 border-t border-[#E7E7E5] text-xs text-[#555555]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>250 KM (24H) & 150 KM (12H) range • Extra ₹6/km</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Devi Ahilya Bai Holkar Airport Parking Bay 4 handover</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Transparent like-for-like fuel policy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Deposit refunded within 24 to 48 hours</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/self-drive"
                className="btn-primary"
              >
                <span>Explore Self Drive</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>
        </div>

        {/* EDITORIAL BLOCK 2: CHAUFFEUR SERVICE (Inverted Asymmetrical Composition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Typography & Editorial Content on Left */}
          <div className="lg:col-span-5 order-2 lg:order-1 space-y-6">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Chauffeur Service
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318] leading-[1.15]">
              Travel Without the Drive.
            </h2>

            <p className="text-sm sm:text-base text-[#666666] font-normal leading-relaxed">
              Comfortable, convenient transportation with a professional driver. Punctual airport transfers with personalized name placard, executive city packages, and outstation pilgrimage travel.
            </p>

            <div className="space-y-2.5 pt-2 border-t border-[#E7E7E5] text-xs text-[#555555]">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Verified, uniformed, background-checked chauffeurs</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Zero security deposit required</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>With Driver: +₹1,499 (24H) / +₹899 (12H) • Extra ₹8/km</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />
                <span>Temple circuits: Ujjain Mahakal & Omkareshwar</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/with-driver"
                className="btn-primary"
              >
                <span>Explore Chauffeur Service</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>

          {/* Large Editorial Travel Photograph on Right */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative h-[380px] sm:h-[480px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#F7F7F5]">
              <img
                src="/images/chauffeur-service.jpg"
                alt="Executive Chauffeur Service Indore"
                className="w-full h-full object-cover object-[center_65%]"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-[#FFFFFF]/90 backdrop-blur-sm px-3 py-1 rounded-[2px] border border-[#E7E7E5] text-[10px] font-mono uppercase tracking-wider text-[#111318]">
                02 / Chauffeur-Driven
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
