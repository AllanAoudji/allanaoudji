import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { TAGS } from "@/lib/constants";

export async function revalidate(req: NextRequest): Promise<NextResponse> {
	// We always need to respond with a 200 status code to shopify,
	// otherwise it will continue to retry the request.

	const collectionWebhooks = ["collections/create", "collections/delete", "collections/update"];
	const productWebhooks = ["products/create", "products/delete", "products/update"];
	const topic = (await headers()).get("x-shopify-topic") || "unkown";
	const secret = req.nextUrl.searchParams.get("secret");
	const isCollectionUpdate = collectionWebhooks.includes(topic);
	const isProductUpdate = productWebhooks.includes(topic);

	if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
		return NextResponse.json({ status: 200 });
	}

	if (!isCollectionUpdate && !isProductUpdate) {
		return NextResponse.json({ status: 200 });
	}

	if (isCollectionUpdate) {
		revalidateTag(TAGS.collections, { expire: 0 });
	}

	if (isProductUpdate) {
		revalidateTag(TAGS.products, { expire: 0 });
	}

	return NextResponse.json({ status: 200, revalidate: true, now: Date.now() });
}
