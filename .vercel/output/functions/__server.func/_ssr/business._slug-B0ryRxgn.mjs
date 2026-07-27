import { M as notFound, f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as findIndustry } from "./industries-3j3fqacY.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business._slug-B0ryRxgn.js
var $$splitComponentImporter = () => import("./business._slug-BcW0Nl0n.mjs");
var Route = createFileRoute("/business/$slug")({
	loader: ({ params }) => {
		const industry = findIndustry(params.slug);
		if (!industry) throw notFound();
		return { industry };
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Not found — Saloon System" }, {
			name: "robots",
			content: "noindex"
		}] };
		const { industry } = loaderData;
		return { meta: [
			{ title: `${industry.headline} — Saloon System` },
			{
				name: "description",
				content: industry.description
			},
			{
				property: "og:title",
				content: `${industry.headline} — Saloon System`
			},
			{
				property: "og:description",
				content: industry.description
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: industry.images[0]
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
