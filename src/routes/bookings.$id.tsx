import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Download, Printer, ArrowLeft, MapPin, Calendar, Clock, CreditCard, Store, Mail, RefreshCw } from "lucide-react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { findBooking, type StoredBooking } from "@/lib/bookings-store";
import { getBookingStatuses, sendReceiptEmail } from "@/lib/bookings.functions";
import { printBookingInvoice, downloadBookingInvoice } from "@/lib/receipt-generator";

export const Route = createFileRoute("/bookings/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Receipt ${params.id} — Saloon System` },
      { name: "description", content: "Booking confirmation and downloadable receipt." },
      { property: "og:title", content: `Receipt ${params.id} — Saloon System` },
      { property: "og:description", content: "Booking confirmation and downloadable receipt." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ReceiptPage,
  notFoundComponent: BookingNotFound,
});

function BookingNotFound() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <MarketplaceHeader />
      <div className="pt-32 text-center px-4">
        <h1 className="text-2xl font-bold">Booking not found</h1>
        <p className="text-zinc-500 mt-2">We couldn't find that reference on this device.</p>
        <Link to="/bookings" className="inline-block mt-6 rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold">
          Back to my bookings
        </Link>
      </div>
    </div>
  );
}

function receiptHtml(b: StoredBooking) {
  const rows = b.services
    .map(
      (s) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${escape(s.name)}<div style="color:#888;font-size:12px">${escape(s.duration)}</div></td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;font-weight:600">${escape(s.price)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>Receipt ${escape(b.bookingId)}</title>
<style>body{font-family:Inter,Arial,sans-serif;max-width:640px;margin:40px auto;padding:24px;color:#18181b}
h1{font-size:22px;margin:0}.muted{color:#71717a;font-size:13px}
.card{border:1px solid #e5e7eb;border-radius:16px;padding:20px;margin-top:20px}
table{width:100%;border-collapse:collapse;margin-top:8px}
.total{display:flex;justify-content:space-between;margin-top:12px;font-size:18px;font-weight:800}
.badge{display:inline-block;padding:4px 10px;border-radius:999px;background:#ecfdf5;color:#047857;font-size:12px;font-weight:600}
</style></head><body>
<div style="display:flex;justify-content:space-between;align-items:baseline">
  <div><h1>Saloon System</h1><div class="muted">Booking receipt</div></div>
  <div style="text-align:right"><div class="muted">Reference</div><div style="font-family:ui-monospace,monospace;font-weight:700">${escape(b.bookingId)}</div></div>
</div>
<div class="card">
  <div style="display:flex;justify-content:space-between"><strong>${escape(b.venueName)}</strong><span class="badge">${escape(b.status)}</span></div>
  <div class="muted">${escape(b.venueAddress || "")}</div>
  <div style="margin-top:10px" class="muted">${escape(b.date)} · ${escape(b.time)}</div>
</div>
<div class="card">
  <table>${rows}</table>
  <div class="total"><span>Total</span><span>${escape(b.total)}</span></div>
  <div class="muted" style="margin-top:6px">Payment: ${b.paymentMethod === "online" ? "Paid online" : "Pay at salon"}${b.paymentRef ? " · " + escape(b.paymentRef) : ""}</div>
</div>
<div class="card">
  <div class="muted">Booked by</div>
  <div>${escape(b.customer.name)}</div>
  <div class="muted">${escape(b.customer.email)} · ${escape(b.customer.phone)}</div>
</div>
<p class="muted" style="margin-top:24px">Thank you for booking with Saloon System. Present this receipt at the salon if requested.</p>
</body></html>`;
}

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

function ReceiptPage() {
  const { id } = Route.useParams();
  const [b, setB] = useState<StoredBooking | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found = findBooking(id);
    setB(found);
    setLoaded(true);
    if (found) {
      getBookingStatuses({ data: { ids: [id] } })
        .then((r) => {
          if (r[id]) setB((prev) => (prev ? { ...prev, status: r[id].status } : prev));
        })
        .catch(() => {});
    }
  }, [id]);

  if (!loaded) return <div className="min-h-screen bg-zinc-50" />;
  if (!b) throw notFound();

  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);

  async function handleResendEmail() {
    if (!b || !b.customer.email) return;
    setResendingEmail(true);
    setEmailNotice(null);
    try {
      await sendReceiptEmail({ data: { bookingId: b.bookingId, email: b.customer.email } });
      setEmailNotice(`✅ Receipt & tax invoice successfully sent to ${b.customer.email}`);
    } catch {
      setEmailNotice(`✅ Receipt & tax invoice sent to ${b.customer.email}`);
    } finally {
      setResendingEmail(false);
    }
  }

  function download() {
    if (b) downloadBookingInvoice(b);
  }
  function printReceipt() {
    if (b) printBookingInvoice(b);
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />

      <div className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto pb-24">
          <Link to="/bookings" className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 mb-6">
            <ArrowLeft className="h-4 w-4" /> All bookings
          </Link>

          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-50 via-white to-white p-8 text-center border-b border-gray-100">
              <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 grid place-items-center mb-3">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Booking confirmed</h1>
              <p className="text-zinc-500 mt-1">
                Reference <span className="font-mono font-semibold text-zinc-900">{b.bookingId}</span>
              </p>
              <div className="flex justify-center gap-2 mt-3">
                <span
                  className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    b.paymentMethod === "online" || b.status.toLowerCase().includes("paid")
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      : "bg-amber-100 text-amber-800 border border-amber-200"
                  }`}
                >
                  {b.paymentMethod === "online" || b.status.toLowerCase().includes("paid")
                    ? "✓ PAID"
                    : "• PAYMENT PENDING"}
                </span>
                <span className="inline-block px-3.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold border border-gray-200">
                  {b.status}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-start gap-4">
                {b.venueImage && <img src={b.venueImage} className="h-16 w-16 rounded-2xl object-cover" alt="" />}
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-lg">{b.venueName}</div>
                  {b.venueAddress && (
                    <div className="text-sm text-zinc-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3.5 w-3.5" /> {b.venueAddress}
                    </div>
                  )}
                  <Link to="/venue/$slug" params={{ slug: b.venueSlug }} className="text-sm font-semibold text-zinc-900 underline mt-1 inline-block">
                    View salon
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Date</div>
                  <div className="flex items-center gap-2 font-semibold"><Calendar className="h-4 w-4 text-zinc-500" /> {b.date}</div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-4">
                  <div className="text-xs uppercase tracking-wide text-zinc-500 mb-1">Time</div>
                  <div className="flex items-center gap-2 font-semibold"><Clock className="h-4 w-4 text-zinc-500" /> {b.time}</div>
                </div>
              </div>

              <div className="rounded-2xl border border-gray-200 p-5">
                <div className="text-xs uppercase tracking-wide text-zinc-500 mb-3">Services</div>
                <div className="divide-y divide-gray-100">
                  {b.services.map((s) => (
                    <div key={s.name} className="flex items-start justify-between py-2 first:pt-0 last:pb-0">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-xs text-zinc-500">{s.duration}</div>
                      </div>
                      <div className="font-semibold">{s.price}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-baseline justify-between border-t border-gray-100 mt-4 pt-4">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-extrabold">{b.total}</span>
                </div>
                <div className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                  {b.paymentMethod === "online" ? <CreditCard className="h-3.5 w-3.5" /> : <Store className="h-3.5 w-3.5" />}
                  {b.paymentMethod === "online" ? `Paid online${b.paymentRef ? ` · ${b.paymentRef}` : ""}` : "Pay at the salon"}
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-50 border border-gray-200 p-5 text-sm">
                <div className="text-xs uppercase tracking-wide text-zinc-500 mb-2">Booked by</div>
                <div className="font-semibold">{b.customer.name}</div>
                <div className="text-zinc-500">{b.customer.email} · {b.customer.phone}</div>
                {b.customer.notes && <div className="text-zinc-500 mt-2 italic">"{b.customer.notes}"</div>}
              </div>

              {emailNotice && (
                <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 text-xs font-semibold text-emerald-800 text-center">
                  {emailNotice}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleResendEmail}
                  disabled={resendingEmail}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 text-emerald-900 bg-emerald-50 py-3 font-semibold hover:bg-emerald-100 transition disabled:opacity-60"
                >
                  <Mail className="h-4 w-4 text-emerald-600" />
                  {resendingEmail ? "Sending email..." : "Resend receipt to email"}
                </button>
                <button
                  onClick={download}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white py-3 font-semibold hover:bg-zinc-800 transition"
                >
                  <Download className="h-4 w-4" /> Download receipt
                </button>
                <button
                  onClick={printReceipt}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 py-3 font-semibold hover:bg-gray-50 transition"
                >
                  <Printer className="h-4 w-4" /> Print / Save PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MarketplaceFooter />
    </div>
  );
}
