import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Vehicle, VehicleCategory, PackageDuration } from '../../types';
import { VehicleCard } from '../fleet/VehicleCard';
import { VehicleDetailModal } from '../fleet/VehicleDetailModal';
import { store } from '../../lib/store';
import { ArrowRight } from 'lucide-react';

interface FleetSectionProps {
  vehicles?: Vehicle[];
}

export const FleetSection: React.FC<FleetSectionProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'All'>('All');
  const [selectedRentalType, setSelectedRentalType] = useState<'Self-Drive' | 'Chauffeur'>('Self-Drive');
  const [selectedPackage, setSelectedPackage] = useState<PackageDuration>('24h');
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);

  const categories: { id: VehicleCategory | 'All'; label: string }[] = [
    { id: 'All', label: 'All Fleet (25 Models)' },
    { id: 'Hatchback', label: '01 — Hatchback' },
    { id: 'Compact SUV', label: '02 — Compact SUV' },
    { id: 'SUV', label: '03 — SUV' },
    { id: 'Sedan', label: '04 — Sedan' },
  ];

  const vehicles = store.getVehicles();

  const filteredVehicles = vehicles
    .filter((v: Vehicle) => {
      if (selectedCategory === 'All') return true;
      return v.category === selectedCategory;
    })
    .slice(0, 6);

  return (
    <section className="py-20 sm:py-32 bg-[#F7F7F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12 min-w-0">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E7E7E5]">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Automotive Fleet & Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318]">
              Engineered For Every Journey
            </h2>
            <p className="text-sm text-[#666666] leading-relaxed">
              24-Hour (250 KM) and 12-Hour (150 KM) transparent packages. Extra KM at ₹6/km for self-drive, ₹8/km with driver. Airport delivery at Terminal 1 Bay 4.
            </p>
          </div>

          {/* Controls: Rental Type & Package Duration Switchers */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Package Duration Switch (24H vs 12H) */}
            <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#FFFFFF] p-0.5">
              <button
                type="button"
                onClick={() => setSelectedPackage('24h')}
                className={`px-3.5 py-2 text-xs font-medium rounded-[2px] transition-all ${
                  selectedPackage === '24h'
                    ? 'bg-[#111318] text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#111318]'
                }`}
              >
                24H (250 KM)
              </button>
              <button
                type="button"
                onClick={() => setSelectedPackage('12h')}
                className={`px-3.5 py-2 text-xs font-medium rounded-[2px] transition-all ${
                  selectedPackage === '12h'
                    ? 'bg-[#111318] text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#111318]'
                }`}
              >
                12H (150 KM)
              </button>
            </div>

            {/* Rental Type Switch (Self-Drive vs Chauffeur) */}
            <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#FFFFFF] p-0.5">
              <button
                type="button"
                onClick={() => setSelectedRentalType('Self-Drive')}
                className={`px-3.5 py-2 text-xs font-medium rounded-[2px] transition-all ${
                  selectedRentalType === 'Self-Drive'
                    ? 'bg-[#111318] text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#111318]'
                }`}
              >
                Self-Drive
              </button>
              <button
                type="button"
                onClick={() => setSelectedRentalType('Chauffeur')}
                className={`px-3.5 py-2 text-xs font-medium rounded-[2px] transition-all ${
                  selectedRentalType === 'Chauffeur'
                    ? 'bg-[#111318] text-[#FFFFFF]'
                    : 'text-[#666666] hover:text-[#111318]'
                }`}
              >
                With Driver
              </button>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="w-full max-w-full min-w-0 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-medium whitespace-nowrap rounded-[4px] transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-[#111318] text-[#FFFFFF]'
                    : 'bg-[#FFFFFF] text-[#666666] hover:text-[#111318] border border-[#E7E7E5]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVehicles.map((vehicle: Vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onOpenDetails={(v) => setModalVehicle(v)}
              selectedRentalType={selectedRentalType}
              selectedPackage={selectedPackage}
            />
          ))}
        </div>

        {/* View Entire Fleet CTA */}
        <div className="pt-10 sm:pt-14 flex flex-col items-center justify-center border-t border-[#E7E7E5]">
          <Link
            to="/fleet"
            className="group relative inline-flex items-center gap-3 sm:gap-4 pl-5 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full bg-[#111318] hover:bg-[#1a1d24] text-white transition-all duration-300 ease-out shadow-[0_12px_32px_-6px_rgba(17,19,24,0.32)] hover:shadow-[0_20px_44px_-6px_rgba(17,19,24,0.48)] hover:-translate-y-0.5 active:translate-y-0 border border-white/10"
          >
            {/* Pill Badge Counter */}
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-[11px] font-mono font-medium tracking-wide text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#286BFF] animate-pulse" />
              25 Models
            </span>

            {/* Main CTA Label */}
            <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-white">
              Explore Complete Fleet
            </span>

            {/* Action Arrow Icon Circle */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white text-[#111318] group-hover:bg-[#286BFF] group-hover:text-white flex items-center justify-center transition-all duration-300 ease-out shadow-sm flex-shrink-0">
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </Link>
          <p className="mt-3 text-[11px] font-mono text-[#777777] tracking-tight">
            Hatchbacks • Compact SUVs • Executive SUVs • Sedans
          </p>
        </div>

        {/* Vehicle Detail Modal */}
        <VehicleDetailModal
          vehicle={modalVehicle}
          onClose={() => setModalVehicle(null)}
          selectedRentalType={selectedRentalType}
          selectedPackage={selectedPackage}
        />
      </div>
    </section>
  );
};
