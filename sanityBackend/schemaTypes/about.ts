// about.ts
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
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
