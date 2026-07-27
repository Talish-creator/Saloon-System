import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Award, E as Facebook, F as ChevronDown, I as Check, a as TrendingUp, b as Menu, c as ShieldCheck, g as Play, i as Twitter, k as CreditCard, o as Store, s as Star, t as Youtube, u as Settings, w as Instagram } from "../_libs/lucide-react.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as industries$1 } from "./industries-3j3fqacY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CqyHUQfD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var industries = industries$1.map((i) => ({
	name: i.name,
	slug: i.slug,
	img: i.images[0]
}));
var stats = [
	{
		value: "4.8",
		label: null,
		stars: true
	},
	{
		value: "130,000+",
		label: "Partner businesses"
	},
	{
		value: "450,000+",
		label: "Professionals"
	},
	{
		value: "1 Billion+",
		label: "Appointments booked"
	},
	{
		value: "120+",
		label: "Countries"
	}
];
var badges = [
	"Capterra Shortlist 2024",
	"Capterra Best Value 2024",
	"Easiest to use Summer 2024",
	"HIPAA Compliant",
	"ISO 9001 Certified",
	"HITRUST CFS Certified"
];
var pillars = [
	{
		icon: Settings,
		title: "Manage",
		text: "Manage bookings, sales, clients, locations, team members. Analyse your business with advanced reporting and analytics."
	},
	{
		icon: TrendingUp,
		title: "Grow",
		text: "Win new clients on the world's largest beauty and wellness marketplace. Keep them coming back with marketing features."
	},
	{
		icon: CreditCard,
		title: "Get paid",
		text: "Get paid fast with seamless payment processing. Reduce no-shows with upfront payments and simplify checkout."
	}
];
var featureBlocks = [
	{
		header: "All-in-one software to run your business",
		items: [
			"Most loved and the top-rated booking software for salons, spas and wellness businesses.",
			"Powerful calendar with unlimited bookings, clients, locations and team members.",
			"Advanced insights providing a 360 degree view of each client's history and behaviour.",
			"Crafted to deliver a smooth experience for you, your team and your clients."
		],
		img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1400&auto=format&fit=crop&q=80",
		imageRight: true
	},
	{
		header: "The most popular marketplace to grow your business",
		items: [
			"Promote your business and reach new clients on the world's #1 marketplace for beauty and wellness.",
			"Increase your online visibility by listing your business on the Saloon System marketplace.",
			"Reach millions of clients looking to book beauty and wellness appointments near them.",
			"Free up time and get your clients self-booking online 24/7."
		],
		img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=80",
		imageRight: false
	},
	{
		header: "Power your business with payments",
		items: [
			"Enjoy low cost, safe and hassle-free payments with fully integrated processing.",
			"Take payments anywhere easily, quickly and seamlessly with our card readers.",
			"Reduce no-shows and cancellations by collecting full upfront payments or deposits.",
			"Keep your bank account topped up with daily payouts."
		],
		img: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=1400&auto=format&fit=crop&q=80",
		imageRight: true
	}
];
var testimonials = [
	{
		name: "Chris Ward",
		role: "Founder of HUCKLE",
		text: "I work with booth renters at my top-rated salon in Manhattan. I love Saloon System because it offers my clients a professional appointment booking experience with seamless online booking features that keep my chairs full and my team happy."
	},
	{
		name: "Alex E",
		role: "Hair stylist and owner",
		text: "Saloon System is the top-rated salon software with all the advanced features you need to run a modern business. The Saloon System marketplace has been incredible for our salon business too, we've increased sales by 31%."
	},
	{
		name: "Gayle S",
		role: "Business owner",
		text: "This appointment scheduling software is very user friendly! I accidentally stumbled onto Saloon System and was skeptical at first, but after trying it out — hands down the best salon scheduling system I've seen."
	}
];
function Index() {
	const [activeIndustry, setActiveIndustry] = (0, import_react.useState)(0);
	const [openMenu, setOpenMenu] = (0, import_react.useState)(null);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const industry = industries[activeIndustry];
	const featuresMenu = [
		"Calendar & bookings",
		"Payments",
		"Marketing",
		"Reporting & analytics",
		"Team management",
		"Client management"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white text-zinc-900 antialiased",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/marketplace",
							className: "text-3xl tracking-tight text-zinc-900 lowercase",
							style: {
								fontFamily: "'Instrument Serif', ui-serif, Georgia, serif",
								fontWeight: 400,
								letterSpacing: "-0.02em"
							},
							children: "Saloon System"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden lg:flex items-center gap-1",
							onMouseLeave: () => setOpenMenu(null),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									onMouseEnter: () => setOpenMenu("business"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${openMenu === "business" ? "text-indigo-600" : "text-zinc-800 hover:text-zinc-900"}`,
										children: ["Business types", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${openMenu === "business" ? "rotate-180" : ""}` })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openMenu === "business" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: -8
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -8
										},
										transition: { duration: .15 },
										className: "absolute left-0 top-full pt-3 w-64",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white rounded-2xl shadow-xl border border-gray-100 p-3 max-h-[70vh] overflow-y-auto",
											children: industries.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/business/$slug",
												params: { slug: it.slug },
												onClick: () => setOpenMenu(null),
												className: "block w-full text-left px-4 py-2.5 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50 transition-colors",
												children: it.name
											}, it.slug))
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									onMouseEnter: () => setOpenMenu("features"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: `inline-flex items-center gap-1 px-4 py-2 text-[15px] font-medium rounded-full transition-colors ${openMenu === "features" ? "text-indigo-600" : "text-zinc-800 hover:text-zinc-900"}`,
										children: ["Features", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-4 w-4 transition-transform ${openMenu === "features" ? "rotate-180" : ""}` })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: openMenu === "features" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: -8
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -8
										},
										transition: { duration: .15 },
										className: "absolute left-0 top-full pt-3 w-64",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-white rounded-2xl shadow-xl border border-gray-100 p-3",
											children: featuresMenu.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
												href: "#",
												className: "block px-4 py-2.5 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50 transition-colors",
												children: f
											}, f))
										})
									}) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#",
									className: "px-4 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900 rounded-full",
									children: "Pricing"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/marketplace",
								className: "hidden sm:inline-flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" }), "Marketplace"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-[15px] font-semibold text-white hover:bg-zinc-800 transition-colors",
								children: "Sign up"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "Menu",
								onClick: () => setMobileOpen((v) => !v),
								className: "inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline",
									children: "Menu"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						opacity: 0,
						height: 0
					},
					animate: {
						opacity: 1,
						height: "auto"
					},
					exit: {
						opacity: 0,
						height: 0
					},
					className: "lg:hidden border-t border-gray-100 bg-white overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 pt-2",
								children: "Business types"
							}),
							industries.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/business/$slug",
								params: { slug: it.slug },
								onClick: () => setMobileOpen(false),
								className: "block w-full text-left px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50",
								children: it.name
							}, it.slug)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-wide text-gray-400 px-3 pt-4",
								children: "Features"
							}),
							featuresMenu.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50",
								children: f
							}, f)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50",
								children: "Pricing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								onClick: () => setMobileOpen(false),
								className: "sm:hidden block px-3 py-2 text-[15px] text-zinc-800 rounded-lg hover:bg-gray-50",
								children: "Marketplace"
							})
						]
					})
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "pt-32 pb-16 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 24
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: { duration: .6 },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]",
								children: "The #1 software for Salons and Spas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl text-gray-600 mt-6 max-w-lg",
								children: "Simple, flexible and powerful booking software for your business."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row gap-4 mt-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "inline-flex items-center justify-center rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white hover:bg-zinc-800 transition-colors",
									children: "Get started now"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-4 text-base font-semibold text-zinc-900 hover:bg-gray-50 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4 fill-current" }), "Watch an overview"]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						animate: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .7,
							delay: .1
						},
						className: "relative h-[420px] md:h-[520px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1400&auto=format&fit=crop&q=80",
							alt: "Saloon System calendar app",
							className: "absolute top-0 right-0 w-[85%] h-[80%] object-cover rounded-3xl shadow-2xl"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&auto=format&fit=crop&q=80",
							alt: "Saloon System mobile app",
							className: "absolute bottom-0 left-0 w-[45%] h-[60%] object-cover rounded-3xl shadow-2xl border-4 border-white"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-b border-gray-100 bg-zinc-50 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap justify-around gap-6 md:grid md:grid-cols-5",
						children: stats.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center min-w-[120px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-3xl font-bold text-zinc-900",
								children: s.value
							}), s.stars ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex justify-center gap-0.5",
								children: [
									0,
									1,
									2,
									3,
									4
								].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }, n))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm text-gray-500 uppercase tracking-wide",
								children: s.label
							})]
						}, i))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "industries",
				className: "py-24 px-4 sm:px-6 lg:px-8 scroll-mt-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-3xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-4xl md:text-6xl font-extrabold tracking-tight",
									children: "One platform, infinite possibilities"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg text-gray-600 mt-6",
									children: "Everything you need to grow and thrive. Saloon System is packed with tools to boost sales, manage your calendar, and retain clients, so you can focus on what you do best."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors",
									children: "Get started now"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-12 -mx-4 sm:mx-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-2 overflow-x-auto px-4 sm:px-0 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
								children: industries.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveIndustry(i),
									className: `shrink-0 rounded-full px-5 py-2 text-sm font-medium border transition-colors ${activeIndustry === i ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-900 border-gray-200 hover:border-zinc-400"}`,
									children: it.name
								}, it.name))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 relative aspect-[16/9] rounded-3xl overflow-hidden bg-gray-100",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
								mode: "wait",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
									src: industry.img,
									alt: industry.name,
									initial: {
										opacity: 0,
										x: 30
									},
									animate: {
										opacity: 1,
										x: 0
									},
									exit: {
										opacity: 0,
										x: -30
									},
									transition: { duration: .4 },
									className: "absolute inset-0 w-full h-full object-cover"
								}, industry.name)
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-10 border-t border-b border-gray-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-gray-400",
						children: badges.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm font-medium grayscale",
							children: [b.includes("Compliant") || b.includes("Certified") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, { className: "h-4 w-4" }), b]
						}, b))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-4xl md:text-5xl font-extrabold tracking-tight",
							children: "Everything you need to run your businesses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-gray-600 mt-6",
							children: "Saloon System offers innovative features that bring convenience, efficiency, and an improved experience for both your team members and clients."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 grid md:grid-cols-3 gap-8",
						children: pillars.map((p) => {
							const Icon = p.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-gray-100 p-8 hover:shadow-lg transition-shadow",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex items-center justify-center h-12 w-12 rounded-full bg-zinc-900 text-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-6 text-2xl font-bold",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-gray-600 leading-relaxed",
										children: p.text
									})
								]
							}, p.title);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto",
					children: featureBlocks.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-24 grid md:grid-cols-2 gap-12 items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: b.imageRight ? "order-2 md:order-1" : "order-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-4xl md:text-5xl font-extrabold tracking-tight",
									children: b.header
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-8 space-y-4",
									children: b.items.map((item, j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex gap-3 text-gray-700",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-5 w-5 shrink-0 text-zinc-900 mt-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "leading-relaxed",
											children: item
										})]
									}, j))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "mt-8 inline-flex items-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors",
									children: "Get started now"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: b.imageRight ? "order-1 md:order-2" : "order-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: b.img,
								alt: b.header,
								className: "w-full aspect-[4/3] object-cover rounded-3xl shadow-xl"
							})
						})]
					}, i))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-4xl md:text-5xl font-extrabold tracking-tight text-center",
						children: "Top-rated by the industry"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-16 grid md:grid-cols-3 gap-6",
						children: testimonials.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-xl shadow-sm p-6 flex flex-col",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-0.5",
									children: [
										0,
										1,
										2,
										3,
										4
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-zinc-900 text-zinc-900" }, n))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 text-gray-700 leading-relaxed flex-1",
									children: [
										"\"",
										t.text,
										"\""
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-6 pt-6 border-t border-gray-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-bold text-zinc-900",
										children: t.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm text-gray-500",
										children: t.role
									})]
								})
							]
						}, t.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "bg-zinc-950 text-zinc-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 md:grid-cols-5 gap-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-2xl font-extrabold text-white",
								children: "Saloon System"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm max-w-xs",
								children: "The world's #1 booking software for salons, spas and wellness businesses."
							})]
						}), [
							{
								title: "Product",
								items: [
									"Overview",
									"Pricing",
									"Marketplace",
									"Integrations"
								]
							},
							{
								title: "Features",
								items: [
									"Calendar",
									"Payments",
									"Marketing",
									"Reporting"
								]
							},
							{
								title: "Resources",
								items: [
									"Help center",
									"Blog",
									"Community",
									"Partners"
								]
							},
							{
								title: "Legal",
								items: [
									"Terms",
									"Privacy",
									"Cookies",
									"Security"
								]
							}
						].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-white",
							children: col.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: col.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								children: it
							}) }, it))
						})] }, col.title))]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Saloon System. All rights reserved."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-4",
							children: [
								Facebook,
								Instagram,
								Twitter,
								Youtube
							].map((Icon, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "hover:text-white transition-colors",
								"aria-label": "Social",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
							}, i))
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { Index as component };
