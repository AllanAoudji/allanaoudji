import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
	name: "portableText",
	title: "Contenu riche",
	type: "array",
	of: [
		defineArrayMember({
			type: "block",
			styles: [
				{ title: "Normal", value: "normal" },
				{ title: "Titre H1", value: "h1" },
				{ title: "Titre H2", value: "h2" },
				{ title: "Titre H3", value: "h3" },
				{ title: "Citation", value: "blockquote" },
			],
			lists: [
				{ title: "Puce", value: "bullet" },
				{ title: "Numérotée", value: "number" },
			],
			marks: {
				decorators: [
					/* ... inchangé */
				],
				annotations: [
					defineArrayMember({
						name: "link",
						type: "object",
						title: "Lien",
						fields: [
							defineField({
								name: "href",
								type: "string",
								title: "URL",
								validation: Rule => Rule.required(),
							}),
							defineField({
								name: "blank",
								type: "boolean",
								title: "Ouvrir dans un nouvel onglet",
								initialValue: false,
							}),
						],
					}),

					defineArrayMember({
						name: "linkPhone",
						type: "object",
						title: "Téléphone",
						fields: [
							defineField({
								name: "phone",
								type: "string",
								title: "Numéro de téléphone",
								description: "Format : +33612345678",
								validation: Rule =>
									Rule.required().regex(/^\+?[\d\s\-().]+$/, {
										name: "phone",
										invert: false,
									}),
							}),
						],
					}),

					defineArrayMember({
						name: "linkEmail",
						type: "object",
						title: "E-mail",
						fields: [
							defineField({
								name: "email",
								type: "string",
								title: "Adresse e-mail",
								validation: Rule => Rule.required().email(),
							}),
						],
					}),
				],
			},
		}),

		defineArrayMember({
			name: "figure",
			type: "object",
			title: "Image",
			fields: [
				defineField({
					name: "image",
					type: "image",
					title: "Image",
					options: { hotspot: true },
					validation: Rule => Rule.required(),
				}),
				defineField({ name: "alt", type: "string", title: "Texte alternatif" }),
				defineField({ name: "caption", type: "string", title: "Légende" }),
				defineField({
					name: "float",
					type: "string",
					title: "Positionnement",
					options: {
						list: [
							{ title: "Pleine largeur", value: "none" },
							{ title: "Flottant gauche", value: "left" },
							{ title: "Flottant droite", value: "right" },
						],
						layout: "radio",
					},
					initialValue: "none",
				}),
			],
			preview: {
				select: { title: "alt", media: "image" },
				prepare: ({ title, media }) => ({ title: title ?? "Image sans alt", media }),
			},
		}),

		defineArrayMember({
			name: "table",
			type: "object",
			title: "Tableau",
			fields: [
				defineField({ name: "caption", type: "string", title: "Titre du tableau" }),
				defineField({
					name: "rows",
					title: "Lignes",
					type: "array",
					of: [
						defineArrayMember({
							name: "row",
							type: "object",
							title: "Ligne",
							fields: [
								defineField({
									name: "isHeader",
									type: "boolean",
									title: "Ligne d'en-tête",
									initialValue: false,
								}),
								defineField({
									name: "cells",
									type: "array",
									title: "Cellules",
									of: [defineArrayMember({ type: "string" })],
								}),
							],
							preview: {
								select: { cells: "cells" },
								prepare: ({ cells }) => ({
									title: Array.isArray(cells) ? cells.join(" | ") : "Ligne vide",
								}),
							},
						}),
					],
				}),
			],
		}),

		defineArrayMember({
			name: "callout",
			type: "object",
			title: "Encadré",
			fields: [
				defineField({
					name: "tone",
					type: "string",
					title: "Tonalité",
					options: {
						list: [
							{ title: "Info", value: "info" },
							{ title: "Attention", value: "warning" },
							{ title: "Important", value: "danger" },
						],
						layout: "radio",
					},
					initialValue: "info",
				}),
				defineField({
					name: "text",
					type: "text",
					title: "Texte",
					validation: Rule => Rule.required(),
				}),
			],
		}),
	],
});
