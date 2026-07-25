export type Service = {
  category: string;
  name: string;
  duration: string;
  price: string;
  description?: string;
};

export type TeamMember = { name: string; role: string; rating: number; img: string };
export type Review = { name: string; date: string; rating: number; text: string; avatarColor: string };

export type Venue = {
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  city: string;
  country: string;
  address: string;
  distanceKm: number;
  openUntil: string;
  images: string[];
  portfolio: string[];
  team: TeamMember[];
  services: Service[];
  reviewsList: Review[];
  about: string;
  hours: { day: string; hours: string; closed?: boolean }[];
  amenities: string[];
};

export const venues: Venue[] = [
  {
    slug: "the-hideaway",
    name: "The Hideaway",
    category: "Hair Salon",
    rating: 5.0,
    reviews: 1479,
    featured: true,
    city: "Dubai",
    country: "United Arab Emirates",
    address: "403 Jumeirah Beach Rd, Al Athar Street, La Plage, Dubai",
    distanceKm: 2.4,
    openUntil: "7:00 PM",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80",
      "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1400&q=80",
      "https://images.unsplash.com/photo-1595475884562-073c30d45670?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    team: [
      { name: "Billy", role: "Senior Stylist", rating: 4.9, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
      { name: "Erin", role: "Senior Stylist", rating: 4.9, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
      { name: "Yoko", role: "Colour Specialist", rating: 5.0, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
      { name: "Sara", role: "Junior Stylist", rating: 4.8, img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80" },
    ],
    services: [
      { category: "Spa & Treatments", name: "Hair Spa & Deep Conditioning", duration: "45 min", price: "from AED 290", description: "Nourishing hair spa treatment to revitalize dry or damaged hair and restore natural shine." },
      { category: "Coloring", name: "Hair Consultation", duration: "20 min", price: "AED 0", description: "New to the salon or thinking of a big change? Book a complimentary consultation to chat through your hair goals." },
      { category: "Coloring", name: "Root Color", duration: "1 hr", price: "from AED 352", description: "Freshen up your roots and keep your colour looking seamless and vibrant." },
      { category: "Coloring", name: "Glossing", duration: "45 min", price: "from AED 265", description: "Add shine and tone to your existing colour." },
      { category: "Coloring", name: "Glaze", duration: "1 hr - 1 hr, 30 min", price: "from AED 264" },
      { category: "Coloring", name: "Full Hair Color", duration: "1 hr, 30 min - 2 hr", price: "from AED 480" },
      { category: "Highlights & Balayage", name: "Partial Highlights", duration: "1 hr, 30 min", price: "from AED 550" },
      { category: "Highlights & Balayage", name: "Full Balayage", duration: "2 hr, 30 min", price: "from AED 780" },
      { category: "Styling", name: "Blow Dry & Styling", duration: "45 min", price: "from AED 150" },
      { category: "Styling", name: "Haircut & Style", duration: "1 hr", price: "from AED 320" },
      { category: "Smoothing Treatments", name: "Keratin Treatment", duration: "2 hr", price: "from AED 950" },
    ],
    reviewsList: [
      { name: "neptune n", date: "Today at 10:39 AM", rating: 5, text: "Kurumi is fantastic. Love my haircut. Thank you", avatarColor: "bg-emerald-400" },
      { name: "Mimi L", date: "Wed, Jul 15, 2026 at 7:29 PM", rating: 5, text: "Absolutely amazing service and vibe. Best salon in Dubai.", avatarColor: "bg-violet-200" },
      { name: "Felix Lauren B", date: "Tue, Jul 14, 2026", rating: 5, text: "The team here truly listens. Left feeling brand new.", avatarColor: "bg-emerald-500" },
      { name: "Yvonne L", date: "Mon, Jul 13, 2026", rating: 5, text: "Consistent quality, beautiful space, warm people.", avatarColor: "bg-rose-400" },
    ],
    about: "Nestled in the heart of La Plage, The Hideaway is a sanctuary for modern hair — where craftsmanship meets calm. Our team of internationally trained stylists specialise in colour, cuts and transformative treatments in a light-filled, considered space.",
    hours: [
      { day: "Monday", hours: "Closed", closed: true },
      { day: "Tuesday", hours: "9:00 AM - 7:00 PM" },
      { day: "Wednesday", hours: "9:00 AM - 7:00 PM" },
      { day: "Thursday", hours: "9:00 AM - 7:00 PM" },
      { day: "Friday", hours: "9:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 8:00 PM" },
      { day: "Sunday", hours: "9:00 AM - 7:00 PM" },
    ],
    amenities: ["Instant confirmation", "Pay by app", "Wheelchair accessible"],
  },
  {
    slug: "sozo-hair-design",
    name: "Sozo Hair Design",
    category: "Hair Salon",
    rating: 4.9,
    reviews: 2588,
    featured: true,
    city: "Hong Kong",
    country: "Hong Kong",
    address: "34 Wyndham Street, 2/F, Central, Hong Kong Island",
    distanceKm: 1.1,
    openUntil: "7:30 PM",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=1400&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=80",
    ],
    team: [
      { name: "Kurumi", role: "Master Stylist", rating: 5.0, img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80" },
      { name: "Tomo", role: "Senior Stylist", rating: 4.9, img: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?w=400&q=80" },
      { name: "Aki", role: "Colourist", rating: 4.9, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    ],
    services: [
      { category: "Spa", name: "Organic Hair Spa", duration: "1 hr", price: "HK$ 680" },
      { category: "Haircuts", name: "Haircut & Signature Cut", duration: "1 hr", price: "from HK$ 780" },
      { category: "Haircuts", name: "Fringe Trim", duration: "15 min", price: "HK$ 120" },
      { category: "Coloring", name: "Hair Color", duration: "2 hr", price: "from HK$ 1,280" },
      { category: "Coloring", name: "Highlights & Balayage", duration: "2 hr, 30 min", price: "from HK$ 1,680" },
      { category: "Styling", name: "Blow Dry & Styling", duration: "45 min", price: "from HK$ 380" },
    ],
    reviewsList: [
      { name: "Alex T", date: "Today at 09:12 AM", rating: 5, text: "Kurumi is a magician. Best cut I've had in years.", avatarColor: "bg-indigo-400" },
      { name: "Priya S", date: "Yesterday", rating: 5, text: "Beautiful space, world-class stylists.", avatarColor: "bg-amber-400" },
    ],
    about: "A quiet, Japanese-inspired hair atelier tucked above the buzz of Central. Precision cutting, considered colour and an experience designed to feel like a reset.",
    hours: [
      { day: "Monday", hours: "10:00 AM - 7:30 PM" },
      { day: "Tuesday", hours: "10:00 AM - 7:30 PM" },
      { day: "Wednesday", hours: "10:00 AM - 7:30 PM" },
      { day: "Thursday", hours: "10:00 AM - 7:30 PM" },
      { day: "Friday", hours: "10:00 AM - 8:30 PM" },
      { day: "Saturday", hours: "10:00 AM - 8:30 PM" },
      { day: "Sunday", hours: "Closed", closed: true },
    ],
    amenities: ["Instant confirmation", "Pay by app", "Free wifi"],
  },
  {
    slug: "trendy-studio",
    name: "Trendy Studio",
    category: "Hair Salon",
    rating: 5.0,
    reviews: 1743,
    city: "London",
    country: "United Kingdom",
    address: "12 Portobello Road, Notting Hill, London",
    distanceKm: 2.0,
    openUntil: "6:00 PM",
    images: [
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=80",
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
    ],
    team: [
      { name: "Chloe", role: "Owner & Stylist", rating: 5.0, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80" },
      { name: "Marco", role: "Colourist", rating: 4.9, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
    ],
    services: [
      { category: "Haircuts", name: "Restyle Cut", duration: "1 hr, 15 min", price: "from £95" },
      { category: "Coloring", name: "Balayage", duration: "3 hr", price: "from £280" },
      { category: "Styling", name: "Hollywood Waves", duration: "1 hr", price: "from £75" },
    ],
    reviewsList: [
      { name: "Emma R", date: "Today", rating: 5, text: "Absolutely obsessed with my new colour. Chloe is the best.", avatarColor: "bg-pink-400" },
    ],
    about: "A neighbourhood studio on Portobello Road with a global reputation for editorial colour and effortless cuts.",
    hours: [
      { day: "Monday", hours: "10:00 AM - 6:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 8:00 PM" },
      { day: "Friday", hours: "10:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 6:00 PM" },
      { day: "Sunday", hours: "Closed", closed: true },
    ],
    amenities: ["Instant booking", "Pay by app"],
  },
  {
    slug: "riyadh-glow",
    name: "Riyadh Glow",
    category: "Medspa",
    rating: 4.9,
    reviews: 1456,
    city: "Riyadh",
    country: "Saudi Arabia",
    address: "Via Riyadh, Al Hada, Riyadh Province",
    distanceKm: 5.4,
    openUntil: "11:00 PM",
    images: [
      "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1607779097040-26e80aa4576b?w=800&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
    ],
    team: [
      { name: "Dr. Layla", role: "Aesthetic Doctor", rating: 5.0, img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
      { name: "Noura", role: "Aesthetician", rating: 4.9, img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
    ],
    services: [
      { category: "Skincare", name: "HydraFacial", duration: "1 hr", price: "from SAR 650" },
      { category: "Skincare", name: "Chemical Peel", duration: "45 min", price: "from SAR 480" },
      { category: "Injectables", name: "Consultation", duration: "30 min", price: "SAR 0" },
    ],
    reviewsList: [
      { name: "Aisha M", date: "Today", rating: 5, text: "Skin has never looked better. Highly recommend.", avatarColor: "bg-teal-400" },
    ],
    about: "A premium medspa in Riyadh offering evidence-based skincare and aesthetics in a serene, private setting.",
    hours: [
      { day: "Monday", hours: "1:00 PM - 11:00 PM" },
      { day: "Tuesday", hours: "1:00 PM - 11:00 PM" },
      { day: "Wednesday", hours: "1:00 PM - 11:00 PM" },
      { day: "Thursday", hours: "1:00 PM - 11:00 PM" },
      { day: "Friday", hours: "1:00 PM - 11:00 PM" },
      { day: "Saturday", hours: "1:00 PM - 11:00 PM" },
      { day: "Sunday", hours: "1:00 PM - 11:00 PM" },
    ],
    amenities: ["Instant confirmation", "Pay by app"],
  },
  {
    slug: "blue-bird-salon",
    name: "Blue Bird Salon (Tiljala)",
    category: "Hair Salon",
    rating: 4.8,
    reviews: 312,
    city: "Kolkata",
    country: "India",
    address: "20 Tiljala Road, Kustia, Kolkata, West Bengal",
    distanceKm: 3.2,
    openUntil: "8:30 PM",
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
    ],
    team: [
      { name: "Rahul", role: "Senior Stylist", rating: 4.8, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
    ],
    services: [
      { category: "Haircuts", name: "Men's Cut", duration: "30 min", price: "from ₹350" },
      { category: "Haircuts", name: "Women's Cut", duration: "45 min", price: "from ₹550" },
    ],
    reviewsList: [
      { name: "Rina P", date: "Today", rating: 5, text: "Friendly team and great value.", avatarColor: "bg-sky-400" },
    ],
    about: "A friendly neighbourhood salon serving Tiljala with classic cuts and colour.",
    hours: [
      { day: "Monday", hours: "10:00 AM - 8:30 PM" },
      { day: "Tuesday", hours: "10:00 AM - 8:30 PM" },
      { day: "Wednesday", hours: "10:00 AM - 8:30 PM" },
      { day: "Thursday", hours: "10:00 AM - 8:30 PM" },
      { day: "Friday", hours: "10:00 AM - 8:30 PM" },
      { day: "Saturday", hours: "10:00 AM - 8:30 PM" },
      { day: "Sunday", hours: "10:00 AM - 8:30 PM" },
    ],
    amenities: ["Instant confirmation", "Pet-friendly", "Kid-friendly"],
  },
  {
    slug: "urban-barber-co",
    name: "Urban Barber Co.",
    category: "Barber",
    rating: 4.9,
    reviews: 967,
    city: "New York",
    country: "United States",
    address: "88 Bleecker St, New York, NY",
    distanceKm: 0.8,
    openUntil: "9:00 PM",
    images: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&q=80",
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=1400&q=80",
    ],
    portfolio: [
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80",
    ],
    team: [
      { name: "Jay", role: "Master Barber", rating: 5.0, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
    ],
    services: [
      { category: "Haircuts", name: "Classic Cut", duration: "30 min", price: "$45" },
      { category: "Haircuts", name: "Fade + Beard", duration: "45 min", price: "$65" },
    ],
    reviewsList: [
      { name: "Marcus H", date: "Today", rating: 5, text: "Sharpest fade in the city.", avatarColor: "bg-orange-400" },
    ],
    about: "A neighbourhood barbershop with classic cuts, hot towels, and a great playlist.",
    hours: [
      { day: "Monday", hours: "10:00 AM - 9:00 PM" },
      { day: "Tuesday", hours: "10:00 AM - 9:00 PM" },
      { day: "Wednesday", hours: "10:00 AM - 9:00 PM" },
      { day: "Thursday", hours: "10:00 AM - 9:00 PM" },
      { day: "Friday", hours: "10:00 AM - 10:00 PM" },
      { day: "Saturday", hours: "9:00 AM - 8:00 PM" },
      { day: "Sunday", hours: "10:00 AM - 6:00 PM" },
    ],
    amenities: ["Instant confirmation", "Pay by app"],
  },
];

export function findVenue(slug: string) {
  return venues.find((v) => v.slug === slug);
}

export const cities = [
  "Dubai", "London", "New York", "Hong Kong", "Sydney", "Paris", "Los Angeles",
  "Miami", "Riyadh", "Kolkata", "Tokyo", "Singapore",
];

export const countries = [
  "Australia", "Bahrain", "Barbados", "Belgium", "Brazil", "Canada",
  "Denmark", "France", "Germany", "Greece", "Ireland", "Italy", "Malta", "Mexico",
];
