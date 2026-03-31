import { z } from "zod";

const envVariables = z.object({
	CONTACT_EMAIL: z.string(),
	FROM_EMAIL: z.string(),
	INSTAGRAM_ACCESS_TOKEN: z.string(),
	NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD: z.string(),
	NEXT_PUBLIC_FREE_SHIPPING_CURRENCY: z.string(),
	NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
	NEXT_PUBLIC_SANITY_DATASET: z.string(),
	NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
	NEXT_PUBLIC_SANITY_USE_CDN: z.string(),
	NEXT_PUBLIC_SITE_URL: z.string(),
	NEXT_PUBLIC_SHOP_ENABLED: z.string(),
	NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN: z.string(),
	RESEND_API_KEY: z.string(),
	SANITY_SERVER_TOKEN: z.string(),
	SANITY_WEBHOOK_SECRET: z.string(),
	SHOPIFY_ADMIN_ACCESS_TOKEN: z.string(),
	SHOPIFY_API_VERSION: z.string(),
	SHOPIFY_PUBLIC_ACCESS_TOKEN: z.string(),
	SHOPIFY_STORE_DOMAIN: z.string(),
	SHOPIFY_WEBHOOK_SECRET: z.string(),
	UPSTASH_REDIS_REST_URL: z.string(),
	UPSTASH_REDIS_REST_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariables> {}
	}
}
