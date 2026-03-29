import { singletonType } from "../lib/singletonType";
import { defineField } from "sanity";

export default singletonType({
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
