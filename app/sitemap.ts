// app/sitemap.ts
import { getProducts, getCollections } from "@/lib/shopify";

export default async function sitemap() {
	const base = process.env.NEXT_PUBLIC_SITE_URL;

	const { products } = await getProducts({ first: 250 });
	const collections = await getCollections();

	const productUrls = products.map(p => ({
		url: `${base}/products/${p.handle}`,
		lastModified: p.updatedAt,
	}));

	const collectionUrls = collections
		.filter(c => c.handle)
		.map(c => ({
			url: `${base}/collections/${c.handle}`,
			lastModified: c.updatedAt,
		}));

	return [
		{ url: base, lastModified: new Date() },
		{ url: `${base}/collections`, lastModified: new Date() },
		...collectionUrls,
		...productUrls,
	];
}
