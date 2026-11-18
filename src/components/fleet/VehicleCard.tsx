import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle, PackageDuration } from '../../types';
import { formatINR } from '../../lib/utils';
import { ArrowRight } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onOpenDetails?: (vehicle: Vehicle) => void;
  selectedRentalType?: 'Self-Drive' | 'Chauffeur';
  selectedPackage?: PackageDuration;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onOpenDetails,
  selectedRentalType = 'Self-Drive',
  selectedPackage = '24h',
}) => {
  const isChauffeur = selectedRentalType === 'Chauffeur';

  const price24h = isChauffeur ? vehicle.price24h + (vehicle.driverFee24h || 1499) : vehicle.price24h;
  const price12h = isChauffeur ? vehicle.price12h + (vehicle.driverFee12h || 899) : vehicle.price12h;

  const activePrice = selectedPackage === '12h' ? price12h : price24h;
  const extraKmRate = isChauffeur ? (vehicle.extraKmRateWithDriver || 8) : (vehicle.extraKmRate || 6);
  const activeRange = selectedPackage === '12h' ? (vehicle.kmLimit12h || 150) : (vehicle.kmLimit24h || 250);

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E7E5] rounded-[4px] overflow-hidden flex flex-col justify-between hover:border-[#111318] transition-colors duration-200">
      {/* Real Large Vehicle Photograph */}
      <div className="relative h-56 sm:h-60 overflow-hidden bg-[#F7F7F5] border-b border-[#E7E7E5]">
        <img
          src={vehicle.image}
          alt={`${vehicle.name} rental in Indore`}
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />

        {/* Top Minimal Category & Status Tags */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
          <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 bg-[#FFFFFF]/95 backdrop-blur-sm border border-[#E7E7E5] text-[#111318] font-medium">
            {vehicle.category}
          </span>

          <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] ${
            vehicle.isAvailable
              ? 'bg-[#FFFFFF]/95 text-[#111318] border border-[#E7E7E5]'
              : 'bg-[#F7F7F5] text-[#777777] border border-[#E7E7E5]'
          }`}>
            {vehicle.isAvailable ? 'Available' : 'On Road'}
          </span>
        </div>
      </div>

      {/* Editorial Information Block */}
      <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block">
                {vehicle.brand}
              </span>
              <h3 className="text-lg font-display font-bold text-[#111318] tracking-tight mt-0.5">
                {vehicle.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-lg font-display font-extrabold text-[#111318] font-mono tracking-tight">
                {formatINR(activePrice)}
              </span>
              <span className="text-[10px] text-[#777777] block font-mono">
                / {selectedPackage === '12h' ? '12 hrs' : '24 hrs'}
              </span>
            </div>
          </div>

          {/* 24H & 12H Transparent Rate & Range Strip */}
          <div className="grid grid-cols-2 gap-2 mt-4 p-2.5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] text-[11px]">
            <div className={`${selectedPackage === '24h' ? 'text-[#111318]' : 'text-[#777777]'}`}>
              <span className="block font-mono uppercase text-[9px] tracking-wider text-[#777777]">
                24H • {vehicle.kmLimit24h || 250} KM
              </span>
              <span className="font-mono font-bold text-xs text-[#111318]">
                {formatINR(price24h)}
              </span>
            </div>
            <div className={`border-l border-[#E7E7E5] pl-2.5 ${selectedPackage === '12h' ? 'text-[#111318]' : 'text-[#777777]'}`}>
              <span className="block font-mono uppercase text-[9px] tracking-wider text-[#777777]">
                12H • {vehicle.kmLimit12h || 150} KM
              </span>
              <span className="font-mono font-bold text-xs text-[#111318]">
                {formatINR(price12h)}
              </span>
            </div>
          </div>

          {/* Minimal Specs Divider */}
          <div className="grid grid-cols-3 gap-2 pt-3 pb-2.5 border-b border-[#E7E7E5] text-[11px] text-[#555555]">
            <div>
              <span className="text-[#999999] block text-[9px] uppercase font-mono">Seats</span>
              <span className="font-medium text-[#111318]">{vehicle.seats} Seater</span>
            </div>
            <div>
              <span className="text-[#999999] block text-[9px] uppercase font-mono">Gearbox</span>
              <span className="font-medium text-[#111318]">{vehicle.transmission}</span>
            </div>
            <div>
              <span className="text-[#999999] block text-[9px] uppercase font-mono">Fuel</span>
              <span className="font-medium text-[#111318]">{vehicle.fuelType}</span>
            </div>
          </div>

          <div className="pt-2.5 text-[11px] text-[#777777] flex items-center justify-between font-mono">
            <span>Range: {activeRange} KM</span>
            <span>Extra: ₹{extraKmRate}/km</span>
          </div>
        </div>

        {/* Sophisticated Rectangular Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E7E7E5]">
          <button
            type="button"
            onClick={() => onOpenDetails?.(vehicle)}
            className="w-full py-2.5 px-3 text-xs font-medium text-[#171717] bg-[#FFFFFF] hover:bg-[#F7F7F5] border border-[#E7E7E5] rounded-[4px] transition-colors text-center"
          >
            Specifications
          </button>

          <Link
            to={`/book?vehicle=${vehicle.id}&type=${selectedRentalType}&pkg=${selectedPackage}`}
            className="w-full py-2.5 px-3 text-xs font-medium text-[#FFFFFF] bg-[#111318] hover:bg-[#262626] rounded-[4px] transition-colors text-center flex items-center justify-center gap-1.5"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </Link>
        </div>
      </div>
    </div>
  );
};
