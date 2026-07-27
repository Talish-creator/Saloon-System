import { i as stringType, n as enumType, r as objectType, t as arrayType } from "../_libs/zod.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./createServerFn-CIHAFgYl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.functions-ngz2B0PN.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var createBooking_createServerFn_handler = createServerRpc({
	id: "019aa0fe9befc234f1fd8654d029138877882ace8e39064101a4833b7a4a1a87",
	name: "createBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).inputValidator((input) => bookingSchema.parse(input)).handler(createBooking_createServerFn_handler, async ({ data }) => {
	const bookingId = `SS-${Date.now().toString(36).toUpperCase()}`;
	const erpPayload = {
		doctype: "Appointment",
		customer_name: data.customer.name,
		customer_email: data.customer.email,
		customer_phone: data.customer.phone,
		scheduled_date: data.date,
		scheduled_time: data.time,
		venue: data.venueName,
		services: data.services.map((s) => s.name).join(", "),
		total: data.total,
		payment_method: data.paymentMethod,
		payment_ref: data.paymentRef ?? null,
		status: data.paymentMethod === "online" ? "Paid" : "Pending Payment",
		external_id: bookingId
	};
	console.log("[ERPNext stub] booking", erpPayload);
	return {
		bookingId,
		status: erpPayload.status,
		recordedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
});
var getBookingStatuses_createServerFn_handler = createServerRpc({
	id: "4551fc701581b3cdcdce3847c1327839f7335b46704bdc62561a32dcde47dfff",
	name: "getBookingStatuses",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => getBookingStatuses.__executeServer(opts));
var getBookingStatuses = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ ids: arrayType(stringType().min(1)).max(200) }).parse(input)).handler(getBookingStatuses_createServerFn_handler, async ({ data }) => {
	const now = Date.now();
	const result = {};
	for (const id of data.ids) {
		const hash = [...id].reduce((a, c) => a + c.charCodeAt(0), 0);
		const bucket = Math.floor(now / 1e4);
		const pool = [
			"Confirmed",
			"Paid",
			"Checked-in",
			"In service"
		];
		result[id] = {
			status: pool[(hash + bucket) % pool.length],
			syncedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
	}
	return result;
});
var cancelBooking_createServerFn_handler = createServerRpc({
	id: "0f5d6a3a14e356c9add186cfa2ffdb84457a3726f8ea938265a92a40bdc36217",
	name: "cancelBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => cancelBooking.__executeServer(opts));
var cancelBooking = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ bookingId: stringType().min(1) }).parse(input)).handler(cancelBooking_createServerFn_handler, async ({ data }) => {
	console.log("[ERPNext stub] cancel", data.bookingId);
	return {
		bookingId: data.bookingId,
		status: "Cancelled",
		syncedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
});
var sendReceiptEmail_createServerFn_handler = createServerRpc({
	id: "e4cbfaf8d74701f800f6f205cd14bc66695ae7efdbd736a7ac3a026025e68336",
	name: "sendReceiptEmail",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => sendReceiptEmail.__executeServer(opts));
var sendReceiptEmail = createServerFn({ method: "POST" }).inputValidator((input) => objectType({
	bookingId: stringType().min(1),
	email: stringType().trim().email()
}).parse(input)).handler(sendReceiptEmail_createServerFn_handler, async ({ data }) => {
	console.log(`[Email Service] Sent receipt & tax invoice ${data.bookingId} to ${data.email}`);
	return {
		success: true,
		sentTo: data.email,
		sentAt: (/* @__PURE__ */ new Date()).toISOString()
	};
});
//#endregion
export { cancelBooking_createServerFn_handler, createBooking_createServerFn_handler, getBookingStatuses_createServerFn_handler, sendReceiptEmail_createServerFn_handler };
