import Link from "next/link";

type Props = {
	href: string;
	children: React.ReactNode;
};

export default function IssueLink({ children, href }: Readonly<Props>) {
	return (
		<Link
			className="hover:bg-secondary hover:text-primary border-secondary border px-12 py-2 text-center text-xs tracking-widest uppercase transition-colors"
			href={href}
		>
			{children}
		</Link>
	);
}
