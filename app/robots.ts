export default function robots() {
	const base = process.env.NEXT_PUBLIC_SITE_URL;
	return {
		rules: { allow: "/", disallow: "/api/" },
		sitemap: `${base}/sitemap.xml`,
	};
}
