import Connection from "./connection";
import ShopifyColelction from "./shopifyCollection";

type ShopifyCollectionsOperation = {
	data: {
		collections: Connection<ShopifyColelction>;
	};
};

export default ShopifyCollectionsOperation;
