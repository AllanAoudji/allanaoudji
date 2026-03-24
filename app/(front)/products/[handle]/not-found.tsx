import IssueContainer from "@/components/IssueContainer";
import IssueLink from "@/components/IssueLink";
import IssueLinksContainer from "@/components/IssueLinksContainer";
import Title from "@/components/Title";

export default function ProductSingleNotFound() {
	return (
		<IssueContainer>
			<Title>Produit introuvable</Title>
			<p className="text-sm tracking-widest uppercase opacity-40">erreur 404</p>
			<p>Ce produit n&rsquo;existe pas ou n&rsquo;est plus disponible.</p>
			<IssueLinksContainer>
				<IssueLink href="/collections">Voir la boutique</IssueLink>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
