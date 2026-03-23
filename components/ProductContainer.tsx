import { notFound } from "next/navigation";
import { getDiscount, getProduct, getProductVariantsInventory } from "@/lib/shopify";
import ProductCart from "./ProductCart";
import ProductDescription from "./ProductDescription";
import ProductGallery from "./ProductGallery";
import ProductPrice from "./ProductPrice";
import ProductRelated from "./ProductRelated";
import Title from "./Title";

type Props = {
	handle: string;
};

export default async function ProductContainer({ handle }: Readonly<Props>) {
	const [product, discountNode] = await Promise.all([getProduct(handle), getDiscount()]);

	if (!product) {
		notFound();
	}

	const variantsInventory = await getProductVariantsInventory(product.id);

	return (
		<>
			<section className="grid grid-cols-6 gap-8 md:gap-4">
				<ProductGallery
					className="col-span-6 self-start md:sticky md:top-[calc(var(--spacing-header)+1rem)] md:col-span-3 lg:col-span-4"
					product={product}
				/>
				<div className="col-span-6 self-start md:sticky md:top-[calc(var(--spacing-header)+1rem)] md:col-span-3 lg:col-span-2">
					<Title className="mb-0">{product.title}</Title>
					<ProductPrice product={product} />
					{!!product.descriptionHtml && (
						<ProductDescription className="mt-10" html={product.descriptionHtml} />
					)}
					<ProductCart
						discountNode={discountNode}
						product={product}
						variantsInventory={variantsInventory}
					/>
				</div>
			</section>
			<ProductRelated id={product.id} />
		</>
	);
}
