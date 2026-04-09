import Money from "./money";
import shopifyImage from "./shopifyImage";

type CartProduct = {
	publishedAt: string | null;
	featuredImage: shopifyImage;
	availableForSale: boolean;
	handle: string;
	id: string;
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	title: string;
	collections: {
		id: string;
		title: string;
	}[];
};

export default CartProduct;
