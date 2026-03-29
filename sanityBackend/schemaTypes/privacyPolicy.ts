import { defineField, defineType } from "sanity";

export default defineType({
	name: "privacyPolicy",
	title: "Politique de confidentialité",
	type: "document",
	preview: {
		prepare: () => ({ title: "Politique de confidentialité" }),
	},
	fields: [
		defineField({
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
