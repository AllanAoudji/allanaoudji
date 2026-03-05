import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
};

export default function Logo({ className }: Readonly<Props>) {
	return (
		<div className={cn("flex", className)}>
			<Link className={"block"} href={"/"}>
				<Image
					alt={"logo"}
					className="h-20 w-auto py-6"
					height={1419}
					src={"/images/logo.png"}
					width={762}
				/>
			</Link>
		</div>
	);
}
