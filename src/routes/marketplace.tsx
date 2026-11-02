import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Star,
  ArrowRight,
  QrCode,
  Navigation2,
  X,
  Heart,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Map,
  SlidersHorizontal,
  Flame,
  Award,
  Zap,
  Tag,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { MarketplaceHeader, MarketplaceFooter, GetAppModal } from "@/components/marketplace-chrome";
import { venues, cities, countries, countryCitiesMap, type Venue } from "@/lib/venues";
import { treatmentCategories } from "@/lib/treatments";
import { getFavorites, toggleFavorite, subscribeFavorites } from "@/lib/favorites-store";
import { VenueMap } from "@/components/venue-map";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Book Top Salons, Barbers & Luxury Spas — Saloon System" },
      {
        name: "description",
        content:
          "Discover and instantly book top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide.",
      },
      { property: "og:title", content: "Book Top Salons, Barbers & Luxury Spas — Saloon System" },
      {
        property: "og:description",
        content:
          "Discover and instantly book top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Marketplace,
});

// Category pills for the quick-switch bar
const CATEGORY_CHIPS = [
  { key: "all", label: "All Treatments", icon: "✨" },
  { key: "Hair & Beauty Salon", label: "Hair & Styling", icon: "✂️" },
  { key: "Day Spa & Wellness", label: "Spa & Massage", icon: "💆" },
  { key: "Nail Bar & Pedicure", label: "Nails & Pedicure", icon: "💅" },
  { key: "Skincare & Aesthetics", label: "Facials & Skincare", icon: "🧖‍♀️" },
  { key: "Men's Barber & Grooming", label: "Barbers & Grooming", icon: "🧔" },
  { key: "Hammam & Bathhouse", label: "Hammam & Bath", icon: "🌿" },
  { key: "Massage & Reflexology", label: "Reflexology", icon: "🙌" },
];

function fmtDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function Marketplace() {
  const navigate = useNavigate();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [focusedDropdown, setFocusedDropdown] = useState<null | "treatment" | "where" | "when">(null);

  // App modal & map toggle
  const [showAppModal, setShowAppModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [copiedPromo, setCopiedPromo] = useState(false);

  // Favorites store subscription
  const [favorites, setFavorites] = useState<string[]>([]);
  useEffect(() => {
    setFavorites(getFavorites());
    return subscribeFavorites(() => setFavorites(getFavorites()));
  }, []);

  // Country / city exploration
  const [activeCountry, setActiveCountry] = useState("United Arab Emirates");
  const activeCities = useMemo(() => {
    return countryCitiesMap[activeCountry] || ["Dubai", "Abu Dhabi", "Sharjah", "Al Ain"];
  }, [activeCountry]);

  // Live appointment booking ticker counter
  const [bookingCount, setBookingCount] = useState(324908);
  useEffect(() => {
    const id = setInterval(() => {
      setBookingCount((c) => c + Math.floor(Math.random() * 2) + 1);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  // Calendar matrix generator
  const calendar = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth();
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const cells: (number | null)[] = Array.from({ length: first }, () => null);
    for (let d = 1; d <= days; d++) cells.push(d);
    return { cells, todayDate: today.getDate(), monthName: today.toLocaleString("default", { month: "long" }), year: y };
  }, []);

  const timeSlots = [
    { key: "any", label: "Any time", sub: "" },
    { key: "morning", label: "Morning", sub: "9am – 12pm" },
    { key: "afternoon", label: "Afternoon", sub: "12pm – 5pm" },
    { key: "evening", label: "Evening", sub: "5pm – 9pm" },
  ];

  const whenDisplay = selectedDate || selectedTime
    ? `${selectedDate || "Any date"}${selectedTime ? ` · ${selectedTime}` : ""}`
    : "Any time";

  // Filtered venues based on category and search query
  const filteredVenues = useMemo(() => {
    return venues.filter((v) => {
      // Category filter
      if (activeCategory !== "all") {
        const catMatch = v.category.toLowerCase().includes(activeCategory.toLowerCase());
        const serviceMatch = v.services.some((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase()));
        if (!catMatch && !serviceMatch) return false;
      }
      // Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = v.name.toLowerCase().includes(q);
        const matchesCat = v.category.toLowerCase().includes(q);
        const matchesServ = v.services.some((s) => s.name.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesServ) return false;
      }
      // Location filter
      if (selectedLocation.trim()) {
        const loc = selectedLocation.toLowerCase().trim();
        const matchesCity = v.city.toLowerCase().includes(loc);
        const matchesCountry = v.country.toLowerCase().includes(loc);
        const matchesAddr = v.address.toLowerCase().includes(loc);
        if (!matchesCity && !matchesCountry && !matchesAddr) return false;
      }
      return true;
    });
  }, [activeCategory, searchQuery, selectedLocation]);

  // Handle Search Execution
  const handleSearchSubmit = () => {
    setFocusedDropdown(null);
    if (searchQuery || selectedLocation) {
      navigate({
        to: "/search",
        search: {
          q: searchQuery || undefined,
          location: selectedLocation || undefined,
        },
      });
    } else {
      // Scroll smoothly down to the venues section
      const target = document.getElementById("venues-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      toast.loading("Detecting your location...", { id: "geo-loc" });
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelectedLocation("Dubai");
          toast.success("Location set to Dubai, UAE", { id: "geo-loc" });
          setFocusedDropdown(null);
        },
        () => {
          setSelectedLocation("Dubai");
          toast.success("Location set to Dubai (default)", { id: "geo-loc" });
          setFocusedDropdown(null);
        },
        { timeout: 4000 }
      );
    } else {
      setSelectedLocation("Dubai");
      setFocusedDropdown(null);
    }
  };

  const copyPromoCode = () => {
    navigator.clipboard.writeText("GLOW20");
    setCopiedPromo(true);
    toast.success("Promo code GLOW20 copied to clipboard!");
    setTimeout(() => setCopiedPromo(false), 3000);
  };

  const isFiltered = activeCategory !== "all" || searchQuery !== "" || selectedLocation !== "";

  return (
    <div className="min-h-screen bg-stone-50/40 text-stone-900 antialiased font-sans selection:bg-stone-900 selection:text-white">
      <MarketplaceHeader />

      {/* ==================================================== */}
      {/* HERO SECTION                                         */}
      {/* ==================================================== */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Soft Luxury Ambient Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-rose-50/50 via-stone-50/30 to-white" />
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-200/25 via-amber-100/25 to-indigo-100/20 rounded-full blur-3xl opacity-80" />
          <div className="absolute top-48 -right-24 w-80 h-80 rounded-full bg-rose-100/30 blur-2xl" />
          <div className="absolute top-48 -left-24 w-80 h-80 rounded-full bg-amber-100/30 blur-2xl" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-stone-200/80 shadow-2xs text-xs sm:text-sm font-medium text-stone-700 mb-6 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Discover & Book The World's Finest Salons & Spas</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.08]"
          >
            Book local selfcare services
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Discover top-rated salons, barbers, medspas, wellness studios and beauty experts
            trusted by millions worldwide.
          </motion.p>

          {/* ==================================================== */}
          {/* FLOATING CAPSULE SEARCH ENGINE                       */}
          {/* ==================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 sm:mt-10 relative max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-3xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.07)] border border-stone-200/90 p-2 md:p-2 flex flex-col md:flex-row items-stretch md:items-center gap-1.5 md:gap-1.5 transition-all focus-within:shadow-[0_25px_60px_rgba(0,0,0,0.11)]">
              {/* Segment 1: What / Treatment */}
              <div
                onClick={() => setFocusedDropdown(focusedDropdown === "treatment" ? null : "treatment")}
                className={`flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer text-left transition-colors ${
                  focusedDropdown === "treatment" ? "bg-stone-100/90" : "hover:bg-stone-50"
                }`}
              >
                <div className="grid place-items-center h-9 w-9 rounded-full bg-stone-100 text-stone-700 shrink-0">
                  <Search className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Treatment</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {searchQuery ? searchQuery : "All treatments"}
                  </div>
                </div>
                {searchQuery && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery("");
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                    aria-label="Clear treatment search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Segment Divider */}
              <div className="hidden md:block w-px h-8 bg-stone-200" />

              {/* Segment 2: Where / Location */}
              <div
                onClick={() => setFocusedDropdown(focusedDropdown === "where" ? null : "where")}
                className={`flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer text-left transition-colors ${
                  focusedDropdown === "where" ? "bg-stone-100/90" : "hover:bg-stone-50"
                }`}
              >
                <div className="grid place-items-center h-9 w-9 rounded-full bg-stone-100 text-stone-700 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Where</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {selectedLocation ? selectedLocation : "Current location"}
                  </div>
                </div>
                {selectedLocation && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLocation("");
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                    aria-label="Clear location search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Segment Divider */}
              <div className="hidden md:block w-px h-8 bg-stone-200" />

              {/* Segment 3: When / Date & Time */}
              <div
                onClick={() => setFocusedDropdown(focusedDropdown === "when" ? null : "when")}
                className={`flex-1 flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer text-left transition-colors ${
                  focusedDropdown === "when" ? "bg-stone-100/90" : "hover:bg-stone-50"
                }`}
              >
                <div className="grid place-items-center h-9 w-9 rounded-full bg-stone-100 text-stone-700 shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400">When</div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-900 truncate">
                    {whenDisplay}
                  </div>
                </div>
                {(selectedDate || selectedTime) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate("");
                      setSelectedTime("");
                    }}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                    aria-label="Clear time search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSearchSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-2xl md:rounded-full bg-stone-900 px-7 py-3 text-sm font-semibold text-white hover:bg-stone-800 transition active:scale-98 shadow-sm shrink-0"
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </button>
            </div>

            {/* ==================================================== */}
            {/* DROPDOWN: Treatment Selector                          */}
            {/* ==================================================== */}
            <AnimatePresence>
              {focusedDropdown === "treatment" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute z-40 left-0 right-0 md:left-4 md:right-auto md:w-[480px] top-full mt-3 bg-white rounded-3xl shadow-2xl border border-stone-100 p-4 text-left"
                >
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Search treatments, venues or stylists..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-sm font-medium focus:bg-white focus:border-stone-900 focus:outline-hidden"
                    />
                  </div>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 mb-2">
                    Popular Treatments
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
                    {treatmentCategories
                      .filter((t) => !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()))
                      .slice(0, 10)
                      .map((t) => (
                        <button
                          key={t.name}
                          onClick={() => {
                            setSearchQuery(t.name);
                            setFocusedDropdown(null);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-stone-50 transition text-left"
                        >
                          <span className="grid place-items-center h-8 w-8 rounded-full bg-stone-100 text-base shrink-0">
                            {t.emoji}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-stone-900">{t.name}</div>
                            <div className="text-xs text-stone-500">{t.count} venues available</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-stone-400" />
                        </button>
                      ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-500">Pick from 25+ curated categories</span>
                    <button
                      onClick={() => setFocusedDropdown(null)}
                      className="text-xs font-semibold text-stone-900 hover:underline"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==================================================== */}
            {/* DROPDOWN: Location Selector                           */}
            {/* ==================================================== */}
            <AnimatePresence>
              {focusedDropdown === "where" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute z-40 left-0 right-0 md:left-1/4 md:w-[420px] top-full mt-3 bg-white rounded-3xl shadow-2xl border border-stone-100 p-4 text-left"
                >
                  <button
                    onClick={handleUseCurrentLocation}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-stone-50 hover:bg-stone-100 transition mb-3"
                  >
                    <div className="grid place-items-center h-8 w-8 rounded-full bg-stone-900 text-white shrink-0">
                      <Navigation2 className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold text-stone-900">Current location</div>
                      <div className="text-xs text-stone-500">Detect via browser GPS</div>
                    </div>
                  </button>

                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-2 mb-2">
                    Popular GCC & Global Cities
                  </div>

                  <div className="flex flex-wrap gap-1.5 px-2 pb-2">
                    {["Dubai", "Abu Dhabi", "Riyadh", "Jeddah", "Doha", "Kuwait City", "Muscat", "London"].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelectedLocation(c);
                          setFocusedDropdown(null);
                        }}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                          selectedLocation === c
                            ? "bg-stone-900 text-white border-stone-900"
                            : "bg-white text-stone-700 border-stone-200 hover:bg-stone-50"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ==================================================== */}
            {/* DROPDOWN: Date & Time Selector                        */}
            {/* ==================================================== */}
            <AnimatePresence>
              {focusedDropdown === "when" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute z-40 left-0 right-0 md:left-auto md:right-4 md:w-[500px] top-full mt-3 bg-white rounded-3xl shadow-2xl border border-stone-100 p-5 text-left"
                >
                  <div className="grid md:grid-cols-[160px_1fr] gap-4">
                    {/* Quick presets */}
                    <div className="flex md:flex-col gap-2">
                      {[
                        { k: "any", label: "Any time", sub: "Flexible schedule" },
                        { k: "today", label: "Today", sub: fmtDate(0) },
                        { k: "tomorrow", label: "Tomorrow", sub: fmtDate(1) },
                      ].map((preset) => (
                        <button
                          key={preset.k}
                          onClick={() => {
                            if (preset.k === "any") {
                              setSelectedDate("");
                              setSelectedTime("");
                            } else {
                              setSelectedDate(preset.label);
                            }
                          }}
                          className={`flex-1 rounded-2xl border px-3.5 py-2.5 text-left transition ${
                            (preset.k === "any" && !selectedDate) || selectedDate === preset.label
                              ? "border-stone-900 bg-stone-100 text-stone-900 font-bold"
                              : "border-stone-200 hover:bg-stone-50 text-stone-700"
                          }`}
                        >
                          <div className="text-xs font-bold">{preset.label}</div>
                          <div className="text-[11px] text-stone-500">{preset.sub}</div>
                        </button>
                      ))}
                    </div>

                    {/* Month mini calendar */}
                    <div>
                      <div className="text-xs font-bold text-stone-900 mb-2">
                        {calendar.monthName} {calendar.year}
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <div key={day} className="text-[10px] font-bold text-stone-400 py-1">
                            {day}
                          </div>
                        ))}
                        {calendar.cells.map((d, i) => {
                          const isToday = d === calendar.todayDate;
                          const isPast = d != null && d < calendar.todayDate;
                          const dateLabel = d ? `${calendar.monthName} ${d}` : "";
                          const picked = d != null && selectedDate === dateLabel;
                          return (
                            <button
                              key={i}
                              disabled={d == null || isPast}
                              onClick={() => d && setSelectedDate(dateLabel)}
                              className={`h-8 rounded-full text-xs transition ${
                                d == null
                                  ? ""
                                  : isPast
                                  ? "text-stone-300 cursor-not-allowed"
                                  : picked
                                  ? "bg-stone-900 text-white font-bold"
                                  : isToday
                                  ? "border border-stone-900 font-bold text-stone-900"
                                  : "hover:bg-stone-100 text-stone-700"
                              }`}
                            >
                              {d ?? ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time slots */}
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                      Time of Day
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map((slot) => {
                        const active = selectedTime === slot.label || (slot.key === "any" && !selectedTime);
                        return (
                          <button
                            key={slot.key}
                            onClick={() => setSelectedTime(slot.key === "any" ? "" : slot.label)}
                            className={`rounded-xl border px-3 py-1.5 text-xs transition ${
                              active
                                ? "bg-stone-900 text-white border-stone-900 font-semibold"
                                : "border-stone-200 hover:bg-stone-50 text-stone-700"
                            }`}
                          >
                            <span>{slot.label}</span>
                            {slot.sub && <span className="text-[10px] opacity-75 ml-1">({slot.sub})</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-end">
                    <button
                      onClick={() => setFocusedDropdown(null)}
                      className="rounded-full bg-stone-900 text-white text-xs font-semibold px-5 py-2 hover:bg-stone-800 transition"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Social Proof & App Trigger Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.5 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-600"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-bold tabular-nums text-stone-900">
                {bookingCount.toLocaleString()}
              </span>
              <span>appointments booked today</span>
            </div>

            <button
              onClick={() => setShowAppModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-white border border-stone-200/80 shadow-2xs px-3.5 py-1.5 font-semibold text-stone-800 hover:border-stone-400 hover:shadow-xs transition"
            >
              <QrCode className="h-3.5 w-3.5 text-stone-600" />
              <span>Get the app</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* QUICK CATEGORY PILL STRIP                            */}
      {/* ==================================================== */}
      <section className="sticky top-[58px] z-30 bg-white/95 backdrop-blur-md border-y border-stone-200/70 py-3 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            {CATEGORY_CHIPS.map((chip) => {
              const active = activeCategory === chip.key;
              return (
                <button
                  key={chip.key}
                  onClick={() => setActiveCategory(chip.key)}
                  className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition shadow-2xs ${
                    active
                      ? "bg-stone-900 text-white shadow-sm"
                      : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 hover:border-stone-300"
                  }`}
                >
                  <span className="text-sm">{chip.icon}</span>
                  <span>{chip.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* EDITORIAL PROMOTIONAL PRIVILEGE BANNER               */}
      {/* ==================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-rose-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-[11px] font-bold uppercase tracking-wider text-amber-300">
                <Tag className="h-3 w-3" />
                First-Time Client Privilege
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Enjoy 20% off your first luxury appointment
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Experience world-class hair stylists, calming massage rituals, and aesthetic skincare.
                Use code <span className="font-bold text-white tracking-wider">GLOW20</span> at online checkout.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3">
              <button
                onClick={copyPromoCode}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-stone-900 px-5 py-3 text-xs sm:text-sm font-bold hover:bg-stone-100 transition shadow-sm active:scale-98"
              >
                {copiedPromo ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copiedPromo ? "Code GLOW20 Copied!" : "Copy Code: GLOW20"}</span>
              </button>
              <span className="text-[11px] text-stone-400">Valid on all verified salons & spas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* ACTIVE FILTERS & MAP TOGGLE BAR                      */}
      {/* ==================================================== */}
      <div id="venues-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
              {activeCategory === "all"
                ? "Recommended for you"
                : `${CATEGORY_CHIPS.find((c) => c.key === activeCategory)?.label || "Venues"}`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              {filteredVenues.length} top-rated verified venues near popular destinations
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isFiltered && (
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                  setSelectedLocation("");
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition"
              >
                <X className="h-3 w-3" />
                Reset filters
              </button>
            )}

            <button
              onClick={() => setShowMap(!showMap)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition ${
                showMap
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-800 border-stone-300 hover:bg-stone-50"
              }`}
            >
              <Map className="h-3.5 w-3.5" />
              <span>{showMap ? "Hide Map" : "Show Map"}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Map View */}
        <AnimatePresence>
          {showMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mt-6 rounded-3xl border border-stone-200 shadow-lg"
            >
              <div className="p-4 bg-stone-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <MapPin className="h-4 w-4 text-rose-400" />
                  <span>Viewing venues on interactive map in {selectedLocation || "Dubai"}</span>
                </div>
                <Link
                  to="/search"
                  search={{ location: selectedLocation || "Dubai" }}
                  className="text-xs font-semibold text-stone-300 hover:text-white underline"
                >
                  Full Map Search
                </Link>
              </div>
              <VenueMap
                address="Dubai Marina & Downtown Boulevard"
                city={selectedLocation || "Dubai"}
                height="380px"
                pins={filteredVenues.slice(0, 8).map((v) => ({
                  name: v.name,
                  address: v.address,
                  city: v.city,
                  rating: v.rating,
                  slug: v.slug,
                }))}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================================================== */}
      {/* VENUE SECTIONS                                       */}
      {/* ==================================================== */}
      <main className="space-y-6 sm:space-y-10 py-6">
        {/* Recommended Row */}
        <LuxuryVenueRow
          title="Recommended"
          subtitle="Top-rated venues near popular cities"
          venues={filteredVenues.slice(0, 8)}
          badge="Featured"
          favorites={favorites}
          onToggleFavorite={(slug) => toggleFavorite(slug)}
        />

        {/* Trending Deals Row */}
        <LuxuryVenueRow
          title="Trending Deals & Specials"
          subtitle="Exclusive discounts and packages available for limited bookings"
          venues={filteredVenues.slice(4, 12).length > 0 ? filteredVenues.slice(4, 12) : filteredVenues}
          firstBadge="20% OFF Deal"
          badge="Trending"
          favorites={favorites}
          onToggleFavorite={(slug) => toggleFavorite(slug)}
        />

        {/* Popular Treatments Grid */}
        <PopularTreatmentsSection />

        {/* New to Saloon System Row */}
        <LuxuryVenueRow
          title="New to Saloon System"
          subtitle="Recently onboarded salons, boutique medspas and certified masters"
          venues={filteredVenues.slice(8, 16).length > 0 ? filteredVenues.slice(8, 16) : filteredVenues}
          badge="New"
          favorites={favorites}
          onToggleFavorite={(slug) => toggleFavorite(slug)}
        />

        {/* Why Saloon System Trust Pillars */}
        <TrustPillarsSection />

        {/* Customer Testimonials Carousel */}
        <TestimonialsSection />

        {/* Browse by City & Regional Directory */}
        <BrowseByCitySection
          activeCountry={activeCountry}
          onSelectCountry={setActiveCountry}
          activeCities={activeCities}
        />

        {/* Mobile App Download Banner */}
        <AppShowcaseSection onOpenAppModal={() => setShowAppModal(true)} />
      </main>

      {/* App QR Modal */}
      <GetAppModal open={showAppModal} onClose={() => setShowAppModal(false)} />

      {/* Footer */}
      <MarketplaceFooter />
    </div>
  );
}

// ----------------------------------------------------
// LUXURY VENUE ROW / CAROUSEL COMPONENT
// ----------------------------------------------------
type LuxuryVenueRowProps = {
  title: string;
  subtitle?: string;
  venues: Venue[];
  badge?: string;
  firstBadge?: string;
  favorites: string[];
  onToggleFavorite: (slug: string) => void;
};

function LuxuryVenueRow({
  title,
  subtitle,
  venues: items,
  badge,
  firstBadge,
  favorites,
  onToggleFavorite,
}: LuxuryVenueRowProps) {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scroller.current) return;
    const amount = direction === "left" ? -scroller.current.clientWidth * 0.8 : scroller.current.clientWidth * 0.8;
    scroller.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Row Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">{title}</h3>
          {subtitle && <p className="text-xs sm:text-sm text-stone-500 mt-1">{subtitle}</p>}
        </div>

        {/* Desktop Carousel Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="grid place-items-center h-9 w-9 rounded-full border border-stone-200 bg-white hover:bg-stone-50 shadow-2xs transition active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 text-stone-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="grid place-items-center h-9 w-9 rounded-full border border-stone-200 bg-white hover:bg-stone-50 shadow-2xs transition active:scale-95"
          >
            <ChevronRight className="h-4 w-4 text-stone-700" />
          </button>
        </div>
      </div>

      {/* Cards Scroll Container */}
      <div
        ref={scroller}
        className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-3 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        {items.map((v, i) => {
          const cardBadge = firstBadge && i === 0 ? firstBadge : badge;
          const isFav = favorites.includes(v.slug);
          const featuredService = v.services[0];

          return (
            <div
              key={v.slug + i}
              className="group shrink-0 snap-start w-[84%] sm:w-[46%] lg:w-[calc((100%-60px)/4)] flex flex-col rounded-3xl bg-white border border-stone-200/90 hover:border-stone-300 shadow-2xs hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              {/* Image & Badges Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <Link to="/venue/$slug" params={{ slug: v.slug }} className="block h-full w-full">
                  <img
                    src={v.images[0]}
                    alt={v.name}
                    loading="lazy"
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Badge Overlay */}
                {cardBadge && (
                  <span className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                    {cardBadge.includes("Deal") ? <Flame className="h-3 w-3 text-amber-400" /> : null}
                    {cardBadge}
                  </span>
                )}

                {/* Heart / Favorite Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleFavorite(v.slug);
                    toast.success(isFav ? `Removed ${v.name} from saved` : `Saved ${v.name} to favorites!`);
                  }}
                  className="absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/90 backdrop-blur-md text-stone-700 hover:bg-white shadow-sm transition active:scale-90"
                  aria-label="Save venue"
                >
                  <Heart className={`h-4 w-4 ${isFav ? "fill-rose-500 text-rose-500" : "text-stone-700"}`} />
                </button>

                {/* Next Available Slot Pill */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-2xs flex items-center gap-1">
                  <Clock className="h-3 w-3 text-emerald-600" />
                  <span>Next slot today</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Rating & Distance */}
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1 font-bold text-stone-900">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span>{v.rating.toFixed(1)}</span>
                      <span className="text-stone-400 font-normal">({v.reviews.toLocaleString()})</span>
                    </div>
                    <span className="text-stone-500 text-[11px] flex items-center gap-0.5 truncate">
                      <MapPin className="h-3 w-3" />
                      {v.city}
                    </span>
                  </div>

                  {/* Venue Name */}
                  <Link to="/venue/$slug" params={{ slug: v.slug }} className="block group-hover:text-stone-600 transition">
                    <h4 className="font-bold text-base text-stone-900 truncate flex items-center gap-1">
                      <span>{v.name}</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    </h4>
                  </Link>

                  {/* Category */}
                  <p className="text-xs text-stone-500 truncate mt-0.5">{v.category}</p>

                  {/* Featured Service */}
                  {featuredService && (
                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-600 truncate max-w-[150px] font-medium">
                        {featuredService.name}
                      </span>
                      <span className="font-bold text-stone-900 shrink-0">{featuredService.price}</span>
                    </div>
                  )}
                </div>

                {/* Book Now Button */}
                <div className="mt-4 pt-1">
                  <Link
                    to="/venue/$slug"
                    params={{ slug: v.slug }}
                    className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-2.5 text-xs font-semibold text-white hover:bg-stone-800 transition active:scale-98 shadow-2xs"
                  >
                    <span>Book Appointment</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// POPULAR TREATMENTS GRID
// ----------------------------------------------------
function PopularTreatmentsSection() {
  const topServices = [
    { title: "Haircut & Blow Dry", time: "45 mins", price: "from AED 120", emoji: "✂️", q: "Haircut" },
    { title: "Hot Stone & Aromatherapy", time: "60 mins", price: "from AED 220", emoji: "💆", q: "Spa" },
    { title: "HydraFacial Deep Cleanse", time: "50 mins", price: "from AED 350", emoji: "🧖‍♀️", q: "Facial" },
    { title: "Gel Manicure & Polish", time: "45 mins", price: "from AED 140", emoji: "💅", q: "Nail" },
    { title: "Beard Sculpt & Hot Towel", time: "30 mins", price: "from AED 85", emoji: "🧔", q: "Barber" },
    { title: "Lash Lift & Brow Tint", time: "40 mins", price: "from AED 160", emoji: "👁️", q: "Lash" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="rounded-3xl bg-stone-100/70 border border-stone-200/80 p-6 sm:p-8 lg:p-10">
        <div className="max-w-2xl mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
            Popular treatments near you
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse the most sought-after beauty, styling, and wellness rituals booked daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {topServices.map((service) => (
            <Link
              key={service.title}
              to="/search"
              search={{ q: service.q }}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <span className="grid place-items-center h-11 w-11 rounded-2xl bg-stone-50 border border-stone-100 text-xl shrink-0 group-hover:scale-105 transition">
                  {service.emoji}
                </span>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm text-stone-900 truncate group-hover:text-stone-700">
                    {service.title}
                  </h4>
                  <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                    <span>{service.time}</span>
                    <span>·</span>
                    <span className="font-semibold text-stone-800">{service.price}</span>
                  </div>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// TRUST PILLARS SECTION
// ----------------------------------------------------
function TrustPillarsSection() {
  const pillars = [
    {
      icon: Award,
      title: "Hand-Picked Excellence",
      desc: "Every salon, spa, and beauty studio is verified for premium hygiene, licensed staff, and high client ratings.",
    },
    {
      icon: Zap,
      title: "Instant 24/7 Confirmation",
      desc: "Real-time calendar availability with direct appointment confirmation. No phone calls or waiting.",
    },
    {
      icon: ShieldCheck,
      title: "Flexible Rescheduling",
      desc: "Life happens. Reschedule or cancel up to 24 hours prior with zero fees directly from your dashboard.",
    },
    {
      icon: Sparkles,
      title: "Loyalty Privileges",
      desc: "Earn selfcare points on every booking redeemable for complimentary treatments and VIP perks.",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
          Why book through Saloon System
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          The seamless, trusted way to look and feel your absolute best.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.title}
              className="p-6 rounded-3xl bg-white border border-stone-200/90 shadow-2xs space-y-3"
            >
              <div className="grid place-items-center h-11 w-11 rounded-2xl bg-stone-100 text-stone-900">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-base text-stone-900">{p.title}</h4>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// TESTIMONIALS SECTION
// ----------------------------------------------------
function TestimonialsSection() {
  const reviews = [
    {
      name: "Camille Laurent",
      venue: "Zen Luxury Spa Dubai",
      text: "Booking my hot stone massage took literally 30 seconds. The spa was breathtaking, and having instant confirmation gave me complete peace of mind.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    },
    {
      name: "Marcus Vance",
      venue: "Velvet Touch Grooming",
      text: "Hands down the slickest barbershop booking app. I found a master barber 5 minutes from my hotel in Riyadh and booked my beard trim on the spot.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    },
    {
      name: "Nour Al-Sabah",
      venue: "The Hideaway Wellness",
      text: "The loyalty rewards and verified reviews make choosing the right therapist completely effortless. Saloon System is my go-to weekly selfcare app.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-3xl bg-stone-900 text-white p-6 sm:p-10 lg:p-12 shadow-xl">
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1 text-amber-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Loved by 1M+ beauty & wellness seekers
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 mt-1">
            Real experiences from clients booking their selfcare moments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="p-6 rounded-2xl bg-stone-800/80 border border-stone-700/60 flex flex-col justify-between"
            >
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed italic">
                "{r.text}"
              </p>
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-stone-700/50">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover shrink-0 border border-stone-600"
                />
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold text-white truncate">{r.name}</div>
                  <div className="text-[11px] text-stone-400 truncate">Booked at {r.venue}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// BROWSE BY CITY SECTION
// ----------------------------------------------------
function BrowseByCitySection({
  activeCountry,
  onSelectCountry,
  activeCities,
}: {
  activeCountry: string;
  onSelectCountry: (c: string) => void;
  activeCities: string[];
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-t border-stone-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-stone-900">
            Browse by City & Region
          </h3>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Discover top-rated wellness destinations in major hubs.
          </p>
        </div>

        {/* Country selector tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => onSelectCountry(c)}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                activeCountry === c
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeCities.map((city) => (
          <div key={city} className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <div className="font-bold text-sm text-stone-900 mb-2.5 flex items-center justify-between">
              <span>{city}</span>
              <Link
                to="/search"
                search={{ location: city }}
                className="text-[11px] font-semibold text-stone-500 hover:text-stone-900"
              >
                View all
              </Link>
            </div>
            <ul className="space-y-1.5 text-xs text-stone-600">
              {["Hair Salons", "Massage & Spas", "Nails & Brows", "Barbershop"].map((cat) => (
                <li key={cat}>
                  <Link
                    to="/search"
                    search={{ q: cat, location: city }}
                    className="hover:text-stone-900 hover:underline transition flex items-center justify-between"
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] text-stone-400">near you</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

// ----------------------------------------------------
// MOBILE APP SHOWCASE SECTION
// ----------------------------------------------------
function AppShowcaseSection({ onOpenAppModal }: { onOpenAppModal: () => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="rounded-3xl bg-gradient-to-br from-stone-900 via-stone-800 to-stone-950 text-white p-8 sm:p-12 overflow-hidden relative shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-stone-300">
              <QrCode className="h-3.5 w-3.5" />
              Download Free Mobile App
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Self-care in your pocket. Anytime, anywhere.
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed">
              Book appointments in seconds, save favorite stylists, receive instant appointment reminders,
              and unlock mobile-exclusive perks.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenAppModal}
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-stone-900 px-6 py-3 text-xs sm:text-sm font-bold hover:bg-stone-100 transition shadow-sm active:scale-98"
              >
                <QrCode className="h-4 w-4" />
                <span>Scan QR Code to Download</span>
              </button>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 aspect-[9/16] rounded-3xl overflow-hidden border-4 border-stone-700 shadow-2xl bg-stone-800">
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"
                alt="App preview"
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
              <div className="absolute bottom-6 inset-x-6 text-center">
                <div className="text-sm font-bold">Saloon System App</div>
                <div className="text-xs text-stone-400 mt-0.5">4.9 ★ Rating on iOS & Android</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
