import { z } from "zod";

const envVariables = z.object({
	CONTACT_EMAIL: z.string(),
	DATABASE_URL: z.string(),
	FROM_EMAIL: z.string(),
	INSTAGRAM_ACCESS_TOKEN: z.string(),
	NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
	NEXT_PUBLIC_SANITY_DATASET: z.string(),
	NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
	NEXT_PUBLIC_SANITY_SERVER_TOKEN: z.string(),
	NEXT_PUBLIC_SANITY_USE_CDN: z.boolean(),
	NEXT_PUBLIC_SITE_URL: z.string(),
	RESEND_API_KEY: z.string(),
	SHOPIFY_ADMIN_ACCESS_TOKEN: z.string(),
	SHOPIFY_API_VERSION: z.string(),
	SHOPIFY_PRIVATE_ACCESS_TOKEN: z.string(),
	SHOPIFY_PUBLIC_ACCESS_TOKEN: z.string(),
	SHOPIFY_REVALIDATION_SECRET: z.string(),
	SHOPIFY_STORE_DOMAIN: z.string(),
	UPSTASH_REDIS_REST_URL: z.string(),
	UPSTASH_REDIS_REST_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
