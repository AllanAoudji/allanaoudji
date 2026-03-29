import type { NextConfig } from "next";

const sanityCSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com",
	"connect-src 'self' https://*.api.sanity.io wss://*.api.sanity.io https://core.sanity-cdn.com https://registry.npmjs.org",
	"style-src 'self' 'unsafe-inline' https://core.sanity-cdn.com",
	"font-src 'self' https://core.sanity-cdn.com",
	"img-src 'self' data: https: blob:",
	"frame-src 'self'",
	"worker-src 'self' blob:",
].join("; ");

const frontCSP = [
	"default-src 'self'",
	"script-src 'self' 'unsafe-inline'",
	"frame-src 'self'",
	"child-src 'self'",
	"worker-src 'self' blob:",
	"connect-src 'self' https://use.typekit.net https://p.typekit.net",
	"style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net",
	"font-src 'self' https://use.typekit.net https://p.typekit.net",
	"img-src 'self' data: https:",
].join("; ");

const nextConfig: NextConfig = {
	async headers() {
		return [
			// CSP permissive pour le studio
			{
				source: "/studio(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: sanityCSP,
					},
				],
			},
			// CSP stricte pour le reste du site
			{
				source: "/((?!studio).*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: frontCSP,
					},
				],
			},
		];
	},
	cacheComponents: true,
	images: {
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
