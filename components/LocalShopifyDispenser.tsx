import * as Sentry from "@sentry/nextjs";
import { LocalShopifyProvider } from "@/lib/contexts/localShopify-context";
import { getPopularProducts } from "@/lib/shopify";
import { getCollections, getDiscount } from "@/lib/shopify/utils/shopifyAdminFetch";
import { withMinimumDelay } from "@/lib/utils";
import Collection from "@/types/collection";
import Product from "@/types/product";

type Props = {
	children: React.ReactNode;
};

export default async function LocalShopifyDispenser({ children }: Readonly<Props>) {
	const [collections, discountNodes, popularProducts] = await withMinimumDelay(
		Promise.all([
			getCollections().catch(err => {
				Sentry.captureException(err, { extra: { context: "LocalShopifyDispenser collections" } });
				return [] as Collection[];
			}),
			getDiscount(),
			getPopularProducts().catch(err => {
				Sentry.captureException(err, { extra: { context: "LocalShopifyDispenser popularProducts" } });
				return [] as Product[];
			}),
		]),
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
