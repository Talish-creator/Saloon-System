// Client-side booking store (localStorage). Mirrors what would live in ERPNext.
export type StoredBooking = {
  bookingId: string;
  venueSlug: string;
  venueName: string;
  venueImage?: string;
  venueAddress?: string;
  services: { name: string; price: string; duration: string }[];
  date: string;
  time: string;
  customer: { name: string; email: string; phone: string; notes?: string };
  paymentMethod: "online" | "at_salon";
  paymentRef?: string;
  total: string;
  status: string; // Paid | Pending Payment | Completed | Cancelled | Confirmed
  createdAt: string;
};

const KEY = "ss.bookings.v1";

const DEFAULT_BOOKINGS: StoredBooking[] = [
  {
    bookingId: "SS-MS0SHWE9",
    venueSlug: "zen-luxury-spa-dubai-1",
    venueName: "Zen Luxury Spa Dubai",
    venueImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80",
    venueAddress: "Building 17, Street 14, Dubai, United Arab Emirates",
    services: [
      { name: "Hot Stone Aromatherapy", price: "800 AED", duration: "90 mins" }
    ],
    date: "2026-07-25",
    time: "09:30",
    customer: {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+971 50 123 4567",
      notes: "Please provide a quiet room."
    },
    paymentMethod: "at_salon",
    total: "800 AED",
    status: "Pending Payment",
    createdAt: "2026-07-25T09:30:00.000Z"
  },
  {
    bookingId: "SS-DXB9012A",
    venueSlug: "the-hideaway",
    venueName: "The Hideaway",
    venueImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
    venueAddress: "403 Jumeirah Beach Rd, Al Athar Street, Dubai",
    services: [
      { name: "Deep Tissue Muscle Relief", price: "520 AED", duration: "60 mins" },
      { name: "Hair Spa & Deep Conditioning", price: "290 AED", duration: "45 mins" }
    ],
    date: "2026-07-28",
    time: "14:00",
    customer: {
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+971 50 123 4567"
    },
    paymentMethod: "online",
    paymentRef: "PAY-987412",
    total: "810 AED",
    status: "Paid",
    createdAt: "2026-07-25T14:00:00.000Z"
  }
];

export function loadBookings(): StoredBooking[] {
  if (typeof window === "undefined") return DEFAULT_BOOKINGS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) {
      window.localStorage.setItem(KEY, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    const parsed = JSON.parse(raw) as StoredBooking[];
    return parsed.length > 0 ? parsed : DEFAULT_BOOKINGS;
  } catch {
    return DEFAULT_BOOKINGS;
  }
}

export function saveBooking(b: StoredBooking) {
  if (typeof window === "undefined") return;
  const all = loadBookings().filter((x) => x.bookingId !== b.bookingId);
  all.unshift(b);
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function updateBooking(id: string, patch: Partial<StoredBooking>) {
  if (typeof window === "undefined") return;
  const all = loadBookings().map((b) => (b.bookingId === id ? { ...b, ...patch } : b));
  window.localStorage.setItem(KEY, JSON.stringify(all));
}

export function findBooking(id: string): StoredBooking | undefined {
  return loadBookings().find((b) => b.bookingId === id);
}

export type BookingBucket = "upcoming" | "completed" | "cancelled";

export function bucketOf(b: StoredBooking): BookingBucket {
  const s = b.status.toLowerCase();
  if (s.includes("cancel")) return "cancelled";
  if (s.includes("complete")) return "completed";
  // Auto-complete if the appointment date+time is >2h in the past.
  const dt = new Date(`${b.date}T${b.time || "00:00"}:00`);
  if (!isNaN(dt.getTime()) && Date.now() - dt.getTime() > 2 * 60 * 60 * 1000) return "completed";
  return "upcoming";
}
