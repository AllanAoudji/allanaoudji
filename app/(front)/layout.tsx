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
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
	title: {
		default: "Allan Aoudji",
		template: "%s | Allan Aoudji",
	},
	description: "Allan Aoudji | graphiste & illustrateur — prints, affiches et créations originales.",
	openGraph: {
		siteName: "Allan Aoudji",
		locale: "fr_FR",
		type: "website",
		images: [{ url: "/og-default.jpg", width: 1200, height: 630 }], // ← image par défaut
	},
	twitter: {
		card: "summary_large_image",
		creator: "@AllanAoudji",
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr_FR">
			<body className="font-gopher bg-primary text-secondary antialiased">
				<Suspense fallback={<SplashScreen />}>
					<ScrollReset />
					<LocalShopifyDispenser>
						<CartDispenser>
							<div className="flex min-h-screen flex-col">
								<ModalProvider>
									<header className="bg-primary fixed start-0 top-0 z-20 w-full">
										<NavBar />
									</header>

									<CartActionsProvider>
										<LightboxProvider>
											<main className="mt-header flex-1">
												{children}
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
							</div>
						</CartDispenser>
					</LocalShopifyDispenser>
				</Suspense>
			</body>
		</html>
	);
}

// TODO:
// ----- Editorial -----
// Utiliser le tutoiement
// Point à la fin des phrases, espace insécable, etc.
// Ajouter une image public/og-default.jpg (1200×630) comme fallback pour les pages sans OG image dynamique.

// ----- Shopify -----
// export default function FreeShippingBanner() {
//   return <p>Livraison gratuite à partir de {threshold} €</p>;
// }
// revalidate

// ----- Boutique logic -----
// Avoir un moyen de enable/disable la boutique
// Et configurer le shop avec surement les frais de ports à afficher quelque part
// Ajouter
// const threshold = process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD;

// Quand le site est en ligne
// Google Search Console — soumettez votre sitemap une fois déployé. C'est gratuit et indispensable pour suivre l'indexation.
// Vérification du rendu — utilisez opengraph.xyz pour tester que vos OG images s'affichent correctement sur les réseaux sociaux.
