import { EnvelopeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "social",
	title: "Social Medias",
	type: "document",
	icon: EnvelopeIcon,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			validation: Rule => Rule.required(),
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "text",
			title: "Text",
			type: "string",
		}),
		defineField({
			name: "blank",
			title: "Blank",
			type: "boolean",
		}),
	],
});
