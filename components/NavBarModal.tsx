import FullscreenModal from "./FullScreenModal";
import NavBarMenu from "./NavBarMenu";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function NavBarModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<FullscreenModal onCloseAction={onCloseAction} open={open} closeOn="sm">
			<NavBarMenu />
		</FullscreenModal>
	);
}
