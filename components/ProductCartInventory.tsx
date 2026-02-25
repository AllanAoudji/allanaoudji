import { cn } from "@/lib/utils";
import VariantInventory from "@/types/VariantInventory";

type Props = {
	className?: string;
	variantInventory?: VariantInventory;
};

export default function ProductCartInventory({ className, variantInventory }: Readonly<Props>) {
	if (!variantInventory || !variantInventory.inventoryTracked) {
		return null;
	}

	return (
		<p className={cn("text-sm", className)}>
			<span className="italic">{variantInventory.inventoryQuantity}</span> en stock
		</p>
	);
}
