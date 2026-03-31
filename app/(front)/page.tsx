import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import BannerContainer from "@/components/BannerContainer";
import ContactHomeSection from "@/components/ContactHomeSection";
import GalleryHomeSection from "@/components/GalleryHomeSection";
import HomeSections from "@/components/HomeSections";
import InstagramSection from "@/components/InstagramSection";
import NullError from "@/components/NullError";
import ProductsHomeSection from "@/components/ProductsHomeSection";
import SkeletonInstagram from "@/components/SkeletonInstagram";
import SkeletonProductsHome from "@/components/SkeletonProductsHome";
import SkeletonWorksHome from "@/components/SkeletonWorksHome";
import { getBanner } from "@/studio/lib/queries";

export default function RootPage() {
	const bannerPromise = getBanner();
	return (
		<>
			<ErrorBoundary errorComponent={NullError}>
				<Suspense fallback={null}>
					<BannerContainer bannerPromise={bannerPromise} />
				</Suspense>
			</ErrorBoundary>
			<HomeSections>
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
				<ContactHomeSection />
			</HomeSections>
		</>
	);
}
