import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, L as Calendar, M as CircleDot, N as CircleCheck, d as Search, f as RefreshCw, j as CircleX, p as Receipt, x as MapPin, z as Ban } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader, t as MarketplaceFooter } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { a as getBookingStatuses, l as updateBooking, n as cancelBooking, o as loadBookings, t as bucketOf } from "./bookings-store-Bd5VmD9D.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { n as printBookingInvoice, t as downloadBookingInvoice } from "./receipt-generator-D8OSXTBR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-si0vw4hn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	{
		key: "upcoming",
		label: "Upcoming",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "h-4 w-4" })
	},
	{
		key: "completed",
		label: "Completed",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
	},
	{
		key: "cancelled",
		label: "Cancelled",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4" })
	}
];
function statusColor(s) {
	const t = s.toLowerCase();
	if (t.includes("cancel")) return "bg-rose-50 text-rose-700 border-rose-200";
	if (t.includes("complete")) return "bg-zinc-100 text-zinc-700 border-zinc-200";
	if (t.includes("paid") || t.includes("confirm")) return "bg-emerald-50 text-emerald-700 border-emerald-200";
	if (t.includes("service") || t.includes("check")) return "bg-indigo-50 text-indigo-700 border-indigo-200";
	return "bg-amber-50 text-amber-700 border-amber-200";
}
function BookingsPage() {
	const [tab, setTab] = (0, import_react.useState)("upcoming");
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [lastSync, setLastSync] = (0, import_react.useState)(null);
	const [selectedReceipt, setSelectedReceipt] = (0, import_react.useState)(null);
	const [rescheduleBooking, setRescheduleBooking] = (0, import_react.useState)(null);
	const [newDate, setNewDate] = (0, import_react.useState)("");
	const [newTime, setNewTime] = (0, import_react.useState)("");
	const timeSlots = [
		"09:00",
		"10:30",
		"12:00",
		"13:30",
		"15:00",
		"16:30",
		"18:00",
		"19:30"
	];
	(0, import_react.useEffect)(() => {
		setBookings(loadBookings());
	}, []);
	function handleSaveReschedule() {
		if (!rescheduleBooking || !newDate || !newTime) return;
		updateBooking(rescheduleBooking.bookingId, {
			date: newDate,
			time: newTime
		});
		const updated = loadBookings();
		setBookings(updated);
		if (selectedReceipt && selectedReceipt.bookingId === rescheduleBooking.bookingId) setSelectedReceipt({
			...selectedReceipt,
			date: newDate,
			time: newTime
		});
		setRescheduleBooking(null);
	}
	const syncStatuses = (0, import_react.useMemo)(() => async () => {
		const current = loadBookings();
		if (current.length === 0) {
			setLastSync((/* @__PURE__ */ new Date()).toLocaleTimeString());
			return;
		}
		setSyncing(true);
		try {
			const ids = current.filter((b) => bucketOf(b) === "upcoming").map((b) => b.bookingId);
			if (ids.length) {
				const res = await getBookingStatuses({ data: { ids } });
				for (const id of ids) if (res[id]) updateBooking(id, { status: res[id].status });
			}
			setBookings(loadBookings());
			setLastSync((/* @__PURE__ */ new Date()).toLocaleTimeString());
		} finally {
			setSyncing(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		syncStatuses();
		const t = setInterval(syncStatuses, 3e3);
		return () => clearInterval(t);
	}, [syncStatuses]);
	async function onCancel(id) {
		if (!confirm("Cancel this booking? This will notify ERPNext.")) return;
		updateBooking(id, { status: (await cancelBooking({ data: { bookingId: id } })).status });
		setBookings(loadBookings());
	}
	const filtered = bookings.filter((b) => bucketOf(b) === tab).filter((b) => {
		if (!q.trim()) return true;
		const s = q.toLowerCase();
		return b.venueName.toLowerCase().includes(s) || b.bookingId.toLowerCase().includes(s) || b.services.some((sv) => sv.name.toLowerCase().includes(s));
	});
	const counts = {
		upcoming: bookings.filter((b) => bucketOf(b) === "upcoming").length,
		completed: bookings.filter((b) => bucketOf(b) === "completed").length,
		cancelled: bookings.filter((b) => bucketOf(b) === "cancelled").length
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-50 text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-24 px-4 sm:px-6 lg:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto pb-24",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3.5 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl sm:text-4xl font-extrabold tracking-tight",
									children: "My bookings"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 border border-emerald-200 text-xs font-semibold text-emerald-800",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex h-2 w-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex rounded-full h-2 w-2 bg-emerald-500" })]
									}), "Real-Time ERPNext Stream"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-zinc-500 text-sm",
								children: ["Live statuses streamed from ERPNext backend", lastSync ? ` · updated ${lastSync}` : ""]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: syncStatuses,
								className: "inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-50 self-start shadow-sm transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 text-zinc-600 ${syncing ? "animate-spin" : ""}` }), syncing ? "Syncing…" : "Refresh Stream"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center gap-3 mb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex bg-white rounded-full border border-gray-200 p-1",
								children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTab(t.key),
									className: `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${tab === t.key ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"}`,
									children: [
										t.icon,
										t.label,
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `ml-1 text-xs rounded-full px-1.5 py-0.5 ${tab === t.key ? "bg-white/20" : "bg-zinc-100"}`,
											children: counts[t.key]
										})
									]
								}, t.key))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search by salon, service or reference…",
									className: "w-full rounded-full border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
							mode: "wait",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
								transition: { duration: .2 },
								className: "space-y-4",
								children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-dashed border-gray-300 bg-white p-12 text-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-10 w-10 mx-auto text-zinc-400 mb-3" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "font-semibold text-lg",
											children: [
												"No ",
												tab,
												" bookings"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-zinc-500 mt-1 mb-6",
											children: tab === "upcoming" ? "Book a treatment and it will appear here with live status." : `Your ${tab} bookings will show up here.`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/marketplace",
											className: "inline-flex rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-800",
											children: "Browse the marketplace"
										})
									]
								}) : filtered.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex flex-col sm:flex-row gap-5",
									children: [b.venueImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: b.venueImage,
										alt: b.venueName,
										className: "h-24 w-full sm:h-28 sm:w-28 rounded-2xl object-cover shrink-0"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-start gap-3 justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-bold text-lg truncate",
														children: b.venueName
													}), b.venueAddress && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-xs text-zinc-500 flex items-center gap-1 mt-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
															" ",
															b.venueAddress
														]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusColor(b.status)}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-current opacity-70" }), b.status]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-zinc-600",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-4 w-4" }),
															" ",
															b.date
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }),
															" ",
															b.time
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-xs text-zinc-400",
														children: b.bookingId
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mt-3 text-sm",
												children: b.services.map((s) => s.name).join(" · ")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex flex-wrap items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-sm",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-zinc-500",
															children: "Total"
														}),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold",
															children: b.total
														}),
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-zinc-400",
															children: ["· ", b.paymentMethod === "online" ? "Paid online" : "Pay at salon"]
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setSelectedReceipt(b),
														className: "inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Receipt"]
													}), bucketOf(b) === "upcoming" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => {
															setRescheduleBooking(b);
															setNewDate(b.date);
															setNewTime(b.time);
														},
														className: "inline-flex items-center gap-1.5 rounded-full border border-indigo-200 text-indigo-700 px-4 py-2 text-sm font-semibold hover:bg-indigo-50 transition",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4" }), " Reschedule"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => onCancel(b.bookingId),
														className: "inline-flex items-center gap-1.5 rounded-full border border-rose-200 text-rose-700 px-4 py-2 text-sm font-semibold hover:bg-rose-50",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ban, { className: "h-4 w-4" }), " Cancel"]
													})] })]
												})]
											})
										]
									})]
								}, b.bookingId))
							}, tab + filtered.length)
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: selectedReceipt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: "bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative border border-gray-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSelectedReceipt(null),
							className: "absolute top-5 right-5 h-9 w-9 rounded-full bg-gray-100 grid place-items-center text-zinc-500 hover:bg-gray-200 transition",
							children: "✕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center pb-6 border-b border-gray-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 ${selectedReceipt.paymentMethod === "online" || selectedReceipt.status.toLowerCase().includes("paid") ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"}`,
									children: selectedReceipt.paymentMethod === "online" || selectedReceipt.status.toLowerCase().includes("paid") ? "✓ PAID" : "• PAYMENT PENDING"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-extrabold text-zinc-900",
									children: "Official Receipt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-zinc-500 font-mono mt-1",
									children: ["Invoice #", selectedReceipt.bookingId]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-6 space-y-4 border-b border-gray-100 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-zinc-50 rounded-2xl p-4 border border-gray-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1",
											children: "Customer Details"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-bold text-zinc-900 text-base",
											children: selectedReceipt.customer.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-zinc-600",
											children: selectedReceipt.customer.email
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-zinc-500 text-xs mt-0.5",
											children: selectedReceipt.customer.phone
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3 bg-zinc-50 rounded-2xl p-4 border border-gray-200",
									children: [selectedReceipt.venueImage && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: selectedReceipt.venueImage,
										className: "h-12 w-12 rounded-xl object-cover shrink-0",
										alt: ""
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-zinc-900 truncate",
												children: selectedReceipt.venueName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-zinc-500 truncate",
												children: selectedReceipt.venueAddress
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-xs text-zinc-400 mt-1",
												children: [
													selectedReceipt.date,
													" · ",
													selectedReceipt.time
												]
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2 pt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-bold uppercase tracking-wider text-zinc-400",
											children: "Services Billed"
										}),
										selectedReceipt.services.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center py-2 border-b border-gray-100",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-zinc-800",
												children: s.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-xs text-zinc-400",
												children: s.duration
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-bold text-zinc-900",
												children: s.price
											})]
										}, i)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between items-center pt-3 font-extrabold text-base text-zinc-900",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Billed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xl font-extrabold text-zinc-900",
												children: selectedReceipt.total
											})]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-6 flex flex-col sm:flex-row gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => printBookingInvoice(selectedReceipt),
									className: "flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-900 text-white py-3 text-sm font-bold hover:bg-zinc-800 transition shadow-sm",
									children: "🖨️ Print / Save Invoice PDF"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => downloadBookingInvoice(selectedReceipt),
									className: "inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition",
									children: "📥 Download"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSelectedReceipt(null),
									className: "rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition",
									children: "Close"
								})
							]
						})
					]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: rescheduleBooking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						scale: .95
					},
					animate: {
						opacity: 1,
						scale: 1
					},
					exit: {
						opacity: 0,
						scale: .95
					},
					className: "bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setRescheduleBooking(null),
							className: "absolute top-5 right-5 h-9 w-9 rounded-full bg-gray-100 grid place-items-center text-zinc-500 hover:bg-gray-200 transition",
							children: "✕"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center pb-5 border-b border-gray-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 grid place-items-center mx-auto mb-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-2xl font-extrabold text-zinc-900",
									children: "Reschedule Appointment"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-zinc-500 mt-1",
									children: rescheduleBooking.venueName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs font-mono text-zinc-400 mt-0.5",
									children: ["Ref: ", rescheduleBooking.bookingId]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-5 space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5",
									children: "Select New Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: newDate,
									onChange: (e) => setNewDate(e.target.value),
									className: "w-full rounded-2xl border border-gray-200 p-3 text-sm font-semibold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1.5",
									children: "Select Available Time Slot"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-4 gap-2",
									children: timeSlots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setNewTime(slot),
										className: `py-2 rounded-xl text-xs font-bold transition border ${newTime === slot ? "bg-zinc-900 text-white border-zinc-900 shadow-sm" : "bg-gray-50 text-zinc-700 border-gray-200 hover:bg-gray-100"}`,
										children: slot
									}, slot))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-indigo-50/80 rounded-2xl p-3.5 text-xs text-indigo-900 flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-4 w-4 shrink-0 text-indigo-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Rescheduling will update your appointment time and automatically refresh your tax invoice/receipt." })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 flex gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSaveReschedule,
								className: "flex-1 rounded-full bg-zinc-900 text-white py-3 text-sm font-bold hover:bg-zinc-800 transition shadow-sm",
								children: "Save & Refresh Receipt"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRescheduleBooking(null),
								className: "rounded-full border border-gray-200 px-5 py-3 text-sm font-semibold text-zinc-700 hover:bg-gray-50 transition",
								children: "Cancel"
							})]
						})
					]
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceFooter, {})
		]
	});
}
//#endregion
export { BookingsPage as component };
