"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import { useModal } from "@/lib/contexts/modal-context";
import ProductLink from "./ProductLink";
import SubTitle from "./SubTitle";

export default function CartEmptyPopularProducts() {
	const { popularProducts } = useLocalShopify();
	const { closeModal } = useModal();

	if (!popularProducts.length) return null;

	return (
		<div>
			<SubTitle>Produits populaires</SubTitle>
			<div className="grid grid-cols-2 gap-4">
				{popularProducts.map(product => (
					<ProductLink key={product.handle} onClick={closeModal} product={product} />
				))}
			</div>
		</div>
	);
}
