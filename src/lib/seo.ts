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
  canonical,
  ogType = 'website',
  schema,
}: SEOProps) {
  // Update document title
  document.title = title;

  // Helper for meta tags
  const setMeta = (attrName: 'name' | 'property', attrVal: string, content: string) => {
    let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, attrVal);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMeta('name', 'title', title);
  setMeta('name', 'description', description);

  // Construct clean self-referencing canonical URL without query parameters
  const BASE_URL = 'https://www.airgocabs.com';
  let cleanCanonical = canonical;
  if (!cleanCanonical) {
    const pathname = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/+$/, '');
    cleanCanonical = `${BASE_URL}${pathname === '/' ? '/' : pathname}`;
  } else if (!cleanCanonical.startsWith('http')) {
    const pathname = cleanCanonical === '/' ? '/' : cleanCanonical.replace(/\/+$/, '');
    cleanCanonical = `${BASE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  } else {
    // If a full URL was passed, strip its query params
    try {
      const urlObj = new URL(cleanCanonical);
      cleanCanonical = `${BASE_URL}${urlObj.pathname === '/' ? '/' : urlObj.pathname.replace(/\/+$/, '')}`;
    } catch {
      cleanCanonical = BASE_URL;
    }
  }

  // Update canonical link
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', cleanCanonical);

  // Update Open Graph
  setMeta('property', 'og:site_name', 'AirGo Cabs');
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description);
  setMeta('property', 'og:url', cleanCanonical);
  setMeta('property', 'og:type', ogType);

  // Update Twitter Cards
  setMeta('property', 'twitter:card', 'summary_large_image');
  setMeta('property', 'twitter:title', title);
  setMeta('property', 'twitter:description', description);
  setMeta('property', 'twitter:url', cleanCanonical);

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
