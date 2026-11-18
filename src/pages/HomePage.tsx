import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { ServicesSection } from '../components/home/ServicesSection';
import { FleetSection } from '../components/home/FleetSection';
import { AirportSection } from '../components/home/AirportSection';
import { DestinationsSection } from '../components/home/DestinationsSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { updateMetaTags, AIRGOCABS_LOCAL_BUSINESS_SCHEMA } from '../lib/seo';

export const HomePage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Car Rental in Indore — Self-Drive & Chauffeur Services | AIRGOCABS',
      description: 'Book premium self-drive and chauffeur-driven car rentals in Indore with direct handover at Devi Ahilya Bai Holkar Airport (IDR Terminal 1 Bay 4). 25+ verified cars, 12H & 24H packages, and flat transparent rates.',
      schema: AIRGOCABS_LOCAL_BUSINESS_SCHEMA,
    });
  }, []);

  return (
    <div className="space-y-0">
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
