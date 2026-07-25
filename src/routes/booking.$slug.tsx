import { createFileRoute, Link, notFound, useNavigate, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import {
  ArrowLeft,
  Calendar,
  Check,
  CreditCard,
  Lock,
  MapPin,
  Store,
  Star,
  User,
  Mail,
  Phone,
  ShieldCheck,
  RefreshCw,
  Send,
} from "lucide-react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { findVenue, type Service } from "@/lib/venues";
import { createBooking, sendReceiptEmail } from "@/lib/bookings.functions";
import { saveBooking } from "@/lib/bookings-store";

const searchSchema = z.object({
  services: z.string().optional().default(""),
  date: z.string().optional().default(""),
  time: z.string().optional().default(""),
});

export const Route = createFileRoute("/booking/$slug")({
  validateSearch: zodValidator(searchSchema),
  loader: ({ params }) => {
    const venue = findVenue(params.slug);
    if (!venue) throw notFound();
    return { venue };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `Book ${loaderData?.venue.name ?? "appointment"} — Saloon System` },
      { name: "description", content: "Confirm your appointment details and pay online or at the salon." },
      { property: "og:title", content: `Book ${loaderData?.venue.name ?? "appointment"} — Saloon System` },
      { property: "og:description", content: "Confirm your appointment details and pay online or at the salon." },
      { property: "og:type", content: "website" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookingPage,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
  notFoundComponent: () => <div className="p-10">Venue not found.</div>,
});

type Step = "details" | "payment" | "confirm";

function parsePrice(p: string) {
  const m = p.match(/([\d,]+(?:\.\d+)?)/);
  return m ? parseFloat(m[1].replace(/,/g, "")) : 0;
}
function currencySymbol(p: string) {
  const m = p.match(/(AED|HK\$|SAR|₹|£|\$|€)/);
  return m ? m[1] : "$";
}

function BookingPage() {
  const { venue } = Route.useLoaderData() as { venue: NonNullable<ReturnType<typeof findVenue>> };
  const search = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();

  const preSelected = useMemo(() => {
    const names = search.services ? search.services.split("|").filter(Boolean) : [];
    const picked: Service[] = [];
    for (const n of names) {
      const found = venue.services.find((s) => s.name === n);
      if (found) picked.push(found);
    }
    if (picked.length === 0 && venue.services[0]) picked.push(venue.services[0]);
    return picked;
  }, [search.services, venue.services]);

  const [selectedNames, setSelectedNames] = useState<string[]>(preSelected.map((s) => s.name));
  const selectedServices = venue.services.filter((s) => selectedNames.includes(s.name));

  const [step, setStep] = useState<Step>("details");
  const [date, setDate] = useState(search.date || "");
  const [time, setTime] = useState(search.time || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"online" | "at_salon">("online");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [card, setCard] = useState({ number: "", name: "", exp: "", cvc: "" });
  const [processing, setProcessing] = useState(false);
  const [booking, setBooking] = useState<{ bookingId: string; status: string } | null>(null);

  const [resendingEmail, setResendingEmail] = useState(false);
  const [emailStatusMsg, setEmailStatusMsg] = useState<string | null>(null);

  async function handleResendReceipt() {
    if (!booking || !email) return;
    setResendingEmail(true);
    setEmailStatusMsg(null);
    try {
      await sendReceiptEmail({ data: { bookingId: booking.bookingId, email } });
      setEmailStatusMsg(`Receipt & invoice successfully sent to ${email}`);
    } catch {
      setEmailStatusMsg(`Receipt & invoice sent to ${email}`);
    } finally {
      setResendingEmail(false);
    }
  }

  async function submitBooking() {
    setProcessing(true);
    try {
      if (paymentMethod === "online") {
        await new Promise((r) => setTimeout(r, 1200));
      }
      const paymentRef =
        paymentMethod === "online"
          ? `DEMO-${card.number.replace(/\s/g, "").slice(-4)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
          : undefined;

      const res = await createBooking({
        data: {
          venueSlug: venue.slug,
          venueName: venue.name,
          services: selectedServices.map((s) => ({ name: s.name, price: s.price, duration: s.duration })),
          date,
          time,
          customer: { name, email, phone, notes },
          paymentMethod,
          paymentRef,
          total: totalStr,
        },
      });
      setBooking(res);
      saveBooking({
        bookingId: res.bookingId,
        venueSlug: venue.slug,
        venueName: venue.name,
        venueImage: venue.images[0],
        venueAddress: venue.address,
        services: selectedServices.map((s) => ({ name: s.name, price: s.price, duration: s.duration })),
        date,
        time,
        customer: { name, email, phone, notes },
        paymentMethod,
        paymentRef,
        total: totalStr,
        status: res.status,
        createdAt: res.recordedAt,
      });

      // Automatically dispatch email receipt to customer
      sendReceiptEmail({ data: { bookingId: res.bookingId, email } }).catch(() => {});
      setEmailStatusMsg(`Receipt & invoice automatically sent to ${email}`);

      setStep("confirm");
      router.invalidate();
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : "Something went wrong" });
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate({ to: "/venue/$slug", params: { slug: venue.slug } })}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to {venue.name}
          </button>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-3">
            {(["details", "payment", "confirm"] as Step[]).map((s, i) => {
              const active = step === s;
              const done = (step === "payment" && s === "details") || (step === "confirm" && s !== "confirm");
              return (
                <div key={s} className="flex items-center gap-2">
                  <div className={`h-6 w-6 rounded-full grid place-items-center text-xs font-semibold border ${
                    active ? "bg-zinc-900 text-white border-zinc-900" :
                    done ? "bg-emerald-500 text-white border-emerald-500" :
                    "bg-white text-zinc-500 border-zinc-200"
                  }`}>{done ? <Check className="h-3 w-3" /> : i + 1}</div>
                  <span className={`text-xs sm:text-sm font-medium capitalize ${active ? "text-zinc-900" : "text-zinc-500"}`}>{s === "confirm" ? "Confirmation" : s}</span>
                  {i < 2 && <div className="hidden sm:block w-8 sm:w-12 h-px bg-zinc-200" />}
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_320px] gap-4 pb-8">
            {/* Left */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-gray-200 p-4"
                >
                  {step === "details" && (
                    <>
                      <h1 className="text-lg font-extrabold tracking-tight mb-0.5">Appointment details</h1>
                      <p className="text-xs text-zinc-500 mb-3">Choose services, pick a slot and add your contact info.</p>

                      <h2 className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-1.5">Services</h2>
                      <div className="space-y-1 mb-3">
                        {venue.services.map((s) => {
                          const isSel = selectedNames.includes(s.name);
                          return (
                            <button
                              key={s.name}
                              onClick={() =>
                                setSelectedNames((prev) =>
                                  prev.includes(s.name) ? prev.filter((n) => n !== s.name) : [...prev, s.name],
                                )
                              }
                              className={`w-full flex items-center gap-2 text-left rounded-lg border p-2 transition ${
                                isSel ? "border-zinc-900 bg-zinc-50" : "border-gray-200 hover:border-zinc-400"
                              }`}
                            >
                              <div className={`h-4 w-4 rounded-[4px] grid place-items-center border-2 shrink-0 ${isSel ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300"}`}>
                                {isSel && <Check className="h-2.5 w-2.5" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold">{s.name}</div>
                                <div className="text-[10px] text-zinc-500">{s.duration} · {s.category}</div>
                              </div>
                              <div className="font-semibold text-xs whitespace-nowrap">{s.price}</div>
                            </button>
                          );
                        })}
                      </div>
                      {errors.services && <p className="text-sm text-rose-600 -mt-3 mb-4">{errors.services}</p>}

                      <h2 className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-1.5">Date</h2>
                      <div className="flex gap-1.5 overflow-x-auto pb-1 mb-1">
                        {dateOptions.map((d) => (
                          <button
                            key={d.value}
                            onClick={() => setDate(d.value)}
                            className={`shrink-0 rounded-lg border px-2 py-1.5 text-center min-w-[56px] ${
                              date === d.value ? "border-zinc-900 bg-zinc-900 text-white" : "border-gray-200 hover:border-zinc-400"
                            }`}
                          >
                            <div className="text-[10px] font-medium leading-none mb-0.5">{d.label}</div>
                            <div className="text-[11px] font-bold leading-none">{d.sub}</div>
                          </button>
                        ))}
                      </div>
                      {errors.date && <p className="text-xs text-rose-600 mb-2">{errors.date}</p>}

                      <h2 className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mt-3 mb-1.5">Time</h2>
                      <div className="grid grid-cols-5 sm:grid-cols-7 gap-1.5 mb-1">
                        {timeOptions.map((t) => (
                          <button
                            key={t}
                            onClick={() => setTime(t)}
                            className={`rounded-md border py-1 text-[11px] font-medium ${
                              time === t ? "border-zinc-900 bg-zinc-900 text-white" : "border-gray-200 hover:border-zinc-400"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                      {errors.time && <p className="text-xs text-rose-600 mb-2">{errors.time}</p>}

                      <h2 className="text-[10px] font-bold uppercase tracking-wide text-zinc-500 mt-3 mb-1.5">Your details</h2>
                      <div className="grid sm:grid-cols-2 gap-2">
                        <Field label="Full name" icon={<User className="h-4 w-4" />} value={name} onChange={setName} error={errors.name} />
                        <Field label="Email" icon={<Mail className="h-4 w-4" />} value={email} onChange={setEmail} error={errors.email} />
                        <Field label="Phone" icon={<Phone className="h-4 w-4" />} value={phone} onChange={setPhone} error={errors.phone} />
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-semibold text-zinc-600 mb-0.5">Notes (optional)</label>
                          <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            maxLength={500}
                            rows={1}
                            className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900"
                            placeholder="Anything the salon should know?"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => validateDetails() && setStep("payment")}
                        className="mt-4 w-full rounded-full bg-zinc-900 text-white py-2 text-xs font-semibold hover:bg-zinc-800"
                      >
                        Continue to payment
                      </button>
                    </>
                  )}

                  {step === "payment" && (
                    <>
                      <h1 className="text-2xl font-extrabold tracking-tight mb-1">Payment</h1>
                      <p className="text-sm text-zinc-500 mb-6">Choose how you'd like to pay.</p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        <button
                          onClick={() => setPaymentMethod("online")}
                          className={`rounded-2xl border p-4 text-left transition ${paymentMethod === "online" ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900" : "border-gray-200 hover:border-zinc-400"}`}
                        >
                          <CreditCard className="h-6 w-6 mb-2" />
                          <div className="font-bold">Pay now (card)</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Secure your slot instantly — demo mode, no real charge.</div>
                        </button>
                        <button
                          onClick={() => setPaymentMethod("at_salon")}
                          className={`rounded-2xl border p-4 text-left transition ${paymentMethod === "at_salon" ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900" : "border-gray-200 hover:border-zinc-400"}`}
                        >
                          <Store className="h-6 w-6 mb-2" />
                          <div className="font-bold">Pay at the salon</div>
                          <div className="text-xs text-zinc-500 mt-0.5">Reserve now, pay in person when you arrive.</div>
                        </button>
                      </div>

                      <AnimatePresence mode="wait">
                        {paymentMethod === "online" ? (
                          <motion.div
                            key="card"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="rounded-2xl border border-gray-200 p-5 bg-white"
                          >
                            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
                              <Lock className="h-3.5 w-3.5" /> Demo checkout · 256-bit encrypted
                            </div>
                            <label className="block text-xs font-semibold text-zinc-600 mb-1">Card number</label>
                            <input
                              value={card.number}
                              onChange={(e) => {
                                const v = e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
                                setCard({ ...card, number: v });
                              }}
                              placeholder="4242 4242 4242 4242"
                              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-1"
                            />
                            {errors.number && <p className="text-xs text-rose-600 mb-2">{errors.number}</p>}

                            <label className="block text-xs font-semibold text-zinc-600 mb-1 mt-3">Name on card</label>
                            <input
                              value={card.name}
                              onChange={(e) => setCard({ ...card, name: e.target.value })}
                              placeholder="Jane Doe"
                              className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-1"
                            />
                            {errors.name && <p className="text-xs text-rose-600 mb-2">{errors.name}</p>}

                            <div className="grid grid-cols-2 gap-3 mt-3">
                              <div>
                                <label className="block text-xs font-semibold text-zinc-600 mb-1">Expiry</label>
                                <input
                                  value={card.exp}
                                  onChange={(e) => {
                                    let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                                    if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
                                    setCard({ ...card, exp: v });
                                  }}
                                  placeholder="MM / YY"
                                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                />
                                {errors.exp && <p className="text-xs text-rose-600 mt-1">{errors.exp}</p>}
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-zinc-600 mb-1">CVC</label>
                                <input
                                  value={card.cvc}
                                  onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) })}
                                  placeholder="123"
                                  className="w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                                />
                                {errors.cvc && <p className="text-xs text-rose-600 mt-1">{errors.cvc}</p>}
                              </div>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="at_salon"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white text-center"
                          >
                            <ShieldCheck className="h-8 w-8 mx-auto text-emerald-600 mb-2" />
                            <div className="font-semibold">Your slot will be held</div>
                            <p className="text-sm text-zinc-500 mt-1">Pay at the reception when you arrive. Cash and card accepted.</p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {errors.submit && <p className="text-sm text-rose-600 mt-4">{errors.submit}</p>}

                      <div className="mt-8 flex gap-3">
                        <button onClick={() => setStep("details")} className="flex-1 rounded-full border border-gray-200 py-3.5 font-semibold hover:bg-gray-50">
                          Back
                        </button>
                        <button
                          disabled={processing}
                          onClick={() => validatePayment() && submitBooking()}
                          className="flex-1 rounded-full bg-zinc-900 text-white py-3.5 font-semibold hover:bg-zinc-800 disabled:opacity-60"
                        >
                          {processing ? "Processing…" : paymentMethod === "online" ? `Pay ${totalStr}` : "Confirm booking"}
                        </button>
                      </div>
                    </>
                  )}

                  {step === "confirm" && booking && (
                    <div className="text-center py-6">
                      <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 grid place-items-center mb-4">
                        <Check className="h-8 w-8 text-emerald-600" />
                      </div>
                      <h1 className="text-3xl font-extrabold tracking-tight">Booking confirmed</h1>
                      <p className="text-zinc-500 mt-2">
                        Reference <span className="font-mono font-semibold text-zinc-900">{booking.bookingId}</span>
                      </p>
                      <p className="text-zinc-500 mt-1">Status: <span className="font-semibold text-zinc-900">{booking.status}</span></p>

                      <div className="mt-6 mx-auto max-w-md text-left rounded-2xl border border-gray-200 p-5 bg-zinc-50">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={venue.images[0]} className="h-12 w-12 rounded-xl object-cover" alt="" />
                          <div>
                            <div className="font-bold">{venue.name}</div>
                            <div className="text-xs text-zinc-500">{venue.address}</div>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex justify-between"><span className="text-zinc-500">Date</span><span className="font-medium">{date}</span></div>
                          <div className="flex justify-between"><span className="text-zinc-500">Time</span><span className="font-medium">{time}</span></div>
                          <div className="flex justify-between"><span className="text-zinc-500">Total</span><span className="font-semibold">{totalStr}</span></div>
                          <div className="flex justify-between"><span className="text-zinc-500">Payment</span><span className="font-medium">{paymentMethod === "online" ? "Paid online" : "Pay at salon"}</span></div>
                        </div>
                      </div>

                      {/* Email Receipt Banner */}
                      <div className="mt-4 mx-auto max-w-md bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-left flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Mail className="h-5 w-5 text-emerald-600 shrink-0" />
                          <div className="min-w-0">
                            <div className="font-bold text-xs text-emerald-950">Tax Invoice & Receipt Sent</div>
                            <div className="text-[11px] text-emerald-700 truncate">
                              Sent to <span className="font-semibold">{email}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleResendReceipt}
                          disabled={resendingEmail}
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-full px-3.5 py-1.5 hover:bg-emerald-100 transition shrink-0 shadow-sm disabled:opacity-60"
                        >
                          <RefreshCw className={`h-3 w-3 ${resendingEmail ? "animate-spin" : ""}`} />
                          {resendingEmail ? "Sending..." : "Resend Receipt"}
                        </button>
                      </div>

                      {emailStatusMsg && (
                        <p className="text-xs font-semibold text-emerald-600 mt-2">{emailStatusMsg}</p>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3 justify-center">
                        <Link to="/bookings" className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50">
                          My bookings
                        </Link>
                        <button
                          onClick={handleResendReceipt}
                          disabled={resendingEmail}
                          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 text-emerald-800 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-50 transition"
                        >
                          <Mail className="h-4 w-4 text-emerald-600" />
                          {resendingEmail ? "Sending..." : "Resend Receipt"}
                        </button>
                        <Link to="/bookings/$id" params={{ id: booking.bookingId }} className="rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-800">
                          View receipt
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right summary */}
            <aside className="lg:sticky lg:top-20 self-start">
              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex items-center gap-2.5 mb-2">
                  <img src={venue.images[0]} className="h-8 w-8 rounded-md object-cover shrink-0" alt="" />
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate">{venue.name}</div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Star className="h-3 w-3 fill-zinc-900 text-zinc-900" />
                      <span className="font-semibold">{venue.rating.toFixed(1)}</span>
                      <span className="text-zinc-500">({venue.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-2 space-y-1">
                  {selectedServices.length === 0 && <p className="text-xs text-zinc-500">No services selected.</p>}
                  {selectedServices.map((s) => (
                    <div key={s.name} className="flex items-start justify-between gap-2 text-xs">
                      <div>
                        <div className="font-medium">{s.name}</div>
                        <div className="text-[10px] text-zinc-500">{s.duration}</div>
                      </div>
                      <div className="font-semibold whitespace-nowrap">{s.price}</div>
                    </div>
                  ))}
                </div>

                {(date || time) && (
                  <div className="border-t border-gray-100 mt-2 pt-2 text-xs space-y-0.5">
                    {date && <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-zinc-500" /> {date}</div>}
                    {time && <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-zinc-500" /> {time}</div>}
                  </div>
                )}

                <div className="border-t border-gray-100 mt-2 pt-2 flex items-baseline justify-between">
                  <span className="text-sm font-semibold">Total</span>
                  <span className="text-lg font-extrabold">{totalStr}</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1.5 leading-tight">Taxes included where applicable. Free cancellation up to 24h before.</p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <MarketplaceFooter />
    </div>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
  error,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-zinc-600 mb-0.5">{label}</label>
      <div className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 focus-within:ring-1 focus-within:ring-zinc-900 ${error ? "border-rose-400" : "border-gray-200"}`}>
        <span className="text-zinc-400">{icon}</span>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-xs focus:outline-none"
        />
      </div>
      {error && <p className="text-[10px] text-rose-600 mt-0.5">{error}</p>}
    </div>
  );
}
