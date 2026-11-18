import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Fleet', path: '/fleet' },
    { name: 'Self Drive', path: '/self-drive' },
    { name: 'With Driver', path: '/with-driver' },
    { name: 'Airport Transfers', path: '/airport-transfer' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled && !isMobileMenuOpen ? 'pt-2.5 sm:pt-3.5 px-3 sm:px-6' : 'pt-0 px-0'
        }`}
      >
        <div
          className={`pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled && !isMobileMenuOpen
              ? 'max-w-6xl rounded-2xl bg-[#FFFFFF]/70 backdrop-blur-xl backdrop-saturate-150 border border-white/70 ring-1 ring-[#111318]/[0.07] shadow-[0_12px_36px_-12px_rgba(17,19,24,0.18)] py-2.5 sm:py-3 px-4 sm:px-7'
              : 'max-w-full rounded-none bg-[#F7F7F5]/90 backdrop-blur-sm border-b border-[#E7E7E5] py-3.5 px-4 sm:px-8 lg:px-12'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Left: Original AIRGOCABS logo */}
            <div className="flex-shrink-0">
              <BrandLogo imgClassName="h-6 sm:h-7 w-auto" />
            </div>

            {/* Center: Minimal Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[13px] tracking-tight transition-colors duration-200 ${
                    isActive(link.path)
                      ? 'text-[#111318] font-semibold'
                      : 'text-[#666666] hover:text-[#111318] font-normal'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right: Contact & Book a Car */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link
                to="/contact"
                className="text-[13px] text-[#666666] hover:text-[#111318] font-normal transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/book"
                className={`inline-flex items-center justify-center bg-[#111318] text-[#FFFFFF] hover:bg-[#262626] text-xs font-medium px-4 py-2.5 transition-all tracking-wide ${
                  isScrolled ? 'rounded-xl' : 'rounded-[4px]'
                }`}
              >
                <span>Book a Car</span>
              </Link>
            </div>

            {/* Mobile Actions: Compact Book Button & Hamburger Toggle */}
            <div className="flex items-center space-x-2 lg:hidden">
              <Link
                to="/book"
                className={`inline-flex items-center justify-center bg-[#111318] text-[#FFFFFF] text-xs font-medium px-3.5 py-1.5 transition-all ${
                  isScrolled && !isMobileMenuOpen ? 'rounded-lg' : 'rounded-[4px]'
                }`}
              >
                Book
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 text-[#171717] focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F7F7F5] lg:hidden flex flex-col pt-20 pb-8 px-6 overflow-y-auto">
          <div className="flex flex-col space-y-1 divide-y divide-[#E7E7E5]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-4 text-base font-display flex items-center justify-between ${
                  isActive(link.path)
                    ? 'text-[#111318] font-bold'
                    : 'text-[#555555]'
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-[#999999]" />
              </Link>
            ))}
            <Link
              to="/contact"
              className="py-4 text-base font-display text-[#555555] flex items-center justify-between"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4 text-[#999999]" />
            </Link>
            <Link
              to="/about"
              className="py-4 text-base font-display text-[#555555] flex items-center justify-between"
            >
              <span>About Us</span>
              <ArrowUpRight className="w-4 h-4 text-[#999999]" />
            </Link>
            <Link
              to="/faq"
              className="py-4 text-base font-display text-[#555555] flex items-center justify-between"
            >
              <span>Frequently Asked Questions</span>
              <ArrowUpRight className="w-4 h-4 text-[#999999]" />
            </Link>
            <Link
              to="/admin"
              className="py-4 text-xs font-mono text-[#999999] flex items-center justify-between pt-6"
            >
              <span>Admin Access</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#999999]" />
            </Link>
          </div>

          <div className="mt-auto pt-8 space-y-4">
            <Link
              to="/book"
              className="w-full flex items-center justify-center bg-[#111318] text-[#FFFFFF] text-sm font-medium py-3.5 rounded-[4px]"
            >
              Book Your Ride
            </Link>
            <p className="text-[11px] text-center text-[#777777]">
              Indore Airport (IDR) • Self-Drive & Chauffeur Services
            </p>
          </div>
        </div>
      )}
    </>
  );
};
