import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$4 } from "./booking._slug-Dh0r6FmN.mjs";
import { t as Route$5 } from "./bookings._id-DQXs0q4c.mjs";
import { t as Route$6 } from "./business._slug-B0ryRxgn.mjs";
import { t as Route$7 } from "./search-ifZ8xLCh.mjs";
import { t as Route$8 } from "./venue._slug-CGLNxPNB.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C1NVMeil.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C_M3Ysow.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Saloon System for Business — The #1 software for Salons and Spas" },
			{
				name: "description",
				content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform."
			},
			{
				name: "author",
				content: "Saloon System"
			},
			{
				property: "og:title",
				content: "Saloon System for Business — The #1 software for Salons and Spas"
			},
			{
				property: "og:description",
				content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Saloon System"
			},
			{
				name: "twitter:title",
				content: "Saloon System for Business — The #1 software for Salons and Spas"
			},
			{
				name: "twitter:description",
				content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform."
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.svg",
				type: "image/svg+xml"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$2 = () => import("./routes-CqyHUQfD.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Saloon System for Business — The #1 software for Salons and Spas" },
		{
			name: "description",
			content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform."
		},
		{
			property: "og:title",
			content: "Saloon System for Business — The #1 software for Salons and Spas"
		},
		{
			property: "og:description",
			content: "Simple, flexible and powerful booking software for your business. Manage bookings, grow your clientele, and get paid — all in one platform."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./bookings-si0vw4hn.mjs");
var Route$1 = createFileRoute("/bookings")({
	head: () => ({ meta: [
		{ title: "My bookings — Saloon System" },
		{
			name: "description",
			content: "Track your upcoming, completed and cancelled appointments with live status from ERPNext."
		},
		{
			property: "og:title",
			content: "My bookings — Saloon System"
		},
		{
			property: "og:description",
			content: "Track your upcoming, completed and cancelled appointments with live status from ERPNext."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./marketplace-B5xaQDGV.mjs");
var Route = createFileRoute("/marketplace")({
	head: () => ({ meta: [
		{ title: "Book local selfcare services — Saloon System" },
		{
			name: "description",
			content: "Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide."
		},
		{
			property: "og:title",
			content: "Book local selfcare services — Saloon System"
		},
		{
			property: "og:description",
			content: "Discover top-rated salons, barbers, medspas, wellness studios and beauty experts trusted by millions worldwide."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			property: "og:image",
			content: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$3
});
var BookingsRoute = Route$1.update({
	id: "/bookings",
	path: "/bookings",
	getParentRoute: () => Route$3
});
var MarketplaceRoute = Route.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => Route$3
});
var SearchRoute = Route$7.update({
	id: "/search",
	path: "/search",
	getParentRoute: () => Route$3
});
var BookingSlugRoute = Route$4.update({
	id: "/booking/$slug",
	path: "/booking/$slug",
	getParentRoute: () => Route$3
});
var BookingsIdRoute = Route$5.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => BookingsRoute
});
var BusinessSlugRoute = Route$6.update({
	id: "/business/$slug",
	path: "/business/$slug",
	getParentRoute: () => Route$3
});
var VenueSlugRoute = Route$8.update({
	id: "/venue/$slug",
	path: "/venue/$slug",
	getParentRoute: () => Route$3
});
var BookingsRouteChildren = { BookingsIdRoute };
var rootRouteChildren = {
	IndexRoute,
	BookingsRoute: BookingsRoute._addFileChildren(BookingsRouteChildren),
	MarketplaceRoute,
	SearchRoute,
	BookingSlugRoute,
	BusinessSlugRoute,
	VenueSlugRoute
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
