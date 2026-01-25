import type { Metadata } from "next";
import { Suspense } from "react";
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
						<CartDispenser>
							<header className="bg-primary border-b-quaternary fixed start-0 top-0 z-20 w-full border-b-2">
								<NavBar />
							</header>
							<main className="mb-auto pt-20">{children}</main>
						</CartDispenser>
					</LightboxProvider>
				</Suspense>
				<Footer />
			</body>
		</html>
	);
}
