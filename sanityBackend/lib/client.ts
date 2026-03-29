import { apiVersion, dataset, projectId } from "../env.public";
import { createClient } from "next-sanity";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
});
