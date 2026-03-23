import CollectionsFiltersSideBarButton from "@/components/CollectionsFilterSideBarButton";
import Filter from "@/components/Filter";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>
			<CollectionsFiltersSideBarButton className="mb-4 sm:hidden" />
			<Filter className="mb-4 hidden sm:block" type="collections" />
			{children}
		</div>
	);
}
