import { singletonType } from "../lib/singletonType";
import { defineField } from "sanity";

export default singletonType({
	name: "about",
	title: "À propos",
	type: "document",
	preview: {
		prepare: () => ({ title: "À propos" }),
	},
	fields: [
		defineField({
			name: "images",
			title: "Images",
			type: "array",
			of: [{ type: "image", options: { hotspot: true } }],
			validation: rule => rule.max(2),
		}),
		defineField({
			name: "text",
			title: "Texte",
			type: "portableText",
			// si vous voulez restreindre les styles dispo pour ce champ (pas de table, callout, etc.)
		}),
	],
});
