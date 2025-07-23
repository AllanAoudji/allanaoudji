import { z } from "zod";

const envVariables = z.object({
	DATABASE_URL: z.string(),
	INSTAGRAM_ACCESS_TOKEN: z.string(),
	NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
	NEXT_PUBLIC_SANITY_DATASET: z.string(),
	NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
	NEXT_PUBLIC_SANITY_SERVER_TOKEN: z.string(),
	NEXT_PUBLIC_SANITY_USE_CDN: z.boolean(),
	SHOPIFY_PUBLIC_ACCESS_TOKEN: z.string(),
	SHOPIFY_PRIVATE_ACCESS_TOKEN: z.string(),
	SHOPIFY_STORE_DOMAIN: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
