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
					<LocalShopifyDispenser>
						<CartDispenser>
							<ModalProvider>
								<header className="bg-primary fixed start-0 top-0 z-20 w-full">
									<Suspense fallback={null}>
										<NavBar />
									</Suspense>
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

// TODO:
// ----- Editorial -----
// Utiliser le tutoiement
// Point à la fin des phrases, espace insécable, etc.
// Ajouter une image public/og-default.jpg (1200×630) comme fallback pour les pages sans OG image dynamique.
// default-collection.png

// ----- Shopify -----
// export default function FreeShippingBanner() {
//   return <p>Livraison gratuite à partir de {threshold} €</p>;
// }
// revalidate

// ----- Divers -----
// si home section contact est secondary, les couleurs du form doivent être alternés
// Sanity Work, image de preview du back ne fonctionne pas.
// Indiquer aussi si hidden === true
// focus:ring-secondary global
// Ajouter cursor error sur product single quantity button
// Changer la date footer 2026 - 2026
// Avec la fermeture du lightbox, le scroll est placer vers l'image cliqué si elle n'est pas dans la viewport.

// Quand le site est en ligne
// Google Search Console — soumettez votre sitemap une fois déployé. C'est gratuit et indispensable pour suivre l'indexation.
// Vérification du rendu — utilisez opengraph.xyz pour tester que vos OG images s'affichent correctement sur les réseaux sociaux.
// Ajouter le domaine dans les CORS de Sanity pour éviter les problèmes d'authentification côté client.
