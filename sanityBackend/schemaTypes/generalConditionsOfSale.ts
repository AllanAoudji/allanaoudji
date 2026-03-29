import { singletonType } from "../lib/singletonType";
import { defineField } from "sanity";

export default singletonType({
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
