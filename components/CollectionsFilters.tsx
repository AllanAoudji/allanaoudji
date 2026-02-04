import { cn } from "@/lib/utils";
import Filter from "./Filter";

type Props = {
	responsive?: boolean;
};

export default function CollectionsFilters({ responsive = false }: Readonly<Props>) {
	return (
		<div className={cn({ "hidden lg:block": !responsive }, "col-span-1")}>
			<Filter className="mb-16" type="collections" />
			<Filter type="ordering" />
		</div>
	);
}
