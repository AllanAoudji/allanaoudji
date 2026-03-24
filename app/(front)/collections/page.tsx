import CollectionsContent from "@/components/CollectionsContent";

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function CollectionsPage({ searchParams }: Props) {
	const currSearchParams = await searchParams;

	return <CollectionsContent searchParams={currSearchParams} />;
}
