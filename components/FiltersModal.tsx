import DrawerModal from "./DrawerModal";
import Filters from "./Filters";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function FiltersModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<DrawerModal onCloseAction={onCloseAction} open={open} position="left">
			<Filters />
		</DrawerModal>
	);
}
