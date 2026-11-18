import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Car } from 'lucide-react';
import { updateMetaTags } from '../lib/seo';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Page Not Found (404) | AIRGOCABS Indore',
      description: 'The requested page could not be located on AIRGOCABS Indore.',
    });
  }, []);

  return (
    <div className="pt-36 pb-24 bg-[#F7F7F5] min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#286BFF]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#777777]">
            Error 404
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-6xl font-light text-[#171717] tracking-tight">
            Off the Route
          </h1>
          <p className="text-sm text-[#777777] leading-relaxed">
            The page or vehicle destination you are seeking does not exist or has been relocated within the Indore fleet directory.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#111318] hover:bg-[#22252c] text-white font-medium text-xs uppercase tracking-wider transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/fleet"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-white hover:bg-[#F0F0ED] border border-[#E7E7E5] text-[#171717] font-medium text-xs uppercase tracking-wider transition-colors"
          >
            <Car className="w-4 h-4" />
            <span>Browse Indore Fleet</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
