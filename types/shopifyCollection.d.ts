import shopifyImage from "./shopifyImage";

type ShopifyCollection = {
	handle: string;
	title: string;
	description: string;
	seo: SEO;
	updatedAt: string;
	image: shopifyImage | null;
};

export default ShopifyCollection;
