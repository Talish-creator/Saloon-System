import { o as __toESM } from "../_runtime.mjs";
import { i as venues } from "./venues-BJIXWGpN.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, I as Check, P as ChevronRight, T as Heart, l as Share, s as Star, x as MapPin } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader, t as MarketplaceFooter } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { t as Route } from "./venue._slug-CGLNxPNB.mjs";
import { t as VenueMap } from "./venue-map-BKxmYwN8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/venue._slug-C-PBurus.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"Services",
	"Portfolio",
	"Team",
	"Reviews",
	"Buy",
	"About"
];
function VenuePage() {
	const { venue } = Route.useLoaderData();
	const [activeTab, setActiveTab] = (0, import_react.useState)("Services");
	const [openCat, setOpenCat] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)([]);
	const categories = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		venue.services.forEach((s) => {
			const list = map.get(s.category) ?? [];
			list.push(s);
			map.set(s.category, list);
		});
		return Array.from(map.entries());
	}, [venue.services]);
	const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-20 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-zinc-500 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/marketplace",
							className: "hover:text-zinc-900",
							children: "Home"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: venue.country }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: venue.city }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-zinc-900 font-medium truncate",
							children: venue.name
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid grid-cols-4 grid-rows-2 gap-2 h-[420px] rounded-3xl overflow-hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-span-2 row-span-2 bg-gray-100 overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: venue.images[0],
							alt: venue.name,
							className: "h-full w-full object-cover"
						})
					}), venue.images.slice(1, 5).map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-gray-100 overflow-hidden relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: "",
							className: "h-full w-full object-cover"
						}), i === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "absolute bottom-3 right-3 rounded-full bg-white/95 backdrop-blur px-4 py-2 text-sm font-semibold shadow-md",
							children: "See all photos"
						})]
					}, i))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex items-start justify-between gap-6 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-4xl md:text-5xl font-extrabold tracking-tight",
						children: venue.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: venue.rating.toFixed(1)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-zinc-500",
										children: [
											"(",
											venue.reviews.toLocaleString(),
											")"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-xs font-semibold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }),
									" Open until ",
									venue.openUntil
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex items-center gap-1 text-zinc-600",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" }),
									" ",
									venue.address
								]
							})
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share, { className: "h-4 w-4" }), " Share"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-4 w-4" }), " Save"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-3 sm:px-6 lg:px-8 mt-6 sm:mt-8 pb-16 sm:pb-24 max-w-full overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-6 lg:gap-10 w-full max-w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "sticky top-16 bg-white z-30 -mx-4 px-4 py-2 border-b border-gray-100 flex gap-2 overflow-x-auto scrollbar-none",
							children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveTab(t),
								className: `shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${activeTab === t ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-gray-100"}`,
								children: t
							}, t))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
								initial: {
									opacity: 0,
									y: 8
								},
								animate: {
									opacity: 1,
									y: 0
								},
								exit: {
									opacity: 0,
									y: -8
								},
								transition: { duration: .25 },
								className: "pt-6 sm:pt-8 w-full min-w-0",
								children: [
									activeTab === "Services" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-extrabold tracking-tight mb-4",
										children: "Services"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3 w-full",
										children: categories.map(([cat, items]) => {
											const isOpen = openCat === cat || openCat === null;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setOpenCat(openCat === cat ? null : cat),
												className: "w-full flex items-center justify-between py-3 border-b border-gray-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-lg font-bold",
													children: cat
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-sm text-zinc-500",
													children: [items.length, " services"]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
												initial: false,
												children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
													initial: {
														height: 0,
														opacity: 0
													},
													animate: {
														height: "auto",
														opacity: 1
													},
													exit: {
														height: 0,
														opacity: 0
													},
													className: "overflow-hidden",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "divide-y divide-gray-100",
														children: items.map((s) => {
															const id = `${cat}-${s.name}`;
															const isSel = selected.includes(id);
															return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "py-4 flex items-start justify-between gap-3 sm:gap-6 min-w-0",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex-1 min-w-0",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "font-semibold text-sm sm:text-base",
																			children: s.name
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "text-xs sm:text-sm text-zinc-500 mt-0.5",
																			children: s.duration
																		}),
																		s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "text-xs sm:text-sm text-zinc-600 mt-1.5 max-w-lg break-words",
																			children: s.description
																		})
																	]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-right",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "font-semibold whitespace-nowrap",
																		children: s.price
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		onClick: () => toggle(id),
																		className: `mt-2 h-9 w-9 rounded-full border-2 grid place-items-center transition-colors ${isSel ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300 hover:border-zinc-900"}`,
																		"aria-label": isSel ? "Remove" : "Add",
																		children: isSel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-xl leading-none",
																			children: "+"
																		})
																	})]
																})]
															}, id);
														})
													})
												})
											})] }, cat);
										})
									})] }),
									activeTab === "Portfolio" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-extrabold tracking-tight mb-6",
										children: "Portfolio"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 md:grid-cols-3 gap-3",
										children: venue.portfolio.map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "aspect-square rounded-2xl overflow-hidden bg-gray-100",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src,
												alt: "",
												className: "h-full w-full object-cover hover:scale-105 transition-transform duration-500"
											})
										}, i))
									})] }),
									activeTab === "Team" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-extrabold tracking-tight mb-6",
										children: "Team"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid grid-cols-2 md:grid-cols-4 gap-4",
										children: venue.team.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "aspect-square rounded-full overflow-hidden bg-gray-100 mb-3",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: m.img,
														alt: m.name,
														className: "h-full w-full object-cover"
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold",
													children: m.name
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-center gap-1 text-xs text-zinc-500 mt-0.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-zinc-900 text-zinc-900" }), m.rating.toFixed(1)]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-zinc-500 mt-0.5",
													children: m.role
												})
											]
										}, m.name))
									})] }),
									activeTab === "Reviews" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline gap-3 mb-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-2xl font-extrabold tracking-tight",
											children: "Reviews"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-bold",
													children: venue.rating.toFixed(1)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-zinc-500",
													children: [
														"(",
														venue.reviews.toLocaleString(),
														")"
													]
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid md:grid-cols-2 gap-4",
										children: venue.reviewsList.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-gray-200 p-5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: `h-10 w-10 rounded-full grid place-items-center text-white font-semibold ${r.avatarColor}`,
														children: r.name[0]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold",
														children: r.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs text-zinc-500",
														children: r.date
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "mt-3 flex gap-0.5",
													children: [
														0,
														1,
														2,
														3,
														4
													].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `h-3.5 w-3.5 ${n < r.rating ? "fill-zinc-900 text-zinc-900" : "text-zinc-300"}` }, n))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-3 text-sm text-zinc-700 leading-relaxed",
													children: r.text
												})
											]
										}, r.name + r.date))
									})] }),
									activeTab === "Buy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-2xl font-extrabold tracking-tight mb-3",
										children: "Buy"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-zinc-600",
										children: "No products or memberships available right now."
									})] }),
									activeTab === "About" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-2xl font-extrabold tracking-tight mb-4",
											children: "About"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-zinc-700 leading-relaxed max-w-2xl",
											children: venue.about
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-10 font-bold mb-3",
											children: "Opening times"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "max-w-md text-sm",
											children: venue.hours.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex justify-between py-1.5 border-b border-gray-100 last:border-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-zinc-700",
													children: h.day
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: h.closed ? "text-rose-600" : "text-zinc-900",
													children: h.hours
												})]
											}, h.day))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-10 font-bold mb-3",
											children: "Additional information"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex flex-wrap gap-2",
											children: venue.amenities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded-full bg-zinc-50 border border-gray-200 px-3 py-1 text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5 text-emerald-600" }),
													" ",
													a
												]
											}, a))
										})
									] })
								]
							}, activeTab)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "lg:sticky lg:top-24 self-start w-full min-w-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-gray-200 shadow-sm p-4 sm:p-6 bg-white w-full max-w-full overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1 text-sm mb-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											children: venue.rating.toFixed(1)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-zinc-500",
											children: [
												"(",
												venue.reviews.toLocaleString(),
												")"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-lg",
									children: venue.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm text-zinc-500",
									children: venue.address
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center gap-2 text-xs text-zinc-500",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }),
										" Open until ",
										venue.openUntil
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/booking/$slug",
									params: { slug: venue.slug },
									search: {
										services: selected.map((id) => id.split("-").slice(1).join("-")).join("|"),
										date: "",
										time: ""
									},
									className: "mt-6 block w-full text-center rounded-full bg-zinc-900 text-white py-3.5 text-[15px] font-semibold hover:bg-zinc-800",
									children: "Book now"
								}),
								selected.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 text-center text-sm text-zinc-600",
									children: [
										selected.length,
										" service",
										selected.length > 1 ? "s" : "",
										" selected"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-6 border-t border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold uppercase tracking-wide text-zinc-500 mb-2",
										children: "Amenities"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "space-y-1.5 text-sm",
										children: venue.amenities.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-emerald-600" }),
												" ",
												a
											]
										}, a))
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 pb-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-2xl font-extrabold tracking-tight mb-2 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-6 w-6 text-zinc-900" }), " Shop Location & Map"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-zinc-600 text-sm mb-6",
							children: venue.address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VenueMap, {
							venueName: venue.name,
							address: venue.address,
							city: venue.city,
							country: venue.country,
							height: "400px"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold tracking-tight mb-6",
						children: "Recommended"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-6",
						children: venues.filter((v) => v.slug !== venue.slug).slice(0, 4).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/venue/$slug",
							params: { slug: v.slug },
							className: "group block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: v.images[0],
									alt: v.name,
									className: "h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: v.rating.toFixed(1)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-zinc-500",
												children: [
													"(",
													v.reviews.toLocaleString(),
													")"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 font-semibold",
										children: v.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm text-zinc-500",
										children: [
											v.city,
											", ",
											v.country
										]
									})
								]
							})]
						}, v.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceFooter, {})
		]
	});
}
//#endregion
export { VenuePage as component };
