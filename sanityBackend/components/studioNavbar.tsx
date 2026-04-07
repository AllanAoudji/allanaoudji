"use client";

import { WarningOutlineIcon, EllipsisVerticalIcon, ActivityIcon } from "@sanity/icons";
import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuDivider,
	Spinner,
	useToast,
	Flex,
	Text,
} from "@sanity/ui";
import { ComponentProps, useState } from "react";

const ShopifyIcon = () => (
	<svg width="14" height="14" viewBox="0 0 109.5 124.5" fill="currentColor">
		<path d="M74.7 14.8s-1.4.4-3.7 1.1c-.4-1.3-1-2.8-1.8-4.4-2.6-5-6.5-7.7-11.1-7.7-.3 0-.6 0-1 .1-.1-.2-.3-.3-.4-.5-2-2.2-4.6-3.2-7.7-3.1-6 .2-12 4.5-16.8 12.2-3.4 5.4-6 12.2-6.7 17.5-6.9 2.1-11.7 3.6-11.8 3.7-3.5 1.1-3.6 1.2-4 4.5C9.4 40.7 0 116.3 0 116.3l75.6 13.1V14.6c-.3.1-.6.1-.9.2zm-17 5.2c-4 1.2-8.4 2.6-12.7 3.9 1.2-4.7 3.6-9.4 6.4-12.5 1.1-1.1 2.6-2.4 4.3-3.2 1.7 3.5 2.1 8.2 2 11.8zm-8.4-15.6c1.4 0 2.6.3 3.6.9-1.6.8-3.2 2.1-4.7 3.6-3.8 4.1-6.7 10.5-7.9 16.6-3.6 1.1-7.2 2.2-10.5 3.2 1.9-9.9 9.4-23.9 19.5-24.3zm-4.1 53.4c.4 6.4 17.3 7.8 18.3 22.9.7 11.9-6.3 20-16.4 20.6-12.2.8-18.9-6.4-18.9-6.4l2.6-11s6.7 5.1 12.1 4.7c3.5-.2 4.8-3.1 4.7-5.1-.5-8.4-14.3-7.9-15.2-21.7-.8-11.6 6.9-23.4 23.7-24.4 6.5-.4 9.8 1.2 9.8 1.2l-3.8 14.4s-4.3-2-9.4-1.6c-7.4.5-7.5 5.2-7.5 5.4zm29.4-36.9c0-3.3-.4-8-1.9-12 4.8.9 7.1 6.3 8.1 9.6-1.9.6-3.9 1.2-6.2 2.4z" />
		<path
			d="M77.7 128.9l31.8-7.9S96.1 23.5 96 22.5c-.1-1-.9-1.6-1.7-1.7-.8-.1-15.1-.3-15.1-.3s-8.7-8.4-12.1-11.7v120.1h10.6z"
			opacity="0.8"
		/>
	</svg>
);

const InstagramIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
	</svg>
);

const VercelIcon = () => (
	<svg width="14" height="14" viewBox="0 0 116 100" fill="currentColor">
		<path d="M57.5 0L115 100H0L57.5 0z" />
	</svg>
);

const ResendIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
		<path d="M0 0h11.374l7.103 9.733L25.6 0H36L19.337 20.08 36 40.96H24.627l-7.807-10.72-8.103 10.72H0l17.163-21.387z" />
	</svg>
);

const MetaIcon = () => (
	<svg width="14" height="14" viewBox="0 0 36 36" fill="currentColor">
		<path d="M18 3C9.716 3 3 9.716 3 18s6.716 15 15 15 15-6.716 15-15S26.284 3 18 3zm-3.5 10c1.5 0 2.5.8 3.5 2.2 1-1.4 2-2.2 3.5-2.2 2.5 0 4.5 2.5 4.5 6s-2 6-4.5 6c-1.5 0-2.5-.8-3.5-2.2-1 1.4-2 2.2-3.5 2.2C12 25 10 22.5 10 19s2-6 4.5-6z" />
	</svg>
);

const SanityIcon = () => (
	<svg width="14" height="14" viewBox="0 0 256 256" fill="currentColor">
		<path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm0 64c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm0 128c-26.5 0-50.2-12.1-66-31.1 16-10.4 35-16.9 66-16.9s50 6.5 66 16.9c-15.8 19-39.5 31.1-66 31.1z" />
	</svg>
);

const UpstashIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 8.5l-3 3-2-2-4 4H7l5-5 2 2 2-2h1.5z" />
	</svg>
);

const OVHIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
	</svg>
);

const GitHubIcon = () => (
	<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
		<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
	</svg>
);

// --- Liens externes groupés ---

const EXTERNAL_LINKS = [
	{
		group: "Boutique & Contenu",
		items: [
			{
				label: "Shopify",
				icon: <ShopifyIcon />,
				href: `https://admin.shopify.com/store/${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
			},
			{
				label: "Sanity",
				icon: <SanityIcon />,
				href: "https://www.sanity.io/organizations/o8boMh8Lu/project/dc5mgzll?orgId=o8boMh8Lu",
			},
			{
				label: "Meta Developer",
				icon: <MetaIcon />,
				href: "https://developers.facebook.com/apps/594072096815026/",
			},
			{
				label: "GitHub",
				icon: <GitHubIcon />,
				href: "https://github.com/AllanAoudji/allanaoudji",
			},
		],
	},
	{
		group: "Infrastructure",
		items: [
			{
				label: "Vercel",
				icon: <VercelIcon />,
				href: "https://vercel.com/allanaoudjis-projects/allanaoudji",
			},
			{
				label: "Upstash / Redis",
				icon: <UpstashIcon />,
				href: "https://console.upstash.com/redis/",
			},
			{
				label: "Resend",
				icon: <ResendIcon />,
				href: "https://resend.com/emails",
			},
			{
				label: "Sentry",
				icon: <WarningOutlineIcon />,
				href: "https://allan-aoudji.sentry.io/",
			},
			{
				label: "OVH",
				icon: <OVHIcon />,
				href: "https://manager.eu.ovhcloud.com",
			},
		],
	},
	{
		group: "Analytics",
		items: [
			{
				label: "Search Console",
				icon: <ActivityIcon />,
				href: "https://search.google.com/search-console/",
			},
		],
	},
];

type NavbarProps = ComponentProps<"div"> & {
	renderDefault: (_props: NavbarProps) => React.ReactElement;
};

export default function StudioNavbar(props: NavbarProps) {
	const [revalidating, setRevalidating] = useState(false);
	const toast = useToast();

	async function handleRevalidateInstagram() {
		setRevalidating(true);
		try {
			const res = await fetch("/api/revalidate/instagram", {
				method: "POST",
				headers: {
					"x-secret-token": process.env.NEXT_PUBLIC_REVALIDATE_SECRET!,
				},
			});

			if (!res.ok) throw new Error();
			toast.push({ status: "success", title: "Feed Instagram mis à jour ✓" });
		} catch {
			toast.push({ status: "error", title: "Erreur lors de la mise à jour" });
		} finally {
			setRevalidating(false);
		}
	}

	return (
		<div style={{ display: "flex", alignItems: "center", width: "100%" }}>
			<div style={{ flex: 1, minWidth: 0 }}>{props.renderDefault(props)}</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: "6px",
					paddingRight: "12px",
					flexShrink: 0,
				}}
			>
				<Button as="a" href="/" text="← Site" mode="ghost" tone="default" fontSize={1} paddingX={2} />

				<MenuButton
					button={<Button icon={EllipsisVerticalIcon} mode="ghost" tone="default" title="Services" />}
					id="studio-services-menu"
					menu={
						<Menu style={{ minWidth: "200px" }}>
							<MenuItem
								icon={revalidating ? <Spinner /> : <InstagramIcon />}
								text="Rafraîchir Instagram"
								disabled={revalidating}
								onClick={handleRevalidateInstagram}
							/>

							{EXTERNAL_LINKS.map(({ group, items }) => (
								<div key={group}>
									<MenuDivider />
									<div style={{ padding: "12px" }}>
										<Text
											size={0}
											muted
											weight="semibold"
											style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
										>
											{group}
										</Text>
									</div>
									{items.map(({ label, icon, href }) => (
										<MenuItem
											key={label}
											icon={<Flex align="center">{icon}</Flex>}
											text={label}
											as="a"
											href={href}
											target="_blank"
											rel="noopener noreferrer"
										/>
									))}
								</div>
							))}
						</Menu>
					}
					placement="bottom-end"
					popover={{ portal: true }}
				/>
			</div>
		</div>
	);
}
