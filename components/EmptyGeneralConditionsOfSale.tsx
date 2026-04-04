import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyGeneralConditionsOfSale() {
	return (
		<IssueContainer>
			<SubTitle>Les conditions générales de vente ne sont pas encore disponibles.</SubTitle>
			<IssueLinksContainer>
				<IssueLink href="/">Accueil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
