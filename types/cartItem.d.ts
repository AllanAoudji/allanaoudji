import CartProduct from "./cartProduct";

type CartItem = {
	id: string | undefined;
	quantity: number;
	cost: {
		totalAmount: Money;
	};
	merchandise: {
		id: string;
		title: string;
		selectedOptions: {
			name: string;
			value: string;
		}[];
		product: CartProduct;
	};
};

export default CartItem;
