import Title from "@/components/title";

export default async function ShopDetail({ params }: { params: Promise<{ shopId: string }> }) {
	const { shopId } = await params;
	return (
		<div>
			<Title title={`shop - produits: ${shopId}`} />
		</div>
	);
}
