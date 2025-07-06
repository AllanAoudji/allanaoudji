export default async function ShopDetail({ params }: { params: Promise<{ shopId: string }> }) {
	const { shopId } = await params;
	return (
		<div>
			<h1>Shop - products</h1>
			<h2>produit: {shopId}</h2>
		</div>
	);
}
