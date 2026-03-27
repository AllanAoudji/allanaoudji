import CartItem from "./cartItem";

type UpdateCartItemAction = {
	cartItem: CartItem | undefined;
	quantityAdded?: number;
	newCartId?: string;
};

export default UpdateCartItemAction;
