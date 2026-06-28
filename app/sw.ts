import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry } from "serwist";
import { NetworkOnly, Serwist } from "serwist";

declare const self: ServiceWorkerGlobalScope & {
	__SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
};

const serwist = new Serwist({
	precacheEntries: self.__SW_MANIFEST,
	skipWaiting: true,
	clientsClaim: true,
	navigationPreload: true,
	runtimeCaching: [
		{
			matcher: ({ url }) => url.hostname.endsWith(".api.sanity.io"),
			handler: new NetworkOnly(),
		},
		...defaultCache,
	],
});

serwist.addEventListeners();
