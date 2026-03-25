import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline'",
							"frame-src 'self'",
							"child-src 'self'",
							"worker-src 'self' blob:",
							"connect-src 'self' https://use.typekit.net https://p.typekit.net",
							"style-src 'self' 'unsafe-inline' https://use.typekit.net https://p.typekit.net",
							"font-src 'self' https://use.typekit.net https://p.typekit.net",
							"img-src 'self' data: https:",
						].join("; "),
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
