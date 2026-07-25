import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

export function MarketplaceHeader() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/marketplace"
          className="text-3xl tracking-tight lowercase text-zinc-900"
          style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.02em" }}
        >
          Saloon System
        </Link>
        <div className="flex items-center gap-2">
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
            className="inline-flex items-center rounded-full border border-gray-200 px-5 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50"
          >
            List your business
          </Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50">
            <span className="hidden sm:inline">Menu</span>
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
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
    <footer className="bg-zinc-50 border-t border-gray-100 pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="text-3xl lowercase mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>Saloon System</div>
          <button className="inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium">
            Get the app
          </button>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold text-zinc-900 mb-4">{c.title}</div>
            <ul className="space-y-2 text-sm text-zinc-600">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="hover:text-zinc-900">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gray-200 flex flex-wrap justify-between text-sm text-zinc-500">
        <span>🌐 English (US)</span>
        <span>© {new Date().getFullYear()} Saloon System.com SV Ltd</span>
      </div>
    </footer>
  );
}
