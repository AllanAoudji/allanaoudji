import ProductVariant from "./productVariant";
import shopifyImage from "./shopifyImage";
import ShopifyProduct from "./shopifyProduct";

type Product = Omit<ShopifyProduct, "variants" | "images" | "collections"> & {
	variants: ProductVariant[];
	images: shopifyImage[];
	collections: { id: string; title: string }[];
};

export default Product;
