import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
import { DEFAULT_OG } from "@/lib/constants";
import { CartActionsProvider } from "@/lib/contexts/cartActions-context";
import { LightboxProvider } from "@/lib/contexts/lightbox-context";
import { ModalProvider } from "@/lib/contexts/modal-context";
import CartDispenser from "@/components/CartDispenser";
import Footer from "@/components/Footer";
import LocalShopifyDispenser from "@/components/LocalShopifyDispenser";
import Modals from "@/components/Modals";
import NavBar from "@/components/NavBar";
import { ScrollReset } from "@/components/ScrollReset";
import SplashScreen from "@/components/SplashScreen";
import StudioBar from "@/components/StudioBar";
import "@/app/globals.css";
import { SanityLive } from "@/studio/lib/live";

export const metadata: Metadata = {
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
	description: "Allan Aoudji | graphiste & illustrateur — prints, affiches et créations originales.",
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
	openGraph: { ...DEFAULT_OG, url: process.env.NEXT_PUBLIC_SITE_URL },
	title: {
		default: "Allan Aoudji",
		template: "%s | Allan Aoudji",
	},
	twitter: {
		card: "summary_large_image",
		creator: process.env.NEXT_PUBLIC_TWITTER_CREATOR || "@allan_aoudji",
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr-FR">
			<head>
				<link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="" />
				<link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="" />
				<link rel="dns-prefetch" href="https://use.typekit.net" />
				<link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
			</head>
			<body className="font-gopher bg-primary text-secondary flex min-h-dvh flex-col antialiased">
				<Suspense fallback={<SplashScreen />}>
					<LocalShopifyDispenser>
						<CartDispenser>
							<ModalProvider>
								<header className="bg-primary fixed inset-s-0 top-0 z-20 w-full">
									<NavBar />
								</header>
								<CartActionsProvider>
									<LightboxProvider>
										<main className="mt-header flex-1">
											{children}
											<Analytics />
											<SpeedInsights />
											<Suspense fallback={null}>
												<StudioBar />
											</Suspense>
											<SanityLive />
										</main>
									</LightboxProvider>
									<Modals />
								</CartActionsProvider>
							</ModalProvider>
							<Footer />
						</CartDispenser>
					</LocalShopifyDispenser>
				</Suspense>
				<Suspense fallback={null}>
					<ScrollReset />
				</Suspense>
			</body>
		</html>
	);
}
