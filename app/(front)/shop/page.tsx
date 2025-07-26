import ProductsShopSection from "@/components/ProductsShopSection";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Shop({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return <ProductsShopSection searchParams={currSearchParams} />;
}
