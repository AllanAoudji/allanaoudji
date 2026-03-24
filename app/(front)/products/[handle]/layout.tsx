import { ProductProvider } from "@/lib/contexts/product-context";

export default function ProductSingleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<ProductProvider>
			<div className="padding-container vertical-padding">{children}</div>
		</ProductProvider>
	);
}
