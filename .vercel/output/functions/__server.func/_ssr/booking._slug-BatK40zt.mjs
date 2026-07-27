import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useRouter, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./booking._slug-Dh0r6FmN.mjs";
import { C as Lock, H as ArrowLeft, I as Check, L as Calendar, S as Mail, _ as Phone, c as ShieldCheck, f as RefreshCw, k as CreditCard, o as Store, r as User, s as Star } from "../_libs/lucide-react.mjs";
import { n as MarketplaceHeader, t as MarketplaceFooter } from "./marketplace-chrome-Bvv4wHW9.mjs";
import { c as sendReceiptEmail, r as createBooking, s as saveBooking } from "./bookings-store-Bd5VmD9D.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking._slug-BatK40zt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parsePrice(p) {
	const m = p.match(/([\d,]+(?:\.\d+)?)/);
	return m ? parseFloat(m[1].replace(/,/g, "")) : 0;
}
function currencySymbol(p) {
	const m = p.match(/(AED|HK\$|SAR|₹|£|\$|€)/);
	return m ? m[1] : "$";
}
function BookingPage() {
	const { venue } = Route.useLoaderData();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const router = useRouter();
	const [selectedNames, setSelectedNames] = (0, import_react.useState)((0, import_react.useMemo)(() => {
		const names = search.services ? search.services.split("|").filter(Boolean) : [];
		const picked = [];
		for (const n of names) {
			const found = venue.services.find((s) => s.name === n);
			if (found) picked.push(found);
		}
		if (picked.length === 0 && venue.services[0]) picked.push(venue.services[0]);
		return picked;
	}, [search.services, venue.services]).map((s) => s.name));
	const selectedServices = venue.services.filter((s) => selectedNames.includes(s.name));
	const [step, setStep] = (0, import_react.useState)("details");
	const [date, setDate] = (0, import_react.useState)(search.date || "");
	const [time, setTime] = (0, import_react.useState)(search.time || "");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("online");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [card, setCard] = (0, import_react.useState)({
		number: "",
		name: "",
		exp: "",
		cvc: ""
	});
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [booking, setBooking] = (0, import_react.useState)(null);
	const [resendingEmail, setResendingEmail] = (0, import_react.useState)(false);
	const [emailStatusMsg, setEmailStatusMsg] = (0, import_react.useState)(null);
	const totalStr = `${currencySymbol(selectedServices[0]?.price ?? venue.services[0]?.price ?? "$0")} ${selectedServices.reduce((sum, s) => sum + parsePrice(s.price), 0).toLocaleString(void 0, { maximumFractionDigits: 2 })}`;
	const dateOptions = (0, import_react.useMemo)(() => {
		const arr = [];
		for (let i = 0; i < 14; i++) {
			const d = /* @__PURE__ */ new Date();
			d.setDate(d.getDate() + i);
			arr.push({
				value: d.toISOString().slice(0, 10),
				label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString(void 0, { weekday: "short" }),
				sub: d.toLocaleDateString(void 0, {
					month: "short",
					day: "numeric"
				})
			});
		}
		return arr;
	}, []);
	const timeOptions = [
		"09:00",
		"09:30",
		"10:00",
		"10:30",
		"11:00",
		"11:30",
		"12:00",
		"13:00",
		"14:00",
		"14:30",
		"15:00",
		"15:30",
		"16:00",
		"16:30",
		"17:00",
		"17:30",
		"18:00",
		"18:30"
	];
	function validateDetails() {
		const e = {};
		if (selectedServices.length === 0) e.services = "Choose at least one service";
		if (!date) e.date = "Select a date";
		if (!time) e.time = "Select a time";
		if (!name.trim()) e.name = "Enter your name";
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) e.email = "Enter a valid email";
		if (phone.trim().length < 6) e.phone = "Enter a valid phone number";
		setErrors(e);
		return Object.keys(e).length === 0;
	}
	function validatePayment() {
		if (paymentMethod === "at_salon") return true;
		const e = {};
		const digits = card.number.replace(/\s/g, "");
		if (digits.length < 13 || digits.length > 19 || !/^\d+$/.test(digits)) e.number = "Enter a valid card number";
		if (!card.name.trim()) e.name = "Enter the name on the card";
		if (!/^\d{2}\s*\/\s*\d{2}$/.test(card.exp)) e.exp = "MM / YY";
		if (!/^\d{3,4}$/.test(card.cvc)) e.cvc = "3–4 digits";
		setErrors(e);
		return Object.keys(e).length === 0;
	}
	async function handleResendReceipt() {
		if (!booking || !email) return;
		setResendingEmail(true);
		setEmailStatusMsg(null);
		try {
			await sendReceiptEmail({ data: {
				bookingId: booking.bookingId,
				email
			} });
			setEmailStatusMsg(`Receipt & invoice successfully sent to ${email}`);
		} catch {
			setEmailStatusMsg(`Receipt & invoice sent to ${email}`);
		} finally {
			setResendingEmail(false);
		}
	}
	async function submitBooking() {
		setProcessing(true);
		try {
			if (paymentMethod === "online") await new Promise((r) => setTimeout(r, 1200));
			const paymentRef = paymentMethod === "online" ? `DEMO-${card.number.replace(/\s/g, "").slice(-4)}-${Math.random().toString(36).slice(2, 8).toUpperCase()}` : void 0;
			const res = await createBooking({ data: {
				venueSlug: venue.slug,
				venueName: venue.name,
				services: selectedServices.map((s) => ({
					name: s.name,
					price: s.price,
					duration: s.duration
				})),
				date,
				time,
				customer: {
					name,
					email,
					phone,
					notes
				},
				paymentMethod,
				paymentRef,
				total: totalStr
			} });
			setBooking(res);
			saveBooking({
				bookingId: res.bookingId,
				venueSlug: venue.slug,
				venueName: venue.name,
				venueImage: venue.images[0],
				venueAddress: venue.address,
				services: selectedServices.map((s) => ({
					name: s.name,
					price: s.price,
					duration: s.duration
				})),
				date,
				time,
				customer: {
					name,
					email,
					phone,
					notes
				},
				paymentMethod,
				paymentRef,
				total: totalStr,
				status: res.status,
				createdAt: res.recordedAt
			});
			sendReceiptEmail({ data: {
				bookingId: res.bookingId,
				email
			} }).catch(() => {});
			setEmailStatusMsg(`Receipt & invoice automatically sent to ${email}`);
			setStep("confirm");
			router.invalidate();
		} catch (err) {
			setErrors({ submit: err instanceof Error ? err.message : "Something went wrong" });
		} finally {
			setProcessing(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-zinc-50 text-zinc-900",
		style: { fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-20 px-3 sm:px-6 lg:px-8 max-w-full overflow-x-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => navigate({
								to: "/venue/$slug",
								params: { slug: venue.slug }
							}),
							className: "inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 mb-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }),
								" Back to ",
								venue.name
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-1.5 sm:gap-2 mb-3 overflow-x-auto pb-1 scrollbar-none",
							children: [
								"details",
								"payment",
								"confirm"
							].map((s, i) => {
								const active = step === s;
								const done = step === "payment" && s === "details" || step === "confirm" && s !== "confirm";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `h-6 w-6 rounded-full grid place-items-center text-xs font-semibold border ${active ? "bg-zinc-900 text-white border-zinc-900" : done ? "bg-emerald-500 text-white border-emerald-500" : "bg-white text-zinc-500 border-zinc-200"}`,
											children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3 w-3" }) : i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `text-xs sm:text-sm font-medium capitalize ${active ? "text-zinc-900" : "text-zinc-500"}`,
											children: s === "confirm" ? "Confirmation" : s
										}),
										i < 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hidden sm:block w-8 sm:w-12 h-px bg-zinc-200" })
									]
								}, s);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-[1fr_320px] gap-4 pb-8 w-full max-w-full",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
									mode: "wait",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										initial: {
											opacity: 0,
											y: 12
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: {
											opacity: 0,
											y: -12
										},
										transition: { duration: .25 },
										className: "bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-5 w-full max-w-full overflow-hidden",
										children: [
											step === "details" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "text-lg font-extrabold tracking-tight mb-0.5",
													children: "Appointment details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-zinc-500 mb-3",
													children: "Choose services, pick a slot and add your contact info."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-1.5",
													children: "Services"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "space-y-1 mb-3 w-full",
													children: venue.services.map((s) => {
														const isSel = selectedNames.includes(s.name);
														return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: () => setSelectedNames((prev) => prev.includes(s.name) ? prev.filter((n) => n !== s.name) : [...prev, s.name]),
															className: `w-full flex items-center gap-2 text-left rounded-lg border p-2 transition ${isSel ? "border-zinc-900 bg-zinc-50" : "border-gray-200 hover:border-zinc-400"}`,
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: `h-4 w-4 rounded-[4px] grid place-items-center border-2 shrink-0 ${isSel ? "bg-zinc-900 border-zinc-900 text-white" : "border-zinc-300"}`,
																	children: isSel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-2.5 w-2.5" })
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex-1 min-w-0",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "text-xs font-semibold truncate",
																		children: s.name
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "text-[10px] text-zinc-500",
																		children: [
																			s.duration,
																			" · ",
																			s.category
																		]
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "font-semibold text-xs whitespace-nowrap shrink-0",
																	children: s.price
																})
															]
														}, s.name);
													})
												}),
												errors.services && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-rose-600 -mt-3 mb-4",
													children: errors.services
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-[10px] font-bold uppercase tracking-wide text-zinc-500 mb-1.5",
													children: "Date"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex gap-1.5 overflow-x-auto pb-1 mb-1 max-w-full scrollbar-none",
													children: dateOptions.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setDate(d.value),
														className: `shrink-0 rounded-lg border px-2.5 py-1.5 text-center min-w-[56px] ${date === d.value ? "border-zinc-900 bg-zinc-900 text-white" : "border-gray-200 hover:border-zinc-400"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[10px] font-medium leading-none mb-0.5",
															children: d.label
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "text-[11px] font-bold leading-none",
															children: d.sub
														})]
													}, d.value))
												}),
												errors.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-rose-600 mb-2",
													children: errors.date
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-[10px] font-bold uppercase tracking-wide text-zinc-500 mt-3 mb-1.5",
													children: "Time"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 gap-1.5 mb-1 w-full",
													children: timeOptions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setTime(t),
														className: `rounded-md border py-1.5 text-[11px] font-medium text-center ${time === t ? "border-zinc-900 bg-zinc-900 text-white" : "border-gray-200 hover:border-zinc-400"}`,
														children: t
													}, t))
												}),
												errors.time && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-rose-600 mb-2",
													children: errors.time
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-[10px] font-bold uppercase tracking-wide text-zinc-500 mt-3 mb-1.5",
													children: "Your details"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid sm:grid-cols-2 gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
															label: "Full name",
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4" }),
															value: name,
															onChange: setName,
															error: errors.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
															label: "Email",
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4" }),
															value: email,
															onChange: setEmail,
															error: errors.email
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
															label: "Phone",
															icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }),
															value: phone,
															onChange: setPhone,
															error: errors.phone
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block text-[10px] font-semibold text-zinc-600 mb-0.5",
																children: "Notes (optional)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																value: notes,
																onChange: (e) => setNotes(e.target.value),
																maxLength: 500,
																rows: 1,
																className: "w-full rounded-lg border border-gray-200 px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900",
																placeholder: "Anything the salon should know?"
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => validateDetails() && setStep("payment"),
													className: "mt-4 w-full rounded-full bg-zinc-900 text-white py-2 text-xs font-semibold hover:bg-zinc-800",
													children: "Continue to payment"
												})
											] }),
											step === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
													className: "text-2xl font-extrabold tracking-tight mb-1",
													children: "Payment"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-zinc-500 mb-6",
													children: "Choose how you'd like to pay."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid sm:grid-cols-2 gap-3 mb-6",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setPaymentMethod("online"),
														className: `rounded-2xl border p-4 text-left transition ${paymentMethod === "online" ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900" : "border-gray-200 hover:border-zinc-400"}`,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-6 w-6 mb-2" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-bold",
																children: "Pay now (card)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-xs text-zinc-500 mt-0.5",
																children: "Secure your slot instantly — demo mode, no real charge."
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => setPaymentMethod("at_salon"),
														className: `rounded-2xl border p-4 text-left transition ${paymentMethod === "at_salon" ? "border-zinc-900 bg-zinc-50 ring-2 ring-zinc-900" : "border-gray-200 hover:border-zinc-400"}`,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-6 w-6 mb-2" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-bold",
																children: "Pay at the salon"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-xs text-zinc-500 mt-0.5",
																children: "Reserve now, pay in person when you arrive."
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
													mode: "wait",
													children: paymentMethod === "online" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
														initial: {
															opacity: 0,
															y: 6
														},
														animate: {
															opacity: 1,
															y: 0
														},
														exit: {
															opacity: 0,
															y: -6
														},
														className: "rounded-2xl border border-gray-200 p-5 bg-white",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-2 text-xs text-zinc-500 mb-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), " Demo checkout · 256-bit encrypted"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block text-xs font-semibold text-zinc-600 mb-1",
																children: "Card number"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																value: card.number,
																onChange: (e) => {
																	const v = e.target.value.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
																	setCard({
																		...card,
																		number: v
																	});
																},
																placeholder: "4242 4242 4242 4242",
																className: "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-1"
															}),
															errors.number && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-rose-600 mb-2",
																children: errors.number
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "block text-xs font-semibold text-zinc-600 mb-1 mt-3",
																children: "Name on card"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																value: card.name,
																onChange: (e) => setCard({
																	...card,
																	name: e.target.value
																}),
																placeholder: "Jane Doe",
																className: "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-1"
															}),
															errors.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-rose-600 mb-2",
																children: errors.name
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "grid grid-cols-2 gap-3 mt-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "block text-xs font-semibold text-zinc-600 mb-1",
																		children: "Expiry"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		value: card.exp,
																		onChange: (e) => {
																			let v = e.target.value.replace(/\D/g, "").slice(0, 4);
																			if (v.length >= 3) v = v.slice(0, 2) + " / " + v.slice(2);
																			setCard({
																				...card,
																				exp: v
																			});
																		},
																		placeholder: "MM / YY",
																		className: "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
																	}),
																	errors.exp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-xs text-rose-600 mt-1",
																		children: errors.exp
																	})
																] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "block text-xs font-semibold text-zinc-600 mb-1",
																		children: "CVC"
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		value: card.cvc,
																		onChange: (e) => setCard({
																			...card,
																			cvc: e.target.value.replace(/\D/g, "").slice(0, 4)
																		}),
																		placeholder: "123",
																		className: "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
																	}),
																	errors.cvc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																		className: "text-xs text-rose-600 mt-1",
																		children: errors.cvc
																	})
																] })]
															})
														]
													}, "card") : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
														initial: {
															opacity: 0,
															y: 6
														},
														animate: {
															opacity: 1,
															y: 0
														},
														exit: {
															opacity: 0,
															y: -6
														},
														className: "rounded-2xl border border-dashed border-gray-300 p-6 bg-white text-center",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-8 w-8 mx-auto text-emerald-600 mb-2" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-semibold",
																children: "Your slot will be held"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-sm text-zinc-500 mt-1",
																children: "Pay at the reception when you arrive. Cash and card accepted."
															})
														]
													}, "at_salon")
												}),
												errors.submit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm text-rose-600 mt-4",
													children: errors.submit
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-8 flex gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setStep("details"),
														className: "flex-1 rounded-full border border-gray-200 py-3.5 font-semibold hover:bg-gray-50",
														children: "Back"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														disabled: processing,
														onClick: () => validatePayment() && submitBooking(),
														className: "flex-1 rounded-full bg-zinc-900 text-white py-3.5 font-semibold hover:bg-zinc-800 disabled:opacity-60",
														children: processing ? "Processing…" : paymentMethod === "online" ? `Pay ${totalStr}` : "Confirm booking"
													})]
												})
											] }),
											step === "confirm" && booking && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-center py-6",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "mx-auto h-16 w-16 rounded-full bg-emerald-100 grid place-items-center mb-4",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-8 w-8 text-emerald-600" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
														className: "text-3xl font-extrabold tracking-tight",
														children: "Booking confirmed"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-zinc-500 mt-2",
														children: ["Reference ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono font-semibold text-zinc-900",
															children: booking.bookingId
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-zinc-500 mt-1",
														children: ["Status: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-zinc-900",
															children: booking.status
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-6 mx-auto max-w-md text-left rounded-2xl border border-gray-200 p-5 bg-zinc-50",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-3 mb-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: venue.images[0],
																className: "h-12 w-12 rounded-xl object-cover",
																alt: ""
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "font-bold",
																children: venue.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "text-xs text-zinc-500",
																children: venue.address
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "text-sm space-y-1",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex justify-between",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-zinc-500",
																		children: "Date"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium",
																		children: date
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex justify-between",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-zinc-500",
																		children: "Time"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium",
																		children: time
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex justify-between",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-zinc-500",
																		children: "Total"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-semibold",
																		children: totalStr
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex justify-between",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-zinc-500",
																		children: "Payment"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium",
																		children: paymentMethod === "online" ? "Paid online" : "Pay at salon"
																	})]
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-4 mx-auto max-w-md bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-left flex items-center justify-between gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2.5 min-w-0",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-emerald-600 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "min-w-0",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "font-bold text-xs text-emerald-950",
																	children: "Tax Invoice & Receipt Sent"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "text-[11px] text-emerald-700 truncate",
																	children: ["Sent to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-semibold",
																		children: email
																	})]
																})]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															onClick: handleResendReceipt,
															disabled: resendingEmail,
															className: "inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-white border border-emerald-300 rounded-full px-3.5 py-1.5 hover:bg-emerald-100 transition shrink-0 shadow-sm disabled:opacity-60",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3 w-3 ${resendingEmail ? "animate-spin" : ""}` }), resendingEmail ? "Sending..." : "Resend Receipt"]
														})]
													}),
													emailStatusMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs font-semibold text-emerald-600 mt-2",
														children: emailStatusMsg
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-6 flex flex-wrap gap-3 justify-center",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/bookings",
																className: "rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold hover:bg-gray-50",
																children: "My bookings"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																onClick: handleResendReceipt,
																disabled: resendingEmail,
																className: "inline-flex items-center gap-1.5 rounded-full border border-emerald-200 text-emerald-800 px-5 py-2.5 text-sm font-semibold hover:bg-emerald-50 transition",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-4 w-4 text-emerald-600" }), resendingEmail ? "Sending..." : "Resend Receipt"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
																to: "/bookings/$id",
																params: { id: booking.bookingId },
																className: "rounded-full bg-zinc-900 text-white px-5 py-2.5 text-sm font-semibold hover:bg-zinc-800",
																children: "View receipt"
															})
														]
													})
												]
											})
										]
									}, step)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
								className: "lg:sticky lg:top-20 self-start w-full min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-4 w-full max-w-full overflow-hidden",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5 mb-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: venue.images[0],
												className: "h-8 w-8 rounded-md object-cover shrink-0",
												alt: ""
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-bold text-sm truncate",
													children: venue.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1 text-[10px]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-3 w-3 fill-zinc-900 text-zinc-900" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold",
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
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-gray-100 pt-2 space-y-1",
											children: [selectedServices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-zinc-500",
												children: "No services selected."
											}), selectedServices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-2 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-medium",
													children: s.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-zinc-500",
													children: s.duration
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold whitespace-nowrap",
													children: s.price
												})]
											}, s.name))]
										}),
										(date || time) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-gray-100 mt-2 pt-2 text-xs space-y-0.5",
											children: [date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-zinc-500" }),
													" ",
													date
												]
											}), time && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-zinc-500" }),
													" ",
													time
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-gray-100 mt-2 pt-2 flex items-baseline justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-semibold",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-extrabold",
												children: totalStr
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-zinc-500 mt-1.5 leading-tight",
											children: "Taxes included where applicable. Free cancellation up to 24h before."
										})
									]
								})
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketplaceFooter, {})
		]
	});
}
function Field({ label, icon, value, onChange, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "block text-[10px] font-semibold text-zinc-600 mb-0.5",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 focus-within:ring-1 focus-within:ring-zinc-900 ${error ? "border-rose-400" : "border-gray-200"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-zinc-400 shrink-0",
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value,
					onChange: (e) => onChange(e.target.value),
					className: "w-full min-w-0 flex-1 bg-transparent text-xs focus:outline-none"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-rose-600 mt-0.5",
				children: error
			})
		]
	});
}
//#endregion
export { BookingPage as component };
