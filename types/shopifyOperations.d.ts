import ShopifyCart from "./ShopifyCart";
import Connection from "./connection";
import ShopifyColelction from "./shopifyCollection";
import { ShopifyPage } from "./shopifyPage";
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
			products: Connection<ShopifyProduct>;
		};
	};
	variables: {
		handle: string;
		reverse?: boolean;
		sortKey?: string;
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

export type ShopifyProductOperation = {
	data: {
		product: ShopifyProduct;
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
		products: Connection<ShopifyProduct>;
	};
	variables: {
		query?: string;
		reverse?: boolean;
		sortKey?: string;
		first?: number;
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
