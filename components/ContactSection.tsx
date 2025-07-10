import { HTMLAttributeAnchorTarget } from "react";
import ContactSectionItem from "./ContactSectionItem";
import SubTitle from "./SubTitle";

type item = {
	id: number;
	title: string;
	href: string;
	text: string;
	target?: HTMLAttributeAnchorTarget;
	className?: string;
};

const ITEMS: item[] = [
	{
		id: 0,
		title: "téléphone",
		href: "tel:+33674289219",
		text: "+33674289219",
	},
	{
		id: 1,
		title: "e-mail",
		href: "mailto:allanaoudji@gmail.com",
		text: "allanaoudji@gmail.com",
	},
	{
		id: 2,
		title: "instagram",
		target: "_blank",
		href: "https://www.instagram.com/allanaoudji/",
		text: "@allanaoudji",
	},
];

export default function ContactSection() {
	return (
		<section className="section-container">
			<SubTitle className="pb-16">Contact</SubTitle>
			<ul className="items-gap grid-default">
				{ITEMS.map(item => (
					<ContactSectionItem
						href={item.href}
						key={item.id}
						target={item.target}
						text={item.text}
						title={item.title}
					/>
				))}
			</ul>
		</section>
	);
}
