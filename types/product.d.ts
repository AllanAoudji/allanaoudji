import { shopifyImage } from "./shopifyImage";
import { ShopifyProduct } from "./shopifyProduct";

export type Product = Omit<ShopifyProduct, "variants" | "images"> & {
	variants: ProductVariant[];
	images: shopifyImage[];
};
