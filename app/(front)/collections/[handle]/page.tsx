import CollectionsContent from "@/components/CollectionsContent";

type Props = {
	params: Promise<{ handle: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CollectionSinglePage({ params, searchParams }: Readonly<Props>) {
	const { handle } = await params;
	const currSearchParams = await searchParams;

	return <CollectionsContent searchParams={currSearchParams} handle={handle} />;
}
