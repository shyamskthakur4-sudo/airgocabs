# AIRGOCABS — Premium Automotive Mobility & Car Rental Platform

**AIRGOCABS** is an ultra-premium, mobile-first, multi-page car rental and airport transfer platform engineered for **Indore, Madhya Pradesh, India**. Inspired by the design ethos and digital craftsmanship of Porsche, Mercedes-Benz, and Audi.

---

## 🌟 Key Features & Architecture

### 1. Multi-Page Architecture
- **Home (`/`)**: Cinematic hero, booking search interface (Self-Drive vs Chauffeur, Airport toggle, date & time duration validator), Distinctive Services, Fleet Preview, Airport Special section, Why AIRGOCABS (6 pillars), 3-step How It Works, Verified Testimonials layout (clearly labeled demo placeholders), and Final CTA.
- **Our Fleet (`/fleet`)**: Complete vehicle discovery catalog with real-time filtering (category [Hatchback, Sedan, SUV/XUV, Premium], transmission [Manual, Automatic], seating [5 or 7], rental type, price slider) and interactive **View Specs** detail modal.
- **Self-Drive Rentals (`/self-drive`)**: Airport pickup/drop-off, driver eligibility (Age 21+, 1+ yr LMV license), mandatory KYC documents, security deposit release protocol (24–48 hrs), like-for-like fuel policy, 300 km daily allowance, and cancellation policy.
- **Chauffeur-Driven Cars (`/with-driver`)**: Local packages (4hr/40km, 8hr/80km), airport transfers with name placard, corporate delegations, and outstation pilgrimage circuits (Ujjain Mahakaleshwar, Omkareshwar, Maheshwar, Mandu).
- **Airport Transfers (`/airport-transfer`)**: Dedicated Devi Ahilya Bai Holkar Airport (IDR) landing page with flight number tracking, terminal parking bay 4 handover, and zero surge guarantee.
- **Booking Flow (`/book`)**: Conversion-focused 7-step booking engine:
  1. Rental Type (Self-Drive vs Chauffeur)
  2. Vehicle Category (Hatchback, Sedan, SUV, Premium)
  3. Trip Details & Schedule (with date validation ensuring return > pickup)
  4. Vehicle Selection with real specifications & rates
  5. Customer Information & Verification
  6. Transparent Price Breakdown (Base fare + 5% GST + Refundable Deposit)
  7. Booking Confirmation (Generates unique reference e.g., `AGC-26-XXXXX` and celebratory confetti)
- **Booking Status Tracker (`/booking-confirmation`)**: Real-time status lookup by reference ID with printable receipt.
- **About Us (`/about`)**: Company vision, Indore fleet inspection standards, and core principles.
- **Contact Us (`/contact`)**: 24/7 hotline, WhatsApp concierge, inquiry form, and Google Maps embed for Indore.
- **FAQs (`/faq`)**: Structured accordion knowledge base with category pills and instant keyword search.
- **Legal Policies**: Terms & Conditions (`/terms`), Privacy Policy (`/privacy`), and Cancellation Policy (`/cancellation`).
- **Admin Dashboard (`/admin`)**: Password-protected operations console (`airgo2026`).

---

## 🎨 Brand Identity & Logo Instructions

- **Logo Asset Location**: The website references `/logo.png` (or `/images/logo.png`) in the `public/` directory.
- **Preservation Guarantee**: `BrandLogo.tsx` renders the logo preserving its exact original proportions, typography, colors, and background transparency with zero distortion.
- **Drop-in Replacement**: Simply place your official `logo.png` inside the `public/` folder, and it will immediately render across all pages, navigation, and receipts.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🔐 Admin Console Access

- **URL**: `/admin`
- **Default Password**: `airgo2026`
- **Capabilities**:
  - Live revenue and booking metrics
  - Manage bookings: view customer details, flight info, update status (Pending, Confirmed, Active, Completed, Cancelled)
  - Fleet management: add new vehicles, update prices, toggle availability
  - Company settings: phone, WhatsApp number, email, and handover addresses

---

## 🗄️ Supabase Backend Integration

AIRGOCABS includes a Supabase client (`src/lib/supabase.ts`) and local reactive store (`src/lib/store.ts`).

To connect your Supabase database:
1. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
2. Run the SQL schema provided in `src/lib/supabase.ts` inside your Supabase SQL Editor.
3. The application will automatically synchronize all vehicle listings and customer bookings to your live PostgreSQL database!
