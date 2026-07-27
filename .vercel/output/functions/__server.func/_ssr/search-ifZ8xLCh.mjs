import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-ifZ8xLCh.js
var $$splitComponentImporter = () => import("./search-DAO4HJ4E.mjs");
var Route = createFileRoute("/search")({
	validateSearch: (search) => {
		return {
			q: typeof search.q === "string" ? search.q : void 0,
			location: typeof search.location === "string" ? search.location : void 0
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
