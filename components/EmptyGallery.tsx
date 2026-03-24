import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyGallery() {
	return (
		<IssueContainer>
			<SubTitle>La galerie se remplit bientôt.</SubTitle>
			<p>Revenez découvrir mes créations 🙂</p>
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
