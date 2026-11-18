export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Self-Drive' | 'Chauffeur' | 'Airport' | 'Billing';
}

export const FAQ_DATA: FAQItem[] = [
  {
    category: 'Airport',
    question: 'How does airport pickup work at Devi Ahilya Bai Holkar Airport (IDR), Indore?',
    answer: 'Upon landing at Indore Airport, our fleet representative will meet you at Terminal 1 Arrival Gate 2 or directly at our dedicated handover bay in Airport Parking Bay 4. For chauffeur bookings, your driver will hold a personalized name placard and assist you with your luggage. We track your flight number in real-time, so delays are accommodated at no extra charge.',
  },
  {
    category: 'Airport',
    question: 'Can I pick up a car at Indore Airport and drop it off in Vijay Nagar or Palasia?',
    answer: 'Yes! We offer flexible point-to-point drop-offs. You can pick up your self-drive or chauffeur-driven vehicle at Devi Ahilya Bai Holkar Airport and return it at our Vijay Nagar hub, Palasia office, or any major hotel in Indore.',
  },
  {
    category: 'Self-Drive',
    question: 'What documents are required to rent a self-drive car in Indore?',
    answer: 'You will need: (1) An original Indian Driving License valid for Light Motor Vehicles (LMV), held for at least 1 year; (2) Government-issued address proof such as an Aadhaar Card or Passport; and (3) For airport handovers, a valid flight boarding pass or e-ticket.',
  },
  {
    category: 'Self-Drive',
    question: 'How is the security deposit collected and when is it refunded?',
    answer: 'A flat refundable security deposit of ₹10,000 is collected via UPI, debit card, or credit card at vehicle handover. Following the return check and Fastag toll audit, the complete deposit is electronically refunded to your original source within 24 to 48 business hours.',
  },
  {
    category: 'Self-Drive',
    question: 'What is the speed limit and safety governance on self-drive cars?',
    answer: 'As mandated by Central Motor Vehicle regulations and state guidelines for tourist mobility vehicles, all self-drive rental cars have a smart speed governor calibrated at 80 km/h or 100 km/h depending on highway category. This ensures passenger safety and insurance validity across all Madhya Pradesh state and national highways.',
  },
  {
    category: 'Chauffeur',
    question: 'Are chauffeurs verified and professional for corporate or family travel?',
    answer: 'Every AIRGOCABS chauffeur undergoes rigorous police verification, background validation, defensive driving assessment, and executive etiquette training. They are uniformed, punctual, non-smoking, polite, and fluent in Hindi with working English proficiency.',
  },
  {
    category: 'Chauffeur',
    question: 'Do you provide chauffeur cars for Ujjain Mahakaleshwar & Omkareshwar trips?',
    answer: 'Yes, this is one of our most requested services. We provide dedicated luxury sedans, Innova Crysta, and 7-seater SUVs for same-day or multi-day temple darshan circuits covering Indore – Ujjain Mahakal Lok – Omkareshwar – Maheshwar – Mandu. Tolls and state permits are handled seamlessly.',
  },
  {
    category: 'Billing',
    question: 'Are Fastag tolls, parking, and state border taxes included in the rental price?',
    answer: 'For self-drive rentals, vehicles are equipped with an active Fastag. Tolls deducted during your journey are billed at actual cost during final settlement. For chauffeur city packages, toll and parking charges are borne by the hirer as incurred.',
  },
  {
    category: 'Billing',
    question: 'What happens if my plans change and I need to extend my rental duration?',
    answer: 'You can easily extend your rental by contacting our 24/7 Indore operations desk via WhatsApp or phone at least 3 hours prior to your scheduled return time, subject to vehicle availability. Extensions are billed at standard pro-rata daily rates without penalty.',
  },
];
