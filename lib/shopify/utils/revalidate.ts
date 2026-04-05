import crypto from "crypto";
import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import "server-only";
import { TAGS } from "@/lib/constants";

const ok = () => NextResponse.json({ status: 200 });

async function verifyHmac(req: NextRequest, body: string): Promise<boolean> {
	const hmacHeader = (await headers()).get("x-shopify-hmac-sha256");
	if (!hmacHeader || !process.env.SHOPIFY_WEBHOOK_SECRET) return false;

	const digest = crypto
		.createHmac("sha256", process.env.SHOPIFY_WEBHOOK_SECRET)
		.update(body, "utf8")
		.digest("base64");

	return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(hmacHeader));
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
	const body = await req.text();

	const isValid = await verifyHmac(req, body);
	if (!isValid) return ok();

	const topic = (await headers()).get("x-shopify-topic") ?? "unknown";
	const payload = JSON.parse(body) as { id?: number; handle?: string };

	const collectionWebhooks = ["collections/create", "collections/delete", "collections/update"];
	const productWebhooks = ["products/create", "products/delete", "products/update"];
	const discountWebhooks = ["discounts/create", "discounts/update", "discounts/delete"];

	if (collectionWebhooks.includes(topic)) {
		revalidateTag(TAGS.collections, { expire: 0 });
		if (payload.handle) {
			revalidateTag(`collection-${payload.handle}`, { expire: 0 });
		}
	} else if (productWebhooks.includes(topic)) {
		revalidateTag(TAGS.products, { expire: 0 });
		revalidateTag(TAGS.collections, { expire: 0 });
		if (payload.handle) {
			revalidateTag(`product-${payload.handle}`, { expire: 0 });
		}
	} else if (discountWebhooks.includes(topic)) {
		revalidateTag(TAGS.discounts, { expire: 0 });
	}

	return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
