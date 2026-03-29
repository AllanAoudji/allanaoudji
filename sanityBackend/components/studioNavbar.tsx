"use client";

import { ComponentProps } from "react";

const ShopifyIcon = () => (
	<svg width="20" height="20" viewBox="0 0 109.5 124.5" fill="currentColor">
		<path d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C9.4 40.7 0 116.3 0 116.3l75.6 13.1V14.6c-.3.1-.6.1-.9.2zm-17 5.2c-4 1.2-8.4 2.6-12.7 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.2 1.7 3.5 2.1 8.2 2 11.8zm-8.4-15.6c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.6-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2 1.9-9.9 9.4-23.9 19.5-24.3zm-4.1 53.4c.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.8-11.6 6.9-23.4 23.7-24.4 6.5-.4 9.8 1.2 9.8 1.2l-3.8 14.4s-4.3-2-9.4-1.6c-7.4.5-7.5 5.2-7.5 5.4zm29.4-36.9c0-3.3-.4-8-1.9-12 4.8.9 7.1 6.3 8.1 9.6-1.9.6-3.9 1.2-6.2 2.4z" />
		<path
			d="M77.7 128.9l31.8-7.9S96.1 23.5 96 22.5c-.1-1-.9-1.6-1.7-1.7-.8-.1-15.1-.3-15.1-.3s-8.7-8.4-12.1-11.7v120.1h10.6z"
			fill="currentColor"
			opacity="0.8"
		/>
	</svg>
);

type NavbarProps = ComponentProps<"div"> & {
	renderDefault: (_props: NavbarProps) => React.ReactElement;
};

export default function StudioNavbar(props: NavbarProps) {
	const shopifyUrl = `https://admin.shopify.com/store/${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`;

	return (
		<div
			style={{ display: "flex", alignItems: "center", width: "100%", justifyContent: "space-between" }}
		>
			<div style={{ flex: 1 }}>{props.renderDefault(props)}</div>
			<div style={{ display: "flex", alignItems: "center", gap: "8px", paddingRight: "16px" }}>
				{/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
				<a
					href="/"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "6px",
						padding: "6px 12px",
						borderRadius: "4px",
						fontSize: "13px",
						color: "white",
						textDecoration: "none",
						background: "rgba(255,255,255,0.15)",
					}}
				>
					← Site
				</a>
				<a
					href={shopifyUrl}
					target="_blank"
					rel="noopener noreferrer"
					style={{
						display: "flex",
						alignItems: "center",
						gap: "6px",
						padding: "6px 12px",
						borderRadius: "4px",
						fontSize: "13px",
						color: "white",
						textDecoration: "none",
						background: "#96bf48",
					}}
				>
					<ShopifyIcon />
					Shopify
				</a>
			</div>
		</div>
	);
}
