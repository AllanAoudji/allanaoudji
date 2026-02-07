import { Suspense } from "react";
import { ProductProvider } from "@/lib/contexts/product-context";

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<ProductProvider>
			<div className="padding-container section-container">
				<Suspense fallback={<div>...loading</div>}>{children}</Suspense>
			</div>
		</ProductProvider>
	);
}
