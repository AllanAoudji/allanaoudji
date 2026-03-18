import type Edge from "@/types/Edge";

// ---------------------------------------------------------------------------
// Valeurs de réduction
// ---------------------------------------------------------------------------

export type DiscountPercentage = {
	__typename: "DiscountPercentage";
	percentage: number;
};

export type DiscountAmount = {
	__typename: "DiscountAmount";
	amount: {
		amount: string;
		currencyCode: string;
	};
};

export type DiscountValue = DiscountPercentage | DiscountAmount;

// ---------------------------------------------------------------------------
// Entités liées aux produits
// ---------------------------------------------------------------------------

export type DiscountProduct = {
	id: string;
	title: string;
	handle: string;
};

export type DiscountVariant = {
	id: string;
	title: string;
	product: {
		id: string;
		title: string;
	};
};

export type DiscountCollection = {
	id: string;
	title: string;
	handle: string;
};

// ---------------------------------------------------------------------------
// Scope de la remise (quels produits sont concernés)
// ---------------------------------------------------------------------------

export type AllDiscountItems = {
	__typename: "AllDiscountItems";
	allItems: boolean;
};

export type DiscountProducts = {
	__typename: "DiscountProducts";
	products: {
		edges: Edge<DiscountProduct>[];
	};
	productVariants: {
		edges: Edge<DiscountVariant>[];
	};
};

export type DiscountCollections = {
	__typename: "DiscountCollections";
	collections: {
		edges: Edge<DiscountCollection>[];
	};
};

export type DiscountItems = AllDiscountItems | DiscountProducts | DiscountCollections;

// ---------------------------------------------------------------------------
// CustomerGets
// ---------------------------------------------------------------------------

export type CustomerGets = {
	value: DiscountValue;
	items: DiscountItems;
};

// ---------------------------------------------------------------------------
// Combinaison de remises
// ---------------------------------------------------------------------------

export type CombinesWith = {
	orderDiscounts: boolean;
	productDiscounts: boolean;
	shippingDiscounts: boolean;
};

// ---------------------------------------------------------------------------
// Types de remises
// ---------------------------------------------------------------------------

export type DiscountCodeBasic = {
	__typename: "DiscountCodeBasic";
	title: string;
	startsAt: string;
	endsAt: string | null;
	combinesWith: CombinesWith;
	codes: {
		edges: Edge<{ code: string }>[];
	};
	customerGets: CustomerGets;
};

export type DiscountAutomaticBasic = {
	__typename: "DiscountAutomaticBasic";
	title: string;
	startsAt: string;
	endsAt: string | null;
	combinesWith: CombinesWith;
	customerGets: CustomerGets;
};

export type Discount = DiscountCodeBasic | DiscountAutomaticBasic;

// ---------------------------------------------------------------------------
// Nœud principal retourné par la query
// ---------------------------------------------------------------------------

export type DiscountNode = {
	id: string;
	discount: Discount;
};
