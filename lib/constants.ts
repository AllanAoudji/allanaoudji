import { Menu } from "@/types/menu";

export const FOOT_MENU: Menu[] = [
	{
		href: "/legal-notices",
		title: "mentions légales",
		activeSegment: "legal-notices",
	},
	{
		href: "/privacy-policy",
		title: "politique de confidentialité",
		activeSegment: "privacy-policy",
	},
	{
		href: "/general-conditions-of-sale",
		title: "conditions générales de vente",
		activeSegment: "general-conditions-of-sale",
	},
];

export const HEAD_MENU: Menu[] = [
	{
		href: "/gallery",
		title: "galerie",
		activeSegment: "gallery",
	},
	{
		href: "/shop",
		title: "boutique",
		activeSegment: "shop",
	},
	{
		href: "/about",
		title: "à propos",
		activeSegment: "about",
	},
	{
		href: "/contact",
		title: "contact",
		activeSegment: "contact",
	},
	{
		href: "/basket",
		title: "panier",
		activeSegment: "panier",
	},
];

export const TAGS = {
	collections: "collections",
	products: "produits",
	cart: "cart",
};

export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2025-07/graphql.json";
