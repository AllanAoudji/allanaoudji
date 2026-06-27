import "server-only";
import { ensureEndWithout, ensureStartWith } from "@/lib/utils";

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN
	? ensureStartWith(ensureEndWithout(process.env.SHOPIFY_STORE_DOMAIN, "/"), "https://")
	: "";

const CLIENT_ID = process.env.SHOPIFY_ADMIN_CLIENT_ID!;
const CLIENT_SECRET = process.env.SHOPIFY_ADMIN_CLIENT_SECRET!;

type CachedToken = {
	accessToken: string;
	expiresAt: number; // timestamp en ms
};

let cachedToken: CachedToken | null = null;

// Marge de sécurité avant expiration réelle (en ms)
const EXPIRY_BUFFER_MS = 60 * 1000; // 1 minute

export async function getAdminAccessToken(): Promise<string> {
	const now = Date.now();

	if (cachedToken && cachedToken.expiresAt - EXPIRY_BUFFER_MS > now) {
		return cachedToken.accessToken;
	}

	const response = await fetch(`${DOMAIN}/admin/oauth/access_token`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: "client_credentials",
		}),
	});

	if (!response.ok) {
		const text = await response.text().catch(() => "(unreadable body)");
		throw new Error(`Failed to obtain Shopify admin access token: ${response.status} — ${text}`);
	}

	const data: { access_token: string; expires_in: number } = await response.json();

	cachedToken = {
		accessToken: data.access_token,
		expiresAt: Date.now() + data.expires_in * 1000,
	};

	return cachedToken.accessToken;
}
