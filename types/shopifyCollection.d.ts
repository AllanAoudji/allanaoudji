import SEO from "./seo";
import shopifyImage from "./shopifyImage";

type ShopifyCollection = {
	handle: string;
	title: string;
	description: string;
	seo: SEO;
	updatedAt: string;
	image: shopifyImage | null;
	productsCount: {
		count: number;
	};
};

export default ShopifyCollection;
