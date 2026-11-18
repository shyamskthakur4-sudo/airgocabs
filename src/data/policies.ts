export interface PolicySection {
  id: string;
  title: string;
  summary: string;
  points: string[];
  icon: string;
}

export const SELF_DRIVE_POLICIES: PolicySection[] = [
  {
    id: 'eligibility',
    title: 'Driver Eligibility & Age Criteria',
    summary: 'Clear, transparent age and licensing requirements to ensure road safety across Madhya Pradesh.',
    icon: 'ShieldCheck',
    points: [
      'Minimum Age: The primary hirer must be at least 21 years of age.',
      'Licensing: Must possess an original, valid Indian Light Motor Vehicle (LMV) Driving License held for a minimum of 1 year.',
      'Commercial Restrictions: Learner’s permits or commercial transport licenses are strictly not accepted for self-drive rentals.',
      'International Drivers: Foreign nationals and NRIs require a valid Passport and an International Driving Permit (IDP).',
    ],
  },
  {
    id: 'documents',
    title: 'Mandatory Verification Documents',
    summary: 'Quick 3-minute digital verification prior to vehicle handover.',
    icon: 'FileText',
    points: [
      'Original Indian Driving License (verified physically at handover; original remains in your possession).',
      'Government ID Proof: Aadhaar Card or Passport (for address verification).',
      'Flight / Train Ticket: Mandatory for airport/railway terminal handovers for seamless gate access.',
      'Security Deposit Proof: UPI or credit card pre-authorization receipt.',
    ],
  },
  {
    id: 'deposit',
    title: 'Refundable Security Deposit',
    summary: '100% transparent and tracked deposit process with zero hidden deductions.',
    icon: 'CreditCard',
    points: [
      'Flat ₹10,000 refundable security deposit collected at vehicle handover across all self-drive models.',
      'Mode of Payment: Pre-authorized via Net Banking, UPI, or Credit Card at the time of vehicle release.',
      'Refund Timeline: Automatically released within 24 to 48 hours following the return inspection and Fastag reconciliation.',
      'Deductions: Deductions occur only in cases of unpaid traffic e-challans, Fastag toll overdrafts, or vehicle body damage beyond normal wear.',
    ],
  },
  {
    id: 'fuel-mileage',
    title: 'Fuel & Package Mileage Policy',
    summary: 'Fair like-for-like fuel protocol with clear 24H & 12H distance ranges.',
    icon: 'Fuel',
    points: [
      'Like-for-Like Fuel Policy: Cars are delivered with a documented fuel level. Customers simply return the car with the equivalent fuel level.',
      'Included Distance Range: 250 Kilometers included for 24-Hour packages and 150 Kilometers included for 12-Hour packages.',
      'Extra Kilometers: Flat ₹6/km for Self-Drive bookings and ₹8/km for With-Driver chauffeur bookings across the entire fleet.',
      'With Driver Add-on: Professional verified chauffeur available at +₹1,499 for 24H and +₹899 for 12H packages.',
    ],
  },
  {
    id: 'cancellation',
    title: 'Flexible Cancellation & Rescheduling',
    summary: 'Life happens. We offer stress-free cancellations with fair notice windows.',
    icon: 'RefreshCw',
    points: [
      'Free Cancellation: 100% full refund when cancelled at least 24 hours prior to scheduled pickup time.',
      'Late Cancellation (6 to 24 hours before pickup): Flat ₹500 administrative fee; remaining balance credited immediately.',
      'Urgent Cancellation (< 6 hours or No-Show): One day rental base fee retained; remaining balance and deposit refunded.',
      'Rescheduling: Free date and time rescheduling up to 4 hours before pickup, subject to fleet category availability.',
    ],
  },
];

export const CHAUFFEUR_PACKAGES = [
  {
    id: 'pkg-12h',
    name: '12-Hour Chauffeur Package',
    duration: '12 Hours / 150 Kilometers',
    description: 'Ideal for Indore city meetings, business appointments, airport arrival transfers, or half-day Ujjain visits.',
    extraHourRate: 'Driver fee: +₹899',
    extraKmRate: '₹8 / km',
    popular: true,
  },
  {
    id: 'pkg-24h',
    name: '24-Hour Full Day Package',
    duration: '24 Hours / 250 Kilometers',
    description: 'Our most popular package for full-day corporate visits, Indore city tours, and Ujjain or Omkareshwar circuits.',
    extraHourRate: 'Driver fee: +₹1,499',
    extraKmRate: '₹8 / km',
    popular: true,
  },
  {
    id: 'pkg-airport-transfer',
    name: 'Airport Transfer (Pickup / Drop)',
    duration: 'Devi Ahilya Bai Holkar Airport (IDR)',
    description: 'Guaranteed punctual pickup or drop-off at Terminal 1 with flight tracking, name placard & luggage assistance.',
    extraHourRate: 'Free 45 min waiting',
    extraKmRate: '₹8 / km beyond package',
    popular: true,
  },
  {
    id: 'pkg-outstation-pilgrimage',
    name: 'Outstation Pilgrimage & Heritage',
    duration: 'Ujjain / Omkareshwar / Maheshwar / Mandu',
    description: 'Dedicated experienced chauffeurs familiar with MP highway routes, VIP temple darshan lanes, and ghat parking.',
    extraHourRate: '+₹1,499 / 24H driver fee',
    extraKmRate: '250 KM (24H) • Extra ₹8/km',
    popular: true,
  },
];
