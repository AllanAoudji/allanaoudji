import { CogIcon, DocumentIcon } from "@sanity/icons";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { StructureResolver } from "sanity/structure";
import singletonListItem from "@/lib/singletonListItem";

export const structure: StructureResolver = (S, context) =>
	S.list()
		.title("Content")
		.items([
			orderableDocumentListDeskItem({ type: "work", title: "Works", S, context }),
			S.documentTypeListItem("tag").title("Tags"),
			orderableDocumentListDeskItem({ type: "contact", title: "Contacts", S, context }),
			singletonListItem(S, "settings", "Settings", CogIcon),
			singletonListItem(S, "legalSettings", "Legal Settings", DocumentIcon),
		]);
