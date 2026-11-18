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
  const yyyy = end.getFullYear();
  const mm = String(end.getMonth() + 1).padStart(2, '0');
  const dd = String(end.getDate()).padStart(2, '0');
  const hh = String(end.getHours()).padStart(2, '0');
  const min = String(end.getMinutes()).padStart(2, '0');
  return {
    returnDate: `${yyyy}-${mm}-${dd}`,
    returnTime: `${hh}:${min}`,
  };
}
