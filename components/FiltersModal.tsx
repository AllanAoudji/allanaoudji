import CollectionsFilters from "./CollectionsFilters";
import DrawerModal from "./DrawerModal";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function FiltersModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<DrawerModal onCloseAction={onCloseAction} open={open} position="left">
			<CollectionsFilters />
		</DrawerModal>
	);
}
