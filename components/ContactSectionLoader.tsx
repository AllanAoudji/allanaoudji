import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionLoaderItem from "./ContactSectionLoaderItem";

export default function ContactSectionLoader() {
	return (
		<ContactSectionContainer>
			<div className="flex w-80 flex-col pb-6">
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
			</div>
		</ContactSectionContainer>
	);
}
