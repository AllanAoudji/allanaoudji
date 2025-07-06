export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;
	return (
		<div>
			<h1>Work</h1>
			<h2>{workId}</h2>
		</div>
	);
}
