import Error from "../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import Collections from "@/components/Collections";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<>
			<Title>boutique</Title>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<div />}>
					<Collections />
				</Suspense>
			</ErrorBoundary>
			{children}
		</>
	);
}
