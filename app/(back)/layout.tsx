import "easymde/dist/easymde.min.css";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Studio | Allan Aoudji",
	robots: {
		index: false,
		follow: false,
	},
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
