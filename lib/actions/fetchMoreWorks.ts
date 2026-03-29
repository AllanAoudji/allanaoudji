"use server";

import { getWorks } from "@/studio/lib/queries";

export async function fetchMoreWorks({ from, to }: { from: number; to: number }) {
	return getWorks(from, to);
}
