import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function LegalNoticesLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>Mentions légales</Title>
			{children}
		</div>
	);
}
