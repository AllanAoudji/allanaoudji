import FullscreenModal from "./FullScreenModal";
import NavBarMenu from "./NavBarMenu";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function NavBarModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<FullscreenModal
			className="flex flex-col items-stretch justify-end"
			closeOn="md"
			onCloseAction={onCloseAction}
			open={open}
		>
			<NavBarMenu asHome={true} className="padding-container pb-16" direction="column" />
		</FullscreenModal>
	);
}
