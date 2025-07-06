export default async function WorkDetail({ params }: { params: Promise<{ workId: string }> }) {
	const { workId } = await params;
	return (
		<div>
			<h1>{workId}</h1>
		</div>
	);
}
