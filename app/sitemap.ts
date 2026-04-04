import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";
import { getCollections } from "@/lib/shopify/utils/shopifyAdminFetch";
import { getWorksSiteMap } from "@/studio/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const [collections, { products }, { data: works }] = await Promise.all([
		getCollections(),
		getProducts({ first: 250 }),
		getWorksSiteMap(),
	]);

	const productUrls = products.map(p => ({
		changeFrequency: "weekly" as const,
		lastModified: p.updatedAt,
		priority: 0.7,
		url: `${BASE_URL}/products/${p.handle}`,
	}));

	const collectionUrls = collections
		.filter(c => c.handle && (c.productsCount?.count ?? 0) > 0)
		.map(c => ({
			changeFrequency: "weekly" as const,
			lastModified: c.updatedAt,
			url: `${BASE_URL}/collections/${c.handle}`,
			priority: 0.6,
		}));

	const workUrls = (works ?? []).map(work => ({
		changeFrequency: "monthly" as const,
		lastModified: new Date(work._updatedAt),
		priority: 0.8,
		url: `${BASE_URL}/gallery/${work.slug}`,
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
