import Error from "../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import FilterCollection from "@/components/FilterCollection";
import FilterOrdering from "@/components/FilterOrdering";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<>
			<Title>boutique</Title>
			<section className="grid grid-cols-5 gap-4">
				<div>
					<ErrorBoundary errorComponent={Error}>
						<Suspense fallback={<div />}>
							<FilterCollection />
						</Suspense>
					</ErrorBoundary>
					<FilterOrdering />
				</div>
				{children}
			</section>
		</>
	);
}
