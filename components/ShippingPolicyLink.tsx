import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function ShippingPolicyLink({ className }: Readonly<Props>) {
	return (
		<p className={cn("mt-1 text-xs font-normal", className)}>
			Taxe incluse.{" "}
			<Link
				href="/politique-expedition"
				className={cn(
					"text-secondary cursor-pointer py-1",
					"hover:[&_span]:after:origin-right hover:[&_span]:after:scale-x-0",
				)}
			>
				<span
					className={cn(
						"relative py-0.5 transition-opacity duration-300",
						"after:bg-secondary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-left after:scale-x-100",
					)}
				>
					Frais d&apos;expédition
				</span>
			</Link>{" "}
			et réductions calculés à l&apos;étape du paiement.{" "}
		</p>
	);
}
