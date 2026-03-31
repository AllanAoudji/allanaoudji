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
import ShopDisabled from "@/components/ShopDisabled";
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

	const { description, featuredImage, title } = product;
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;
	const variantUrl = `${url}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;

	const generateFeatureImage = (featuredImage: shopifyImage | undefined) => {
		if (!featuredImage) return [];
		return [
			{
				alt: featuredImage.altText ?? title,
				url: featuredImage.url,
				height: featuredImage.height,
				width: featuredImage.width,
			},
		];
	};

	return {
		alternates: {
			canonical: variantUrl,
		},
		description,
		openGraph: {
			description,
			images: generateFeatureImage(featuredImage),
			title,
			type: "website",
			url,
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
			images: featuredImage ? [featuredImage.url] : [],
			title,
		},
	};
}

export default async function ProductSinglePage({ params }: Readonly<Props>) {
	const { handle } = await params;
	const product = await getProductCached(handle);

	if (!product) {
		notFound();
	}

	const variantsInventory = await getProductVariantsInventory(product.id);

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
