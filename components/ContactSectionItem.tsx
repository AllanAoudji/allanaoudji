import { SanityContact } from "@/.sanity/lib/queries";

type Props = {
	className?: string;
	contact: SanityContact;
};

export default function ContactSectionItem({ className, contact }: Readonly<Props>) {
	return (
		<li className={`${className}`}>
			<h3 className="text-lg uppercase">{contact.title}</h3>
			<a href={contact.url} target={contact.blank ? "_blank" : undefined}>
				{contact.text}
			</a>
		</li>
	);
}
