import { BUSINESS_SETTINGS } from '../data/settings';
import { Booking, Vehicle } from '../types';

export function getWhatsAppBaseUrl(): string {
  // Configurable phone number from settings
  return `https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}`;
}

export function buildGeneralWhatsAppUrl(customMessage?: string): string {
  const text = customMessage || `Hello AIRGOCABS! I'm interested in booking a car rental in Indore. Could you share current vehicle availability and rates?`;
  return `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(text)}`;
}

export function buildVehicleWhatsAppUrl(vehicle: Vehicle, rentalType: 'Self-Drive' | 'Chauffeur' = 'Self-Drive'): string {
  const rate24 = rentalType === 'Self-Drive' ? vehicle.price24h : vehicle.price24h + vehicle.driverFee24h;
  const rate12 = rentalType === 'Self-Drive' ? vehicle.price12h : vehicle.price12h + vehicle.driverFee12h;
  const extraKm = rentalType === 'Self-Drive' ? vehicle.extraKmRate : vehicle.extraKmRateWithDriver;

  const text = `Hello AIRGOCABS! I would like to inquire about booking the *${vehicle.name}* (${rentalType}) in Indore.\n\n` +
    `• Category: ${vehicle.category}\n` +
    `• 24H Package (${vehicle.kmLimit24h} KM): ₹${rate24.toLocaleString('en-IN')}\n` +
    `• 12H Package (${vehicle.kmLimit12h} KM): ₹${rate12.toLocaleString('en-IN')}\n` +
    `• Extra KM Rate: ₹${extraKm}/km\n` +
    `• Fuel / Transmission: ${vehicle.fuelType} (${vehicle.transmission})\n\n` +
    `Could you please check availability for my travel dates?`;
  return `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(text)}`;
}

export function buildBookingWhatsAppUrl(booking: Booking): string {
  const pkgLabel = booking.packageDuration === '12h' ? '12 Hours (150 KM)' : `24 Hours (${booking.includedKm || booking.rentalDurationDays * 250} KM)`;
  const text = `*NEW BOOKING ASSISTANCE REQUEST — AIRGOCABS INDORE*\n\n` +
    `*Booking Ref:* ${booking.bookingReference}\n` +
    `*Customer Name:* ${booking.customerName}\n` +
    `*Phone:* ${booking.customerPhone}\n` +
    `*Vehicle:* ${booking.vehicleName} (${booking.rentalType})\n` +
    `*Package:* ${pkgLabel}\n` +
    `*Pickup:* ${booking.pickupLocation} on ${booking.pickupDate} at ${booking.pickupTime}\n` +
    `*Return:* ${booking.dropoffLocation} on ${booking.returnDate} at ${booking.returnTime}\n` +
    `*Est. Total:* ₹${booking.totalEstimatedAmount.toLocaleString('en-IN')}\n\n` +
    `Please confirm availability and dispatch formalities.`;
  return `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(text)}`;
}

export function buildAirportWhatsAppUrl(isPickup: boolean = true, flightNo?: string): string {
  const text = `Hello AIRGOCABS! I need an *Airport ${isPickup ? 'Pickup' : 'Drop-off'}* at Devi Ahilya Bai Holkar Airport, Indore.\n` +
    (flightNo ? `• Flight Number: ${flightNo}\n` : '') +
    `Please let me know car options and instant chauffeur rates.`;
  return `${getWhatsAppBaseUrl()}?text=${encodeURIComponent(text)}`;
}
