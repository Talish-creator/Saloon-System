import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as ChevronDown, I as Check, V as ArrowRight, g as Play, s as Star } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as industries } from "./industries-3j3fqacY.mjs";
import { t as Route } from "./business._slug-B0ryRxgn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business._slug-BcW0Nl0n.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function IndustryPage() {
	const { industry } = Route.useLoaderData();
	const [openFaq, setOpenFaq] = (0, import_react.useState)(0);
	const [activeImg, setActiveImg] = (0, import_react.useState)(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-3xl tracking-tight lowercase",
						style: {
							fontFamily: "'Instrument Serif', serif",
							letterSpacing: "-0.02em"
						},
						children: "Saloon System"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "hidden sm:inline-flex text-sm font-medium text-zinc-700 hover:text-zinc-900 px-3 py-2",
							children: "Home"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800",
							children: "Sign up"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 -z-10 bg-gradient-to-br from-pink-100/60 via-white to-indigo-100/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: { duration: .5 },
							className: "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 backdrop-blur px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-700",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-indigo-500" }), industry.tagline]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .1
							},
							className: "mt-6 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.05]",
							children: industry.headline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .2
							},
							className: "mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto",
							children: industry.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 20
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .6,
								delay: .3
							},
							className: "mt-8 flex flex-col sm:flex-row gap-3 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white hover:bg-zinc-800",
								children: "Get started now"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold hover:bg-gray-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), " Watch an overview"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: industry.images[activeImg],
								alt: industry.name,
								initial: {
									opacity: 0,
									scale: 1.05
								},
								animate: {
									opacity: 1,
									scale: 1
								},
								exit: {
									opacity: 0,
									scale: .98
								},
								transition: { duration: .6 },
								className: "absolute inset-0 w-full h-full object-cover"
							}, activeImg)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2",
							children: industry.images.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setActiveImg(i),
								"aria-label": `Image ${i + 1}`,
								className: `h-2 rounded-full transition-all ${activeImg === i ? "w-8 bg-white" : "w-2 bg-white/60"}`
							}, i))
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-3xl md:text-5xl font-extrabold tracking-tight",
							children: [
								"Built for ",
								industry.name.toLowerCase(),
								" professionals"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-lg text-gray-600",
							children: "Every feature is designed around how you actually work."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid md:grid-cols-3 gap-6",
						children: industry.features.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 24
							},
							whileInView: {
								opacity: 1,
								y: 0
							},
							viewport: {
								once: true,
								margin: "-80px"
							},
							transition: {
								duration: .5,
								delay: i * .1
							},
							className: "rounded-2xl border border-gray-100 p-8 bg-white hover:shadow-lg transition-shadow",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full bg-zinc-900 text-white grid place-items-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-xl font-bold",
									children: f.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-gray-600 leading-relaxed",
									children: f.text
								})
							]
						}, f.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-zinc-50 border-y border-gray-100 py-12 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center",
					children: [
						{
							v: "4.8",
							l: "Average rating"
						},
						{
							v: "130k+",
							l: "Businesses"
						},
						{
							v: "1B+",
							l: "Bookings"
						},
						{
							v: "120+",
							l: "Countries"
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl md:text-4xl font-extrabold text-zinc-900",
							children: s.v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs uppercase tracking-wide text-gray-500",
							children: s.l
						}),
						s.v === "4.8" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex justify-center gap-0.5",
							children: [
								0,
								1,
								2,
								3,
								4
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3.5 w-3.5 fill-zinc-900 text-zinc-900" }, n))
						})
					] }, s.l))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl md:text-5xl font-extrabold tracking-tight text-center",
							children: "Frequently asked questions"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-center text-gray-600",
							children: [
								"Everything you need to know about running your ",
								industry.name.toLowerCase(),
								" business on Saloon System."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 space-y-3",
							children: industry.faqs.map((f, i) => {
								const open = openFaq === i;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-gray-200 bg-white overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setOpenFaq(open ? null : i),
										className: "w-full flex items-center justify-between gap-4 px-6 py-5 text-left",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-zinc-900",
											children: f.q
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-5 w-5 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}` })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
										initial: false,
										children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
											transition: { duration: .25 },
											className: "overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "px-6 pb-6 text-gray-600 leading-relaxed",
												children: f.a
											})
										})
									})]
								}, i);
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-bold tracking-tight",
						children: "Explore other business types"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: industries.filter((i) => i.slug !== industry.slug).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/business/$slug",
							params: { slug: i.slug },
							className: "inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:border-zinc-400 hover:bg-gray-50",
							children: [i.name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
						}, i.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-zinc-950 text-white px-4 sm:px-6 lg:px-8 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-4xl mx-auto text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-3xl md:text-5xl font-extrabold tracking-tight",
							children: [
								"Ready to grow your ",
								industry.name.toLowerCase(),
								" business?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-zinc-400 max-w-xl mx-auto",
							children: "Join hundreds of thousands of professionals worldwide who trust Saloon System."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "mt-8 inline-flex items-center rounded-full bg-white text-zinc-900 px-8 py-4 text-base font-semibold hover:bg-zinc-100",
							children: "Get started now"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "bg-zinc-950 text-zinc-500 border-t border-zinc-900 py-8 px-4 text-center text-sm",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Saloon System. All rights reserved."
				]
			})
		]
	});
}
//#endregion
export { IndustryPage as component };
