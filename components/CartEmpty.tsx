"use client";

import Link from "next/link";
import { useModal } from "@/lib/contexts/modal-context";
import CartEmptyPopularProducts from "./CartEmptyPopularProducts";
import CartHeader from "./CartHeader";

export default function CartEmpty() {
	const { closeModal } = useModal();

	return (
		<div className="flex h-dvh flex-col">
			<CartHeader />
			<div className="flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4">
				<CartEmptyPopularProducts />
				<Link className="CTA mt-12" href="/collections" onClick={closeModal}>
					Continuez les achats
				</Link>
			</div>
		</div>
	);
}
