import IssueContainer from "@/components/IssueContainer";
import IssueLink from "@/components/IssueLink";
import IssueLinksContainer from "@/components/IssueLinksContainer";
import Title from "@/components/Title";

export default function NotFoundPage() {
	return (
		<IssueContainer>
			<Title>Page introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p>La page que tu cherches n&rsquo;existe pas.</p>
			<IssueLinksContainer>
				<IssueLink href="/">Accueil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
