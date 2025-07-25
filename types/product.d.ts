import { ShopifyProduct } from "./shopifyProduct";

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
	variants: ProductVariant[];
	images: Image[];
};
