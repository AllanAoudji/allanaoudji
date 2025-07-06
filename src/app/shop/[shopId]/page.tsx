export default async function ShopDetail({ params }: { params: Promise<{ shopId: string }> }) {
	const { shopId } = await params;
	return (
		<div>
			<h1>Shop</h1>
			<h2>{shopId}</h2>
		</div>
	);
}
