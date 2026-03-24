import CollectionsFilter from "@/components/CollectionsFilter";
import CollectionsFiltersSideBarButton from "@/components/CollectionsFilterSideBarButton";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function CollectionsLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>
			<CollectionsFiltersSideBarButton className="mb-4 sm:hidden" />
			<CollectionsFilter className="mb-4 hidden sm:block" type="collections" />
			{children}
		</div>
	);
}
