import { Booking, BusinessSettings, Vehicle } from '../types';
import { INITIAL_VEHICLES } from '../data/vehicles';
import { BUSINESS_SETTINGS } from '../data/settings';
import { supabase, isSupabaseConfigured } from './supabase';

const VEHICLES_STORAGE_KEY = 'airgocabs_vehicles_v8';
const BOOKINGS_STORAGE_KEY = 'airgocabs_bookings_v4';
const SETTINGS_STORAGE_KEY = 'airgocabs_settings_v4';

// Seed demo bookings so admin dashboard looks complete and informative immediately
const DEMO_BOOKINGS: Booking[] = [
  {
    id: 'bkg-demo-1',
    bookingReference: 'AGC-26-8942A',
    rentalType: 'Self-Drive',
    packageDuration: '24h',
    vehicleId: 'veh-creta',
    vehicleName: 'Hyundai Creta',
    vehicleCategory: 'Compact SUV',
    pickupLocation: 'Devi Ahilya Bai Holkar Airport (IDR) — Terminal Pickup Hub',
    dropoffLocation: 'Vijay Nagar — Brilliant Convention Centre & C21 Zone',
    isAirportPickup: true,
    flightNumber: '6E-452',
    pickupDate: '2026-11-20',
    pickupTime: '11:30',
    returnDate: '2026-11-23',
    returnTime: '11:30',
    rentalDurationDays: 3,
    includedKm: 750,
    baseAmount: 10497,
    gstAmount: 0,
    securityDeposit: 10000,
    totalEstimatedAmount: 10497,
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98260 55412',
    customerEmail: 'aarav.sharma@example.com',
    drivingLicenseNumber: 'MP09-2018-0044192',
    specialRequests: 'Child safety seat requested. Arriving on Indigo flight.',
    status: 'Confirmed',
    createdAt: '2026-11-16T10:15:00Z',
  },
  {
    id: 'bkg-demo-2',
    bookingReference: 'AGC-26-3199B',
    rentalType: 'Chauffeur',
    packageDuration: '12h',
    vehicleId: 'veh-innova',
    vehicleName: 'Toyota Innova',
    vehicleCategory: 'SUV',
    pickupLocation: 'Vijay Nagar — Brilliant Convention Centre & C21 Zone',
    dropoffLocation: 'Devi Ahilya Bai Holkar Airport (IDR) — Terminal Pickup Hub',
    isAirportPickup: false,
    pickupDate: '2026-11-22',
    pickupTime: '08:00',
    returnDate: '2026-11-22',
    returnTime: '20:00',
    rentalDurationDays: 1,
    includedKm: 150,
    driverFee: 899,
    baseAmount: 4398,
    gstAmount: 0,
    securityDeposit: 0,
    totalEstimatedAmount: 4398,
    customerName: 'Pooja Singhania',
    customerPhone: '+91 94250 88291',
    customerEmail: 'pooja.s@singhaniaholdings.in',
    specialRequests: 'Executive chauffeur required in uniform. Corporate billing invoice needed.',
    status: 'Confirmed',
    createdAt: '2026-11-17T09:00:00Z',
  },
  {
    id: 'bkg-demo-3',
    bookingReference: 'AGC-26-7420C',
    rentalType: 'Self-Drive',
    packageDuration: '24h',
    vehicleId: 'veh-swift',
    vehicleName: 'Maruti Suzuki Swift',
    vehicleCategory: 'Hatchback',
    pickupLocation: 'Indore Junction Railway Station (Main Exit Platform 1)',
    dropoffLocation: 'Super Corridor — TCS / Infosys Tech Hub Handover',
    isAirportPickup: false,
    pickupDate: '2026-11-25',
    pickupTime: '09:00',
    returnDate: '2026-11-27',
    returnTime: '09:00',
    rentalDurationDays: 2,
    includedKm: 500,
    baseAmount: 4398,
    gstAmount: 0,
    securityDeposit: 10000,
    totalEstimatedAmount: 4398,
    customerName: 'Vikram Joshi',
    customerPhone: '+91 97520 11983',
    customerEmail: 'vikram.j@outlook.com',
    drivingLicenseNumber: 'MP04-2019-0081290',
    specialRequests: 'Fastag pre-loaded with ₹500 balance requested.',
    status: 'Pending',
    createdAt: '2026-11-17T12:30:00Z',
  },
];

class StoreService {
  private vehicles: Vehicle[] = [];
  private bookings: Booking[] = [];
  private settings: BusinessSettings = BUSINESS_SETTINGS;
  private listeners: (() => void)[] = [];

  constructor() {
    this.initStore();
  }

  private initStore() {
    try {
      const storedVehicles = localStorage.getItem(VEHICLES_STORAGE_KEY);
      if (storedVehicles) {
        this.vehicles = JSON.parse(storedVehicles);
      } else {
        this.vehicles = [...INITIAL_VEHICLES];
        localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(this.vehicles));
      }

      const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
      if (storedBookings) {
        this.bookings = JSON.parse(storedBookings);
      } else {
        this.bookings = [...DEMO_BOOKINGS];
        localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookings));
      }

      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        this.settings = { ...BUSINESS_SETTINGS, ...JSON.parse(storedSettings) };
      }
    } catch {
      this.vehicles = [...INITIAL_VEHICLES];
      this.bookings = [...DEMO_BOOKINGS];
      this.settings = BUSINESS_SETTINGS;
    }
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  // Vehicles
  public getVehicles(): Vehicle[] {
    return [...this.vehicles];
  }

  public getVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find((v) => v.id === id);
  }

  public async saveVehicle(vehicle: Vehicle): Promise<void> {
    const idx = this.vehicles.findIndex((v) => v.id === vehicle.id);
    if (idx >= 0) {
      this.vehicles[idx] = vehicle;
    } else {
      this.vehicles.unshift(vehicle);
    }
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(this.vehicles));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('vehicles').upsert({
          id: vehicle.id,
          name: vehicle.name,
          brand: vehicle.brand,
          model: vehicle.model,
          category: vehicle.category,
          transmission: vehicle.transmission,
          seats: vehicle.seats,
          luggage: vehicle.luggage,
          fuel_type: vehicle.fuelType,
          mileage: vehicle.mileage,
          image: vehicle.image,
          features: vehicle.features,
          self_drive_available: vehicle.selfDriveAvailable,
          chauffeur_available: vehicle.chauffeurAvailable,
          self_drive_price_per_day: vehicle.selfDrivePricePerDay,
          chauffeur_price_per_day: vehicle.chauffeurPricePerDay,
          security_deposit: vehicle.securityDeposit,
          km_limit_per_day: vehicle.kmLimitPerDay,
          extra_km_rate: vehicle.extraKmRate,
          is_available: vehicle.isAvailable,
          rating: vehicle.rating,
          trips_completed: vehicle.tripsCompleted,
          is_popular: vehicle.isPopular,
          is_airport_special: vehicle.isAirportSpecial,
          tagline: vehicle.tagline,
        });
      } catch (err) {
        console.warn('Supabase sync error:', err);
      }
    }

    this.notify();
  }

  public async deleteVehicle(id: string): Promise<void> {
    this.vehicles = this.vehicles.filter((v) => v.id !== id);
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(this.vehicles));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('vehicles').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    this.notify();
  }

  public async toggleVehicleAvailability(id: string): Promise<void> {
    const v = this.vehicles.find((item) => item.id === id);
    if (v) {
      v.isAvailable = !v.isAvailable;
      await this.saveVehicle({ ...v });
    }
  }

  // Bookings
  public getBookings(): Booking[] {
    return [...this.bookings];
  }

  public getBookingByReference(reference: string): Booking | undefined {
    return this.bookings.find(
      (b) => b.bookingReference.toLowerCase() === reference.trim().toLowerCase()
    );
  }

  public async createBooking(booking: Booking): Promise<Booking> {
    this.bookings.unshift(booking);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookings));

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('bookings').insert({
          id: booking.id,
          booking_reference: booking.bookingReference,
          rental_type: booking.rentalType,
          vehicle_id: booking.vehicleId,
          vehicle_name: booking.vehicleName,
          vehicle_category: booking.vehicleCategory,
          pickup_location: booking.pickupLocation,
          dropoff_location: booking.dropoffLocation,
          is_airport_pickup: booking.isAirportPickup,
          flight_number: booking.flightNumber,
          pickup_date: booking.pickupDate,
          pickup_time: booking.pickupTime,
          return_date: booking.returnDate,
          return_time: booking.returnTime,
          rental_duration_days: booking.rentalDurationDays,
          base_amount: booking.baseAmount,
          gst_amount: booking.gstAmount,
          security_deposit: booking.securityDeposit,
          total_estimated_amount: booking.totalEstimatedAmount,
          customer_name: booking.customerName,
          customer_phone: booking.customerPhone,
          customer_email: booking.customerEmail,
          driving_license_number: booking.drivingLicenseNumber,
          special_requests: booking.specialRequests,
          status: booking.status,
        });
      } catch (err) {
        console.warn('Supabase booking insert error:', err);
      }
    }

    this.notify();
    return booking;
  }

  public async updateBookingStatus(id: string, status: Booking['status']): Promise<void> {
    const b = this.bookings.find((item) => item.id === id);
    if (b) {
      b.status = status;
      localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookings));

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('bookings').update({ status }).eq('id', id);
        } catch (err) {
          console.warn('Supabase booking update error:', err);
        }
      }

      this.notify();
    }
  }

  // Settings
  public getSettings(): BusinessSettings {
    return { ...this.settings };
  }

  public updateSettings(newSettings: Partial<BusinessSettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    this.notify();
  }

  public resetToDefaults() {
    this.vehicles = [...INITIAL_VEHICLES];
    this.bookings = [...DEMO_BOOKINGS];
    this.settings = BUSINESS_SETTINGS;
    localStorage.setItem(VEHICLES_STORAGE_KEY, JSON.stringify(this.vehicles));
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(this.bookings));
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(this.settings));
    this.notify();
  }
}

export const store = new StoreService();
