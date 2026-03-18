import { LocalShopifyProvider } from "@/lib/contexts/localShopify-context";
import { getCollections, getDiscount, getPopularProducts } from "@/lib/shopify";

type Props = {
	children: React.ReactNode;
};

export default async function LocalShopifyDispenser({ children }: Readonly<Props>) {
	const collections = await getCollections();
	const popularProducts = await getPopularProducts();
	const discountNodes = await getDiscount();

	return (
		<LocalShopifyProvider
			initialDiscountNode={discountNodes}
			initialCollection={collections}
			initialPopularProduct={popularProducts}
		>
			{children}
		</LocalShopifyProvider>
	);
}
