import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import Error from "@/app/(front)/error";
import Filter from "./Filter";

type Props = {
	className?: string;
};

export default function CollectionsFilters({ className }: Readonly<Props>) {
	return (
		<ErrorBoundary errorComponent={Error}>
			<Suspense fallback={<div>...loading filters</div>}>
				<div className={cn(className)}>
					<Filter className="mb-16" type="collections" />
					<Filter type="ordering" />
				</div>
			</Suspense>
		</ErrorBoundary>
	);
}
