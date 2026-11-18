import React, { useEffect } from 'react';
import { updateMetaTags } from '../lib/seo';
import { FileText, Shield } from 'lucide-react';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Terms & Conditions | AIRGOCABS Indore Car Rental',
      description: 'Review the official terms and conditions for self-drive car rentals, chauffeur services, speed limits, and insurance in Indore with AIRGOCABS.',
    });
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#286BFF]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777]">
              Legal Documentation
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-[#171717] tracking-tight">
            Terms & Conditions of Service
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#777777]">
            Last updated: November 2026 • Applicable to all rentals booked with AIRGOCABS Indore
          </p>
        </div>

        {/* Legal Sections Container */}
        <div className="bg-white border border-[#E7E7E5] rounded-[4px] p-6 sm:p-12 space-y-10 text-sm text-[#555555] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              1. Agreement Overview
            </h2>
            <p>
              These Terms and Conditions constitute a legally binding agreement between the Hirer ("Customer", "You") and AIRGOCABS ("Company", "We", "Us"), operating in Indore, Madhya Pradesh. By creating a booking online, via WhatsApp, or through authorized booking counters, you unconditionally agree to comply with all operational covenants set forth herein.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              2. Driver Eligibility (Self-Drive)
            </h2>
            <p>
              The primary hirer must be at least 21 years of age and hold an original, valid Indian Light Motor Vehicle (LMV) Driving License for at least 1 year. Learner’s licenses and commercial transport badges are strictly ineligible for self-drive rentals. Original government identity documents (Aadhaar Card, Passport, or Voter ID) must be physically presented at the time of vehicle handover.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              3. Security Deposit & Refund Protocol
            </h2>
            <p>
              A flat refundable security deposit of ₹10,000 is collected upon vehicle handover. Following the return vehicle check and Fastag electronic audit, the deposit is electronically returned to your original payment method within 24 to 48 business hours. Deductions only apply to unpaid traffic e-challans, Fastag toll debits, or documented exterior/interior damage beyond fair wear and tear.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              4. Speed Governance & Safety Compliance
            </h2>
            <p>
              In compliance with Central Motor Vehicle rules and tourist transport safety guidelines in Madhya Pradesh, all vehicles are equipped with calibrated speed limiters (80 km/h or 100 km/h depending on segment regulations). Tampering with telemetry hardware or speed limiters is strictly prohibited and results in immediate forfeiture of the security deposit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              5. Fuel & Daily Kilometers
            </h2>
            <p>
              All self-drive rentals operate on a transparent like-for-like fuel policy. Cars are dispatched with a documented fuel level and must be returned with an equivalent level. Rentals include 250 Kilometers per 24-hour package and 150 Kilometers per 12-hour package. Extra kilometers are billed transparently at ₹6/km for Self-Drive and ₹8/km for With-Driver bookings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              6. Prohibited Usages
            </h2>
            <p>
              Vehicles must not be used for motor racing, off-roading, commercial goods transport, towing, subleasing, or transportation of illegal contraband under Indian law. Smoking, vaping, and consumption of alcohol inside vehicles is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              7. Jurisdiction
            </h2>
            <p>
              Any disputes or claims arising out of or in connection with these rental services are subject to the exclusive legal jurisdiction of the competent courts in Indore, Madhya Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
