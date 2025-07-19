import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionLoaderItem from "./ContactSectionLoaderItem";

export default function ContactSectionLoader() {
	return (
		<ContactSectionContainer>
			<div className="items-gap grid-default">
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
			</div>
		</ContactSectionContainer>
	);
}
