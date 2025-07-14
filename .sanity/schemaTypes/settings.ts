import { defineField, defineType } from "sanity";

export default defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	fields: [
		defineField({
			name: "works",
			title: "Works ordering",
			type: "array",
			of: [{ type: "reference", to: { type: "work" } }],
		}),

		defineField({
			name: "socials",
			title: "social ordering",
			type: "array",
			of: [{ type: "reference", to: { type: "social" } }],
		}),
	],
});
