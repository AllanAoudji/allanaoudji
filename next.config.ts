import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	cacheComponents: true,
	images: {
		remotePatterns: [
			{ hostname: "http://cdn.sanity.io|cdn.sanity.io" },
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
