import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import LegalNoticesContainer from "@/components/LegalNoticesContainer";
import SectionError from "@/components/SectionError";
import SkeletonLegalPortableText from "@/components/SkeletonLegalPortableText";

export default function LegalNotices() {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonLegalPortableText />}>
				<LegalNoticesContainer />
			</Suspense>
		</ErrorBoundary>
	);
}
