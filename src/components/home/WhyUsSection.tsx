import React from 'react';

export const WhyUsSection: React.FC = () => {
  const pillars = [
    {
      index: '01',
      title: 'Convenient Booking',
      description: 'Streamlined online reservation with instant confirmation, live WhatsApp coordination, and 3-minute digital identity verification.',
    },
    {
      index: '02',
      title: 'Curated Vehicle Selection',
      description: 'A 25-model fleet spanning Hatchbacks, Compact SUVs, Executive Sedans, and rugged 7-seater SUVs including Fortuner, Safari, and XUV 7OO.',
    },
    {
      index: '03',
      title: 'Flexible Travel Options',
      description: 'Choose 24H (250 KM) or 12H (150 KM) packages across Self-Drive (extra ₹6/km) and With Driver (+₹1,499 / +₹899, extra ₹8/km).',
    },
    {
      index: '04',
      title: 'Transparent Rental Information',
      description: 'Clear pricing with no surge fees, no unexpected cancellation penalties, and refundable security deposits processed within 24 to 48 hours.',
    },
    {
      index: '05',
      title: 'Dedicated Customer Assistance',
      description: '24/7 Indore operations desk on standby for airport flight tracking, roadside support, and multi-city Madhya Pradesh route advice.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#F7F7F5] border-b border-[#E7E7E5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            Brand Standards
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318]">
            Built on Operational Discipline.
          </h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            AIRGOCABS operates with straightforward commitments. We focus on vehicle mechanical integrity, transparent policies, and reliable service in Indore.
          </p>
        </div>

        {/* Swiss Numbered List Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item) => (
            <div
              key={item.index}
              className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4 hover:border-[#111318] transition-colors"
            >
              <div className="text-xs font-mono font-bold text-[#777777]">
                {item.index} /
              </div>
              <h3 className="text-base font-display font-bold text-[#111318]">
                {item.title}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

          {/* Indore Hub Card */}
          <div className="p-8 bg-[#111318] text-white rounded-[4px] space-y-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-[#B8C0CC]">06 / Hub</div>
              <h3 className="text-base font-display font-bold text-white mt-4">
                Indore City & Airport Network
              </h3>
              <p className="text-xs text-[#B8C0CC] leading-relaxed mt-2">
                Devi Ahilya Bai Holkar Airport, Super Corridor, Vijay Nagar, Palasia, and citywide doorstep handover.
              </p>
            </div>
            <div className="text-[11px] font-mono text-[#777777] pt-4 border-t border-[#262626]">
              365 Days • 24-Hour Dispatch
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
