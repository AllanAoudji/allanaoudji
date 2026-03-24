import { cn } from "@/lib/utils";
import VariantInventory from "@/types/VariantInventory";

type Props = {
	className?: string;
	variantInventory?: VariantInventory;
};

export default function ProductSingleBuyControlsInventory({
	className,
	variantInventory,
}: Readonly<Props>) {
	if (!variantInventory || !variantInventory.inventoryTracked) {
		return null;
	}

	return (
		<p className={cn("text-right text-sm", className)}>
			{variantInventory.inventoryQuantity} en stock
		</p>
	);
}
