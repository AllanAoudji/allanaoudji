import Connection from "./connection";
import Money from "./money";
import shopifyImage from "./shopifyImage";

type ShopifyCartItem = {
	id: string | undefined;
	quantity: number;
	cost: {
		totalAmount: Money;
		amountPerQuantity?: Money;
		compareAtAmountPerQuantity?: Money | null;
	};
	discountAllocations?: {
		discountedAmount: Money;
		title?: string;
		code?: string;
	}[];
	merchandise: {
		id: string;
		title: string;
		selectedOptions: { name: string; value: string }[];
		image?: shopifyImage;
		product: {
			publishedAt: string | null;
			featuredImage: shopifyImage;
			handle: string;
			id: string;
			priceRange: { maxVariantPrice: Money; minVariantPrice: Money };
			title: string;
			collections: Connection<{ id: string; title: string }>;
		};
	};
};

export default ShopifyCartItem;
