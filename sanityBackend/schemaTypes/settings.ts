import { defineField, defineType } from "sanity";

export default defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	preview: {
		prepare: () => ({ title: "Settings" }),
	},
	fields: [
		defineField({
			name: "banner",
			title: "Message de bandeau",
			type: "string",
		}),
	],
});
