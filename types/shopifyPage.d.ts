import SEO from "./seo";

type ShopifyPage = {
	id: string;
	title: string;
	handle: string;
	body: string;
	bodySummary: string;
	sea?: SEO;
	createdAt: string;
	updatedAt: string;
};
