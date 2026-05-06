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

	return {
		lines,
		totalQuantity,
		partialCost: {
			subtotalAmount: { amount: subtotal, currencyCode: currency },
			totalDiscount: { amount: totalDiscount, currencyCode: currency },
			estimatedTotal: { amount: subtotal, currencyCode: currency },
		},
	};
}

function resolveUnitPrice(item: CartItem): number {
	if (item.originalUnitPrice) return Number(item.originalUnitPrice);
	return item.cost.amountPerQuantity
		? Number(item.cost.amountPerQuantity.amount)
		: Number(item.cost.totalAmount.amount) / item.quantity;
}

function buildItemWithDiscount(item: CartItem, discountNodes: DiscountNode[]): CartItem {
	const collectionIds = item.merchandise.product.collections?.map(c => c.id) ?? [];
	const discounts = getApplicableDiscounts(
		discountNodes,
		item.merchandise.product.id,
		collectionIds,
	);
	const unitPrice = resolveUnitPrice(item);
	const { finalPrice } = computeFinalPrice(unitPrice, discounts);
	const discountedAmount = unitPrice - finalPrice;

	const discountAllocations = [
		{
			discountedAmount: {
				amount: (discountedAmount * item.quantity).toFixed(2),
				currencyCode: item.cost.totalAmount.currencyCode,
			},
		},
	];

	return {
		...item,
		cost: {
			...item.cost,
			totalAmount: {
				amount: (finalPrice * item.quantity).toFixed(2),
				currencyCode: item.cost.totalAmount.currencyCode,
			},
		},
		discountAllocations: discountedAmount > 0 ? discountAllocations : [],
	};
}

function enrichLines(lines: CartItem[]): CartItem[] {
	return lines.map(line => ({
		...line,
		originalUnitPrice: line.originalUnitPrice ?? line.cost.amountPerQuantity?.amount ?? undefined,
	}));
}

export function cartReducer(
	cart: Cart | undefined,
	action: CartAction,
	discountNodes: DiscountNode[] = [],
): Cart | undefined {
	if (!cart) {
		if (action.type === "ADD_ITEM") {
			const { product, variant, quantity, realCartLineId } = action;
			const unitPrice = Number(variant.price.amount);
			const rawItem: CartItem = {
				id: realCartLineId ?? `cartitem-${variant.id}-${Date.now()}`,
				quantity,
				originalUnitPrice: variant.price.amount,
				cost: {
					totalAmount: {
						amount: (unitPrice * quantity).toFixed(2),
						currencyCode: variant.price.currencyCode,
					},
					amountPerQuantity: {
						amount: variant.price.amount,
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
			return { ...action.cart, lines: enrichLines(action.cart.lines) };
		}
		return cart;
	}

	switch (action.type) {
		case "SYNC_CART": {
			return { ...action.cart, lines: enrichLines(action.cart.lines) };
		}

		case "ADD_ITEM": {
			const { product, variant, quantity, realCartLineId } = action;
			const existingItem = cart.lines.find(line => line.merchandise.id === variant.id);
			const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;
			const unitPrice = Number(variant.price.amount);

			const rawItem: CartItem = {
				id: realCartLineId ?? existingItem?.id ?? `cartitem-${variant.id}-${Date.now()}`,
				quantity: newQuantity,
				originalUnitPrice: variant.price.amount,
				cost: {
					totalAmount: {
						amount: (unitPrice * newQuantity).toFixed(2),
						currencyCode: variant.price.currencyCode,
					},
					amountPerQuantity: {
						amount: variant.price.amount,
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

			const { lines, totalQuantity, partialCost } = recalcCart(
				updatedLines,
				cart.cost.totalAmount.currencyCode,
			);

			return {
				...cart,
				lines,
				totalQuantity,
				cost: {
					...cart.cost,
					subtotalAmount: partialCost.subtotalAmount,
					totalAmount: partialCost.estimatedTotal,
				},
			};
		}

		case "UPDATE_CART_LINE": {
			const updatedLines = cart.lines.map(line => {
				if (line.merchandise.id !== action.variantId) return line;
				const unitPrice = resolveUnitPrice(line);

				const raw: CartItem = {
					...line,
					id: action.realCartLineId,
					quantity: action.realQuantity,
					originalUnitPrice: line.originalUnitPrice,
					cost: {
						...line.cost,
						totalAmount: {
							amount: (unitPrice * action.realQuantity).toFixed(2),
							currencyCode: line.cost.totalAmount.currencyCode,
						},
						amountPerQuantity: {
							amount: String(unitPrice),
							currencyCode: line.cost.totalAmount.currencyCode,
						},
					},
				};
				return buildItemWithDiscount(raw, discountNodes);
			});

			const { lines, totalQuantity, partialCost } = recalcCart(
				updatedLines,
				cart.cost.totalAmount.currencyCode,
			);

			return {
				...cart,
				lines,
				totalQuantity,
				cost: {
					...cart.cost,
					subtotalAmount: partialCost.subtotalAmount,
					totalAmount: partialCost.estimatedTotal,
				},
			};
		}

		case "ROLLBACK_ADD":
		case "ROLLBACK_REMOVE":
		case "ROLLBACK_UPDATE": {
			const { lines, totalQuantity, partialCost } = recalcCart(
				action.previousLines,
				cart.cost.totalAmount.currencyCode,
			);

			return {
				...cart,
				lines,
				totalQuantity,
				cost: {
					...cart.cost,
					subtotalAmount: partialCost.subtotalAmount,
					totalAmount: partialCost.estimatedTotal,
				},
			};
		}

		case "REMOVE_ITEM": {
			const updatedLines = cart.lines.filter(line => line.merchandise.id !== action.merchandiseId);

			const { lines, totalQuantity, partialCost } = recalcCart(
				updatedLines,
				cart.cost.totalAmount.currencyCode,
			);

			return {
				...cart,
				lines,
				totalQuantity,
				cost: {
					...cart.cost,
					subtotalAmount: partialCost.subtotalAmount,
					totalAmount: partialCost.estimatedTotal,
				},
			};
		}

		case "UPDATE_ITEM": {
			const updatedLines = cart.lines
				.map(line => {
					if (line.merchandise.id !== action.merchandiseId) return line;
					const newQuantity = action.updateType === "plus" ? line.quantity + 1 : line.quantity - 1;
					if (newQuantity <= 0) return null;
					const unitPrice = resolveUnitPrice(line);
					const raw: CartItem = {
						...line,
						quantity: newQuantity,
						originalUnitPrice: line.originalUnitPrice,
						cost: {
							...line.cost,
							totalAmount: {
								amount: (unitPrice * newQuantity).toFixed(2),
								currencyCode: line.cost.totalAmount.currencyCode,
							},
							amountPerQuantity: {
								amount: String(unitPrice),
								currencyCode: line.cost.totalAmount.currencyCode,
							},
						},
					};
					return buildItemWithDiscount(raw, discountNodes);
				})
				.filter(Boolean) as CartItem[];

			const { lines, totalQuantity, partialCost } = recalcCart(
				updatedLines,
				cart.cost.totalAmount.currencyCode,
			);

			return {
				...cart,
				lines,
				totalQuantity,
				cost: {
					...cart.cost,
					subtotalAmount: partialCost.subtotalAmount,
					totalAmount: partialCost.estimatedTotal,
				},
			};
		}

		default:
			return cart;
	}
}
