import { IconExclamationMark } from "@tabler/icons-react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import { cn } from "@/lib/utils";
import ProductVariant from "@/types/productVariant";

type Props = {
	className?: string;
	finalVariant: ProductVariant | undefined;
};

export default function ProductSingleBuyControlsCallbackMessage({
	className,
	finalVariant,
}: Readonly<Props>) {
	const { productMessage } = useCartActions();

	if (!finalVariant || !productMessage || productMessage.id !== finalVariant.id) {
		return null;
	}

	return (
		<div className={cn("flex items-center gap-4 border p-4", className)}>
			<div
				className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-bold", {
					"bg-danger": productMessage.type === "error",
					"bg-warning": productMessage.type === "warning",
				})}
			>
				<IconExclamationMark
					className={cn({
						"text-primary": productMessage.type === "error",
						"text-secondary": productMessage.type === "warning",
					})}
					size={20}
				/>
			</div>
			<div>
				<p className="text-sm">{productMessage.message}</p>
			</div>
		</div>
	);
}
