"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */
// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { markdownSchema } from "sanity-plugin-markdown/next";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import StudioNavbar from "@/studio/components/studioNavbar";
import { apiVersion, dataset, projectId } from "@/studio/env.public";
import { schema, singletonTypes } from "@/studio/schemaTypes";
import { structure } from "@/studio/structure";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	// Add and edit the content schema in the './sanity/schemaTypes' folder
	schema,
	plugins: [
		media(),
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
	studio: {
		components: {
			navbar: StudioNavbar,
		},
	},
});
