import Link from "next/link";
import { convertCurrencyCode } from "@/lib/utils";
import ImageContainer from "./ImageContainer";
import { Product } from "@/types/product";

type Props = {
	className?: string;
	product: Product;
};

export default function ProductsShopSectionItem({ className, product }: Readonly<Props>) {
	return (
		<Link className={`${className}`} href={`/shop/${product.handle}`}>
			<h3 className="font-bold">{product.title}</h3>
			<ImageContainer
				image={{
					alt: product.featuredImage.altText || product.title,
					url: product.featuredImage.url,
					width: product.featuredImage.width,
					height: product.featuredImage.height,
					lqip: null,
				}}
				ratio="4/3"
			/>
			<p className="text-right font-light">
				{product.priceRange.maxVariantPrice.amount}{" "}
				{convertCurrencyCode(product.priceRange.maxVariantPrice.currencyCode)}
			</p>
		</Link>
	);
}
