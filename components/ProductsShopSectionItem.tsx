import Link from "next/link";
import { cn, getProductDefaultVariant } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductsShopSectionItem({ className, product }: Readonly<Props>) {
	return (
		<Link
			className={cn(className)}
			href={`/products/${product.handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`}
		>
			<div
				className={cn("relative mb-1", {
					"bg-gray-300": !product.availableForSale,
				})}
			>
				<ImageContainer
					className={cn({
						"opacity-50": !product.availableForSale,
					})}
					image={{
						alt: product.featuredImage.altText || product.title,
						url: product.featuredImage.url,
						width: product.featuredImage.width,
						height: product.featuredImage.height,
						lqip: null,
					}}
					priority={true}
					ratio="3/4"
				/>

				{!product.availableForSale && (
					<div className="text-primary absolute inset-x-0 bottom-0 bg-red-500 px-1 py-2 text-center text-sm uppercase">
						<p className="font-bold tracking-widest">out of stock</p>
					</div>
				)}
			</div>
			<div className="flex justify-between text-sm">
				<h3 className="w-full overflow-hidden font-bold text-ellipsis whitespace-nowrap">
					{product.title}
				</h3>
				<ProductPrice className="text-right font-light" price={product.priceRange.maxVariantPrice} />
			</div>
		</Link>
	);
}
