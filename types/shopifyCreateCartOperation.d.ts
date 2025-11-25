import ShopifyCart from "./ShopifyCart";

type ShopifyCreateCartOperation = {
	data: {
		cartCreate: {
			cart: ShopifyCart;
		};
	};
};

export default ShopifyCreateCartOperation;
