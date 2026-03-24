"use client";

import { useModal } from "@/lib/contexts/modal-context";
import { cn } from "@/lib/utils";
import CollectionsFilter from "./CollectionsFilter";
import DrawerModal from "./DrawerModal";

type Props = {
	onCloseAction: () => void;
	open: boolean;
};

export default function CollectionsFiltersModal({ onCloseAction, open }: Readonly<Props>) {
	const { closeModal } = useModal();

	return (
		<DrawerModal closeOn="sm" onCloseAction={onCloseAction} open={open} position="left">
			<div className="flex h-screen flex-col">
				<div className="px-4">
					<button
						className={cn(
							"text-quaternary h-header cursor-pointer pr-4 text-sm font-bold uppercase",
							"hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
						)}
						onClick={closeModal}
					>
						<span
							className={cn(
								"relative py-1 transition-opacity duration-300",
								"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
								"after:ease after:transition-transform after:duration-700 after:will-change-transform",
								"after:origin-right after:scale-x-0",
							)}
						>
							fermer
						</span>
					</button>
				</div>
				<div className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
					<CollectionsFilter direction="column" type="collections" />
				</div>
			</div>
		</DrawerModal>
	);
}
