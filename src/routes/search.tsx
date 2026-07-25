import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketplaceHeader } from "@/components/marketplace-chrome";
import { VenueMap } from "@/components/venue-map";
import { venues } from "@/lib/venues";
import { MapPin, Star } from "lucide-react";

type SearchParams = {
  q?: string;
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  component: SearchResults,
});

function SearchResults() {
  const { q } = Route.useSearch();
  const query = (q || "").trim().toLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  
  // Try exact / multi-word match first
  let results = venues.filter(v => {
    if (!query) return true;
    if (v.name.toLowerCase().includes(query)) return true;
    if (v.category.toLowerCase().includes(query)) return true;
    return v.services.some(s => 
      s.name.toLowerCase().includes(query) || 
      s.category.toLowerCase().includes(query)
    );
  });

  // If no exact match, try matching any individual word (e.g. "Hair" or "Spa")
  if (results.length === 0 && words.length > 0) {
    results = venues.filter(v => {
      return words.some(w => 
        v.name.toLowerCase().includes(w) ||
        v.category.toLowerCase().includes(w) ||
        v.services.some(s => s.name.toLowerCase().includes(w) || s.category.toLowerCase().includes(w))
      );
    });
  }

  // Fallback if still empty: show all venues so user always sees options
  const isFallback = results.length === 0;
  const displayResults = isFallback ? venues : results;

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      <MarketplaceHeader />
      
      <div className="flex-1 flex flex-col md:flex-row pt-[72px] h-[100dvh] overflow-hidden">
        {/* Left Pane: List */}
        <div className="w-full md:w-[55%] lg:w-[45%] h-full overflow-y-auto border-r border-gray-200 bg-zinc-50 p-4 sm:p-6 pb-24 scrollbar-hide">
          <div className="mb-6">
            <h1 className="text-2xl font-extrabold tracking-tight">
              {query ? `Results for "${q}"` : "All venues"}
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              {isFallback 
                ? "No exact matches found. Showing top-rated venues near you:" 
                : `${displayResults.length} venue${displayResults.length === 1 ? "" : "s"} found`}
            </p>
          </div>
          
          <div className="space-y-6">
            {displayResults.map(v => (
              <div key={v.slug} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition">
                <Link to="/venue/$slug" params={{ slug: v.slug }} className="block">
                  <div className="flex aspect-[21/9] bg-gray-100 overflow-hidden relative">
                    <img src={v.images[0]} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {v.rating.toFixed(1)}
                    </div>
                  </div>
                </Link>
                <div className="p-5">
                  <Link to="/venue/$slug" params={{ slug: v.slug }} className="block group">
                    <h2 className="text-xl font-bold group-hover:text-indigo-600 transition">{v.name}</h2>
                    <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1">
                      <MapPin className="h-3.5 w-3.5" /> {v.address}
                    </div>
                  </Link>
                  
                  <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
                    {v.services.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="min-w-0 pr-4">
                          <div className="font-semibold text-sm truncate">{s.name}</div>
                          <div className="text-xs text-zinc-500">{s.duration}</div>
                        </div>
                        <div className="text-right flex items-center gap-4 shrink-0">
                          <div className="font-bold text-sm whitespace-nowrap">{s.price}</div>
                          <Link
                            to="/booking/$slug"
                            params={{ slug: v.slug }}
                            search={{ services: s.name }}
                            className="text-xs font-semibold bg-zinc-900 text-white px-4 py-2 rounded-full hover:bg-zinc-800 transition"
                          >
                            Book
                          </Link>
                        </div>
                      </div>
                    ))}
                    {v.services.length > 4 && (
                      <Link to="/venue/$slug" params={{ slug: v.slug }} className="inline-block mt-3 text-sm text-indigo-600 font-semibold hover:underline">
                        See all {v.services.length} services
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Pane: Map */}
        <div className="hidden md:block flex-1 bg-zinc-100 p-4 h-full">
          <VenueMap
            address={displayResults[0]?.address || "Downtown Dubai, Dubai, United Arab Emirates"}
            city={displayResults[0]?.city || "Dubai"}
            country={displayResults[0]?.country || "United Arab Emirates"}
            height="100%"
            pins={displayResults.slice(0, 10).map(v => ({
              name: v.name,
              rating: v.rating,
              address: v.address,
              city: v.city,
              country: v.country,
              slug: v.slug
            }))}
          />
        </div>
      </div>
    </div>
  );
}
