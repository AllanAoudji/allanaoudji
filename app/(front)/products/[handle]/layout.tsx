import { ProductProvider } from "@/lib/contexts/product-context";

type Props = {
	children: React.ReactNode;
};

export default function ProductSingleLayout({ children }: Readonly<Props>) {
	return (
		<ProductProvider>
			<div className="padding-container vertical-padding">{children}</div>
		</ProductProvider>
	);
}
