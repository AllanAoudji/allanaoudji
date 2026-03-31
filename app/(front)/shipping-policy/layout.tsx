import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function ShippingPolicyLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>Politique d’expédition</Title>
			{children}
		</div>
	);
}
