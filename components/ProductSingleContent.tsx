import * as Sentry from "@sentry/nextjs";
import { notFound } from "next/navigation";
import { getCachedProduct } from "@/lib/shopify/utils/cached";
import { getProductVariantsInventory } from "@/lib/shopify/utils/shopifyAdminFetch";
import ProductPrice from "./ProductPrice";
import ProductSingleBuyControls from "./ProductSingleBuyControls";
import ProductSingleDescription from "./ProductSingleDescription";
import ProductSingleGallery from "./ProductSingleGallery";
import ProductSingleRelated from "./ProductSingleRelated";
import ShopDisabled from "./ShopDisabled";
import Title from "./Title";
import VariantInventory from "@/types/VariantInventory";

type Props = {
	handle: string;
};

export default async function ProductSingleContent({ handle }: Readonly<Props>) {
	const product = await getCachedProduct(handle);
	if (!product) {
		notFound();
	}
	let variantsInventory: VariantInventory[] = [];

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		description: product.description,
		image: product.featuredImage?.url,
		name: product.title,
		offers: {
			"@type": "Offer",
			availability: product.availableForSale
				? "https://schema.org/InStock"
				: "https://schema.org/OutOfStock",
			price: product.priceRange.minVariantPrice.amount,
			priceCurrency: product.priceRange.minVariantPrice.currencyCode,
		},
	};

	try {
		variantsInventory = await getProductVariantsInventory(product.id);
	} catch (error) {
		Sentry.captureException(error, {
			extra: { context: "BuyControls", productId: product.id },
		});
	}

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
					<ShopDisabled className="mt-2" />
					{!!product.descriptionHtml && (
						<ProductSingleDescription className="mt-10" html={product.descriptionHtml} />
					)}
					<ProductSingleBuyControls product={product} variantsInventory={variantsInventory} />
				</div>
			</section>
			<ProductSingleRelated id={product.id} />
			<script
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				type="application/ld+json"
			/>
		</>
	);
}
