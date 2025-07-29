import { Menu } from "@/types/menu";
import SortFilterItem from "@/types/sortFilterItem";

export const DEFAULT_SORT: SortFilterItem = {
	title: "Relevance",
	slug: null,
	sortKey: "RELEVANCE",
	reverse: false,
};

export const FOOT_MENU: Menu[] = [
	{
		href: "/legal-notices",
		title: "mentions légales",
		activeSegment: ["legal-notices"],
	},
	{
		href: "/privacy-policy",
		title: "politique de confidentialité",
		activeSegment: ["privacy-policy"],
	},
	{
		href: "/general-conditions-of-sale",
		title: "conditions générales de vente",
		activeSegment: ["general-conditions-of-sale"],
	},
];

export const HEAD_MENU: Menu[] = [
	{
		href: "/gallery",
		title: "galerie",
		activeSegment: ["gallery"],
	},
	{
		href: "/collections",
		title: "boutique",
		activeSegment: ["collections", "products"],
	},
	{
		href: "/about",
		title: "à propos",
		activeSegment: ["about"],
	},
	{
		href: "/contact",
		title: "contact",
		activeSegment: ["contact"],
	},
	{
		href: "/basket",
		title: "panier",
		activeSegment: ["panier"],
	},
];

export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2025-07/graphql.json";

export const SORTING: SortFilterItem[] = [
	DEFAULT_SORT,
	{ title: "Trending", slug: "trending-desc", sortKey: "BEST_SELLING", reverse: false },
	{ title: "Lastest arrival", slug: "latest-desc", sortKey: "CREATED_AT", reverse: true },
	{ title: "Price: low to high", slug: "price-asc", sortKey: "PRICE", reverse: false },
	{ title: "Price: high to low", slug: "price-desc", sortKey: "PRICE", reverse: true },
];

export const TAGS = {
	collections: "collections",
	products: "produits",
	cart: "cart",
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
