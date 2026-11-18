import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INDORE_LOCATIONS } from '../../data/locations';
import { calculateDuration, computeReturnSchedule } from '../../lib/utils';
import {
  ArrowRight,
  AlertCircle,
  MapPin,
  Calendar,
  Clock,
  Plane,
  ChevronDown,
  Check,
} from 'lucide-react';

interface BookingWidgetProps {
  initialRentalType?: 'Self-Drive' | 'Chauffeur';
  className?: string;
  onSearch?: (params: any) => void;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  initialRentalType = 'Self-Drive',
  className = '',
  onSearch,
}) => {
  const navigate = useNavigate();

  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split('T')[0];

  const addDays = (base: Date, days: number) => {
    const next = new Date(base);
    next.setDate(base.getDate() + days);
    return formatDate(next);
  };

  const todayStr = formatDate(today);
  const tomorrowStr = addDays(today, 1);
  const plus2Str = addDays(today, 2);

  const initialPickupTime = '10:00';
  const initialReturn = computeReturnSchedule(tomorrowStr, initialPickupTime, '24h');

  const [rentalType, setRentalType] = useState<'Self-Drive' | 'Chauffeur'>(initialRentalType);
  const [packageDuration, setPackageDuration] = useState<'24h' | '12h'>('24h');
  const [pickupLoc, setPickupLoc] = useState('airport-idr');
  const [dropoffLoc, setDropoffLoc] = useState('airport-idr');
  const [sameReturnLocation, setSameReturnLocation] = useState(true);
  const [pickupDate, setPickupDate] = useState(tomorrowStr);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [returnDate, setReturnDate] = useState(initialReturn.returnDate);
  const [returnTime, setReturnTime] = useState(initialReturn.returnTime);
  const [validationError, setValidationError] = useState<string | null>(null);

  const effectiveDropoff = sameReturnLocation ? pickupLoc : dropoffLoc;

  const handlePackageChange = (pkg: '24h' | '12h') => {
    setPackageDuration(pkg);
    const next = computeReturnSchedule(pickupDate, pickupTime, pkg);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
    setValidationError(null);
  };

  const handlePickupDateChange = (newDate: string) => {
    setPickupDate(newDate);
    const next = computeReturnSchedule(newDate, pickupTime, packageDuration);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
    setValidationError(null);
  };

  const handlePickupTimeChange = (newTime: string) => {
    setPickupTime(newTime);
    const next = computeReturnSchedule(pickupDate, newTime, packageDuration);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
    setValidationError(null);
  };

  const handlePickupLocChange = (loc: string) => {
    setPickupLoc(loc);
    if (sameReturnLocation) {
      setDropoffLoc(loc);
    }
  };

  const duration = calculateDuration(pickupDate, pickupTime, returnDate, returnTime);
  const isAirport = pickupLoc === 'airport-idr' || effectiveDropoff === 'airport-idr';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!duration.isValid) {
      setValidationError(duration.errorMessage || 'Return date & time must be after pickup.');
      return;
    }

    setValidationError(null);

    const params = new URLSearchParams({
      type: rentalType,
      pkg: packageDuration,
      pickup: pickupLoc,
      dropoff: effectiveDropoff,
      isAirport: isAirport ? 'true' : 'false',
      pDate: pickupDate,
      pTime: pickupTime,
      rDate: returnDate,
      rTime: returnTime,
      days: duration.days.toString(),
    });

    if (onSearch) {
      onSearch({
        rentalType,
        packageDuration,
        pickupLoc,
        dropoffLoc: effectiveDropoff,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        durationDays: duration.days,
      });
    } else {
      navigate(`/book?${params.toString()}`);
    }
  };

  return (
    <div
      className={`bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] shadow-subtle p-4 sm:p-7 lg:p-8 w-full ${className}`}
    >
      {/* Top Segmented Controls — Full-width 2-col grids on mobile, sleek inline pills on desktop */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-4 sm:pb-5 border-b border-[#E7E7E5] gap-3">
        <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Rental Mode Toggle */}
          <div className="grid grid-cols-2 sm:inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setRentalType('Self-Drive')}
              className={`min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold tracking-tight rounded-[3px] transition-all text-center ${
                rentalType === 'Self-Drive'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              Self-Drive
            </button>
            <button
              type="button"
              onClick={() => setRentalType('Chauffeur')}
              className={`min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold tracking-tight rounded-[3px] transition-all text-center ${
                rentalType === 'Chauffeur'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              With Driver
            </button>
          </div>

          {/* Package Duration Toggle */}
          <div className="grid grid-cols-2 sm:inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-1 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handlePackageChange('24h')}
              className={`min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold tracking-tight rounded-[3px] transition-all text-center ${
                packageDuration === '24h'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              24H <span className="font-mono font-normal opacity-80">• 250 KM</span>
            </button>
            <button
              type="button"
              onClick={() => handlePackageChange('12h')}
              className={`min-h-[40px] sm:min-h-0 px-3 sm:px-4 py-2 sm:py-1.5 text-xs font-semibold tracking-tight rounded-[3px] transition-all text-center ${
                packageDuration === '12h'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              12H <span className="font-mono font-normal opacity-80">• 150 KM</span>
            </button>
          </div>
        </div>

        {/* Airport Status Pill */}
        <div className="flex items-center justify-between sm:justify-start gap-2 text-[11px] text-[#666666]">
          <div className="flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 text-[#286BFF] shrink-0" />
            <span>Indore Airport Bay 4 Handover</span>
          </div>
          {pickupLoc !== 'airport-idr' && (
            <button
              type="button"
              onClick={() => handlePickupLocChange('airport-idr')}
              className="text-[11px] font-semibold text-[#286BFF] hover:underline shrink-0"
            >
              Set Airport
            </button>
          )}
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="pt-4 sm:pt-5 space-y-4 sm:space-y-5">
        {/* Location Block */}
        <div className="space-y-3">
          <div className={`grid grid-cols-1 ${sameReturnLocation ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-3 sm:gap-4`}>
            {/* Pickup Location */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#111318]" />
                  <span>{sameReturnLocation ? 'Pickup & Return Location' : 'Pickup Location'}</span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    const nextSame = !sameReturnLocation;
                    setSameReturnLocation(nextSame);
                    if (nextSame) setDropoffLoc(pickupLoc);
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#555555] hover:text-[#111318] transition-colors py-0.5"
                >
                  <span
                    className={`w-4 h-4 rounded-[3px] border flex items-center justify-center transition-colors ${
                      sameReturnLocation
                        ? 'bg-[#111318] border-[#111318] text-white'
                        : 'bg-white border-[#CCCCCC]'
                    }`}
                  >
                    {sameReturnLocation && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span>Same return spot</span>
                </button>
              </div>

              <div className="relative">
                <select
                  value={pickupLoc}
                  onChange={(e) => handlePickupLocChange(e.target.value)}
                  className="w-full min-h-[48px] sm:min-h-[44px] bg-[#F7F7F5] sm:bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#CCCCCC] focus:border-[#111318] focus:bg-[#FFFFFF] rounded-[4px] pl-3.5 pr-10 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none appearance-none font-medium"
                >
                  {INDORE_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none w-4 h-4 text-[#777777] absolute right-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Separate Return Location (shown only when user unchecks Same return spot) */}
            {!sameReturnLocation && (
              <div className="space-y-1.5 animate-fade-in">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>{rentalType === 'Chauffeur' ? 'Destination / Drop-off' : 'Return Location'}</span>
                </label>
                <div className="relative">
                  <select
                    value={dropoffLoc}
                    onChange={(e) => setDropoffLoc(e.target.value)}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#F7F7F5] sm:bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#CCCCCC] focus:border-[#111318] focus:bg-[#FFFFFF] rounded-[4px] pl-3.5 pr-10 py-2.5 text-base sm:text-xs text-[#171717] focus:outline-none appearance-none font-medium"
                  >
                    {INDORE_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none w-4 h-4 text-[#777777] absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Pickup Day Chips (Mobile-First Ergonomics) */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#888888] shrink-0">
            Quick Pickup:
          </span>
          {[
            { label: 'Today', date: todayStr },
            { label: 'Tomorrow', date: tomorrowStr },
            { label: 'In 2 Days', date: plus2Str },
          ].map((chip) => {
            const active = pickupDate === chip.date;
            return (
              <button
                key={chip.label}
                type="button"
                onClick={() => handlePickupDateChange(chip.date)}
                className={`px-3 py-1.5 rounded-[4px] text-[11px] font-medium border transition-colors whitespace-nowrap ${
                  active
                    ? 'bg-[#111318] text-white border-[#111318]'
                    : 'bg-[#F7F7F5] text-[#555555] border-[#E7E7E5] hover:border-[#111318]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Paired Pickup & Return Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Pickup Date & Time */}
          <div className="p-3 sm:p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#111318]" />
                Pickup Date
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#111318]" />
                Time
              </span>
            </div>
            <div className="grid grid-cols-[1.35fr_1fr] gap-2">
              <input
                type="date"
                value={pickupDate}
                min={todayStr}
                onChange={(e) => handlePickupDateChange(e.target.value)}
                className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 sm:px-3 py-2 text-base sm:text-xs text-[#171717] font-medium focus:outline-none"
                required
              />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => handlePickupTimeChange(e.target.value)}
                className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 sm:px-3 py-2 text-base sm:text-xs text-[#171717] font-mono font-medium focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="p-3 sm:p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-[#286BFF]" />
                Return Date
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#286BFF]" />
                Time
              </span>
            </div>
            <div className="grid grid-cols-[1.35fr_1fr] gap-2">
              <input
                type="date"
                value={returnDate}
                min={pickupDate || todayStr}
                onChange={(e) => {
                  setReturnDate(e.target.value);
                  setValidationError(null);
                }}
                className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 sm:px-3 py-2 text-base sm:text-xs text-[#171717] font-medium focus:outline-none"
                required
              />
              <input
                type="time"
                value={returnTime}
                onChange={(e) => {
                  setReturnTime(e.target.value);
                  setValidationError(null);
                }}
                className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 sm:px-3 py-2 text-base sm:text-xs text-[#171717] font-mono font-medium focus:outline-none"
                required
              />
            </div>
          </div>
        </div>

        {validationError && (
          <div className="p-3 rounded-[4px] bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Bottom Trip Summary & Primary CTA */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#E7E7E5]">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-x-3 gap-y-1 text-xs bg-[#F7F7F5] sm:bg-transparent px-3 py-2.5 sm:p-0 rounded-[4px] border border-[#E7E7E5] sm:border-0">
            <div className="font-semibold text-[#111318]">
              {packageDuration === '12h'
                ? '12 Hours • 150 KM'
                : duration.isValid
                ? `${duration.days} Day${duration.days > 1 ? 's' : ''} • ${duration.days * 250} KM`
                : '24 Hours • 250 KM'}
            </div>
            <div className="text-[11px] font-mono text-[#666666]">
              Extra ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
              {rentalType === 'Chauffeur' && (
                <span className="text-[#286BFF] ml-1.5">
                  (+₹{packageDuration === '12h' ? '899' : '1,499'} driver)
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto min-h-[50px] sm:min-h-[46px] inline-flex items-center justify-center gap-2 bg-[#111318] hover:bg-[#262626] active:scale-[0.99] text-[#FFFFFF] text-sm sm:text-xs font-semibold px-8 py-3.5 rounded-[4px] transition-all"
          >
            <span>Search Available Cars</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};
