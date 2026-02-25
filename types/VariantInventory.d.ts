type VariantInventory = {
	variantId: string;
	variantTitle: string;
	sku: string | null;
	inventoryQuantity: number;
	inventoryTracked: boolean;
};

export default VariantInventory;
