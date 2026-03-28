import EmptyLegalNotices from "@/components/EmptyLegalNotices";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getLegalNotices } from "@/sanity/lib/queries";

export default async function LegalNoticesPage() {
	const result = await getLegalNotices();

	if (!result || !result.data || !result.data.legalNotices) {
		return <EmptyLegalNotices />;
	}

	return (
		<LegalPageContainer portableText={result.data.legalNotices} updatedAt={result.data._updatedAt} />
	);
}
