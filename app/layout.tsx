import type { Metadata } from "next";
import Footer from "@/components/footer";
import Menu from "@/components/menu";
import "./globals.css";

export const metadata: Metadata = {
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="flex h-screen flex-col justify-between antialiased">
				<header>
					<Menu />
				</header>
				<main className="mb-auto h-10">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
