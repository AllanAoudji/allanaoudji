import Cart from "@/types/cart";
import CartAction from "@/types/cartAction";
import CartItem from "@/types/cartItem";

function recalcCart(lines: CartItem[], currency: string) {
	const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0);
	const total = lines.reduce((sum, l) => sum + Number(l.cost.totalAmount.amount), 0).toFixed(2);

	return {
		lines,
		totalQuantity,
		cost: {
			subtotalAmount: { amount: total, currencyCode: currency },
			totalAmount: { amount: total, currencyCode: currency },
			totalTaxAmount: { amount: "0.00", currencyCode: currency },
		},
	};
}

export function cartReducer(cart: Cart | undefined, action: CartAction): Cart | undefined {
	if (!cart) return cart;

	switch (action.type) {
		case "UPDATE_CART_LINE_ID": {
			return {
				...cart,
				lines: cart.lines.map(line =>
					line.merchandise.id === action.variantId ? { ...line, id: action.realCartLineId } : line,
				),
			};
		}
		case "ROLLBACK_ADD": {
			return {
				...cart,
				...recalcCart(action.previousLines, cart.cost.totalAmount.currencyCode),
			};
		}
		case "ADD_ITEM": {
			const { product, variant, quantity, realCartLineId } = action;
			const existingItem = cart.lines.find(line => line.merchandise.id === variant.id);
			const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

			const updatedItem: CartItem = {
				id: realCartLineId ?? existingItem?.id ?? `cartitem-${variant.id}-${Date.now()}`,
				quantity: newQuantity,
				cost: {
					totalAmount: {
						amount: (Number(variant.price.amount) * newQuantity).toFixed(2),
						currencyCode: variant.price.currencyCode,
					},
				},
				merchandise: {
					id: variant.id,
					title: variant.title,
					selectedOptions: variant.selectedOptions,
					image: variant.image,
					product: {
						id: product.id,
						title: product.title,
						handle: product.handle,
						priceRange: product.priceRange,
						featuredImage: product.featuredImage,
					},
				},
			};

			const updatedLines = existingItem
				? cart.lines.map(line => (line.merchandise.id === variant.id ? updatedItem : line))
				: [...cart.lines, updatedItem];

			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "REMOVE_ITEM": {
			const updatedLines = cart.lines.filter(line => line.merchandise.id !== action.merchandiseId);
			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "ROLLBACK_REMOVE":
		case "ROLLBACK_UPDATE": {
			return {
				...cart,
				...recalcCart(action.previousLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "UPDATE_ITEM": {
			const updatedLines = cart.lines
				.map(line => {
					if (line.merchandise.id !== action.merchandiseId) return line;
					const newQuantity = action.updateType === "plus" ? line.quantity + 1 : line.quantity - 1;
					if (newQuantity <= 0) return null;
					return {
						...line,
						quantity: newQuantity,
						cost: {
							totalAmount: {
								amount: ((Number(line.cost.totalAmount.amount) / line.quantity) * newQuantity).toFixed(2),
								currencyCode: line.cost.totalAmount.currencyCode,
							},
						},
					};
				})
				.filter(Boolean) as CartItem[];
			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}
		default:
			return cart;
	}
}
