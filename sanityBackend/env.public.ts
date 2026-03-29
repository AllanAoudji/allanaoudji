import { assertValue } from "@/lib/utils";

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-07-12";
export const dataset = assertValue(
	process.env.NEXT_PUBLIC_SANITY_DATASET,
	"Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);
export const projectId = assertValue(
	process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	"Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);
// not used in client.ts, but can be used in other places if needed
export const useCdn = process.env.NEXT_PUBLIC_SANITY_USE_CDN !== "false";
