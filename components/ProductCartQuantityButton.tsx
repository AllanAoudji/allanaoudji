import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type Props = {
	children: React.ReactNode;
	disable: boolean;
	onClick: MouseEventHandler<HTMLButtonElement>;
	size?: number;
};

export default function ProductCartQuantityButton({
	children,
	disable,
	onClick,
	size = 10,
}: Readonly<Props>) {
	return (
		<button
			className={cn("text-xl font-bold", `h-${size} w-${size}`, {
				"font-normal opacity-50": disable,
			})}
			disabled={disable}
			onClick={onClick}
		>
			{children}
		</button>
	);
}
