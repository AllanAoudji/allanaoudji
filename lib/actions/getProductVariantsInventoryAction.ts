"use server";

import { getProductVariantsInventory } from "../shopify/utils/shopifyAdminFetch";

export async function getProductVariantsInventoryAction(productId: string) {
	return getProductVariantsInventory(productId);
}
