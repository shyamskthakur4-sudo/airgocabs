import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INDORE_LOCATIONS } from '../data/locations';
import { updateMetaTags } from '../lib/seo';
import { buildAirportWhatsAppUrl } from '../lib/whatsapp';

export const AirportTransferPage: React.FC = () => {
  const navigate = useNavigate();

  const [direction, setDirection] = useState<'Pickup' | 'Drop'>('Pickup');
  const [serviceTier, setServiceTier] = useState<'Self-Drive' | 'Chauffeur'>('Chauffeur');
  const [flightNo, setFlightNo] = useState('');
  const [cityLocation, setCityLocation] = useState('vijay-nagar');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:30');

  useEffect(() => {
    updateMetaTags({
      title: 'Airport Car Rental Indore | Devi Ahilya Bai Holkar Airport (IDR) — AIRGOCABS',
      description: 'Your journey starts at the airport. Premium airport car rentals and transfers at Devi Ahilya Bai Holkar Airport, Indore. Live flight tracking and dedicated Bay 4 handover.',
    });
  }, []);

  const handleAirportSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const isPickup = direction === 'Pickup';
    const params = new URLSearchParams({
      type: serviceTier,
      pickup: isPickup ? 'airport-idr' : cityLocation,
      dropoff: isPickup ? cityLocation : 'airport-idr',
      isAirport: 'true',
      flight: flightNo,
      pDate: date,
      pTime: time,
    });
    navigate(`/book?${params.toString()}`);
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        
        {/* Editorial Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Indore Gateway • Devi Ahilya Bai Holkar Airport (IDR)
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.08]">
              Your Journey Starts at the Airport.
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-xl leading-relaxed">
              Arrive with distinction. Dedicated Parking Bay 4 handover for self-drive autonomy, or an executive chauffeur greeting you at Terminal 1 Arrival Gate 2 with a name placard.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#airport-form" className="btn-primary">
                <span>Reserve Airport Ride</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </a>
              <a
                href={buildAirportWhatsAppUrl(true)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <span>WhatsApp Airport Concierge</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-right text-xs text-[#777777]">
            <div className="font-semibold text-[#111318]">Terminal 1 Gate 2 Handover</div>
            <div>Runway Flight Tracking</div>
            <div>Zero Delay Surcharges</div>
          </div>
        </div>

        {/* Airport Booking Form */}
        <div id="airport-form" className="max-w-3xl mx-auto scroll-mt-36">
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-8 sm:p-10 space-y-6 shadow-subtle">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold">
                Flight Synchronization
              </span>
              <h3 className="text-2xl font-display font-bold text-[#111318]">
                Indore Airport Transfer Reservation
              </h3>
              <p className="text-xs text-[#666666]">
                Select transfer direction and flight arrival details for seamless terminal coordination.
              </p>
            </div>

            <form onSubmit={handleAirportSearch} className="space-y-5 text-xs">
              {/* Pickup vs Drop */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDirection('Pickup')}
                  className={`py-2.5 px-3 rounded-[4px] text-xs font-medium transition-all ${
                    direction === 'Pickup'
                      ? 'bg-[#111318] text-[#FFFFFF]'
                      : 'bg-[#F7F7F5] text-[#555555] border border-[#E7E7E5]'
                  }`}
                >
                  Airport Pickup (Arrival)
                </button>
                <button
                  type="button"
                  onClick={() => setDirection('Drop')}
                  className={`py-2.5 px-3 rounded-[4px] text-xs font-medium transition-all ${
                    direction === 'Drop'
                      ? 'bg-[#111318] text-[#FFFFFF]'
                      : 'bg-[#F7F7F5] text-[#555555] border border-[#E7E7E5]'
                  }`}
                >
                  Airport Drop-off (Departure)
                </button>
              </div>

              {/* Service Mode */}
              <div className="flex items-center justify-between p-3 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px]">
                <span className="text-xs text-[#555555]">Rental Type:</span>
                <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#FFFFFF] p-0.5">
                  <button
                    type="button"
                    onClick={() => setServiceTier('Chauffeur')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-[2px] transition-all ${
                      serviceTier === 'Chauffeur'
                        ? 'bg-[#111318] text-[#FFFFFF]'
                        : 'text-[#666666]'
                    }`}
                  >
                    Chauffeur
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceTier('Self-Drive')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-[2px] transition-all ${
                      serviceTier === 'Self-Drive'
                        ? 'bg-[#111318] text-[#FFFFFF]'
                        : 'text-[#666666]'
                    }`}
                  >
                    Self-Drive
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase text-[#777777]">
                    Flight Number (Runway Tracking)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6E-452 or AI-635"
                    value={flightNo}
                    onChange={(e) => setFlightNo(e.target.value.toUpperCase())}
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono uppercase focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase text-[#777777]">
                    {direction === 'Pickup' ? 'Destination in Indore' : 'Indore Pickup Address'}
                  </label>
                  <select
                    value={cityLocation}
                    onChange={(e) => setCityLocation(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                  >
                    {INDORE_LOCATIONS.filter((l) => l.id !== 'airport-idr').map((loc) => (
                      <option key={loc.id} value={loc.id}>{loc.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase text-[#777777]">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold uppercase text-[#777777]">Landing / Departure Time</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-primary"
                >
                  <span>Check Airport Availability & Confirm</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* 3 Operational Standards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Standard 01</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Terminal Meet & Greet</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Your chauffeur waits at Terminal 1 Arrival Gate with a personalized name card and assists with luggage handling.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Standard 02</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Bay 4 Self-Drive Handover</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Clean car stationed in Airport Parking Bay 4. Digital inspection on your smartphone and key handover in under 4 minutes.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono text-[#777777] block">Standard 03</span>
            <h3 className="text-base font-display font-bold text-[#111318]">Flight Delay Protection</h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Runway tracking automatically adjusts dispatch if your flight lands early or gets delayed. Zero waiting fee charged.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
