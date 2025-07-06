import Title from "@/components/title";

export default async function TagDetail({ params }: { params: Promise<{ tagId: string }> }) {
	const { tagId } = await params;
	return (
		<div>
			<Title title={`Galerie - tags: ${tagId}`} />
		</div>
	);
}
