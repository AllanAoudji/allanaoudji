import { ProductVariant } from "./productVariant";
import { shopifyImage } from "./shopifyImage";
import ShopifyProduct from "./shopifyProduct";

type Product = Omit<ShopifyProduct, "variants" | "images"> & {
	variants: ProductVariant[];
	images: shopifyImage[];
};

export default Product;
