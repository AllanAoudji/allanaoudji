import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ProductsShopSection from "@/components/ProductsShopSection";
import ProductsShopSectionLoader from "@/components/ProductsShopSectionLoader";
import SectionError from "@/components/SectionError";

type Props = {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Readonly<Props>) {
	const { handle } = await params;
	const currSearchParams = await searchParams;

	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<ProductsShopSectionLoader />}>
				<ProductsShopSection searchParams={currSearchParams} handle={handle} />
			</Suspense>
		</ErrorBoundary>
	);
}
