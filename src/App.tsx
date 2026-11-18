import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PreFooterLinks } from './components/layout/PreFooterLinks';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { ScrollToTop } from './components/common/ScrollToTop';

// Lazy loaded page components for optimal Core Web Vitals & minimal bundle size
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const FleetPage = lazy(() => import('./pages/FleetPage').then(m => ({ default: m.FleetPage })));
const SelfDrivePage = lazy(() => import('./pages/SelfDrivePage').then(m => ({ default: m.SelfDrivePage })));
const ChauffeurPage = lazy(() => import('./pages/ChauffeurPage').then(m => ({ default: m.ChauffeurPage })));
const AirportTransferPage = lazy(() => import('./pages/AirportTransferPage').then(m => ({ default: m.AirportTransferPage })));
const RoutePage = lazy(() => import('./pages/RoutePage').then(m => ({ default: m.RoutePage })));
const BookingPage = lazy(() => import('./pages/BookingPage').then(m => ({ default: m.BookingPage })));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage').then(m => ({ default: m.BookingConfirmationPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const CancellationPage = lazy(() => import('./pages/CancellationPage').then(m => ({ default: m.CancellationPage })));
const AdminPage = lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Subtle Luxury Loading Spinner
const RouteLoader = () => (
  <div className="min-h-screen bg-obsidian flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
      <span className="text-xs uppercase font-mono tracking-widest text-platinum-muted">AIRGOCABS</span>
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-obsidian text-platinum antialiased selection:bg-brand-500 selection:text-obsidian">
        <Navbar />

        <main className="flex-grow">
          <Suspense fallback={<RouteLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/self-drive" element={<SelfDrivePage />} />
              <Route path="/with-driver" element={<ChauffeurPage />} />
              <Route path="/airport-transfer" element={<AirportTransferPage />} />
              <Route path="/cabs/:routeSlug" element={<RoutePage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/cancellation" element={<CancellationPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>

        <PreFooterLinks />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
};

export default App;
