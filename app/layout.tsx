import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Menu from "@/components/NavBar";
import "./globals.css";

export const metadata: Metadata = {
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="font-gopher bg-primary text-quaternary flex h-screen flex-col justify-between antialiased">
				<header className="bg-primary border-b-quaternary fixed start-0 top-0 z-20 w-full border-2">
					<Menu />
				</header>
				<main className="padding-container mb-auto pt-20">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
