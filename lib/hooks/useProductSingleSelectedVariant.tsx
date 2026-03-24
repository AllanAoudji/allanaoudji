import { useMemo } from "react";
import VariantInventory from "@/types/VariantInventory";
import ProductVariant from "@/types/productVariant";

interface Args {
	state: Record<string, string>;
	variants: ProductVariant[];
	variantsInventory: VariantInventory[];
}

const useProductSingleSelectedVariant = ({ state, variants, variantsInventory }: Args) => {
	const { finalVariant, finalVariantInventory } = useMemo(() => {
		// Trouve la variante correspondant au state ou prends la seule variante disponible
		const matchedVariant = variants.find(variant =>
			variant.selectedOptions.every(option => option.value === state[option.name.toLowerCase()]),
		);
		const finalVariant = matchedVariant || (variants.length === 1 ? variants[0] : undefined);

		const finalVariantInventory = finalVariant
			? variantsInventory.find(inv => inv.variantId === finalVariant.id)
			: undefined;

		return { finalVariant, finalVariantInventory };
	}, [state, variants, variantsInventory]);

	return { finalVariant, finalVariantInventory };
};

export default useProductSingleSelectedVariant;
