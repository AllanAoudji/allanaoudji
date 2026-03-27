import CollectionsFilterModalButton from "@/components/CollectionsFilterModalButton";
import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function CollectionsLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>
			<CollectionsFilterModalButton className="-mt-2 mb-2" />
			{children}
		</div>
	);
}
