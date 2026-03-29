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
import singletonListItem from "@/lib/singletonListItem";

export const structure: StructureResolver = (S, context) =>
	S.list()
		.title("Content")
		.items([
			orderableDocumentListDeskItem({ type: "work", title: "Works", S, context, icon: ImagesIcon }),
			S.documentTypeListItem("tag").title("Tags").icon(TagIcon),
			orderableDocumentListDeskItem({
				type: "contact",
				title: "Contacts",
				S,
				context,
				icon: UsersIcon,
			}),
			singletonListItem(S, "about", "À propos", InfoOutlineIcon),
			singletonListItem(
				S,
				"generalConditionsOfSale",
				"Conditions générales de vente",
				DocumentTextIcon,
			),
			singletonListItem(S, "legalNotices", "Mentions légales", BillIcon),
			singletonListItem(S, "privacyPolicy", "Politique de confidentialité", LockIcon),
			singletonListItem(S, "settings", "Settings", CogIcon),
		]);
