import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS_SETTINGS } from '../../data/settings';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111318] text-[#F7F7F5] pt-20 pb-12 border-t border-[#262626]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-[#262626]">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/logo-white.png"
                alt="AIRGOCABS"
                className="h-9 w-auto object-contain"
              />
              <span className="font-display font-bold text-xl tracking-wider text-white">
                AIRGO<span className="text-[#286BFF]">CABS</span>
              </span>
            </div>

            <p className="text-xs text-[#999999] leading-relaxed max-w-sm font-normal">
              AIRGOCABS is a premium mobility service operating in Indore, Madhya Pradesh. Providing curated self-drive car rentals and executive chauffeur services with dedicated terminal handover at Devi Ahilya Bai Holkar Airport.
            </p>

            <div className="pt-2 text-xs text-[#777777] space-y-1">
              <div>Devi Ahilya Bai Holkar Airport (IDR) Terminal Hub</div>
              <div>Vijay Nagar Commercial Centre • Super Corridor</div>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#B8C0CC] font-bold">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#999999]">
              <li>
                <Link to="/self-drive" className="hover:text-white transition-colors">
                  Self-Drive Rentals
                </Link>
              </li>
              <li>
                <Link to="/with-driver" className="hover:text-white transition-colors">
                  Chauffeur Service
                </Link>
              </li>
              <li>
                <Link to="/airport-transfer" className="hover:text-white transition-colors">
                  Airport Handover (IDR)
                </Link>
              </li>
              <li>
                <Link to="/with-driver" className="hover:text-white transition-colors">
                  Outstation (Ujjain & Omkareshwar)
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-white transition-colors text-white font-medium">
                  Reserve Online
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Fleet Categories */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#B8C0CC] font-bold">
              Fleet Tiers
            </h4>
            <ul className="space-y-2.5 text-xs text-[#999999]">
              <li>
                <Link to="/fleet?category=Hatchback" className="hover:text-white transition-colors">
                  01 — Hatchback
                </Link>
              </li>
              <li>
                <Link to="/fleet?category=Sedan" className="hover:text-white transition-colors">
                  02 — Sedan
                </Link>
              </li>
              <li>
                <Link to="/fleet?category=SUV" className="hover:text-white transition-colors">
                  03 — SUV / XUV
                </Link>
              </li>
              <li>
                <Link to="/fleet?category=Premium" className="hover:text-white transition-colors">
                  04 — Premium Class
                </Link>
              </li>
              <li>
                <Link to="/fleet" className="hover:text-white transition-colors">
                  Full Catalog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="space-y-4">
            <h4 className="font-display text-xs uppercase tracking-widest text-[#B8C0CC] font-bold">
              Indore Desk
            </h4>
            <ul className="space-y-3 text-xs text-[#999999]">
              <li>
                <span className="block text-[#777777] text-[10px] uppercase font-semibold">24/7 Hotline</span>
                <a href={`tel:${BUSINESS_SETTINGS.primaryPhone}`} className="text-white hover:text-[#286BFF] transition-colors font-medium">
                  {BUSINESS_SETTINGS.primaryPhone}
                </a>
              </li>
              <li>
                <span className="block text-[#777777] text-[10px] uppercase font-semibold">WhatsApp Concierge</span>
                <a href={`https://wa.me/${BUSINESS_SETTINGS.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#286BFF] transition-colors">
                  +91 {BUSINESS_SETTINGS.whatsappNumber.slice(2)}
                </a>
              </li>
              <li>
                <span className="block text-[#777777] text-[10px] uppercase font-semibold">Reservations</span>
                <a href={`mailto:${BUSINESS_SETTINGS.email}`} className="text-white hover:text-[#286BFF] transition-colors break-all">
                  {BUSINESS_SETTINGS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#777777] gap-4">
          <p>
            &copy; {currentYear} {BUSINESS_SETTINGS.brandName}. Indore, Madhya Pradesh, India.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cancellation" className="hover:text-white transition-colors">
              Cancellation Policy
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
