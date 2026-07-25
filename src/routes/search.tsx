import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketplaceHeader } from "@/components/marketplace-chrome";
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
        <div className="hidden md:block flex-1 bg-zinc-200 relative h-full">
          {/* Mock Map Background */}
          <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600&h=1200')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6 }}></div>
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>

          {/* Dummy Map Pins */}
          {displayResults.map((v, i) => {
            // Generate some deterministic but scattered positions for the demo pins
            const top = 15 + ((v.name.length * 7 + i * 23) % 70);
            const left = 15 + ((v.name.length * 11 + i * 37) % 70);
            
            return (
              <Link
                key={v.slug}
                to="/venue/$slug" 
                params={{ slug: v.slug }}
                className="absolute transform -translate-x-1/2 -translate-y-full hover:z-20 group" 
                style={{ top: `${top}%`, left: `${left}%` }}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl p-2 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition origin-bottom pointer-events-none">
                  <div className="font-bold text-sm truncate">{v.name}</div>
                  <div className="flex items-center gap-1 text-xs text-zinc-500 mt-0.5">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400"/> {v.rating.toFixed(1)} ({v.reviews})
                  </div>
                  <div className="text-[10px] text-zinc-400 mt-1 truncate">{v.category}</div>
                </div>
                
                {/* Pin */}
                <div className="bg-zinc-900 text-white rounded-full px-3 py-1.5 font-bold text-sm shadow-lg flex items-center gap-1 border-2 border-white cursor-pointer group-hover:bg-indigo-600 transition group-hover:scale-105">
                  <Star className="h-3.5 w-3.5 fill-white text-white" /> {v.rating.toFixed(1)}
                </div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-zinc-900 group-hover:border-t-indigo-600 mx-auto -mt-[2px] transition-colors"></div>
              </Link>
            );
          })}
          
          {/* Mock Map Controls */}
          <div className="absolute right-6 bottom-8 flex flex-col gap-2">
            <button className="h-10 w-10 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 text-zinc-700 font-bold text-xl">+</button>
            <button className="h-10 w-10 bg-white rounded-xl shadow-md flex items-center justify-center hover:bg-gray-50 text-zinc-700 font-bold text-xl">-</button>
          </div>
        </div>
      </div>
    </div>
  );
}
