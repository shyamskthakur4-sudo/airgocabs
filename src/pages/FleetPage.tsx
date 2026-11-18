import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw, Car } from 'lucide-react';
import { Vehicle, PackageDuration } from '../types';
import { VehicleCard } from '../components/fleet/VehicleCard';
import { VehicleDetailModal } from '../components/fleet/VehicleDetailModal';
import { store } from '../lib/store';
import { updateMetaTags } from '../lib/seo';
import { formatINR } from '../lib/utils';

export const FleetPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialPkg = (searchParams.get('pkg') as PackageDuration) || '24h';

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedRentalType, setSelectedRentalType] = useState<'Self-Drive' | 'Chauffeur'>('Self-Drive');
  const [selectedPackage, setSelectedPackage] = useState<PackageDuration>(initialPkg);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  const [selectedSeats, setSelectedSeats] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [modalVehicle, setModalVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    updateMetaTags({
      title: 'Our Fleet — Vehicle Discovery & Rates | AIRGOCABS Indore',
      description: 'Explore the complete 25-vehicle fleet in Indore. Hatchbacks, Compact SUVs, SUVs, and Sedans. 24H (250 KM) and 12H (150 KM) packages.',
    });

    const updateFromStore = () => {
      setVehicles(store.getVehicles());
    };
    updateFromStore();
    return store.subscribe(updateFromStore);
  }, []);

  const getEffectivePrice = (v: Vehicle) => {
    const isChauffeur = selectedRentalType === 'Chauffeur';
    if (selectedPackage === '12h') {
      return isChauffeur ? v.price12h + (v.driverFee12h || 899) : v.price12h;
    }
    return isChauffeur ? v.price24h + (v.driverFee24h || 1499) : v.price24h;
  };

  const filteredVehicles = vehicles
    .filter((v) => {
      if (selectedRentalType === 'Self-Drive' && !v.selfDriveAvailable) return false;
      if (selectedRentalType === 'Chauffeur' && !v.chauffeurAvailable) return false;
      if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
      if (selectedTransmission !== 'All' && v.transmission !== selectedTransmission) return false;
      if (selectedSeats !== 'All' && v.seats.toString() !== selectedSeats) return false;

      const rate = getEffectivePrice(v);
      if (rate > maxPrice) return false;

      return true;
    })
    .sort((a, b) => {
      const priceA = getEffectivePrice(a);
      const priceB = getEffectivePrice(b);

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.tripsCompleted || 0) - (a.tripsCompleted || 0);
    });

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedTransmission('All');
    setSelectedSeats('All');
    setMaxPrice(20000);
    setSortBy('popular');
    setSelectedPackage('24h');
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10 min-w-0">
        {/* Page Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            Fleet Specifications & Catalog
          </span>

          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-[-0.035em] text-[#111318]">
            Our Fleet
          </h1>

          <p className="text-sm sm:text-base text-[#666666] leading-relaxed">
            Every vehicle in our Indore fleet is mechanically inspected and sanitized before every handover. 24H (250 KM) and 12H (150 KM) packages with transparent ₹6/km extra for self-drive, ₹8/km with chauffeur.
          </p>

          <div className="p-3 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] text-xs text-[#777777] flex items-center justify-between flex-wrap gap-2">
            <span>
              <strong>Packages:</strong> 24H = 250 KM Range • 12H = 150 KM Range
            </span>
            <span>
              <strong>With Driver:</strong> +₹1,499 (24H) / +₹899 (12H)
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-5 sm:p-6 space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E5]">
            <div className="flex flex-wrap items-center gap-3">
              {/* Package Duration Switch (24H vs 12H) */}
              <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedPackage('24h')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-[2px] transition-all ${
                    selectedPackage === '24h'
                      ? 'bg-[#111318] text-[#FFFFFF]'
                      : 'text-[#666666] hover:text-[#111318]'
                  }`}
                >
                  24 Hours (250 KM)
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
                  12 Hours (150 KM)
                </button>
              </div>

              {/* Rental Type Switch (Self-Drive vs Chauffeur) */}
              <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedRentalType('Self-Drive')}
                  className={`px-4 py-2 text-xs font-medium rounded-[2px] transition-all ${
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
                  className={`px-4 py-2 text-xs font-medium rounded-[2px] transition-all ${
                    selectedRentalType === 'Chauffeur'
                      ? 'bg-[#111318] text-[#FFFFFF]'
                      : 'text-[#666666] hover:text-[#111318]'
                  }`}
                >
                  With Driver
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end text-xs">
              <div className="flex items-center gap-2 text-[#777777]">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-2.5 py-1.5 text-xs text-[#171717] focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-[#777777] hover:text-[#111318] px-3 py-1.5 rounded-[4px] border border-[#E7E7E5] hover:bg-[#F7F7F5] transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filtering Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:border-[#111318] focus:outline-none"
              >
                <option value="All">All Categories (25 Models)</option>
                <option value="Hatchback">01 — Hatchback (7)</option>
                <option value="Compact SUV">02 — Compact SUV (3)</option>
                <option value="SUV">03 — SUV (13)</option>
                <option value="Sedan">04 — Sedan (2)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
                Transmission
              </label>
              <select
                value={selectedTransmission}
                onChange={(e) => setSelectedTransmission(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:border-[#111318] focus:outline-none"
              >
                <option value="All">All Transmissions</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
                Seating Capacity
              </label>
              <select
                value={selectedSeats}
                onChange={(e) => setSelectedSeats(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:border-[#111318] focus:outline-none"
              >
                <option value="All">Any Seating</option>
                <option value="4">4 Seats (Thar 4x4)</option>
                <option value="5">5 Seats</option>
                <option value="6">6 Seats (XL6 Captain)</option>
                <option value="7">7 Seats (Scorpio/Safari/Innova/Ertiga/Fortuner)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#777777]">
                <span>Max Budget:</span>
                <span className="text-[#111318] font-mono font-bold">{formatINR(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={1500}
                max={20000}
                step={500}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#111318] cursor-pointer mt-2"
              />
            </div>
          </div>
        </div>

        {/* Results Counter & Range Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#777777] gap-2 pb-1 border-b border-[#E7E7E5]">
          <span>
            Showing <strong className="text-[#111318]">{filteredVehicles.length}</strong> of {vehicles.length} vehicles in Indore
          </span>
          <span className="font-mono">
            {selectedPackage === '12h' ? '12H Package: 150 KM Range' : '24H Package: 250 KM Range'} • Extra KM: ₹{selectedRentalType === 'Chauffeur' ? 8 : 6}/km
          </span>
        </div>

        {/* Vehicles Grid */}
        {filteredVehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                selectedRentalType={selectedRentalType}
                selectedPackage={selectedPackage}
                onOpenDetails={(v) => setModalVehicle(v)}
              />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4">
            <Car className="w-8 h-8 text-[#999999] mx-auto" />
            <h3 className="text-base font-bold text-[#111318]">No vehicles match these filters</h3>
            <p className="text-xs text-[#777777] max-w-sm mx-auto">
              Try adjusting your price range or clearing category filters to view available vehicles.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="btn-primary text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <VehicleDetailModal
        vehicle={modalVehicle}
        onClose={() => setModalVehicle(null)}
        selectedRentalType={selectedRentalType}
        selectedPackage={selectedPackage}
      />
    </div>
  );
};
