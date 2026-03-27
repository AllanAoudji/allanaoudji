import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";
import SkeletonImage from "./SkeletonImage";

export default function SkeletonProductsHome() {
	return (
		<ProductsHomeSectionContainer className="bg-secondary text-primary">
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
		</ProductsHomeSectionContainer>
	);
}
