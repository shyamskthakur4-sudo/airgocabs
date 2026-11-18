import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Printer, MessageSquare, Copy, Check, AlertCircle } from 'lucide-react';
import { store } from '../lib/store';
import { Booking } from '../types';
import { formatINR } from '../lib/utils';
import { buildBookingWhatsAppUrl } from '../lib/whatsapp';
import { updateMetaTags } from '../lib/seo';

export const BookingConfirmationPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRef = searchParams.get('ref') || '';

  const [searchQuery, setSearchQuery] = useState(initialRef);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: 'Booking Status & Receipt | AIRGOCABS Indore',
      description: 'Check reservation status and vehicle handover details on AIRGOCABS Indore.',
    });

    if (initialRef) {
      const found = store.getBookingByReference(initialRef);
      setBooking(found || null);
      setHasSearched(true);
    } else {
      const all = store.getBookings();
      if (all.length > 0) setBooking(all[0]);
    }
  }, [initialRef]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = store.getBookingByReference(searchQuery.trim());
    setBooking(found || null);
    setHasSearched(true);
    setSearchParams({ ref: searchQuery.trim() });
  };

  const handleCopy = () => {
    if (booking) {
      navigator.clipboard.writeText(booking.bookingReference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 sm:px-10 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            Reservation Verification
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-[-0.03em] text-[#111318]">
            Booking Status & Receipt
          </h1>
          <p className="text-xs text-[#666666] max-w-md mx-auto">
            Enter your booking reference ID to inspect real-time vehicle allocation and print your travel voucher.
          </p>

          <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto pt-2">
            <input
              type="text"
              placeholder="e.g. AGC-26-8942A"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value.toUpperCase())}
              className="flex-1 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] px-3.5 py-2.5 text-xs text-[#171717] font-mono uppercase focus:outline-none focus:border-[#111318]"
            />
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              <span>Track</span>
            </button>
          </form>
        </div>

        {booking ? (
          <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-8 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b border-[#E7E7E5]">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#777777] block">Booking Reference</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-2xl font-mono font-bold text-[#111318]">{booking.bookingReference}</span>
                  <button onClick={handleCopy} className="p-1 text-[#777777] hover:text-[#111318]" title="Copy">
                    {copied ? <Check className="w-4 h-4 text-[#111318]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-xs font-mono font-semibold px-3 py-1 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[2px] text-[#111318]">
                {booking.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#777777] block">Vehicle</span>
                <p className="font-bold text-[#111318]">{booking.vehicleName}</p>
                <p className="text-[#666666]">{booking.vehicleCategory} • {booking.rentalType}</p>
                <p className="font-mono text-[#777777]">Duration: {booking.rentalDurationDays} Day(s)</p>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#777777] block">Customer</span>
                <p className="font-bold text-[#111318]">{booking.customerName}</p>
                <p className="font-mono text-[#666666]">{booking.customerPhone}</p>
                <p className="text-[#666666] truncate">{booking.customerEmail}</p>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] col-span-2 space-y-1">
                <span className="text-[10px] uppercase font-mono text-[#777777] block">Itinerary</span>
                <p className="text-[#111318]">Pickup: <strong>{booking.pickupLocation}</strong> on {booking.pickupDate} at {booking.pickupTime}</p>
                <p className="text-[#111318]">Return: <strong>{booking.dropoffLocation}</strong> on {booking.returnDate} at {booking.returnTime}</p>
              </div>
            </div>

            <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-2 text-xs">
              <div className="flex justify-between"><span>Rental Fare:</span><span className="font-mono">{formatINR(booking.baseAmount)}</span></div>
              <div className="flex justify-between font-bold text-sm text-[#111318] pt-2 border-t border-[#E7E7E5]">
                <span>Total Payable:</span>
                <span className="font-mono">{formatINR(booking.totalEstimatedAmount)}</span>
              </div>
              {booking.securityDeposit > 0 && (
                <div className="flex justify-between text-[11px] text-[#777777] pt-1">
                  <span>Refundable Deposit (At Handover):</span>
                  <span className="font-mono">{formatINR(booking.securityDeposit)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <a
                href={buildBookingWhatsAppUrl(booking)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => window.print()}
                className="btn-secondary w-full sm:w-auto text-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        ) : hasSearched ? (
          <div className="p-12 text-center bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <AlertCircle className="w-8 h-8 text-[#999999] mx-auto" />
            <h3 className="text-base font-bold text-[#111318]">No reservation found for "{searchQuery}"</h3>
            <p className="text-xs text-[#777777]">Please check your reference number or contact our Indore desk.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
