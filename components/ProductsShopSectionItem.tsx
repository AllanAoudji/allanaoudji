import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductsShopSectionItem({ className, product }: Readonly<Props>) {
	return (
		<Link className={cn(className)} href={`/products/${product.handle}`}>
			<h3 className="font-bold">{product.title}</h3>
			<div
				className={cn("relative", {
					"border-4 border-red-500 bg-red-500": !product.availableForSale,
				})}
			>
				<ImageContainer
					image={{
						alt: product.featuredImage.altText || product.title,
						url: product.featuredImage.url,
						width: product.featuredImage.width,
						height: product.featuredImage.height,
						lqip: null,
					}}
					priority={true}
					ratio="4/3"
					className={cn({
						"opacity-50": !product.availableForSale,
					})}
				/>
				{!product.availableForSale && (
					<div className="bg-primary absolute top-1/2 left-1/2 w-3/4 -translate-x-1/2 -translate-y-1/2 transform border-4 px-2 py-3 text-center text-red-500 uppercase">
						<p className="text-xl font-bold tracking-wide">out of stock</p>
					</div>
				)}
			</div>
			<ProductPrice price={product.priceRange.maxVariantPrice} className="text-right font-light" />
		</Link>
	);
}
