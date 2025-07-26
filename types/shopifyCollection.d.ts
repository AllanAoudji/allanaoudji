import { shopifyImage } from "./shopifyImage";

type ShopifyColelction = {
	handle: string;
	title: string;
	description: string;
	seo: SEO;
	updatedAt: string;
	image: shopifyImage | null;
};

export default ShopifyColelction;
