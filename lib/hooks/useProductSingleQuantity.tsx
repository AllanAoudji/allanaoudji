import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import VariantInventory from "@/types/VariantInventory";
import ProductVariant from "@/types/productVariant";

type Args = {
	variants: ProductVariant[];
	finalVariantInventory?: VariantInventory;
};

const useProductSingleQuantity = ({ variants, finalVariantInventory }: Args) => {
	const [quantity, setQuantity] = useState<number | "">(1);

	const disableDecrementQuantity = useMemo(() => {
		return (
			(!finalVariantInventory && variants.length > 1) ||
			typeof quantity !== "number" ||
			(typeof quantity === "number" && quantity <= 1)
		);
	}, [quantity, finalVariantInventory, variants]);

	const disableIncrementQuantity = useMemo(() => {
		return (
			(!finalVariantInventory && variants.length > 1) ||
			typeof quantity !== "number" ||
			(!!finalVariantInventory &&
				finalVariantInventory.inventoryTracked &&
				typeof quantity === "number" &&
				quantity >= finalVariantInventory.inventoryQuantity)
		);
	}, [finalVariantInventory, quantity, variants]);

	const finalQuantity = useMemo(() => {
		if (typeof quantity === "number") {
			return quantity;
		}
		return 1;
	}, [quantity]);

	const decrementQuantity = useCallback(() => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				const newQuantity = prev - 1;
				if (newQuantity <= 0) {
					return prev;
				}
				if (
					!finalVariantInventory ||
					!finalVariantInventory.inventoryTracked ||
					finalVariantInventory.inventoryQuantity >= newQuantity
				) {
					return newQuantity;
				}
				return finalVariantInventory.inventoryQuantity;
			}
			return 1;
		});
	}, [finalVariantInventory]);

	const incrementQuantity = useCallback(() => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				const newQuantity = prev + 1;
				if (
					!finalVariantInventory ||
					!finalVariantInventory.inventoryTracked ||
					finalVariantInventory.inventoryQuantity >= newQuantity
				) {
					return newQuantity;
				}
				return prev;
			}
			return 1;
		});
	}, [finalVariantInventory]);

	const onBlurQuantity = useCallback(() => {
		setQuantity(prev => {
			if (prev === "") {
				return 1;
			}
			if (typeof prev === "number") {
				if (prev <= 0 || !Number.isInteger(prev)) {
					return 1;
				}
				if (
					finalVariantInventory &&
					finalVariantInventory.inventoryTracked &&
					finalVariantInventory.inventoryQuantity < prev
				) {
					return finalVariantInventory.inventoryQuantity;
				}
				return prev;
			}
			return 1;
		});
	}, [finalVariantInventory]);

	const onChangeQuantity = useCallback<ChangeEventHandler<HTMLInputElement>>(
		e => {
			if (e.target.value === "") {
				setQuantity("");
				return;
			}
			const newQuantity = Number(e.target.value);
			if (isNaN(newQuantity) || newQuantity < 0 || !Number.isInteger(newQuantity)) {
				setQuantity(1);
				return;
			}
			if (
				finalVariantInventory &&
				finalVariantInventory.inventoryTracked &&
				finalVariantInventory.inventoryQuantity < newQuantity
			) {
				setQuantity(finalVariantInventory.inventoryQuantity);
				return;
			}
			setQuantity(newQuantity);
		},
		[finalVariantInventory],
	);

	const resetQuantity = useCallback(() => {
		setQuantity(1);
	}, []);

	return {
		finalQuantity,
		disableDecrementQuantity,
		disableIncrementQuantity,
		decrementQuantity,
		incrementQuantity,
		onBlurQuantity,
		onChangeQuantity,
		resetQuantity,
		quantity,
	};
};

export default useProductSingleQuantity;
