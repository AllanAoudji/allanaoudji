import { IconLoader2 } from "@tabler/icons-react";

type Props = {
	isLoading: boolean;
};

export default function InfiniteSpinner({ isLoading }: Readonly<Props>) {
	if (!isLoading) return null;

	return (
		<div className="flex justify-center pt-12">
			<IconLoader2 size={32} className="text-quaternary animate-spin" />
		</div>
	);
}
