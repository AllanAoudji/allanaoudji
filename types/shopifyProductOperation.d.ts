import { Connection } from "./connection";
import { ShopifyProduct } from "./shopifyProduct";

export type ShopifyProductOperation = {
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
