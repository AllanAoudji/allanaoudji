import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { getProduct, getProductVariantsInventory } from "@/lib/shopify";
import { getProductDefaultVariant } from "@/lib/utils";
import ProductPrice from "@/components/ProductPrice";
import ProductSingleBuyControls from "@/components/ProductSingleBuyControls";
import ProductSingleDescription from "@/components/ProductSingleDescription";
import ProductSingleGallery from "@/components/ProductSingleGallery";
import ProductSingleRelated from "@/components/ProductSingleRelated";
import Title from "@/components/Title";
import shopifyImage from "@/types/shopifyImage";

type Props = {
	params: Promise<{ handle: string }>;
};

const getProductCached = cache(getProduct);

export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
	const { handle } = await params;
	const product = await getProductCached(handle);

	if (!product) return {};

	const { title, description, featuredImage } = product;
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;
	const variantUrl = `${url}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;

	const generateFeatureImage = (featuredImage: shopifyImage | undefined) => {
		if (!featuredImage) return [];
		return [
			{
				url: featuredImage.url,
				width: featuredImage.width,
				height: featuredImage.height,
				alt: featuredImage.altText ?? title,
			},
		];
	};

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			url,
			type: "website",
			images: generateFeatureImage(featuredImage),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: featuredImage ? [featuredImage.url] : [],
		},
		alternates: {
			canonical: variantUrl,
		},
	};
}

export default async function ProductSinglePage({ params }: Readonly<Props>) {
	const { handle } = await params;

	const product = await getProductCached(handle);

	if (!product) {
		notFound();
	}

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: product.title,
		description: product.description,
		image: product.featuredImage?.url,
		offers: {
			"@type": "Offer",
			price: product.priceRange.minVariantPrice.amount,
			priceCurrency: product.priceRange.minVariantPrice.currencyCode,
			availability: product.availableForSale
				? "https://schema.org/InStock"
				: "https://schema.org/OutOfStock",
		},
	};

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
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
		</>
	);
}
