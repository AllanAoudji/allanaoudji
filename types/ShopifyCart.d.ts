import CartItem from "./cartItem";
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
	lines: Connection<CartItem>;
	totalQuantity: number;
};

export default ShopifyCart;
