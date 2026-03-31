import Menu from "@/types/menu";
import shopifyImage from "@/types/shopifyImage";
import SortFilterItem from "@/types/sortFilterItem";

export const DEFAULT_COLLECTION_IMAGE: shopifyImage = {
	height: 1200,
	id: "default-collection-image",
	url: "/images/default-collection.png",
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

export const SHOPIFY_GRAPHQL_API_ENDPOINT = `/api/${process.env.NEXT_SHOPIFY_API_VERSION}/graphql.json`;

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
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";

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
