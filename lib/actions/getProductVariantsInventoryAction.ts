"use server";

import { getProductVariantsInventory } from "../shopify/utils/shopifyAdminFetch";
import * as Sentry from "@sentry/nextjs";

export async function getProductVariantsInventoryAction(productId: string) {
	try {
		return await getProductVariantsInventory(productId);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "getProductVariantsInventoryAction", productId },
		});
		return [];
	}
}
