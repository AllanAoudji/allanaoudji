import { parseBody } from "next-sanity/webhook";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	const { isValidSignature } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

	if (!isValidSignature) {
		return new Response("Invalid signature", { status: 401 });
	}

	revalidatePath("/", "layout");
	return new Response("Revalidated");
}
