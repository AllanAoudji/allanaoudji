import { defineField, defineType } from "sanity";

export default defineType({
	name: "about",
	title: "À propos",
	type: "document",
	preview: {
		prepare: () => ({ title: "À propos" }),
	},
	fields: [
		defineField({
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
