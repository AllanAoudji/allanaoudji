import { defineField, defineType } from "sanity";

export default defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	groups: [
		{
			name: "ordering",
			title: "Ordering",
		},
		{
			name: "text",
			title: "Text",
		},
	],
	fields: [
		defineField({
			name: "works",
			title: "Works ordering",
			type: "array",
			of: [{ type: "reference", to: { type: "work" } }],
			group: "ordering",
			validation: Rule => Rule.unique(),
		}),
		defineField({
			name: "contacts",
			title: "Contacts ordering",
			type: "array",
			of: [{ type: "reference", to: { type: "contact" } }],
			group: "ordering",
			validation: Rule => Rule.unique(),
		}),
		defineField({
			name: "banner",
			title: "Message de bandeau",
			type: "string",
			group: "text",
		}),
		defineField({
			name: "about",
			title: "À propos",
			type: "portableText",
			group: "text",
		}),
	],
});
