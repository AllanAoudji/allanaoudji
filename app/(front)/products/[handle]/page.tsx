import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { ProductProvider } from "@/lib/contexts/product-context";
import { getProduct } from "@/lib/shopify";
import { isShopifyError } from "@/lib/type-guards";
import Grid from "@/components/Grid";
import ProductAddToCart from "@/components/ProductAddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductPrice from "@/components/ProductPrice";
import ProductRelated from "@/components/ProductRelated";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import Prose from "@/components/Prose";
import Title from "@/components/Title";
import Product from "@/types/product";

type MetadataProps = {
	params: {
		handle: string;
	};
};
type Props = {
	params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
	const product = await getProduct(params.handle);

	if (!product) {
		return notFound();
	}

	const { height, url, width, altText: alt } = product.featuredImage || {};
	const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
	const openGraph = {
		images: [
			{
				url,
				width,
				height,
				alt,
			},
		],
	};

	return {
		title: product.seo.title || product.title,
		description: product.seo.description || product.description,
		robots: {
			index: indexable,
			follow: indexable,
			googleBot: {
				index: indexable,
				follow: indexable,
			},
		},
		openGraph: url ? openGraph : null,
	};
}

export default async function Page({ params }: Readonly<Props>) {
	let product: Product | undefined;

	try {
		const { handle } = await params;
		product = await getProduct(handle);
	} catch (error) {
		if (error instanceof Error || isShopifyError(error)) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!product) {
		redirect("/collections");
	}

	return (
		<ProductProvider>
			<Title>{product.title}</Title>
			<Grid tag="section" className="section-container" type="small">
				<ProductGallery className="col-span-3" images={product.images} />
				<div className="col-span-2">
					{!!product.descriptionHtml && <Prose className="pb-4" html={product.descriptionHtml} />}
					<ProductVariantSelector variants={product.variants} options={product.options} />
					<ProductPrice price={product.priceRange.maxVariantPrice} />
					<ProductAddToCart product={product} />
					<ProductRelated id={product.id} />
				</div>
			</Grid>
		</ProductProvider>
	);
}
