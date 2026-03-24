import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import PrivacyPolicyContainer from "@/components/PrivacyPolicyContainer";
import SectionError from "@/components/SectionError";
import SkeletonLegalPortableText from "@/components/SkeletonLegalPortableText";

export default async function PrivacyPolicy() {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonLegalPortableText />}>
				<PrivacyPolicyContainer />
			</Suspense>
		</ErrorBoundary>
	);
}
