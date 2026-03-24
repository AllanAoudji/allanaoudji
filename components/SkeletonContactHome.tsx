import ContactSectionContainer from "./ContactSectionContainer";
import SkeletonContactLink from "./SkeletonContactLink";

export default function SkeletonContactHome() {
	return (
		<ContactSectionContainer>
			<div className="flex w-80 flex-col pb-7">
				<SkeletonContactLink className="mb-5" />
				<SkeletonContactLink className="mb-5" />
				<SkeletonContactLink />
			</div>
		</ContactSectionContainer>
	);
}
