import { Metadata } from "next";

export const metadata: Metadata = {
	manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
