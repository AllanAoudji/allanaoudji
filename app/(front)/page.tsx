import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import BannerSection from "@/components/BannerSection";
import ContactSection from "@/components/ContactSection";
import InstagramSection from "@/components/InstagramSection";
import NullError from "@/components/NullError";
import ProductsHomeSection from "@/components/ProductsHomeSection";
import SkeletonContactHome from "@/components/SkeletonContactHome";
import SkeletonInstagram from "@/components/SkeletonInstagram";
import SkeletonProductsHome from "@/components/SkeletonProductsHome";
import SkeletonWorksHome from "@/components/SkeletonWorksHome";
import WorksHomeSection from "@/components/WorksHomeSection";
import { getBanner } from "@/sanity/lib/queries";

export default async function Home() {
	const bannerPromise = getBanner();

	return (
		<>
			<BannerSection bannerPromise={bannerPromise} />
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonProductsHome />}>
					<ProductsHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonWorksHome />}>
					<WorksHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonInstagram />}>
					<InstagramSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonContactHome />}>
					<ContactSection />
				</Suspense>
			</ErrorBoundary>
		</>
	);
}
