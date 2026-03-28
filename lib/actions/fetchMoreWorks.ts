"use server";

import { getWorks } from "@/sanity/lib/queries";

export async function fetchMoreWorks({ from, to }: { from: number; to: number }) {
	return getWorks(from, to);
}
