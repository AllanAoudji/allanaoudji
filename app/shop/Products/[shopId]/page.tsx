import Title from "@/components/Title";

export default async function ShopDetail({ params }: { params: Promise<{ shopId: string }> }) {
	const { shopId } = await params;
	return (
		<div>
			<Title>shop - produits: {shopId}</Title>
		</div>
	);
}
