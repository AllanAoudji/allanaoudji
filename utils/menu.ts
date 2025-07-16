import { Menu } from "@/types/menu";

export const HEAD_MENU: Menu[] = [
	{
		id: 0,
		href: "/gallery",
		title: "galerie",
		activeSegment: "gallery",
	},
	{
		id: 1,
		href: "/shop",
		title: "boutique",
		activeSegment: "shop",
	},
	{
		id: 2,
		href: "/about",
		title: "à propos",
		activeSegment: "about",
	},
	{
		id: 3,
		href: "/contact",
		title: "contact",
		activeSegment: "contact",
	},
	{
		id: 4,
		href: "/basket",
		title: "panier",
		activeSegment: "panier",
	},
];

export const FOOT_MENU: Menu[] = [
	{
		id: 0,
		href: "/legal-notices",
		title: "mentions légales",
		activeSegment: "legal-notices",
	},
	{
		id: 1,
		href: "/privacy-policy",
		title: "politique de confidentialité",
		activeSegment: "privacy-policy",
	},
	{
		id: 2,
		href: "/general-conditions-of-sale",
		title: "conditions générales de vente",
		activeSegment: "general-conditions-of-sale",
	},
];
