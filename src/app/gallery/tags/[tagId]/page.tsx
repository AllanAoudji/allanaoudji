export default async function TagDetail({ params }: { params: Promise<{ tagId: string }> }) {
	const { tagId } = await params;
	return (
		<div>
			<h1>Galetie - tag</h1>
			<h2>tag: {tagId}</h2>
		</div>
	);
}
