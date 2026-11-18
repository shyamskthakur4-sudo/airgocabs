import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
      className={`relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-[#F7F7F5] overflow-hidden ${
        revealed ? 'hero-revealed' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Editorial Header & Kinetic Masked Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 sm:mb-14">
          <div className="lg:col-span-8 space-y-4">
            <div
              className="hero-reveal-fade flex items-center gap-2 flex-wrap"
              style={{ transitionDelay: '0ms' }}
            >
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#777777] font-medium">
                Indore Mobility
              </span>
              <span className="text-[#CCCCCC] text-[10px]">•</span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#777777] font-medium">
                Devi Ahilya Bai Holkar Airport (IDR)
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.06]">
              <span className="hero-mask">
                <span
                  className="hero-reveal-line"
                  style={{ transitionDelay: '90ms' }}
                >
                  Move Freely.
                </span>
              </span>
              <span className="hero-mask">
                <span
                  className="hero-reveal-line text-[#111318]"
                  style={{ transitionDelay: '210ms' }}
                >
                  Arrive Better<span className="text-[#286BFF]">.</span>
                </span>
              </span>
            </h1>

            <p
              className="hero-reveal-fade text-sm sm:text-base text-[#666666] font-normal max-w-xl leading-relaxed"
              style={{ transitionDelay: '340ms' }}
            >
              Premium self-drive and chauffeur-driven car rentals in Indore. Clean vehicles, transparent pricing, and punctual airport handover.
            </p>

            <div
              className="hero-reveal-fade flex flex-wrap items-center gap-3 pt-2"
              style={{ transitionDelay: '460ms' }}
            >
              <Link to="/book" className="btn-primary">
                <span>Book Your Ride</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>

              <Link to="/fleet" className="btn-secondary">
                <span>Explore Our Fleet</span>
              </Link>
            </div>
          </div>

          <div
            className="hero-reveal-fade lg:col-span-4 hidden lg:flex flex-col justify-end text-right text-xs text-[#777777] pb-2 space-y-1"
            style={{ transitionDelay: '420ms' }}
          >
            <div className="font-medium text-[#111318]">Dedicated Airport Hub</div>
            <div>Parking Bay 4 • Terminal 1 Handover</div>
            <div className="text-[11px] text-[#999999] pt-1">Indore, Madhya Pradesh 452005</div>
          </div>
        </div>

        {/* Real Premium Automotive Photography Hero Showcase */}
        <div className="relative w-full h-[320px] sm:h-[480px] lg:h-[580px] rounded-[6px] overflow-hidden border border-[#E7E7E5] mb-10 bg-[#EFEFEA]">
          <img
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85"
            alt="Premium Executive Vehicle in Indore"
            className="hero-photo-reveal w-full h-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto flex items-center justify-between text-xs text-white bg-[#111318]/80 backdrop-blur-md px-4 sm:px-5 py-3 rounded-[4px] border border-white/10 sm:max-w-md">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#B8C0CC] block font-semibold">
                Featured Fleet
              </span>
              <span className="font-display font-bold text-white text-xs sm:text-sm">
                Executive & Luxury Class Vehicles
              </span>
            </div>
            <span className="font-mono text-[11px] sm:text-xs text-[#B8C0CC] ml-4">Indore, MP</span>
          </div>
        </div>

        {/* Clean Integrated Booking Search Form */}
        <div className="w-full">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
};
