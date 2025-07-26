import { Connection } from "./connection";
import { ShopifyProduct } from "./shopifyProduct";

type ShopifyCollectionProductsOperation = {
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
