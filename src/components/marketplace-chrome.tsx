import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Calendar,
  User,
  Building2,
  Search,
  Heart,
  QrCode,
  Sparkles,
  LogOut,
  ArrowRight,
  Star,
  MapPin,
  Smartphone,
  Eye,
  EyeOff,
  Compass,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { getStoredUser, setStoredUser, subscribeAuth, type SaloonUser } from "@/lib/auth-store";
import { getFavorites, toggleFavorite, subscribeFavorites } from "@/lib/favorites-store";
import { venues } from "@/lib/venues";
import { loadBookings } from "@/lib/bookings-store";

export function MarketplaceHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);

  const [user, setUser] = useState<SaloonUser | null>(null);
  const [favCount, setFavCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    setUser(getStoredUser());
    setFavCount(getFavorites().length);
    setBookingsCount(loadBookings().length);

    const unsubAuth = subscribeAuth(() => setUser(getStoredUser()));
    const unsubFav = subscribeFavorites(() => setFavCount(getFavorites().length));

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      unsubAuth();
      unsubFav();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleSignOut = () => {
    setStoredUser(null);
    toast.success("Signed out successfully");
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] py-2.5"
            : "bg-white/80 backdrop-blur-md border-b border-stone-200/50 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link
              to="/marketplace"
              className="group flex items-center gap-2 text-stone-900 transition-opacity hover:opacity-90"
            >
              <span
                className="text-2xl sm:text-3xl font-serif tracking-tight lowercase text-stone-900"
                style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.03em" }}
              >
                saloon system
              </span>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-stone-100 text-stone-600 border border-stone-200/60">
                <Sparkles className="h-2.5 w-2.5 text-amber-600" />
                Select
              </span>
            </Link>

            {/* Quick Explore Link */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                to="/search"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-full transition"
              >
                <Compass className="h-4 w-4 text-stone-400" />
                Explore Venues
              </Link>
            </nav>
          </div>

          {/* Right Navigation & CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Saved / Favorites Trigger */}
            <button
              onClick={() => setFavoritesOpen(true)}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 rounded-full transition"
              aria-label="View saved venues"
            >
              <Heart className={`h-4 w-4 ${favCount > 0 ? "fill-rose-500 text-rose-500" : "text-stone-500"}`} />
              <span className="hidden sm:inline">Saved</span>
              {favCount > 0 && (
                <span className="inline-flex items-center justify-center h-4 w-4 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                  {favCount}
                </span>
              )}
            </button>

            {/* My Bookings Link */}
            <Link
              to="/bookings"
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100/80 rounded-full transition"
            >
              <Calendar className="h-4 w-4 text-stone-500" />
              <span className="hidden sm:inline">My bookings</span>
              {bookingsCount > 0 && (
                <span className="hidden md:inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-semibold rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                  {bookingsCount}
                </span>
              )}
            </Link>

            {/* List Your Business Link */}
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-xs sm:text-sm font-medium text-stone-800 hover:bg-stone-50 hover:border-stone-400 shadow-2xs transition"
            >
              <Building2 className="h-3.5 w-3.5 text-stone-500" />
              <span>List your business</span>
            </Link>

            {/* Auth / User button */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 transition">
                  <div className="h-6 w-6 rounded-full bg-stone-900 text-white text-xs font-semibold grid place-items-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-stone-800 max-w-[80px] truncate hidden sm:inline">
                    {user.name.split(" ")[0]}
                  </span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-stone-100 py-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                  <div className="px-3.5 py-2 border-b border-stone-100">
                    <div className="text-xs font-semibold text-stone-900 truncate">{user.name}</div>
                    <div className="text-[11px] text-stone-500 truncate">{user.email}</div>
                  </div>
                  <Link
                    to="/bookings"
                    className="flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50"
                  >
                    <Calendar className="h-3.5 w-3.5 text-stone-400" />
                    My Appointments
                  </Link>
                  <button
                    onClick={() => setFavoritesOpen(true)}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-stone-700 hover:bg-stone-50 text-left"
                  >
                    <Heart className="h-3.5 w-3.5 text-stone-400" />
                    Saved Venues ({favCount})
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left"
                  >
                    <LogOut className="h-3.5 w-3.5 text-rose-500" />
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode("login");
                  setAuthOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-stone-900 hover:text-stone-700 transition"
              >
                Log in
              </button>
            )}

            {/* Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-xs sm:text-sm font-medium text-stone-800 hover:bg-stone-50 shadow-2xs transition"
              aria-label="Toggle menu"
            >
              <span className="hidden sm:inline">Menu</span>
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-stone-100 bg-white px-4 pt-4 pb-6 space-y-2.5 shadow-xl"
            >
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3 font-semibold text-sm text-stone-900"
              >
                <Search className="h-4 w-4 text-stone-600" />
                Explore Top Salons & Spas
              </Link>
              <Link
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3 font-semibold text-sm text-stone-900"
              >
                <Calendar className="h-4 w-4 text-stone-600" />
                My Bookings {bookingsCount > 0 && `(${bookingsCount})`}
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setFavoritesOpen(true);
                }}
                className="w-full flex items-center gap-3 rounded-2xl bg-stone-50 p-3 font-semibold text-sm text-stone-900 text-left"
              >
                <Heart className="h-4 w-4 text-rose-500" />
                Saved Venues {favCount > 0 && `(${favCount})`}
              </button>
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 rounded-2xl bg-stone-50 p-3 font-semibold text-sm text-stone-900"
              >
                <Building2 className="h-4 w-4 text-stone-600" />
                List Your Business
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAppModalOpen(true);
                }}
                className="w-full flex items-center gap-3 rounded-2xl bg-stone-50 p-3 font-semibold text-sm text-stone-900 text-left"
              >
                <QrCode className="h-4 w-4 text-stone-600" />
                Get the Mobile App
              </button>
              {!user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("login");
                    setAuthOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-stone-900 text-white p-3 font-semibold text-sm shadow-sm"
                >
                  <User className="h-4 w-4" />
                  Log in / Sign up
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-rose-200 text-rose-600 p-3 font-semibold text-sm hover:bg-rose-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out ({user.name.split(" ")[0]})
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AuthModal
        open={authOpen}
        mode={authMode}
        onClose={() => setAuthOpen(false)}
        onSwitchMode={(m) => setAuthMode(m)}
      />

      {/* Favorites Drawer */}
      <FavoritesDrawer
        open={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />

      {/* Get App Modal */}
      <GetAppModal
        open={appModalOpen}
        onClose={() => setAppModalOpen(false)}
      />
    </>
  );
}

// ----------------------------------------------------
// Auth Modal (Login / Sign Up)
// ----------------------------------------------------
function AuthModal({
  open,
  mode,
  onClose,
  onSwitchMode,
}: {
  open: boolean;
  mode: "login" | "signup";
  onClose: () => void;
  onSwitchMode: (mode: "login" | "signup") => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "signup" && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const displayName = mode === "signup" ? name : email.split("@")[0].replace(/[._]/g, " ");
      setStoredUser({
        name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
        email,
      });
      toast.success(mode === "login" ? "Welcome back!" : "Account created successfully!");
      onClose();
    }, 600);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStoredUser({
        name: "Sophia Vance",
        email: "sophia.vance@example.com",
      });
      toast.success("Logged in with Demo Client account!");
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-100"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mb-6">
          <div className="text-2xl font-serif text-stone-900 lowercase mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
            saloon system
          </div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {mode === "login"
              ? "Sign in to manage appointments & favorite venues"
              : "Join millions booking selfcare with ease"}
          </p>
        </div>

        {/* Quick Social Buttons */}
        <div className="space-y-2 mb-4">
          <button
            onClick={handleDemoLogin}
            type="button"
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 py-2.5 text-xs font-semibold text-stone-800 hover:bg-stone-100 transition shadow-2xs"
          >
            <Sparkles className="h-4 w-4 text-amber-600" />
            Quick Demo 1-Click Login
          </button>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-stone-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-medium text-stone-400 uppercase tracking-wider">
            or continue with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:bg-white focus:outline-hidden transition"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-stone-700 mb-1">Email address</label>
            <input
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-stone-900 focus:bg-white focus:outline-hidden transition"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-medium text-stone-700">Password</label>
              {mode === "login" && (
                <button
                  type="button"
                  onClick={() => toast.info("Password reset instructions sent to your email.")}
                  className="text-[11px] font-medium text-stone-500 hover:text-stone-900"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 pr-10 text-sm text-stone-900 focus:border-stone-900 focus:bg-white focus:outline-hidden transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white hover:bg-stone-800 disabled:opacity-50 transition shadow-sm"
          >
            {loading ? "Processing..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-stone-600">
          {mode === "login" ? (
            <>
              Don't have an account yet?{" "}
              <button
                onClick={() => onSwitchMode("signup")}
                className="font-semibold text-stone-900 underline hover:text-stone-700"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => onSwitchMode("login")}
                className="font-semibold text-stone-900 underline hover:text-stone-700"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Favorites Drawer
// ----------------------------------------------------
function FavoritesDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [favSlugs, setFavSlugs] = useState<string[]>([]);

  useEffect(() => {
    setFavSlugs(getFavorites());
    return subscribeFavorites(() => setFavSlugs(getFavorites()));
  }, []);

  if (!open) return null;

  const favoriteVenues = venues.filter((v) => favSlugs.includes(v.slug));

  const handleRemove = (slug: string) => {
    toggleFavorite(slug);
    toast.info("Removed from saved venues");
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/40 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
      >
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
            <h2 className="text-lg font-bold text-stone-900">Saved Venues</h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
              {favoriteVenues.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
            aria-label="Close saved drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {favoriteVenues.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="h-16 w-16 rounded-full bg-rose-50 text-rose-400 grid place-items-center mb-3">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-base font-bold text-stone-900">No saved venues yet</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Tap the heart icon on any salon, barber or spa card to easily find and book them later.
              </p>
              <Link
                to="/search"
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-stone-900 text-white px-5 py-2 text-xs font-semibold hover:bg-stone-800 transition"
              >
                Browse Top Venues
              </Link>
            </div>
          ) : (
            favoriteVenues.map((v) => (
              <div
                key={v.slug}
                className="group relative flex gap-3.5 p-3 rounded-2xl border border-stone-200/80 bg-white hover:border-stone-300 shadow-2xs hover:shadow-sm transition"
              >
                <img
                  src={v.images[0]}
                  alt={v.name}
                  className="h-20 w-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0 pr-6">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{v.rating.toFixed(1)}</span>
                    <span className="text-stone-400">({v.reviews})</span>
                  </div>
                  <h4 className="font-bold text-sm text-stone-900 truncate mt-0.5">{v.name}</h4>
                  <p className="text-xs text-stone-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {v.city}, {v.country}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                      {v.category}
                    </span>
                    <Link
                      to="/venue/$slug"
                      params={{ slug: v.slug }}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 hover:text-stone-700"
                    >
                      Book <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(v.slug)}
                  className="absolute right-3 top-3 text-stone-300 hover:text-rose-500 p-1"
                  aria-label="Remove favorite"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Get App QR Modal
// ----------------------------------------------------
export function GetAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  if (!open) return null;

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast.error("Please enter a valid phone number");
      return;
    }
    setSent(true);
    toast.success(`Download link sent to ${phone}!`);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-stone-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-stone-100 text-center"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="inline-flex p-3 rounded-2xl bg-stone-100 text-stone-900 mb-3">
          <Smartphone className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold text-stone-900">Get the Saloon System App</h3>
        <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-sm mx-auto">
          Scan the QR code with your phone camera or enter your number to receive an instant download link.
        </p>

        {/* QR Code Container */}
        <div className="my-6 mx-auto w-48 h-48 bg-stone-50 rounded-2xl border border-stone-200 p-4 grid place-items-center shadow-inner">
          <svg viewBox="0 0 100 100" className="w-full h-full text-stone-900">
            {/* Top-left position marker */}
            <rect x="10" y="10" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="16" y="16" width="12" height="12" rx="2" fill="currentColor" />
            {/* Top-right position marker */}
            <rect x="66" y="10" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="72" y="16" width="12" height="12" rx="2" fill="currentColor" />
            {/* Bottom-left position marker */}
            <rect x="10" y="66" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
            <rect x="16" y="72" width="12" height="12" rx="2" fill="currentColor" />
            {/* Matrix dots */}
            <rect x="42" y="12" width="6" height="6" fill="currentColor" />
            <rect x="52" y="18" width="6" height="6" fill="currentColor" />
            <rect x="42" y="28" width="6" height="6" fill="currentColor" />
            <rect x="12" y="44" width="6" height="6" fill="currentColor" />
            <rect x="24" y="44" width="6" height="6" fill="currentColor" />
            <rect x="36" y="44" width="6" height="6" fill="currentColor" />
            <rect x="48" y="44" width="6" height="6" fill="currentColor" />
            <rect x="60" y="44" width="6" height="6" fill="currentColor" />
            <rect x="72" y="44" width="6" height="6" fill="currentColor" />
            <rect x="84" y="44" width="6" height="6" fill="currentColor" />
            <rect x="48" y="56" width="6" height="6" fill="currentColor" />
            <rect x="64" y="66" width="8" height="8" fill="currentColor" />
            <rect x="80" y="74" width="6" height="6" fill="currentColor" />
            <rect x="44" y="76" width="6" height="6" fill="currentColor" />
            <rect x="56" y="82" width="8" height="8" fill="currentColor" />
          </svg>
        </div>

        {/* SMS Form */}
        <form onSubmit={handleSendLink} className="flex gap-2">
          <input
            type="tel"
            placeholder="+971 50 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs sm:text-sm focus:border-stone-900 focus:bg-white focus:outline-hidden"
          />
          <button
            type="submit"
            className="rounded-xl bg-stone-900 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-stone-800 transition shrink-0"
          >
            {sent ? "Sent!" : "Send SMS"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ----------------------------------------------------
// Marketplace Footer
// ----------------------------------------------------
export function MarketplaceFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    toast.success("Thank you for subscribing to Saloon System VIP offers!");
    setEmail("");
  };

  const footerLinks = [
    {
      title: "Discover & Book",
      links: [
        { label: "Hair Salons & Styling", to: "/search?q=Hair" },
        { label: "Massage & Day Spas", to: "/search?q=Spa" },
        { label: "Nails & Pedicures", to: "/search?q=Nail" },
        { label: "Aesthetics & Facials", to: "/search?q=Facial" },
        { label: "Barbershops & Grooming", to: "/search?q=Barber" },
      ],
    },
    {
      title: "Top Cities",
      links: [
        { label: "Salons in Dubai", to: "/search?location=Dubai" },
        { label: "Salons in Abu Dhabi", to: "/search?location=Abu%20Dhabi" },
        { label: "Salons in Riyadh", to: "/search?location=Riyadh" },
        { label: "Salons in Jeddah", to: "/search?location=Jeddah" },
        { label: "Salons in Doha", to: "/search?location=Doha" },
      ],
    },
    {
      title: "For Partners",
      links: [
        { label: "Saloon System for Business", to: "/" },
        { label: "Partner Software Features", to: "/" },
        { label: "Pricing & Plans", to: "/" },
        { label: "Business Community", to: "/" },
      ],
    },
    {
      title: "Company & Trust",
      links: [
        { label: "About Us", to: "#" },
        { label: "Trust & Safety", to: "#" },
        { label: "Help Center", to: "#" },
        { label: "Privacy Policy", to: "#" },
        { label: "Terms of Service", to: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-800 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Newsletter & Brand statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-stone-800">
          <div className="lg:col-span-5 space-y-4">
            <Link
              to="/marketplace"
              className="text-3xl lowercase font-serif tracking-tight text-white block"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              saloon system
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 max-w-sm leading-relaxed">
              The premier marketplace connecting discerning clients with verified luxury salons,
              wellness sanctuaries, and beauty masters worldwide.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>100% Verified Venues · Instant Confirmation</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-stone-800/50 rounded-2xl p-6 border border-stone-800">
            <h4 className="text-sm font-semibold text-white mb-1">
              Join the Self-Care Circle
            </h4>
            <p className="text-xs text-stone-400 mb-4">
              Get exclusive member privileges, seasonal spa discounts, and insider beauty curation.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl border border-stone-700 bg-stone-900/80 px-4 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:border-stone-400 focus:outline-hidden"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-white text-stone-900 px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-stone-100 transition shrink-0"
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800">
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 sm:mb-4">
                {col.title}
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-300">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to.startsWith("/") ? (
                      <Link to={link.to} className="hover:text-white transition">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.to} className="hover:text-white transition">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span>🌐 English (US) · AED / SAR</span>
            <span>·</span>
            <span>All rights reserved</span>
          </div>
          <div>© {new Date().getFullYear()} Saloon System Technologies Inc.</div>
        </div>
      </div>
    </footer>
  );
}
