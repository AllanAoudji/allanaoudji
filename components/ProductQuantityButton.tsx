"use client";

import { useState } from "react";

// TODO:
// Remove trailing zeros from input
// Prevent negative numbers
// Prevent floating point numbers

export default function ProductQuantityButton() {
	const [quantity, setQuantity] = useState<number | string>(1);

	const increment = () => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				return prev + 1;
			}
			return prev;
		});
	};
	const decrement = () => {
		setQuantity(prev => {
			if (typeof prev === "number") {
				return prev - 1;
			}
			return prev;
		});
	};
	return (
		<div>
			<h4>Quantité</h4>
			<button onClick={decrement}>-</button>
			<input
				onChange={e => {
					if (e.target.value === "") {
						setQuantity("");
						return;
					}
					setQuantity(Number(e.target.value));
				}}
				type="number"
				value={quantity}
			/>
			<button onClick={increment}>+</button>
		</div>
	);
}
