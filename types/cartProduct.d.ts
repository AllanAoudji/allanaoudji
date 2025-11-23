import { shopifyImage } from "./shopifyImage";

type CartProduct = {
	id: string;
	handle: string;
	title: string;
	featuredImage: shopifyImage;
};

export default CartProduct;
