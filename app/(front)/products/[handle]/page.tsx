import { redirect } from "next/navigation";
import { getProduct, getProductVariantsInventory } from "@/lib/shopify";
import { isShopifyError } from "@/lib/type-guards";
import Grid from "@/components/Grid";
import ProductCart from "@/components/ProductCart";
import ProductGallery from "@/components/ProductGallery";
import ProductRelated from "@/components/ProductRelated";
import Prose from "@/components/Prose";
import Title from "@/components/Title";
import VariantInventory from "@/types/VariantInventory";
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
	let variantsInventory: VariantInventory[];

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

	try {
		variantsInventory = await getProductVariantsInventory(product.id);
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	return (
		<>
			<Title>{product.title}</Title>
			<Grid className="vertical-padding" tag="section" type="small">
				<ProductGallery className="col-span-2 mb-8 lg:col-span-3 lg:mb-0" images={product.images} />
				<div className="col-span-2">
					{!!product.descriptionHtml && (
						<Prose className="pb-8 lg:pb-16" html={product.descriptionHtml} />
					)}
					<ProductCart product={product} variantsInventory={variantsInventory} />
				</div>
			</Grid>
			<ProductRelated id={product.id} />
		</>
	);
}
