import { MouseEventHandler } from "react";

type Props = {
	onClick: MouseEventHandler<HTMLButtonElement> | undefined;
};

export default function IssueResetButton({ onClick }: Readonly<Props>) {
	return (
		<button
			className="hover:bg-secondary hover:text-primary border-secondary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
			onClick={onClick}
		>
			Réessayer
		</button>
	);
}
