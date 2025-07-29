import { ShopifyProduct } from "./shopifyProduct";

type ShopifyProductOperation = {
	data: {
		product: ShopifyProduct;
	};
	variables: {
		handle: string;
	};
};

export default ShopifyProductOperation;
