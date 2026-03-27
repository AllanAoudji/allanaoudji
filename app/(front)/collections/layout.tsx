import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function CollectionsLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>boutique</Title>

			{children}
		</div>
	);
}
