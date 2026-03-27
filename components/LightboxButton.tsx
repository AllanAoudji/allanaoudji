import { IconProps } from "@tabler/icons-react";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	onClick?: MouseEventHandler<HTMLDivElement>;
	icon: React.ComponentType<IconProps>;
};

export default function LightBoxButton({ className, onClick, icon: Icon }: Readonly<Props>) {
	return (
		<div
			className={cn(
				"bg-tertiary/75 absolute z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
				className,
			)}
			onClick={onClick}
		>
			<Icon className="text-secondary" />
		</div>
	);
}
