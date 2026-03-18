import Money from "./money";
import shopifyImage from "./shopifyImage";

type ProductVariant = {
	id: string;
	title: string;
	availableForSale: boolean;
	image?: shopifyImage;
	selectedOptions: {
		name: string;
		value: string;
	}[];
	price: Money;
};

export default ProductVariant;
