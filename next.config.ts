import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = [
	"default-src 'self'",

	// scripts
	`script-src 'self' 'unsafe-inline' https://core.sanity-cdn.com https://sanity-cdn.com${
		isDev ? " 'unsafe-eval'" : ""
	}`,

	// APIs / fetch
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
	].join(" "),

	// styles
	[
		"style-src",
		"'self'",
		"'unsafe-inline'",
		"https://use.typekit.net",
		"https://p.typekit.net",
	].join(" "),

	// fonts
	["font-src", "'self'", "https://use.typekit.net", "https://p.typekit.net"].join(" "),

	// images
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

	// frames (Sanity preview important)
	["frame-src", "'self'", "https://*.sanity.io"].join(" "),

	"worker-src 'self' blob:",
	"child-src 'self'",

	// sécurité forte
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'self'",

	// amélioration sécurité HTTPS
	"upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
	reactStrictMode: false,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: csp,
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/collections",
				permanent: true, // 308 — meilleur pour le SEO
			},
		];
	},
	cacheComponents: true,
	images: {
		unoptimized: process.env.NODE_ENV === "development",
		dangerouslyAllowSVG: false,
		minimumCacheTTL: 60 * 60 * 24 * 7,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cdn.sanity.io",
			},
			{
				protocol: "https",
				hostname: "*.cdninstagram.com",
				port: "",
			},
			{
				protocol: "https",
				hostname: "cdn.shopify.com",
				pathname: "/s/files/**",
			},
		],
	},
};

export default nextConfig;
