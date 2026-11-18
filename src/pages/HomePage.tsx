import React, { useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { ServicesSection } from '../components/home/ServicesSection';
import { FleetSection } from '../components/home/FleetSection';
import { AirportSection } from '../components/home/AirportSection';
import { WhyUsSection } from '../components/home/WhyUsSection';
import { FinalCtaSection } from '../components/home/FinalCtaSection';
import { updateMetaTags, AIRGOCABS_LOCAL_BUSINESS_SCHEMA } from '../lib/seo';

export const HomePage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'AIRGOCABS — Premium Automotive Mobility & Car Rental | Indore',
      description: 'Move freely. Arrive better. Premium self-drive and chauffeur-driven car rentals in Indore. Punctual airport handover at Devi Ahilya Bai Holkar Airport.',
      schema: AIRGOCABS_LOCAL_BUSINESS_SCHEMA,
    });
  }, []);

  return (
    <div className="space-y-0">
      <Hero />
      <ServicesSection />
      <FleetSection />
      <AirportSection />
      <WhyUsSection />
      <FinalCtaSection />
    </div>
  );
};
