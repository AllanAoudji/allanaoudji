import CartItem from "./cartItem";

type UpdateCartItemAction = {
	cartItem: CartItem | undefined;
	quantityAdded?: number;
};

export default UpdateCartItemAction;
