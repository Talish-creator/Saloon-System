//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-B3Le6Xmj.js
var manifest = {
	"019aa0fe9befc234f1fd8654d029138877882ace8e39064101a4833b7a4a1a87": {
		functionName: "createBooking_createServerFn_handler",
		importer: () => import("./_ssr/bookings.functions-ngz2B0PN.mjs")
	},
	"0f5d6a3a14e356c9add186cfa2ffdb84457a3726f8ea938265a92a40bdc36217": {
		functionName: "cancelBooking_createServerFn_handler",
		importer: () => import("./_ssr/bookings.functions-ngz2B0PN.mjs")
	},
	"4551fc701581b3cdcdce3847c1327839f7335b46704bdc62561a32dcde47dfff": {
		functionName: "getBookingStatuses_createServerFn_handler",
		importer: () => import("./_ssr/bookings.functions-ngz2B0PN.mjs")
	},
	"e4cbfaf8d74701f800f6f205cd14bc66695ae7efdbd736a7ac3a026025e68336": {
		functionName: "sendReceiptEmail_createServerFn_handler",
		importer: () => import("./_ssr/bookings.functions-ngz2B0PN.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
