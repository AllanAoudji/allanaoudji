import { SchemaPluginOptions } from "sanity";
import settings from "./settings";
import social from "./social";
import tag from "./tag";
import work from "./work";

export const singletonTypes = new Set(["settings"]);

export const schema: SchemaPluginOptions = {
	types: [tag, work, social, settings],
	templates: templates => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
};
