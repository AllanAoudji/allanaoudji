import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import AboutContainer from "@/components/AboutContainer";
import SectionError from "@/components/SectionError";
import SuspenseSanityPage from "@/components/SuspenseSanityPage";

export default async function About() {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SuspenseSanityPage />}>
				<AboutContainer />
			</Suspense>
		</ErrorBoundary>
	);
}
