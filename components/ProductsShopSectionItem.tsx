import Link from "next/link";
import { cn } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import ProductPrice from "./ProductPrice";
import { Product } from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductsShopSectionItem({ className, product }: Readonly<Props>) {
	return (
		<Link className={cn(className)} href={`/products/${product.handle}`}>
			<h3 className="font-bold">{product.title}</h3>
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
			/>
			<ProductPrice price={product.priceRange.maxVariantPrice} className="text-right font-light" />
		</Link>
	);
}
