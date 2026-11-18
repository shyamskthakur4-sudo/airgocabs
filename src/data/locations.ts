export interface LocationOption {
  id: string;
  name: string;
  category: 'Airport' | 'Hub' | 'Commercial' | 'Transit' | 'Doorstep';
  popular?: boolean;
  address?: string;
  isAirport?: boolean;
}

export const INDORE_LOCATIONS: LocationOption[] = [
  {
    id: 'airport-idr',
    name: 'Devi Ahilya Bai Holkar Airport (IDR) — Terminal Pickup Hub',
    category: 'Airport',
    popular: true,
    address: 'Arrival Hall Gate 2 / Dedicated Parking Bay 4, Indore Airport',
    isAirport: true,
  },
  {
    id: 'vijay-nagar',
    name: 'Vijay Nagar — Brilliant Convention Centre & C21 Zone',
    category: 'Commercial',
    popular: true,
    address: 'Scheme 54, PU-4 Commercial Area, Vijay Nagar, Indore',
  },
  {
    id: 'super-corridor',
    name: 'Super Corridor — TCS / Infosys Tech Hub Handover',
    category: 'Commercial',
    popular: true,
    address: 'Super Corridor Road near Gandhi Nagar circle, Indore',
  },
  {
    id: 'palasia',
    name: 'Palasia — New Palasia & Industry House Centre',
    category: 'Commercial',
    popular: true,
    address: 'Near 56 Dukan & AB Road, New Palasia, Indore',
  },
  {
    id: 'indore-junction',
    name: 'Indore Junction Railway Station (Main Exit Platform 1)',
    category: 'Transit',
    popular: true,
    address: 'Chhoti Gwaltoli, Indore Junction, Indore',
  },
  {
    id: 'rajwada',
    name: 'Rajwada / Sarafa Historic Central District',
    category: 'Hub',
    popular: false,
    address: 'MG Road, Central Indore',
  },
  {
    id: 'bhawarkua',
    name: 'Bhawarkua — University Road & Tower Square',
    category: 'Hub',
    popular: false,
    address: 'Bhawarkua Main Road, Indore',
  },
  {
    id: 'bypass-bicholi',
    name: 'Indore Bypass — Bicholi Mardana / Phoenix Citadel Mall',
    category: 'Commercial',
    popular: true,
    address: 'MR-10 Junction & Bypass, Indore',
  },
  {
    id: 'doorstep-delivery',
    name: 'Doorstep Delivery — Hotel / Residence (Anywhere in Indore)',
    category: 'Doorstep',
    popular: true,
    address: 'Deliver directly to your hotel lobby or home in Indore municipal limits',
  },
];
