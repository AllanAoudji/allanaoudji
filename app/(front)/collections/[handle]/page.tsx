import ProductsShopSection from "@/components/ProductsShopSection";

type Props = {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function Page({ params, searchParams }: Readonly<Props>) {
	const { handle } = await params;
	const currSearchParams = await searchParams;

	return <ProductsShopSection searchParams={currSearchParams} handle={handle} />;
}
