import { Connection } from "./connection";
import { ShopifyProduct } from "./shopifyProduct";

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
