import CartItem from "./cartItem";
import Product from "./product";
import ProductVariant from "./productVariant";
import UpdateCartType from "./updateCartType";

type CartAction =
	| {
			type: "ADD_ITEM";
			product: Product;
			variant: ProductVariant;
			quantity: number;
			realCartLineId?: string;
	  }
	| { type: "UPDATE_CART_LINE_ID"; variantId: string; realCartLineId: string }
	| { type: "ROLLBACK_ADD"; previousLines: CartItem[] }
	| { type: "REMOVE_ITEM"; merchandiseId: string }
	| { type: "ROLLBACK_REMOVE"; previousLines: CartItem[] }
	| { type: "UPDATE_ITEM"; merchandiseId: string; updateType: UpdateCartType }
	| { type: "ROLLBACK_UPDATE"; previousLines: CartItem[] };

export default CartAction;
