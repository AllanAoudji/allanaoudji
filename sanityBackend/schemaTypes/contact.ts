import { EnvelopeIcon } from "@sanity/icons";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

export default defineType({
	name: "contact",
	orderings: [orderRankOrdering],
	title: "Contacts",
	type: "document",
	icon: EnvelopeIcon,
	fields: [
		orderRankField({ type: "work" }),
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
			name: "hidden",
			title: "Masquer dans le portfolio",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "url",
			title: "URL",
			type: "url",
			validation: Rule =>
				Rule.uri({
					scheme: ["http", "https", "mailto", "tel"],
				}).required(),
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
			initialValue: false,
		}),
	],
});
