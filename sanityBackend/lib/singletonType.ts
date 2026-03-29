import { defineType } from "sanity";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const singletonType = (typeDef: any) =>
	({
		...defineType(typeDef),
		__experimental_actions: ["update", "publish"],
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}) as any;
