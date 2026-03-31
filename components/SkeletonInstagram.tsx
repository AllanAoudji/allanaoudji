import InstagramSectionContainer from "./InstagramSectionContainer";
import InstagramSectionItem from "./InstagramSectionItem";

type Props = {
	className?: string;
};

export default function SkeletonInstagram({ className }: Readonly<Props>) {
	return (
		<InstagramSectionContainer className={className}>
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
			<InstagramSectionItem />
		</InstagramSectionContainer>
	);
}
