import type { Metadata } from "next";
import { Suspense } from "react";
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
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="fr">
			<body className="font-gopher bg-primary text-quaternary antialiased">
				<Suspense fallback={<SplashScreen />}>
					<ScrollReset />
					<LocalShopifyDispenser>
						<ModalProvider>
							<CartDispenser>
								<LightboxProvider>
									<div className="flex min-h-screen flex-col">
										<header className="bg-primary fixed start-0 top-0 z-20 w-full">
											<NavBar />
										</header>

										<main className="mt-header flex-1">{children}</main>

										<Modals />
										<Footer />
									</div>
								</LightboxProvider>
							</CartDispenser>
						</ModalProvider>
					</LocalShopifyDispenser>
				</Suspense>
			</body>
		</html>
	);
}

// TODO:
// Contact page
// utiliser applyFrenchTypography sur sanity.work.text
// utiliser des icones pour la lightbox et l'animer
// Utiliser une icone à la place du chargement d'infinite scroll pour gallery et products
// utilisation de liquify image pour les portabletext (about/CGV/etc)
// Retravailler filters
// Référencements et optimisation shopify
// Change couleur
//  - primary => light
//  - secondary => dark
//  - tertiary => darker light (utiliser pour imageContainer/skeleton)
