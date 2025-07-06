export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;
	return (
		<div>
			<h1>Galerie - works</h1>
			<h2>work: {workId}</h2>
		</div>
	);
}
