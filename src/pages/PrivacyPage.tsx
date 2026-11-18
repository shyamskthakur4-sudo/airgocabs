import React, { useEffect } from 'react';
import { updateMetaTags } from '../lib/seo';
import { Lock } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Privacy Policy | AIRGOCABS Indore',
      description: 'Review how AIRGOCABS Indore safeguards your personal information, identity documents, and payment details during car rentals.',
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
              Data Protection
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-[#171717] tracking-tight">
            Privacy & Identity Protection Policy
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#777777]">
            Last updated: November 2026 • Governing information collected by AIRGOCABS Indore
          </p>
        </div>

        {/* Policy Container */}
        <div className="bg-white border border-[#E7E7E5] rounded-[4px] p-6 sm:p-12 space-y-10 text-sm text-[#555555] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              1. Collection of Personal & Travel Data
            </h2>
            <p>
              To fulfill legitimate vehicle rental agreements, we collect basic customer identifiers including legal full name, mobile telephone number, email address, government photo identification (Aadhaar, Passport, or Driving License), and arrival flight information for airport handover coordination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              2. Digital Verification & Security
            </h2>
            <p>
              Identity documents uploaded for KYC purposes are stored in encrypted format with strict administrative access control. We never sell, lease, or distribute your identity information to third-party telemarketers or external advertising networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              3. Vehicle Telematics & GPS Data
            </h2>
            <p>
              In accordance with safety mandates for commercial self-drive vehicles in India, vehicles are equipped with telematics hardware. Telematics data is utilized solely for roadside breakdown dispatch, automated geo-fencing, speed tracking, and emergency incident response.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              4. Payment Information
            </h2>
            <p>
              All online digital transactions and security deposit authorizations are processed directly via RBI-authorized payment gateways adhering to PCI-DSS standards. AIRGOCABS does not capture or store your debit/credit card CVV or banking security PINs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              5. Contact Information
            </h2>
            <p>
              For any privacy questions or requests to purge completed reservation records, contact our Data Protection Officer at reservations@airgocabs.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
