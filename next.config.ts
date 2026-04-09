import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = [
	"default-src 'self'",

	`script-src 'self' 'unsafe-inline' https://core.sanity-cdn.com https://sanity-cdn.com https://va.vercel-scripts.com${
		isDev ? " 'unsafe-eval'" : ""
	}`,

	[
		"connect-src",
		"'self'",
		"https://*.api.sanity.io",
		"wss://*.api.sanity.io",
		"https://cdn.sanity.io",
		"https://core.sanity-cdn.com",
		"https://sanity-cdn.com",
		"https://cdn.shopify.com",
		"https://*.myshopify.com",
		"https://use.typekit.net",
		"https://p.typekit.net",
		"https://va.vercel-scripts.com",
		"https://vitals.vercel-insights.com",
	].join(" "),

	[
		"style-src",
		"'self'",
		"'unsafe-inline'",
		"https://use.typekit.net",
		"https://p.typekit.net",
	].join(" "),

	["font-src", "'self'", "https://use.typekit.net", "https://p.typekit.net"].join(" "),

	[
		"img-src",
		"'self'",
		"data:",
		"blob:",
		"https:",
		"https://cdn.sanity.io",
		"https://cdn.shopify.com",
		"https://*.cdninstagram.com",
	].join(" "),

	["frame-src", "'self'", "https://*.sanity.io"].join(" "),

	"worker-src 'self' blob:",
	"child-src 'self'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'self'",
	"upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
	reactStrictMode: true,
	experimental: {
		staleTimes: {
			dynamic: 0,
			static: 180,
		},
	},
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [{ key: "Content-Security-Policy", value: csp }],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/collections",
				permanent: true,
			},
		];
	},
	images: {
		unoptimized: isDev,
		dangerouslyAllowSVG: false,
		minimumCacheTTL: 60 * 60 * 24 * 7,
		remotePatterns: [
			{ protocol: "https", hostname: "cdn.sanity.io" },
			{ protocol: "https", hostname: "*.cdninstagram.com", port: "" },
			{ protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/**" },
		],
	},
};

export default withSentryConfig(nextConfig, {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	silent: true,
	tunnelRoute: "/monitoring",
	widenClientFileUpload: true,
	sourcemaps: {
		disable: false,
		deleteSourcemapsAfterUpload: true,
	},
	webpack: {
		treeshake: {
			removeDebugLogging: true,
		},
	},
});
