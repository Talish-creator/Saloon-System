import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Play,
  Star,
  Settings,
  TrendingUp,
  CreditCard,
  Check,
  ShieldCheck,
  Award,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Store,
  ChevronDown,
} from "lucide-react";
import { industries as industryData } from "@/lib/industries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saloon System for Business — The #1 software for Salons and Spas" },
      {
        name: "description",
        content:
          "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform.",
      },
      { property: "og:title", content: "Saloon System for Business — The #1 software for Salons and Spas" },
      {
        property: "og:description",
        content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const industries = industryData.map((i) => ({ name: i.name, slug: i.slug, img: i.images[0] }));


const stats = [
  { value: "4.8", label: null, stars: true },
  { value: "130,000+", label: "Partner businesses" },
  { value: "450,000+", label: "Professionals" },
  { value: "1 Billion+", label: "Appointments booked" },
  { value: "120+", label: "Countries" },
];

const badges = [
  "Capterra Shortlist 2024",
  "Capterra Best Value 2024",
  "Easiest to use Summer 2024",
  "HIPAA Compliant",
  "ISO 9001 Certified",
  "HITRUST CFS Certified",
];

const pillars = [
  {
    icon: Settings,
    title: "Manage",
    text: "Manage bookings, sales, clients, locations, team members. Analyse your business with advanced reporting and analytics.",
  },
  {
    icon: TrendingUp,
    title: "Grow",
    text: "Win new clients on the world's largest beauty and wellness marketplace. Keep them coming back with marketing features.",
  },
  {
    icon: CreditCard,
    title: "Get paid",
    text: "Get paid fast with seamless payment processing. Reduce no-shows with upfront payments and simplify checkout.",
  },
];

const featureBlocks = [
  {
    header: "All-in-one software to run your business",
    items: [
      "Most loved and the top-rated booking software for salons, spas and wellness businesses.",
      "Powerful calendar with unlimited bookings, clients, locations and team members.",
      "Advanced insights providing a 360 degree view of each client's history and behaviour.",
      "Crafted to deliver a smooth experience for you, your team and your clients.",
    ],
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1400&auto=format&fit=crop&q=80",
    imageRight: true,
  },
  {
    header: "The most popular marketplace to grow your business",
    items: [
      "Promote your business and reach new clients on the world's #1 marketplace for beauty and wellness.",
      "Increase your online visibility by listing your business on the Saloon System marketplace.",
      "Reach millions of clients looking to book beauty and wellness appointments near them.",
      "Free up time and get your clients self-booking online 24/7.",
    ],
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=80",
    imageRight: false,
  },
  {
    header: "Power your business with payments",
    items: [
      "Enjoy low cost, safe and hassle-free payments with fully integrated processing.",
      "Take payments anywhere easily, quickly and seamlessly with our card readers.",
      "Reduce no-shows and cancellations by collecting full upfront payments or deposits.",
      "Keep your bank account topped up with daily payouts.",
    ],
    img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1400&auto=format&fit=crop&q=80",
    imageRight: true,
  },
];

const testimonials = [
  {
    name: "Chris Ward",
    role: "Founder of HUCKLE",
    text: "I work with booth renters at my top-rated salon in Manhattan. I love Saloon System because it offers my clients a professional appointment booking experience with seamless online booking features that keep my chairs full and my team happy.",
  },
  {
    name: "Alex E",
    role: "Hair stylist and owner",
    text: "Saloon System is the top-rated salon software with all the advanced features you need to run a modern business. The Saloon System marketplace has been incredible for our salon business too, we've increased sales by 31%.",
  },
  {
    name: "Gayle S",
    role: "Business owner",
    text: "This appointment scheduling software is very user friendly! I accidentally stumbled onto Saloon System and was skeptical at first, but after trying it out — hands down the best salon scheduling system I've seen.",
  },
];

function Index() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const industry = industries[activeIndustry];

  
  const featuresMenu = ["Calendar & bookings", "Payments", "Marketing", "Reporting & analytics", "Team management", "Client management"];

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/marketplace" className="text-3xl tracking-tight text-zinc-900 lowercase" style={{ fontFamily: "'Instrument Serif', ui-serif, Georgia, serif", fontWeight: 400, letterSpacing: "-0.02em" }}>
              Saloon System
            </Link>
            <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setOpenMenu(null)}>
              <div className="relative" onMouseEnter={() => setOpenMenu("business")}>
                <button
                  className={`inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${
                    openMenu === "business" ? "text-indigo-600" : "text-zinc-800 hover:text-zinc-900"
                  }`}
                >
                  Business types
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === "business" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openMenu === "business" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-3 w-64"
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 max-h-[70vh] overflow-y-auto">
                        {industries.map((it) => (
                          <Link
                            key={it.slug}
                            to="/business/$slug"
                            params={{ slug: it.slug }}
                            onClick={() => setOpenMenu(null)}
                            className="block w-full text-left px-4 py-2.5 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            {it.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative" onMouseEnter={() => setOpenMenu("features")}>
                <button
                  className={`inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${
                    openMenu === "features" ? "text-indigo-600" : "text-zinc-800 hover:text-zinc-900"
                  }`}
                >
                  Features
                  <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === "features" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openMenu === "features" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 top-full pt-3 w-64"
                    >
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3">
                        {featuresMenu.map((f) => (
                          <a key={f} href="#" className="block px-4 py-2.5 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50 transition-colors">
                            {f}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" className="px-4 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900 rounded-full">
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/marketplace"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition-colors"
            >
              <Store className="h-4 w-4" />
              Marketplace
            </Link>
            <button className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-[15px] font-semibold text-white hover:bg-zinc-800 transition-colors">
              Sign up
            </button>
            <button
              aria-label="Menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition-colors"
            >
              <span className="hidden sm:inline">Menu</span>
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 pt-2">Business types</div>
                {industries.map((it) => (
                  <Link
                    key={it.slug}
                    to="/business/$slug"
                    params={{ slug: it.slug }}
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-left px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50"
                  >
                    {it.name}
                  </Link>
                ))}
                <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 pt-4">Features</div>
                {featuresMenu.map((f) => (
                  <a key={f} href="#" className="block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50">
                    {f}
                  </a>
                ))}
                <a href="#" className="block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50">Pricing</a>
                <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="sm:hidden block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50">Marketplace</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              The #1 software for Salons and Spas
            </h1>
            <p className="text-xl text-gray-600 mt-6 max-w-lg">
              Simple, flexible and powerful booking software for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white hover:bg-zinc-800 transition-colors">
                Get started now
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-zinc-900 hover:bg-gray-50 transition-colors">
                <Play className="h-4 w-4 fill-current" />
                Watch an overview
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative h-[420px] md:h-[520px]"
          >
            <img
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1400&auto=format&fit=crop&q=80"
              alt="Saloon System calendar app"
              className="absolute top-0 right-0 w-[85%] h-[80%] object-cover rounded-3xl shadow-2xl"
            />
            <img
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=80"
              alt="Saloon System mobile app"
              className="absolute bottom-0 left-0 w-[45%] h-[60%] object-cover rounded-3xl shadow-2xl border-4 border-white"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-b border-gray-100 bg-zinc-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-around gap-6 md:grid md:grid-cols-5">
            {stats.map((s, i) => (
              <div key={i} className="text-center min-w-[120px]">
                <div className="text-3xl font-bold text-zinc-900">{s.value}</div>
                {s.stars ? (
                  <div className="mt-2 flex justify-center gap-0.5">
                    {[0, 1, 2, 3, 4].map((n) => (
                      <Star key={n} className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                    ))}
                  </div>
                ) : (
                  <div className="mt-2 text-sm text-gray-500 uppercase tracking-wide">{s.label}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24">

        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              One platform, infinite possibilities
            </h2>
            <p className="text-lg text-gray-600 mt-6">
              Everything you need to grow and thrive. Saloon System is packed with tools to boost sales, manage your calendar, and retain clients, so you can focus on what you do best.
            </p>
            <button className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
              Get started now
            </button>
          </div>

          <div className="mt-12 -mx-4 sm:mx-0">
            <div className="flex gap-2 overflow-x-auto px-4 sm:px-0 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {industries.map((it, i) => (
                <button
                  key={it.name}
                  onClick={() => setActiveIndustry(i)}
                  className={`shrink-0 rounded-full px-5 py-2 text-sm font-medium border transition-colors ${
                    activeIndustry === i
                      ? "bg-zinc-900 text-white border-zinc-900"
                      : "bg-white text-zinc-900 border-gray-200 hover:border-zinc-400"
                  }`}
                >
                  {it.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={industry.name}
                src={industry.img}
                alt={industry.name}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="py-10 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400">
            {badges.map((b) => (
              <div key={b} className="flex items-center gap-2 text-sm font-medium grayscale">
                {b.includes("Compliant") || b.includes("Certified") ? (
                  <ShieldCheck className="h-4 w-4" />
                ) : (
                  <Award className="h-4 w-4" />
                )}
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Everything you need to run your businesses
            </h2>
            <p className="text-lg text-gray-600 mt-6">
              Saloon System offers innovative features that bring convenience, efficiency, and an improved experience for both your team members and clients.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-900 text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-3 text-gray-600 leading-relaxed">{p.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alternating feature blocks */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {featureBlocks.map((b, i) => (
            <div key={i} className="py-24 grid md:grid-cols-2 gap-12 items-center">
              <div className={b.imageRight ? "order-2 md:order-1" : "order-2"}>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{b.header}</h2>
                <ul className="mt-8 space-y-4">
                  {b.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-gray-700">
                      <Check className="h-5 w-5 shrink-0 text-zinc-900 mt-1" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
                  Get started now
                </button>
              </div>
              <div className={b.imageRight ? "order-1 md:order-2" : "order-1"}>
                <img
                  src={b.img}
                  alt={b.header}
                  className="w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-center">
            Top-rated by the industry
          </h2>
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                  ))}
                </div>
                <p className="mt-4 text-gray-700 leading-relaxed flex-1">"{t.text}"</p>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="font-bold text-zinc-900">{t.name}</div>
                  <div className="text-sm text-gray-500">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <div className="text-2xl font-extrabold text-white">Saloon System</div>
              <p className="mt-4 text-sm max-w-xs">
                The world's #1 booking software for salons, spas and wellness businesses.
              </p>
            </div>
            {[
              { title: "Product", items: ["Overview", "Pricing", "Marketplace", "Integrations"] },
              { title: "Features", items: ["Calendar", "Payments", "Marketing", "Reporting"] },
              { title: "Resources", items: ["Help center", "Blog", "Community", "Partners"] },
              { title: "Legal", items: ["Terms", "Privacy", "Cookies", "Security"] },
            ].map((col) => (
              <div key={col.title}>
                <div className="font-bold text-white">{col.title}</div>
                <ul className="mt-4 space-y-2 text-sm">
                  {col.items.map((it) => (
                    <li key={it}>
                      <a href="#" className="hover:text-white transition-colors">
                        {it}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm">© {new Date().getFullYear()} Saloon System. All rights reserved.</div>
            <div className="flex items-center gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors" aria-label="Social">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
