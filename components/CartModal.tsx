import Cart from "./Cart";
import DrawerModal from "./DrawerModal";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function CartModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<DrawerModal onCloseAction={onCloseAction} open={open}>
			<Cart />
		</DrawerModal>
	);
}
