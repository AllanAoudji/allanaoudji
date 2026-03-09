import FullscreenModal from "./FullScreenModal";
import NavBarMenu from "./NavBarMenu";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function NavBarModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<FullscreenModal
			onCloseAction={onCloseAction}
			open={open}
			className="flex flex-col items-stretch justify-end"
			closeOn="sm"
		>
			<NavBarMenu asHome={true} className="padding-container pb-16" type="vertical" />
		</FullscreenModal>
	);
}
