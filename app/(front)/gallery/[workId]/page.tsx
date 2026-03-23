import { notFound } from "next/navigation";
import Title from "@/components/Title";
import WorkSingleContainer from "@/components/WorkSingleContainer";
import { getWork } from "@/sanity/lib/queries";

export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;

	const work = await getWork(workId);

	if (!work) {
		notFound();
	}

	return (
		<>
			<Title>{work.title}</Title>
			<WorkSingleContainer work={work} />
		</>
	);
}
