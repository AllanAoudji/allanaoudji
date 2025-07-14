import "easymde/dist/easymde.min.css";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Allan Aoudji",
	description: "Allan Aoudji | graphiste & illustrateur",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body className="antialiased">
				<main>{children}</main>
			</body>
		</html>
	);
}
