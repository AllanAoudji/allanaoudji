import { HTMLAttributeAnchorTarget } from "react";

export interface Contact {
	id: number;
	title: string;
	href: string;
	text: string;
	target?: HTMLAttributeAnchorTarget;
	className?: string;
}
