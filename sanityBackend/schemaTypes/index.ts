import { SchemaPluginOptions } from "sanity";
import contact from "./contact";
import portableText from "./portableText";
import settings from "./settings";
import tag from "./tag";
import work from "./work";

export const singletonTypes = new Set(["settings"]);

export const schema: SchemaPluginOptions = {
	types: [tag, work, contact, settings, portableText],
	templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
