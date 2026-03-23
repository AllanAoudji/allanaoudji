import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ProductContainer from "@/components/ProductContainer";
import SectionError from "@/components/SectionError";
import SuspenseProduct from "@/components/SuspenseProduct";

type Props = {
	params: Promise<{ handle: string }>;
};

export default async function Page({ params }: Readonly<Props>) {
	const { handle } = await params;

	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SuspenseProduct />}>
				<ProductContainer handle={handle} />
			</Suspense>
		</ErrorBoundary>
	);
}
