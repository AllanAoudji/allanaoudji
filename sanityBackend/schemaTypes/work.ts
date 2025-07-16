import { getExtension, getImageDimensions } from "@sanity/asset-utils";
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType, ImageValue } from "sanity";

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
			description: "jpg or png file, 1200 x 810 pixel (4/3 ratio)",
			validation: rule => [
				rule.required(),
				rule.custom(value => {
					if (!value) {
						return true;
					}

					if (!value.asset) {
						return "Something went wrong";
					}

					const filetype = getExtension(value.asset._ref);

					if (filetype !== "jpg" && filetype !== "png") {
						return "Image must be a JPG or PNG";
					}

					const { width, height } = getImageDimensions(value.asset._ref);

					if (width != 1080 || height != 810) {
						return "Image must be 1200x810 pixels";
					}

					return true;
				}),
			],
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
					description: "jpg or png file, 1080 x 1440 pixel (3/4 ratio)",
					validation: rule => [
						rule.custom<ImageValue>(value => {
							if (!value) {
								return true;
							}

							if (!value.asset) {
								return "Something went wrong";
							}

							const filetype = getExtension(value.asset._ref);

							if (filetype !== "jpg" && filetype !== "png") {
								return "Image must be a JPG or PNG";
							}

							const { width, height } = getImageDimensions(value.asset._ref);

							if (width != 1080 || height != 1440) {
								return "Image must be 1080 x 1440 pixels";
							}

							return true;
						}),
					],
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
	],
});
