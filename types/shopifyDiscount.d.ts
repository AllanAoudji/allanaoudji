import type Edge from "@/types/Edge";

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

export type DiscountFreeShipping = {
	__typename: "DiscountFreeShipping";
};

export type DiscountValue = DiscountPercentage | DiscountAmount | DiscountFreeShipping;

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

export type CustomerGets = {
	value: DiscountValue;
	items: DiscountItems;
};

export type CombinesWith = {
	orderDiscounts: boolean;
	productDiscounts: boolean;
	shippingDiscounts: boolean;
};

export type DiscountMinimumRequirementSubtotal = {
	__typename: "DiscountMinimumSubtotal";
	greaterThanOrEqualToSubtotal: {
		amount: string;
		currencyCode: string;
	};
};

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

export type DiscountCodeFreeShipping = {
	__typename: "DiscountCodeFreeShipping";
	title: string;
	startsAt: string;
	endsAt: string | null;
	combinesWith: CombinesWith;
	maximumShippingPrice: { amount: string } | null;
	minimumRequirement?: DiscountMinimumRequirementSubtotal | null;
};

export type DiscountAutomaticFreeShipping = {
	__typename: "DiscountAutomaticFreeShipping";
	title: string;
	startsAt: string;
	endsAt: string | null;
	combinesWith: CombinesWith;
	maximumShippingPrice: { amount: string } | null;
	minimumRequirement?: DiscountMinimumRequirementSubtotal | null;
};

export type Discount =
	| DiscountCodeBasic
	| DiscountAutomaticBasic
	| DiscountCodeFreeShipping
	| DiscountAutomaticFreeShipping;

export type DiscountNode = {
	id: string;
	discount: Discount;
};
