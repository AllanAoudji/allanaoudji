import { singletonType } from "../lib/singletonType";
import { defineField } from "sanity";

export default singletonType({
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
