import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, RefreshCw, Ban, Receipt, Search, CheckCircle2, CircleDot, XCircle } from "lucide-react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { loadBookings, bucketOf, updateBooking, type StoredBooking, type BookingBucket } from "@/lib/bookings-store";
import { getBookingStatuses, cancelBooking } from "@/lib/bookings.functions";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My bookings — Saloon System" },
      { name: "description", content: "Track your upcoming, completed and cancelled appointments with live status from ERPNext." },
      { property: "og:title", content: "My bookings — Saloon System" },
      { property: "og:description", content: "Track your upcoming, completed and cancelled appointments with live status from ERPNext." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingsPage,
});

const TABS: { key: BookingBucket; label: string; icon: React.ReactNode }[] = [
  { key: "upcoming", label: "Upcoming", icon: <CircleDot className="h-4 w-4" /> },
  { key: "completed", label: "Completed", icon: <CheckCircle2 className="h-4 w-4" /> },
  { key: "cancelled", label: "Cancelled", icon: <XCircle className="h-4 w-4" /> },
];

function statusColor(s: string) {
  const t = s.toLowerCase();
  if (t.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
  if (t.includes("complete")) return "bg-zinc-100 text-zinc-700 border-zinc-200";
  if (t.includes("paid") || t.includes("confirm")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (t.includes("service") || t.includes("check")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
  return "bg-amber-50 text-amber-700 border-amber-200";
}

function BookingsPage() {
  const [tab, setTab] = useState<BookingBucket>("upcoming");
  const [bookings, setBookings] = useState<StoredBooking[]>([]);
  const [q, setQ] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  const syncStatuses = useMemo(
    () => async () => {
      const current = loadBookings();
      if (current.length === 0) {
        setLastSync(new Date().toLocaleTimeString());
        return;
      }
      setSyncing(true);
      try {
        const ids = current.filter((b) => bucketOf(b) === "upcoming").map((b) => b.bookingId);
        if (ids.length) {
          const res = await getBookingStatuses({ data: { ids } });
          for (const id of ids) {
            if (res[id]) updateBooking(id, { status: res[id].status });
          }
        }
        setBookings(loadBookings());
        setLastSync(new Date().toLocaleTimeString());
      } finally {
        setSyncing(false);
      }
    },
    [],
  );

  useEffect(() => {
    syncStatuses();
    const t = setInterval(syncStatuses, 30000);
    return () => clearInterval(t);
  }, [syncStatuses]);

  async function onCancel(id: string) {
    if (!confirm("Cancel this booking? This will notify ERPNext.")) return;
    const res = await cancelBooking({ data: { bookingId: id } });
    updateBooking(id, { status: res.status });
    setBookings(loadBookings());
  }

  const filtered = bookings
    .filter((b) => bucketOf(b) === tab)
    .filter((b) => {
      if (!q.trim()) return true;
      const s = q.toLowerCase();
      return (
        b.venueName.toLowerCase().includes(s) ||
        b.bookingId.toLowerCase().includes(s) ||
        b.services.some((sv) => sv.name.toLowerCase().includes(s))
      );
    });

  const counts = {
    upcoming: bookings.filter((b) => bucketOf(b) === "upcoming").length,
    completed: bookings.filter((b) => bucketOf(b) === "completed").length,
    cancelled: bookings.filter((b) => bucketOf(b) === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto pb-24">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">My bookings</h1>
              <p className="text-zinc-500 mt-1 text-sm">
                Live status synced from ERPNext{lastSync ? ` · updated ${lastSync}` : ""}
              </p>
            </div>
            <button
              onClick={syncStatuses}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 self-start"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
              {syncing ? "Syncing…" : "Refresh"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
            <div className="flex bg-white rounded-full border border-gray-200 p-1">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                    tab === t.key ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"
                  }`}
                >
                  {t.icon}
                  {t.label}
                  <span className={`ml-1 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? "bg-white/20" : "bg-zinc-100"}`}>
                    {counts[t.key]}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by salon, service or reference…"
                className="w-full rounded-full border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab + filtered.length}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {filtered.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center">
                  <Calendar className="h-10 w-10 mx-auto text-zinc-400 mb-3" />
                  <div className="font-semibold text-lg">No {tab} bookings</div>
                  <p className="text-sm text-zinc-500 mt-1 mb-6">
                    {tab === "upcoming"
                      ? "Book a treatment and it will appear here with live status."
                      : `Your ${tab} bookings will show up here.`}
                  </p>
                  <Link
                    to="/marketplace"
                    className="inline-flex rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-800"
                  >
                    Browse the marketplace
                  </Link>
                </div>
              ) : (
                filtered.map((b) => (
                  <div
                    key={b.bookingId}
                    className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row gap-5"
                  >
                    {b.venueImage && (
                      <img
                        src={b.venueImage}
                        alt={b.venueName}
                        className="h-24 w-full sm:h-28 sm:w-28 rounded-2xl object-cover shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start gap-3 justify-between">
                        <div className="min-w-0">
                          <div className="font-bold text-lg truncate">{b.venueName}</div>
                          {b.venueAddress && (
                            <div className="text-xs text-zinc-500 flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3" /> {b.venueAddress}
                            </div>
                          )}
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusColor(b.status)}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                          {b.status}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-zinc-600">
                        <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {b.date}</span>
                        <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {b.time}</span>
                        <span className="font-mono text-xs text-zinc-400">{b.bookingId}</span>
                      </div>

                      <div className="mt-3 text-sm">
                        {b.services.map((s) => s.name).join(" · ")}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-sm">
                          <span className="text-zinc-500">Total</span>{" "}
                          <span className="font-semibold">{b.total}</span>{" "}
                          <span className="text-zinc-400">· {b.paymentMethod === "online" ? "Paid online" : "Pay at salon"}</span>
                        </div>
                        <div className="flex gap-2">
                          <Link
                            to="/bookings/$id"
                            params={{ id: b.bookingId }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50"
                          >
                            <Receipt className="h-4 w-4" /> Receipt
                          </Link>
                          {bucketOf(b) === "upcoming" && (
                            <button
                              onClick={() => onCancel(b.bookingId)}
                              className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 text-rose-700 px-4 py-2 text-sm font-semibold hover:bg-rose-50"
                            >
                              <Ban className="h-4 w-4" /> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <MarketplaceFooter />
    </div>
  );
}
