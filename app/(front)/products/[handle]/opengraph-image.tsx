import { ImageResponse } from "next/og";
import { getProduct } from "@/lib/shopify";

export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default async function ProductOGImage({ params }: { params: Promise<{ handle: string }> }) {
	const { handle } = await params;
	const product = await getProduct(handle);

	if (!product) {
		return new ImageResponse(
			<img
				alt="image opengraph par default"
				src={`${process.env.NEXT_PUBLIC_SITE_URL}/images/og-default.jpg`}
				width={1200}
				height={630}
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
			{product.featuredImage && (
				<img
					alt=""
					src={product.featuredImage.url}
					style={{
						height: "100%",
						objectFit: "cover",
						objectPosition: "top",
						opacity: 0.7,
						width: "100%",
					}}
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
				{product.title}
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
