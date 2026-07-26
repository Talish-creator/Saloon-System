import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Calendar, User, Building2, Search } from "lucide-react";

export function MarketplaceHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/marketplace"
          className="text-2xl sm:text-3xl tracking-tight lowercase text-zinc-900 font-serif"
          style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.02em" }}
        >
          Saloon System
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <a href="#" className="hidden sm:inline-flex px-3 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900">
            Log in
          </a>
          <Link
            to="/bookings"
            className="hidden sm:inline-flex px-3 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900"
          >
            My bookings
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-full border border-gray-200 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition"
          >
            List your business
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition"
            aria-label="Toggle menu"
          >
            <span className="hidden sm:inline">Menu</span>
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer / Overlay Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <Link
            to="/bookings"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900"
          >
            <Calendar className="h-4 w-4 text-zinc-500" />
            My Bookings
          </Link>
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900"
          >
            <Search className="h-4 w-4 text-zinc-500" />
            Explore All Venues
          </Link>
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900"
          >
            <Building2 className="h-4 w-4 text-zinc-500" />
            List Your Business
          </Link>
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 p-3 font-semibold text-sm text-zinc-900"
          >
            <User className="h-4 w-4 text-zinc-500" />
            Log in / Sign up
          </a>
        </div>
      )}
    </header>
  );
}

export function MarketplaceFooter() {
  const cols = [
    { title: "About Saloon System", items: ["Careers", "Help and support", "Blog", "Sitemap"] },
    { title: "For business", items: ["For partners", "Pricing", "Support", "Status"] },
    { title: "Legal", items: ["Privacy Policy", "Terms of service", "Terms of use"] },
    { title: "Find us on social", items: ["Facebook", "Linkedin", "Instagram"] },
  ];
  return (
    <footer className="bg-zinc-50 border-t border-gray-100 pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="text-3xl lowercase mb-4 font-serif" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Saloon System
          </div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition">
            Get the app
          </button>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold text-zinc-900 mb-3 sm:mb-4">{c.title}</div>
            <ul className="space-y-2 text-sm text-zinc-600">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="hover:text-zinc-900 transition">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-500 text-center sm:text-left">
        <span>🌐 English (US)</span>
        <span>© {new Date().getFullYear()} Saloon System.com SV Ltd</span>
      </div>
    </footer>
  );
}
