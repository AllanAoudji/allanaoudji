import Link from "next/link";

type Props = {
	href: string;
	title: string;
};

export default function WorkSectionItem({ href, title }: Readonly<Props>) {
	return (
		<Link href={`/gallery/works/${href}`}>
			<h2>{title}</h2>
			<div className="bg-secondary aspect-3/2 w-full" />
		</Link>
	);
}
