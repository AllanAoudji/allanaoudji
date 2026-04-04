import { apiVersion, dataset, projectId } from "../env.public";
import { createClient } from "next-sanity";

export const client = createClient({
	apiVersion,
	dataset,
	projectId,
	useCdn: false,
});

export async function sanityFetchStatic<T>({
	query,
	params,
}: {
	query: string;
	params?: Record<string, unknown>;
}): Promise<T> {
	return client.fetch(query, params);
}
