import { Image } from "./image";
import { Money } from "./money";
import { ProductOption } from "./productOption";
import { ProductVariant } from "./productVariant";
import { SEO } from "./seo";

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
	featuredImage: Image;
	images: Connection<Image>;
	seo: SEO;
	tags: string[];
	updatedAt: string;
};
