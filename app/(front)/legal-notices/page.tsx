import EmptyLegalNotices from "@/components/EmptyLegalNotices";
import LegalPageContainer from "@/components/LegalPageContainer";
import { getLegalNotices } from "@/studio/lib/queries";

export default async function LegalNoticesPage() {
	const result = await getLegalNotices();

	if (!result || !result.data || !result.data.content) {
		return <EmptyLegalNotices />;
	}

	return (
		<LegalPageContainer portableText={result.data.content} updatedAt={result.data._updatedAt} />
	);
}
