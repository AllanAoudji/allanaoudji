import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Allan Aoudji",
		short_name: "Allan Aoudji",
		description:
			"Allan Aoudji | graphiste & illustrateur — prints, affiches et créations originales.",
		start_url: "/",
		display: "standalone",
		background_color: "#f1f3f7",
		theme_color: "#192f40",
		icons: [
			{
				src: "/images/icon-192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/images/icon-512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
	};
}
