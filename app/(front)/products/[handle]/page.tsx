import { redirect } from "next/navigation";
import { getDiscount, getProduct, getProductVariantsInventory } from "@/lib/shopify";
import { isShopifyError } from "@/lib/type-guards";
import ProductCart from "@/components/ProductCart";
import ProductDescription from "@/components/ProductDescription";
import ProductGallery from "@/components/ProductGallery";
import ProductPrice from "@/components/ProductPrice";
import ProductRelated from "@/components/ProductRelated";
import Title from "@/components/Title";
import VariantInventory from "@/types/VariantInventory";
import Product from "@/types/product";
import { DiscountNode } from "@/types/shopifyDiscount";

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
	let discountNode: DiscountNode[];

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

	try {
		discountNode = await getDiscount();
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

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
