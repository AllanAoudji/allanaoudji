import type { Metadata } from "next";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { Suspense } from "react";
import { LightboxProvider } from "@/lib/contexts/lightbox-context";
import { ModalProvider } from "@/lib/contexts/modal-context";
import CartDispenser from "@/components/CartDispenser";
import Footer from "@/components/Footer";
import LocalShopifyDispenser from "@/components/LocalShopifyDispenser";
import Modals from "@/components/Modals";
import NavBar from "@/components/NavBar";
import { ScrollReset } from "@/components/ScrollReset";
import SectionError from "@/components/SectionError";
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
				<ErrorBoundary errorComponent={SectionError}>
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
				</ErrorBoundary>
			</body>
		</html>
	);
}

// TODO:
// Contact page
// utiliser applyFrenchTypography sur sanity.work.text
// utiliser des icones pour la lightbox et l'animer
// Utiliser une icone à la place du chargement d'infinite scroll pour gallery et products
// Empty works/gallery produtcs/sanity pages/cart recommendations
// Refactor suspense components => Block de composant titre/sou-titre/image horizontal/image vertical/etc
// retravailler les fallbacks de suspense de textes, pas fan du rendu
// retravailler les messages de contenus vide => pas de works/pas de produits/page about vide, etc
// utilisation de liquify image pour les portabletext (about/CGV/etc)
// normaliser les page
//  - layout -> errorBoundary/suspense
//  - page -> await datas
//  - Container -> UI
