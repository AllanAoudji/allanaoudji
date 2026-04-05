// app/api/revalidate/sanity/route.ts
import * as Sentry from "@sentry/nextjs";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { ERROR_CODE, TAGS } from "@/lib/constants";

// Mapping _type Sanity → tags à invalider
const typeTagMap: Record<string, string[]> = {
	work: [TAGS.sanityWorks],
	about: [TAGS.sanityAbout],
	settings: [TAGS.sanitySettings],
	contact: [TAGS.sanitySettings],
	generalConditionsOfSale: [TAGS.sanityPages],
	legalNotices: [TAGS.sanityPages],
	privacyPolicy: [TAGS.sanityPages],
	shippingPolicy: [TAGS.sanityPages],
};

export async function POST(req: NextRequest) {
	const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

	if (!isValidSignature) {
		Sentry.captureMessage("Invalid Sanity webhook signature", {
			level: "warning",
			extra: { url: req.url, method: req.method },
		});
		return new Response(ERROR_CODE.INVALID_SIGNATURE, { status: 401 });
	}

	const documentType = (body as { _type?: string })?._type;
	const tagsToRevalidate = documentType ? typeTagMap[documentType] : undefined;

	if (!tagsToRevalidate) {
		if (!tagsToRevalidate) {
			Sentry.captureMessage("Sanity webhook: unmapped document type", {
				level: "warning",
				extra: { documentType },
			});
			return new Response("Revalidated (no-op)");
		}
		return new Response("Revalidated (fallback)");
	}

	tagsToRevalidate.forEach(tag => revalidateTag(tag, { expire: 0 }));
	return new Response("Revalidated");
}
