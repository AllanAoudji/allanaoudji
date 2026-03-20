import { LocalShopifyProvider } from "@/lib/contexts/localShopify-context";
import { getCollections, getDiscount, getPopularProducts } from "@/lib/shopify";
import { withMinimumDelay } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
};

export default async function LocalShopifyDispenser({ children }: Readonly<Props>) {
	const [collections, popularProducts, discountNodes] = await withMinimumDelay(
		Promise.all([getCollections(), getPopularProducts(), getDiscount()]),
		2000,
	);

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
