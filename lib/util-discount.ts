import Money from "@/types/money";
import type {
	DiscountNode,
	DiscountItems,
	DiscountValue,
	CombinesWith,
} from "@/types/shopifyDiscount";

// ---------------------------------------------------------------------------
// Types utilitaires
// ---------------------------------------------------------------------------

export type ApplicableDiscount = {
	title: string;
	value: DiscountValue;
	combinesWith: CombinesWith;
};

export type DiscountResult = {
	finalPrice: number;
	applied: ApplicableDiscount[];
	isCombined: boolean;
};

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

function isDiscountActive(startsAt: string, endsAt: string | null): boolean {
	const now = new Date();
	const start = new Date(startsAt);
	const end = endsAt ? new Date(endsAt) : null;
	return now >= start && (end === null || now <= end);
}

function isProductCovered(
	productId: string,
	collectionIds: string[],
	items: DiscountItems,
): boolean {
	switch (items.__typename) {
		case "AllDiscountItems":
			return items.allItems;
		case "DiscountProducts": {
			const productMatch = items.products.edges.some(e => e.node.id === productId);
			const variantMatch = items.productVariants.edges.some(e => e.node.product.id === productId);
			return productMatch || variantMatch;
		}
		case "DiscountCollections":
			return items.collections.edges.some(e => collectionIds.includes(e.node.id));
	}
}

function applyDiscount(price: number, value: DiscountValue): number {
	switch (value.__typename) {
		case "DiscountPercentage":
			return Math.max(0, parseFloat((price * (1 - value.percentage)).toFixed(2)));
		case "DiscountAmount":
			return Math.max(0, parseFloat((price - parseFloat(value.amount.amount)).toFixed(2)));
		case "DiscountFreeShipping":
			// Ne touche pas au prix produit
			return price;
	}
}

function canCombine(a: ApplicableDiscount, b: ApplicableDiscount): boolean {
	return a.combinesWith.productDiscounts && b.combinesWith.productDiscounts;
}

function findCombinableGroups(discounts: ApplicableDiscount[]): ApplicableDiscount[][] {
	const groups: ApplicableDiscount[][] = [];

	function backtrack(start: number, current: ApplicableDiscount[]) {
		if (current.length > 1) groups.push([...current]);
		for (let i = start; i < discounts.length; i++) {
			const candidate = discounts[i];
			if (current.every(d => canCombine(d, candidate))) {
				current.push(candidate);
				backtrack(i + 1, current);
				current.pop();
			}
		}
	}

	backtrack(0, []);
	return groups;
}

// ---------------------------------------------------------------------------
// Filtre les remises automatiques applicables à un produit donné
// ⚠️ Seuls DiscountAutomaticBasic sont pris en compte pour le prix produit
// DiscountAutomaticFreeShipping est géré séparément via getFreeShippingThreshold
// ---------------------------------------------------------------------------

export function getApplicableDiscounts(
	discountNodes: DiscountNode[],
	productId: string,
	collectionIds: string[] = [],
): ApplicableDiscount[] {
	const applicable: ApplicableDiscount[] = [];

	for (const { discount } of discountNodes) {
		// Uniquement les remises automatiques sur produit
		if (discount.__typename !== "DiscountAutomaticBasic") continue;

		if (!isDiscountActive(discount.startsAt, discount.endsAt)) continue;

		if (!isProductCovered(productId, collectionIds, discount.customerGets.items)) continue;

		applicable.push({
			title: discount.title,
			value: discount.customerGets.value,
			combinesWith: discount.combinesWith,
		});
	}

	return applicable;
}

// ---------------------------------------------------------------------------
// Calcule le prix final
// ---------------------------------------------------------------------------

export function computeFinalPrice(
	originalPrice: number,
	discounts: ApplicableDiscount[],
): DiscountResult {
	if (discounts.length === 0) {
		return { finalPrice: originalPrice, applied: [], isCombined: false };
	}

	type Candidate = { finalPrice: number; applied: ApplicableDiscount[] };
	const candidates: Candidate[] = [];

	for (const discount of discounts) {
		candidates.push({
			finalPrice: applyDiscount(originalPrice, discount.value),
			applied: [discount],
		});
	}

	const combinableGroups = findCombinableGroups(discounts);
	for (const group of combinableGroups) {
		const finalPrice = group.reduce((price, d) => applyDiscount(price, d.value), originalPrice);
		candidates.push({ finalPrice, applied: group });
	}

	const best = candidates.reduce((acc, cur) => (cur.finalPrice < acc.finalPrice ? cur : acc));

	return {
		finalPrice: best.finalPrice,
		applied: best.applied,
		isCombined: best.applied.length > 1,
	};
}

// ---------------------------------------------------------------------------
// Formate un label de remise lisible
// ---------------------------------------------------------------------------

export function formatDiscountLabel(value: DiscountValue, locale = "fr-FR"): string {
	switch (value.__typename) {
		case "DiscountPercentage":
			return `-${value.percentage * 100}%`;
		case "DiscountAmount":
			return `-${new Intl.NumberFormat(locale, {
				style: "currency",
				currency: value.amount.currencyCode,
			}).format(parseFloat(value.amount.amount))}`;
		case "DiscountFreeShipping":
			return "Livraison offerte";
	}
}

// ---------------------------------------------------------------------------
// Retourne le seuil de livraison gratuite (automatiques uniquement)
// ⚠️ DiscountCodeFreeShipping et DiscountCodeBasic sont ignorés
// ---------------------------------------------------------------------------

export function getFreeShippingThreshold(discountNodes: DiscountNode[]): Money | null {
	const shippingDiscounts: Money[] = discountNodes
		.map(({ discount }) => {
			// Livraison gratuite automatique avec montant minimum
			if (
				discount.__typename === "DiscountAutomaticFreeShipping" &&
				isDiscountActive(discount.startsAt, discount.endsAt)
			) {
				const minReq = discount.minimumRequirement?.greaterThanOrEqualToSubtotal;
				if (minReq?.amount) {
					return {
						amount: minReq.amount,
						currencyCode: minReq.currencyCode,
					};
				}
			}

			return null;
		})
		.filter(Boolean) as Money[];

	if (!shippingDiscounts.length) return null;

	// Seuil le plus bas si plusieurs remises livraison existent
	shippingDiscounts.sort((a, b) => parseFloat(a.amount) - parseFloat(b.amount));
	return shippingDiscounts[0];
}
