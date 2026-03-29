"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { markdownSchema } from "sanity-plugin-markdown/next";
import { media } from "sanity-plugin-media";
import { structureTool } from "sanity/structure";
import StudioNavbar from "@/studio/components/studioNavbar";
import { apiVersion, dataset, projectId } from "@/studio/env.public";
import { schema, singletonTypes } from "@/studio/schemaTypes";
import { structure } from "@/studio/structure";

const isDev = process.env.NODE_ENV === "development";
const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const toolOrder = ["structure", "releases", "media"];

export default defineConfig({
	basePath: "/studio",
	projectId,
	dataset,
	schema,
	plugins: [
		media(),
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
		markdownSchema(),
	],
	tools: prev =>
		prev
			.filter(tool => {
				if (!isDev && tool.name === "vision") return false;
				return true;
			})
			.sort((a, b) => {
				const ai = toolOrder.indexOf(a.name);
				const bi = toolOrder.indexOf(b.name);
				if (ai === -1) return 1;
				if (bi === -1) return -1;
				return ai - bi;
			}),
	document: {
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
