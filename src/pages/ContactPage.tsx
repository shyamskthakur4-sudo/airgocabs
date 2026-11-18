import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_SETTINGS } from '../data/settings';
import { buildGeneralWhatsAppUrl } from '../lib/whatsapp';
import { updateMetaTags } from '../lib/seo';

export const ContactPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Self-Drive Car Rental');
  const [message, setMessage] = useState('');

  useEffect(() => {
    updateMetaTags({
      title: 'Contact Desk — Operations & Airport Bay | AIRGOCABS Indore',
      description: 'Contact AIRGOCABS Indore. 24/7 fleet support, Devi Ahilya Bai Holkar Airport desk, and WhatsApp booking assistance.',
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-32 sm:pt-40 pb-24 bg-[#F7F7F5] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <span className="text-[11px] font-display uppercase tracking-widest text-[#777777] font-semibold block">
            Operations & Concierge
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-[-0.035em] text-[#111318]">
            Contact AIRGOCABS
          </h1>
          <p className="text-sm text-[#666666] leading-relaxed">
            Our Indore operations desk is available 24/7 for immediate reservations, airport arrivals, corporate accounts, and route inquiries.
          </p>
        </div>

        {/* 2-Col Layout: Information on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-6 text-xs">
              <h3 className="font-display font-bold uppercase tracking-wider text-[#111318]">
                Direct Contacts
              </h3>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#777777] block font-semibold">24/7 Telephone</span>
                  <a href={`tel:${BUSINESS_SETTINGS.primaryPhone}`} className="text-sm font-bold text-[#111318] hover:text-[#286BFF]">
                    {BUSINESS_SETTINGS.primaryPhone}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-[#777777] block font-semibold">WhatsApp Concierge</span>
                  <a href={buildGeneralWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#111318] hover:text-[#286BFF]">
                    {BUSINESS_SETTINGS.primaryPhone}
                  </a>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-mono text-[#777777] block font-semibold">Email Reservations</span>
                  <a href={`mailto:${BUSINESS_SETTINGS.email}`} className="text-xs font-medium text-[#111318] hover:text-[#286BFF] break-all">
                    {BUSINESS_SETTINGS.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4 text-xs">
              <h3 className="font-display font-bold uppercase tracking-wider text-[#111318]">
                Handover Locations
              </h3>

              <div className="space-y-4 text-[#666666]">
                <div>
                  <span className="font-bold text-[#111318] block">Indore Airport Terminal Hub</span>
                  <p className="mt-0.5">{BUSINESS_SETTINGS.addressAirportHub}</p>
                </div>

                <div>
                  <span className="font-bold text-[#111318] block">Corporate Commercial Office</span>
                  <p className="mt-0.5">{BUSINESS_SETTINGS.addressMain}</p>
                </div>

                <div className="pt-2 border-t border-[#E7E7E5] text-[#777777]">
                  Hours: {BUSINESS_SETTINGS.supportHours}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#777777] font-semibold">
                  Inquiry Form
                </span>
                <h3 className="text-2xl font-display font-bold text-[#111318]">
                  Send a Message
                </h3>
                <p className="text-xs text-[#666666]">
                  For corporate contracts, wedding fleet coordination, or outstation itineraries.
                </p>
              </div>

              {formSubmitted ? (
                <div className="p-8 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#111318] mx-auto" />
                  <h4 className="text-base font-bold text-[#111318]">Message Received</h4>
                  <p className="text-xs text-[#666666] max-w-sm mx-auto">
                    Thank you, <strong className="text-[#111318]">{name}</strong>. Our fleet coordinator has received your enquiry and will respond promptly via phone or WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase text-[#777777]">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Rathi"
                        className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase text-[#777777]">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 83492 50049"
                        className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase text-[#777777]">Email *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="anand@company.com"
                        className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-semibold uppercase text-[#777777]">Service Required</label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                      >
                        <option value="Self-Drive Car Rental">Self-Drive Car Rental</option>
                        <option value="Chauffeur-Driven Car">Chauffeur-Driven Car</option>
                        <option value="Airport Pickup / Drop">Indore Airport Transfer (IDR)</option>
                        <option value="Corporate Fleet Account">Corporate Fleet Account</option>
                        <option value="Ujjain / Pilgrimage Tour">Ujjain / Omkareshwar Tour</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold uppercase text-[#777777]">Message / Itinerary Details *</label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share your travel dates, preferred vehicle category, pickup location, or any specific requests..."
                      className="w-full bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] p-2.5 text-[#171717] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    <span>Submit Enquiry</span>
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="p-6 bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#111318]">Indore Municipal & Airport Service Zone</span>
            <span className="font-mono text-[#777777]">Devi Ahilya Bai Holkar Airport (IDR)</span>
          </div>

          <div className="relative h-72 sm:h-96 rounded-[4px] overflow-hidden border border-[#E7E7E5] bg-[#EFEFEA]">
            <iframe
              title="Indore Airport and City Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117763.56860086877!2d75.76011707297926!3d22.72412720892243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </div>
  );
};
