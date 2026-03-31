import Title from "@/components/Title";

type Props = {
	children: React.ReactNode;
};

export default function ContactLayout({ children }: Readonly<Props>) {
	return (
		<div className="padding-container vertical-padding">
			<Title>Contact</Title>
			{children}
		</div>
	);
}
