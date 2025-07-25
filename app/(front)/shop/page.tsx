import ProductContainer from "@/components/ProductContainer";
import Title from "@/components/Title";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return (
		<div>
			<Title>shop</Title>
			<ProductContainer searchParams={currSearchParams} />
		</div>
	);
}
