import CartProduct from "./cartProduct";
import Money from "./money";
import shopifyImage from "./shopifyImage";

type DiscountAllocation = {
	discountedAmount: Money;
	title?: string;
	code?: string;
};

type CartItem = {
	id: string | undefined;
	quantity: number;
	cost: {
		totalAmount: Money;
		amountPerQuantity?: Money;
		compareAtAmountPerQuantity?: Money | null;
	};
	discountAllocations?: DiscountAllocation[];
	originalUnitPrice?: string;
	merchandise: {
		id: string;
		availableForSale: boolean;
		title: string;
		selectedOptions: {
			name: string;
			value: string;
		}[];
		image?: shopifyImage;
		product: CartProduct;
	};
};

export default CartItem;
