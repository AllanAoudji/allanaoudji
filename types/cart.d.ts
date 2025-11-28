import ShopifyCart from "./ShopifyCart";
import CartItem from "./cartItem";

type Cart = Omit<ShopifyCart, "lines"> & {
	lines: CartItem[];
};

export default Cart;
