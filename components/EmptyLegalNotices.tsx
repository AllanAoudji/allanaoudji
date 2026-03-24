import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyLegalNotices() {
	return (
		<IssueContainer>
			<SubTitle>Les mentions légales ne sont pas encore disponibles.</SubTitle>
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
