import { MapPin, Navigation, ExternalLink, Star } from "lucide-react";

type MapPinItem = {
  name: string;
  rating?: number;
  address: string;
  city?: string;
  country?: string;
  slug?: string;
};

type VenueMapProps = {
  venueName?: string;
  address: string;
  city?: string;
  country?: string;
  pins?: MapPinItem[];
  height?: string;
};

// Map coordinates for GCC cities
const cityCoords: Record<string, { lat: number; lon: number }> = {
  "Dubai": { lat: 25.2048, lon: 55.2708 },
  "Abu Dhabi": { lat: 24.4539, lon: 54.3773 },
  "Riyadh": { lat: 24.7136, lon: 46.6753 },
  "Jeddah": { lat: 21.5433, lon: 39.1728 },
  "Khobar": { lat: 26.2172, lon: 50.1971 },
  "Dammam": { lat: 26.4207, lon: 50.0888 },
  "Madinah": { lat: 24.5247, lon: 39.5692 },
  "Makkah": { lat: 21.3891, lon: 39.8579 },
  "Taif": { lat: 21.2888, lon: 40.4167 },
  "Doha": { lat: 25.2854, lon: 51.5310 },
  "Lusail": { lat: 25.4167, lon: 51.5167 },
  "Al Rayyan": { lat: 25.2919, lon: 51.4244 },
  "Kuwait City": { lat: 29.3759, lon: 47.9774 },
  "Salmiya": { lat: 29.3333, lon: 48.0833 },
  "Hawally": { lat: 29.3333, lon: 48.0000 },
  "Ahmadi": { lat: 29.0772, lon: 48.0839 },
  "Farwaniya": { lat: 29.2778, lon: 47.9583 },
  "Muscat": { lat: 23.5880, lon: 58.3829 },
  "Salalah": { lat: 17.0151, lon: 54.0924 },
  "Sohar": { lat: 24.3461, lon: 56.7075 },
  "Nizwa": { lat: 22.9333, lon: 57.5333 },
  "Musandam": { lat: 26.1833, lon: 56.2500 }
};

export function VenueMap({ venueName, address, city = "Dubai", country = "United Arab Emirates", pins, height = "400px" }: VenueMapProps) {
  const coords = cityCoords[city] || cityCoords["Dubai"];
  const bbox = `${coords.lon - 0.05},${coords.lat - 0.05},${coords.lon + 0.05},${coords.lat + 0.05}`;
  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat},${coords.lon}`;
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName || ''} ${address}`)}`;

  const displayPins = pins && pins.length > 0 ? pins : [{ name: venueName || "Venue Location", address, rating: 4.8 }];

  return (
    <div className="w-full rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-zinc-100 relative" style={{ height }}>
      {/* Map iframe */}
      <iframe
        title="Venue Map"
        width="100%"
        height="100%"
        className="w-full h-full border-0 filter grayscale-[15%] contrast-[105%]"
        src={embedUrl}
        loading="lazy"
      />

      {/* Floating pins overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {displayPins.slice(0, 8).map((p, i) => {
          const top = 25 + ((i * 19 + 7) % 50);
          const left = 20 + ((i * 29 + 11) % 60);

          return (
            <div
              key={i}
              className="absolute transform -translate-x-1/2 -translate-y-full pointer-events-auto group"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-white rounded-xl shadow-xl p-2.5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition origin-bottom pointer-events-none z-30 border border-gray-100">
                <div className="font-bold text-xs truncate text-zinc-900">{p.name}</div>
                <div className="text-[11px] text-zinc-500 truncate mt-0.5">{p.address}</div>
                {p.rating && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 mt-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {p.rating.toFixed(1)}
                  </div>
                )}
              </div>

              {/* Pin badge */}
              <div className="bg-zinc-900 text-white rounded-full px-3 py-1.5 font-bold text-xs shadow-xl flex items-center gap-1 border-2 border-white cursor-pointer hover:bg-indigo-600 transition hover:scale-110">
                <MapPin className="h-3.5 w-3.5 text-pink-400" />
                <span className="truncate max-w-[100px]">{p.name}</span>
              </div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-zinc-900 mx-auto -mt-[2px]" />
            </div>
          );
        })}
      </div>

      {/* Action overlay bar */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center justify-between gap-3 flex-wrap pointer-events-auto">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center shrink-0">
            <Navigation className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="font-bold text-xs text-zinc-900 truncate">{address}</div>
            <div className="text-[11px] text-zinc-500 truncate">{city}, {country}</div>
          </div>
        </div>
        <a
          href={mapsSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold px-4 py-2 hover:bg-zinc-800 transition shrink-0"
        >
          Directions <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
