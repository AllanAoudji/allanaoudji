import Link from "next/link";
import LegalPageContainer from "./LegalPageContainer";
import SubTitle from "./SubTitle";
import { getGeneralConditionOfSale } from "@/sanity/lib/queries";

export default async function GeneralConditionsOfSaleContainer() {
	const result = await getGeneralConditionOfSale();

	if (!result || !result.generalConditionsOfSale) {
		return (
			<div className="flex flex-col items-center justify-center pt-16">
				<SubTitle>Les conditions générales de vente ne sont pas encore disponibles.</SubTitle>
				<div className="flex flex-col gap-4 sm:flex-row">
					<Link
						className="hover:bg-quaternary hover:text-primary border-quaternary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
						href="/"
					>
						Acceuil
					</Link>
				</div>
			</div>
		);
	}

	return (
		<LegalPageContainer portableText={result.generalConditionsOfSale} updatedAt={result._updatedAt} />
	);
}
