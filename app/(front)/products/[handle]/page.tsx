import { redirect } from "next/navigation";
import { ProductProvider } from "@/lib/contexts/product-context";
import { getProduct } from "@/lib/shopify";
import { isShopifyError } from "@/lib/type-guards";
import Grid from "@/components/Grid";
import ProductGallery from "@/components/ProductGallery";
import ProductPrice from "@/components/ProductPrice";
import ProductVariantSelector from "@/components/ProductVariantSelector";
import Title from "@/components/Title";
import { Product } from "@/types/product";

type Props = {
	params: Promise<{ handle: string }>;
};

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
					{/* {!!product.descriptionHtml && <Prose html={product.descriptionHtml} />} */}
					<ProductVariantSelector variants={product.variants} options={product.options} />
					<ProductPrice price={product.priceRange.maxVariantPrice} />
					{/* <AddToCard product={product} /> */}
				</div>
			</Grid>
		</ProductProvider>
	);
}
