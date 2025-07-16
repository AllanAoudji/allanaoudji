import Title from "@/components/Title";

export default async function ShopDetail({ params }: { params: Promise<{ shopId: string }> }) {
	const { shopId } = await params;
	return (
		<>
			<Title>shop - produits: {shopId}</Title>
		</>
	);
}
