"use client";

import { useCallback } from "react";
import { useCartActions } from "@/lib/contexts/cartActions-context";
import Cart from "./Cart";
import DrawerModal from "./DrawerModal";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function CartModal({ onCloseAction, open }: Readonly<Props>) {
	const { resetCartMessage } = useCartActions();

	const handleCloseAction = useCallback(() => {
		onCloseAction();
		resetCartMessage();
	}, [onCloseAction, resetCartMessage]);

	return (
		<DrawerModal className="w-xl max-w-screen" onCloseAction={handleCloseAction} open={open}>
			<Cart />
		</DrawerModal>
	);
}
