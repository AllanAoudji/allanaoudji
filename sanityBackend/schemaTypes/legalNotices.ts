import { defineField, defineType } from "sanity";

export default defineType({
	name: "legalNotices",
	title: "Mentions légales",
	type: "document",
	preview: {
		prepare: () => ({ title: "Mentions légales" }),
	},
	fields: [
		defineField({
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
