import ShopifyCart from "./ShopifyCart";

type ShopifyRemoveFromCartOperation = {
	data: {
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lineIds: string[];
	};
};

export default ShopifyRemoveFromCartOperation;
