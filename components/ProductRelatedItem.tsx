import Link from "next/link";
import ImageContainer from "./ImageContainer";
import Product from "@/types/product";

type Props = {
	product: Product;
};

export default function ProductRelatedItem({ product }: Readonly<Props>) {
	return (
		<li>
			<Link className="block" href={`/products/${product.handle}`}>
				<ImageContainer
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
			</Link>
		</li>
	);
}
