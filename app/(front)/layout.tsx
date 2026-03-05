import type { Metadata } from "next";
import { Suspense } from "react";
import { CartFormProvider } from "@/lib/contexts/cartForm-context";
import { LightboxProvider } from "@/lib/contexts/lightbox-context";
import CartDispenser from "@/components/CartDispenser";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="font-gopher bg-primary text-quaternary flex h-screen flex-col justify-between antialiased">
				<Suspense fallback={<div>...loading</div>}>
					<LightboxProvider>
						<CartFormProvider>
							<CartDispenser>
								<header className="bg-primary fixed start-0 top-0 z-20 w-full">
									<NavBar />
								</header>
								<main className="mb-auto pt-20">{children}</main>
							</CartDispenser>
						</CartFormProvider>
					</LightboxProvider>
				</Suspense>
				<Footer />
			</body>
		</html>
	);
}

// TODO:
// Set logic for warning/error message when UPDATE/DELETE cart.line
// Show error/warning message on cart UI
// Show title and price on "you may like..." products
// Show second image (if exist) when hover product link
// Instagram 6 last posts
// Change navmodal style
// Add same header navigation animation to contact part
// Add same header navigation animation to shop collection
// Add same header navigation animation to footer header
// Restyle cart modal (border not working anymore)
// Add same header navigation animation to cart modal's "continuer les achats" button
// Navbar modal "panier" link = add quantity like panier^22

// Create logo large
