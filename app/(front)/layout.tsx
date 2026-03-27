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
import "@/app/globals.css";

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
	title: {
		default: "Allan Aoudji",
		template: "%s | Allan Aoudji",
	},
	description: "Allan Aoudji | graphiste & illustrateur — prints, affiches et créations originales.",
	openGraph: {
		siteName: "Allan Aoudji",
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		creator: "@AllanAoudji",
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr_FR">
			<body className="font-gopher bg-primary text-quaternary antialiased">
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
											<main className="mt-header flex-1">{children}</main>
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
// ----- Styling -----
// utiliser applyFrenchTypography sur sanity.work.text
// utiliser des icones pour la lightbox et l'animer
// Utiliser une icone à la place du chargement d'infinite scroll pour gallery et products
// utilisation de liquify image pour les portabletext (about/CGV/etc)
// Retravailler filters
// Change couleur
//  - primary => light
//  - secondary => dark
//  - tertiary => darker light (utiliser pour imageContainer/skeleton)
// Galery/GalerySingle => Skeleton Title/Substitle, légèrement trop "haut" (de 0.5/1 point)

// ----- Sanity/Shopify optimization -----
// Update and optimize sanity
// Référencements sanity

// ----- Editorial -----
// Utiliser le tutoiement
// Point à la fin des phrases, espace insécable, etc.
