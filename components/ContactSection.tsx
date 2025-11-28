import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionItem from "./ContactSectionItem";
import Grid from "./Grid";
import { getContacts } from "@/sanity/lib/queries";
import { CONTACTS_QUERYResult } from "@/sanity/types";

type Props = {
	className?: string;
};

export default async function ContactSection({ className }: Readonly<Props>) {
	let query: CONTACTS_QUERYResult;
	try {
		query = await getContacts();
	} catch (error) {
		if (error instanceof Error) {
			throw error;
		}
		throw new Error("fetch failed");
	}

	if (!query || !query.contacts || query.contacts.length === 0) {
		return null;
	}

	return (
		<ContactSectionContainer className={className}>
			<Grid tag="ul">
				{query.contacts.map(contact => (
					<ContactSectionItem key={contact._id} contact={contact} />
				))}
			</Grid>
		</ContactSectionContainer>
	);
}
