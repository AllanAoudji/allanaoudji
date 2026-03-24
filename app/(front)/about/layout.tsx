import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function AboutLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>À propos</Title>
			{children}
		</div>
	);
}
