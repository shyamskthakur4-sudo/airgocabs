import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Check,
  Copy,
  Printer,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  Plane,
  ChevronDown,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { Vehicle, VehicleCategory, PackageDuration, Booking } from '../../types';
import { store } from '../../lib/store';
import { INDORE_LOCATIONS } from '../../data/locations';
import { BUSINESS_SETTINGS } from '../../data/settings';
import {
  formatINR,
  calculateDuration,
  computeReturnSchedule,
  generateBookingId,
} from '../../lib/utils';
import { buildBookingWhatsAppUrl } from '../../lib/whatsapp';

export const BookingFlow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const topRef = useRef<HTMLDivElement>(null);

  // Query parameters pre-population
  const queryType = searchParams.get('type') === 'Chauffeur' ? 'Chauffeur' : 'Self-Drive';
  const queryPkg = (searchParams.get('pkg') as PackageDuration) || '24h';
  const queryCategory = (searchParams.get('category') as VehicleCategory | 'All') || 'All';
  const queryVehicleId = searchParams.get('vehicle') || '';
  const queryPickup = searchParams.get('pickup') || 'airport-idr';
  const queryDropoff = searchParams.get('dropoff') || queryPickup;
  const queryIsAirport =
    searchParams.get('isAirport') === 'true' ||
    queryPickup === 'airport-idr' ||
    queryDropoff === 'airport-idr';
  const queryFlight = searchParams.get('flight') || '';
  const queryPDate = searchParams.get('pDate') || '';
  const queryPTime = searchParams.get('pTime') || '10:00';
  const queryRDate = searchParams.get('rDate') || '';
  const queryRTime = searchParams.get('rTime') || '';

  const today = new Date();
  const formatDate = (d: Date) => d.toISOString().split('T')[0];
  const defaultPickup = new Date(today);
  defaultPickup.setDate(today.getDate() + 1);
  const initialPickupDate = queryPDate || formatDate(defaultPickup);
  const initialReturn = computeReturnSchedule(initialPickupDate, queryPTime, queryPkg);

  // Flow State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rentalType, setRentalType] = useState<'Self-Drive' | 'Chauffeur'>(queryType);
  const [packageDuration, setPackageDuration] = useState<PackageDuration>(queryPkg);
  const [selectedCategory, setSelectedCategory] = useState<VehicleCategory | 'All'>(queryCategory);

  // Trip Details
  const [pickupLoc, setPickupLoc] = useState(queryPickup);
  const [dropoffLoc, setDropoffLoc] = useState(queryDropoff);
  const [sameReturnLocation, setSameReturnLocation] = useState(queryPickup === queryDropoff);
  const [isAirportHandover, setIsAirportHandover] = useState(queryIsAirport);
  const [flightNumber, setFlightNumber] = useState(queryFlight);
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [pickupTime, setPickupTime] = useState(queryPTime);
  const [returnDate, setReturnDate] = useState(queryRDate || initialReturn.returnDate);
  const [returnTime, setReturnTime] = useState(queryRTime || initialReturn.returnTime);

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

  const effectiveDropoff = sameReturnLocation ? pickupLoc : dropoffLoc;

  const goToStep = (step: number) => {
    setErrorMessage(null);
    setCurrentStep(step);
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 40);
  };

  const applyQuickDuration = (mode: '12h' | '1d' | '2d' | '3d') => {
    setErrorMessage(null);
    if (mode === '12h') {
      setPackageDuration('12h');
      const next = computeReturnSchedule(pickupDate, pickupTime, '12h');
      setReturnDate(next.returnDate);
      setReturnTime(next.returnTime);
      return;
    }
    setPackageDuration('24h');
    const daysCount = mode === '1d' ? 1 : mode === '2d' ? 2 : 3;
    const start = new Date(`${pickupDate}T${pickupTime || '10:00'}`);
    if (!isNaN(start.getTime())) {
      const end = new Date(start.getTime() + daysCount * 24 * 60 * 60 * 1000);
      const yyyy = end.getFullYear();
      const mm = String(end.getMonth() + 1).padStart(2, '0');
      const dd = String(end.getDate()).padStart(2, '0');
      const hh = String(end.getHours()).padStart(2, '0');
      const min = String(end.getMinutes()).padStart(2, '0');
      setReturnDate(`${yyyy}-${mm}-${dd}`);
      setReturnTime(`${hh}:${min}`);
    }
  };

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
    setErrorMessage(null);
  };

  const handlePickupTimeChange = (newTime: string) => {
    setPickupTime(newTime);
    const next = computeReturnSchedule(pickupDate, newTime, packageDuration);
    setReturnDate(next.returnDate);
    setReturnTime(next.returnTime);
    setErrorMessage(null);
  };

  const handlePickupLocChange = (loc: string) => {
    setPickupLoc(loc);
    if (sameReturnLocation) {
      setDropoffLoc(loc);
    }
    setIsAirportHandover(loc === 'airport-idr' || (!sameReturnLocation && dropoffLoc === 'airport-idr'));
  };

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
    } else if (queryPDate && queryRDate) {
      // Came from Homepage BookingWidget — jump directly to Vehicle Selection!
      setCurrentStep(4);
    }
  }, [queryVehicleId, queryPDate, queryRDate]);

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
    const total = base;
    return { vehicleRent, driverFee, base, gst, deposit, total, includedKm, days };
  };

  const prices = calculatePrices();

  const validateTripDetails = (): boolean => {
    if (!duration.isValid) {
      setErrorMessage(duration.errorMessage || 'Return date & time must be after pickup date & time.');
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
      const dropoffLocObj = INDORE_LOCATIONS.find((l) => l.id === effectiveDropoff);

      const newBooking: Booking = {
        id: 'bkg-' + Date.now(),
        bookingReference: generateBookingId(),
        rentalType,
        packageDuration,
        vehicleId: selectedVehicle.id,
        vehicleName: selectedVehicle.name,
        vehicleCategory: selectedVehicle.category,
        pickupLocation: pickupLocObj ? pickupLocObj.name : pickupLoc,
        dropoffLocation: dropoffLocObj ? dropoffLocObj.name : effectiveDropoff,
        isAirportPickup: isAirportHandover,
        flightNumber: isAirportHandover && flightNumber.trim() ? flightNumber.trim().toUpperCase() : undefined,
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
      goToStep(7);
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
    { num: 1, label: 'Service' },
    { num: 2, label: 'Segment' },
    { num: 3, label: 'Schedule' },
    { num: 4, label: 'Vehicle' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Review' },
  ];

  // Primary action handler for sticky mobile bar & desktop footer
  const handlePrimaryNext = () => {
    if (currentStep === 1) {
      goToStep(2);
    } else if (currentStep === 2) {
      goToStep(3);
    } else if (currentStep === 3) {
      if (validateTripDetails()) {
        goToStep(selectedVehicle ? 5 : 4);
      }
    } else if (currentStep === 4) {
      if (selectedVehicle) goToStep(5);
    } else if (currentStep === 5) {
      if (validateCustomerInfo()) goToStep(6);
    } else if (currentStep === 6) {
      handleFinalSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const primaryCtaLabel = () => {
    if (currentStep === 1) return 'Choose Segment';
    if (currentStep === 2) return 'Set Schedule';
    if (currentStep === 3) return selectedVehicle ? 'Continue to Details' : 'Choose Vehicle';
    if (currentStep === 4) return 'Continue to Details';
    if (currentStep === 5) return 'Review Booking';
    if (currentStep === 6) return isSubmitting ? 'Confirming...' : 'Confirm Reservation';
    return 'Continue';
  };

  const primaryDisabled =
    (currentStep === 4 && !selectedVehicle) || (currentStep === 6 && isSubmitting);

  const filteredStep4Vehicles = vehicles.filter((v) => {
    if (selectedCategory !== 'All' && v.category !== selectedCategory) return false;
    if (rentalType === 'Self-Drive' && !v.selfDriveAvailable) return false;
    if (rentalType === 'Chauffeur' && !v.chauffeurAvailable) return false;
    return true;
  });

  return (
    <div ref={topRef} className="w-full max-w-4xl mx-auto scroll-mt-24">
      {/* Interactive Swiss Stepper & Progress Bar */}
      {currentStep < 7 && (
        <div className="mb-5 sm:mb-8 space-y-3">
          {/* Progress Track */}
          <div className="w-full h-1 bg-[#E7E7E5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#111318] transition-all duration-300"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>

          {/* Clickable Step Pills */}
          <div className="w-full max-w-full min-w-0 overflow-x-auto scrollbar-none pb-1">
            <div className="flex items-center justify-between gap-1.5 min-w-max sm:min-w-0">
              {stepsList.map((s) => {
                const isDone = s.num < currentStep;
                const isCurrent = s.num === currentStep;
                const canJump = s.num < currentStep || (s.num <= 4 && selectedVehicle);
                return (
                  <button
                    key={s.num}
                    type="button"
                    disabled={!canJump && !isCurrent}
                    onClick={() => canJump && goToStep(s.num)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[4px] text-[11px] font-medium transition-colors whitespace-nowrap ${
                      isCurrent
                        ? 'bg-[#111318] text-white font-semibold'
                        : isDone
                        ? 'bg-[#FFFFFF] text-[#111318] border border-[#E7E7E5] hover:border-[#111318]'
                        : 'text-[#888888] bg-transparent cursor-default'
                    }`}
                  >
                    <span className="font-mono text-[10px]">
                      {isDone ? '✓' : `0${s.num}`}
                    </span>
                    <span>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compact Live Trip Summary Pill (visible once user passes Step 1 or has a car) */}
          {(selectedVehicle || currentStep >= 3) && (
            <div className="px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#555555]">
                <span className="font-semibold text-[#111318]">{rentalType}</span>
                <span className="text-[#CCCCCC]">•</span>
                <span className="font-mono text-[11px]">
                  {packageDuration === '12h'
                    ? '12H (150 KM)'
                    : `${duration.days}D • ${duration.days * 250} KM`}
                </span>
                {selectedVehicle && (
                  <>
                    <span className="text-[#CCCCCC]">•</span>
                    <span className="font-semibold text-[#111318]">{selectedVehicle.name}</span>
                  </>
                )}
              </div>

              {selectedVehicle && (
                <div className="font-mono font-bold text-sm text-[#111318]">
                  {formatINR(prices.total)}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 p-3.5 rounded-[4px] bg-[#FFF5F5] border border-[#FED7D7] text-xs text-[#C53030] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#E53E3E] shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STEP 1: SERVICE TYPE & PACKAGE DURATION */}
      {currentStep === 1 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
              Step 01 of 06
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Select Service & Package
            </h2>
            <p className="text-xs text-[#666666]">
              Pick Self-Drive or With Driver, then choose your 24H or 12H range package.
            </p>
          </div>

          {/* Rental Mode */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
              1. Rental Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => setRentalType('Self-Drive')}
                className={`text-left p-4 sm:p-6 rounded-[4px] border transition-all flex flex-col justify-between space-y-3 ${
                  rentalType === 'Self-Drive'
                    ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#777777]">
                      01 / Self-Drive
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        rentalType === 'Self-Drive'
                          ? 'bg-[#111318] border-[#111318] text-white'
                          : 'border-[#CCCCCC]'
                      }`}
                    >
                      {rentalType === 'Self-Drive' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#111318]">
                    Self-Drive Rental
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Drive independently with Airport Bay 4 or Indore city handover.
                  </p>
                </div>
                <div className="text-[11px] text-[#555555] pt-2.5 border-t border-[#E7E7E5] space-y-0.5 font-mono">
                  <div>• Extra KM: ₹6/km</div>
                  <div>• ₹10,000 refundable deposit at handover</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRentalType('Chauffeur')}
                className={`text-left p-4 sm:p-6 rounded-[4px] border transition-all flex flex-col justify-between space-y-3 ${
                  rentalType === 'Chauffeur'
                    ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#777777]">
                      02 / With Driver
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        rentalType === 'Chauffeur'
                          ? 'bg-[#111318] border-[#111318] text-white'
                          : 'border-[#CCCCCC]'
                      }`}
                    >
                      {rentalType === 'Chauffeur' && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold text-[#111318]">
                    With Driver (Chauffeur)
                  </h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Verified chauffeur for airport transfers, city travel, or Ujjain trips.
                  </p>
                </div>
                <div className="text-[11px] text-[#555555] pt-2.5 border-t border-[#E7E7E5] space-y-0.5 font-mono">
                  <div>• Driver: +₹1,499 (24H) / +₹899 (12H)</div>
                  <div>• Extra KM: ₹8/km • Zero deposit</div>
                </div>
              </button>
            </div>
          </div>

          {/* Package Duration */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
              2. Package Range
            </label>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => handlePackageSelect('24h')}
                className={`text-left p-4 sm:p-5 rounded-[4px] border transition-all space-y-1 ${
                  packageDuration === '24h'
                    ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#111318]">
                    24 Hours
                  </span>
                  {packageDuration === '24h' && (
                    <span className="w-2 h-2 rounded-full bg-[#286BFF]" />
                  )}
                </div>
                <div className="text-sm sm:text-base font-display font-bold text-[#111318]">
                  250 KM
                </div>
                <div className="text-[11px] text-[#666666] font-mono">
                  Extra ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
                </div>
              </button>

              <button
                type="button"
                onClick={() => handlePackageSelect('12h')}
                className={`text-left p-4 sm:p-5 rounded-[4px] border transition-all space-y-1 ${
                  packageDuration === '12h'
                    ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                    : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-[#111318]">
                    12 Hours
                  </span>
                  {packageDuration === '12h' && (
                    <span className="w-2 h-2 rounded-full bg-[#286BFF]" />
                  )}
                </div>
                <div className="text-sm sm:text-base font-display font-bold text-[#111318]">
                  150 KM
                </div>
                <div className="text-[11px] text-[#666666] font-mono">
                  Extra ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Footer */}
          <div className="hidden sm:flex justify-end pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handlePrimaryNext} className="btn-primary">
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: CATEGORY SELECTION */}
      {currentStep === 2 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
          <div className="flex items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
                Step 02 of 06
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
                Select Car Segment
              </h2>
              <p className="text-xs text-[#666666]">
                Tap a category or browse all 25 models in Indore.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                goToStep(3);
              }}
              className="text-xs font-semibold text-[#286BFF] hover:underline whitespace-nowrap"
            >
              View All 25 →
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              {
                id: 'Hatchback',
                num: '01',
                title: 'Hatchback',
                desc: 'Swift, Baleno, Glanza, Fronx, Dzire, Aura, Nexon',
                seats: '5 Seats',
                price: packageDuration === '12h' ? 'From ₹1,499' : 'From ₹2,199',
              },
              {
                id: 'Compact SUV',
                num: '02',
                title: 'Compact SUV',
                desc: 'Creta, Sonet, Brezza',
                seats: '5 Seats',
                price: packageDuration === '12h' ? 'From ₹1,999' : 'From ₹2,999',
              },
              {
                id: 'SUV',
                num: '03',
                title: 'SUV',
                desc: 'Harrier, Scorpio-N/S11, Thar, XUV700, Safari, Fortuner, Innova',
                seats: '4–7 Seats',
                price: packageDuration === '12h' ? 'From ₹1,999' : 'From ₹2,999',
              },
              {
                id: 'Sedan',
                num: '04',
                title: 'Sedan',
                desc: 'Verna, Slavia',
                seats: '5 Seats',
                price: packageDuration === '12h' ? 'From ₹2,499' : 'From ₹3,499',
              },
            ].map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as VehicleCategory)}
                  className={`text-left p-3.5 sm:p-5 rounded-[4px] border transition-all flex flex-col justify-between space-y-3 ${
                    active
                      ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                      : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#777777]">{cat.num} /</span>
                      {active && <span className="w-2 h-2 rounded-full bg-[#286BFF]" />}
                    </div>
                    <h3 className="text-sm sm:text-base font-display font-bold text-[#111318] mt-1">
                      {cat.title}
                    </h3>
                    <p className="text-[11px] text-[#777777] mt-1 leading-snug line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-[#E7E7E5] text-[11px] text-[#555555] space-y-0.5">
                    <div className="text-[10px] text-[#777777]">{cat.seats}</div>
                    <div className="font-mono font-bold text-[#111318]">{cat.price}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handleBack} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button type="button" onClick={handlePrimaryNext} className="btn-primary text-xs">
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: TRIP DETAILS & SCHEDULE */}
      {currentStep === 3 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
              Step 03 of 06
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Trip Schedule & Locations
            </h2>
            <p className="text-xs text-[#666666]">
              Choose Indore pickup point and quick duration or exact dates.
            </p>
          </div>

          {/* Pickup & Return Locations */}
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
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
                  className="inline-flex items-center gap-1.5 text-[11px] text-[#555555] hover:text-[#111318]"
                >
                  <span
                    className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                      sameReturnLocation
                        ? 'bg-[#111318] border-[#111318] text-white'
                        : 'bg-white border-[#CCCCCC]'
                    }`}
                  >
                    {sameReturnLocation && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span>Same return</span>
                </button>
              </div>

              <div className="relative">
                <select
                  value={pickupLoc}
                  onChange={(e) => handlePickupLocChange(e.target.value)}
                  className="w-full min-h-[48px] sm:min-h-[44px] bg-[#F7F7F5] sm:bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] focus:bg-[#FFFFFF] rounded-[4px] pl-3.5 pr-10 py-2.5 text-base sm:text-xs text-[#171717] font-medium appearance-none focus:outline-none"
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

            {!sameReturnLocation && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>Return Location</span>
                </label>
                <div className="relative">
                  <select
                    value={dropoffLoc}
                    onChange={(e) => {
                      setDropoffLoc(e.target.value);
                      setIsAirportHandover(
                        pickupLoc === 'airport-idr' || e.target.value === 'airport-idr'
                      );
                    }}
                    className="w-full min-h-[48px] sm:min-h-[44px] bg-[#F7F7F5] sm:bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] focus:bg-[#FFFFFF] rounded-[4px] pl-3.5 pr-10 py-2.5 text-base sm:text-xs text-[#171717] font-medium appearance-none focus:outline-none"
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

            {/* Flight Number Field (automatically shown for Airport Pickup/Drop) */}
            {(pickupLoc === 'airport-idr' || effectiveDropoff === 'airport-idr') && (
              <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#111318] flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>Flight Number (Optional — for live arrival tracking)</span>
                </label>
                <input
                  type="text"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. 6E-452 or AI-635"
                  className="w-full min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3 py-2 text-base sm:text-xs text-[#171717] font-mono uppercase focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* 1-Tap Quick Duration Pills */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
              Quick Duration
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: '12h' as const, label: '12 Hrs', sub: '150 KM', active: packageDuration === '12h' },
                { key: '1d' as const, label: '1 Day', sub: '250 KM', active: packageDuration === '24h' && duration.days === 1 },
                { key: '2d' as const, label: '2 Days', sub: '500 KM', active: packageDuration === '24h' && duration.days === 2 },
                { key: '3d' as const, label: '3 Days', sub: '750 KM', active: packageDuration === '24h' && duration.days === 3 },
              ].map((pill) => (
                <button
                  key={pill.key}
                  type="button"
                  onClick={() => applyQuickDuration(pill.key)}
                  className={`py-2.5 px-2 rounded-[4px] border text-center transition-all ${
                    pill.active
                      ? 'bg-[#111318] text-white border-[#111318]'
                      : 'bg-[#F7F7F5] text-[#111318] border-[#E7E7E5] hover:border-[#111318]'
                  }`}
                >
                  <div className="text-xs font-bold">{pill.label}</div>
                  <div className={`text-[10px] font-mono ${pill.active ? 'text-white/75' : 'text-[#777777]'}`}>
                    {pill.sub}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Paired Pickup & Return Date/Time Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
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
                  min={formatDate(today)}
                  onChange={(e) => handlePickupDateChange(e.target.value)}
                  className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 py-2 text-base sm:text-xs text-[#171717] font-medium focus:outline-none"
                />
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => handlePickupTimeChange(e.target.value)}
                  className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 py-2 text-base sm:text-xs text-[#171717] font-mono font-medium focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
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
                  min={pickupDate || formatDate(today)}
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 py-2 text-base sm:text-xs text-[#171717] font-medium focus:outline-none"
                />
                <input
                  type="time"
                  value={returnTime}
                  onChange={(e) => {
                    setReturnTime(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="w-full min-w-0 min-h-[46px] sm:min-h-[42px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-2.5 py-2 text-base sm:text-xs text-[#171717] font-mono font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Schedule Summary Box */}
          <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex flex-wrap items-center justify-between text-xs text-[#555555] gap-2">
            <div>
              Duration:{' '}
              <strong className="text-[#111318] font-mono">
                {packageDuration === '12h'
                  ? '12 Hours (150 KM)'
                  : `${duration.days} Day${duration.days > 1 ? 's' : ''} (${duration.days * 250} KM)`}
              </strong>
            </div>
            <div className="font-mono text-[11px]">
              Extra: ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
              {selectedVehicle && (
                <strong className="text-[#111318] ml-2">• {formatINR(prices.total)}</strong>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handleBack} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button type="button" onClick={handlePrimaryNext} className="btn-primary text-xs">
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: VEHICLE SELECTION */}
      {currentStep === 4 && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
              Step 04 of 06
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Select Your Vehicle
            </h2>
            <p className="text-xs text-[#666666]">
              Rates shown for <strong>{rentalType}</strong> •{' '}
              <strong>
                {packageDuration === '12h'
                  ? '12 Hours (150 KM)'
                  : `${duration.days} Day${duration.days > 1 ? 's' : ''} (${duration.days * 250} KM)`}
              </strong>
              .
            </p>
          </div>

          {/* In-Step Scrollable Category Filter Pills */}
          <div className="w-full max-w-full min-w-0 overflow-x-auto scrollbar-none pb-1">
            <div className="flex items-center gap-2 w-max">
              {(['All', 'Hatchback', 'Compact SUV', 'SUV', 'Sedan'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-[4px] text-xs font-semibold transition-colors whitespace-nowrap border ${
                    selectedCategory === cat
                      ? 'bg-[#111318] text-white border-[#111318]'
                      : 'bg-[#F7F7F5] text-[#555555] border-[#E7E7E5] hover:border-[#111318]'
                  }`}
                >
                  {cat === 'All' ? `All (${vehicles.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Vehicle Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {filteredStep4Vehicles.map((v) => {
              const isSelected = selectedVehicle?.id === v.id;
              const isChauffeur = rentalType === 'Chauffeur';
              const tripTotal =
                packageDuration === '12h'
                  ? isChauffeur
                    ? v.price12h + (v.driverFee12h || 899)
                    : v.price12h
                  : (isChauffeur ? v.price24h + (v.driverFee24h || 1499) : v.price24h) *
                    Math.max(1, duration.days);

              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicle(v)}
                  className={`cursor-pointer border rounded-[4px] overflow-hidden flex flex-col justify-between transition-all ${
                    isSelected
                      ? 'border-[#111318] bg-[#F7F7F5] ring-1 ring-[#111318]'
                      : 'border-[#E7E7E5] bg-[#FFFFFF] hover:border-[#CCCCCC]'
                  }`}
                >
                  <div className="relative h-44 bg-[#F7F7F5] border-b border-[#E7E7E5]">
                    <img
                      src={v.image}
                      alt={v.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#FFFFFF]/95 px-2 py-0.5 text-[10px] font-mono text-[#111318] border border-[#E7E7E5]">
                      {v.category}
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 bg-[#111318] text-white p-1.5 rounded-full">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="p-4 space-y-3 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display font-bold text-[#111318] text-sm">
                          {v.name}
                        </h4>
                        <p className="text-[#777777] text-[11px]">
                          {v.fuelType} • {v.transmission} • {v.seats} Seats
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-display font-extrabold text-sm text-[#111318] font-mono">
                          {formatINR(tripTotal)}
                        </span>
                        <span className="text-[10px] text-[#777777] block font-mono">
                          {packageDuration === '12h'
                            ? 'for 12 hrs'
                            : `for ${duration.days} day${duration.days > 1 ? 's' : ''}`}
                        </span>
                      </div>
                    </div>

                    <div className="p-2 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex items-center justify-between text-[11px] font-mono text-[#666666]">
                      <span>
                        Range:{' '}
                        {packageDuration === '12h' ? '150 KM' : `${duration.days * 250} KM`}
                      </span>
                      <span>Extra: ₹{isChauffeur ? 8 : 6}/km</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVehicle(v);
                        goToStep(5);
                      }}
                      className={`w-full min-h-[44px] py-2.5 rounded-[4px] text-xs font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#111318] text-white'
                          : 'bg-[#FFFFFF] border border-[#E7E7E5] text-[#171717] hover:bg-[#111318] hover:text-white'
                      }`}
                    >
                      {isSelected ? 'Selected — Continue' : 'Select & Continue'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handleBack} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              type="button"
              disabled={!selectedVehicle}
              onClick={handlePrimaryNext}
              className="btn-primary text-xs disabled:opacity-50"
            >
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: CUSTOMER INFORMATION */}
      {currentStep === 5 && selectedVehicle && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
              Step 05 of 06
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Customer Verification
            </h2>
            <p className="text-xs text-[#666666]">
              Your details are used strictly for instant booking confirmation and vehicle handover.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                Full Legal Name *
              </label>
              <input
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Anand Rathi"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-base sm:text-sm text-[#171717] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                Mobile (WhatsApp Enabled) *
              </label>
              <div className="flex items-stretch">
                <span className="inline-flex items-center px-3 bg-[#F7F7F5] border border-r-0 border-[#E7E7E5] rounded-l-[4px] text-sm font-mono text-[#555555]">
                  +91
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  placeholder="83492 50049"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full min-w-0 min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-r-[4px] px-3.5 py-2.5 text-base sm:text-sm text-[#171717] font-mono focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                Email Address *
              </label>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="anand@company.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-base sm:text-sm text-[#171717] focus:outline-none"
              />
            </div>

            {rentalType === 'Self-Drive' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                  Driving License Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="MP09-2020-0012345"
                  value={drivingLicense}
                  onChange={(e) => setDrivingLicense(e.target.value.toUpperCase())}
                  className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-base sm:text-sm text-[#171717] font-mono uppercase focus:outline-none"
                />
              </div>
            )}

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#666666]">
                Notes / Special Requests (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Flight arrival terminal handover, child seat request..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full min-h-[48px] sm:min-h-[44px] bg-[#FFFFFF] border border-[#E7E7E5] focus:border-[#111318] rounded-[4px] px-3.5 py-2.5 text-base sm:text-sm text-[#171717] focus:outline-none"
              />
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handleBack} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button type="button" onClick={handlePrimaryNext} className="btn-primary text-xs">
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: SUMMARY & BREAKDOWN */}
      {currentStep === 6 && selectedVehicle && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-4 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
              Step 06 of 06
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Review Booking Summary
            </h2>
            <p className="text-xs text-[#666666]">
              Verify your vehicle, itinerary, and exact payable fare before confirming.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 text-xs">
            <div className="lg:col-span-7 space-y-3.5">
              <div className="p-3.5 sm:p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] flex items-center gap-3.5">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-24 h-16 object-cover rounded-[3px] shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">
                    {selectedVehicle.category} • {rentalType}
                  </span>
                  <h4 className="font-bold text-[#111318] text-sm truncate">
                    {selectedVehicle.name}
                  </h4>
                  <span className="text-[#666666]">
                    {selectedVehicle.transmission} • {selectedVehicle.fuelType}
                  </span>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#777777]">
                    Itinerary & Package
                  </span>
                  <button
                    type="button"
                    onClick={() => goToStep(3)}
                    className="text-[11px] font-semibold text-[#286BFF] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div>
                  Package:{' '}
                  <strong className="text-[#111318]">
                    {packageDuration === '12h'
                      ? '12 Hours (150 KM)'
                      : `${duration.days} Day(s) (24H / ${duration.days * 250} KM)`}
                  </strong>
                </div>
                <div>
                  Pickup:{' '}
                  <strong className="text-[#111318]">
                    {INDORE_LOCATIONS.find((l) => l.id === pickupLoc)?.name || pickupLoc}
                  </strong>{' '}
                  on {pickupDate} at {pickupTime}
                </div>
                <div>
                  Return:{' '}
                  <strong className="text-[#111318]">
                    {INDORE_LOCATIONS.find((l) => l.id === effectiveDropoff)?.name ||
                      effectiveDropoff}
                  </strong>{' '}
                  on {returnDate} at {returnTime}
                </div>
                {flightNumber && (
                  <div className="font-mono text-[#286BFF]">Flight: {flightNumber}</div>
                )}
              </div>

              <div className="p-3.5 sm:p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-[#777777]">
                    Customer Verification
                  </span>
                  <button
                    type="button"
                    onClick={() => goToStep(5)}
                    className="text-[11px] font-semibold text-[#286BFF] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="font-medium text-[#111318]">{customerName}</div>
                <div className="text-[#555555]">
                  {customerPhone} • {customerEmail}
                </div>
                {drivingLicense && (
                  <div className="font-mono text-[#286BFF]">DL: {drivingLicense}</div>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 p-4 sm:p-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="font-mono text-[10px] uppercase text-[#777777] pb-2 border-b border-[#E7E7E5]">
                  Fare Breakdown
                </div>
                <div className="flex justify-between">
                  <span>
                    Vehicle Rent (
                    {packageDuration === '12h' ? '12H' : `24H × ${prices.days}d`}):
                  </span>
                  <span className="font-mono">{formatINR(prices.vehicleRent)}</span>
                </div>
                {prices.driverFee > 0 && (
                  <div className="flex justify-between text-[#286BFF]">
                    <span>
                      With Driver (
                      {packageDuration === '12h' ? '12H' : `24H × ${prices.days}d`}):
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
                  <span className="font-mono">
                    ₹{rentalType === 'Chauffeur' ? 8 : 6}/km
                  </span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#111318] pt-3 border-t border-[#E7E7E5]">
                  <span>Total Payable:</span>
                  <span className="font-mono">{formatINR(prices.total)}</span>
                </div>
                {rentalType === 'Self-Drive' && prices.deposit > 0 && (
                  <div className="p-3 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] text-[11px] space-y-1">
                    <div className="flex justify-between text-[#555555]">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#111318]" />
                        Refundable Deposit:
                      </span>
                      <span className="font-mono font-semibold text-[#111318]">
                        {formatINR(prices.deposit)}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#777777]">
                      Collected at handover (not in rental fare) • 100% refunded in 24–48 hrs.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinalSubmit}
                className="hidden sm:inline-flex w-full btn-primary"
              >
                {isSubmitting ? 'Registering...' : 'Confirm Reservation'}
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center justify-between pt-4 border-t border-[#E7E7E5]">
            <button type="button" onClick={handleBack} className="btn-secondary text-xs">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: CONFIRMATION & RECEIPT */}
      {currentStep === 7 && confirmedBooking && (
        <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] p-5 sm:p-12 space-y-6 sm:space-y-8 animate-fade-in text-center">
          <div className="w-12 h-12 bg-[#111318] text-white rounded-[4px] flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#286BFF] font-semibold">
              Reservation Registered
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-[#111318]">
              Your Booking is Confirmed
            </h2>
            <p className="text-xs text-[#666666] max-w-md mx-auto leading-relaxed">
              Our Indore operations desk has received your request. Tap WhatsApp below for instant confirmation and vehicle allocation.
            </p>
          </div>

          {/* Reference Card */}
          <div className="p-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] max-w-md mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#777777]">
              Booking Reference
            </span>
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
            {copiedRef && (
              <span className="text-[10px] text-emerald-600 block">Copied to clipboard!</span>
            )}
          </div>

          {/* Reservation Summary */}
          <div className="max-w-md mx-auto p-4 sm:p-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-xs space-y-2 text-left">
            <div className="flex justify-between gap-2">
              <span className="text-[#777777]">Vehicle:</span>
              <strong className="text-[#111318] text-right">{confirmedBooking.vehicleName}</strong>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#777777]">Package:</span>
              <span className="text-right">
                {confirmedBooking.rentalType} •{' '}
                {confirmedBooking.packageDuration === '12h'
                  ? '12H (150 KM)'
                  : `${confirmedBooking.rentalDurationDays}D (${confirmedBooking.includedKm} KM)`}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#777777]">Pickup:</span>
              <span className="text-right">
                {confirmedBooking.pickupDate} at {confirmedBooking.pickupTime}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span className="text-[#777777]">Return:</span>
              <span className="text-right">
                {confirmedBooking.returnDate} at {confirmedBooking.returnTime}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#E7E7E5]">
              <span className="text-[#777777]">Total Rental Payable:</span>
              <strong className="text-[#111318] font-mono text-sm">
                {formatINR(confirmedBooking.totalEstimatedAmount)}
              </strong>
            </div>
            {confirmedBooking.securityDeposit > 0 && (
              <div className="flex justify-between text-[11px] text-[#777777]">
                <span>Refundable Deposit (At Handover):</span>
                <span className="font-mono">
                  {formatINR(confirmedBooking.securityDeposit)}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={buildBookingWhatsAppUrl(confirmedBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs uppercase tracking-wider rounded-[4px] transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Confirm on WhatsApp</span>
            </a>

            <a
              href={`tel:${BUSINESS_SETTINGS.primaryPhone.replace(/\s+/g, '')}`}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#111318] hover:bg-[#262626] text-white font-semibold text-xs uppercase tracking-wider rounded-[4px] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BUSINESS_SETTINGS.primaryPhone}</span>
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-[#F7F7F5] border border-[#E7E7E5] text-[#111318] font-semibold text-xs uppercase tracking-wider rounded-[4px] transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Voucher</span>
            </button>
          </div>
        </div>
      )}

      {/* STICKY MOBILE BOTTOM ACTION BAR (Native App-Like Checkout Ergonomics) */}
      {currentStep < 7 && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E7E7E5] px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2.5 max-w-4xl mx-auto">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Go Back"
                className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5] text-[#111318] active:scale-95 transition-transform shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            {selectedVehicle && (
              <div className="flex flex-col justify-center pr-1 shrink-0">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#777777]">
                  Total Payable
                </span>
                <span className="text-sm font-mono font-extrabold text-[#111318] leading-tight">
                  {formatINR(prices.total)}
                </span>
              </div>
            )}

            <button
              type="button"
              disabled={primaryDisabled}
              onClick={handlePrimaryNext}
              className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#111318] hover:bg-[#262626] active:scale-[0.99] text-white text-xs font-semibold uppercase tracking-wider rounded-[4px] px-4 transition-all disabled:opacity-50"
            >
              <span>{primaryCtaLabel()}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
