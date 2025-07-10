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
				<header>
					<Menu />
				</header>
				<main className="padding-container mb-auto">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
