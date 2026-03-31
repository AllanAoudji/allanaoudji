import { cn } from "@/lib/utils";
import ProductsHomeSectionContainer from "./ProductsHomeSectionContainer";
import SkeletonImage from "./SkeletonImage";

type Props = {
	className?: string;
};

export default function SkeletonProductsHome({ className }: Readonly<Props>) {
	return (
		<ProductsHomeSectionContainer className={cn("bg-secondary text-primary", className)}>
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
			<SkeletonImage ratio="3/4" />
		</ProductsHomeSectionContainer>
	);
}
