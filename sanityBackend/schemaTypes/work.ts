import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "work",
	title: "Work",
	type: "document",
	icon: DocumentIcon,
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
			name: "mainImage",
			title: "Main image",
			type: "image",
			validation: Rule => Rule.required(),
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alt",
					type: "string",
				}),
			],
		}),
		defineField({
			name: "tags",
			title: "Tags",
			type: "array",
			of: [{ type: "reference", to: { type: "tag" } }],
			validation: Rule => Rule.unique(),
		}),
		defineField({
			name: "text",
			title: "Text",
			type: "text",
		}),
		defineField({
			name: "gallery",
			title: "Galerie",
			type: "array",
			of: [
				{
					name: "image",
					type: "image",
					title: "Image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alternative text",
						},
					],
				},
			],
			options: {
				layout: "grid",
			},
		}),
	],
});
