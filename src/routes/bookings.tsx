import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, RefreshCw, Ban, Receipt, Search, CheckCircle2, CircleDot, XCircle } from "lucide-react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { loadBookings, bucketOf, updateBooking, type StoredBooking, type BookingBucket } from "@/lib/bookings-store";
import { getBookingStatuses, cancelBooking } from "@/lib/bookings.functions";
import { printBookingInvoice, downloadBookingInvoice } from "@/lib/receipt-generator";

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
  const [selectedReceipt, setSelectedReceipt] = useState<StoredBooking | null>(null);

  const [rescheduleBooking, setRescheduleBooking] = useState<StoredBooking | null>(null);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const timeSlots = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30", "18:00", "19:30"];

  useEffect(() => {
    setBookings(loadBookings());
  }, []);

  function handleSaveReschedule() {
    if (!rescheduleBooking || !newDate || !newTime) return;
    updateBooking(rescheduleBooking.bookingId, { date: newDate, time: newTime });
    const updated = loadBookings();
    setBookings(updated);
    if (selectedReceipt && selectedReceipt.bookingId === rescheduleBooking.bookingId) {
      setSelectedReceipt({ ...selectedReceipt, date: newDate, time: newTime });
    }
    setRescheduleBooking(null);
  }

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
                          <button
                            onClick={() => setSelectedReceipt(b)}
                            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition"
                          >
                            <Receipt className="h-4 w-4" /> Receipt
                          </button>
                          {bucketOf(b) === "upcoming" && (
                            <>
                              <button
                                onClick={() => {
                                  setRescheduleBooking(b);
                                  setNewDate(b.date);
                                  setNewTime(b.time);
                                }}
                                className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 text-indigo-700 px-4 py-2 text-sm font-semibold hover:bg-indigo-50 transition"
                              >
                                <Clock className="h-4 w-4" /> Reschedule
                              </button>
                              <button
                                onClick={() => onCancel(b.bookingId)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 text-rose-700 px-4 py-2 text-sm font-semibold hover:bg-rose-50"
                              >
                                <Ban className="h-4 w-4" /> Cancel
                              </button>
                            </>
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

      {/* Interactive Receipt Modal */}
      <AnimatePresence>
        {selectedReceipt && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => setSelectedReceipt(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-gray-100 grid place-items-center text-zinc-500 hover:bg-gray-200 transition"
              >
                ✕
              </button>

              {/* Header Badge & Title */}
              <div className="text-center pb-6 border-b border-gray-100">
                <span
                  className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${
                    selectedReceipt.paymentMethod === "online" || selectedReceipt.status.toLowerCase().includes("paid")
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {selectedReceipt.paymentMethod === "online" || selectedReceipt.status.toLowerCase().includes("paid")
                    ? "✓ PAID"
                    : "• PAYMENT PENDING"}
                </span>
                <h2 className="text-2xl font-extrabold text-zinc-900">Official Receipt</h2>
                <p className="text-xs text-zinc-500 font-mono mt-1">Invoice #{selectedReceipt.bookingId}</p>
              </div>

              {/* Customer Information */}
              <div className="py-6 space-y-4 border-b border-gray-100 text-sm">
                <div className="bg-zinc-50 rounded-2xl p-4 border border-gray-200">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Customer Details</div>
                  <div className="font-bold text-zinc-900 text-base">{selectedReceipt.customer.name}</div>
                  <div className="text-zinc-600">{selectedReceipt.customer.email}</div>
                  <div className="text-zinc-500 text-xs mt-0.5">{selectedReceipt.customer.phone}</div>
                </div>

                {/* Salon Information */}
                <div className="flex items-start gap-3 bg-zinc-50 rounded-2xl p-4 border border-gray-200">
                  {selectedReceipt.venueImage && (
                    <img src={selectedReceipt.venueImage} className="h-12 w-12 rounded-xl object-cover shrink-0" alt="" />
                  )}
                  <div className="min-w-0">
                    <div className="font-bold text-zinc-900 truncate">{selectedReceipt.venueName}</div>
                    <div className="text-xs text-zinc-500 truncate">{selectedReceipt.venueAddress}</div>
                    <div className="text-xs text-zinc-400 mt-1">{selectedReceipt.date} · {selectedReceipt.time}</div>
                  </div>
                </div>

                {/* Billed Services */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-400">Services Billed</div>
                  {selectedReceipt.services.map((s, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div>
                        <div className="font-semibold text-zinc-800">{s.name}</div>
                        <div className="text-xs text-zinc-400">{s.duration}</div>
                      </div>
                      <div className="font-bold text-zinc-900">{s.price}</div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 font-extrabold text-base text-zinc-900">
                    <span>Total Billed</span>
                    <span className="text-xl font-extrabold text-zinc-900">{selectedReceipt.total}</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => printBookingInvoice(selectedReceipt)}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white py-3 text-sm font-bold hover:bg-zinc-800 transition shadow-sm"
                >
                  🖨️ Print / Save Invoice PDF
                </button>
                <button
                  onClick={() => downloadBookingInvoice(selectedReceipt)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition"
                >
                  📥 Download
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Interactive Reschedule Modal */}
      <AnimatePresence>
        {rescheduleBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100"
            >
              <button
                onClick={() => setRescheduleBooking(null)}
                className="absolute top-5 right-5 h-9 w-9 rounded-full bg-gray-100 grid place-items-center text-zinc-500 hover:bg-gray-200 transition"
              >
                ✕
              </button>

              <div className="text-center pb-5 border-b border-gray-100">
                <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center mx-auto mb-2">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-extrabold text-zinc-900">Reschedule Appointment</h2>
                <p className="text-xs text-zinc-500 mt-1">{rescheduleBooking.venueName}</p>
                <p className="text-xs font-mono text-zinc-400 mt-0.5">Ref: {rescheduleBooking.bookingId}</p>
              </div>

              <div className="py-5 space-y-4">
                {/* Date Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Select New Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 p-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                {/* Time Slots */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
                    Select Available Time Slot
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setNewTime(slot)}
                        className={`py-2 rounded-xl text-xs font-bold transition border ${
                          newTime === slot
                            ? "bg-zinc-900 text-white border-zinc-900 shadow-sm"
                            : "bg-gray-50 text-zinc-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notice */}
                <div className="bg-indigo-50/80 rounded-2xl p-3.5 text-xs text-indigo-900 flex items-start gap-2">
                  <Clock className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
                  <div>
                    Rescheduling will update your appointment time and automatically refresh your tax invoice/receipt.
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleSaveReschedule}
                  className="flex-1 rounded-full bg-zinc-900 text-white py-3 text-sm font-bold hover:bg-zinc-800 transition shadow-sm"
                >
                  Save & Refresh Receipt
                </button>
                <button
                  onClick={() => setRescheduleBooking(null)}
                  className="rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <MarketplaceFooter />
    </div>
  );
}
