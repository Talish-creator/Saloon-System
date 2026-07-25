import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MapPin, Clock, Share, Heart, ChevronRight, Check } from "lucide-react";
import { MarketplaceHeader, MarketplaceFooter } from "@/components/marketplace-chrome";
import { findVenue, venues } from "@/lib/venues";

export const Route = createFileRoute("/venue/$slug")({
  loader: ({ params }) => {
    const venue = findVenue(params.slug);
    if (!venue) throw notFound();
    return { venue };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Venue — Saloon System" }] };
    const v = loaderData.venue;
    return {
      meta: [
        { title: `${v.name} — ${v.city} | Book on Saloon System` },
        { name: "description", content: `${v.name} in ${v.city}. ${v.rating.toFixed(1)}★ (${v.reviews.toLocaleString()} reviews). Book online instantly.` },
        { property: "og:title", content: `${v.name} — ${v.city}` },
        { property: "og:description", content: `${v.category} · ${v.rating.toFixed(1)}★ (${v.reviews.toLocaleString()} reviews)` },
        { property: "og:image", content: v.images[0] },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: VenuePage,
});

const tabs = ["Services", "Portfolio", "Team", "Reviews", "Buy", "About"] as const;
type Tab = (typeof tabs)[number];

function VenuePage() {
  const { venue } = Route.useLoaderData() as { venue: NonNullable<ReturnType<typeof findVenue>> };
  const [activeTab, setActiveTab] = useState<Tab>("Services");
  const [openCat, setOpenCat] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const categories = useMemo(() => {
    const map = new Map<string, typeof venue.services>();
    venue.services.forEach((s) => {
      const list = map.get(s.category) ?? [];
      list.push(s);
      map.set(s.category, list);
    });
    return Array.from(map.entries());
  }, [venue.services]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />

      {/* Breadcrumb */}
      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-zinc-500 py-4">
          <Link to="/marketplace" className="hover:text-zinc-900">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>{venue.country}</span>
          <ChevronRight className="h-3 w-3" />
          <span>{venue.city}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-zinc-900 font-medium truncate">{venue.name}</span>
        </div>
      </div>

      {/* Photo grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-3xl overflow-hidden">
          <div className="col-span-2 row-span-2 bg-gray-100 overflow-hidden">
            <img src={venue.images[0]} alt={venue.name} className="h-full w-full object-cover" />
          </div>
          {venue.images.slice(1, 5).map((src, i) => (
            <div key={i} className="bg-gray-100 overflow-hidden relative">
              <img src={src} alt="" className="h-full w-full object-cover" />
              {i === 3 && (
                <button className="absolute bottom-3 right-3 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-sm font-semibold shadow-md">
                  See all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Title */}
      <section className="px-4 sm:px-6 lg:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex items-start justify-between gap-6 flex-wrap">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{venue.name}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                <span className="font-bold">{venue.rating.toFixed(1)}</span>
                <span className="text-zinc-500">({venue.reviews.toLocaleString()})</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Open until {venue.openUntil}
              </span>
              <div className="inline-flex items-center gap-1 text-zinc-600">
                <MapPin className="h-4 w-4" /> {venue.address}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              <Share className="h-4 w-4" /> Share
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              <Heart className="h-4 w-4" /> Save
            </button>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 sm:px-6 lg:px-8 mt-8 pb-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10">
          {/* Left */}
          <div>
            {/* Tabs */}
            <div className="sticky top-16 bg-white z-30 -mx-4 px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    activeTab === t ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-gray-100"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="pt-8"
              >
                {activeTab === "Services" && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-4">Services</h2>
                    <div className="space-y-3">
                      {categories.map(([cat, items]) => {
                        const isOpen = openCat === cat || openCat === null;
                        return (
                          <div key={cat}>
                            <button
                              onClick={() => setOpenCat(openCat === cat ? null : cat)}
                              className="w-full flex items-center justify-between py-3 border-b border-gray-100"
                            >
                              <span className="text-lg font-bold">{cat}</span>
                              <span className="text-sm text-zinc-500">{items.length} services</span>
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="divide-y divide-gray-100">
                                    {items.map((s) => {
                                      const id = `${cat}-${s.name}`;
                                      const isSel = selected.includes(id);
                                      return (
                                        <div key={id} className="py-4 flex items-start justify-between gap-6">
                                          <div className="flex-1">
                                            <div className="font-semibold">{s.name}</div>
                                            <div className="text-sm text-zinc-500 mt-0.5">{s.duration}</div>
                                            {s.description && (
                                              <div className="text-sm text-zinc-600 mt-1.5 max-w-lg">{s.description}</div>
                                            )}
                                          </div>
                                          <div className="text-right">
                                            <div className="font-semibold whitespace-nowrap">{s.price}</div>
                                            <button
                                              onClick={() => toggle(id)}
                                              className={`mt-2 h-9 w-9 rounded-full border-2 grid place-items-center transition-colors ${
                                                isSel ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300 hover:border-zinc-900"
                                              }`}
                                              aria-label={isSel ? "Remove" : "Add"}
                                            >
                                              {isSel ? <Check className="h-4 w-4" /> : <span className="text-xl leading-none">+</span>}
                                            </button>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeTab === "Portfolio" && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-6">Portfolio</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {venue.portfolio.map((src, i) => (
                        <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                          <img src={src} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Team" && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-6">Team</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {venue.team.map((m) => (
                        <div key={m.name} className="text-center">
                          <div className="aspect-square rounded-full overflow-hidden bg-gray-100 mb-3">
                            <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="font-semibold">{m.name}</div>
                          <div className="flex items-center justify-center gap-1 text-xs text-zinc-500 mt-0.5">
                            <Star className="h-3 w-3 fill-zinc-900 text-zinc-900" />
                            {m.rating.toFixed(1)}
                          </div>
                          <div className="text-xs text-zinc-500 mt-0.5">{m.role}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Reviews" && (
                  <div>
                    <div className="flex items-baseline gap-3 mb-6">
                      <h2 className="text-2xl font-extrabold tracking-tight">Reviews</h2>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                        <span className="font-bold">{venue.rating.toFixed(1)}</span>
                        <span className="text-zinc-500">({venue.reviews.toLocaleString()})</span>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {venue.reviewsList.map((r) => (
                        <div key={r.name + r.date} className="rounded-2xl border border-gray-200 p-5">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-full grid place-items-center text-white font-semibold ${r.avatarColor}`}>
                              {r.name[0]}
                            </div>
                            <div>
                              <div className="font-semibold">{r.name}</div>
                              <div className="text-xs text-zinc-500">{r.date}</div>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-0.5">
                            {[0, 1, 2, 3, 4].map((n) => (
                              <Star key={n} className={`h-3.5 w-3.5 ${n < r.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-300"}`} />
                            ))}
                          </div>
                          <p className="mt-3 text-sm text-zinc-700 leading-relaxed">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "Buy" && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-3">Buy</h2>
                    <p className="text-zinc-600">No products or memberships available right now.</p>
                  </div>
                )}

                {activeTab === "About" && (
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight mb-4">About</h2>
                    <p className="text-zinc-700 leading-relaxed max-w-2xl">{venue.about}</p>

                    <h3 className="mt-10 font-bold mb-3">Opening times</h3>
                    <ul className="max-w-md text-sm">
                      {venue.hours.map((h) => (
                        <li key={h.day} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0">
                          <span className="text-zinc-700">{h.day}</span>
                          <span className={h.closed ? "text-rose-600" : "text-zinc-900"}>{h.hours}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-10 font-bold mb-3">Additional information</h3>
                    <div className="flex flex-wrap gap-2">
                      {venue.amenities.map((a) => (
                        <span key={a} className="inline-flex items-center gap-1 rounded-full bg-zinc-50 border border-gray-200 px-3 py-1 text-sm">
                          <Check className="h-3.5 w-3.5 text-emerald-600" /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right sidebar */}
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="rounded-3xl border border-gray-200 shadow-sm p-6 bg-white">
              <div className="flex items-center gap-1 text-sm mb-1">
                <Star className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                <span className="font-bold">{venue.rating.toFixed(1)}</span>
                <span className="text-zinc-500">({venue.reviews.toLocaleString()})</span>
              </div>
              <div className="font-bold text-lg">{venue.name}</div>
              <div className="text-sm text-zinc-500">{venue.address}</div>

              <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500">
                <Clock className="h-3.5 w-3.5" /> Open until {venue.openUntil}
              </div>

              <Link
                to="/booking/$slug"
                params={{ slug: venue.slug }}
                search={{
                  services: selected.map((id) => id.split("-").slice(1).join("-")).join("|"),
                  date: "",
                  time: "",
                }}
                className="mt-6 block w-full text-center rounded-full bg-zinc-900 text-white py-3.5 text-[15px] font-semibold hover:bg-zinc-800"
              >
                Book now
              </Link>
              {selected.length > 0 && (
                <div className="mt-3 text-center text-sm text-zinc-600">
                  {selected.length} service{selected.length > 1 ? "s" : ""} selected
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2">Amenities</div>
                <ul className="space-y-1.5 text-sm">
                  {venue.amenities.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" /> {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related venues */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6">Recommended</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.filter((v) => v.slug !== venue.slug).slice(0, 4).map((v) => (
              <Link key={v.slug} to="/venue/$slug" params={{ slug: v.slug }} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
                  <img src={v.images[0]} alt={v.name} className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                </div>
                <div className="pt-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-zinc-900 text-zinc-900" />
                    <span className="font-semibold">{v.rating.toFixed(1)}</span>
                    <span className="text-zinc-500">({v.reviews.toLocaleString()})</span>
                  </div>
                  <div className="mt-1 font-semibold">{v.name}</div>
                  <div className="text-sm text-zinc-500">{v.city}, {v.country}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MarketplaceFooter />
    </div>
  );
}
