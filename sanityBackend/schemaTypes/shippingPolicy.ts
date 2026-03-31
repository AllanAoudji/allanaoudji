import { singletonType } from "../lib/singletonType";
import { defineField } from "sanity";

export default singletonType({
	name: "shippingPolicy",
	title: "Politique d’expédition",
	type: "document",
	preview: {
		prepare: () => ({ title: "Politique d’expédition" }),
	},
	fields: [
		defineField({
			name: "content",
			title: "Contenu",
			type: "portableText",
		}),
	],
});
