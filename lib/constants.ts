import z from "zod";
import Menu from "@/types/menu";
import shopifyImage from "@/types/shopifyImage";
import SortFilterItem from "@/types/sortFilterItem";

export const DEFAULT_COLLECTION_IMAGE: shopifyImage = {
	height: 1200,
	id: "default-collection-image",
	url: "/images/default-collection.jpg",
	width: 810,
	altText: "image de collection par défault",
};

export const DEFAULT_SORT: SortFilterItem = {
	reverse: true,
	title: "Lastest arrival",
	slug: "latest-desc",
	sortKey: "CREATED_AT",
};

export const FETCH_WORKS_HOME = 6;
export const FETCH_WORKS_GALLERY = 4;
export const FETCH_PRODUCTS = 12;

export const FOOT_MENU: Menu[] = [
	{
		exact: true,
		href: "/legal-notices",
		title: "mentions légales",
	},
	{
		exact: true,
		href: "/privacy-policy",
		title: "politique de confidentialité",
	},
	{
		exact: true,
		href: "/general-conditions-of-sale",
		title: "conditions générales de vente",
	},
	{
		exact: true,
		href: "/shipping-policy",
		title: "politique d'expédition",
	},
];

export const HEAD_MENU: Menu[] = [
	{
		exact: true,
		href: "/gallery",
		title: "galerie",
	},
	{
		exact: false,
		href: "/collections",
		title: "boutique",
	},
	{
		exact: true,
		href: "/about",
		title: "à propos",
	},
	{
		exact: true,
		href: "/contact",
		title: "contact",
	},
];

export const HOME_MENU: Menu = {
	exact: true,
	href: "/",
	title: "home",
};

export const SORTING: SortFilterItem[] = [
	DEFAULT_SORT,
	{ title: "Trending", slug: "trending-desc", sortKey: "BEST_SELLING", reverse: false },
	{ title: "Price: low to high", slug: "price-asc", sortKey: "PRICE", reverse: false },
	{ title: "Price: high to low", slug: "price-desc", sortKey: "PRICE", reverse: true },
];

export const TAGS = {
	collections: "collections",
	products: "produits",
	cart: "cart",
	discounts: "discounts",

	sanityWorks: "sanity-works",
	sanityAbout: "sanity-about",
	sanitySettings: "sanity-settings",
	sanityPages: "sanity-pages",
};

export const productTag = (handle: string) => `product-${handle}`;
export const collectionTag = (handle: string) => `collection-${handle}`;
export const workTag = (slug: string) => `sanity-work-${slug}`;

export const CONTACT_FORM_SCHEMA = z.object({
	firstName: z
		.string()
		.min(2, "Doit contenir au moins 2 caractères")
		.max(50, "Ne peut pas dépasser 50 caractères"),
	lastName: z
		.string()
		.min(2, "Doit contenir au moins 2 caractères")
		.max(50, "Ne peut pas dépasser 50 caractères"),
	email: z.string().email("Email invalide"),
	subject: z
		.string()
		.min(3, "Doit contenir au moins 3 caractères")
		.max(120, "Ne peut pas dépasser 120 caractères"),
	message: z
		.string()
		.min(10, "Doit contenir au moins 10 caractères")
		.max(2000, "Ne peut pas dépasser 2000 caractères"),
	website: z.string().optional(),
});

export type ContactFormFields = keyof typeof CONTACT_FORM_SCHEMA.shape;

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";

export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2026-01/graphql.json";

export const SPAM_WORDS_FR = [
	// Publicité / marketing agressif
	"casino",
	"viagra",
	"porno",
	"adulte",
	"sexuel",
	"prêt",
	"carte de crédit",
	"argent facile",
	"retour garanti",
	"arnaque",
	"gagner de l'argent",
	"cryptomonnaie gratuite",
	"bitcoin gratuit",
	"investissement douteux",

	// Liens / phishing
	"http://",
	"https://",
	"www.",
	".com",
	".fr",
	".ru",
	".xyz",
	"cliquez ici",
	"inscrivez-vous maintenant",
	"achetez maintenant",

	// Contenu évident spam
	"travail à domicile",
	"gagner de l'argent rapidement",
	"service SEO",
	"trafic web",
	"revenu passif",
];

export const ERROR_CODE = {
	CONTEXT_NOT_FOUND: "CONTEXT_NOT_FOUND",
	EMAIL_FAILED: "EMAIL_FAILED",
	EXTERNAL_API_ERROR: "EXTERNAL_API_ERROR",
	INTERNAL_ERROR: "INTERNAL_ERROR",
	INVALID_CART: "INVALID_CART",
	INVALID_FORM_DATA: "INVALID_FORM_DATA",
	INVALID_SIGNATURE: "INVALID_SIGNATURE",
	MISSING_ENV_VARIABLE: "MISSING_ENV_VARIABLE",
	SHOPIFY_API_ERROR: "SHOPIFY_API_ERROR",
	TOO_MANY_MESSAGES: "TOO_MANY_MESSAGES",
	UNKNOWN_ERROR: "UNKNOWN_ERROR",
} as const;

export type ErrorCode = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];

export const ERROR_MESSAGE_FR: Record<ErrorCode, string> = {
	CONTEXT_NOT_FOUND: "Quelque chose s'est mal passé.",
	EMAIL_FAILED: "Ton message n'a pas pu être envoyé. Réessaie dans un instant.",
	EXTERNAL_API_ERROR: "Un service externe ne répond pas. Réessaie dans un instant.",
	INTERNAL_ERROR: "Une erreur interne s'est produite. Réessaie dans un instant.",
	INVALID_CART: "Ton panier est introuvable. Réessaie.",
	INVALID_FORM_DATA: "Certains champs semblent incorrects. Vérifie et réessaie dans un instant.",
	INVALID_SIGNATURE: "Signature invalide.",
	MISSING_ENV_VARIABLE: "Une configuration est manquante. Contacte le support.",
	SHOPIFY_API_ERROR: "La boutique ne répond pas. Réessaie dans un moment.",
	TOO_MANY_MESSAGES: "Trop de messages envoyés — réessaie dans quelques minutes.",
	UNKNOWN_ERROR: "Quelque chose s'est mal passé. Réessaie dans un instant.",
};
