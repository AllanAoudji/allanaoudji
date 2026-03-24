import IssueContainer from "./IssueContainer";
import IssueLink from "./IssueLink";
import IssueLinksContainer from "./IssueLinksContainer";
import SubTitle from "./SubTitle";

export default function EmptyAbout() {
	return (
		<IssueContainer>
			<SubTitle>Cette page est en cours de rédaction.</SubTitle>
			<p className="mb-2">Je prépare quelque chose pour te présenter très vite qui je suis.</p>
			<p>Reviens bientôt 🙂</p>
			<IssueLinksContainer>
				<IssueLink href="/">Acceuil</IssueLink>
			</IssueLinksContainer>
		</IssueContainer>
	);
}
