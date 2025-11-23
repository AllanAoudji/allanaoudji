import Money from "./money";
import ProductOption from "./productOption";
import ProductVariant from "./productVariant";
import SEO from "./seo";
import shopifyImage from "./shopifyImage";

type ShopifyProduct = {
	id: string;
	handle: string;
	availableForSale: boolean;
	title: string;
	description: string;
	descriptionHtml?: string;
	options: ProductOption[];
	priceRange: {
		maxVariantPrice: Money;
		minVariantPrice: Money;
	};
	variants: Connection<ProductVariant>;
	featuredImage: shopifyImage;
	images: Connection<shopifyImage>;
	seo: SEO;
	tags: string[];
	updatedAt: string;
};

export default ShopifyProduct;
