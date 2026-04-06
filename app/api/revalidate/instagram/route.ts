// app/api/revalidate-instagram/route.ts
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { TAGS } from "@/lib/constants";

export async function POST(req: NextRequest) {
	const secret = req.headers.get("x-secret-token");

	if (secret !== process.env.REVALIDATE_SECRET) {
		return Response.json({ error: "Unauthorized" }, { status: 401 });
	}

	revalidateTag(TAGS.instagram, { expire: 0 });
	return Response.json({ revalidated: true });
}
