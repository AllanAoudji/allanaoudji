import { CogIcon, DocumentIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import singletonListItem from "@/lib/singletonListItem";

export const structure: StructureResolver = S =>
	S.list()
		.title("Content")
		.items([
			S.documentTypeListItem("work").title("Works"),
			S.documentTypeListItem("tag").title("Tags"),
			S.documentTypeListItem("contact").title("Contacts"),
			singletonListItem(S, "settings", "Settings", CogIcon),
			singletonListItem(S, "legalSettings", "Legal Settings", DocumentIcon),
		]);
