import IssueContainer from "@/components/IssueContainer";
import IssueLink from "@/components/IssueLink";
import IssueLinksContainer from "@/components/IssueLinksContainer";
import Title from "@/components/Title";

export default function CollectionSingleNotFound() {
	return (
		<IssueContainer>
			<Title>Collection introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p>Cette collection n&rsquo;existe pas.</p>
			<IssueLinksContainer>
				<IssueLink href="/">Accueil</IssueLink>
				<IssueLink href="/collections">Voir les collections</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
