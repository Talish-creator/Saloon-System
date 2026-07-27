import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings._id-DQXs0q4c.js
var $$splitNotFoundComponentImporter = () => import("./bookings._id-D3alfIdU.mjs");
var $$splitComponentImporter = () => import("./bookings._id-CcQxQgsr.mjs");
var Route = createFileRoute("/bookings/$id")({
	head: ({ params }) => ({ meta: [
		{ title: `Receipt ${params.id} — Saloon System` },
		{
			name: "description",
			content: "Booking confirmation and downloadable receipt."
		},
		{
			property: "og:title",
			content: `Receipt ${params.id} — Saloon System`
		},
		{
			property: "og:description",
			content: "Booking confirmation and downloadable receipt."
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
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
