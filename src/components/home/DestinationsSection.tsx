import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Compass } from 'lucide-react';

interface CollageItem {
  src: string;
  title: string;
  location: string;
  spanClass: string;
  heightClass: string;
  imgPos?: string;
}

const COLLAGE_IMAGES: CollageItem[] = [
  // Row 1 (Desktop: 7 + 5 = 12 | Mobile: 12 + pair below)
  {
    src: '/images/destinations/mahakaleshwar-ujjain.jpg',
    title: 'Mahakaleshwar Jyotirlinga',
    location: 'Ujjain • 55 km',
    spanClass: 'col-span-12 sm:col-span-7',
    heightClass: 'h-52 sm:h-56',
  },
  {
    src: '/images/destinations/maheshwar-fort.jpg',
    title: 'Ahilya Fort & Ghats',
    location: 'Maheshwar • 91 km',
    spanClass: 'col-span-6 sm:col-span-5',
    heightClass: 'h-40 sm:h-56',
  },
  // Row 2 (Desktop: 4 + 4 + 4 = 12)
  {
    src: '/images/destinations/omkareshwar.jpg',
    title: 'Omkareshwar',
    location: 'Narmada • 78 km',
    spanClass: 'col-span-6 sm:col-span-4',
    heightClass: 'h-40 sm:h-44',
  },
  {
    src: '/images/destinations/rajwada-indore.jpg',
    title: 'Rajwada Palace',
    location: 'Indore City',
    spanClass: 'col-span-6 sm:col-span-4',
    heightClass: 'h-40 sm:h-44',
  },
  {
    src: '/images/destinations/mandu-jahaz-mahal.jpg',
    title: 'Jahaz Mahal',
    location: 'Mandu • 98 km',
    spanClass: 'col-span-6 sm:col-span-4',
    heightClass: 'h-40 sm:h-44',
  },
  // Row 3 (Desktop: 3 + 3 + 3 + 3 = 12 | Mobile: 6 + 6 + 6 + 6)
  {
    src: '/images/destinations/pitra-parvat-indore.jpg',
    title: 'Pitra Parvat',
    location: 'Indore • 12 km',
    spanClass: 'col-span-6 sm:col-span-3',
    heightClass: 'h-40 sm:h-44',
    imgPos: 'object-top',
  },
  {
    src: '/images/destinations/patalpani-waterfall.jpg',
    title: 'Patalpani Falls',
    location: 'Mhow • 35 km',
    spanClass: 'col-span-6 sm:col-span-3',
    heightClass: 'h-40 sm:h-44',
  },
  {
    src: '/images/destinations/indore-wildlife.jpg',
    title: 'Wildlife Circuit',
    location: 'Indore & MP',
    spanClass: 'col-span-6 sm:col-span-3',
    heightClass: 'h-40 sm:h-44',
    imgPos: 'object-center',
  },
  {
    src: '/images/destinations/malwa-temple.jpg',
    title: 'Sacred Temples',
    location: 'Indore Circuit',
    spanClass: 'col-span-6 sm:col-span-3',
    heightClass: 'h-40 sm:h-44',
    imgPos: 'object-top',
  },
];

const CIRCUITS = [
  {
    index: '01',
    name: 'Ujjain Mahakaleshwar Darshan',
    meta: '55 km from Indore • Ideal for 12H (150 KM)',
  },
  {
    index: '02',
    name: 'Omkareshwar & Maheshwar Ghats',
    meta: '78–91 km • Narmada Temples & Ahilya Fort (24H)',
  },
  {
    index: '03',
    name: 'Mandu Heritage & Patalpani Falls',
    meta: '35–98 km • Jahaz Mahal & Scenic Monsoon Drives',
  },
  {
    index: '04',
    name: 'Indore City & Spiritual Tour',
    meta: 'Rajwada Palace, Pitra Parvat, Temples & Zoo',
  },
];

export const DestinationsSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F7F5] border-b border-[#E7E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-[#286BFF]" />
              <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold">
                Explore Indore & Madhya Pradesh
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318] leading-[1.12]">
              One Car. Nine Iconic Malwa Destinations.
            </h2>
            <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
              From sacred Jyotirlinga circuits in Ujjain and Omkareshwar to royal forts in Maheshwar and Mandu, drive effortlessly on your own schedule or travel relaxed with our verified chauffeurs.
            </p>
          </div>

          <div className="hidden md:block text-right text-xs font-mono text-[#777777] shrink-0">
            <div className="text-[#111318] font-semibold">12H (150 KM) • 24H (250 KM)</div>
            <div>Self-Drive & Chauffeur Ready</div>
          </div>
        </div>

        {/* 12-Column Collage + Editorial Content Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left 7 Cols: 9-Photo Swiss Editorial Collage */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-2.5 sm:p-3">
            <div className="grid grid-cols-12 gap-2 sm:gap-2.5">
              {COLLAGE_IMAGES.map((item) => (
                <div
                  key={item.title}
                  className={`${item.spanClass} ${item.heightClass} relative rounded-[4px] overflow-hidden bg-[#EFEFEA] group`}
                >
                  <img
                    src={item.src}
                    alt={`${item.title} — ${item.location} road trip with AIRGOCABS Indore`}
                    loading="lazy"
                    className={`w-full h-full object-cover ${item.imgPos || 'object-center'} transition-transform duration-500 ease-out group-hover:scale-105`}
                  />
                  {/* Subtle bottom readability gradient for location tag */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#111318]/80 via-[#111318]/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2.5 right-2.5 text-white">
                    <div className="text-[11px] sm:text-xs font-display font-bold leading-tight truncate">
                      {item.title}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-mono text-white/80 truncate">
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: New Destination Content Card */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#286BFF] font-semibold">
                  <MapPin className="w-3 h-3" />
                  Curated Road-Trip & Pilgrimage Circuits
                </span>
                <h3 className="text-2xl font-display font-extrabold tracking-[-0.025em] text-[#111318] leading-snug">
                  Indore Sightseeing, Temples & Weekend Getaways
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed">
                  Skip unpredictable highway taxis. Pick up a clean CNG+Petrol hatchback for city & Ujjain trips, or reserve a 7-seater Innova, Scorpio-N, or Fortuner for family darshans and weekend escapes.
                </p>
              </div>

              {/* 4 Popular Circuits List */}
              <div className="divide-y divide-[#E7E7E5] border-y border-[#E7E7E5]">
                {CIRCUITS.map((c) => (
                  <div key={c.index} className="py-3.5 flex items-start gap-3">
                    <span className="text-[11px] font-mono font-bold text-[#777777] pt-0.5 shrink-0">
                      {c.index} /
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-display font-bold text-[#111318]">
                        {c.name}
                      </div>
                      <div className="text-[11px] text-[#666666] mt-0.5">{c.meta}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Package Callout Strip */}
              <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex items-center justify-between text-[11px] font-mono text-[#555555]">
                <span>Hatchback from ₹1,499 (12H)</span>
                <span className="text-[#111318] font-semibold">Extra ₹6/km SD • ₹8/km Drv</span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <Link
                to="/book"
                className="btn-primary w-full min-h-[46px] text-xs"
              >
                <span>Book Your Trip</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
              <Link
                to="/with-driver"
                className="btn-secondary w-full min-h-[46px] text-xs"
              >
                <span>Hire With Driver</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
