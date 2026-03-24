import { notFound } from "next/navigation";
import { getProduct, getProductVariantsInventory } from "@/lib/shopify";
import ProductPrice from "@/components/ProductPrice";
import ProductSingleBuyControls from "@/components/ProductSingleBuyControls";
import ProductSingleDescription from "@/components/ProductSingleDescription";
import ProductSingleGallery from "@/components/ProductSingleGallery";
import ProductSingleRelated from "@/components/ProductSingleRelated";
import Title from "@/components/Title";

type Props = {
	params: Promise<{ handle: string }>;
};

export default async function ProductSinglePage({ params }: Readonly<Props>) {
	const { handle } = await params;

	const product = await getProduct(handle);

	if (!product) {
		notFound();
	}

	const variantsInventory = await getProductVariantsInventory(product.id);

	return (
		<>
			<section className="grid grid-cols-6 gap-8 md:gap-4">
				<ProductSingleGallery
					className="col-span-6 self-start md:sticky md:top-[calc(var(--spacing-header)+1rem)] md:col-span-3 lg:col-span-4"
					product={product}
				/>
				<div className="col-span-6 self-start md:sticky md:top-[calc(var(--spacing-header)+1rem)] md:col-span-3 lg:col-span-2">
					<Title className="mb-0">{product.title}</Title>
					<ProductPrice product={product} />
					{!!product.descriptionHtml && (
						<ProductSingleDescription className="mt-10" html={product.descriptionHtml} />
					)}
					<ProductSingleBuyControls product={product} variantsInventory={variantsInventory} />
				</div>
			</section>
			<ProductSingleRelated id={product.id} />
		</>
	);
}
