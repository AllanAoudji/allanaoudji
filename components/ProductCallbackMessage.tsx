import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import ProductVariant from "@/types/productVariant";

type Props = {
	className?: string;
	finalVariant: ProductVariant | undefined;
};

export default function ProductCallbackMessage({ className, finalVariant }: Readonly<Props>) {
	const { productMessage } = useCartActions();

	if (!productMessage || !finalVariant || productMessage.id !== finalVariant.id) {
		return null;
	}

	return (
		<div className={cn("flex items-center gap-4 border p-4", className)}>
			<div
				className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold", {
					"bg-danger": productMessage.type === "error",
					"bg-amber-300": productMessage.type === "warning",
				})}
			>
				<p>!</p>
			</div>
			<div>
				<p className="text-sm">{productMessage.message}</p>
			</div>
		</div>
	);
}
