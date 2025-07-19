import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import ContactSection from "@/components/ContactSection";
import InstagramSection from "@/components/InstagramSection";
import InstagramSectionLoader from "@/components/InstagramSectionLoader";
import ShopSection from "@/components/ShopSection";
import WorksHomeSection from "@/components/WorksHomeSection";
import Error from "./error";

export default function Home() {
	return (
		<>
			<ShopSection />
			<WorksHomeSection />
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<InstagramSectionLoader />}>
					<InstagramSection />
				</Suspense>
			</ErrorBoundary>
			<ContactSection />
		</>
	);
}
