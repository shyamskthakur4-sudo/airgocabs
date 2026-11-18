export interface CarOptionFare {
  category: string;
  models: string;
  seating: string;
  perKmRate: number;
  startingFare: number;
  luggageCapacity: string;
  ac: boolean;
  idealFor: string;
}

export interface RouteFaq {
  question: string;
  answer: string;
}

export interface OutstationRoute {
  slug: string;
  origin: string;
  destination: string;
  distanceKm: number;
  duration: string;
  highway: string;
  topStopovers: string[];
  startingFare: number;
  maxFare: number;
  carOptions: CarOptionFare[];
  faqs: RouteFaq[];
  reverseRouteSlug: string;
  nearbyRouteSlugs: string[];
  overview: string;
  bestTravelTime: string;
}

export const OUTSTATION_ROUTES: Record<string, OutstationRoute> = {
  'indore-to-ujjain': {
    slug: 'indore-to-ujjain',
    origin: 'Indore',
    destination: 'Ujjain',
    distanceKm: 55,
    duration: '1 hr 15 mins',
    highway: 'Indore-Ujjain 4-Lane State Highway (SH-27)',
    topStopovers: ['Sanwer Town', 'Kshipra River Ghats', 'Dharmbad Gate', 'Mahakal Lok Corridor'],
    startingFare: 1499,
    maxFare: 3499,
    overview: 'The Indore to Ujjain highway corridor is Central India’s most frequented pilgrimage and business transit route. AirGo Cabs delivers dedicated one-way drops and round-trip transfers directly to Shri Mahakaleshwar Jyotirlinga, Kal Bhairav, and Ujjain Junction with zero toll-wait delays.',
    bestTravelTime: 'Early morning (5:00 AM - 7:00 AM) or late afternoon to attend Bhasma Aarti and Sandhya Aarti.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 1499,
        luggageCapacity: '2 Small Bags',
        ac: true,
        idealFor: 'Solo travelers, couples, or small families on quick temple visits.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 1899,
        luggageCapacity: '2 Large + 1 Small Bag',
        ac: true,
        idealFor: 'Comfortable executive travel, airport transfers, and family pilgrims.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 2699,
        luggageCapacity: '3 Large Bags',
        ac: true,
        idealFor: 'Joint families, groups carrying puja offerings, and senior citizens.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller / Urbania',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 5499,
        luggageCapacity: '8-10 Bags',
        ac: true,
        idealFor: 'Large pilgrimage tour groups and corporate delegations.',
      },
    ],
    faqs: [
      {
        question: 'Are state toll taxes included in the Indore to Ujjain one-way taxi fare?',
        answer: 'Our one-way taxi fares provide complete transparency. State highway tolls (approx. ₹45 at the Sanwer toll plaza) and parking fees are either billed at actual fastag rates or included in all-inclusive package quotes.',
      },
      {
        question: 'Can AirGo Cabs pick up directly from Devi Ahilya Bai Holkar Airport (IDR) for Ujjain?',
        answer: 'Yes. We maintain a dedicated handover bay at Indore Airport (Terminal 1 Bay 4). Our chauffeur tracks your flight in real time and picks you up at the arrival hall without any waiting charges for flight delays.',
      },
      {
        question: 'Is night driving allowance charged for late night or early morning temple trips?',
        answer: 'A standard night allowance of ₹250 applies only between 11:00 PM and 5:00 AM. For day-time travel starting before 11:00 PM, no night driver allowance is levied.',
      },
      {
        question: 'Can we book a same-day return cab with waiting time for Mahakaleshwar Darshan?',
        answer: 'Yes! Our round-trip packages include up to 4 hours of complimentary waiting time in Ujjain so your family can peacefully complete temple darshan, visit Kal Bhairav and Harsiddhi Mata, and return comfortably.',
      },
      {
        question: 'What is the cancellation policy for an Indore to Ujjain taxi reservation?',
        answer: 'AirGo Cabs provides 100% free cancellation up to 4 hours prior to your scheduled pickup time. No cancellation penalty or advance forfeiture is charged.',
      },
    ],
    reverseRouteSlug: 'ujjain-to-indore',
    nearbyRouteSlugs: ['indore-to-omkareshwar', 'indore-to-bhopal', 'indore-to-mandav', 'indore-to-maheshwar'],
  },

  'ujjain-to-indore': {
    slug: 'ujjain-to-indore',
    origin: 'Ujjain',
    destination: 'Indore',
    distanceKm: 55,
    duration: '1 hr 15 mins',
    highway: 'Ujjain-Indore 4-Lane State Highway (SH-27)',
    topStopovers: ['Kshipra River Ghats', 'Sanwer', 'Bhawrasla / Aurobindo Hospital', 'Super Corridor'],
    startingFare: 1499,
    maxFare: 3499,
    overview: 'Return smoothly from Shri Mahakaleshwar temple or Ujjain Junction to Indore city or Devi Ahilya Bai Holkar Airport. Professional AC cabs with confirmed pickups from any hotel, ashram, or dharamshala in Ujjain.',
    bestTravelTime: 'Available 24/7 with immediate dispatch across Ujjain city.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 1499,
        luggageCapacity: '2 Small Bags',
        ac: true,
        idealFor: 'Solo pilgrims and couples returning to Indore or catch morning flights.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 1899,
        luggageCapacity: '2 Large Bags',
        ac: true,
        idealFor: 'Comfortable post-darshan family return with ample boot space for prasad.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 2699,
        luggageCapacity: '3 Large Bags',
        ac: true,
        idealFor: 'Large families and groups requiring extra legroom and luggage space.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller / Urbania',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 5499,
        luggageCapacity: '8-10 Bags',
        ac: true,
        idealFor: 'Tour groups traveling back to Indore Airport or Railway Station.',
      },
    ],
    faqs: [
      {
        question: 'Can the driver pick us up directly from Ujjain Mahakal Temple Gate 4?',
        answer: 'Yes, our drivers coordinate directly via phone and WhatsApp to meet you at your designated temple gate, ashram, or hotel lobby in Ujjain.',
      },
      {
        question: 'How long before my flight at Indore Airport should I start from Ujjain?',
        answer: 'We recommend departing Ujjain at least 3.5 hours prior to your scheduled domestic departure, allowing 1 hr 15 mins for transit and 2 hours for security check-in.',
      },
      {
        question: 'Are there hidden return charges for one-way drops to Indore?',
        answer: 'No. Our one-way rates are strictly point-to-point with zero hidden return-fare penalties.',
      },
      {
        question: 'Can the cab drop at multiple points in Indore (e.g. Vijay Nagar and Airport)?',
        answer: 'Yes, multi-stop drops within Indore municipal limits can be accommodated with transparent, nominal extra distance charges.',
      },
      {
        question: 'What happens if my puja or Bhasma Aarti finishes later than planned?',
        answer: 'Just inform our 24/7 dispatch desk on WhatsApp or call; we will adjust your pickup time with zero stress.',
      },
    ],
    reverseRouteSlug: 'indore-to-ujjain',
    nearbyRouteSlugs: ['indore-to-omkareshwar', 'indore-to-bhopal', 'indore-to-mandav', 'indore-to-maheshwar'],
  },

  'indore-to-bhopal': {
    slug: 'indore-to-bhopal',
    origin: 'Indore',
    destination: 'Bhopal',
    distanceKm: 195,
    duration: '3 hrs 30 mins',
    highway: 'Bhopal-Indore 4-Lane Express Highway (SH-18 / NH-46)',
    topStopovers: ['Dewas Bypass', 'Ashta Midway Food Plaza', 'Sehore Food Hub', 'Bhopal VIP Road'],
    startingFare: 2799,
    maxFare: 5499,
    overview: 'The primary commercial and administrative transit lifeline of Madhya Pradesh connecting the commercial hub of Indore with the state capital Bhopal. High-speed 4-lane expressway travel with premier AC sedans and SUVs.',
    bestTravelTime: 'Depart early morning to beat Dewas city traffic and arrive for morning meetings in Bhopal.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2799,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Budget travelers and quick one-way business commutes.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 3299,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Corporate executives, delegates, and families seeking smooth highway cruise.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 4499,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Comfortable family journeys with maximum legroom on the highway.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 8499,
        luggageCapacity: '12 Bags',
        ac: true,
        idealFor: 'Corporate retreats, wedding guests, and university group travel.',
      },
    ],
    faqs: [
      {
        question: 'What is the highway toll cost between Indore and Bhopal?',
        answer: 'There are toll plazas along SH-18 at Dewas, Ashta, and Sehore totaling approximately ₹280. Tolls can be billed on actuals via FASTag or bundled in all-inclusive billing.',
      },
      {
        question: 'Are stops allowed for breakfast and snacks at Ashta Midway plazas?',
        answer: 'Yes, our drivers gladly stop at family-friendly, hygienic food courts (such as Highway Treat Ashta or McDelivery/CCD outlets) along the expressway.',
      },
      {
        question: 'Can you provide doorstep pickup from Super Corridor or Pithampur?',
        answer: 'Yes, we provide 24/7 doorstep pickup anywhere in Indore, including Pithampur Industrial area, Super Corridor, and Rau.',
      },
      {
        question: 'Do you offer one-way drops to Raja Bhoj Airport Bhopal (BHO)?',
        answer: 'Yes, we offer direct one-way transfers to Raja Bhoj Airport Bhopal with guaranteed on-time departure.',
      },
      {
        question: 'Is the billing transparent with GST invoice for corporate claims?',
        answer: 'Yes, AirGo Cabs provides GST-compliant tax invoices instantly via email and WhatsApp upon journey completion.',
      },
    ],
    reverseRouteSlug: 'bhopal-to-indore',
    nearbyRouteSlugs: ['indore-to-ujjain', 'indore-to-omkareshwar', 'indore-to-mandav', 'indore-to-kota'],
  },

  'bhopal-to-indore': {
    slug: 'bhopal-to-indore',
    origin: 'Bhopal',
    destination: 'Indore',
    distanceKm: 195,
    duration: '3 hrs 30 mins',
    highway: 'Indore-Bhopal 4-Lane Express Highway (SH-18 / NH-46)',
    topStopovers: ['Sehore Midway', 'Ashta Express Plaza', 'Dewas Chamunda Mata Bypass', 'Indore Bypass MR-10'],
    startingFare: 2799,
    maxFare: 5499,
    overview: 'Travel comfortably from Bhopal to Indore with verified highway chauffeurs. Seamless drops at Indore Airport, Vijay Nagar, Palasia, or direct transfer to Ujjain.',
    bestTravelTime: 'Available round the clock; afternoon departures arrive in Indore in time for dinner at Sarafa.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2799,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Economical city-to-city transit.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 3299,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Executive business travelers and family airport connections.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 4499,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Families wanting spacious comfort and high luggage capacity.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 8499,
        luggageCapacity: '12 Bags',
        ac: true,
        idealFor: 'Group tours and event delegates.',
      },
    ],
    faqs: [
      {
        question: 'Can you pick up from any location in Bhopal (e.g. Arera Colony, Kolar, MP Nagar)?',
        answer: 'Yes, we provide doorstep pickup from all sectors of Bhopal including MP Nagar, Arera Colony, Habibganj/Rani Kamlapati, and Kolar Road.',
      },
      {
        question: 'Can this cab take us directly to Devi Ahilya Bai Holkar Airport in Indore?',
        answer: 'Absolutely. We specialize in point-to-point airport drops directly at Terminal 1 Indore Airport.',
      },
      {
        question: 'Are drivers background verified and trained for night highway driving?',
        answer: 'All AirGo Cabs chauffeurs are commercially licensed, police verified, and trained specifically for express highway safety.',
      },
      {
        question: 'Can we book a round-trip from Bhopal to Indore with same-day return?',
        answer: 'Yes, same-day round-trips offer discounted return rates with free waiting hours for shopping or meetings.',
      },
      {
        question: 'How do I pay for my Bhopal to Indore taxi ride?',
        answer: 'Pay flexibly using UPI (Google Pay, PhonePe, Paytm), Net Banking, Debit/Credit Cards, or Cash directly to the chauffeur.',
      },
    ],
    reverseRouteSlug: 'indore-to-bhopal',
    nearbyRouteSlugs: ['indore-to-ujjain', 'indore-to-omkareshwar', 'indore-to-mandav', 'indore-to-kota'],
  },

  'indore-to-omkareshwar': {
    slug: 'indore-to-omkareshwar',
    origin: 'Indore',
    destination: 'Omkareshwar',
    distanceKm: 80,
    duration: '2 hrs 15 mins',
    highway: 'Indore-Icchapur Highway / Khandwa Road (SH-27 / NH-347BG)',
    topStopovers: ['Simrol Ghat', 'Choral Dam Viewpoint', 'Barwaha Narmada Bridge', 'Mortakka Junction'],
    startingFare: 2199,
    maxFare: 4299,
    overview: 'Journey to the holy island of Omkareshwar Jyotirlinga nestled along the sacred Narmada River. Scenic drive through the Vindhya hills and Simrol Ghat with dependable AC cabs and experienced mountain-road chauffeurs.',
    bestTravelTime: 'Depart early (6:00 AM) to experience morning Narmada Snan and Darshan without queues.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2199,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Couples and small families taking a day pilgrimage.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2599,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Comfortable family ride with smooth suspension through Simrol ghats.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3499,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Families and elder pilgrims requiring easy ingress and higher ground clearance.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 6999,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'Group yatras and devotional organizations.',
      },
    ],
    faqs: [
      {
        question: 'Can the driver take us to both Omkareshwar and Mamleshwar temples?',
        answer: 'Yes! Our round-trip packages drop you near the Omkareshwar foot suspension bridge and wait while you complete darshan at both Jyotirlinga shrines and take a boat ride on the Narmada River.',
      },
      {
        question: 'Is the road from Indore to Omkareshwar hilly or difficult to drive?',
        answer: 'The route passes through Simrol Ghat which has curves, but our chauffeurs have years of route experience and navigate the Ghats safely.',
      },
      {
        question: 'Can we combine Ujjain and Omkareshwar in a 2-day Jyotirlinga circuit package?',
        answer: 'Yes, we provide the popular 2-Day "Do Jyotirlinga Yatra" package covering Mahakaleshwar (Ujjain) and Omkareshwar from Indore with customized itinerary support.',
      },
      {
        question: 'Are there good restaurant stops between Indore and Omkareshwar?',
        answer: 'Yes, popular roadside dhabas and family restaurants near Choral and Barwaha offer fresh Malwi cuisine and breakfast.',
      },
      {
        question: 'Can we get dropped at Omkareshwar hotels or guest houses for night stay?',
        answer: 'Yes, we provide one-way drops to any hotel, ashram, or MP Tourism resort in Omkareshwar.',
      },
    ],
    reverseRouteSlug: 'omkareshwar-to-indore',
    nearbyRouteSlugs: ['indore-to-ujjain', 'indore-to-maheshwar', 'indore-to-mandav', 'indore-to-bhopal'],
  },

  'omkareshwar-to-indore': {
    slug: 'omkareshwar-to-indore',
    origin: 'Omkareshwar',
    destination: 'Indore',
    distanceKm: 80,
    duration: '2 hrs 15 mins',
    highway: 'Khandwa-Indore Highway via Barwaha & Simrol',
    topStopovers: ['Mortakka Narmada Bridge', 'Barwaha Market', 'Simrol Ghat', 'Bhawarkua Square'],
    startingFare: 2199,
    maxFare: 4299,
    overview: 'Reliable pickup from Omkareshwar Jyotirlinga, ashrams, and Narmada river ghats for a comfortable return to Indore city, railway station, or Devi Ahilya Bai Holkar Airport.',
    bestTravelTime: 'Afternoon departure allows relaxing travel back to Indore before dusk.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2199,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Solo travelers and couples returning to Indore.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2599,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Families needing comfortable return ride with temple sacred water containers.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3499,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Senior citizens and multi-generational families.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 6999,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'Pilgrimage groups returning to Indore transit hubs.',
      },
    ],
    faqs: [
      {
        question: 'Where will the cab pick us up in Omkareshwar?',
        answer: 'Our driver meets you at your hotel parking, the main bus stand, or near the suspension bridge approach road.',
      },
      {
        question: 'Can the cab drop directly at Indore Railway Station or Airport?',
        answer: 'Yes, we drop directly at Indore Junction (Platform 1) or Devi Ahilya Bai Holkar Airport Terminal 1.',
      },
      {
        question: 'How early should we book an Omkareshwar to Indore return cab?',
        answer: 'We recommend booking 2 to 4 hours in advance to guarantee vehicle allocation in the Omkareshwar zone.',
      },
      {
        question: 'Are there additional charges for carrying Narmada Jal cans in the boot?',
        answer: 'No additional charge is levied for carrying holy Narmada Jal or religious goods in our clean luggage boots.',
      },
      {
        question: 'Can we visit Maheshwar on our way back from Omkareshwar to Indore?',
        answer: 'Yes! You can easily customize the route to include Maheshwar Fort & Ghats with nominal detour distance billing.',
      },
    ],
    reverseRouteSlug: 'indore-to-omkareshwar',
    nearbyRouteSlugs: ['indore-to-ujjain', 'indore-to-maheshwar', 'indore-to-mandav', 'indore-to-bhopal'],
  },

  'indore-to-mandav': {
    slug: 'indore-to-mandav',
    origin: 'Indore',
    destination: 'Mandav',
    distanceKm: 98,
    duration: '2 hrs 30 mins',
    highway: 'Indore-Dhar Highway / Mumbai-Agra NH-52 via Gujri',
    topStopovers: ['Betma Sahib Gurudwara', 'Dhar Historic Fort', 'Tarapur Gate', 'Rupmati Pavilion'],
    startingFare: 2499,
    maxFare: 4899,
    overview: 'Discover the romantic ruins, Afghan architectural heritage, and cliffside panoramas of Mandu (Mandav). Scenic highway journey through Malwa plateau with comfortable AC rental cars.',
    bestTravelTime: 'Monsoon (July to September) and winter (October to March) for breathtaking hilltop greenery.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2499,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Couples and photography enthusiasts on a heritage day trip.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2999,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Comfortable family day tour of Jahaz Mahal and Hindola Mahal.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3999,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Family groups and senior citizens exploring historical monument clusters.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 7499,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'College heritage trips and extended family tours.',
      },
    ],
    faqs: [
      {
        question: 'Can the driver accompany us across all sightseeing points in Mandu?',
        answer: 'Yes! Our Mandav day tour packages cover all major points: Jahaz Mahal, Hindola Mahal, Baz Bahadur Palace, Rani Roopmati Pavilion, and Jami Masjid.',
      },
      {
        question: 'Is Mandav safe for same-day return to Indore in the evening?',
        answer: 'Yes, the 4-lane highway between Indore and Dhar is well-lit and secure. We recommend leaving Mandu before 7:30 PM for a smooth return.',
      },
      {
        question: 'Can we stop for famous Dhar Malwi Dal Bafla or Poha breakfast?',
        answer: 'Certainly! Our drivers know the authentic local eateries and highway restaurants along the Dhar route.',
      },
      {
        question: 'Are monument entry tickets included in the cab fare?',
        answer: 'Cab fares cover vehicle transit, fuel, and chauffeur. ASI monument entry tickets are purchased directly at the gates.',
      },
      {
        question: 'Can we combine Mandav and Maheshwar into a single weekend trip?',
        answer: 'Yes, our "Mandu & Maheshwar Heritage Circuit" is one of our most popular 2-day itineraries.',
      },
    ],
    reverseRouteSlug: 'mandav-to-indore',
    nearbyRouteSlugs: ['indore-to-maheshwar', 'indore-to-omkareshwar', 'indore-to-ujjain', 'indore-to-bhopal'],
  },

  'mandav-to-indore': {
    slug: 'mandav-to-indore',
    origin: 'Mandav',
    destination: 'Indore',
    distanceKm: 98,
    duration: '2 hrs 30 mins',
    highway: 'Dhar-Indore Highway / NH-52',
    topStopovers: ['Dhar City', 'Ghatabillod Industrial Belt', 'Betma', 'Indore Airport Gate'],
    startingFare: 2499,
    maxFare: 4899,
    overview: 'Comfortable return transfer from Mandu hotels, resorts, and heritage guest houses to Indore city or Devi Ahilya Bai Holkar Airport.',
    bestTravelTime: 'Late afternoon departures capture golden hour views from the Mandu ghats.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2499,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Solo travelers and couples returning to Indore.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2999,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Tourists heading to Indore Airport or Junction.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3999,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Spacious family transit with luggage.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 7499,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'Tour groups and corporate teams.',
      },
    ],
    faqs: [
      {
        question: 'Can the cab pick us up from Malwa Resort or Mandu MP Tourism hotel?',
        answer: 'Yes, we provide doorstep pickup from all hotels and resorts across Mandu plateau.',
      },
      {
        question: 'Can you drop directly at Indore Airport for evening flights?',
        answer: 'Yes, we recommend departing Mandav 4.5 hours prior to your scheduled flight.',
      },
      {
        question: 'Are there any hidden hill toll fees?',
        answer: 'No hidden fees. Municipal toll taxes and highway tolls are transparently itemized.',
      },
      {
        question: 'Is AC kept on during the uphill/downhill sections?',
        answer: 'Yes, our vehicles maintain full AC cooling throughout your journey.',
      },
      {
        question: 'How do I confirm my return booking?',
        answer: 'Book online or message our WhatsApp concierge at +91 83492 50049 for instant confirmation.',
      },
    ],
    reverseRouteSlug: 'indore-to-mandav',
    nearbyRouteSlugs: ['indore-to-maheshwar', 'indore-to-omkareshwar', 'indore-to-ujjain', 'indore-to-bhopal'],
  },

  'indore-to-maheshwar': {
    slug: 'indore-to-maheshwar',
    origin: 'Indore',
    destination: 'Maheshwar',
    distanceKm: 95,
    duration: '2 hrs 15 mins',
    highway: 'Indore-Khandwa-Barwaha Highway / AB Road via Dhamnod',
    topStopovers: ['Ahilya Fort', 'Narmada Ahilya Ghat', 'Rehwa Society Handloom Center', 'Mandleshwar'],
    startingFare: 2399,
    maxFare: 4699,
    overview: 'Visit the historic capital of Queen Ahilyabai Holkar on the sacred banks of the Narmada. Famous for Ahilya Fort, serene boat rides, and handwoven Maheshwari sarees.',
    bestTravelTime: 'Morning or afternoon to witness the tranquil evening Aarti on Ahilya Ghat.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2399,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Day visitors and shoppers looking for authentic handloom sarees.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2899,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Family outings and film/heritage enthusiasts.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3799,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Spacious family travel with ample boot space for saree shopping.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 7299,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'Group heritage tours and wedding parties.',
      },
    ],
    faqs: [
      {
        question: 'Does the cab wait while we explore Ahilya Fort and take a boat ride?',
        answer: 'Yes, our round-trip package includes free waiting time at the fort parking while you explore temples and ghats.',
      },
      {
        question: 'Can the driver take us to genuine weaver cooperatives for Maheshwari sarees?',
        answer: 'Yes, our drivers can drop you right at the Rehwa Society inside the fort or government handloom weaver outlets.',
      },
      {
        question: 'Can we also visit nearby Mandleshwar in the same cab booking?',
        answer: 'Yes, Mandleshwar is just 8 km away and can be added to your itinerary with nominal per-km distance billing.',
      },
      {
        question: 'What is the highway condition between Indore and Maheshwar?',
        answer: 'The road via Mumbai-Agra Highway (NH-52) and Dhamnod is well-paved and provides a smooth 2-hour ride.',
      },
      {
        question: 'Can we book a one-way cab to stay overnight at Ahilya Fort Heritage Hotel?',
        answer: 'Yes, one-way drops directly to Ahilya Fort Hotel or MP Tourism Narmada Resort are readily available.',
      },
    ],
    reverseRouteSlug: 'maheshwar-to-indore',
    nearbyRouteSlugs: ['indore-to-omkareshwar', 'indore-to-mandav', 'indore-to-ujjain', 'indore-to-bhopal'],
  },

  'maheshwar-to-indore': {
    slug: 'maheshwar-to-indore',
    origin: 'Maheshwar',
    destination: 'Indore',
    distanceKm: 95,
    duration: '2 hrs 15 mins',
    highway: 'Dhamnod-Indore NH-52 Expressway',
    topStopovers: ['Dhamnod Bypass', 'Manpur Ghat', 'Rau Circle', 'Indore Vijay Nagar'],
    startingFare: 2399,
    maxFare: 4699,
    overview: 'Comfortable return cab from Maheshwar Ahilya Fort, Narmada resorts, and riverside dharamshalas to Indore city or airport.',
    bestTravelTime: 'Evening departures provide a cool, pleasant highway drive back to Indore.',
    carOptions: [
      {
        category: 'Hatchback',
        models: 'WagonR, Swift, Glanza',
        seating: '4 Passengers',
        perKmRate: 11,
        startingFare: 2399,
        luggageCapacity: '2 Bags',
        ac: true,
        idealFor: 'Solo travelers and couples.',
      },
      {
        category: 'Sedan',
        models: 'Dzire, Etios, Aura',
        seating: '4 Passengers',
        perKmRate: 12,
        startingFare: 2899,
        luggageCapacity: '3 Bags',
        ac: true,
        idealFor: 'Family airport transfers and shoppers.',
      },
      {
        category: 'Ertiga / SUV',
        models: 'Ertiga, Carens, XL6',
        seating: '6 Passengers',
        perKmRate: 16,
        startingFare: 3799,
        luggageCapacity: '4 Bags',
        ac: true,
        idealFor: 'Large families with shopping and baggage.',
      },
      {
        category: 'Tempo Traveller',
        models: 'Force Traveller',
        seating: '12-16 Passengers',
        perKmRate: 24,
        startingFare: 7299,
        luggageCapacity: '10 Bags',
        ac: true,
        idealFor: 'Group heritage tours.',
      },
    ],
    faqs: [
      {
        question: 'Can the cab pick up from the riverside ghats in Maheshwar?',
        answer: 'Our driver meets you at the main fort parking lot or your hotel reception.',
      },
      {
        question: 'Can we get dropped at Devi Ahilya Bai Holkar Airport directly?',
        answer: 'Yes, direct airport drops at Terminal 1 Bay 4 are provided with guaranteed punctual arrival.',
      },
      {
        question: 'Are night travel surcharges applicable?',
        answer: 'Standard ₹250 night allowance applies only for journeys operating between 11 PM and 5 AM.',
      },
      {
        question: 'Is luggage space sufficient for multiple shopping bags of sarees?',
        answer: 'Yes, all our Sedans and SUVs feature dedicated boot compartments for your shopping.',
      },
      {
        question: 'Can I cancel or reschedule if our boating gets extended?',
        answer: 'Yes, free schedule changes are accommodated; just message our 24/7 WhatsApp desk.',
      },
    ],
    reverseRouteSlug: 'indore-to-maheshwar',
    nearbyRouteSlugs: ['indore-to-omkareshwar', 'indore-to-mandav', 'indore-to-ujjain', 'indore-to-bhopal'],
  },
};

/**
 * Generates a strict 55-60 character SEO Title for Route pages
 * Formula: [Origin] to [Destination] Cab | One-Way Taxi @ ₹[Starting_Fare] - AirGo Cabs (Strict 55-60 chars)
 */
export function getRouteSeoTitle(origin: string, destination: string, startingFare: number): string {
  const formattedFare = startingFare.toLocaleString('en-IN');
  const base = `${origin} to ${destination} Cab | One-Way Taxi @ ₹${formattedFare} - AirGo Cabs`;
  
  if (base.length >= 55 && base.length <= 60) {
    return base;
  }
  
  if (base.length > 60) {
    // Trim slightly if city names are longer
    const alt = `${origin} to ${destination} Cab | Taxi @ ₹${formattedFare} - AirGo Cabs`;
    if (alt.length <= 60) return alt;
    return base.slice(0, 60);
  }
  
  // Pad naturally if slightly under 55 chars
  return `${origin} to ${destination} Cab | AC One-Way Taxi @ ₹${formattedFare} - AirGo Cabs`.slice(0, 60);
}

/**
 * Generates a strict 150-160 character SEO Meta Description for Route pages
 * Formula: Book reliable [Origin] to [Destination] cab with AirGo Cabs. Clean AC Hatchbacks, Sedans & SUVs, verified drivers, transparent billing & 24/7 support. Book now!
 */
export function getRouteSeoDescription(origin: string, destination: string): string {
  const desc = `Book reliable ${origin} to ${destination} cab with AirGo Cabs. Clean AC Hatchbacks, Sedans & SUVs, verified drivers, transparent billing & 24/7 support. Book now!`;
  
  if (desc.length >= 150 && desc.length <= 160) {
    return desc;
  }
  
  if (desc.length > 160) {
    return desc.slice(0, 157) + '...';
  }
  
  // If under 150, pad naturally
  const padded = `Book reliable ${origin} to ${destination} cab with AirGo Cabs today. Clean AC Hatchbacks, Sedans & SUVs, verified drivers, transparent billing & 24/7 support. Book now!`;
  return padded.slice(0, 160);
}
