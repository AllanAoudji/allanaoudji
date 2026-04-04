import { LocalShopifyProvider } from "@/lib/contexts/localShopify-context";
import { getPopularProducts } from "@/lib/shopify";
import { getCollections, getDiscount } from "@/lib/shopify/utils/shopifyAdminFetch";
import { withMinimumDelay } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
};

export default async function LocalShopifyDispenser({ children }: Readonly<Props>) {
	const [collections, discountNodes, popularProducts] = await withMinimumDelay(
		Promise.all([getCollections(), getDiscount(), getPopularProducts()]),
		2000,
	);

	return (
		<LocalShopifyProvider
			initialCollections={collections}
			initialDiscountNodes={discountNodes}
			initialPopularProducts={popularProducts}
		>
			{children}
		</LocalShopifyProvider>
	);
}
