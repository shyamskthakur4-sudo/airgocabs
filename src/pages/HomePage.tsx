import React from 'react';
import { SeoHead } from '../components/common/SeoHead';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { Hero } from '../components/home/Hero';
import { ServicesSection } from '../components/home/ServicesSection';
import { FleetSection } from '../components/home/FleetSection';
import { AirportSection } from '../components/home/AirportSection';
import { DestinationsSection } from '../components/home/DestinationsSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';

export const HomePage: React.FC = () => {
  // Specification 3: Global / Homepage @type: ["TaxiService", "LocalBusiness"]
  const globalTaxiSchema = {
    '@context': 'https://schema.org',
    '@type': ['TaxiService', 'LocalBusiness'],
    'name': 'AirGo Cabs',
    'alternateName': 'AirGo Cabs Car Rental & Outstation Taxi',
    'url': 'https://www.airgocabs.com',
    'logo': 'https://www.airgocabs.com/logo.png',
    'image': 'https://www.airgocabs.com/images/hero-airport-car.jpg',
    'telephone': '+91-83492-50049',
    'email': 'reservations@airgocabs.com',
    'priceRange': '₹₹',
    'currenciesAccepted': 'INR',
    'paymentAccepted': 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Dedicated Handover Bay 4, Terminal 1, Devi Ahilya Bai Holkar Airport & Super Corridor',
      'addressLocality': 'Indore',
      'addressRegion': 'Madhya Pradesh',
      'postalCode': '452005',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 22.7217,
      'longitude': 75.8011,
    },
    'areaServed': [
      { '@type': 'City', 'name': 'Indore' },
      { '@type': 'Place', 'name': 'Devi Ahilya Bai Holkar Airport (IDR)' },
      { '@type': 'City', 'name': 'Ujjain' },
      { '@type': 'City', 'name': 'Bhopal' },
      { '@type': 'City', 'name': 'Omkareshwar' },
      { '@type': 'AdministrativeArea', 'name': 'Madhya Pradesh' },
    ],
    'sameAs': [
      'https://www.instagram.com/airgocabs',
      'https://twitter.com/airgocabs',
      'https://wa.me/918349250049',
    ],
  };

  return (
    <div className="space-y-0">
      {/* 1. Dynamic Head & Meta Tags */}
      <SeoHead
        title="AirGo Cabs | Book Outstation Cabs, One-Way Taxi & Airport Transfers"
        description="Book reliable outstation cabs, one-way taxi & 24/7 airport transfers with AirGo Cabs. Clean AC Hatchbacks, Sedans & SUVs, verified drivers & transparent billing. Book now!"
        canonicalPath="/"
        ogType="website"
      />

      {/* 2. Structured Data Injections */}
      <JsonLdSchema schema={globalTaxiSchema} id="json-ld-homepage-taxi" />

      <Hero />
      <ServicesSection />
      <FleetSection />
      <AirportSection />
      <DestinationsSection />
      <WhyUsSection />
      <FinalCtaSection />
    </div>
  );
};
