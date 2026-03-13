import { LocalShopifyProvider } from "@/lib/contexts/localShopify-context";
import { getCollections, getPopularProducts } from "@/lib/shopify";

type Props = {
	children: React.ReactNode;
};

export default async function LocalShopifyDispenser({ children }: Readonly<Props>) {
	const collections = await getCollections();
	const popularProducts = await getPopularProducts();

	return (
		<LocalShopifyProvider initialCollection={collections} initialPopularProduct={popularProducts}>
			{children}
		</LocalShopifyProvider>
	);
}
