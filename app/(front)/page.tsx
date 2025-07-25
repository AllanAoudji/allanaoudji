import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";
import ContactSectionLoader from "@/components/ContactSectionLoader";
import InstagramSection from "@/components/InstagramSection";
import InstagramSectionLoader from "@/components/InstagramSectionLoader";
import ProductsHomeSection from "@/components/ProductsHomeSection";
import ProductsHomeSectionLoader from "@/components/ProductsHomeSectionLoader";
import WorksHomeSection from "@/components/WorksHomeSection";
import WorksHomeSectionLoader from "@/components/WorksHomeSectionLoader";
import Error from "./error";

export default function Home() {
	return (
		<>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<ProductsHomeSectionLoader />}>
					<ProductsHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<WorksHomeSectionLoader />}>
					<WorksHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<InstagramSectionLoader />}>
					<InstagramSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<ContactSectionLoader />}>
					<ContactSection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
