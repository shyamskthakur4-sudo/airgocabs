import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INDORE_LOCATIONS } from '../../data/locations';
import { calculateDuration, computeReturnSchedule } from '../../lib/utils';
import { ArrowRight, AlertCircle } from 'lucide-react';

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
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const initialPickupDate = formatDate(defaultPickup);
  const initialPickupTime = '10:00';
  const initialReturn = computeReturnSchedule(initialPickupDate, initialPickupTime, '24h');

  const [rentalType, setRentalType] = useState<'Self-Drive' | 'Chauffeur'>(initialRentalType);
  const [packageDuration, setPackageDuration] = useState<'24h' | '12h'>('24h');
  const [pickupLoc, setPickupLoc] = useState('airport-idr');
  const [dropoffLoc, setDropoffLoc] = useState('airport-idr');
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(initialPickupTime);
  const [returnDate, setReturnDate] = useState(initialReturn.returnDate);
  const [returnTime, setReturnTime] = useState(initialReturn.returnTime);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handlePackageChange = (pkg: '24h' | '12h') => {
    setPackageDuration(pkg);
    const next = computeReturnSchedule(pickupDate, pickupTime, pkg);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
  };

  const handlePickupDateChange = (newDate: string) => {
    setPickupDate(newDate);
    const next = computeReturnSchedule(newDate, pickupTime, packageDuration);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
  };

  const handlePickupTimeChange = (newTime: string) => {
    setPickupTime(newTime);
    const next = computeReturnSchedule(pickupDate, newTime, packageDuration);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
  };

  const duration = calculateDuration(pickupDate, pickupTime, returnDate, returnTime);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!duration.isValid) {
      setValidationError(duration.errorMessage || 'Invalid date selection');
      return;
    }

    setValidationError(null);

    const params = new URLSearchParams({
      type: rentalType,
      pkg: packageDuration,
      pickup: pickupLoc,
      dropoff: dropoffLoc,
      isAirport: pickupLoc === 'airport-idr' || dropoffLoc === 'airport-idr' ? 'true' : 'false',
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
        dropoffLoc,
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
    <div className={`bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] shadow-subtle p-4 sm:p-8 w-full ${className}`}>
      {/* Service Segmented Toggle & Airport Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-[#E7E7E5] gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {/* Rental Type */}
          <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-0.5">
            <button
              type="button"
              onClick={() => setRentalType('Self-Drive')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-tight rounded-[2px] transition-all ${
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
              className={`px-3.5 py-1.5 text-xs font-medium tracking-tight rounded-[2px] transition-all ${
                rentalType === 'Chauffeur'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              With Driver
            </button>
          </div>

          {/* Package Duration */}
          <div className="inline-flex rounded-[4px] border border-[#E7E7E5] bg-[#F7F7F5] p-0.5">
            <button
              type="button"
              onClick={() => handlePackageChange('24h')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-tight rounded-[2px] transition-all ${
                packageDuration === '24h'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              24H (250 KM)
            </button>
            <button
              type="button"
              onClick={() => handlePackageChange('12h')}
              className={`px-3.5 py-1.5 text-xs font-medium tracking-tight rounded-[2px] transition-all ${
                packageDuration === '12h'
                  ? 'bg-[#111318] text-[#FFFFFF]'
                  : 'text-[#666666] hover:text-[#111318]'
              }`}
            >
              12H (150 KM)
            </button>
          </div>
        </div>

        <div className="text-[11px] sm:text-xs text-[#777777] font-normal flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#286BFF] shrink-0" />
          <span>Airport Handover (Terminal 1 • Bay 4)</span>
        </div>
      </div>

      {/* Main Search Form */}
      <form onSubmit={handleSubmit} className="pt-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
              Pickup Location
            </label>
            <div className="relative">
              <select
                value={pickupLoc}
                onChange={(e) => setPickupLoc(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#CCCCCC] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none appearance-none pr-8 font-normal"
              >
                {INDORE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#999999] text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Destination / Drop-off */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
              {rentalType === 'Chauffeur' ? 'Destination' : 'Return Location'}
            </label>
            <div className="relative">
              <select
                value={dropoffLoc}
                onChange={(e) => setDropoffLoc(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#CCCCCC] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-xs text-[#171717] focus:outline-none appearance-none pr-8 font-normal"
              >
                {INDORE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#999999] text-[10px]">
                ▼
              </div>
            </div>
          </div>

          {/* Pickup Date & Time */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
              Pickup Date & Time
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={pickupDate}
                min={formatDate(today)}
                onChange={(e) => handlePickupDateChange(e.target.value)}
                className="w-full sm:flex-1 min-w-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-3 py-2 text-xs text-[#171717] focus:border-[#111318] focus:outline-none"
                required
              />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => handlePickupTimeChange(e.target.value)}
                className="w-full sm:w-28 shrink-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-3 py-2 text-xs text-[#171717] focus:border-[#111318] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Return Date & Time */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#777777]">
              Return Date & Time
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="date"
                value={returnDate}
                min={pickupDate || formatDate(today)}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full sm:flex-1 min-w-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-3 py-2 text-xs text-[#171717] focus:border-[#111318] focus:outline-none"
                required
              />
              <input
                type="time"
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full sm:w-28 shrink-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-3 py-2 text-xs text-[#171717] focus:border-[#111318] focus:outline-none"
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

        {/* Bottom Submission Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#E7E7E5]">
          <div className="text-xs text-[#777777]">
            <span>Package: </span>
            <span className="font-medium text-[#111318]">
              {packageDuration === '12h'
                ? '12 Hours • 150 KM Range included'
                : duration.isValid
                ? `${duration.days} Day(s) • ${duration.days * 250} KM Range included`
                : '24 Hours • 250 KM Range included'}
            </span>
            <span className="text-[#999999] ml-2 font-mono text-[11px]">
              (Extra: ₹{rentalType === 'Chauffeur' ? 8 : 6}/km)
            </span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#111318] hover:bg-[#262626] text-[#FFFFFF] text-xs font-medium px-8 py-3.5 rounded-[4px] transition-colors"
          >
            <span>Search Available Cars</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </form>
    </div>
  );
};
