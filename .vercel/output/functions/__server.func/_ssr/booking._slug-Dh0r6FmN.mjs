import { r as findVenue } from "./venues-BJIXWGpN.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { t as zodValidator } from "../_libs/tanstack__zod-adapter.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booking._slug-Dh0r6FmN.js
var $$splitNotFoundComponentImporter = () => import("./booking._slug-CSLmp-rX.mjs");
var $$splitErrorComponentImporter = () => import("./booking._slug-DG96bO3c.mjs");
var $$splitComponentImporter = () => import("./booking._slug-BatK40zt.mjs");
var searchSchema = objectType({
	services: stringType().optional().default(""),
	date: stringType().optional().default(""),
	time: stringType().optional().default("")
});
var Route = createFileRoute("/booking/$slug")({
	validateSearch: zodValidator(searchSchema),
	loader: ({ params }) => {
		const venue = findVenue(params.slug);
		if (!venue) throw notFound();
		return { venue };
	},
	head: ({ loaderData }) => ({ meta: [
		{ title: `Book ${loaderData?.venue.name ?? "appointment"} — Saloon System` },
		{
			name: "description",
			content: "Confirm your appointment details and pay online or at the salon."
		},
		{
			property: "og:title",
			content: `Book ${loaderData?.venue.name ?? "appointment"} — Saloon System`
		},
		{
			property: "og:description",
			content: "Confirm your appointment details and pay online or at the salon."
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
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
