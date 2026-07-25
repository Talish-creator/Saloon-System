import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Calendar, Star, ArrowRight, Apple, QrCode, Navigation2, X, Heart, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { venues, cities, countries } from "@/lib/venues";
import { industries } from "@/lib/industries";
import { treatmentCategories } from "@/lib/treatments";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Book local selfcare services — Saloon System" },
      { name: "description", content: "Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide." },
      { property: "og:title", content: "Book local selfcare services — Saloon System" },
      { property: "og:description", content: "Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marketplace,
});

const treatmentTabs = [
  { key: "all", label: "All", count: null },
  { key: "treatments", label: "Treatments", count: "99+" },
  { key: "venues", label: "Venues", count: 398 },
  { key: "professionals", label: "Professionals", count: 128 },
] as const;

const treatmentResults = [
  { name: "BamFa Deshi", meta: "Gents Hair Style Expert · Baramunda, Bhubaneswar", distance: ">30 mi", img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=200&q=80" },
  { name: "Hair Paint", meta: "Administration work · Baramunda, Bhubaneswar", distance: ">30 mi", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=80" },
  { name: "Moroccan Spa - Pheonix Pallasio", meta: "Luxury Spa Segment · Gomti Nagar, Lucknow", distance: ">30 mi", img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&q=80" },
  { name: "SIGNATURE SPA", meta: "Wellness · Bandra, Mumbai", distance: ">30 mi", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&q=80" },
];

function fmtDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function Marketplace() {
  const [tab, setTab] = useState<(typeof treatmentTabs)[number]["key"]>("professionals");
  const [focused, setFocused] = useState<null | "treatment" | "where" | "when">(null);
  const [activeCountry, setActiveCountry] = useState("Mexico");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const featured = venues;

  // Animated counter — ticks up like the video
  const [count, setCount] = useState(324715);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3) + 1), 900);
    return () => clearInterval(id);
  }, []);

  const calendar = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const cells: (number | null)[] = Array.from({ length: first }, () => null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return { cells, todayDate: today.getDate() };
  }, []);
  const timeSlots = [
    { key: "any", label: "Any time", sub: "" },
    { key: "morning", label: "Morning", sub: "9am – 12pm" },
    { key: "afternoon", label: "Afternoon", sub: "12pm – 5pm" },
    { key: "evening", label: "Evening", sub: "5pm – 12am" },
    { key: "custom", label: "Custom", sub: "" },
  ];
  const whenLabel = selectedDate || selectedTime
    ? `${selectedDate || "Any date"}${selectedTime ? " · " + selectedTime : ""}`
    : "Any time";

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-pink-200/70 via-white to-indigo-300/70" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl -z-10" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl -z-10" />
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Book local selfcare services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 text-lg text-zinc-600 max-w-2xl mx-auto"
          >
            Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 relative"
          >
            <div className="mx-auto max-w-4xl bg-white rounded-full shadow-xl border border-white p-1.5 flex items-center gap-1 ring-4 ring-fuchsia-200/50">
              <div
                onClick={() => setFocused(focused === "treatment" ? null : "treatment")}
                className={`flex-1 flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer ${focused === "treatment" ? "bg-gray-50" : "hover:bg-gray-50"}`}
              >
                <Search className="h-5 w-5 text-zinc-500" />
                <span className="text-[15px] text-zinc-800">All treatments</span>
              </div>
              <div
                onClick={() => setFocused(focused === "where" ? null : "where")}
                className={`hidden md:flex flex-1 items-center gap-3 px-5 py-3 rounded-full cursor-pointer ${focused === "where" ? "bg-gray-50" : "hover:bg-gray-50"}`}
              >
                <MapPin className="h-5 w-5 text-zinc-500" />
                <span className="text-[15px] text-zinc-800">Current location</span>
              </div>
              <div
                onClick={() => setFocused(focused === "when" ? null : "when")}
                className={`hidden md:flex flex-1 items-center gap-3 px-5 py-3 rounded-full cursor-pointer ${focused === "when" ? "bg-gray-50" : "hover:bg-gray-50"}`}
              >
                <Calendar className="h-5 w-5 text-zinc-500" />
                <span className="text-[15px] text-zinc-800 truncate">{whenLabel}</span>
                {(selectedDate || selectedTime) && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedDate(""); setSelectedTime(""); }}
                    className="ml-auto text-zinc-400 hover:text-zinc-700"
                    aria-label="Clear time"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <button className="inline-flex items-center rounded-full bg-zinc-900 px-7 py-3 text-[15px] font-semibold text-white hover:bg-zinc-800">
                Search
              </button>
            </div>

            {/* Dropdown: Treatments */}
            <AnimatePresence>
              {focused === "treatment" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-30 left-4 md:left-8 top-full mt-3 w-[min(92vw,540px)] bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 text-left"
                >
                  <div className="flex gap-2 overflow-x-auto px-2 pb-3">
                    {treatmentTabs.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium border ${
                          tab === t.key ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {t.label}
                        {t.count != null && (
                          <span className={`inline-flex items-center rounded-full px-1.5 text-xs ${tab === t.key ? "bg-white/20" : "bg-gray-100"}`}>
                            {t.count}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="max-h-80 overflow-auto">
                    {tab === "treatments" || tab === "all" ? (
                      <div className="grid grid-cols-1">
                        <div className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Popular treatments</div>
                        {treatmentCategories.map((t) => (
                          <Link
                            key={t.name}
                            to="/marketplace"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50"
                          >
                            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-100 to-indigo-100 grid place-items-center text-lg">{t.emoji}</span>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm">{t.name}</div>
                              <div className="text-xs text-zinc-500">{t.count.toLocaleString()} venues</div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-zinc-400" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      treatmentResults.map((r) => (
                        <div key={r.name} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer">
                          <img src={r.img} alt="" className="h-9 w-9 rounded-full object-cover" />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm truncate">{r.name}</div>
                            <div className="text-xs text-zinc-500 truncate">{r.meta}</div>
                          </div>
                          <div className="text-xs text-zinc-500">{r.distance}</div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dropdown: Location */}
            <AnimatePresence>
              {focused === "where" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-30 left-1/2 -translate-x-1/2 top-full mt-3 w-[min(92vw,420px)] bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 text-left"
                >
                  <button
                    onClick={() => setFocused(null)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50"
                  >
                    <span className="grid place-items-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-600">
                      <Navigation2 className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">Current location</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dropdown: Date / Time */}
            <AnimatePresence>
              {focused === "when" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="absolute z-30 right-0 md:right-4 top-full mt-3 w-[min(94vw,640px)] bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 text-left"
                >
                  <div className="grid md:grid-cols-[180px_1fr] gap-5">
                    <div className="flex md:flex-col gap-2 md:gap-3">
                      {[
                        { k: "today", label: "Today", sub: fmtDate(0) },
                        { k: "tomorrow", label: "Tomorrow", sub: fmtDate(1) },
                      ].map((q) => (
                        <button
                          key={q.k}
                          onClick={() => setSelectedDate(q.label)}
                          className={`flex-1 rounded-2xl border px-4 py-3 text-left ${
                            selectedDate === q.label ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <div className="font-semibold text-sm">{q.label}</div>
                          <div className="text-xs text-zinc-500">{q.sub}</div>
                        </button>
                      ))}
                    </div>
                    <div>
                      <div className="grid grid-cols-7 gap-1 text-center text-sm">
                        {calendar.cells.map((d, i) => {
                          const isToday = d === calendar.todayDate;
                          const isPast = d != null && d < calendar.todayDate;
                          const label = d ? `Day ${d}` : "";
                          const picked = d != null && selectedDate === label;
                          return (
                            <button
                              key={i}
                              disabled={d == null || isPast}
                              onClick={() => d && setSelectedDate(label)}
                              className={`h-9 rounded-full ${
                                d == null ? "" :
                                isPast ? "text-zinc-300" :
                                picked ? "bg-zinc-900 text-white" :
                                isToday ? "ring-1 ring-zinc-900 font-semibold" : "hover:bg-gray-100"
                              }`}
                            >
                              {d ?? ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold">Select time</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {timeSlots.map((s) => {
                        const label = s.sub ? `${s.label} ${s.sub}` : s.label;
                        const picked = selectedTime === label || (s.key === "any" && !selectedTime);
                        return (
                          <button
                            key={s.key}
                            onClick={() => setSelectedTime(s.key === "any" ? "" : label)}
                            className={`shrink-0 rounded-2xl border px-4 py-2 text-left ${
                              picked ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <div className="text-sm font-medium">{s.label}</div>
                            {s.sub && <div className="text-xs text-zinc-500">{s.sub}</div>}
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => setFocused(null)}
                        className="rounded-full bg-zinc-900 text-white text-sm font-semibold px-5 py-2"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Animated counter */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="mt-10 text-center"
          >
            <div className="text-lg md:text-xl text-zinc-800">
              <motion.span
                key={count}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block font-extrabold tabular-nums"
              >
                {count.toLocaleString()}
              </motion.span>{" "}
              appointments booked today
            </div>
            <button className="mt-6 inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 border border-gray-200 shadow-sm px-5 py-2.5 text-sm font-semibold hover:shadow-md transition">
              Get the app <QrCode className="h-4 w-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Recommended */}
      <VenueRow
        title="Recommended"
        subtitle="Top-rated venues near popular cities"
        venues={featured.slice(0, 4)}
        badge="Featured"
      />

      {/* New to Saloon System */}
      <VenueRow
        title="New to Saloon System"
        venues={featured.slice(4, 8)}
      />

      {/* Trending */}
      <VenueRow
        title="Trending"
        venues={[...featured.slice(2, 6)]}
        firstBadge="Deals"
      />



      {/* Popular categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8">Popular categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.slice(0, 12).map((i) => (
              <Link
                key={i.slug}
                to="/business/$slug"
                params={{ slug: i.slug }}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900"
              >
                <img src={i.images[0]} alt={i.name} className="h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg">{i.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download app */}
      <section className="px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              Available on
              <Apple className="h-5 w-5" />
              <span className="font-bold">G</span>
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.02]">
              Download the<br /> Saloon System app
            </h2>
            <p className="mt-5 text-lg text-zinc-600 max-w-md">
              Book unforgettable beauty and wellness experiences with the Saloon System mobile app
            </p>
            <div className="mt-8 flex gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-5 py-3">
                <Apple className="h-5 w-5" />
                <div className="text-left leading-tight">
                  <div className="text-[10px]">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 text-white px-5 py-3">
                <span className="font-bold">G</span>
                <div className="text-left leading-tight">
                  <div className="text-[10px]">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-zinc-100 aspect-[9/16]">
              <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80" alt="Saloon System app" className="h-full w-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-zinc-100 aspect-[9/16] mt-8">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80" alt="Saloon System map" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Browse by city */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Browse by City</h2>
          <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
            {countries.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCountry(c)}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium ${
                  activeCountry === c ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-800 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 text-sm">
            {cities.slice(0, 4).map((city) => (
              <div key={city}>
                <div className="font-semibold text-zinc-900 mb-3">{city}</div>
                <ul className="space-y-1.5 text-indigo-600">
                  {["Hair Salons", "Nail Salons", "Eyebrows & Lashes", "Beauty Salons", "Barbers", "Massages", "Spas & Saunas", "Waxing Salons"].map((s) => (
                    <li key={s}><a href="#" className="hover:underline">{s} in {city}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </div>
  );
}

type VenueRowProps = {
  title: string;
  subtitle?: string;
  venues: typeof venues;
  badge?: string;
  firstBadge?: string;
};

function VenueRow({ title, subtitle, venues: items, badge, firstBadge }: VenueRowProps) {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
            {subtitle && <p className="mt-2 text-zinc-600">{subtitle}</p>}
          </div>
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="hidden md:grid place-items-center h-10 w-10 rounded-full border border-gray-200 bg-white hover:shadow-md transition mr-2 ml-auto"
          >
            <ChevronRight className="h-4 w-4 rotate-180" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="hidden md:grid place-items-center h-10 w-10 rounded-full border border-gray-200 bg-white hover:shadow-md transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((v, i) => {
            const cardBadge = firstBadge && i === 0 ? firstBadge : badge;
            return (
              <Link
                key={v.slug + i}
                to="/venue/$slug"
                params={{ slug: v.slug }}
                className="group shrink-0 snap-start w-[78%] sm:w-[46%] lg:w-[calc((100%-60px)/4)] block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <img
                    src={v.images[0]}
                    alt={v.name}
                    className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {cardBadge && (
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                      {cardBadge}
                    </span>
                  )}
                  <button
                    onClick={(e) => { e.preventDefault(); }}
                    className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/80 backdrop-blur text-zinc-800 hover:bg-white"
                    aria-label="Favorite"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-[17px] truncate">{v.name}</div>
                    <div className="flex items-center gap-1 text-sm shrink-0">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{v.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-sm text-zinc-500 truncate">{v.city}, {v.country}</div>
                  <div className="mt-1 text-sm text-zinc-500">
                    {v.category} <span className="text-zinc-400">· {v.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

