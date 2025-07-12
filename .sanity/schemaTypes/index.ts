import { type SchemaTypeDefinition } from "sanity";
import social from "./social";
import tag from "./tag";
import work from "./work";

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [tag, work, social],
};
