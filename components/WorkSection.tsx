import WorkSectionItem from "@/components/WorkSectionItem";

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

export default function WorkSection() {
	return (
		<section className="section-container section-separator items-gap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
			{ITEMS.map(item => (
				<WorkSectionItem key={item.id} href={item.href} title={item.title} />
			))}
		</section>
	);
}
