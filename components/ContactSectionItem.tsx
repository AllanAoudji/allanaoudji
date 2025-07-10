import { HTMLAttributeAnchorTarget } from "react";

type Props = {
	className?: string;
	href: string;
	target?: HTMLAttributeAnchorTarget;
	text: string;
	title: string;
};

export default function ContactSectionItem({
	className,
	title,
	href,
	target,
	text,
}: Readonly<Props>) {
	return (
		<li className={`${className}`}>
			<h3 className="text-lg uppercase">{title}</h3>
			<a href={href} target={target}>
				{text}
			</a>
		</li>
	);
}
