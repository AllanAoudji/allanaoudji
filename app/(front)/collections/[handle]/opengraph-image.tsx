import { ImageResponse } from "next/og";
import { DEFAULT_COLLECTION_IMAGE } from "@/lib/constants";
import { getCollection } from "@/lib/shopify";
import { shopifyImageUrl } from "@/lib/utils";

export const contentType = "image/jpeg";
export const size = { width: 1200, height: 630 };

export default async function CollectionSingleOGImage({
	params,
}: {
	params: Promise<{ handle: string }>;
}) {
	const { handle } = await params;
	const collection = await getCollection(handle);

	if (!collection) {
		return new ImageResponse(
			<img
				alt="default opengraph image"
				src={`${process.env.NEXT_PUBLIC_SITE_URL}/images/og-collections.jpg`}
				width={1200}
				height={630}
			/>,
			size,
		);
	}

	const image = collection.image ?? DEFAULT_COLLECTION_IMAGE;

	return new ImageResponse(
		<div
			style={{
				backgroundColor: "#000",
				display: "flex",
				height: "100%",
				position: "relative",
				width: "100%",
			}}
		>
			<img
				alt=""
				src={shopifyImageUrl(image.url)}
				style={{ height: "100%", objectFit: "cover", opacity: 0.7, width: "100%" }}
			/>
			<div
				style={{
					bottom: 48,
					color: "#fff",
					fontSize: 56,
					fontWeight: 700,
					left: 48,
					position: "absolute",
				}}
			>
				{collection.title}
			</div>
			<div
				style={{
					bottom: 48,
					color: "rgba(255,255,255,0.6)",
					fontSize: 24,
					position: "absolute",
					right: 48,
				}}
			>
				Allan Aoudji
			</div>
		</div>,
		size,
	);
}
