import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { SELF_DRIVE_POLICIES } from '../../src/data/policies';
import { FAQ_DATA } from '../../src/data/faqs';
import { updateMetaTags } from '../lib/seo';

export const SelfDrivePage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    updateMetaTags({
      title: 'Self-Drive Car Rental in Indore | AIRGOCABS',
      description: 'Rent sanitized self-drive cars in Indore. 24H (250 KM) & 12H (150 KM) packages, extra ₹6/km, airport handover at Devi Ahilya Bai Holkar Airport.',
    });
  }, []);

  const selfDriveFaqs = FAQ_DATA.filter((f) => f.category === 'Self-Drive' || f.category === 'Billing');

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-20">
        
        {/* Editorial Hero Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Autonomous Travel • Indore
            </span>
            <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.08]">
              Freedom Behind the Wheel.
            </h1>
            <p className="text-sm sm:text-base text-[#666666] max-w-xl leading-relaxed">
              Explore Indore, Ujjain, and Madhya Pradesh on your own schedule. Transparent 24H (250 KM) and 12H (150 KM) packages with ₹6/km extra range, and 24/7 terminal handover at Devi Ahilya Bai Holkar Airport.
            </p>
            <div className="pt-2">
              <Link
                to="/book?type=Self-Drive"
                className="btn-primary"
              >
                <span>Reserve Self-Drive Vehicle</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block text-right text-xs text-[#777777]">
            <div className="font-semibold text-[#111318]">250 KM (24H) • 150 KM (12H)</div>
            <div>Extra Range: ₹6 / KM</div>
            <div>Airport Bay 4 Handover</div>
          </div>
        </div>

        {/* Large Automotive Feature Photo */}
        <div className="relative h-[360px] sm:h-[480px] rounded-[6px] overflow-hidden border border-[#E7E7E5] bg-[#EFEFEA]">
          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80"
            alt="Self Drive Highway Mobility"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
        </div>

        {/* Airport Handover Banner */}
        <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-display font-bold text-[#111318]">
              Arriving at Devi Ahilya Bai Holkar Airport (IDR)?
            </h3>
            <p className="text-xs text-[#666666] max-w-xl">
              Your vehicle will be stationed at Airport Parking Bay 4. Complete a 3-minute physical inspection on your smartphone and drive away immediately.
            </p>
          </div>

          <Link
            to="/book?type=Self-Drive&isAirport=true"
            className="btn-secondary whitespace-nowrap text-xs"
          >
            Airport Handover Details
          </Link>
        </div>

        {/* Policies Grid */}
        <div className="space-y-10">
          <div className="space-y-2">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Policy Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#111318]">
              Rental Requirements & Operational Policies
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SELF_DRIVE_POLICIES.map((policy) => (
              <div
                key={policy.id}
                className="p-7 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-base font-display font-bold text-[#111318]">{policy.title}</h3>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    {policy.summary}
                  </p>
                </div>

                <ul className="space-y-2 pt-4 border-t border-[#E7E7E5] text-xs text-[#555555]">
                  {policy.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#111318] font-bold">—</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#111318]">
              Self-Drive Rental FAQs
            </h2>
          </div>

          <div className="divide-y divide-[#E7E7E5] border-y border-[#E7E7E5]">
            {selfDriveFaqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#111318] gap-4"
                >
                  <span>{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp className="w-4 h-4 text-[#777777] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="pt-3 text-xs text-[#666666] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="p-10 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-[#111318]">
            Reserve Your Self-Drive Vehicle in Indore
          </h3>
          <p className="text-xs text-[#666666] max-w-md mx-auto">
            Choose your vehicle, select your dates, and pick up your car at Devi Ahilya Bai Holkar Airport or doorstep.
          </p>
          <div className="pt-2">
            <Link
              to="/book?type=Self-Drive"
              className="btn-primary"
            >
              <span>Start Booking Process</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
