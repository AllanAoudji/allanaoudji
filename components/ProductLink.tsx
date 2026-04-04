import Link from "next/link";
import { MouseEventHandler } from "react";
import { cn, getProductDefaultVariant } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import Product from "@/types/product";

type Props = {
	className?: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	product: Product;
};

export default function ProductLink({ className, onClick, product }: Readonly<Props>) {
	const hasSecondImage = product.images.length > 1;

	return (
		<Link
			className={cn("group", className)}
			href={`/products/${product.handle}${getProductDefaultVariant(product) ? `?${getProductDefaultVariant(product)}` : ""}`}
			onClick={onClick}
		>
			<div
				className={cn("relative mb-0.5", {
					"bg-gray-300": !product.availableForSale,
				})}
			>
				<ImageContainer image={product.featuredImage} priority={true} ratio="3/4" />
				{hasSecondImage && (
					<ImageContainer
						className="absolute top-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						image={product.images[1]}
						ratio="3/4"
					/>
				)}
				{!product.availableForSale && (
					<div className="text-primary absolute inset-x-0 bottom-0 z-20 bg-red-500 px-1 py-2 text-center text-sm uppercase">
						<p className="font-bold tracking-widest">out of stock</p>
					</div>
				)}
			</div>
			<div className="truncate">
				<h3
					className={cn(
						"inline overflow-hidden text-xs font-bold whitespace-nowrap uppercase",
						"relative",
						"group-hover:after:origin-left group-hover:after:scale-x-100",
						"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					{product.title}
				</h3>
			</div>
			<ProductPrice size="xs" product={product} />
		</Link>
	);
}
