import { ImageResponse } from "next/og";
import { getWork } from "@/studio/lib/queries";

export const contentType = "image/jpeg";
export const size = { width: 1200, height: 630 };

export default async function GallerySingleOGImage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const { data } = await getWork(slug);

	if (!data) {
		return new ImageResponse(
			<img
				src={`${process.env.NEXT_PUBLIC_SITE_URL}/images/og-default.jpg`}
				width={1200}
				height={630}
				alt="default opengraph image"
			/>,
			size,
		);
	}

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
			{data.mainImage?.url && (
				<img
					alt={data.mainImage.alt ?? data.title ?? ""}
					src={data.mainImage.url}
					style={{ height: "100%", objectFit: "cover", opacity: 0.7, width: "100%" }}
				/>
			)}
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
				{data.title}
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
