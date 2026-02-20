import { redirect } from "next/navigation";
import { getProduct } from "@/lib/shopify";
import { isShopifyError } from "@/lib/type-guards";
import Grid from "@/components/Grid";
import ProductAddToCart from "@/components/ProductAddToCart";
import ProductGallery from "@/components/ProductGallery";
import ProductPrice from "@/components/ProductPrice";
import ProductQuantityButton from "@/components/ProductQuantityButton";
import ProductRelated from "@/components/ProductRelated";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import Prose from "@/components/Prose";
import Title from "@/components/Title";
import Product from "@/types/product";

// type MetadataProps = {
// 	params: {
// 		handle: string;
// 	};
// };
type Props = {
	params: Promise<{ handle: string }>;
};

// export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
// 	const product = await getProduct(params.handle);

// 	if (!product) {
// 		return notFound();
// 	}

// 	const { height, url, width, altText: alt } = product.featuredImage || {};
// 	const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
// 	const openGraph = {
// 		images: [
// 			{
// 				url,
// 				width,
// 				height,
// 				alt,
// 			},
// 		],
// 	};

// 	return {
// 		title: product.seo.title || product.title,
// 		description: product.seo.description || product.description,
// 		robots: {
// 			index: indexable,
// 			follow: indexable,
// 			googleBot: {
// 				index: indexable,
// 				follow: indexable,
// 			},
// 		},
// 		openGraph: url ? openGraph : null,
// 	};
// }

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
		<>
			<Title>{product.title}</Title>
			<Grid tag="section" className="section-container" type="small">
				<ProductGallery className="col-span-2 mb-8 lg:col-span-3 lg:mb-0" images={product.images} />
				<div className="col-span-2">
					{!!product.descriptionHtml && (
						<Prose className="pb-8 lg:pb-16" html={product.descriptionHtml} />
					)}
					<ProductVariantSelector
						className="pb-8 lg:pb-16"
						variants={product.variants}
						options={product.options}
					/>
					<ProductPrice className="mb-8" price={product.priceRange.maxVariantPrice} />
					<ProductQuantityButton />
					<ProductAddToCart product={product} />
				</div>
			</Grid>
			<ProductRelated id={product.id} />
		</>
	);
}
