import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-B3Le6Xmj.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-store-Bd5VmD9D.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var bookingSchema = objectType({
	venueSlug: stringType().min(1),
	venueName: stringType().min(1),
	services: arrayType(objectType({
		name: stringType(),
		price: stringType(),
		duration: stringType()
	})),
	date: stringType().min(1),
	time: stringType().min(1),
	customer: objectType({
		name: stringType().trim().min(1).max(120),
		email: stringType().trim().email().max(255),
		phone: stringType().trim().min(4).max(40),
		notes: stringType().max(500).optional().default("")
	}),
	paymentMethod: enumType(["online", "at_salon"]),
	paymentRef: stringType().optional(),
	total: stringType()
});
var createBooking = createServerFn({ method: "POST" }).inputValidator((input) => bookingSchema.parse(input)).handler(createSsrRpc("019aa0fe9befc234f1fd8654d029138877882ace8e39064101a4833b7a4a1a87"));
var getBookingStatuses = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ ids: arrayType(stringType().min(1)).max(200) }).parse(input)).handler(createSsrRpc("4551fc701581b3cdcdce3847c1327839f7335b46704bdc62561a32dcde47dfff"));
var cancelBooking = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ bookingId: stringType().min(1) }).parse(input)).handler(createSsrRpc("0f5d6a3a14e356c9add186cfa2ffdb84457a3726f8ea938265a92a40bdc36217"));
var sendReceiptEmail = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	bookingId: stringType().min(1),
	email: stringType().trim().email()
}).parse(input)).handler(createSsrRpc("e4cbfaf8d74701f800f6f205cd14bc66695ae7efdbd736a7ac3a026025e68336"));
var KEY = "ss.bookings.v1";
var DEFAULT_BOOKINGS = [{
	bookingId: "SS-MS0SHWE9",
	venueSlug: "zen-luxury-spa-dubai-1",
	venueName: "Zen Luxury Spa Dubai",
	venueImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1400&q=80",
	venueAddress: "Building 17, Street 14, Dubai, United Arab Emirates",
	services: [{
		name: "Hot Stone Aromatherapy",
		price: "175 AED",
		duration: "90 mins"
	}],
	date: "2026-07-25",
	time: "09:30",
	customer: {
		name: "Alex Morgan",
		email: "alex.morgan@example.com",
		phone: "+971 50 123 4567",
		notes: "Please provide a quiet room."
	},
	paymentMethod: "at_salon",
	total: "175 AED",
	status: "Pending Payment",
	createdAt: "2026-07-25T09:30:00.000Z"
}, {
	bookingId: "SS-DXB9012A",
	venueSlug: "the-hideaway",
	venueName: "The Hideaway",
	venueImage: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1400&q=80",
	venueAddress: "403 Jumeirah Beach Rd, Al Athar Street, Dubai",
	services: [{
		name: "Deep Tissue Muscle Relief",
		price: "115 AED",
		duration: "60 mins"
	}, {
		name: "Hair Spa & Deep Conditioning",
		price: "65 AED",
		duration: "45 mins"
	}],
	date: "2026-07-28",
	time: "14:00",
	customer: {
		name: "Alex Morgan",
		email: "alex.morgan@example.com",
		phone: "+971 50 123 4567"
	},
	paymentMethod: "online",
	paymentRef: "PAY-987412",
	total: "180 AED",
	status: "Paid",
	createdAt: "2026-07-25T14:00:00.000Z"
}];
function loadBookings() {
	if (typeof window === "undefined") return DEFAULT_BOOKINGS;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) {
			window.localStorage.setItem(KEY, JSON.stringify(DEFAULT_BOOKINGS));
			return DEFAULT_BOOKINGS;
		}
		const parsed = JSON.parse(raw);
		return parsed.length > 0 ? parsed : DEFAULT_BOOKINGS;
	} catch {
		return DEFAULT_BOOKINGS;
	}
}
function saveBooking(b) {
	if (typeof window === "undefined") return;
	const all = loadBookings().filter((x) => x.bookingId !== b.bookingId);
	all.unshift(b);
	window.localStorage.setItem(KEY, JSON.stringify(all));
}
function updateBooking(id, patch) {
	if (typeof window === "undefined") return;
	const all = loadBookings().map((b) => b.bookingId === id ? {
		...b,
		...patch
	} : b);
	window.localStorage.setItem(KEY, JSON.stringify(all));
}
function findBooking(id) {
	return loadBookings().find((b) => b.bookingId === id);
}
function bucketOf(b) {
	const s = b.status.toLowerCase();
	if (s.includes("cancel")) return "cancelled";
	if (s.includes("complete")) return "completed";
	const dt = /* @__PURE__ */ new Date(`${b.date}T${b.time || "00:00"}:00`);
	if (!isNaN(dt.getTime()) && Date.now() - dt.getTime() > 7200 * 1e3) return "completed";
	return "upcoming";
}
//#endregion
export { getBookingStatuses as a, sendReceiptEmail as c, findBooking as i, updateBooking as l, cancelBooking as n, loadBookings as o, createBooking as r, saveBooking as s, bucketOf as t };
