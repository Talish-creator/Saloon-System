import { o as __toESM } from "../_runtime.mjs";
import { i as venues, n as countryCitiesMap, t as countries } from "./venues-BJIXWGpN.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Calendar, P as ChevronRight, T as Heart, U as Apple, d as Search, m as QrCode, n as X, s as Star, x as MapPin, y as Navigation2 } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader, t as MarketplaceFooter } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as industries } from "./industries-3j3fqacY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-B5xaQDGV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var treatmentCategories = [
	{
		name: "Hair Spa",
		count: 342,
		emoji: "💆"
	},
	{
		name: "Haircut",
		count: 1204,
		emoji: "✂️"
	},
	{
		name: "Hair Color",
		count: 812,
		emoji: "🎨"
	},
	{
		name: "Highlights & Balayage",
		count: 421,
		emoji: "✨"
	},
	{
		name: "Blow Dry & Styling",
		count: 566,
		emoji: "💇"
	},
	{
		name: "Keratin Treatment",
		count: 189,
		emoji: "🧴"
	},
	{
		name: "Beard Trim",
		count: 733,
		emoji: "🧔"
	},
	{
		name: "Shave",
		count: 298,
		emoji: "🪒"
	},
	{
		name: "Manicure",
		count: 987,
		emoji: "💅"
	},
	{
		name: "Pedicure",
		count: 812,
		emoji: "🦶"
	},
	{
		name: "Nail Art",
		count: 456,
		emoji: "💖"
	},
	{
		name: "Gel Extensions",
		count: 233,
		emoji: "💎"
	},
	{
		name: "Facial",
		count: 1102,
		emoji: "🧖"
	},
	{
		name: "HydraFacial",
		count: 274,
		emoji: "💧"
	},
	{
		name: "Chemical Peel",
		count: 156,
		emoji: "🍋"
	},
	{
		name: "Waxing",
		count: 645,
		emoji: "🕯️"
	},
	{
		name: "Threading",
		count: 512,
		emoji: "🧵"
	},
	{
		name: "Makeup",
		count: 388,
		emoji: "💄"
	},
	{
		name: "Bridal Makeup",
		count: 129,
		emoji: "👰"
	},
	{
		name: "Massage",
		count: 872,
		emoji: "🙌"
	},
	{
		name: "Aromatherapy",
		count: 214,
		emoji: "🌿"
	},
	{
		name: "Body Scrub",
		count: 178,
		emoji: "🧂"
	},
	{
		name: "Lash Extensions",
		count: 341,
		emoji: "👁️"
	},
	{
		name: "Brow Lamination",
		count: 197,
		emoji: "🖌️"
	},
	{
		name: "Tattoo & Piercing",
		count: 84,
		emoji: "🖤"
	}
];
var treatmentTabs = [
	{
		key: "all",
		label: "All",
		count: null
	},
	{
		key: "treatments",
		label: "Treatments",
		count: "99+"
	},
	{
		key: "venues",
		label: "Venues",
		count: "1,000"
	},
	{
		key: "professionals",
		label: "Professionals",
		count: "500+"
	}
];
function fmtDate(offsetDays) {
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() + offsetDays);
	return d.toLocaleDateString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function Marketplace() {
	const [tab, setTab] = (0, import_react.useState)("professionals");
	const [focused, setFocused] = (0, import_react.useState)(null);
	const [activeCountry, setActiveCountry] = (0, import_react.useState)("United Arab Emirates");
	const [selectedDate, setSelectedDate] = (0, import_react.useState)("");
	const [selectedTime, setSelectedTime] = (0, import_react.useState)("");
	const featured = venues;
	const activeCities = (0, import_react.useMemo)(() => {
		return countryCitiesMap[activeCountry] || [
			"Dubai",
			"Abu Dhabi",
			"Sharjah",
			"Al Ain"
		];
	}, [activeCountry]);
	const [count, setCount] = (0, import_react.useState)(324715);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setCount((c) => c + Math.floor(Math.random() * 3) + 1), 900);
		return () => clearInterval(id);
	}, []);
	const calendar = (0, import_react.useMemo)(() => {
		const today = /* @__PURE__ */ new Date();
		const y = today.getFullYear();
		const m = today.getMonth();
		const first = new Date(y, m, 1).getDay();
		const days = new Date(y, m + 1, 0).getDate();
		const cells = Array.from({ length: first }, () => null);
		for (let d = 1; d <= days; d++) cells.push(d);
		return {
			cells,
			todayDate: today.getDate()
		};
	}, []);
	const timeSlots = [
		{
			key: "any",
			label: "Any time",
			sub: ""
		},
		{
			key: "morning",
			label: "Morning",
			sub: "9am – 12pm"
		},
		{
			key: "afternoon",
			label: "Afternoon",
			sub: "12pm – 5pm"
		},
		{
			key: "evening",
			label: "Evening",
			sub: "5pm – 12am"
		},
		{
			key: "custom",
			label: "Custom",
			sub: ""
		}
	];
	const whenLabel = selectedDate || selectedTime ? `${selectedDate || "Any date"}${selectedTime ? " · " + selectedTime : ""}` : "Any time";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0 -z-10 overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-pink-200/70 via-white to-indigo-300/70" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -top-24 -right-24 h-96 w-96 rounded-full bg-fuchsia-300/40 blur-3xl" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-indigo-300/40 blur-3xl" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]",
							children: "Book local selfcare services"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .1
							},
							className: "mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-600 max-w-2xl mx-auto",
							children: "Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .5,
								delay: .2
							},
							className: "mt-8 sm:mt-10 relative",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto max-w-4xl bg-white rounded-3xl md:rounded-full shadow-xl border border-white p-2 md:p-1.5 flex flex-col md:flex-row items-stretch md:items-center gap-1.5 md:gap-1 ring-4 ring-fuchsia-200/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setFocused(focused === "treatment" ? null : "treatment"),
											className: `flex-1 flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer ${focused === "treatment" ? "bg-gray-50" : "hover:bg-gray-50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-5 w-5 text-zinc-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs sm:text-[15px] text-zinc-800 font-medium",
												children: "All treatments"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setFocused(focused === "where" ? null : "where"),
											className: `flex flex-1 items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer ${focused === "where" ? "bg-gray-50" : "hover:bg-gray-50"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-zinc-500 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs sm:text-[15px] text-zinc-800 font-medium",
												children: "Current location"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											onClick: () => setFocused(focused === "when" ? null : "when"),
											className: `flex flex-1 items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl md:rounded-full cursor-pointer ${focused === "when" ? "bg-gray-50" : "hover:bg-gray-50"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-5 w-5 text-zinc-500 shrink-0" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs sm:text-[15px] text-zinc-800 font-medium truncate",
													children: whenLabel
												}),
												(selectedDate || selectedTime) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: (e) => {
														e.stopPropagation();
														setSelectedDate("");
														setSelectedTime("");
													},
													className: "ml-auto text-zinc-400 hover:text-zinc-700",
													"aria-label": "Clear time",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "w-full md:w-auto inline-flex items-center justify-center rounded-2xl md:rounded-full bg-zinc-900 px-6 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-[15px] font-semibold text-white hover:bg-zinc-800 transition shrink-0",
											children: "Search"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: focused === "treatment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: -6
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -6
									},
									className: "absolute z-30 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 top-full mt-3 w-[calc(100vw-32px)] max-w-lg md:max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex gap-2 overflow-x-auto px-2 pb-3",
										children: treatmentTabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => setTab(t.key),
											className: `shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium border ${tab === t.key ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-700 border-gray-200 hover:bg-gray-50"}`,
											children: [t.label, t.count != null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `inline-flex items-center rounded-full px-1.5 text-xs ${tab === t.key ? "bg-white/20" : "bg-gray-100"}`,
												children: t.count
											})]
										}, t.key))
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "max-h-80 overflow-auto",
										children: tab === "treatments" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid grid-cols-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-zinc-500",
												children: "Popular treatments"
											}), treatmentCategories.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/search",
												search: { q: t.name },
												className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "h-9 w-9 rounded-full bg-gradient-to-br from-fuchsia-100 to-indigo-100 grid place-items-center text-lg",
														children: t.emoji
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 min-w-0",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-semibold text-sm",
															children: t.name
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-xs text-zinc-500",
															children: [t.count.toLocaleString(), " venues"]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-zinc-400" })
												]
											}, t.name))]
										}) : tab === "venues" ? venues.slice(0, 15).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/venue/$slug",
											params: { slug: v.slug },
											className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer block text-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: v.images[0],
													alt: "",
													className: "h-9 w-9 rounded-full object-cover shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-sm truncate",
														children: v.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-zinc-500 truncate",
														children: [
															v.category,
															" · ",
															v.city,
															", ",
															v.country
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-zinc-500 shrink-0",
													children: [v.distanceKm, " mi"]
												})
											]
										}, v.slug)) : venues.slice(0, 12).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/venue/$slug",
											params: { slug: v.slug },
											className: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 cursor-pointer block text-left",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: v.team[0]?.img || v.images[0],
													alt: "",
													className: "h-9 w-9 rounded-full object-cover shrink-0"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1 min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "font-semibold text-sm truncate",
														children: [
															v.team[0]?.name || "Pro Stylist",
															" (",
															v.name,
															")"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-zinc-500 truncate",
														children: [
															v.team[0]?.role || "Therapist",
															" · ",
															v.city,
															", ",
															v.country
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-xs text-zinc-500 shrink-0",
													children: [v.distanceKm, " mi"]
												})
											]
										}, v.slug))
									})]
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: focused === "where" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									initial: {
										opacity: 0,
										y: -6
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -6
									},
									className: "absolute z-30 left-1/2 -translate-x-1/2 top-full mt-3 w-[min(92vw,420px)] bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 text-left",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setFocused(null),
										className: "w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-gray-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid place-items-center h-9 w-9 rounded-full bg-indigo-100 text-indigo-600",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation2, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: "Current location"
										})]
									})
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: focused === "when" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: -6
									},
									animate: {
										opacity: 1,
										y: 0
									},
									exit: {
										opacity: 0,
										y: -6
									},
									className: "absolute z-30 left-1/2 -translate-x-1/2 md:left-auto md:right-4 md:translate-x-0 top-full mt-3 w-[calc(100vw-32px)] max-w-lg md:max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 sm:p-5 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid md:grid-cols-[180px_1fr] gap-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex md:flex-col gap-2 md:gap-3",
											children: [{
												k: "today",
												label: "Today",
												sub: fmtDate(0)
											}, {
												k: "tomorrow",
												label: "Tomorrow",
												sub: fmtDate(1)
											}].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setSelectedDate(q.label),
												className: `flex-1 rounded-2xl border px-4 py-3 text-left ${selectedDate === q.label ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-sm",
													children: q.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-zinc-500",
													children: q.sub
												})]
											}, q.k))
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-7 gap-1 text-center text-sm",
											children: calendar.cells.map((d, i) => {
												const isToday = d === calendar.todayDate;
												const isPast = d != null && d < calendar.todayDate;
												const label = d ? `Day ${d}` : "";
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													disabled: d == null || isPast,
													onClick: () => d && setSelectedDate(label),
													className: `h-9 rounded-full ${d == null ? "" : isPast ? "text-zinc-300" : d != null && selectedDate === label ? "bg-zinc-900 text-white" : isToday ? "ring-1 ring-zinc-900 font-semibold" : "hover:bg-gray-100"}`,
													children: d ?? ""
												}, i);
											})
										}) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 pt-5 border-t border-gray-100",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-3 mb-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-semibold",
													children: "Select time"
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-2 overflow-x-auto pb-1",
												children: timeSlots.map((s) => {
													const label = s.sub ? `${s.label} ${s.sub}` : s.label;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setSelectedTime(s.key === "any" ? "" : label),
														className: `shrink-0 rounded-2xl border px-4 py-2 text-left ${selectedTime === label || s.key === "any" && !selectedTime ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:bg-gray-50"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-sm font-medium",
															children: s.label
														}), s.sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-xs text-zinc-500",
															children: s.sub
														})]
													}, s.key);
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-4 flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setFocused(null),
													className: "rounded-full bg-zinc-900 text-white text-sm font-semibold px-5 py-2",
													children: "Done"
												})
											})
										]
									})]
								}) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								delay: .35,
								duration: .5
							},
							className: "mt-10 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-lg md:text-xl text-zinc-800",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										initial: {
											y: -6,
											opacity: 0
										},
										animate: {
											y: 0,
											opacity: 1
										},
										className: "inline-block font-extrabold tabular-nums",
										children: count.toLocaleString()
									}, count),
									" ",
									"appointments booked today"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mt-6 inline-flex items-center gap-2 rounded-full bg-white text-zinc-900 border border-gray-200 shadow-sm px-5 py-2.5 text-sm font-semibold hover:shadow-md transition",
								children: ["Get the app ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "h-4 w-4" })]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueRow, {
				title: "Recommended",
				subtitle: "Top-rated venues near popular cities",
				venues: featured.slice(0, 4),
				badge: "Featured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueRow, {
				title: "New to Saloon System",
				venues: featured.slice(4, 8)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueRow, {
				title: "Trending",
				venues: [...featured.slice(2, 6)],
				firstBadge: "Deals"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-zinc-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6 sm:mb-8",
						children: "Popular categories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4",
						children: industries.slice(0, 12).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/business/$slug",
							params: { slug: i.slug },
							className: "group relative aspect-[3/4] rounded-2xl overflow-hidden bg-zinc-900",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: i.images[0],
									alt: i.name,
									className: "h-full w-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-500"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white font-bold text-sm sm:text-base md:text-lg",
									children: i.name
								})
							]
						}, i.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 py-16 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-xs sm:text-sm font-semibold",
							children: [
								"Available on",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, { className: "h-4 w-4 sm:h-5 sm:w-5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: "G"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 sm:mt-4 text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight",
							children: "Download the Saloon System app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-zinc-600 max-w-md",
							children: "Book unforgettable beauty and wellness experiences with the Saloon System mobile app"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white px-5 py-3 hover:bg-zinc-800 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px]",
										children: "Download on the"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: "App Store"
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white px-5 py-3 hover:bg-zinc-800 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold",
									children: "G"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-left leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px]",
										children: "Get it on"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										children: "Google Play"
									})]
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-zinc-100 aspect-[9/16]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
								alt: "Saloon System app",
								className: "h-full w-full object-cover"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white bg-zinc-100 aspect-[9/16] mt-6 sm:mt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
								alt: "Saloon System map",
								className: "h-full w-full object-cover"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 py-12 sm:py-16 border-t border-gray-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight",
							children: "Browse by City"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 sm:mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none",
							children: countries.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveCountry(c),
								className: `shrink-0 rounded-full border px-4 py-1.5 text-xs sm:text-sm font-medium transition ${activeCountry === c ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-800 border-gray-200 hover:bg-gray-50"}`,
								children: c
							}, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-6 text-sm",
							children: activeCities.map((city) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold text-zinc-900 mb-2 sm:mb-3 text-base sm:text-sm",
								children: city
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-1.5 text-xs sm:text-sm",
								children: [
									"Hair Salons",
									"Nail Salons",
									"Eyebrows & Lashes",
									"Beauty Salons",
									"Barbers",
									"Massages",
									"Spas & Saunas",
									"Waxing Salons"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/search",
									search: {
										q: s,
										location: city
									},
									className: "text-indigo-600 hover:text-indigo-800 hover:underline transition",
									children: [
										s,
										" in ",
										city
									]
								}) }, s))
							})] }, city))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceFooter, {})
		]
	});
}
function VenueRow({ title, subtitle, venues: items, badge, firstBadge }) {
	const scroller = (0, import_react.useRef)(null);
	const scrollBy = (dir) => {
		const el = scroller.current;
		if (!el) return;
		el.scrollBy({
			left: dir * el.clientWidth * .9,
			behavior: "smooth"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "px-4 sm:px-6 lg:px-8 py-8 sm:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-4 sm:mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 sm:mt-2 text-xs sm:text-base text-zinc-600",
						children: subtitle
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scrollBy(-1),
						"aria-label": "Scroll left",
						className: "hidden md:grid place-items-center h-10 w-10 rounded-full border border-gray-200 bg-white hover:shadow-md transition mr-2 ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 rotate-180" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => scrollBy(1),
						"aria-label": "Scroll right",
						className: "hidden md:grid place-items-center h-10 w-10 rounded-full border border-gray-200 bg-white hover:shadow-md transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				className: "flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none",
				style: { scrollbarWidth: "none" },
				children: items.map((v, i) => {
					const cardBadge = firstBadge && i === 0 ? firstBadge : badge;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/venue/$slug",
						params: { slug: v.slug },
						className: "group shrink-0 snap-start w-[84%] sm:w-[46%] lg:w-[calc((100%-60px)/4)] block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: v.images[0],
									alt: v.name,
									className: "h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
								}),
								cardBadge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-3 left-3 bg-white/95 backdrop-blur text-zinc-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm",
									children: cardBadge
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: (e) => {
										e.preventDefault();
									},
									className: "absolute top-3 right-3 grid place-items-center h-8 w-8 rounded-full bg-white/80 backdrop-blur text-zinc-800 hover:bg-white transition",
									"aria-label": "Favorite",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" })
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-3 sm:pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-base sm:text-[17px] truncate",
										children: v.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-xs sm:text-sm shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: v.rating.toFixed(1)
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs sm:text-sm text-zinc-500 truncate",
									children: [
										v.city,
										", ",
										v.country
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 text-xs sm:text-sm text-zinc-500",
									children: [
										v.category,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-zinc-400",
											children: [
												"· ",
												v.reviews.toLocaleString(),
												" reviews"
											]
										})
									]
								})
							]
						})]
					}, v.slug + i);
				})
			})]
		})
	});
}
//#endregion
export { Marketplace as component };
