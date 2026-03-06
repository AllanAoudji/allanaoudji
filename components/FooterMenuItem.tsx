import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
	href: string;
	title: string;
};

export default function FooterMenuItem({ href, title }: Readonly<Props>) {
	return (
		<li className="block">
			<Link
				className={cn(
					"flex items-center justify-center px-2 text-xs font-black uppercase",
					"group-hover:[&_span]:opacity-25 hover:[&_span]:opacity-100!",
					"group-hover:[&_span]:after:origin-right group-hover:[&_span]:after:scale-x-0 hover:[&_span]:after:origin-left hover:[&_span]:after:scale-x-100",
				)}
				href={href}
			>
				<span
					className={cn(
						"relative pb-1 transition-opacity duration-300",
						"after:bg-quaternary after:absolute after:bottom-0 after:left-0 after:h-px after:w-full",
						"after:ease after:transition-transform after:duration-700 after:will-change-transform",
						"after:origin-right after:scale-x-0",
					)}
				>
					{title}
				</span>
			</Link>
		</li>
	);
}
