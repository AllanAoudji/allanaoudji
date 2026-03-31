import ShopifyCartItem from "./ShopifyCartItem";
import Connection from "./connection";
import Money from "./money";

type ShopifyCart = {
	id: string | undefined;
	checkoutUrl: string;
	discountCodes: {
		code: string;
		applicable: boolean;
	}[];
	cost: {
		subtotalAmount: Money;
		totalAmount: Money;
		totalTaxAmount: Money;
	};
	lines: Connection<ShopifyCartItem>;
	totalQuantity: number;
};

export default ShopifyCart;
