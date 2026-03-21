import ShopifyCart from "./ShopifyCart";
import ShopifyVariantInventory from "./ShopifyVariantInventory";
import Connection from "./connection";
import ShopifyColelction from "./shopifyCollection";
import { DiscountNode } from "./shopifyDiscount";
import { ShopifyPage } from "./shopifyPage";
import ShopifyPageInfo from "./shopifyPageInfo";
import ShopifyProduct from "./shopifyProduct";

export type ShopifyAddToCartOperation = {
	data: {
		cartLinesAdd: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			merchandiseId: string;
			quantity: number;
		}[];
	};
};

export type ShopifyCartOperation = {
	data: {
		cart: ShopifyCart;
	};
	variables: {
		cartId: string;
	};
};

export type ShopifyCollectionProductsOperation = {
	data: {
		collection: {
			products: Connection<ShopifyProduct> & { pageInfo: ShopifyPageInfo };
		};
	};
	variables: {
		handle: string;
		reverse?: boolean;
		sortKey?: string;
		first?: number;
		after?: string;
	};
};

export type ShopifyCollectionsOperation = {
	data: {
		collections: Connection<ShopifyColelction>;
	};
};

export type ShopifyCreateCartOperation = {
	data: {
		cartCreate: {
			cart: ShopifyCart;
		};
	};
};

export type ShopifyLatestProductsOperation = {
	data: {
		collection: {
			products: Connection<ShopifyProduct>;
		};
	};
};

export type ShopifyMenuOperation = {
	data: {
		menu?: {
			items: {
				title: string;
				url: string;
			}[];
		};
	};
	variables: {
		handle: string;
	};
};

export type ShopifyPageOperation = {
	data: {
		pageByHandle: ShopifyPage;
	};
	variables: {
		handle: string;
	};
};

export type ShopifyPagesOperation = {
	data: {
		pages: Connection<ShopifyPage>;
	};
};

export type ShopifyPopularProductsOperation = {
	data: {
		collection: {
			products: Connection<ShopifyProduct>;
		};
	};
};

export type ShopifyProductOperation = {
	data: {
		product?: ShopifyProduct;
	};
	variables: {
		handle: string;
	};
};

export type ShopifyProductRecommendationsOperation = {
	data: {
		productRecommendations: ShopifyProduct[];
	};
	variables: {
		productId: string;
	};
};

export type ShopifyProductsOperation = {
	data: {
		products: Connection<ShopifyProduct> & { pageInfo: ShopifyPageInfo };
	};
	variables: {
		query?: string;
		reverse?: boolean;
		sortKey?: string;
		first?: number;
		after?: string;
	};
};

export type ShopifyVariantsInventoryQueryOperation = {
	data: {
		product: {
			variants: Connection<ShopifyVariantInventory>;
		} | null;
	};
	variables: {
		productId: string;
	};
};

export type ShopifyDiscountsQueryOperation = {
	data: {
		discountNodes: Connection<DiscountNode>;
	};
};

export type ShopifyRemoveFromCartOperation = {
	data: {
		cartLinesRemove: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lineIds: string[];
	};
};

export type ShopifyUpdateCartOperation = {
	data: {
		cartLinesUpdate: {
			cart: ShopifyCart;
		};
	};
	variables: {
		cartId: string;
		lines: {
			id: string;
			merchandiseId: string;
			quantity: number;
		}[];
	};
};
