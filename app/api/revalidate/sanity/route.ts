import * as Sentry from "@sentry/nextjs";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { ERROR_CODE } from "@/lib/constants";

export async function POST(req: NextRequest) {
	const { isValidSignature } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

	if (!isValidSignature) {
		Sentry.captureMessage("Invalid Sanity webhook signature", {
			level: "warning",
			extra: {
				url: req.url,
				method: req.method,
			},
		});
		return new Response(ERROR_CODE.INVALID_SIGNATURE, { status: 401 });
	}

	revalidatePath("/", "layout");
	return new Response("Revalidated");
}
