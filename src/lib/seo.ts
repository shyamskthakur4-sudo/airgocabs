export interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
  schema?: Record<string, unknown>;
}

export function updateMetaTags({
  title,
  description,
  canonical = window.location.href,
  ogType = 'website',
  schema,
}: SEOProps) {
  // Update document title
  document.title = title;

  // Update meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Update canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonical);

  // Update Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', canonical);

  const ogTypeMeta = document.querySelector('meta[property="og:type"]');
  if (ogTypeMeta) ogTypeMeta.setAttribute('content', ogType);

  // Inject or update JSON-LD Schema
  const existingScript = document.getElementById('json-ld-schema');
  if (existingScript) {
    existingScript.remove();
  }

  if (schema) {
    const script = document.createElement('script');
    script.id = 'json-ld-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

export const AIRGOCABS_LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'AutoRental',
  'name': 'AIRGOCABS Indore',
  'alternateName': 'Airgo Cabs Car Rental',
  'description': 'Premier self-drive and chauffeur-driven car rental service in Indore, Madhya Pradesh. Airport pickup at Devi Ahilya Bai Holkar Airport, luxury sedans, hatchbacks, and SUVs with 24/7 assistance.',
  'url': 'https://airgocabs.com',
  'logo': 'https://airgocabs.com/logo.png',
  'image': 'https://airgocabs.com/images/hero-airport-car.jpg',
  'telephone': '+91-83492-50049',
  'email': 'reservations@airgocabs.com',
  'priceRange': '₹₹',
  'currenciesAccepted': 'INR',
  'paymentAccepted': 'Cash, Credit Card, Debit Card, UPI, Net Banking',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Dedicated Handover Bay 4, Terminal 1, Devi Ahilya Bai Holkar Airport & Vijay Nagar Hub',
    'addressLocality': 'Indore',
    'addressRegion': 'Madhya Pradesh',
    'postalCode': '452005',
    'addressCountry': 'IN',
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 22.7217,
    'longitude': 75.8011,
  },
  'openingHoursSpecification': [
    {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      'opens': '00:00',
      'closes': '23:59',
    },
  ],
  'areaServed': [
    {
      '@type': 'City',
      'name': 'Indore',
    },
    {
      '@type': 'Place',
      'name': 'Devi Ahilya Bai Holkar Airport (IDR)',
    },
    {
      '@type': 'Place',
      'name': 'Ujjain',
    },
    {
      '@type': 'Place',
      'name': 'Omkareshwar',
    },
    {
      '@type': 'Place',
      'name': 'Madhya Pradesh',
    },
  ],
  'hasOfferCatalog': {
    '@type': 'OfferCatalog',
    'name': 'Car Rental Services',
    'itemListElement': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Self Drive Car Rental in Indore',
          'description': 'Rent sanitized, well-maintained hatchbacks, compact SUVs, sedans, and SUVs with 250 KM (24H) and 150 KM (12H) packages.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Airport Car Rental & Transfers Indore (IDR)',
          'description': 'Direct terminal car handover and chauffeur airport pickup at Devi Ahilya Bai Holkar Airport.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Chauffeur Driven Luxury Car Rental',
          'description': 'Executive chauffeur-driven cars for city travel, corporate delegates, weddings, and outstation trips.',
        },
      },
    ],
  },
};
