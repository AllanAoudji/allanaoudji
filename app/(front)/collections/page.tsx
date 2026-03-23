import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ProductsShopSection from "@/components/ProductsShopSection";
import ProductsShopSectionLoader from "@/components/ProductsShopSectionLoader";
import SectionError from "@/components/SectionError";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<ProductsShopSectionLoader />}>
				<ProductsShopSection searchParams={currSearchParams} />
			</Suspense>
		</ErrorBoundary>
	);
}
