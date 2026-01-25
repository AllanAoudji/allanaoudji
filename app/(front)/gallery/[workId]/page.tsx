import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import WorkSingleContainer from "@/components/WorkSingleContainer";
import { getWork } from "@/sanity/lib/queries";

export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;

	const work = await getWork(workId);

	if (!work) {
		redirect("/gallery", RedirectType.replace);
	}

	return (
		<>
			<div className="pb-8 text-right">
				<Link className="text-lg" href="/">
					retour
				</Link>
			</div>
			<WorkSingleContainer work={work} />
		</>
	);
}
