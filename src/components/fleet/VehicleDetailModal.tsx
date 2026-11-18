import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Check, ArrowRight } from 'lucide-react';
import { Vehicle, PackageDuration } from '../../types';
import { formatINR } from '../../lib/utils';
import { buildVehicleWhatsAppUrl } from '../../lib/whatsapp';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  selectedRentalType?: 'Self-Drive' | 'Chauffeur';
  selectedPackage?: PackageDuration;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  selectedRentalType = 'Self-Drive',
  selectedPackage = '24h',
}) => {
  const [activeTab, setActiveTab] = useState<'specs' | 'policies'>('specs');
  const [activePkg, setActivePkg] = useState<PackageDuration>(selectedPackage);

  if (!vehicle) return null;

  const isChauffeur = selectedRentalType === 'Chauffeur';
  const price24h = isChauffeur ? vehicle.price24h + (vehicle.driverFee24h || 1499) : vehicle.price24h;
  const price12h = isChauffeur ? vehicle.price12h + (vehicle.driverFee12h || 899) : vehicle.price12h;
  const currentPrice = activePkg === '12h' ? price12h : price24h;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#111318]/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#E7E7E5] rounded-[6px] shadow-lift overflow-hidden my-8 max-h-[90vh] flex flex-col text-left">
        {/* Top Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E7E7E5] bg-[#F7F7F5]">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#777777] block">
              {vehicle.category} • {vehicle.brand}
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[#111318] mt-0.5">
              {vehicle.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#777777] hover:text-[#111318] transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Main Photo */}
          <div className="relative h-60 sm:h-68 rounded-[4px] overflow-hidden border border-[#E7E7E5] bg-[#F7F7F5]">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-[#FFFFFF]/95 backdrop-blur-sm px-3 py-1 rounded-[2px] border border-[#E7E7E5] text-[10px] font-mono text-[#111318]">
              {vehicle.mileage} • {vehicle.fuelType}
            </div>
          </div>

          {/* 24H vs 12H Package Selector */}
          <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-3">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#777777] font-semibold block">
              Select Package Duration
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setActivePkg('24h')}
                className={`p-3.5 text-left rounded-[4px] border transition-all ${
                  activePkg === '24h'
                    ? 'bg-[#111318] text-white border-[#111318]'
                    : 'bg-white text-[#171717] border-[#E7E7E5] hover:border-[#111318]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">24 Hours Package</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-white/10">
                    250 KM Included
                  </span>
                </div>
                <div className="text-base font-mono font-bold mt-1.5">
                  {formatINR(price24h)}
                </div>
                <span className={`text-[10px] block mt-1 ${activePkg === '24h' ? 'text-white/70' : 'text-[#777777]'}`}>
                  Extra KM: ₹{isChauffeur ? 8 : 6}/km
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActivePkg('12h')}
                className={`p-3.5 text-left rounded-[4px] border transition-all ${
                  activePkg === '12h'
                    ? 'bg-[#111318] text-white border-[#111318]'
                    : 'bg-white text-[#171717] border-[#E7E7E5] hover:border-[#111318]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider">12 Hours Package</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-[2px] bg-white/10">
                    150 KM Included
                  </span>
                </div>
                <div className="text-base font-mono font-bold mt-1.5">
                  {formatINR(price12h)}
                </div>
                <span className={`text-[10px] block mt-1 ${activePkg === '12h' ? 'text-white/70' : 'text-[#777777]'}`}>
                  Extra KM: ₹{isChauffeur ? 8 : 6}/km
                </span>
              </button>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#E7E7E5]">
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-[#111318] text-[#111318] font-bold'
                  : 'border-transparent text-[#777777] hover:text-[#111318]'
              }`}
            >
              Vehicle Specifications & Equipment
            </button>
            <button
              onClick={() => setActiveTab('policies')}
              className={`pb-3 px-4 text-xs font-medium border-b-2 transition-all ${
                activeTab === 'policies'
                  ? 'border-[#111318] text-[#111318] font-bold'
                  : 'border-transparent text-[#777777] hover:text-[#111318]'
              }`}
            >
              Rates & Rental Terms
            </button>
          </div>

          {activeTab === 'specs' ? (
            <div className="space-y-6 text-xs">
              {/* 4-col specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px]">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Seating</span>
                  <p className="font-bold text-[#111318] mt-1">{vehicle.seats} Seats</p>
                </div>
                <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px]">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Gearbox</span>
                  <p className="font-bold text-[#111318] mt-1">{vehicle.transmission}</p>
                </div>
                <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px]">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Fuel Type</span>
                  <p className="font-bold text-[#111318] mt-1">{vehicle.fuelType}</p>
                </div>
                <div className="p-3.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px]">
                  <span className="text-[10px] uppercase font-mono text-[#777777] block">Luggage</span>
                  <p className="font-bold text-[#111318] mt-1">{vehicle.luggage} Bags</p>
                </div>
              </div>

              {/* Equipment list */}
              <div className="space-y-3">
                <h4 className="text-[11px] uppercase font-mono text-[#777777] font-semibold">
                  Standard Equipment
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {vehicle.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-[#171717]">
                      <Check className="w-3.5 h-3.5 text-[#111318] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 p-2.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-[#171717]">
                    <Check className="w-3.5 h-3.5 text-[#111318] shrink-0" />
                    <span>Electronic Fastag Active</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs text-[#555555]">
              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <h4 className="font-bold text-[#111318]">Range & Extra Kilometers</h4>
                <p>
                  24 Hours package includes <strong>250 KM</strong> range. 12 Hours package includes <strong>150 KM</strong> range. Extra kilometers are billed at transparent rates: <strong>₹6/km</strong> for self-drive, <strong>₹8/km</strong> with chauffeur.
                </p>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <h4 className="font-bold text-[#111318]">With Driver (Chauffeur) Service</h4>
                <p>
                  Professional uniformed chauffeur available for 24 Hours (+₹1,499) or 12 Hours (+₹899).
                </p>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <h4 className="font-bold text-[#111318]">Security Deposit</h4>
                <p>
                  Security deposit for {vehicle.name} is {formatINR(vehicle.securityDeposit)}. Refunded within 24 to 48 hours following vehicle return inspection.
                </p>
              </div>

              <div className="p-4 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] space-y-1">
                <h4 className="font-bold text-[#111318]">Airport Handover</h4>
                <p>
                  Terminal 1 Bay 4 vehicle delivery available 24/7 at Devi Ahilya Bai Holkar Airport, Indore.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-6 border-t border-[#E7E7E5] bg-[#F7F7F5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-mono text-[#777777] block">
              {selectedRentalType} • {activePkg === '12h' ? '12 Hours (150 KM)' : '24 Hours (250 KM)'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-display font-extrabold text-[#111318] font-mono">
                {formatINR(currentPrice)}
              </span>
              <span className="text-xs text-[#777777]">/ {activePkg === '12h' ? '12 hrs' : '24 hrs'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={buildVehicleWhatsAppUrl(vehicle, selectedRentalType)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-xs"
            >
              WhatsApp
            </a>

            <Link
              to={`/book?vehicle=${vehicle.id}&type=${selectedRentalType}&pkg=${activePkg}`}
              onClick={onClose}
              className="btn-primary text-xs"
            >
              <span>Book This Vehicle</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
