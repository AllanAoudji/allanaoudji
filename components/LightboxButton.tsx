import { IconProps } from "@tabler/icons-react";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

type Props = {
	"aria-label": string;
	className?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	icon: React.ComponentType<IconProps>;
};

export default function LightBoxButton({
	className,
	onClick,
	icon: Icon,
	"aria-label": ariaLabel,
}: Readonly<Props>) {
	return (
		<button
			aria-label={ariaLabel}
			className={cn(
				"bg-tertiary/75 absolute z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
				className,
			)}
			onClick={onClick}
			type="button"
		>
			<Icon aria-hidden="true" className="text-secondary" />
		</button>
	);
}
