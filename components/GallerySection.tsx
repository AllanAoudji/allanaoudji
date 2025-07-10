import GallerySectionItem from "@/components/GallerySectionItem";

type Props = {
	separator?: boolean;
};

type item = {
	id: number;
	href: string;
	title: string;
};

const ITEMS: item[] = [
	{
		id: 0,
		href: "sable-metallique",
		title: "sable métallique",
	},
	{
		id: 1,
		href: "linogravures",
		title: "linogravures",
	},
	{
		id: 2,
		href: "aquarelles",
		title: "aquarelles",
	},
];

export default function GallerySection({ separator }: Readonly<Props>) {
	return (
		<section
			className={`${separator && "section-separator"} section-container items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`}
		>
			{ITEMS.map(item => (
				<GallerySectionItem key={item.id} href={item.href} title={item.title} />
			))}
		</section>
	);
}
