import { SchemaPluginOptions } from "sanity";
import about from "./about";
import contact from "./contact";
import generalConditionsOfSale from "./generalConditionsOfSale";
import legalNotices from "./legalNotices";
import portableText from "./portableText";
import privacyPolicy from "./privacyPolicy";
import settings from "./settings";
import shippingPolicy from "./shippingPolicy";
import tag from "./tag";
import work from "./work";

export const singletonTypes = new Set([
	"settings",
	"about",
	"generalConditionsOfSale",
	"legalNotices",
	"privacyPolicy",
	"shippingPolicy",
]);

export const schema: SchemaPluginOptions = {
	types: [
		about,
		contact,
		generalConditionsOfSale,
		legalNotices,
		portableText,
		shippingPolicy,
		privacyPolicy,
		settings,
		tag,
		work,
	],
	templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
