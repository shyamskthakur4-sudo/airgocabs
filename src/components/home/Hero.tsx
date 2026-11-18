import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane } from 'lucide-react';
import { BookingWidget } from './BookingWidget';

export const Hero: React.FC = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const preloader = document.getElementById('airgo-preloader');

    // If preloader already finished or doesn't exist (route revisit), reveal smoothly right away
    if (!preloader || preloader.classList.contains('is-hidden')) {
      const raf = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(raf);
    }

    // Sync hero text reveal directly with the preloader exit animation
    const onPreloaderExit = () => {
      setTimeout(() => setRevealed(true), 120);
    };

    window.addEventListener('airgo:preloader-exit', onPreloaderExit);
    const fallback = setTimeout(() => setRevealed(true), 2400);

    return () => {
      window.removeEventListener('airgo:preloader-exit', onPreloaderExit);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      className={`relative bg-[#F7F7F5] overflow-hidden ${
        revealed ? 'hero-revealed' : ''
      }`}
    >
      {/* FULL-BLEED AVIATION & AUTOMOTIVE HERO STAGE */}
      <div className="relative min-h-[640px] sm:min-h-[680px] lg:min-h-[760px] flex flex-col justify-between pt-24 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-32 overflow-hidden">
        {/* Background Image — Focal-anchored to preserve both the aircraft nose & luxury car */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#E9ECEF]">
          <img
            src="/images/hero-airport-car.jpg"
            alt="AIRGOCABS Indore Airport Tarmac Car Handover"
            fetchPriority="high"
            loading="eager"
            className="hero-photo-reveal w-full h-full object-cover object-[76%_62%] sm:object-[68%_56%] lg:object-[72%_56%]"
          />

          {/* Top subtle veil for crisp Navbar contrast */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F7F7F5]/85 via-[#F7F7F5]/30 to-transparent pointer-events-none" />

          {/* Mobile vertical readability veil — keeps headline ultra-crisp at top while revealing jet + car below */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#F7F7F5]/95 via-[#F7F7F5]/75 via-45% to-transparent pointer-events-none" />

          {/* Desktop left-to-right directional editorial veil — keeps right jet & Mercedes completely luminous */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#F7F7F5]/95 via-[#F7F7F5]/75 via-40% to-transparent pointer-events-none" />

          {/* Bottom tarmac horizon dissolve seamlessly into #F7F7F5 */}
          <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 bg-gradient-to-t from-[#F7F7F5] via-[#F7F7F5]/75 to-transparent pointer-events-none" />
        </div>

        {/* FOREGROUND EDITORIAL CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 lg:px-12 flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center my-auto py-4 sm:py-6">
            {/* Left Editorial Column */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6 max-w-xl">
              {/* Clean Editorial Eyebrow — Architectural line & mono typography (No AI capsule pill) */}
              <div
                className="hero-reveal-fade flex items-center gap-2.5 text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#525760] font-semibold"
                style={{ transitionDelay: '0ms' }}
              >
                <span className="w-5 h-[2px] bg-[#286BFF] inline-block shrink-0" />
                <span>Premier Car Rental in Indore • Airport & City Fleet</span>
              </div>

              {/* SEO-Engineered Kinetic Display Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] xl:text-[60px] font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.08]">
                <span className="hero-mask block">
                  <span
                    className="hero-reveal-line block"
                    style={{ transitionDelay: '90ms' }}
                  >
                    Car Rental in Indore.
                  </span>
                </span>
                <span className="hero-mask block">
                  <span
                    className="hero-reveal-line block text-[#111318]"
                    style={{ transitionDelay: '210ms' }}
                  >
                    Self-Drive & Chauffeur<span className="text-[#286BFF]">.</span>
                  </span>
                </span>
              </h1>

              {/* SEO & Customer-Focused Subheadline */}
              <p
                className="hero-reveal-fade text-sm sm:text-base text-[#3A3D45] font-normal max-w-lg leading-relaxed"
                style={{ transitionDelay: '330ms' }}
              >
                Rent self-drive and chauffeur-driven cars in Indore with guaranteed handover at Devi Ahilya Bai Holkar Airport (Terminal 1 Bay 4). Choose from 25+ verified hatchbacks, sedans, and SUVs with transparent 12H and 24H packages, flat rates, and doorstep delivery.
              </p>

              {/* Primary & Secondary CTAs */}
              <div
                className="hero-reveal-fade flex flex-wrap items-center gap-3 pt-1"
                style={{ transitionDelay: '440ms' }}
              >
                <Link
                  to="/book"
                  className="btn-primary min-h-[46px] px-6 shadow-[0_8px_24px_-8px_rgba(17,19,24,0.35)]"
                >
                  <span>Book a Car</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </Link>

                <Link
                  to="/fleet"
                  className="btn-secondary min-h-[46px] px-6 bg-[#FFFFFF]/90 backdrop-blur-md border-[#111318]/15 hover:bg-[#FFFFFF]"
                >
                  <span>Explore 25 Models & Rates</span>
                </Link>
              </div>

              {/* Specification & Trust Highlights Bar */}
              <div
                className="hero-reveal-fade pt-4 border-t border-[#111318]/10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-mono text-[#444850]"
                style={{ transitionDelay: '540ms' }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#111318]">24H</span>
                  <span>250 KM Included</span>
                </div>
                <span className="text-[#111318]/20">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#111318]">12H</span>
                  <span>150 KM Included</span>
                </div>
                <span className="text-[#111318]/20">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#111318]">₹6/KM</span>
                  <span>Self-Drive Extra</span>
                </div>
                <span className="text-[#111318]/20">|</span>
                <div className="flex items-center gap-1.5 text-[#111318]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#286BFF]" />
                  <span className="font-semibold">Terminal 1 Bay 4 Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right Column — Clean Swiss dispatch status badge (No bubbly AI pill) */}
            <div className="hidden lg:flex lg:col-span-5 xl:col-span-6 flex-col items-end justify-start self-start pt-2">
              <div
                className="hero-reveal-fade inline-flex items-center gap-3.5 px-4 py-3 rounded-[4px] bg-[#FFFFFF]/90 backdrop-blur-md border border-[#111318]/10 shadow-[0_8px_24px_-8px_rgba(17,19,24,0.12)] text-xs"
                style={{ transitionDelay: '560ms' }}
              >
                <div className="w-8 h-8 rounded-[3px] bg-[#111318] text-white flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-[#111318] text-xs leading-tight tracking-tight">
                    Devi Ahilya Bai Holkar Airport (IDR)
                  </div>
                  <div className="font-mono text-[10px] text-[#666666] mt-0.5">
                    Terminal 1 • Dedicated Bay 4 • 24/7 Handover
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTEGRATED BOOKING BAR — Overlapping the tarmac horizon cleanly */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 -mt-12 sm:-mt-16 lg:-mt-20 pb-14 sm:pb-20">
        <BookingWidget className="shadow-[0_20px_50px_-20px_rgba(17,19,24,0.16)] border-[#E2E2DE]" />
      </div>
    </section>
  );
};
