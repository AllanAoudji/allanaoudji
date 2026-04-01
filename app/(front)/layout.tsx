import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Suspense } from "react";
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
	openGraph: {
		images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
		locale: "fr_FR",
		siteName: "Allan Aoudji",
		type: "website",
	},
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
			<body className="font-gopher bg-primary text-secondary flex min-h-screen flex-col antialiased">
				<Suspense fallback={<SplashScreen />}>
					<LocalShopifyDispenser>
						<CartDispenser>
							<ModalProvider>
								<header className="bg-primary fixed start-0 top-0 z-20 w-full">
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
