import ShopifyProduct from "./shopifyProduct";

type ShopifyProductRecommendationsOperation = {
	data: {
		productRecommendations: ShopifyProduct[];
	};
	variables: {
		productId: string;
	};
};

export default ShopifyProductRecommendationsOperation;
