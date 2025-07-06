import type { Metadata } from "next";
import Menu from "@/components/menu";
import "./globals.css";

export const metadata: Metadata = {
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="antialiased">
				<header>
					<Menu />
				</header>
				{children}
			</body>
		</html>
	);
}
