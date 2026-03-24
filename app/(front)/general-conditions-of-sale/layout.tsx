import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function GeneralConditionsOfSaleLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>Conditions générales de vente</Title>
			{children}
		</div>
	);
}
