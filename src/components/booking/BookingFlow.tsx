import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Check, 
  Copy, 
  Printer, 
  MessageSquare,
  Car
} from 'lucide-react';
import { Vehicle, VehicleCategory, PackageDuration, Booking } from '../../types';
import { store } from '../../lib/store';
import { INDORE_LOCATIONS } from '../../data/locations';
import { BUSINESS_SETTINGS } from '../../data/settings';
import { formatINR, calculateDuration, computeReturnSchedule, generateBookingId } from '../../lib/utils';
import { buildBookingWhatsAppUrl } from '../../lib/whatsapp';

export const BookingFlow: React.FC = () => {
  const [searchParams] = useSearchParams();

  // Query parameters pre-population
  const queryType = searchParams.get('type') === 'Chauffeur' ? 'Chauffeur' : 'Self-Drive';
  const queryPkg = (searchParams.get('pkg') as PackageDuration) || '24h';
  const queryVehicleId = searchParams.get('vehicle') || '';
  const queryPickup = searchParams.get('pickup') || 'airport-idr';
  const queryDropoff = searchParams.get('dropoff') || 'airport-idr';
  const queryIsAirport = searchParams.get('isAirport') === 'true' || queryPickup === 'airport-idr';
  const queryFlight = searchParams.get('flight') || '';
  const queryPDate = searchParams.get('pDate') || '';
  const queryPTime = searchParams.get('pTime') || '10:00';
  const queryRDate = searchParams.get('rDate') || '';
  const queryRTime = searchParams.get('rTime') || '';

  const today = new Date();
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const initialPickupDate = queryPDate || formatDate(defaultPickup);
  const initialReturn = computeReturnSchedule(initialPickupDate, queryPTime, queryPkg);

  // Flow State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rentalType, setRentalType] = useState<'Self-Drive' | 'Chauffeur'>(queryType);
  const [packageDuration, setPackageDuration] = useState<PackageDuration>(queryPkg);
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'All'>('All');

  // Trip Details
  const [pickupLoc, setPickupLoc] = useState(queryPickup);
  const [dropoffLoc, setDropoffLoc] = useState(queryDropoff);
  const [isAirportHandover, setIsAirportHandover] = useState(queryIsAirport);
  const [flightNumber, setFlightNumber] = useState(queryFlight);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(queryPTime);
  const [returnDate, setReturnDate] = useState(queryRDate || initialReturn.returnDate);
  const [returnTime, setReturnTime] = useState(queryRTime || initialReturn.returnTime);

  const handlePackageSelect = (pkg: PackageDuration) => {
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

  // Selected Vehicle
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  // Customer Information
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [drivingLicense, setDrivingLicense] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Submission & Validation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    const vList = store.getVehicles();
    setVehicles(vList);

    if (queryVehicleId) {
      const found = vList.find((v) => v.id === queryVehicleId);
      if (found) {
        setSelectedVehicle(found);
        setSelectedCategory(found.category);
        if (queryPDate && queryRDate) {
          setCurrentStep(5);
        } else {
          setCurrentStep(3);
        }
      }
    }
  }, [queryVehicleId]);

  const duration = calculateDuration(pickupDate, pickupTime, returnDate, returnTime);

  const calculatePrices = () => {
    if (!selectedVehicle) {
      return { vehicleRent: 0, driverFee: 0, base: 0, gst: 0, deposit: 0, total: 0, includedKm: 0, days: 1 };
    }

    const isChauffeur = rentalType === 'Chauffeur';
    let vehicleRent = 0;
    let driverFee = 0;
    let includedKm = 0;
    let days = 1;

    if (packageDuration === '12h') {
      vehicleRent = selectedVehicle.price12h;
      driverFee = isChauffeur ? (selectedVehicle.driverFee12h || 899) : 0;
      includedKm = selectedVehicle.kmLimit12h || 150;
      days = 1;
    } else {
      days = Math.max(1, duration.days);
      vehicleRent = selectedVehicle.price24h * days;
      driverFee = isChauffeur ? (selectedVehicle.driverFee24h || 1499) * days : 0;
      includedKm = (selectedVehicle.kmLimit24h || 250) * days;
    }

    const base = vehicleRent + driverFee;
    const gst = 0;
    const deposit = rentalType === 'Self-Drive' ? selectedVehicle.securityDeposit : 0;
    // Total Payable is the exact rental fare; Refundable Security Deposit is collected separately at handover
    const total = base;
    return { vehicleRent, driverFee, base, gst, deposit, total, includedKm, days };
  };

  const prices = calculatePrices();

  const validateTripDetails = (): boolean => {
    if (!duration.isValid) {
      setErrorMessage(duration.errorMessage || 'Invalid return date');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const validateCustomerInfo = (): boolean => {
    if (!customerName.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return false;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return false;
    }
    if (!customerEmail.trim() || !customerEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (rentalType === 'Self-Drive' && !drivingLicense.trim()) {
      setErrorMessage('Driving License number is required for self-drive verification.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  const handleFinalSubmit = async () => {
    if (!selectedVehicle) return;
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const pickupLocObj = INDORE_LOCATIONS.find((l) => l.id === pickupLoc);
      const dropoffLocObj = INDORE_LOCATIONS.find((l) => l.id === dropoffLoc);

      const newBooking: Booking = {
        id: 'bkg-' + Date.now(),
        bookingReference: generateBookingId(),
        rentalType,
        packageDuration,
        vehicleId: selectedVehicle.id,
        vehicleName: selectedVehicle.name,
        vehicleCategory: selectedVehicle.category,
        pickupLocation: pickupLocObj ? pickupLocObj.name : pickupLoc,
        dropoffLocation: dropoffLocObj ? dropoffLocObj.name : dropoffLoc,
        isAirportPickup: isAirportHandover,
        flightNumber: isAirportHandover ? flightNumber : undefined,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        rentalDurationDays: packageDuration === '12h' ? 0.5 : duration.days,
        includedKm: prices.includedKm,
        driverFee: prices.driverFee,
        baseAmount: prices.base,
        gstAmount: prices.gst,
        securityDeposit: prices.deposit,
        totalEstimatedAmount: prices.total,
        customerName,
        customerPhone,
        customerEmail,
        drivingLicenseNumber: rentalType === 'Self-Drive' ? drivingLicense : undefined,
        specialRequests: specialRequests.trim() || undefined,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };

      await store.createBooking(newBooking);
      setConfirmedBooking(newBooking);
      setCurrentStep(7);
    } catch {
      setErrorMessage('Failed to save booking. Please check your network or reach us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingReference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const stepsList = [
    'Service',
    'Category',
    'Schedule',
    'Vehicle',
    'Customer',
    'Summary',
    'Confirmation',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Swiss Numbered Step Indicator */}
      {currentStep < 7 && (
        <div className="mb-10 pb-4 border-b border-[#E7E7E5] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-[#111318]">
              0{currentStep} /
            </span>
            <span className="font-display font-bold uppercase tracking-wider text-[#111318]">
              {stepsList[currentStep - 1]}
            </span>
          </div>

          <div className="text-[#777777] font-mono text-[11px]">
            Step {currentStep} of 6
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 rounded-[4px] bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: SERVICE TYPE & PACKAGE DURATION */}
      {currentStep === 1 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 01</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Select Service & Duration Package
            </h2>
            <p className="text-xs text-[#666666]">
              Choose between autonomous self-drive or chauffeur service, and select your travel duration package.
            </p>
          </div>

          {/* Rental Mode Selection */}
          <div className="space-y-3">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
              1. Choose Rental Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setRentalType('Self-Drive')}
                className={`cursor-pointer p-6 rounded-[4px] border transition-all flex flex-col justify-between space-y-4 ${
                  rentalType === 'Self-Drive'
                    ? 'border-[#111318] bg-[#F7F7F5]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#777777]">01 / Self-Drive</span>
                    {rentalType === 'Self-Drive' && <span className="w-2 h-2 rounded-full bg-[#111318]" />}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#111318]">Self-Drive Rental</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Drive independently. Clean vehicles, 24/7 handover at Indore Airport Bay 4, like-for-like fuel policy.
                  </p>
                </div>
                <div className="text-[11px] text-[#777777] pt-3 border-t border-[#E7E7E5] space-y-0.5 font-mono">
                  <div>• Extra KM: ₹6/km</div>
                  <div>• ₹10,000 refundable deposit at handover</div>
                </div>
              </div>

              <div
                onClick={() => setRentalType('Chauffeur')}
                className={`cursor-pointer p-6 rounded-[4px] border transition-all flex flex-col justify-between space-y-4 ${
                  rentalType === 'Chauffeur'
                    ? 'border-[#111318] bg-[#F7F7F5]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase text-[#777777]">02 / With Driver</span>
                    {rentalType === 'Chauffeur' && <span className="w-2 h-2 rounded-full bg-[#111318]" />}
                  </div>
                  <h3 className="text-lg font-display font-bold text-[#111318]">With Driver (Chauffeur)</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Relax in comfort. Professional uniformed chauffeur for city trips, airport meet & greet, or Ujjain pilgrimage.
                  </p>
                </div>
                <div className="text-[11px] text-[#777777] pt-3 border-t border-[#E7E7E5] space-y-0.5 font-mono">
                  <div>• Driver Fee: +₹1,499 (24H) / +₹899 (12H)</div>
                  <div>• Extra KM: ₹8/km • Zero deposit</div>
                </div>
              </div>
            </div>
          </div>

          {/* Package Duration Selection */}
          <div className="space-y-3 pt-2">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
              2. Choose Package Range
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => handlePackageSelect('24h')}
                className={`cursor-pointer p-5 rounded-[4px] border transition-all flex items-center justify-between ${
                  packageDuration === '24h'
                    ? 'border-[#111318] bg-[#F7F7F5]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#111318]">24 Hours Package</div>
                  <div className="text-sm font-display font-bold text-[#111318] mt-1">250 KM Included</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Extra: ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
                  </div>
                </div>
                {packageDuration === '24h' && <span className="w-2 h-2 rounded-full bg-[#111318]" />}
              </div>

              <div
                onClick={() => handlePackageSelect('12h')}
                className={`cursor-pointer p-5 rounded-[4px] border transition-all flex items-center justify-between ${
                  packageDuration === '12h'
                    ? 'border-[#111318] bg-[#F7F7F5]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div>
                  <div className="text-xs font-mono font-bold uppercase text-[#111318]">12 Hours Package</div>
                  <div className="text-sm font-display font-bold text-[#111318] mt-1">150 KM Included</div>
                  <div className="text-[11px] text-[#777777] mt-0.5">
                    Extra: ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
                  </div>
                </div>
                {packageDuration === '12h' && <span className="w-2 h-2 rounded-full bg-[#111318]" />}
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-primary"
            >
              <span>Continue to Category</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CATEGORY SELECTION */}
      {currentStep === 2 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 02</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Select Vehicle Category
            </h2>
            <p className="text-xs text-[#666666]">
              Choose the automotive segment suited to your passenger and luggage requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { id: 'Hatchback', num: '01', title: 'Hatchback', desc: 'Swift, Baleno, Glanza, Fronx, Dzire, Aura, Nexon', seats: '5 Seats', price: packageDuration === '12h' ? 'From ₹1,499' : 'From ₹2,199' },
              { id: 'Compact SUV', num: '02', title: 'Compact SUV', desc: 'Creta, Sonet, Brezza', seats: '5 Seats', price: packageDuration === '12h' ? 'From ₹1,999' : 'From ₹2,999' },
              { id: 'SUV', num: '03', title: 'SUV', desc: 'Harrier, Scorpio N/S11, Thar/Roxx, XUV700, Safari, Fortuner, Innova, Ertiga, XL6, Seltos', seats: '4 - 7 Seats', price: packageDuration === '12h' ? 'From ₹1,999' : 'From ₹2,999' },
              { id: 'Sedan', num: '04', title: 'Sedan', desc: 'Verna, Slavia', seats: '5 Seats', price: packageDuration === '12h' ? 'From ₹2,499' : 'From ₹3,499' },
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as VehicleCategory)}
                className={`cursor-pointer p-5 rounded-[4px] border transition-all flex flex-col justify-between space-y-4 ${
                  selectedCategory === cat.id
                    ? 'border-[#111318] bg-[#F7F7F5]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#777777]">{cat.num} /</span>
                    {selectedCategory === cat.id && <span className="w-1.5 h-1.5 rounded-full bg-[#111318]" />}
                  </div>
                  <h3 className="text-base font-display font-bold text-[#111318] mt-1">{cat.title}</h3>
                  <p className="text-xs text-[#777777] mt-0.5 leading-snug">{cat.desc}</p>
                </div>

                <div className="pt-3 border-t border-[#E7E7E5] text-[11px] text-[#555555] space-y-1">
                  <div>{cat.seats}</div>
                  <div className="font-mono font-medium text-[#111318]">{cat.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(1)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="btn-primary text-xs"
            >
              <span>Continue to Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRIP DETAILS */}
      {currentStep === 3 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 03</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Trip Schedule & Handover Locations
            </h2>
            <p className="text-xs text-[#666666]">
              Set your pickup and return locations in Indore with precise reporting times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Pickup Location</label>
              <select
                value={pickupLoc}
                onChange={(e) => {
                  setPickupLoc(e.target.value);
                  if (e.target.value === 'airport-idr') setIsAirportHandover(true);
                }}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              >
                {INDORE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Return Location</label>
              <select
                value={dropoffLoc}
                onChange={(e) => setDropoffLoc(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              >
                {INDORE_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Pickup Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={pickupDate}
                  min={formatDate(today)}
                  onChange={(e) => handlePickupDateChange(e.target.value)}
                  className="flex-1 min-w-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2 text-[#171717] focus:outline-none"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => handlePickupTimeChange(e.target.value)}
                  className="w-28 shrink-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2 text-[#171717] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Return Date & Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || formatDate(today)}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="flex-1 min-w-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2 text-[#171717] focus:outline-none"
                />
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-28 shrink-0 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2 text-[#171717] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#555555] gap-2">
            <div>
              Package: <strong className="text-[#111318] font-mono">{packageDuration === '12h' ? '12 Hours Package' : `${duration.days} Day(s) (24H blocks)`}</strong>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span>
                Range: <strong className="text-[#111318] font-mono">{packageDuration === '12h' ? '150 KM' : `${duration.days * 250} KM`}</strong> (Extra: ₹{rentalType === 'Chauffeur' ? 8 : 6}/km)
              </span>
              {selectedVehicle && (
                <span className="font-mono font-bold text-[#111318]">
                  • Fare: {formatINR(prices.total)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(2)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (validateTripDetails()) setCurrentStep(4);
              }}
              className="btn-primary text-xs"
            >
              <span>Select Available Car</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: VEHICLE SELECTION */}
      {currentStep === 4 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 04</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Select Your Vehicle
            </h2>
            <p className="text-xs text-[#666666]">
              Showing vehicles for <strong>{rentalType}</strong> • <strong>{packageDuration === '12h' ? '12 Hours (150 KM)' : '24 Hours (250 KM)'}</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {vehicles
              .filter((v) => {
                if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
                if (rentalType === 'Self-Drive' && !v.selfDriveAvailable) return false;
                if (rentalType === 'Chauffeur' && !v.chauffeurAvailable) return false;
                return true;
              })
              .map((v) => {
                const isSelected = selectedVehicle?.id === v.id;
                const isChauffeur = rentalType === 'Chauffeur';
                const rate = packageDuration === '12h'
                  ? (isChauffeur ? v.price12h + (v.driverFee12h || 899) : v.price12h)
                  : (isChauffeur ? v.price24h + (v.driverFee24h || 1499) : v.price24h);

                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVehicle(v)}
                    className={`cursor-pointer border rounded-[4px] overflow-hidden flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'border-[#111318] bg-[#F7F7F5]'
                        : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                    }`}
                  >
                    <div className="relative h-44 bg-[#F7F7F5] border-b border-[#E7E7E5]">
                      <img src={v.image} alt={v.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-[#FFFFFF]/95 px-2 py-0.5 text-[10px] font-mono text-[#111318] border border-[#E7E7E5]">
                        {v.category}
                      </div>
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#111318] text-white p-1 rounded-full">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    <div className="p-5 space-y-4 text-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-display font-bold text-[#111318] text-sm">{v.name}</h4>
                          <p className="text-[#777777] text-[11px]">{v.fuelType} • {v.transmission} • {v.seats} Seats</p>
                        </div>
                        <div className="text-right">
                          <span className="font-display font-bold text-sm text-[#111318] font-mono">{formatINR(rate)}</span>
                          <span className="text-[10px] text-[#777777] block font-mono">/ {packageDuration === '12h' ? '12 hrs' : '24 hrs'}</span>
                        </div>
                      </div>

                      <div className="p-2 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex items-center justify-between text-[11px] font-mono text-[#777777]">
                        <span>Range: {packageDuration === '12h' ? '150 KM' : '250 KM'}</span>
                        <span>Extra: ₹{isChauffeur ? 8 : 6}/km</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(v);
                          setCurrentStep(5);
                        }}
                        className={`w-full py-2.5 rounded-[4px] text-xs font-medium transition-colors ${
                          isSelected
                            ? 'bg-[#111318] text-white'
                            : 'bg-[#FFFFFF] border border-[#E7E7E5] text-[#171717] hover:bg-[#F7F7F5]'
                        }`}
                      >
                        {isSelected ? 'Selected — Proceed to Info' : 'Select Vehicle'}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(3)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              disabled={!selectedVehicle}
              onClick={() => {
                if (selectedVehicle) setCurrentStep(5);
              }}
              className="btn-primary text-xs disabled:opacity-50"
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CUSTOMER INFORMATION */}
      {currentStep === 5 && selectedVehicle && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 05</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Customer Verification & Contact
            </h2>
            <p className="text-xs text-[#666666]">
              Enter legal details for automated reservation invoice and handover protocol.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Full Legal Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anand Rathi"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Mobile (WhatsApp Enabled) *</label>
              <input
                type="tel"
                required
                placeholder="e.g. 98930 12345"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Email Address *</label>
              <input
                type="email"
                required
                placeholder="anand@company.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              />
            </div>

            {rentalType === 'Self-Drive' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold uppercase text-[#777777]">Driving License Number *</label>
                <input
                  type="text"
                  required
                  placeholder="MP09-2020-0012345"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value.toUpperCase())}
                  className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] font-mono uppercase focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[10px] font-semibold uppercase text-[#777777]">Notes / Special Requests (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Flight arrival terminal handover, child seat request..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(4)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={() => {
                if (validateCustomerInfo()) setCurrentStep(6);
              }}
              className="btn-primary text-xs"
            >
              <span>Review Summary</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUMMARY & BREAKDOWN */}
      {currentStep === 6 && selectedVehicle && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-10 space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#777777] block">Step 06</span>
            <h2 className="text-2xl font-display font-bold text-[#111318]">
              Review Booking Summary
            </h2>
            <p className="text-xs text-[#666666]">
              Verify trip parameters and transparent fee breakdown before final confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
            <div className="lg:col-span-7 space-y-4">
              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex items-center gap-4">
                <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-20 h-16 object-cover rounded-[2px]" />
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">{selectedVehicle.category} • {rentalType}</span>
                  <h4 className="font-bold text-[#111318] text-sm">{selectedVehicle.name}</h4>
                  <span className="text-[#666666]">{selectedVehicle.transmission} • {selectedVehicle.fuelType}</span>
                </div>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
                <div className="text-[10px] uppercase font-mono text-[#777777]">Itinerary & Package</div>
                <div>Package: <strong className="text-[#111318]">{packageDuration === '12h' ? '12 Hours (150 KM)' : `${duration.days} Day(s) (24H / ${duration.days * 250} KM)`}</strong></div>
                <div>Pickup: <strong className="text-[#111318]">{INDORE_LOCATIONS.find((l) => l.id === pickupLoc)?.name || pickupLoc}</strong> on {pickupDate} at {pickupTime}</div>
                <div>Return: <strong className="text-[#111318]">{INDORE_LOCATIONS.find((l) => l.id === dropoffLoc)?.name || dropoffLoc}</strong> on {returnDate} at {returnTime}</div>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <div className="text-[10px] uppercase font-mono text-[#777777]">Customer Verification</div>
                <div>{customerName} • {customerPhone} • {customerEmail}</div>
                {drivingLicense && <div className="font-mono text-[#286BFF]">DL: {drivingLicense}</div>}
              </div>
            </div>

            <div className="lg:col-span-5 p-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase text-[#777777] pb-2 border-b border-[#E7E7E5]">
                  Fare Breakdown
                </div>
                <div className="flex justify-between">
                  <span>
                    Vehicle Rent ({packageDuration === '12h' ? '12H' : `24H × ${prices.days}d`}):
                  </span>
                  <span className="font-mono">{formatINR(prices.vehicleRent)}</span>
                </div>
                {prices.driverFee > 0 && (
                  <div className="flex justify-between text-[#286BFF]">
                    <span>
                      With Driver ({packageDuration === '12h' ? '12H' : `24H × ${prices.days}d`}):
                    </span>
                    <span className="font-mono">+{formatINR(prices.driverFee)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Included Range:</span>
                  <span className="font-mono text-[#111318]">{prices.includedKm} KM</span>
                </div>
                <div className="flex justify-between text-[#777777]">
                  <span>Extra KM Rate:</span>
                  <span className="font-mono">₹{rentalType === 'Chauffeur' ? 8 : 6}/km</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#111318] pt-2 border-t border-[#E7E7E5]">
                  <span>Total Payable:</span>
                  <span className="font-mono">{formatINR(prices.total)}</span>
                </div>
                {rentalType === 'Self-Drive' && prices.deposit > 0 && (
                  <div className="p-2.5 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] text-[11px] space-y-0.5">
                    <div className="flex justify-between text-[#555555]">
                      <span>Refundable Deposit (At Handover):</span>
                      <span className="font-mono font-semibold text-[#111318]">{formatINR(prices.deposit)}</span>
                    </div>
                    <p className="text-[10px] text-[#777777]">
                      Not added to rental fare • 100% refunded within 24–48 hrs after return.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="w-full btn-primary"
              >
                {isSubmitting ? 'Registering...' : 'Confirm Reservation'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button
              onClick={() => setCurrentStep(5)}
              className="btn-secondary text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: CONFIRMATION & RECEIPT */}
      {currentStep === 7 && confirmedBooking && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-6 sm:p-12 space-y-8 animate-fade-in text-center">
          <div className="w-12 h-12 bg-[#111318] text-white rounded-[4px] flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#286BFF] font-semibold">
              Reservation Registered
            </span>
            <h2 className="text-3xl font-display font-extrabold text-[#111318]">
              Your Booking is Confirmed
            </h2>
            <p className="text-xs text-[#666666] max-w-md mx-auto leading-relaxed">
              Our Indore operations team has received your request. A reservation confirmation has been sent to your WhatsApp number.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-6 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] max-w-md mx-auto space-y-3">
            <span className="text-[10px] font-mono uppercase text-[#777777]">Booking Reference</span>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-mono font-extrabold text-[#111318]">
                {confirmedBooking.bookingReference}
              </span>
              <button
                type="button"
                onClick={handleCopyReference}
                className="p-1.5 text-[#777777] hover:text-[#111318]"
                title="Copy reference"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copiedRef && <span className="text-[10px] text-emerald-600 block">Copied to clipboard!</span>}
          </div>

          {/* Reservation Summary */}
          <div className="max-w-md mx-auto p-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-[#777777]">Vehicle:</span>
              <strong className="text-[#111318]">{confirmedBooking.vehicleName}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Service & Package:</span>
              <span>{confirmedBooking.rentalType} • {confirmedBooking.packageDuration === '12h' ? '12 Hours (150 KM)' : '24 Hours (250 KM)'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Pickup:</span>
              <span>{confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#777777]">Return:</span>
              <span>{confirmedBooking.returnDate} at {confirmedBooking.returnTime}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E7E7E5]">
              <span className="text-[#777777]">Total Rental Payable:</span>
              <strong className="text-[#111318] font-mono">{formatINR(confirmedBooking.totalEstimatedAmount)}</strong>
            </div>
            {confirmedBooking.securityDeposit > 0 && (
              <div className="flex justify-between text-[11px] text-[#777777]">
                <span>Refundable Deposit (At Handover):</span>
                <span className="font-mono">{formatINR(confirmedBooking.securityDeposit)}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={buildBookingWhatsAppUrl(confirmedBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-xs uppercase tracking-wider rounded-[4px] transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Connect on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F7F7F5] border border-[#E7E7E5] text-[#111318] font-medium text-xs uppercase tracking-wider rounded-[4px] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Voucher</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
