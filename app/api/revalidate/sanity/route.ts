import * as Sentry from "@sentry/nextjs";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";
import { ERROR_CODE, TAGS, workTag } from "@/lib/constants";

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

const IGNORED_TYPES = new Set(["sanity.imageAsset", "sanity.fileAsset"]);

export async function POST(req: NextRequest) {
	const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET);

	if (!isValidSignature) {
		Sentry.captureMessage("Invalid Sanity webhook signature", {
			level: "warning",
			extra: { url: req.url, method: req.method },
		});
		return new Response(ERROR_CODE.INVALID_SIGNATURE, { status: 401 });
	}

	const documentType = (body as { _type?: string; slug?: { current?: string } })?._type;
	const slug = (body as { slug?: { current?: string } })?.slug?.current;
	const tagsToRevalidate = documentType ? typeTagMap[documentType] : undefined;

	if (!tagsToRevalidate) {
		if (documentType && IGNORED_TYPES.has(documentType)) {
			return new Response("Revalidated (no-op)");
		}

		Sentry.captureMessage("Sanity webhook: unmapped document type", {
			level: "warning",
			extra: { documentType },
		});
		return new Response("Revalidated (no-op)");
	}

	tagsToRevalidate.forEach(tag => revalidateTag(tag, { expire: 0 }));

	if (documentType === "work" && slug) {
		revalidateTag(workTag(slug), { expire: 0 });
	}

	return new Response("Revalidated");
}
