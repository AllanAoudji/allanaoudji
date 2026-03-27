import { IconProps } from "@tabler/icons-react";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	icon: React.ComponentType<IconProps>;
	"aria-label": string;
};

export default function LightBoxButton({
	className,
	onClick,
	icon: Icon,
	"aria-label": ariaLabel,
}: Readonly<Props>) {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			className={cn(
				"bg-tertiary/75 absolute z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
				className,
			)}
			onClick={onClick}
		>
			<Icon className="text-secondary" aria-hidden="true" />
		</button>
	);
}
