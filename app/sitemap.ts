// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getProducts, getCollections } from "@/lib/shopify";
import { sanityFetch } from "@/studio/lib/live";
import { WORKS_SITEMAP_QUERY } from "@/studio/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [{ products }, collections, { data: works }] = await Promise.all([
		getProducts({ first: 250 }),
		getCollections(),
		sanityFetch({ query: WORKS_SITEMAP_QUERY }),
	]);

	const productUrls = products.map(p => ({
		url: `${BASE_URL}/products/${p.handle}`,
		lastModified: p.updatedAt,
		changeFrequency: "weekly" as const,
		priority: 0.7,
	}));

	const collectionUrls = collections
		.filter(c => c.handle)
		.map(c => ({
			url: `${BASE_URL}/collections/${c.handle}`,
			lastModified: c.updatedAt,
			changeFrequency: "weekly" as const,
			priority: 0.6,
		}));

	const workUrls = (works ?? []).map(work => ({
		url: `${BASE_URL}/works/${work.slug}`,
		lastModified: new Date(work._updatedAt),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	return [
		{ url: BASE_URL, changeFrequency: "weekly", priority: 1 },
		{ url: `${BASE_URL}/collections`, changeFrequency: "weekly", priority: 0.6 },
		{ url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
		{ url: `${BASE_URL}/legal`, changeFrequency: "yearly", priority: 0.3 },
		...collectionUrls,
		...productUrls,
		...workUrls,
	];
}
