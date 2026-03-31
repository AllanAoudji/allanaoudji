import { validateImageRatio } from "../lib/validateImageRatio";
import { DocumentIcon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "work",
	orderings: [orderRankOrdering],
	title: "Work",
	type: "document",
	icon: DocumentIcon,
	fields: [
		orderRankField({ type: "work" }),
		defineField({
			name: "hidden",
			title: "Masquer dans le portfolio",
			type: "boolean",
			initialValue: false,
		}),
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
				slugify: input =>
					input
						.toLowerCase()
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "")
						.replace(/[^a-z0-9]+/g, "-")
						.replace(/(^-|-$)/g, ""),
			},
		}),
		defineField({
			name: "mainImage",
			title: "Main image",
			type: "image",
			description: "jpg or png file, 4/3 ratio, at least 800 pixels wide",
			validation: rule => [rule.required(), rule.custom(validateImageRatio(4 / 3, 800))],
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
					description: "jpg or png file, 3/4 ratio, at least 800 pixels wide",
					validation: rule => [rule.custom(validateImageRatio(3 / 4, 800))],
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
				layout: "list",
			},
		}),
		defineField({
			name: "seo",
			title: "SEO",
			type: "object",
			fields: [
				defineField({
					name: "title",
					title: "Titre SEO",
					type: "string",
					description: "Laissez vide pour utiliser le titre du work",
					validation: Rule => Rule.max(60),
				}),
				defineField({
					name: "description",
					title: "Description",
					type: "text",
					rows: 3,
					validation: Rule => Rule.max(160),
				}),
			],
		}),
	],
});
