"use client";

import CollectionsFilter from "./CollectionsFilter";
import CollectionsFilterModalHeader from "./CollectionsFilterModalHeader";
import DrawerModal from "./DrawerModal";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function CollectionsFiltersModal({ onCloseAction, open }: Readonly<Props>) {
	return (
		<DrawerModal className="w-xl max-w-screen" onCloseAction={onCloseAction} open={open}>
			<div className="flex h-screen flex-col">
				<CollectionsFilterModalHeader />
				<CollectionsFilter
					className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-8"
					type="collections"
				/>
			</div>
		</DrawerModal>
	);
}
