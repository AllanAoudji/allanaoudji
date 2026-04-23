"use server";

import { cookies } from "next/headers";

export async function resetCartCookie() {
	const cookieStore = await cookies();

	cookieStore.delete("cartId");
}
