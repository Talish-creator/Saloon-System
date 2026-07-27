//#region node_modules/.nitro/vite/services/ssr/assets/venues-BJIXWGpN.js
var countries = [
	"United Arab Emirates",
	"Saudi Arabia",
	"Qatar",
	"Kuwait",
	"Oman"
];
var countryCitiesMap = {
	"United Arab Emirates": [
		"Dubai",
		"Abu Dhabi",
		"Sharjah",
		"Al Ain"
	],
	"Saudi Arabia": [
		"Riyadh",
		"Jeddah",
		"Khobar",
		"Dammam"
	],
	"Qatar": [
		"Doha",
		"Lusail",
		"Al Rayyan",
		"Al Wakrah"
	],
	"Kuwait": [
		"Kuwait City",
		"Salmiya",
		"Hawally",
		"Ahmadi"
	],
	"Oman": [
		"Muscat",
		"Salalah",
		"Sohar",
		"Nizwa"
	]
};
var GCC_LOCATIONS = [
	{
		city: "Dubai",
		country: "United Arab Emirates",
		currency: "AED",
		addresses: [
			"Building 17, Street 14, Dubai",
			"403 Jumeirah Beach Rd, Dubai",
			"Downtown Boulevard, Dubai",
			"Dubai Marina Promenade, Dubai"
		]
	},
	{
		city: "Abu Dhabi",
		country: "United Arab Emirates",
		currency: "AED",
		addresses: ["Corniche Rd, Al Rasah, Abu Dhabi", "Galleria Mall, Maryah Island, Abu Dhabi"]
	},
	{
		city: "Riyadh",
		country: "Saudi Arabia",
		currency: "SAR",
		addresses: [
			"King Fahd Rd, Olaya, Riyadh",
			"Tahlia St, Al Sulaimaniyah, Riyadh",
			"KAFD Avenue, Riyadh"
		]
	},
	{
		city: "Jeddah",
		country: "Saudi Arabia",
		currency: "SAR",
		addresses: ["Corniche Commercial Center, Jeddah", "Al Hamra District, Jeddah"]
	},
	{
		city: "Khobar",
		country: "Saudi Arabia",
		currency: "SAR",
		addresses: ["Prince Turki St, Al Yarmouk, Khobar"]
	},
	{
		city: "Dammam",
		country: "Saudi Arabia",
		currency: "SAR",
		addresses: ["King Abdulaziz Rd, Dammam"]
	},
	{
		city: "Doha",
		country: "Qatar",
		currency: "QAR",
		addresses: ["The Pearl-Qatar, Porto Arabia, Doha", "West Bay Towers, Doha"]
	},
	{
		city: "Kuwait City",
		country: "Kuwait",
		currency: "KWD",
		addresses: ["Sharq Towers, Kuwait City", "Salmiya Gulf Road, Kuwait City"]
	},
	{
		city: "Muscat",
		country: "Oman",
		currency: "OMR",
		addresses: ["Shatti Al Qurum, Muscat", "Al Mouj Marina, Muscat"]
	}
];
var VENUE_NAMES = [
	"Zen Luxury Spa",
	"The Hideaway Wellness",
	"Serenity & Glow Lounge",
	"Royal Oasis Beauty Salon",
	"Aura Botanical Spa",
	"Radiance Hair & Nail Bar",
	"Celestial Wellness Hub",
	"Velvet Touch Grooming",
	"Pure Harmony Massage Suite",
	"Opulent Skin Sanctuary",
	"Silk & Elegance Studio",
	"Crown & Polish Parlor",
	"Nirvana Reflexology Clinic",
	"Elysian Hammam & Spa",
	"Golden Mirage Wellness"
];
var CATEGORIES = [
	"Day Spa & Wellness",
	"Hair & Beauty Salon",
	"Massage & Reflexology",
	"Nail Bar & Pedicure",
	"Skincare & Aesthetics",
	"Men's Barber & Grooming",
	"Hammam & Bathhouse"
];
var UNSPLASH_IMAGES = [
	"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80",
	"https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
	"https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=1400&q=80",
	"https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=1400&q=80",
	"https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=1400&q=80",
	"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=80",
	"https://images.unsplash.com/photo-1512290900673-700235f09926?w=1400&q=80",
	"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=80"
];
var SERVICE_TEMPLATES = [
	{
		category: "Massage",
		name: "Hot Stone Aromatherapy",
		duration: "90 mins",
		basePrice: 175
	},
	{
		category: "Massage",
		name: "Deep Tissue Muscle Relief",
		duration: "60 mins",
		basePrice: 115
	},
	{
		category: "Massage",
		name: "Swedish Relaxation Therapy",
		duration: "60 mins",
		basePrice: 95
	},
	{
		category: "Hair",
		name: "Hair Spa & Deep Conditioning",
		duration: "45 mins",
		basePrice: 65
	},
	{
		category: "Hair",
		name: "Signature Haircut & Blowdry",
		duration: "45 mins",
		basePrice: 85
	},
	{
		category: "Skincare",
		name: "Hydra-Glow Facial Therapy",
		duration: "60 mins",
		basePrice: 145
	},
	{
		category: "Skincare",
		name: "Organic Botanical Anti-Aging",
		duration: "75 mins",
		basePrice: 165
	},
	{
		category: "Nails",
		name: "Deluxe Gel Manicure & Pedicure",
		duration: "75 mins",
		basePrice: 80
	}
];
var TEAM_MEMBERS = [
	{
		name: "Elena Rostova",
		role: "Master Aesthetician",
		rating: 4.9,
		img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
	},
	{
		name: "Siddharth Verma",
		role: "Senior Therapist",
		rating: 4.8,
		img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
	},
	{
		name: "Amara Al-Hassan",
		role: "Hair Specialist",
		rating: 5,
		img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
	}
];
var REVIEWS = [
	{
		name: "Sarah M.",
		date: "2 days ago",
		rating: 5,
		text: "Exceptional experience! Ambiance was calming and staff ultra professional.",
		avatarColor: "bg-emerald-400"
	},
	{
		name: "Rashid A.",
		date: "1 week ago",
		rating: 5,
		text: "Top-tier spa in the city. Clean, luxurious, and worth every penny.",
		avatarColor: "bg-indigo-400"
	},
	{
		name: "Fatima K.",
		date: "2 weeks ago",
		rating: 5,
		text: "The massage therapy was soothing and relieved all my stress.",
		avatarColor: "bg-purple-400"
	}
];
var venues = Array.from({ length: 1e3 }, (_, i) => {
	const loc = GCC_LOCATIONS[i % GCC_LOCATIONS.length];
	const nameBase = VENUE_NAMES[i % VENUE_NAMES.length];
	const cat = CATEGORIES[i % CATEGORIES.length];
	const address = loc.addresses[i % loc.addresses.length];
	const slug = `${nameBase.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${loc.city.toLowerCase()}-${i + 1}`;
	const imgStart = i % UNSPLASH_IMAGES.length;
	const venueImages = [
		UNSPLASH_IMAGES[imgStart],
		UNSPLASH_IMAGES[(imgStart + 1) % UNSPLASH_IMAGES.length],
		UNSPLASH_IMAGES[(imgStart + 2) % UNSPLASH_IMAGES.length],
		UNSPLASH_IMAGES[(imgStart + 3) % UNSPLASH_IMAGES.length],
		UNSPLASH_IMAGES[(imgStart + 4) % UNSPLASH_IMAGES.length],
		UNSPLASH_IMAGES[(imgStart + 5) % UNSPLASH_IMAGES.length]
	];
	const venueServices = SERVICE_TEMPLATES.map((st) => {
		let p = Math.round((st.basePrice + i % 25) / 5) * 5;
		if (p > 195) p = 195;
		if (p < 45) p = 45;
		return {
			category: st.category,
			name: st.name,
			duration: st.duration,
			price: `${p} ${loc.currency}`,
			description: `Luxurious ${st.name.toLowerCase()} tailored for your relaxation.`
		};
	});
	return {
		slug,
		name: `${nameBase} ${loc.city}`,
		category: cat,
		rating: parseFloat((4.5 + i % 5 * .1).toFixed(1)),
		reviews: 80 + i * 7 % 400,
		featured: i % 7 === 0,
		city: loc.city,
		country: loc.country,
		address,
		distanceKm: parseFloat((.8 + i % 15 * .3).toFixed(1)),
		openUntil: "10:00 PM",
		images: venueImages,
		portfolio: venueImages.slice(2, 6),
		team: TEAM_MEMBERS,
		services: venueServices,
		reviewsList: REVIEWS,
		about: `Welcome to ${nameBase} ${loc.city}. A premier destination for selfcare, massage therapy, beauty, and wellness located in ${loc.city}, ${loc.country}.`,
		hours: [{
			day: "Monday - Sunday",
			hours: "09:00 AM - 10:00 PM"
		}],
		amenities: [
			"Instant confirmation",
			"Pay at salon / App",
			"Couples & Separate Wings",
			"Valet Parking",
			"Complimentary Refreshments"
		]
	};
});
function findVenue(slug) {
	return venues.find((v) => v.slug === slug);
}
//#endregion
export { venues as i, countryCitiesMap as n, findVenue as r, countries as t };
