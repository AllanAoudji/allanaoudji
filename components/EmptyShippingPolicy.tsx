import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyShippingPolicy() {
	return (
		<IssueContainer>
			<SubTitle>La politique d&rsquo;expédition n&rsquo;est pas encore disponible.</SubTitle>
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
