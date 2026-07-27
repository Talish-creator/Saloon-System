import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Calendar, R as Building2, b as Menu, d as Search, n as X, r as User } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-chrome-Bvv4wHW9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MarketplaceHeader() {
	const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/marketplace",
				className: "text-2xl sm:text-3xl tracking-tight lowercase text-zinc-900 font-serif",
				style: {
					fontFamily: "'Instrument Serif', serif",
					letterSpacing: "-0.02em"
				},
				children: "Saloon System"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 sm:gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "#",
						className: "hidden sm:inline-flex px-3 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900",
						children: "Log in"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/bookings",
						className: "hidden sm:inline-flex px-3 py-2 text-[15px] font-medium text-zinc-800 hover:text-zinc-900",
						children: "My bookings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center rounded-full border border-gray-200 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition",
						children: "List your business"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setMobileMenuOpen(!mobileMenuOpen),
						className: "inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gray-200 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-[15px] font-medium text-zinc-900 hover:bg-gray-50 transition",
						"aria-label": "Toggle menu",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Menu"
						}), mobileMenuOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-4 w-4" })]
					})
				]
			})]
		}), mobileMenuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/bookings",
					onClick: () => setMobileMenuOpen(false),
					className: "flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-zinc-500" }), "My Bookings"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/search",
					onClick: () => setMobileMenuOpen(false),
					className: "flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "h-4 w-4 text-zinc-500" }), "Explore All Venues"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					onClick: () => setMobileMenuOpen(false),
					className: "flex items-center gap-3 rounded-2xl bg-zinc-50 p-3 font-semibold text-sm text-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4 text-zinc-500" }), "List Your Business"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					onClick: () => setMobileMenuOpen(false),
					className: "flex items-center gap-3 rounded-2xl border border-gray-200 p-3 font-semibold text-sm text-zinc-900",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-zinc-500" }), "Log in / Sign up"]
				})
			]
		})]
	});
}
function MarketplaceFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-zinc-50 border-t border-gray-100 pt-12 sm:pt-16 pb-10 px-4 sm:px-6 lg:px-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "sm:col-span-2 md:col-span-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-3xl lowercase mb-4 font-serif",
					style: { fontFamily: "'Instrument Serif', serif" },
					children: "Saloon System"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "inline-flex items-center gap-2 rounded-full bg-white border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50 transition",
					children: "Get the app"
				})]
			}), [
				{
					title: "About Saloon System",
					items: [
						"Careers",
						"Help and support",
						"Blog",
						"Sitemap"
					]
				},
				{
					title: "For business",
					items: [
						"For partners",
						"Pricing",
						"Support",
						"Status"
					]
				},
				{
					title: "Legal",
					items: [
						"Privacy Policy",
						"Terms of service",
						"Terms of use"
					]
				},
				{
					title: "Find us on social",
					items: [
						"Facebook",
						"Linkedin",
						"Instagram"
					]
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold text-zinc-900 mb-3 sm:mb-4",
				children: c.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2 text-sm text-zinc-600",
				children: c.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#",
					className: "hover:text-zinc-900 transition",
					children: it
				}) }, it))
			})] }, c.title))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto mt-10 sm:mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-zinc-500 text-center sm:text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌐 English (US)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
				"© ",
				(/* @__PURE__ */ new Date()).getFullYear(),
				" Saloon System.com SV Ltd"
			] })]
		})]
	});
}
//#endregion
export { MarketplaceHeader as n, MarketplaceFooter as t };
