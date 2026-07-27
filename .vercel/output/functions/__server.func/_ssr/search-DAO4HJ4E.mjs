import { o as __toESM } from "../_runtime.mjs";
import { i as venues } from "./venues-BJIXWGpN.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Star, x as MapPin } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { t as Route } from "./search-ifZ8xLCh.mjs";
import { t as VenueMap } from "./venue-map-BKxmYwN8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-DAO4HJ4E.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchResults() {
	const { q, location } = Route.useSearch();
	const [page, setPage] = (0, import_react.useState)(1);
	const query = (q || "").trim().toLowerCase();
	const locQuery = (location || "").trim().toLowerCase();
	const words = query.split(/\s+/).filter(Boolean);
	let results = venues.filter((v) => {
		if (locQuery) {
			if (!(v.city.toLowerCase().includes(locQuery) || v.country.toLowerCase().includes(locQuery) || v.address.toLowerCase().includes(locQuery))) return false;
		}
		if (!query) return true;
		if (v.name.toLowerCase().includes(query)) return true;
		if (v.category.toLowerCase().includes(query)) return true;
		return v.services.some((s) => s.name.toLowerCase().includes(query) || s.category.toLowerCase().includes(query));
	});
	if (results.length === 0 && words.length > 0) results = venues.filter((v) => {
		if (locQuery) {
			if (!(v.city.toLowerCase().includes(locQuery) || v.country.toLowerCase().includes(locQuery) || v.address.toLowerCase().includes(locQuery))) return false;
		}
		return words.some((w) => v.name.toLowerCase().includes(w) || v.category.toLowerCase().includes(w) || v.services.some((s) => s.name.toLowerCase().includes(w) || s.category.toLowerCase().includes(w)));
	});
	const isFallback = results.length === 0;
	const displayResults = isFallback ? venues : results;
	const visibleResults = displayResults.slice(0, page * 20);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white text-zinc-900 flex flex-col",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 flex flex-col md:flex-row pt-[72px] h-[100dvh] overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full md:w-[55%] lg:w-[45%] h-full overflow-y-auto border-r border-gray-200 bg-zinc-50 p-4 sm:p-6 pb-24 scrollbar-hide",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-extrabold tracking-tight",
							children: query ? `Results for "${q}"` : "All venues"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-zinc-500 text-sm mt-1",
							children: isFallback ? "No exact matches found. Showing top-rated venues near you:" : `${displayResults.length} venue${displayResults.length === 1 ? "" : "s"} found`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-6",
						children: visibleResults.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/venue/$slug",
								params: { slug: v.slug },
								className: "block",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex aspect-[21/9] bg-gray-100 overflow-hidden relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: v.images[0],
										className: "w-full h-full object-cover group-hover:scale-105 transition duration-500",
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-amber-400 text-amber-400" }),
											" ",
											v.rating.toFixed(1)
										]
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/venue/$slug",
									params: { slug: v.slug },
									className: "block group",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold group-hover:text-indigo-600 transition",
										children: v.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-sm text-zinc-500 mt-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
											" ",
											v.address
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 space-y-2 border-t border-gray-100 pt-4",
									children: [v.services.slice(0, 4).map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between group",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 pr-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-sm truncate",
												children: s.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-zinc-500",
												children: s.duration
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right flex items-center gap-4 shrink-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-sm whitespace-nowrap",
												children: s.price
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/booking/$slug",
												params: { slug: v.slug },
												search: { services: s.name },
												className: "rounded-full bg-zinc-900 text-white px-3.5 py-1.5 text-xs font-semibold hover:bg-zinc-800 transition",
												children: "Book"
											})]
										})]
									}, i)), v.services.length > 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/venue/$slug",
										params: { slug: v.slug },
										className: "inline-block mt-3 text-sm text-indigo-600 font-semibold hover:underline",
										children: [
											"See all ",
											v.services.length,
											" services"
										]
									})]
								})]
							})]
						}, v.slug))
					}),
					visibleResults.length < displayResults.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setPage((prev) => prev + 1),
							className: "rounded-full bg-zinc-900 text-white px-6 py-3 text-sm font-bold hover:bg-zinc-800 transition shadow-sm",
							children: [
								"Load More Venues (",
								visibleResults.length,
								" of ",
								displayResults.length,
								")"
							]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden md:flex flex-col flex-1 bg-zinc-100 p-4 h-full min-h-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueMap, {
					address: displayResults[0]?.address || "Downtown Dubai, Dubai, United Arab Emirates",
					city: displayResults[0]?.city || "Dubai",
					country: displayResults[0]?.country || "United Arab Emirates",
					height: "100%",
					pins: displayResults.slice(0, 10).map((v) => ({
						name: v.name,
						rating: v.rating,
						address: v.address,
						city: v.city,
						country: v.country,
						slug: v.slug
					}))
				})
			})]
		})]
	});
}
//#endregion
export { SearchResults as component };
