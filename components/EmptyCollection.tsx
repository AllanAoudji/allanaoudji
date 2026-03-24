"use client";

import { useLocalShopify } from "@/lib/contexts/localShopify-context";
import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

type Props = {
	handle: string | undefined;
};

export default function EmptyCollection({ handle }: Readonly<Props>) {
	const { collections } = useLocalShopify();

	const collectionName = collections.find(collection => collection.handle === handle)?.title;

	return (
		<IssueContainer>
			{collectionName ? (
				<>
					<SubTitle>La collection {collectionName} arrive bientôt.</SubTitle>
					<p>revenez nous voir 🙂</p>
				</>
			) : (
				<>
					<SubTitle>Pas encore &rsquo;articles ici.</SubTitle>
					<p>À très vite 🙂</p>
				</>
			)}
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
				{collectionName && <IssueLink href="/collections">Toutes les collections</IssueLink>}
			</IssueLinksContainer>
		</IssueContainer>
	);
}
