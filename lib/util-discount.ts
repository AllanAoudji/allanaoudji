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
	/** Uniquement présent pour les remises de type code promo */
	codes?: string[];
};

export type DiscountResult = {
	finalPrice: number;
	applied: ApplicableDiscount[];
	/** true si plusieurs remises ont été cumulées */
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
	let result: number;

	switch (value.__typename) {
		case "DiscountPercentage":
			// Shopify retourne déjà une valeur entre 0 et 1 (ex: 0.5 = 50%)
			result = price * (1 - value.percentage);
			break;
		case "DiscountAmount":
			result = price - parseFloat(value.amount.amount);
			break;
	}

	return Math.max(0, parseFloat(result.toFixed(2)));
}

function canCombine(a: ApplicableDiscount, b: ApplicableDiscount): boolean {
	return a.combinesWith.productDiscounts && b.combinesWith.productDiscounts;
}

// ---------------------------------------------------------------------------
// Trouve tous les groupes de remises mutuellement combinables
// ---------------------------------------------------------------------------

function findCombinableGroups(discounts: ApplicableDiscount[]): ApplicableDiscount[][] {
	const groups: ApplicableDiscount[][] = [];

	function backtrack(start: number, current: ApplicableDiscount[]) {
		if (current.length > 1) groups.push([...current]);

		for (let i = start; i < discounts.length; i++) {
			const candidate = discounts[i];
			const compatibleWithAll = current.every(d => canCombine(d, candidate));
			if (compatibleWithAll) {
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
// Filtre les remises applicables à un produit donné
// ---------------------------------------------------------------------------

export function getApplicableDiscounts(
	discountNodes: DiscountNode[],
	productId: string,
	collectionIds: string[] = [],
): ApplicableDiscount[] {
	const applicable: ApplicableDiscount[] = [];

	for (const { discount } of discountNodes) {
		if (
			discount.__typename !== "DiscountCodeBasic" &&
			discount.__typename !== "DiscountAutomaticBasic"
		)
			continue;

		if (!isDiscountActive(discount.startsAt, discount.endsAt)) continue;

		if (!isProductCovered(productId, collectionIds, discount.customerGets.items)) continue;

		applicable.push({
			title: discount.title,
			value: discount.customerGets.value,
			combinesWith: discount.combinesWith,
			codes:
				discount.__typename === "DiscountCodeBasic"
					? discount.codes.edges.map(e => e.node.code)
					: undefined,
		});
	}

	return applicable;
}

// ---------------------------------------------------------------------------
// Calcule le prix final en évaluant tous les groupes possibles
// et retourne le plus avantageux pour le client
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

	// Option 1 — chaque remise seule
	for (const discount of discounts) {
		candidates.push({
			finalPrice: applyDiscount(originalPrice, discount.value),
			applied: [discount],
		});
	}

	// Option 2 — groupes de remises mutuellement combinables
	const combinableGroups = findCombinableGroups(discounts);
	for (const group of combinableGroups) {
		const finalPrice = group.reduce((price, d) => applyDiscount(price, d.value), originalPrice);
		candidates.push({ finalPrice, applied: group });
	}

	// Sélectionne le groupe le plus avantageux pour le client
	const best = candidates.reduce((acc, cur) => (cur.finalPrice < acc.finalPrice ? cur : acc));

	return {
		finalPrice: best.finalPrice,
		applied: best.applied,
		isCombined: best.applied.length > 1,
	};
}

// ---------------------------------------------------------------------------
// Formate un label de remise lisible (ex: "-10%" ou "-5,00 €")
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
	}
}
