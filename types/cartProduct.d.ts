import Money from "./money";
import shopifyImage from "./shopifyImage";

type CartProduct = {
	featuredImage: shopifyImage;
	handle: string;
	id: string;
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	title: string;
};

export default CartProduct;
