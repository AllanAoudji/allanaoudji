type ShopifyVariantInventory = {
	id: string;
	title: string;
	sku: string | null;
	inventoryQuantity: number;
	inventoryItem: {
		tracked: boolean;
	};
};

export default ShopifyVariantInventory;
