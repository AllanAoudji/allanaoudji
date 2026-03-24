import Link from "next/link";
import LegalPageContainer from "./LegalPageContainer";
import SubTitle from "./SubTitle";
import { getPrivacyPolicy } from "@/sanity/lib/queries";

export default async function PrivacyPolicyContainer() {
	const result = await getPrivacyPolicy();

	if (!result || !result.privacyPolicy) {
		return (
			<div className="flex flex-col items-center justify-center pt-16">
				<SubTitle>La politique de confidentialité n&rsquo;est pas encore disponible.</SubTitle>
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

	return <LegalPageContainer portableText={result.privacyPolicy} updatedAt={result._updatedAt} />;
}
