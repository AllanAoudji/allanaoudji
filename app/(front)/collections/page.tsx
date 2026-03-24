import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ProductsShopSection from "@/components/ProductsShopSection";
import SectionError from "@/components/SectionError";
import SkeletonProductsCollection from "@/components/SkeletonProductsCollection";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonProductsCollection />}>
				<ProductsShopSection searchParams={currSearchParams} />
			</Suspense>
		</ErrorBoundary>
	);
}
