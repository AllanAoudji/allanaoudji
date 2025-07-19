import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";
import ContactSectionLoader from "@/components/ContactSectionLoader";
import InstagramSection from "@/components/InstagramSection";
import InstagramSectionLoader from "@/components/InstagramSectionLoader";
import ShopSection from "@/components/ShopSection";
import WorksHomeSection from "@/components/WorksHomeSection";
import WorksHomeSectionLoader from "@/components/WorksHomeSectionLoader";
import Error from "./error";

export default function Home() {
	return (
		<>
			<ShopSection />
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
