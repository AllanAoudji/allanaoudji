import { CircleIcon } from "@sanity/icons";
import { ComponentType, ReactNode } from "react";
import { StructureBuilder } from "sanity/structure";

// https://www.sanity.io/guides/singleton-document

const singletonListItem = (
	S: StructureBuilder,
	typeName: string,
	title?: string,
	icon?: ReactNode | ComponentType<{}>,
) =>
	S.listItem()
		.title(title || typeName)
		.id(typeName)
		.icon(icon || CircleIcon)
		.child(
			S.document()
				.schemaType(typeName)
				.documentId(typeName)
				.title(title || typeName),
		);

export default singletonListItem;
