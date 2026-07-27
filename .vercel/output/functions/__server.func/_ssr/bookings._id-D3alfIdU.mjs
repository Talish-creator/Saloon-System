import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MarketplaceHeader } from "./marketplace-chrome-Bvv4wHW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings._id-D3alfIdU.js
var import_jsx_runtime = require_jsx_runtime();
function BookingNotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pt-32 text-center px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "Booking not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-zinc-500 mt-2",
					children: "We couldn't find that reference on this device."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/bookings",
					className: "inline-block mt-6 rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold",
					children: "Back to my bookings"
				})
			]
		})]
	});
}
//#endregion
export { BookingNotFound as notFoundComponent };
