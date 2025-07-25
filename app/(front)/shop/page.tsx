import ProductsShopSection from "@/components/ProductsShopSection";
import Title from "@/components/Title";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return (
		<div>
			<Title>shop</Title>
			<ProductsShopSection searchParams={currSearchParams} />
		</div>
	);
}
