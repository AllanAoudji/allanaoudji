import { defineField, defineType } from "sanity";

export default defineType({
	name: "generalConditionsOfSale",
	title: "Conditions générales de vente",
	type: "document",
	preview: {
		prepare: () => ({ title: "Conditions générales de vente" }),
	},
	fields: [
		defineField({
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
