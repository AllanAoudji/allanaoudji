import { SchemaPluginOptions } from "sanity";
import contact from "./contact";
import settings from "./settings";
import tag from "./tag";
import work from "./work";

export const singletonTypes = new Set(["settings"]);

export const schema: SchemaPluginOptions = {
	types: [tag, work, contact, settings],
	templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
