import React from 'react';
import { Link } from 'react-router-dom';

export const PreFooterLinks: React.FC = () => {
  return (
    <section className="bg-[#0D0F12] text-[#A3A8B2] py-14 border-t border-[#1F2228] text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-10">
        <div className="space-y-2 border-b border-[#1F2228] pb-6">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#286BFF] font-semibold block">
            AirGo Cabs • Central India Highway Network
          </span>
          <h3 className="font-display font-bold text-base sm:text-lg text-[#FFFFFF]">
            Popular Outstation Cabs & Airport Taxi Routes
          </h3>
          <p className="text-xs text-[#7A808C] leading-relaxed max-w-3xl">
            Book certified one-way taxis, round-trip cabs, and 24/7 airport transfers with AirGo Cabs across Madhya Pradesh and neighboring states. Clean AC cars, transparent fares, and on-time pickup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: High-Volume Outstation Routes */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
              Popular Outstation Routes
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/cabs/indore-to-ujjain" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Indore to Ujjain Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹1,499</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/ujjain-to-indore" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Ujjain to Indore Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹1,499</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/indore-to-bhopal" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Indore to Bhopal Taxi</span>
                  <span className="font-mono text-[#666666]">@ ₹2,799</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/bhopal-to-indore" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Bhopal to Indore Taxi</span>
                  <span className="font-mono text-[#666666]">@ ₹2,799</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/indore-to-omkareshwar" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Indore to Omkareshwar Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹2,199</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/omkareshwar-to-indore" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Omkareshwar to Indore Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹2,199</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Heritage & Tourism Circuits */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
              Malwa Heritage Circuits
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/cabs/indore-to-mandav" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Indore to Mandav (Mandu) Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹2,499</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/mandav-to-indore" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Mandav to Indore Cab</span>
                  <span className="font-mono text-[#666666]">@ ₹2,499</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/indore-to-maheshwar" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Indore to Maheshwar Taxi</span>
                  <span className="font-mono text-[#666666]">@ ₹2,399</span>
                </Link>
              </li>
              <li>
                <Link to="/cabs/maheshwar-to-indore" className="hover:text-[#FFFFFF] transition-colors flex items-center justify-between">
                  <span>Maheshwar to Indore Taxi</span>
                  <span className="font-mono text-[#666666]">@ ₹2,399</span>
                </Link>
              </li>
              <li>
                <Link to="/with-driver" className="hover:text-[#FFFFFF] transition-colors">
                  <span>Do Jyotirlinga (Ujjain + Omkareshwar) Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/with-driver" className="hover:text-[#FFFFFF] transition-colors">
                  <span>Mandu & Maheshwar Weekend Package</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Airport Taxi Cities */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
              Top Airport Taxi Connections
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/cabs/indore-to-ujjain" className="hover:text-[#FFFFFF] transition-colors">
                  Indore Airport to Ujjain Mahakal Drop
                </Link>
              </li>
              <li>
                <Link to="/cabs/indore-to-bhopal" className="hover:text-[#FFFFFF] transition-colors">
                  Indore Airport to Bhopal City Direct Taxi
                </Link>
              </li>
              <li>
                <Link to="/cabs/indore-to-omkareshwar" className="hover:text-[#FFFFFF] transition-colors">
                  Indore Airport to Omkareshwar Temple
                </Link>
              </li>
              <li>
                <Link to="/airport-transfer" className="hover:text-[#FFFFFF] transition-colors">
                  Indore Airport (IDR) to Pithampur SEZ
                </Link>
              </li>
              <li>
                <Link to="/airport-transfer" className="hover:text-[#FFFFFF] transition-colors">
                  Devi Ahilya Bai Holkar T1 Bay 4 Pickup
                </Link>
              </li>
              <li>
                <Link to="/airport-transfer" className="hover:text-[#FFFFFF] transition-colors">
                  Indore Airport to Vijay Nagar & Super Corridor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Cab Services & Fleet Types */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#FFFFFF]">
              Cab Classes & Car Rental
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <Link to="/fleet?category=Hatchback" className="hover:text-[#FFFFFF] transition-colors">
                  Hatchback Cabs (WagonR, Swift, Glanza)
                </Link>
              </li>
              <li>
                <Link to="/fleet?category=Sedan" className="hover:text-[#FFFFFF] transition-colors">
                  Sedan Taxis (Dzire, Etios, Aura)
                </Link>
              </li>
              <li>
                <Link to="/fleet?category=SUV" className="hover:text-[#FFFFFF] transition-colors">
                  SUV Cabs (Ertiga, Carens, Scorpio, XL6)
                </Link>
              </li>
              <li>
                <Link to="/self-drive" className="hover:text-[#FFFFFF] transition-colors">
                  Self-Drive Car Rental Indore (12H / 24H)
                </Link>
              </li>
              <li>
                <Link to="/with-driver" className="hover:text-[#FFFFFF] transition-colors">
                  Chauffeur-Driven Car Rental Indore
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[#286BFF] transition-colors text-white font-medium">
                  Instant Online Cab Reservation &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
