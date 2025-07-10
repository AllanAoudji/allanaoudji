import { Menu } from "@/types/menu";

const MENU: Menu[] = [
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

export default MENU;
