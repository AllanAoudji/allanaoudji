import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionLoaderItem from "./ContactSectionLoaderItem";
import Grid from "./Grid";

export default function ContactSectionLoader() {
	return (
		<ContactSectionContainer>
			<Grid>
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
				<ContactSectionLoaderItem />
			</Grid>
		</ContactSectionContainer>
	);
}
