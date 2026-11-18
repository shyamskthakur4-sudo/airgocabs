import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { OUTSTATION_ROUTES, getRouteSeoTitle, getRouteSeoDescription, OutstationRoute } from '../data/routes';
import { SeoHead } from '../components/common/SeoHead';
import { JsonLdSchema } from '../components/common/JsonLdSchema';
import { BookingWidget } from '../components/home/BookingWidget';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Car,
  Users,
  Briefcase,
  PhoneCall,
} from 'lucide-react';

export const RoutePage: React.FC = () => {
  const { routeSlug } = useParams<{ routeSlug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!routeSlug || !OUTSTATION_ROUTES[routeSlug]) {
    // If not found, fall back to general chauffeur page
    return <Navigate to="/with-driver" replace />;
  }

  const route: OutstationRoute = OUTSTATION_ROUTES[routeSlug];
  const reverseRoute = OUTSTATION_ROUTES[route.reverseRouteSlug];
  const nearbyRoutes = route.nearbyRouteSlugs
    .map(slug => OUTSTATION_ROUTES[slug])
    .filter(Boolean);

  const seoTitle = getRouteSeoTitle(route.origin, route.destination, route.startingFare);
  const seoDescription = getRouteSeoDescription(route.origin, route.destination);
  const canonicalUrl = `https://www.airgocabs.com/cabs/${route.slug}`;

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://www.airgocabs.com/',
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Outstation Cabs',
        'item': 'https://www.airgocabs.com/with-driver',
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': `${route.origin} to ${route.destination} Cab`,
        'item': canonicalUrl,
      },
    ],
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': `${route.origin} to ${route.destination} Cab Service`,
    'description': route.overview,
    'brand': {
      '@type': 'Brand',
      'name': 'AirGo Cabs',
    },
    'offers': {
      '@type': 'AggregateOffer',
      'priceCurrency': 'INR',
      'lowPrice': route.startingFare,
      'highPrice': route.maxFare,
      'offerCount': route.carOptions.length,
      'availability': 'https://schema.org/InStock',
      'url': canonicalUrl,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': route.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen text-[#111318]">
      {/* 1. Dynamic Head & Meta Tags */}
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/cabs/${route.slug}`}
        ogType="website"
      />

      {/* 2. Structured Data Injections */}
      <JsonLdSchema schema={[breadcrumbSchema, productSchema, faqSchema]} id={`json-ld-route-${route.slug}`} />

      {/* HERO SECTION */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-[#FFFFFF] border-b border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs font-mono text-[#777777] flex items-center gap-2">
            <Link to="/" className="hover:text-[#111318] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/with-driver" className="hover:text-[#111318] transition-colors">
              Outstation Cabs
            </Link>
            <span>/</span>
            <span className="text-[#111318] font-medium">
              {route.origin} to {route.destination}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Headline & Overview */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.16em] text-[#555862] font-semibold">
                <span className="w-5 h-[2px] bg-[#286BFF] inline-block" />
                <span>AirGo Cabs • Dedicated Outstation Highway Transit</span>
              </div>

              {/* Strict Semantic Single H1 */}
              <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-[-0.035em] text-[#111318] leading-[1.1]">
                {route.origin} to {route.destination} Cab Service
              </h1>

              <p className="text-sm sm:text-base text-[#555555] leading-relaxed max-w-2xl">
                {route.overview}
              </p>

              {/* Route Metric Badges */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-[#333333]">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5]">
                  <Compass className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>Distance: <strong>{route.distanceKm} KM</strong></span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5]">
                  <Clock className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>Est. Time: <strong>{route.duration}</strong></span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[4px] bg-[#F7F7F5] border border-[#E7E7E5]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#286BFF]" />
                  <span>Starting @ <strong>₹{route.startingFare.toLocaleString('en-IN')}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Call-out Card */}
            <div className="lg:col-span-5 bg-[#F7F7F5] border border-[#E7E7E5] rounded-[6px] p-5 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-[#777777] font-semibold">
                Express Highway Route
              </div>
              <div className="text-sm font-display font-bold text-[#111318]">
                {route.highway}
              </div>
              <p className="text-xs text-[#666666] leading-relaxed">
                Direct pickup from Devi Ahilya Bai Holkar Airport (IDR), Vijay Nagar, Super Corridor, or any residence in {route.origin}. Punctual chauffeur dispatch with live GPS tracking.
              </p>
              <div className="pt-2 border-t border-[#E7E7E5] flex items-center justify-between text-xs">
                <span className="text-[#666666]">24/7 Telephone Desk:</span>
                <a href="tel:+918349250049" className="font-mono font-bold text-[#111318] hover:text-[#286BFF] transition-colors">
                  +91 83492 50049
                </a>
              </div>
            </div>
          </div>

          {/* Integrated Interactive Booking Engine */}
          <div className="mt-8 pt-6 border-t border-[#E7E7E5]">
            <BookingWidget initialRentalType="Chauffeur" className="shadow-sm" />
          </div>
        </div>
      </section>

      {/* 2. FARE & CAR OPTIONS TABLE (ANTI-THIN CONTENT) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] font-semibold">
            Transparent Point-to-Point Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111318]">
            {route.origin} to {route.destination} Taxi Fare & Car Options
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Compare available air-conditioned vehicles for your {route.origin} to {route.destination} journey. Rates include vehicle rent, professional driver allowance, and fuel.
          </p>
        </div>

        {/* Semantic Comparison Table */}
        <div className="overflow-x-auto border border-[#E7E7E5] rounded-[6px] bg-[#FFFFFF] shadow-subtle">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#111318] text-[#FFFFFF] font-display uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 sm:px-6">Vehicle Class</th>
                <th className="py-3.5 px-4 sm:px-6">Popular Models</th>
                <th className="py-3.5 px-4 sm:px-6">Seating & Bags</th>
                <th className="py-3.5 px-4 sm:px-6">Rate / KM</th>
                <th className="py-3.5 px-4 sm:px-6">One-Way Fare</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Reserve</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E7E5]">
              {route.carOptions.map((opt, idx) => (
                <tr key={idx} className="hover:bg-[#F7F7F5] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-display font-bold text-[#111318]">
                    {opt.category}
                    {opt.ac && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 rounded-[2px] bg-[#286BFF]/10 text-[#286BFF] text-[10px] font-mono font-semibold">
                        AC
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#555555]">
                    {opt.models}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#555555] font-mono text-xs">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#777777]" />
                      <span>{opt.seating}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#777777] mt-0.5">
                      <Briefcase className="w-3 h-3 text-[#777777]" />
                      <span>{opt.luggageCapacity}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-mono font-semibold text-[#111318]">
                    ₹{opt.perKmRate}/km
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-display font-extrabold text-[#111318] text-base">
                    ₹{opt.startingFare.toLocaleString('en-IN')}
                    <span className="block text-[10px] font-mono font-normal text-[#777777]">
                      *Tolls/Parking extra
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <Link
                      to={`/book?type=Chauffeur&pickup=${route.origin.toLowerCase()}&dropoff=${route.destination.toLowerCase()}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111318] hover:bg-[#286BFF] text-[#FFFFFF] rounded-[4px] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. DISTANCE, TRAVEL TIME & ROUTE SPECIFICATION */}
      <section className="py-16 sm:py-20 bg-[#FFFFFF] border-y border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] font-semibold">
              Highway Navigation Guide
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111318]">
              Distance, Travel Time & Best Route from {route.origin} to {route.destination}
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Detailed travel insights for your journey between {route.origin} and {route.destination}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-[6px] border border-[#E7E7E5] bg-[#F7F7F5] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
                Total Highway Distance
              </span>
              <div className="text-2xl font-display font-extrabold text-[#111318]">
                {route.distanceKm} Kilometers
              </div>
              <p className="text-xs text-[#666666]">
                Fastest motorable route with multi-lane divided carriageway.
              </p>
            </div>

            <div className="p-5 rounded-[6px] border border-[#E7E7E5] bg-[#F7F7F5] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
                Estimated Driving Time
              </span>
              <div className="text-2xl font-display font-extrabold text-[#111318]">
                {route.duration}
              </div>
              <p className="text-xs text-[#666666]">
                Average transit time under standard highway traffic conditions.
              </p>
            </div>

            <div className="p-5 rounded-[6px] border border-[#E7E7E5] bg-[#F7F7F5] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
                Recommended Highway
              </span>
              <div className="text-lg font-display font-bold text-[#111318] leading-tight">
                {route.highway}
              </div>
              <p className="text-xs text-[#666666]">
                Paved arterial road equipped with FASTag-enabled toll lanes.
              </p>
            </div>

            <div className="p-5 rounded-[6px] border border-[#E7E7E5] bg-[#F7F7F5] space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] font-semibold block">
                Best Departure Window
              </span>
              <div className="text-sm font-display font-bold text-[#111318] leading-snug">
                {route.bestTravelTime}
              </div>
              <p className="text-xs text-[#666666]">
                Avoids city bottleneck traffic during peak transit hours.
              </p>
            </div>
          </div>

          {/* Top Stopovers */}
          <div className="p-6 rounded-[6px] border border-[#E7E7E5] bg-[#F7F7F5] space-y-4">
            <h3 className="text-base font-display font-bold text-[#111318] flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#286BFF]" />
              <span>Key Stopovers & Attractions Along {route.origin} to {route.destination}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {route.topStopovers.map((stop, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-[#333333] font-medium bg-[#FFFFFF] p-3 rounded-[4px] border border-[#E7E7E5]">
                  <span className="w-5 h-5 rounded-full bg-[#111318] text-white flex items-center justify-center font-mono text-[10px] shrink-0">
                    {i + 1}
                  </span>
                  <span>{stop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE AIRGO CABS */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        <div className="max-w-3xl space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#777777] font-semibold">
            Quality Assurance
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111318]">
            Why Choose AirGo Cabs for {route.origin} to {route.destination} Car Rental?
          </h2>
          <p className="text-xs sm:text-sm text-[#666666]">
            Every journey with AirGo Cabs is backed by our four pillars of premium road mobility:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-[6px] border border-[#E7E7E5] bg-[#FFFFFF] space-y-3">
            <div className="w-10 h-10 rounded-[4px] bg-[#111318] text-white flex items-center justify-center font-bold">
              ₹0
            </div>
            <h3 className="font-display font-bold text-sm text-[#111318]">
              Zero Hidden Charges
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Transparent point-to-point one-way rates with zero return fare penalties or surprise driver food surcharges.
            </p>
          </div>

          <div className="p-6 rounded-[6px] border border-[#E7E7E5] bg-[#FFFFFF] space-y-3">
            <div className="w-10 h-10 rounded-[4px] bg-[#111318] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-sm text-[#111318]">
              Verified Highway Chauffeurs
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Commercially licensed, police-verified drivers trained specifically for safety and courtesy on MP expressways.
            </p>
          </div>

          <div className="p-6 rounded-[6px] border border-[#E7E7E5] bg-[#FFFFFF] space-y-3">
            <div className="w-10 h-10 rounded-[4px] bg-[#111318] text-white flex items-center justify-center font-bold">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-sm text-[#111318]">
              Punctual Doorstep Pickup
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Guaranteed on-time arrival at Indore Airport (Terminal 1 Bay 4), railway stations, hotels, and residences.
            </p>
          </div>

          <div className="p-6 rounded-[6px] border border-[#E7E7E5] bg-[#FFFFFF] space-y-3">
            <div className="w-10 h-10 rounded-[4px] bg-[#111318] text-white flex items-center justify-center font-bold">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-display font-bold text-sm text-[#111318]">
              Sanitized AC Fleet
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed">
              Meticulously serviced, odor-free vehicles equipped with working air conditioning and luggage boot space.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (ACCORDION + SCHEMA) */}
      <section className="py-16 sm:py-20 bg-[#FFFFFF] border-t border-[#E7E7E5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="space-y-2 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] font-semibold">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#111318]">
              Frequently Asked Questions ({route.origin} to {route.destination} Taxi)
            </h2>
            <p className="text-xs sm:text-sm text-[#666666]">
              Real answers covering toll rates, night charges, airport pickups, and cancellation terms.
            </p>
          </div>

          <div className="space-y-3">
            {route.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E7E7E5] rounded-[6px] overflow-hidden bg-[#F7F7F5]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full py-4 px-5 sm:px-6 text-left flex items-center justify-between gap-4 font-display font-bold text-xs sm:text-sm text-[#111318] hover:text-[#286BFF] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#777777] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#777777] shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-4 pt-1 text-xs sm:text-sm text-[#555555] leading-relaxed border-t border-[#E7E7E5]/70 bg-[#FFFFFF]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. INTERNAL LINKING GRAPH (REVERSE ROUTE + 4 NEARBY ROUTES) */}
      <section className="py-16 sm:py-20 bg-[#F7F7F5] border-t border-[#E7E7E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#777777] font-semibold">
              Explore Connected Highway Routes
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#111318]">
              Popular Outstation Taxi Connections from {route.origin}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Reverse Route Highlight Card */}
            {reverseRoute && (
              <Link
                to={`/cabs/${reverseRoute.slug}`}
                className="p-4 rounded-[6px] bg-[#111318] text-[#FFFFFF] hover:bg-[#1f232b] transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#286BFF] font-semibold">
                    Return Route
                  </span>
                  <div className="font-display font-bold text-sm text-[#FFFFFF] group-hover:text-[#286BFF] transition-colors">
                    {reverseRoute.origin} to {reverseRoute.destination} Cab
                  </div>
                  <div className="text-xs text-[#999999]">
                    {reverseRoute.distanceKm} km • {reverseRoute.duration}
                  </div>
                </div>
                <div className="pt-3 border-t border-[#333333] flex items-center justify-between text-xs mt-3">
                  <span className="text-white font-mono font-bold">
                    From ₹{reverseRoute.startingFare.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            )}

            {/* 4 Nearby Routes from Origin */}
            {nearbyRoutes.slice(0, 4).map((nearby) => (
              <Link
                key={nearby.slug}
                to={`/cabs/${nearby.slug}`}
                className="p-4 rounded-[6px] bg-[#FFFFFF] border border-[#E7E7E5] hover:border-[#111318] transition-all flex flex-col justify-between group shadow-subtle"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777]">
                    Outstation Route
                  </span>
                  <div className="font-display font-bold text-sm text-[#111318] group-hover:text-[#286BFF] transition-colors">
                    {nearby.origin} to {nearby.destination} Cab
                  </div>
                  <div className="text-xs text-[#666666]">
                    {nearby.distanceKm} km • {nearby.duration}
                  </div>
                </div>
                <div className="pt-3 border-t border-[#E7E7E5] flex items-center justify-between text-xs mt-3">
                  <span className="text-[#111318] font-mono font-bold">
                    From ₹{nearby.startingFare.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#111318] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
