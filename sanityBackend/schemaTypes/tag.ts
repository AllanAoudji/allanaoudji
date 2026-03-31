import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "tag",
	title: "Tags",
	type: "document",
	icon: TagIcon,
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
				slugify: input =>
					input
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/(^-|-$)/g, ""),
			},
			validation: Rule => Rule.required(),
		}),
	],
});
