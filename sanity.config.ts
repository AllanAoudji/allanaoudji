"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { markdownSchema } from "sanity-plugin-markdown/next";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema, singletonTypes } from "@/sanity/schemaTypes";
import { structure } from "@/sanity/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		structureTool({ structure }),
		// Vision is for querying with GROQ from inside the Studio
		// https://www.sanity.io/docs/the-vision-plugin
		visionTool({ defaultApiVersion: apiVersion }),
		markdownSchema(),
	],
	document: {
		// For singleton types, filter out actions that are not explicitly included
		// in the `singletonActions` list defined above
		actions: (input, context) =>
			singletonTypes.has(context.schemaType)
				? input.filter(({ action }) => action && singletonActions.has(action))
				: input,
	},
});
