import { r as findVenue } from "./venues-BJIXWGpN.mjs";
import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/venue._slug-CGLNxPNB.js
var $$splitComponentImporter = () => import("./venue._slug-C-PBurus.mjs");
var Route = createFileRoute("/venue/$slug")({
	loader: ({ params }) => {
		const venue = findVenue(params.slug);
		if (!venue) throw notFound();
		return { venue };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Venue — Saloon System" }] };
		const v = loaderData.venue;
		return { meta: [
			{ title: `${v.name} — ${v.city} | Book on Saloon System` },
			{
				name: "description",
				content: `${v.name} in ${v.city}. ${v.rating.toFixed(1)}★ (${v.reviews.toLocaleString()} reviews). Book online instantly.`
			},
			{
				property: "og:title",
				content: `${v.name} — ${v.city}`
			},
			{
				property: "og:description",
				content: `${v.category} · ${v.rating.toFixed(1)}★ (${v.reviews.toLocaleString()} reviews)`
			},
			{
				property: "og:image",
				content: v.images[0]
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
