import { cn } from "@/lib/utils";
import ContactSectionContainer from "./ContactSectionContainer";
import ContactSectionItem from "./ContactSectionItem";
import { getContacts } from "@/sanity/lib/queries";
import { CONTACTS_QUERY_RESULT } from "@/sanity/types";

type Props = {
	className?: string;
};

export default async function ContactSection({ className }: Readonly<Props>) {
	let query: CONTACTS_QUERY_RESULT;
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

	const contactLength = query.contacts.length;

	return (
		<ContactSectionContainer className={className}>
			<ul className="flex w-min flex-col">
				{query.contacts.map((contact, i) => (
					<ContactSectionItem
						key={contact._id}
						contact={contact}
						className={cn({ "pb-6": i !== contactLength - 1 })}
					/>
				))}
			</ul>
		</ContactSectionContainer>
	);
}
