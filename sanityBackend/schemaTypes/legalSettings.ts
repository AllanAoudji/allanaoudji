import { defineField, defineType } from "sanity";

export default defineType({
	name: "legalSettings",
	title: "Legal Settings",
	type: "document",
	fields: [
		defineField({
			name: "generalConditionsOfSale",
			title: "Conditions générales de vente",
			type: "portableText",
		}),
		defineField({
			name: "legalNotices",
			title: "Mentions légales",
			type: "portableText",
		}),
		defineField({
			name: "privacyPolicy",
			title: "Politique de confidentialité",
			type: "portableText",
		}),
	],
});
