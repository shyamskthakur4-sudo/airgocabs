import React from 'react';
import { Star, Quote, Info } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const demoReviews = [
    {
      author: 'Sample Client A. K.',
      title: 'Corporate Traveller (Indore Airport Handover)',
      rating: 5,
      vehicle: 'Toyota Innova Crysta',
      comment: 'Flight landed at Indore Airport at 11:30 PM. The vehicle was parked at Bay 4 ready with AC on. Complete handover took less than 4 minutes. Transparent billing with deposit refunded promptly.',
      date: 'November 2026',
    },
    {
      author: 'Sample Client R. M.',
      title: 'Family Vacation (Self-Drive Ujjain & Mandu)',
      rating: 5,
      vehicle: 'Mahindra XUV700 AX7L',
      comment: 'Clean car with full tank fuel protocol. Fastag worked seamlessly across all MP state highway toll gates. Having 300 free km per day made our Omkareshwar road trip stress-free.',
      date: 'November 2026',
    },
    {
      author: 'Sample Client S. B.',
      title: 'Conference Delegate (Brilliant Convention Centre)',
      rating: 5,
      vehicle: 'Honda City ZX CVT',
      comment: 'Uniformed chauffeur was punctual, courteous, and possessed excellent knowledge of Indore city routes during peak Vijay Nagar traffic. Supreme professionalism.',
      date: 'November 2026',
    },
  ];

  return (
    <section className="py-24 bg-obsidian relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-400">
            Guest Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-platinum tracking-tight">
            Trusted By Travelers in Indore
          </h2>
          <p className="text-sm sm:text-base text-platinum-muted">
            Read verified journey impressions from our airport, corporate, and leisure patrons.
          </p>
        </div>

        {/* Clear Notice Banner regarding Placeholder Reviews */}
        <div className="max-w-xl mx-auto mb-12 p-3 rounded-xl bg-surface border border-white/10 flex items-center justify-center gap-2 text-xs text-platinum-muted text-center">
          <Info className="w-4 h-4 text-brand-400 shrink-0" />
          <span>
            <strong className="text-platinum">Demo Notice:</strong> These entries illustrate the live testimonial layout until verified Google & customer reviews are synchronized.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {demoReviews.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-surface-raised border border-white/5 hover:border-brand-500/20 glass-card-hover flex flex-col justify-between space-y-6 relative"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-brand-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-brand-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-white/10" />
              </div>

              <p className="text-xs sm:text-sm text-platinum-dim leading-relaxed italic">
                "{review.comment}"
              </p>

              <div className="pt-4 border-t border-white/5 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-platinum">{review.author}</h4>
                  <span className="text-[10px] text-platinum-muted">{review.date}</span>
                </div>
                <p className="text-xs text-brand-400 font-medium">{review.title}</p>
                <span className="text-[11px] text-platinum-muted block font-mono">
                  Vehicle: {review.vehicle}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
