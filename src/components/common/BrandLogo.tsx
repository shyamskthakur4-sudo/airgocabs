import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  variant?: 'dark' | 'light' | 'mark';
  linkToHome?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  imgClassName = 'h-7 sm:h-8 w-auto',
  variant = 'dark',
  linkToHome = true,
}) => {
  // Use exact extracted asset from the user's uploaded official branding document
  const src = variant === 'light' ? '/logo-white.png' : variant === 'mark' ? '/logo-mark.png' : '/logo.png';

  const logoContent = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <img
        src={src}
        alt="AIRGOCABS"
        className={`${imgClassName} object-contain transition-opacity duration-200`}
        loading="eager"
      />
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-1 focus-visible:ring-ink"
        aria-label="AIRGOCABS Home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};
