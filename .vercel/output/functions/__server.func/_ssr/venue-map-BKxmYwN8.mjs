import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { D as ExternalLink, v as Navigation } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/venue-map-BKxmYwN8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var cityCoords = {
	"Dubai": {
		lat: 25.2048,
		lon: 55.2708
	},
	"Abu Dhabi": {
		lat: 24.4539,
		lon: 54.3773
	},
	"Riyadh": {
		lat: 24.7136,
		lon: 46.6753
	},
	"Jeddah": {
		lat: 21.5433,
		lon: 39.1728
	},
	"Khobar": {
		lat: 26.2172,
		lon: 50.1971
	},
	"Dammam": {
		lat: 26.4207,
		lon: 50.0888
	},
	"Madinah": {
		lat: 24.5247,
		lon: 39.5692
	},
	"Makkah": {
		lat: 21.3891,
		lon: 39.8579
	},
	"Taif": {
		lat: 21.2888,
		lon: 40.4167
	},
	"Doha": {
		lat: 25.2854,
		lon: 51.531
	},
	"Lusail": {
		lat: 25.4167,
		lon: 51.5167
	},
	"Al Rayyan": {
		lat: 25.2919,
		lon: 51.4244
	},
	"Kuwait City": {
		lat: 29.3759,
		lon: 47.9774
	},
	"Salmiya": {
		lat: 29.3333,
		lon: 48.0833
	},
	"Hawally": {
		lat: 29.3333,
		lon: 48
	},
	"Ahmadi": {
		lat: 29.0772,
		lon: 48.0839
	},
	"Farwaniya": {
		lat: 29.2778,
		lon: 47.9583
	},
	"Muscat": {
		lat: 23.588,
		lon: 58.3829
	},
	"Salalah": {
		lat: 17.0151,
		lon: 54.0924
	},
	"Sohar": {
		lat: 24.3461,
		lon: 56.7075
	},
	"Nizwa": {
		lat: 22.9333,
		lon: 57.5333
	},
	"Musandam": {
		lat: 26.1833,
		lon: 56.25
	}
};
function VenueMap({ venueName, address, city = "Dubai", country = "United Arab Emirates", pins, height = "400px" }) {
	const containerRef = (0, import_react.useRef)(null);
	const mapInstanceRef = (0, import_react.useRef)(null);
	const coords = cityCoords[city] || cityCoords["Dubai"];
	const displayPins = pins && pins.length > 0 ? pins : [{
		name: venueName || "Venue Location",
		address,
		rating: 4.8
	}];
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !containerRef.current) return;
		let isMounted = true;
		import("../_libs/leaflet.mjs").then((n) => /* @__PURE__ */ __toESM(n.t())).then((L) => {
			if (!isMounted || !containerRef.current) return;
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
			const map = L.map(containerRef.current, {
				center: [coords.lat, coords.lon],
				zoom: 12,
				zoomControl: true
			});
			mapInstanceRef.current = map;
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
				maxZoom: 19
			}).addTo(map);
			const createCustomIcon = (name, rating) => {
				return L.divIcon({
					className: "custom-leaflet-pin",
					html: `
            <div style="transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; cursor: pointer;">
              <div style="background-color: #18181b; color: white; border-radius: 9999px; padding: 4px 10px; font-weight: 700; font-size: 11px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); border: 2px solid white; white-space: nowrap; display: flex; align-items: center; gap: 4px;">
                <span style="color: #f472b6;">★</span>
                <span>${rating ? rating.toFixed(1) : ""} ${name}</span>
              </div>
              <div style="width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 7px solid #18181b; margin-top: -2px;"></div>
            </div>
          `,
					iconSize: [0, 0],
					iconAnchor: [0, 0]
				});
			};
			displayPins.forEach((p, idx) => {
				const latOffset = (idx * 17 % 50 - 25) * .002;
				const lonOffset = (idx * 29 % 50 - 25) * .002;
				const pinLat = coords.lat + latOffset;
				const pinLon = coords.lon + lonOffset;
				L.marker([pinLat, pinLon], { icon: createCustomIcon(p.name, p.rating) }).addTo(map).bindPopup(`
          <div style="font-family: system-ui, sans-serif; padding: 2px;">
            <strong style="font-size: 13px; color: #111;">${p.name}</strong>
            <p style="font-size: 11px; color: #666; margin: 4px 0 0 0;">${p.address}</p>
          </div>
        `);
			});
		});
		return () => {
			isMounted = false;
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, [
		city,
		address,
		pins
	]);
	const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueName || ""} ${address}`)}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full h-full min-h-[400px] rounded-3xl overflow-hidden border border-gray-200 shadow-md bg-zinc-100 relative flex flex-col",
		style: { height: height || "100%" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: containerRef,
			className: "w-full h-full flex-1 z-0 min-h-[350px]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-gray-100 flex items-center justify-between gap-3 flex-wrap z-10 pointer-events-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-9 w-9 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-bold text-xs text-zinc-900 truncate",
						children: address
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] text-zinc-500 truncate",
						children: [
							city,
							", ",
							country
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: mapsSearchUrl,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex items-center gap-1.5 rounded-full bg-zinc-900 text-white text-xs font-semibold px-4 py-2 hover:bg-zinc-800 transition shrink-0",
				children: ["Directions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
			})]
		})]
	});
}
//#endregion
export { VenueMap as t };
