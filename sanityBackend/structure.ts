import {
	CogIcon,
	InfoOutlineIcon,
	DocumentTextIcon,
	BillIcon,
	LockIcon,
	TagIcon,
	ImagesIcon,
	UsersIcon,
} from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { StructureResolver } from "sanity/structure";
import singletonListItem from "./lib/singletonListItem";

export const structure: StructureResolver = (S, context) =>
	S.list()
		.title("Content")
		.items([
			// Portfolio
			S.listItem()
				.title("Portfolio")
				.id("portfolio")
				.icon(ImagesIcon)
				.child(
					S.list()
						.title("Portfolio")
						.id("portfolio-list")
						.items([
							orderableDocumentListDeskItem({
								type: "work",
								title: "Works",
								S,
								context,
								icon: ImagesIcon,
							}),
							S.documentTypeListItem("tag").title("Tags").icon(TagIcon),
						]),
				),

			S.divider(),

			// Contacts
			orderableDocumentListDeskItem({
				type: "contact",
				title: "Contacts",
				S,
				context,
				icon: UsersIcon,
			}),

			S.divider(),

			// Contenu éditorial
			singletonListItem(S, "about", "À propos", InfoOutlineIcon),

			S.divider(),

			// Légal
			S.listItem()
				.title("Légal")
				.id("legal")
				.icon(BillIcon)
				.child(
					S.list()
						.title("Légal")
						.id("legal-list")
						.items([
							singletonListItem(
								S,
								"generalConditionsOfSale",
								"Conditions générales de vente",
								DocumentTextIcon,
							),
							singletonListItem(S, "legalNotices", "Mentions légales", BillIcon),
							singletonListItem(S, "privacyPolicy", "Politique de confidentialité", LockIcon),
						]),
				),

			S.divider(),

			// Configuration
			singletonListItem(S, "settings", "Settings", CogIcon),
		]);
