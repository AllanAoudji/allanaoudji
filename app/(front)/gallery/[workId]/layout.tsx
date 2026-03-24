import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import SectionError from "@/components/SectionError";
import SkeletonWork from "@/components/SkeletonWork";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<ErrorBoundary errorComponent={SectionError}>
			<Suspense fallback={<SkeletonWork />}>{children}</Suspense>
		</ErrorBoundary>
	);
}
