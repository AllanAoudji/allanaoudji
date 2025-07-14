import { CogIcon } from "@sanity/icons";
import type { StructureResolver } from "sanity/structure";
import singletonListItem from "@/utils/singletonListItem";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
	S.list()
		.title("Content")
		.items([
			S.documentTypeListItem("work").title("Works"),
			S.documentTypeListItem("tag").title("Tags"),
			S.documentTypeListItem("social").title("Socials"),
			singletonListItem(S, "settings", "Settings", CogIcon),
		]);
