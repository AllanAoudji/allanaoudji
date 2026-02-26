import Error from "../../error";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";
import Title from "@/components/Title";
import WorkSingleContainer from "@/components/WorkSingleContainer";
import { getWork } from "@/sanity/lib/queries";

export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;

	const work = await getWork(workId);

	if (!work) {
		redirect("/gallery", RedirectType.replace);
	}

	return (
		<div className="padding-container vertical-padding">
			<Title>{work.title}</Title>
			<ErrorBoundary errorComponent={Error}>
				<Suspense fallback={<p>...loading</p>}>
					<WorkSingleContainer work={work} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
}
