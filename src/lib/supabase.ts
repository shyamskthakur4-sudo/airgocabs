import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-supabase-url')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * SQL SCHEMA FOR SUPABASE (Execute in Supabase SQL Editor):
 * 
 * CREATE TABLE vehicles (
 *   id TEXT PRIMARY KEY,
 *   name TEXT NOT NULL,
 *   brand TEXT NOT NULL,
 *   model TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   transmission TEXT NOT NULL,
 *   seats INT NOT NULL,
 *   luggage INT NOT NULL,
 *   fuel_type TEXT NOT NULL,
 *   mileage TEXT,
 *   image TEXT NOT NULL,
 *   features JSONB,
 *   self_drive_available BOOLEAN DEFAULT true,
 *   chauffeur_available BOOLEAN DEFAULT true,
 *   self_drive_price_per_day NUMERIC NOT NULL,
 *   chauffeur_price_per_day NUMERIC NOT NULL,
 *   security_deposit NUMERIC NOT NULL,
 *   km_limit_per_day INT DEFAULT 250,
 *   extra_km_rate NUMERIC DEFAULT 6,
 *   is_available BOOLEAN DEFAULT true,
 *   rating NUMERIC DEFAULT 4.9,
 *   trips_completed INT DEFAULT 0,
 *   is_popular BOOLEAN DEFAULT false,
 *   is_airport_special BOOLEAN DEFAULT false,
 *   tagline TEXT,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * CREATE TABLE bookings (
 *   id TEXT PRIMARY KEY,
 *   booking_reference TEXT UNIQUE NOT NULL,
 *   rental_type TEXT NOT NULL,
 *   vehicle_id TEXT REFERENCES vehicles(id),
 *   vehicle_name TEXT NOT NULL,
 *   vehicle_category TEXT NOT NULL,
 *   pickup_location TEXT NOT NULL,
 *   dropoff_location TEXT NOT NULL,
 *   is_airport_pickup BOOLEAN DEFAULT false,
 *   flight_number TEXT,
 *   pickup_date DATE NOT NULL,
 *   pickup_time TEXT NOT NULL,
 *   return_date DATE NOT NULL,
 *   return_time TEXT NOT NULL,
 *   rental_duration_days INT NOT NULL,
 *   base_amount NUMERIC NOT NULL,
 *   gst_amount NUMERIC NOT NULL,
 *   security_deposit NUMERIC NOT NULL,
 *   total_estimated_amount NUMERIC NOT NULL,
 *   customer_name TEXT NOT NULL,
 *   customer_phone TEXT NOT NULL,
 *   customer_email TEXT NOT NULL,
 *   driving_license_number TEXT,
 *   special_requests TEXT,
 *   status TEXT DEFAULT 'Pending',
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * -- Enable Row Level Security (RLS)
 * ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
 * ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
 * 
 * CREATE POLICY "Public read vehicles" ON vehicles FOR SELECT USING (true);
 * CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);
 * CREATE POLICY "Admin full access" ON bookings FOR ALL USING (auth.role() = 'authenticated');
 */
