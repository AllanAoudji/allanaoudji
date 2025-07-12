import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";
import Title from "@/components/Title";
import WorkImages from "@/components/WorkImages";
import WorkText from "@/components/WorkText";
import WORKS from "@/utils/works";

export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;
	const work = WORKS.find(work => work.id == workId);

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
			<Title className="pb-8">{work.title}</Title>
			{work.text && <WorkText className="pb-8">{work.text}</WorkText>}
			<WorkImages />
		</>
	);
}
