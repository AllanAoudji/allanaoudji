import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import GeneralConditionsOfSaleContainer from "@/components/GeneralConditionsOfSaleContainer";
import SectionError from "@/components/SectionError";
import SkeletonLegalPortableText from "@/components/SkeletonLegalPortableText";

export default function GeneralConditionsOfSale() {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonLegalPortableText />}>
				<GeneralConditionsOfSaleContainer />
			</Suspense>
		</ErrorBoundary>
	);
}
