import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import AboutContainer from "@/components/AboutContainer";
import SectionError from "@/components/SectionError";
import SkeletonPortableText from "@/components/SkeletonPortableText";

export default async function About() {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonPortableText />}>
				<AboutContainer />
			</Suspense>
		</ErrorBoundary>
	);
}
