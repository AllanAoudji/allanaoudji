import { Money } from "./money";
import { ProductOption } from "./productOption";
import { ProductVariant } from "./productVariant";
import { SEO } from "./seo";
import { shopifyImage } from "./shopifyImage";

export type ShopifyProduct = {
	id: string;
	handle: string;
	title: string;
	description: string;
	descriptionHtml: string;
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
