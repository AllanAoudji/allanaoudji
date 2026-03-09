import Link from "next/link";
import { cn, getProductDefaultVariant } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import Product from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductLink({ className, product }: Readonly<Props>) {
	const hasSecondImage = product.images.length > 2;

	return (
		<Link
			className={cn("group", className)}
			href={`/products/${product.handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`}
		>
			<div
				className={cn("relative mb-1.5", {
					"bg-gray-300": !product.availableForSale,
				})}
			>
				<ImageContainer
					className={cn({
						"opacity-50": !product.availableForSale,
						"group-hover:opacity-0": hasSecondImage,
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
				{hasSecondImage && (
					<ImageContainer
						className={cn("absolute top-0 -z-10", {
							"opacity-50": !product.availableForSale,
						})}
						image={{
							alt: product.images[1].altText || product.title,
							url: product.images[1].url,
							width: product.images[1].width,
							height: product.images[1].height,
							lqip: null,
						}}
						priority={true}
						ratio="3/4"
					/>
				)}

				{!product.availableForSale && (
					<div className="text-primary absolute inset-x-0 bottom-0 bg-red-500 px-1 py-2 text-center text-sm uppercase">
						<p className="font-bold tracking-widest">out of stock</p>
					</div>
				)}
			</div>
			<div className="flex justify-between text-xs font-bold">
				<h3
					className={cn(
						"overflow-hidden text-ellipsis whitespace-nowrap uppercase",
						"relative",
						"group-hover:after:origin-left group-hover:after:scale-x-100",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					{product.title}
				</h3>
				<ProductPrice className="pl-4 text-right" price={product.priceRange.maxVariantPrice} />
			</div>
		</Link>
	);
}
