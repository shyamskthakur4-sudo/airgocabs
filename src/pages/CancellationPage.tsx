import React, { useEffect } from 'react';
import { updateMetaTags } from '../lib/seo';
import { RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CancellationPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Cancellation & Refund Policy | AIRGOCABS Indore',
      description: 'Transparent cancellation and refund rules for car rentals in Indore. 100% refund on cancellations made at least 24 hours prior to scheduled handover.',
    });
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#286BFF]" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777]">
              Customer Protection
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-[#171717] tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#777777]">
            Last updated: November 2026 • Designed to offer maximum travel flexibility
          </p>
        </div>

        {/* 3 Tier Refund Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#286BFF] font-semibold">
              Tier 01 • Advance Notice
            </span>
            <div className="font-display text-2xl font-light text-[#171717]">
              100% Full Refund
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
              &gt; 24 Hours Notice
            </div>
            <p className="text-xs text-[#777777] leading-relaxed">
              Cancel at least 24 hours before your scheduled pickup time and receive a 100% full refund credited to your original payment method without deduction.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] font-semibold">
              Tier 02 • Standard Window
            </span>
            <div className="font-display text-2xl font-light text-[#171717]">
              Flat ₹500 Fee
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
              6 to 24 Hours Notice
            </div>
            <p className="text-xs text-[#777777] leading-relaxed">
              If cancelled within 6 to 24 hours of scheduled pickup, a flat ₹500 vehicle preparation fee is deducted and remaining amount is returned immediately.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#777777] font-semibold">
              Tier 03 • Late Cancellation
            </span>
            <div className="font-display text-2xl font-light text-[#171717]">
              1-Day Fare Fee
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
              &lt; 6 Hours / No-Show
            </div>
            <p className="text-xs text-[#777777] leading-relaxed">
              If cancelled with less than 6 hours notice, one day base rental is retained. Security deposit and balance days are 100% refunded in full.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines Container */}
        <div className="bg-white border border-[#E7E7E5] rounded-[4px] p-6 sm:p-12 space-y-10 text-sm text-[#555555] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              Free Rescheduling Window
            </h2>
            <p>
              Travel schedules change. You may reschedule your booking dates, reporting times, or pickup locations in Indore without any administrative charge up to 4 hours before scheduled handover, subject to vehicle fleet category availability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              Refund Processing Timelines
            </h2>
            <p>
              Approved refunds are credited to the original source account (UPI, Credit Card, or Net Banking) within 3 to 5 business banking days. Security deposit pre-authorization releases are initiated automatically within 24 to 48 hours following vehicle return inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-lg font-medium text-[#171717] pb-2 border-b border-[#F0F0ED]">
              Flight Cancellations & Runway Delays
            </h2>
            <p>
              If your arriving flight at Devi Ahilya Bai Holkar Airport (IDR) is cancelled or diverted by the airline, provide proof of airline cancellation within 6 hours of scheduled arrival to receive a 100% fee waiver and immediate full refund.
            </p>
          </section>

          <div className="pt-6 border-t border-[#F0F0ED] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <span className="text-xs text-[#777777]">
              Need help cancelling or modifying an existing reservation?
            </span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#111318] text-white hover:bg-[#22252c] text-xs font-medium uppercase tracking-wider transition-colors"
            >
              <span>Contact Operations Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
