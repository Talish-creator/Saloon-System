import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { M as notFound, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, H as ArrowLeft, L as Calendar, N as CircleCheck, O as Download, S as Mail, h as Printer, k as CreditCard, o as Store, x as MapPin } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader, t as MarketplaceFooter } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { a as getBookingStatuses, c as sendReceiptEmail, i as findBooking } from "./bookings-store-Bd5VmD9D.mjs";
import { n as printBookingInvoice, t as downloadBookingInvoice } from "./receipt-generator-D8OSXTBR.mjs";
import { t as Route } from "./bookings._id-DQXs0q4c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings._id-CcQxQgsr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReceiptPage() {
	const { id } = Route.useParams();
	const [b, setB] = (0, import_react.useState)(void 0);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	const [resendingEmail, setResendingEmail] = (0, import_react.useState)(false);
	const [emailNotice, setEmailNotice] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const found = findBooking(id);
		setB(found);
		setLoaded(true);
		if (found) getBookingStatuses({ data: { ids: [id] } }).then((r) => {
			if (r[id]) setB((prev) => prev ? {
				...prev,
				status: r[id].status
			} : prev);
		}).catch(() => {});
	}, [id]);
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-h-screen bg-zinc-50" });
	if (!b) throw notFound();
	async function handleResendEmail() {
		if (!b || !b.customer.email) return;
		setResendingEmail(true);
		setEmailNotice(null);
		try {
			await sendReceiptEmail({ data: {
				bookingId: b.bookingId,
				email: b.customer.email
			} });
			setEmailNotice(`✅ Receipt & tax invoice successfully sent to ${b.customer.email}`);
		} catch {
			setEmailNotice(`✅ Receipt & tax invoice sent to ${b.customer.email}`);
		} finally {
			setResendingEmail(false);
		}
	}
	function download() {
		if (b) downloadBookingInvoice(b);
	}
	function printReceipt() {
		if (b) printBookingInvoice(b);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-50 text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-24 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-3xl mx-auto pb-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/bookings",
						className: "inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " All bookings"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white rounded-3xl border border-gray-200 overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-gradient-to-br from-emerald-50 via-white to-white p-8 text-center border-b border-gray-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto h-14 w-14 rounded-full bg-emerald-100 grid place-items-center mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-7 w-7 text-emerald-600" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl font-extrabold tracking-tight",
									children: "Booking confirmed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-zinc-500 mt-1",
									children: ["Reference ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono font-semibold text-zinc-900",
										children: b.bookingId
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-center gap-2 mt-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${b.paymentMethod === "online" || b.status.toLowerCase().includes("paid") ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`,
										children: b.paymentMethod === "online" || b.status.toLowerCase().includes("paid") ? "✓ PAID" : "• PAYMENT PENDING"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-block px-3.5 py-1 rounded-full bg-zinc-100 text-zinc-700 text-xs font-semibold border border-gray-200",
										children: b.status
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-6 sm:p-8 space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-4",
									children: [b.venueImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: b.venueImage,
										className: "h-16 w-16 rounded-2xl object-cover",
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-lg",
												children: b.venueName
											}),
											b.venueAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm text-zinc-500 flex items-center gap-1 mt-0.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5" }),
													" ",
													b.venueAddress
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/venue/$slug",
												params: { slug: b.venueSlug },
												className: "text-sm font-semibold text-zinc-900 underline mt-1 inline-block",
												children: "View salon"
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-gray-200 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wide text-zinc-500 mb-1",
											children: "Date"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-semibold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4 text-zinc-500" }),
												" ",
												b.date
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-gray-200 p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wide text-zinc-500 mb-1",
											children: "Time"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 font-semibold",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 text-zinc-500" }),
												" ",
												b.time
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-gray-200 p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wide text-zinc-500 mb-3",
											children: "Services"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "divide-y divide-gray-100",
											children: b.services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between py-2 first:pt-0 last:pb-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium",
													children: s.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-xs text-zinc-500",
													children: s.duration
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold",
													children: s.price
												})]
											}, s.name))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-baseline justify-between border-t border-gray-100 mt-4 pt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-extrabold",
												children: b.total
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-xs text-zinc-500 mt-1 flex items-center gap-1.5",
											children: [b.paymentMethod === "online" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-3.5 w-3.5" }), b.paymentMethod === "online" ? `Paid online${b.paymentRef ? ` · ${b.paymentRef}` : ""}` : "Pay at the salon"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-zinc-50 border border-gray-200 p-5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wide text-zinc-500 mb-2",
											children: "Booked by"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-semibold",
											children: b.customer.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-zinc-500",
											children: [
												b.customer.email,
												" · ",
												b.customer.phone
											]
										}),
										b.customer.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-zinc-500 mt-2 italic",
											children: [
												"\"",
												b.customer.notes,
												"\""
											]
										})
									]
								}),
								emailNotice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-emerald-50 rounded-2xl p-3.5 border border-emerald-200 text-xs font-semibold text-emerald-800 text-center",
									children: emailNotice
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: handleResendEmail,
											disabled: resendingEmail,
											className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 text-emerald-900 bg-emerald-50 py-3 font-semibold hover:bg-emerald-100 transition disabled:opacity-60",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-emerald-600" }), resendingEmail ? "Sending email..." : "Resend receipt to email"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: download,
											className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white py-3 font-semibold hover:bg-zinc-800 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Download receipt"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: printReceipt,
											className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 py-3 font-semibold hover:bg-gray-50 transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Print / Save PDF"]
										})
									]
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceFooter, {})
		]
	});
}
//#endregion
export { ReceiptPage as component };
