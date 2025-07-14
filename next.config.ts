import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [{ hostname: "http://cdn.sanity.io|cdn.sanity.io" }],
	},
};

export default nextConfig;
