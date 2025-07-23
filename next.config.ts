import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: "http://cdn.sanity.io|cdn.sanity.io" },
			{
				protocol: "https",
				hostname: "*.cdninstagram.com",
				port: "",
			},
		],
	},
	experimental: {
		ppr: "incremental",
	},
};

export default nextConfig;
