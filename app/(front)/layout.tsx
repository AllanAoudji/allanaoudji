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
		creator: process.env.NEXT_TWITTER_CREATOR || "@allan_aoudji",
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

// ---------------
// Quand le site est en ligne
// Google Search Console — soumettez votre sitemap une fois déployé. C'est gratuit et indispensable pour suivre l'indexation.
// Vérification du rendu — utilisez opengraph.xyz pour tester que vos OG images s'affichent correctement sur les réseaux sociaux.

// Côté Shopify Dashboard — c'est là où tu dois vérifier :
// Aller dans Settings → Notifications → Webhooks
// Créer un webhook pour chaque topic (products/update, collections/update, etc.)
// URL : https://ton-domaine.com/api/revalidate/shopify
// Copier le Webhook Secret généré → SHOPIFY_WEBHOOK_SECRET dans ton .env

// Dans ton dashboard Sanity sur sanity.io :
// Pour le SANITY_WEBHOOK_SECRET → API → Webhooks → créer un webhook → tu définis toi-même le secret lors de la création, tu le copies dans ton .env.
// Pour le serverToken → API → Tokens → "Add API token" → nom au choix → permissions Viewer suffisent pour du read-only → tu copies le token généré dans ton .env comme SANITY_API_READ_TOKEN ou selon comment tu l'as nommé dans ton env.server.ts.

// Resend — tu dois ajouter et vérifier ton domaine allanaoudji.com dans le dashboard Resend pour pouvoir envoyer depuis une adresse personnalisée.

// ----- plus tard -----
// deal avec console.error
