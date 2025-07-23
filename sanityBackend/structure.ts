import { CogIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import singletonListItem from "@/lib/singletonListItem";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
	S.list()
		.title("Content")
		.items([
			S.documentTypeListItem("work").title("Works"),
			S.documentTypeListItem("tag").title("Tags"),
			S.documentTypeListItem("contact").title("Contacts"),
			singletonListItem(S, "settings", "Settings", CogIcon),
		]);
