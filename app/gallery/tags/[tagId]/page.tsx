import Title from "@/components/Title";

export default async function TagDetail({ params }: { params: Promise<{ tagId: string }> }) {
	const { tagId } = await params;
	return (
		<div>
			<Title>Galerie - tags: {tagId}</Title>
		</div>
	);
}
