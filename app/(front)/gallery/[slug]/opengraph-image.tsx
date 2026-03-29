import { ImageResponse } from "next/og";
import { getWork } from "@/studio/lib/queries";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const { data } = await getWork(slug);

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				backgroundColor: "#000",
			}}
		>
			{data?.mainImage?.url && (
				<img
					src={data.mainImage.url}
					alt={data.mainImage.alt ?? data.title ?? ""}
					style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }}
				/>
			)}
			<div
				style={{
					position: "absolute",
					bottom: 48,
					left: 48,
					color: "#fff",
					fontSize: 56,
					fontWeight: 700,
				}}
			>
				{data?.title}
			</div>
			<div
				style={{
					position: "absolute",
					bottom: 48,
					right: 48,
					color: "rgba(255,255,255,0.6)",
					fontSize: 24,
				}}
			>
				Allan Aoudji
			</div>
		</div>,
		size,
	);
}
