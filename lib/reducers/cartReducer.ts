import { getApplicableDiscounts, computeFinalPrice } from "@/lib/util-discount";
import Cart from "@/types/cart";
import CartAction from "@/types/cartAction";
import CartItem from "@/types/cartItem";
import { DiscountNode } from "@/types/shopifyDiscount";

function recalcCart(lines: CartItem[], currency: string) {
	const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0);

	const subtotal = lines.reduce((sum, l) => sum + Number(l.cost.totalAmount.amount), 0).toFixed(2);

	const totalDiscount = lines
		.reduce((sum, l) => {
			const lineDiscount = (l.discountAllocations ?? []).reduce(
				(s, a) => s + Number(a.discountedAmount.amount),
				0,
			);
			return sum + lineDiscount;
		}, 0)
		.toFixed(2);

	const total = (Number(subtotal) - Number(totalDiscount)).toFixed(2);

	return {
		lines,
		totalQuantity,
		cost: {
			subtotalAmount: { amount: subtotal, currencyCode: currency },
			totalAmount: { amount: total, currencyCode: currency },
			totalTaxAmount: { amount: "0.00", currencyCode: currency },
		},
	};
}

function buildItemWithDiscount(item: CartItem, discountNodes: DiscountNode[]): CartItem {
	const collectionIds = item.merchandise.product.collections?.map(c => c.id) ?? [];
	const discounts = getApplicableDiscounts(
		discountNodes,
		item.merchandise.product.id,
		collectionIds,
	);
	const originalPrice = Number(item.cost.totalAmount.amount) / item.quantity;
	const { finalPrice } = computeFinalPrice(originalPrice, discounts);
	const discountedAmount = originalPrice - finalPrice;

	const getDiscountAllocations = (discountedAmount: number) => {
		return [
			{
				discountedAmount: {
					amount: (discountedAmount * item.quantity).toFixed(2),
					currencyCode: item.cost.totalAmount.currencyCode,
				},
			},
		];
	};

	return {
		...item,
		discountAllocations: discountedAmount > 0 ? getDiscountAllocations(discountedAmount) : [],
	};
}

export function cartReducer(
	cart: Cart | undefined,
	action: CartAction,
	discountNodes: DiscountNode[] = [],
): Cart | undefined {
	if (!cart) {
		if (action.type === "ADD_ITEM") {
			const { product, variant, quantity, realCartLineId } = action;
			const rawItem: CartItem = {
				id: realCartLineId ?? `cartitem-${variant.id}-${Date.now()}`,
				quantity,
				cost: {
					totalAmount: {
						amount: (Number(variant.price.amount) * quantity).toFixed(2),
						currencyCode: variant.price.currencyCode,
					},
				},
				merchandise: {
					availableForSale: variant.availableForSale,
					id: variant.id,
					title: variant.title,
					selectedOptions: variant.selectedOptions,
					image: variant.image,
					product: {
						availableForSale: product.availableForSale,
						publishedAt: product.publishedAt,
						id: product.id,
						title: product.title,
						handle: product.handle,
						priceRange: product.priceRange,
						featuredImage: product.featuredImage,
						collections: product.collections,
					},
				},
			};

			const newItem = buildItemWithDiscount(rawItem, discountNodes);
			const lines = [newItem];

			return {
				id: undefined,
				checkoutUrl: "",
				discountCodes: [],
				totalQuantity: quantity,
				lines,
				cost: {
					subtotalAmount: {
						amount: newItem.cost.totalAmount.amount,
						currencyCode: variant.price.currencyCode,
					},
					totalAmount: {
						amount: newItem.cost.totalAmount.amount,
						currencyCode: variant.price.currencyCode,
					},
					totalTaxAmount: { amount: "0.00", currencyCode: variant.price.currencyCode },
				},
			};
		}
		if (action.type === "SYNC_CART") {
			return action.cart;
		}
		return cart;
	}

	switch (action.type) {
		case "SYNC_CART": {
			return action.cart;
		}

		case "ADD_ITEM": {
			const { product, variant, quantity, realCartLineId } = action;
			const existingItem = cart.lines.find(line => line.merchandise.id === variant.id);
			const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;

			const rawItem: CartItem = {
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
					availableForSale: variant.availableForSale,
					product: {
						availableForSale: product.availableForSale,
						publishedAt: product.publishedAt,
						id: product.id,
						title: product.title,
						handle: product.handle,
						priceRange: product.priceRange,
						featuredImage: product.featuredImage,
						collections: product.collections,
					},
				},
			};

			const updatedItem = buildItemWithDiscount(rawItem, discountNodes);
			const updatedLines = existingItem
				? cart.lines.map(line => (line.merchandise.id === variant.id ? updatedItem : line))
				: [...cart.lines, updatedItem];

			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "UPDATE_CART_LINE": {
			const updatedLine = (line: CartItem): CartItem => {
				const raw: CartItem = {
					...line,
					id: action.realCartLineId,
					quantity: action.realQuantity,
					cost: {
						totalAmount: {
							amount: (
								(Number(line.cost.totalAmount.amount) / line.quantity) *
								action.realQuantity
							).toFixed(2),
							currencyCode: line.cost.totalAmount.currencyCode,
						},
					},
				};
				return buildItemWithDiscount(raw, discountNodes);
			};
			const updatedLines = cart.lines.map(line =>
				line.merchandise.id === action.variantId ? updatedLine(line) : line,
			);
			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "ROLLBACK_ADD":
		case "ROLLBACK_REMOVE":
		case "ROLLBACK_UPDATE": {
			return {
				...cart,
				...recalcCart(action.previousLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "REMOVE_ITEM": {
			const updatedLines = cart.lines.filter(line => line.merchandise.id !== action.merchandiseId);
			return {
				...cart,
				...recalcCart(updatedLines, cart.cost.totalAmount.currencyCode),
			};
		}

		case "UPDATE_ITEM": {
			const updatedLines = cart.lines
				.map(line => {
					if (line.merchandise.id !== action.merchandiseId) return line;
					const newQuantity = action.updateType === "plus" ? line.quantity + 1 : line.quantity - 1;
					if (newQuantity <= 0) return null;
					const raw: CartItem = {
						...line,
						quantity: newQuantity,
						cost: {
							totalAmount: {
								amount: ((Number(line.cost.totalAmount.amount) / line.quantity) * newQuantity).toFixed(2),
								currencyCode: line.cost.totalAmount.currencyCode,
							},
						},
					};
					return buildItemWithDiscount(raw, discountNodes);
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
