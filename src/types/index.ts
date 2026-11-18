export type VehicleCategory = 'Hatchback' | 'Compact SUV' | 'SUV' | 'Sedan' | 'Premium';

export type RentalType = 'Self-Drive' | 'Chauffeur' | 'Both';

export type PackageDuration = '24h' | '12h';

export type TransmissionType = 'Manual' | 'Automatic';

export type FuelType = 'Petrol' | 'Diesel' | 'CNG + Petrol' | 'Hybrid' | 'Electric';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  transmission: TransmissionType;
  seats: number;
  luggage: number; // number of bags
  fuelType: FuelType;
  mileage: string;
  image: string;
  images?: string[];
  features: string[];
  selfDriveAvailable: boolean;
  chauffeurAvailable: boolean;
  // Core 24H and 12H pricing
  price24h: number; // Self-drive 24H price in INR
  price12h: number; // Self-drive 12H price in INR
  kmLimit24h: number; // 250 KM
  kmLimit12h: number; // 150 KM
  driverFee24h: number; // 1499 INR
  driverFee12h: number; // 899 INR
  extraKmRate: number; // 6 INR per km (Self-Drive)
  extraKmRateWithDriver: number; // 8 INR per km (With Driver)
  // Legacy / alias fields for full compatibility
  selfDrivePricePerDay: number; // equals price24h
  chauffeurPricePerDay: number; // equals price24h + driverFee24h
  securityDeposit: number; // refundable in INR
  kmLimitPerDay: number; // equals kmLimit24h (250)
  isAvailable: boolean;
  rating: number;
  tripsCompleted: number;
  isPopular?: boolean;
  isAirportSpecial?: boolean;
  tagline?: string;
}

export type BookingStatus = 'Pending' | 'Confirmed' | 'Active' | 'Completed' | 'Cancelled';

export interface Booking {
  id: string;
  bookingReference: string;
  rentalType: 'Self-Drive' | 'Chauffeur';
  packageDuration?: PackageDuration; // '24h' | '12h'
  vehicleId: string;
  vehicleName: string;
  vehicleCategory: VehicleCategory;
  pickupLocation: string;
  dropoffLocation: string;
  isAirportPickup: boolean;
  flightNumber?: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  rentalDurationDays: number;
  includedKm?: number;
  driverFee?: number;
  baseAmount: number;
  gstAmount: number;
  securityDeposit: number;
  totalEstimatedAmount: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  drivingLicenseNumber?: string;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface BusinessSettings {
  brandName: string;
  tagline: string;
  locationCity: string;
  airportName: string;
  airportCode: string;
  primaryPhone: string;
  whatsappNumber: string;
  email: string;
  addressMain: string;
  addressAirportHub: string;
  supportHours: string;
  gstPercentage: number;
  securityDepositRefundHours: string;
  freeKmPerDay: number; // 250 km for 24h
  freeKm12h: number; // 150 km for 12h
  extraKmRateSelfDrive: number; // 6 INR
  extraKmRateWithDriver: number; // 8 INR
  driverFee24h: number; // 1499 INR
  driverFee12h: number; // 899 INR
}
