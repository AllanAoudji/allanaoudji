import { formatDate } from "@/lib/utils";
import PortableTextContent from "./PortableTextContent";

type Props = {
	portableText: unknown[];
	updatedAt: string;
};

export default function LegalPageContainer({ portableText, updatedAt }: Readonly<Props>) {
	return (
		<>
			<div className="mb-4 text-sm italic">
				<p>Dernière mise à jour : {formatDate(updatedAt)}</p>
			</div>
			<PortableTextContent value={portableText} />
		</>
	);
}
