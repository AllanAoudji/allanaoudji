import ShopifyCart from "./ShopifyCart";

type ShopifyCartOperation = {
	data: {
		cart: ShopifyCart;
	};
	variables: {
		cartId: string;
	};
};

export default ShopifyCartOperation;
