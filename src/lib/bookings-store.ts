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

export function loadBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredBooking[]) : [];
  } catch {
    return [];
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
