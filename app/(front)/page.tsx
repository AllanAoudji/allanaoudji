import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import BannerContainer from "@/components/BannerContainer";
import ContactSection from "@/components/ContactSection";
import GalleryHomeSection from "@/components/GalleryHomeSection";
import InstagramSection from "@/components/InstagramSection";
import NullError from "@/components/NullError";
import ProductsHomeSection from "@/components/ProductsHomeSection";
import SkeletonContactHome from "@/components/SkeletonContactHome";
import SkeletonInstagram from "@/components/SkeletonInstagram";
import SkeletonProductsHome from "@/components/SkeletonProductsHome";
import SkeletonWorksHome from "@/components/SkeletonWorksHome";
import { getBanner } from "@/sanity/lib/queries";

export default async function RootPage() {
	const bannerPromise = getBanner();

	return (
		<>
			<BannerContainer bannerPromise={bannerPromise} />
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonProductsHome />}>
					<ProductsHomeSection />
				</Suspense>
			</ErrorBoundary>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={<SkeletonWorksHome />}>
					<GalleryHomeSection />
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
