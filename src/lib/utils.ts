import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `AGC-${new Date().getFullYear().toString().slice(-2)}-${code}`;
}

export interface DurationResult {
  days: number;
  hours: number;
  isValid: boolean;
  errorMessage?: string;
}

export function calculateDuration(
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): DurationResult {
  if (!pickupDate || !returnDate) {
    return { days: 1, hours: 24, isValid: true };
  }

  const pickupTimeStr = pickupTime || '10:00';
  const returnTimeStr = returnTime || '10:00';

  const start = new Date(`${pickupDate}T${pickupTimeStr}`);
  const end = new Date(`${returnDate}T${returnTimeStr}`);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return { days: 1, hours: 24, isValid: true };
  }

  const diffMs = end.getTime() - start.getTime();

  if (diffMs <= 0) {
    return {
      days: 0,
      hours: 0,
      isValid: false,
      errorMessage: 'Return date & time must be after pickup date & time.',
    };
  }

  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  // Standard car rental industry logic: 24-hour blocks
  const days = Math.max(1, Math.ceil(diffHours / 24));

  return {
    days,
    hours: diffHours,
    isValid: true,
  };
}

export const MIN_ADVANCE_BOOKING_HOURS = 4;
export const MIN_ADVANCE_BOOKING_HOURS_EXTENDED = 24;

export function getMinAdvanceHoursForCategory(category?: string | null): number {
  if (
    category === 'SUV' ||
    category === 'Sedan' ||
    category === 'Compact SUV' ||
    category === 'Premium'
  ) {
    return MIN_ADVANCE_BOOKING_HOURS_EXTENDED;
  }
  return MIN_ADVANCE_BOOKING_HOURS;
}

export function formatLocalDate(d: Date): string {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function formatLocalTime(d: Date): string {
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${min}`;
}

export interface EarliestPickupResult {
  minDate: string;
  minTime: string;
  dateObj: Date;
  displayLabel: string;
}

export function getEarliestPickupSchedule(
  minHours: number = MIN_ADVANCE_BOOKING_HOURS,
  now: Date = new Date()
): EarliestPickupResult {
  // Add minHours and round up to next 15-minute increment for clean scheduling
  const rawMs = now.getTime() + minHours * 60 * 60 * 1000;
  const fifteenMinMs = 15 * 60 * 1000;
  const roundedMs = Math.ceil(rawMs / fifteenMinMs) * fifteenMinMs;
  const dateObj = new Date(roundedMs);

  const minDate = formatLocalDate(dateObj);
  const minTime = formatLocalTime(dateObj);

  const todayStr = formatLocalDate(now);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = formatLocalDate(tomorrow);

  const dayPrefix =
    minDate === todayStr
      ? 'Today'
      : minDate === tomorrowStr
      ? 'Tomorrow'
      : dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  const time12h = dateObj.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return {
    minDate,
    minTime,
    dateObj,
    displayLabel: `${dayPrefix}, ${time12h}`,
  };
}

export function validatePickupAdvanceTime(
  pickupDate: string,
  pickupTime: string,
  minHours: number = MIN_ADVANCE_BOOKING_HOURS,
  categoryLabel?: string
): { isValid: boolean; errorMessage?: string; earliest: EarliestPickupResult } {
  const now = new Date();
  const earliest = getEarliestPickupSchedule(minHours, now);

  if (!pickupDate) {
    return {
      isValid: false,
      errorMessage: `Please select a pickup date at least ${minHours} hours from now.`,
      earliest,
    };
  }

  const start = new Date(`${pickupDate}T${pickupTime || '10:00'}`);
  if (isNaN(start.getTime())) {
    return {
      isValid: false,
      errorMessage: 'Please enter a valid pickup date and time.',
      earliest,
    };
  }

  // Allow 1-minute grace window so picking the exact earliest slot doesn't fail on submit
  const minAllowedMs = now.getTime() + minHours * 60 * 60 * 1000 - 60 * 1000;
  if (start.getTime() < minAllowedMs) {
    const scope = categoryLabel ? ` for ${categoryLabel}` : '';
    return {
      isValid: false,
      errorMessage: `Minimum ${minHours}-hour advance pre-booking required${scope}. Earliest pickup: ${earliest.displayLabel}.`,
      earliest,
    };
  }

  return { isValid: true, earliest };
}

export function computeReturnSchedule(
  pickupDate: string,
  pickupTime: string,
  pkg: '24h' | '12h'
): { returnDate: string; returnTime: string } {
  const safeTime = pickupTime || '10:00';
  const start = new Date(`${pickupDate}T${safeTime}`);
  if (isNaN(start.getTime())) {
    return { returnDate: pickupDate, returnTime: safeTime };
  }
  const addHours = pkg === '12h' ? 12 : 24;
  const end = new Date(start.getTime() + addHours * 60 * 60 * 1000);
  return {
    returnDate: formatLocalDate(end),
    returnTime: formatLocalTime(end),
  };
}
