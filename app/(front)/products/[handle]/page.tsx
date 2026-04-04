import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";
import { getProduct, getProducts } from "@/lib/shopify";
import { getProductDefaultVariant } from "@/lib/utils";
import ProductPrice from "@/components/ProductPrice";
import ProductSingleBuyControlsWrapper from "@/components/ProductSingleBuyControlsWrapper";
import ProductSingleDescription from "@/components/ProductSingleDescription";
import ProductSingleGallery from "@/components/ProductSingleGallery";
import ProductSingleRelated from "@/components/ProductSingleRelated";
import ShopDisabled from "@/components/ShopDisabled";
import SkeletonProductSingleBuyControlsWrapper from "@/components/SkeletonProductSingleBuyControlsWrapper";
import Title from "@/components/Title";

type Props = {
	params: Promise<{ handle: string }>;
};

export const dynamicParams = true;

const getProductCached = cache(getProduct);

export async function generateStaticParams() {
	const handles: { handle: string }[] = [];
	let after: string | undefined = undefined;
	let hasNextPage = true;

	while (hasNextPage) {
		const { products, pageInfo } = await getProducts({ first: 100, after });
		products.forEach(p => handles.push({ handle: p.handle }));
		hasNextPage = pageInfo.hasNextPage;
		after = pageInfo.endCursor ?? undefined;
	}

	return handles;
}

export async function generateMetadata({ params }: Readonly<Props>): Promise<Metadata> {
	const { handle } = await params;
	const product = await getProductCached(handle);

	if (!product) return {};

	const { description, title } = product;
	const url = `${process.env.NEXT_PUBLIC_SITE_URL}/products/${handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;
	const variantUrl = `${url}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`;

	return {
		alternates: {
			canonical: variantUrl,
		},
		description,
		openGraph: {
			description,
			title,
			type: "website",
			url,
		},
		title,
		twitter: {
			card: "summary_large_image",
			description,
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
					<Suspense fallback={<SkeletonProductSingleBuyControlsWrapper />}>
						<ProductSingleBuyControlsWrapper product={product} />
					</Suspense>
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
