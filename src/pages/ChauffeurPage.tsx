import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, Clock } from 'lucide-react';
import { CHAUFFEUR_PACKAGES } from '../data/policies';
import { INDORE_LOCATIONS } from '../data/locations';
import { updateMetaTags } from '../lib/seo';
import {
  getEarliestPickupSchedule,
  getMinAdvanceHoursForCategory,
  validatePickupAdvanceTime,
} from '../lib/utils';

export const ChauffeurPage: React.FC = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState<'Local City' | 'Airport Transfer' | 'Outstation (Ujjain/Omkareshwar)'>('Local City');
  const [pickupLoc, setPickupLoc] = useState('vijay-nagar');
  const [destination, setDestination] = useState('Indore Municipal Limits / Brilliant Convention Centre');
  const [selectedCategory, setSelectedCategory] = useState<'Hatchback' | 'Compact SUV' | 'Sedan' | 'SUV'>('Sedan');
  const [selectedPackage, setSelectedPackage] = useState<'24h' | '12h'>('24h');

  const minAdvanceHours = getMinAdvanceHoursForCategory(selectedCategory);
  const earliest = getEarliestPickupSchedule(minAdvanceHours);

  const [travelDate, setTravelDate] = useState(() => getEarliestPickupSchedule(24).minDate);
  const [travelTime, setTravelTime] = useState(() => getEarliestPickupSchedule(24).minTime);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCategoryChange = (newCat: 'Hatchback' | 'Compact SUV' | 'Sedan' | 'SUV') => {
    setSelectedCategory(newCat);
    const reqHours = getMinAdvanceHoursForCategory(newCat);
    const check = validatePickupAdvanceTime(travelDate, travelTime, reqHours, newCat);
    if (!check.isValid) {
      setTravelDate(check.earliest.minDate);
      setTravelTime(check.earliest.minTime);
    }
    setFormError(null);
  };

  useEffect(() => {
    updateMetaTags({
      title: 'Chauffeur-Driven Car Rental Indore | AIRGOCABS',
      description: 'Travel without the drive. Executive chauffeur services in Indore for corporate travel, airport meet & greet, weddings, and Ujjain temple darshans.',
    });
  }, []);

  const handleChauffeurSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const advCheck = validatePickupAdvanceTime(travelDate, travelTime, minAdvanceHours, selectedCategory);
    if (!advCheck.isValid) {
      setFormError(
        advCheck.errorMessage || `Minimum ${minAdvanceHours}-hour advance pre-booking required for ${selectedCategory}.`
      );
      return;
    }
    setFormError(null);
    const params = new URLSearchParams({
      type: 'Chauffeur',
      pkg: selectedPackage,
      pickup: pickupLoc,
      dropoff: tripType === 'Airport Transfer' ? 'airport-idr' : pickupLoc,
      pDate: travelDate,
      pTime: travelTime,
      category: selectedCategory,
    });
    navigate(`/book?${params.toString()}`);
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        
        {/* Editorial Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Executive Service • Indore
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.08]">
              Travel Without the Drive.
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-xl leading-relaxed">
              Comfortable, convenient transportation with a professional driver. For corporate delegates, airport arrivals, family celebrations, and spiritual day trips to Ujjain and Omkareshwar.
            </p>
            <div className="pt-2">
              <a
                href="#chauffeur-form"
                className="btn-primary"
              >
                <span>Book Chauffeur Service</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-right text-xs text-[#777777]">
            <div className="font-semibold text-[#111318]">+₹1,499 (24H) • +₹899 (12H)</div>
            <div>250 KM / 150 KM • Extra ₹8/km</div>
            <div>Zero Security Deposit</div>
          </div>
        </div>

        {/* Feature Photography */}
        <div className="relative h-[360px] sm:h-[480px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#EFEFEA]">
          <img
            src="/images/chauffeur-service.jpg"
            alt="Chauffeur Travel in Indore"
            className="w-full h-full object-cover object-[center_65%]"
            loading="eager"
          />
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Airport</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Airport Meet & Greet</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Chauffeur stationed at Terminal 1 Arrival Gate with a personalized name card. Real-time flight tracking included.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Corporate</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Corporate & City Travel</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              12H (150 KM, +₹899) and 24H (250 KM, +₹1,499) chauffeur packages for meetings across Vijay Nagar, Palasia, and SEZ zones.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Pilgrimage</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Ujjain & Omkareshwar</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Experienced highway drivers for Mahakaleshwar Jyotirlinga VIP darshans, Omkareshwar, and Maheshwar ghats.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Events</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Weddings & Delegations</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Innova Crysta captain seats, BMW sedans, and luxury MPVs for distinguished family and corporate guests.
            </p>
          </div>
        </div>

        {/* Chauffeur Packages List */}
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Curated Packages
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#111318]">
              Standard Chauffeur Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHAUFFEUR_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#777777] uppercase block">{pkg.duration}</span>
                  <h3 className="text-base font-display font-bold text-[#111318]">{pkg.name}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">{pkg.description}</p>
                </div>

                <div className="pt-3 border-t border-[#E7E7E5] text-[11px] text-[#555555] space-y-1">
                  <div>Extra hours: <span className="font-medium text-[#111318]">{pkg.extraHourRate}</span></div>
                  <div>Extra km: <span className="font-medium text-[#111318]">{pkg.extraKmRate}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chauffeur Booking Form */}
        <div id="chauffeur-form" className="max-w-3xl mx-auto scroll-mt-36">
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-8 sm:p-10 space-y-6 shadow-subtle">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold">
                Direct Booking Form
              </span>
              <h3 className="text-2xl font-display font-bold text-[#111318]">
                Reserve a Chauffeur-Driven Car
              </h3>
              <p className="text-xs text-[#666666]">
                Provide your travel itinerary to receive instantaneous vehicle allocation.
              </p>
            </div>

            <form onSubmit={handleChauffeurSearch} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Local City',
                  'Airport Transfer',
                  'Outstation (Ujjain/Omkareshwar)',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTripType(t as any)}
                    className={`min-h-[44px] py-2.5 px-3 rounded-[4px] text-xs font-semibold transition-all ${
                      tripType === t
                        ? 'bg-[#111318] text-[#FFFFFF]'
                        : 'bg-[#F7F7F5] text-[#555555] border border-[#E7E7E5]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase text-[#666666]">Pickup Location</label>
                  <select
                    value={pickupLoc}
                    onChange={(e) => setPickupLoc(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none"
                  >
                    {INDORE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase text-[#666666]">Destination / Area</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none"
                    placeholder="e.g. Ujjain, Indore Airport, or Hotel"
                  />
                </div>

                <div className="grid grid-cols-[1.35fr_1fr] gap-2 sm:col-span-2">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase text-[#666666]">Date</label>
                    <input
                      type="date"
                      min={earliest.minDate}
                      value={travelDate}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTravelDate(val);
                        if (val === earliest.minDate && travelTime < earliest.minTime) {
                          setTravelTime(earliest.minTime);
                        }
                        setFormError(null);
                      }}
                      className="w-full min-w-0 min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold uppercase text-[#666666]">Time</label>
                    <input
                      type="time"
                      min={travelDate === earliest.minDate ? earliest.minTime : undefined}
                      value={travelTime}
                      onChange={(e) => {
                        setTravelTime(e.target.value);
                        setFormError(null);
                      }}
                      className="w-full min-w-0 min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-1.5 text-[11px] font-mono text-[#666666]">
                  <Clock className="w-3.5 h-3.5 text-[#286BFF] shrink-0" />
                  <span>Min {minAdvanceHours}-hour advance pre-booking ({selectedCategory}) • Earliest: {earliest.displayLabel}</span>
                </div>

                {formError && (
                  <div className="sm:col-span-2 p-3 rounded-[4px] bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase text-[#666666]">Package Duration</label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value as '24h' | '12h')}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none"
                  >
                    <option value="24h">24 Hours • 250 KM (+₹1,499 Driver)</option>
                    <option value="12h">12 Hours • 150 KM (+₹899 Driver)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold uppercase text-[#666666]">Vehicle Segment</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value as any)}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none"
                  >
                    <option value="Hatchback">Hatchback — 4h pre-book (Swift / Baleno / Glanza / Dzire)</option>
                    <option value="Compact SUV">Compact SUV — 24h pre-book (Creta / Sonet / Brezza)</option>
                    <option value="Sedan">Executive Sedan — 24h pre-book (Verna / Slavia)</option>
                    <option value="SUV">SUV / 7-Seater — 24h pre-book (Innova / XUV 7OO / Scorpio-N / Fortuner)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full min-h-[50px] btn-primary"
                >
                  <span>Proceed to Check Rates & Confirm</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
