import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyPrivacyPolicy() {
	return (
		<IssueContainer>
			<SubTitle>La politique de confidentialité n&rsquo;est pas encore disponible.</SubTitle>
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
