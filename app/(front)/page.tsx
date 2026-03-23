import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import BannerSection from "@/components/BannerSection";
import ContactSection from "@/components/ContactSection";
import ContactSectionLoader from "@/components/ContactSectionLoader";
import InstagramSection from "@/components/InstagramSection";
import InstagramSectionLoader from "@/components/InstagramSectionLoader";
import NullError from "@/components/NullError";
import ProductsHomeSection from "@/components/ProductsHomeSection";
import ProductsHomeSectionLoader from "@/components/ProductsHomeSectionLoader";
import WorksHomeSection from "@/components/WorksHomeSection";
import WorksHomeSectionLoader from "@/components/WorksHomeSectionLoader";
import { getBanner } from "@/sanity/lib/queries";

export default async function Home() {
	const bannerPromise = getBanner();

	return (
		<>
			<BannerSection bannerPromise={bannerPromise} />
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<ProductsHomeSectionLoader />}>
					<ProductsHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<WorksHomeSectionLoader />}>
					<WorksHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<InstagramSectionLoader />}>
					<InstagramSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<ContactSectionLoader />}>
					<ContactSection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
