import FullscreenModal from "./FullScreenModal";
import NavBarMenu from "./NavBarMenu";
import NavBarModalHeader from "./NavBarModalHeader";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function NavBarModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<FullscreenModal
			onCloseAction={onCloseAction}
			open={open}
			className="flex flex-col items-stretch justify-between"
			closeOn="sm"
		>
			<NavBarModalHeader />
			<NavBarMenu asHome={true} className="padding-container pb-20" color="light" type="vertical" />
		</FullscreenModal>
	);
}
