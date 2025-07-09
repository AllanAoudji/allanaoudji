import Title from "@/components/Title";

export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;
	return (
		<div>
			<Title>Galerie - works: {workId}</Title>
		</div>
	);
}
