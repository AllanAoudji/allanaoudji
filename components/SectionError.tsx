"use client";

import { formatErrorMessage } from "@/lib/utils";
import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import IssueResetButton from "./IssueResetButton";
import SubTitle from "./SubTitle";

type Props = {
	error: Error;
	reset?: () => void;
};

export default function SectionError({ error, reset }: Readonly<Props>) {
	return (
		<IssueContainer>
			<p className="text-danger text-sm tracking-widest uppercase opacity-50">Erreur</p>

			<SubTitle>Quelque chose s&rsquo;est mal passé</SubTitle>

			<p>{formatErrorMessage(error)}</p>

			{process.env.NODE_ENV === "development" && (
				<p className="font-mono text-xs opacity-40">{error.message}</p>
			)}

			{reset && (
				<IssueLinksContainer>
					<IssueResetButton onClick={reset} />
					<IssueLink href="/">Accueil</IssueLink>
				</IssueLinksContainer>
			)}
		</IssueContainer>
	);
}
