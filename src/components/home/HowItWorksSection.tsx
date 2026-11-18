import React from 'react';
import { Car, CalendarRange, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Car,
      title: 'Choose Your Vehicle',
      description: 'Explore our verified fleet across Hatchbacks, Executive Sedans, Rugged SUVs, and Luxury MPVs. Filter by transmission, seats, or rental type.',
    },
    {
      step: '02',
      icon: CalendarRange,
      title: 'Select Rental Details',
      description: 'Choose your pickup & drop dates and location (Indore Airport Terminal, Vijay Nagar, or doorstep delivery). Add optional flight details for live arrival tracking.',
    },
    {
      step: '03',
      icon: CheckCircle,
      title: 'Confirm & Drive',
      description: 'Receive instant booking confirmation and reference ID. Complete quick digital KYC, inspect your sanitized car at handover, and embark on your journey.',
    },
  ];

  return (
    <section className="py-24 bg-obsidian-400 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            Effortless Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-platinum tracking-tight">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-platinum-muted">
            Three simple steps between choosing your ride and hitting the road in Indore.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line for desktop */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-500/0 via-brand-500/30 to-brand-500/0 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative z-10 p-8 rounded-3xl bg-surface-raised border border-white/10 glass-card-hover flex flex-col justify-between space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-surface border border-white/5 flex items-center justify-center text-brand-400 shadow-glow">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-3xl font-black text-white/10 font-mono">
                    {item.step}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-platinum">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-platinum-dim leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 text-xs font-bold text-brand-400 flex items-center gap-1">
                  <span>Step {idx + 1} of 3</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-400 hover:from-brand-400 text-obsidian font-extrabold text-sm px-8 py-4 rounded-xl shadow-glow transition-all"
          >
            <span>Start Your Booking Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
