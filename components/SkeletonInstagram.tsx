import InstagramSectionContainer from "./InstagramSectionContainer";
import InstagramSectionItem from "./InstagramSectionItem";

export default function SkeletonInstagram() {
	return (
		<InstagramSectionContainer className="bg-quaternary text-primary">
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
		</InstagramSectionContainer>
	);
}
