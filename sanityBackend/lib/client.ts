import { apiVersion, dataset, projectId } from "../env";
import { createClient } from "next-sanity";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: false,
});
